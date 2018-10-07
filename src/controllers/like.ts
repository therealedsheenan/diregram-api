import passport from "passport";
import mongoose from "mongoose";
import { NextFunction, Request, Response } from "express";

import { PostModel } from "../models/Post";
import { UserModel } from "../models/user";
import { LikeModel } from "../models/Like";
import pick from "lodash/pick";

const User = mongoose.model("User");
const Post = mongoose.model("Post");
const Like = mongoose.model("Like");

/*
* like a post
* POST /post/:id/like
*/
export function likePost(req: Request, res: Response, next: NextFunction) {
  const newLike = new Like({
    userId: req.payload.id,
    postId: req.params.postId
  });

  newLike
    .save()
    .then((like: LikeModel) => {
      Post.findById(like.postId, (err, post: PostModel) => {
        post.likes.push(like);
        post.save((error: Error) => {
          if (error) {
            res.status(500);
            return next();
          }
          return res.json({ post });
        });
      });
    })
    .catch((error: Error) => {
      return res.status(500).json({ error });
    });
}

export function unlikePost(req: Request, res: Response, next: NextFunction) {
  const userId = req.payload.id;
  // const postId = req.params.postId;
  const likeId = req.body.likeId;
  const postId = req.body.postId;

  Post.findOneAndUpdate(
    { _id: postId },
    { $pull: { likes: likeId } },
    (error: Error, post: PostModel) => {
      if (error || !post) {
        res.status(404);
        return next();
      }

      Like.deleteOne({ _id: likeId }, (error: Error) => {
        if (error) {
          return res.status(500).json({ error });
        }
        return res.status(200);
      });
    }
  );

  // Post.findById(postId, (err, post: PostModel) => {
  //   next();
  //   // post.save((error: Error) => {
  //   //   if (error) { return next(); }
  //   //   return res.json({ post });
  //   // });
  // });
}
