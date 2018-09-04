import mongoose from "mongoose";

export type UploadModel = mongoose.Document & {
  _id: mongoose.Schema.Types.ObjectId,
  image: string,
  owner: string
  // owner: { type: mongoose.Schema.Types.ObjectId, ref: "User"}
  // // , required: [true, "can't be blank"]
};

const UploadSchema = new mongoose.Schema({
  image: String,
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  post: { type: mongoose.Schema.Types.ObjectId, ref: "Post" }
  // required: [true, "can't be blank"]
}, { timestamps: true });

// declare model
export let Upload = mongoose.model("Upload", UploadSchema);
