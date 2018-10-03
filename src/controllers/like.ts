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
export function likeUnlikePost (req: Request, res: Response, next: NextFunction) {
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
          if (error) { return next(); }
          return res.json({ post });
        });
      });
    })
    .catch((error: Error) => {
      return res.status(500).json({ error });
    });
}
