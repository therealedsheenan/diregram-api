import passport from "passport";
import mongoose from "mongoose";
import { NextFunction, Request, Response } from "express";

import { PostModel } from "../models/Post";
import { UserModel } from "../models/user";

const User = mongoose.model("User");
const Post = mongoose.model("Post");

// population options of post model
const postOpts = [{
  path: "image"
}, {
  path: "owner",
  select: "profile username"
}, {
  path: "comments",
  populate: {
    path: "owner",
    select: "username"
  }
}];

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
        })
      })
    .catch((err) => {
      return res.status(500).json({  error: err  });
    });
}

export function createPost (req: Request, res: Response, next: NextFunction) {
  // upload.postUpload
  const newPost = new Post({
    owner: req.payload.id,
    caption: req.body.caption,
    title: req.body.title,
    image: req.upload._id
  });

  newPost
    .save()
    .then((result: PostModel) => {
      // populat post"s author
      User.findById(req.payload.id, (err, user: UserModel) => {
        if (err) { return next(err); }
        user.posts.push(result);
        user.save((err) => {
          if (err) { return next(err); }
          res.json({ post: result });
        });
      });
    })
    .catch(err => {
      return res.status(500).json({  error: err  });
    });
}

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
