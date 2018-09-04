import passport from "passport";
import mongoose from "mongoose";
import { NextFunction, Request, Response } from "express";

import { Post, PostModel } from "../models/Post";
import { UserModel } from "../models/user";

const User = mongoose.model("User");

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
