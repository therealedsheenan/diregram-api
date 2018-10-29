import mongoose from "mongoose";
import { CommentModel } from "./Comment";
import { LikeModel } from "./Like";

const User = mongoose.model('User');
const Like = mongoose.model('Like');

export type PostModel = mongoose.Document & {
  _id: mongoose.Schema.Types.ObjectId,
  owner: string,
  caption: string,
  image: string,
  likesCount: number,
  comments: Array<CommentModel>,
  likes: Array<LikeModel>,
  findUserLike: Function
};

const postSchema = new mongoose.Schema({
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  caption: String,
  title: String,
  likesCount: {type: Number, default: 0},
  image: { type: mongoose.Schema.Types.ObjectId, ref: "Upload" },
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Like" }]
}, { timestamps: true });

postSchema.methods.updateLikeCount = function () {
  const post = this;

  User.count({
    likes: {
      $in: [post._id]
    }
  })
  .then((count: number) => {
    post.likesCount = count;
    return post.save();
  });
};

postSchema.methods.findUserLike = async function (currentUserId: mongoose.Schema.Types.ObjectId) {
  const post = this;
  try {
    const like = await Like.findOne({ userId: currentUserId, postId: post._id }).exec();
    return like;
  } catch (error) {
    return false;
  }
};

mongoose.model("Post", postSchema);
