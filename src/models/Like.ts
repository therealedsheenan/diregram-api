import mongoose from "mongoose";

export type LikeModel = mongoose.Document & {
  _id: mongoose.Schema.Types.ObjectId,
  postId: mongoose.Schema.Types.ObjectId,
  userId: mongoose.Schema.Types.ObjectId,
};

const likeSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "can't be blank"],
  },
  postId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "can't be blank"],
  },
}, { timestamps: true });

mongoose.model("Like", likeSchema);
