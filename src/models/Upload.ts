import mongoose from "mongoose";

export type UploadModel = mongoose.Document & {
  _id: mongoose.Schema.Types.ObjectId,
  image: string,
  owner: mongoose.Schema.Types.ObjectId,
};

const UploadSchema = new mongoose.Schema({
  image: String,
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  post: { type: mongoose.Schema.Types.ObjectId, ref: "Post", required: true }
}, { timestamps: true });

// declare model
export let Upload = mongoose.model("Upload", UploadSchema);
