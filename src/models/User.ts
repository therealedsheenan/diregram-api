import mongoose from "mongoose";
import uniqueValidator from "mongoose-unique-validator";
import crypto from "crypto";
import jwt from "jsonwebtoken";

export type UserModel = mongoose.Document & {
  type: String,
  username: String,
  email: String,
  avatar: String,
  password: String,
  toAuthJSON: Function,
  setPassword: Function,
  token: String,
  generateJWT: Function,
  firstName: String,
  lastName: String,
};

// schema
const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    lowercase: true,
    unique: true,
    required: [true, "can't be blank"],
    match: [/^[a-zA-Z0-9]+$/, "is invalid"],
    index: true
  },
  email: {
    type: String,
    lowercase: true,
    unique: true,
    required: [true, "can't be blank"],
    match: [/\S+@\S+\.\S+/, "is invalid"],
    index: true
  },
  avatar: {
    type: String
  },
  hash: String,
  salt: String,
  profile: {
    name: String,
    gender: String,
    location: String,
    website: String,
    picture: String
  }
}, { timestamps: true });

// unique data
UserSchema.plugin(uniqueValidator, { message: "is already taken." });

// check password
UserSchema.methods.validPassword = function (password: string) {
  const hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, "sha512").toString("hex");
  return this.hash === hash;
};

// encrypt password
UserSchema.methods.setPassword = function (password: string) {
  this.salt = crypto.randomBytes(16).toString("hex");
  this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, "sha512").toString("hex");
};

// generating JWT
UserSchema.methods.generateJWT = function () {
  const today = new Date();
  const exp = new Date(today);
  exp.setDate(today.getDate() + 60);

  return jwt.sign({
    id: this._id,
    username: this.username,
    exp: parseInt(`${exp.getTime() / 1000}`)
  }, process.env.SECRET_KEY);
};

// translate to JSON
UserSchema.methods.toAuthJSON = function () {
  return {
    id: this._id,
    username: this.username,
    email: this.email,
    token: this.generateJWT()
  };
};

// declare model
mongoose.model("User", UserSchema);
