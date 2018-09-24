import mongoose from "mongoose";

export type AvatarModel = mongoose.Document & {
  _id: mongoose.Schema.Types.ObjectId;
  owner: mongoose.Schema.Types.ObjectId;
};

const AvatarSchema = new mongoose.Schema(
  {
    image: String,
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      unique: true
    }
  },
  { timestamps: true }
);

// declare model
export default mongoose.model("Avatar", AvatarSchema);
