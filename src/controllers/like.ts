import mongoose from "mongoose";
import { NextFunction, Request, Response } from "express";

import { PostModel } from "../models/Post";
import { LikeModel } from "../models/Like";

const User = mongoose.model("User");
const Post = mongoose.model("Post");
const Like = mongoose.model("Like");

/*
* like a post
* POST /post/:id/like
*/
export function likePost(req: RequestPayload, res: Response, next: NextFunction) {
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
  const likeId = req.body.likeId;
  const postId = req.body.postId;

  Post.findOneAndUpdate(
    { _id: postId },
    { $pull: { likes: likeId } },
    (error: Error, post: PostModel) => {
      if (error || !post) {
        res.status(500);
        return next();
      }

      Like.deleteOne({ _id: likeId }, (error: Error) => {
        if (error) {
          return res.status(500).json({ error });
        }
        return res.status(200).json({});
      });
    }
  );
}

export async function likeUnlikePost(req: RequestPayload, res: Response, next: NextFunction) {
  const likeId = req.body.likeId;
  const postId = req.body.postId;
  const userId = req.payload.id;

  try {
    const post = await Post.findById(postId).populate({
      path: "likes",
      select: "_id",
      populate: {
        path: "userId",
        select: "username _id"
      }
    })
      .exec();
    const findUser = await post.findUserLike(userId);

    if (findUser) {
      // unlike here
      await Like.findByIdAndRemove(findUser._id);
      return res.json({ post });
    } else {
      // like here
      const like = await new Like ({
        userId,
        postId
      });

      await like
        .save()
        .then(() => res.json({ like }))
    }

  } catch (error) {
    res.status(404);
    return next();
  }
}
