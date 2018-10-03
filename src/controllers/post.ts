import passport from "passport";
import mongoose from "mongoose";
import { NextFunction, Request, Response } from "express";

import { PostModel } from "../models/Post";
import { UserModel } from "../models/user";
import pick from "lodash/pick";

const User = mongoose.model("User");
const Post = mongoose.model("Post");

// population options of post model
const postOpts = [{
  path: "image"
}, {
  path: "owner",
  select: "profile username avatar"
}, {
  path: "comments",
  populate: {
    path: "owner",
    select: "username"
  },
}, {
  path: "likes",
  select: "_id",
  populate: {
    path: "userId",
    select: "username _id"
  }
}];


/*
* GET ALL POSTS
* GET /posts/all
*/
export function readAllPosts (req: Request, res: Response, next: NextFunction) {
  Post
    .find(
      {},
      undefined,
      { sort: { "createdAt": "desc" } },
      (err, posts: Array<PostModel>) => {
        if (err) { return next(err); }

        Post.populate(posts, postOpts, (err, posts: Array<PostModel>) => {
          res.json({ posts });
        });
      })
    .catch((err) => {
      return res.status(500).json({  error: err  });
    });
}


/*
* Create new post
* POST /post/
*/
export function createPost (req: Request, res: Response, next: NextFunction) {
  // upload.postUpload
  const newPost = new Post({
    owner: req.payload.id,
    caption: req.body.post.caption,
    title: req.body.post.title,
    image: req.upload._id
  });

  newPost
    .save()
    .then((result: PostModel) => {
      // populate post"s author
      User.findById(req.payload.id, (err, user: UserModel) => {
        if (err) { return next(err); }
        console.log(user);
        user.posts.push(result);
        user.save((err) => {
          if (err) { return next(err); }
          Post.populate(result, postOpts, (err, posts: Array<PostModel>) => {
            return res.json({ post: result });
          });
        });
      });
    })
    .catch((error: Error) => {
      return res.status(500).json({ error });
    });
}

/*
* Get specific post via id
* GET /post/:postId
*/
export function readPost (req: Request, res: Response, next: NextFunction) {
  if (!req.params.postId) {
    res.status(422).json({ errors: { postId: "Invalid post ID" } });
  }
  Post
    .findById(req.params.postId)
    .populate(postOpts)
    .exec((err: Error, post: PostModel) => {
      if (err) { return next(err); }
      return res.json({ post });
    })
}

/*
* Update specific post via id
* PUT /post/:postId
*/
export function updatePost (req: Request, res: Response, next: NextFunction) {
  const updatePost = pick(req.body.post, ["caption", "title"]);
  if (!req.params.postId) {
    return res.status(422).json({ errors: { postId: "Invalid post ID" } });
  }

  if (!updatePost.caption) {
    return res.status(422).json({ errors: { caption: "Can't be blank" } });
  }

  if (!updatePost.title) {
    return res.status(422).json({ errors: { title: "Can't be blank" } });
  }
  Post
    .findByIdAndUpdate(req.params.postId, updatePost, { new: true })
    .populate(postOpts)
    .exec((err: Error, post: PostModel) => {
      if (err) { return next(err); }
      return res.json({ post });
    })
}
