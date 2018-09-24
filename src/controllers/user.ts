import passport from "passport";
import mongoose from "mongoose";
import { NextFunction, Request, Response } from "express";
import pick from "lodash/pick";

// import types
import { UserModel } from "../models/User";
import fileFilter from "../helpers/fileFilter";
import multer from "multer";

const User = mongoose.model("User");

export const avatarUploadMiddleware = (multer => {
  return multer({
    storage: multer.diskStorage({
      destination: function(req, file, cb) {
        cb(undefined, "./uploads/avatars/");
      },
      filename: function(req, file, cb) {
        cb(undefined, req.payload.id + file.originalname);
      }
    }),
    fileFilter,
    limits: { fileSize: 1024 * 1024 }
  }).single("avatar[image]");
})(multer);


/*
 * USER CONTROLLER FUNCTIONS
 */

// login user
export function login (req: Request, res: Response, next: NextFunction) {
  const user = pick(req.body.user, ["password", "email"]);
  if (!user.email) {
    return res.status(422).json({ errors: { email: "can't be blank" } });
  }

  if (!user.password) {
    return res.status(422).json({ errors: { password: "can't be blank" } });
  }

  // passport strategy
  passport.authenticate(
    "local",
    { session: false },
    (err: String, user: UserModel, info: String) => {
      if (err) { return next(err); }

      if (!user) {
        return res.status(422).json(info);
      } else {
        user.token = user.generateJWT();
        return res.json({ user: user.toAuthJSON() });
      }
    }
  )(req, res, next);
}

// logout user
export function logout (req: Request, res: Response, next: NextFunction) {
  // TODO: add logout logic here
  return false;
}

// register user
export function signUp (req: Request, res: Response, next: NextFunction) {
  const newUser: any = new User(pick(req.body.user, ["username", "email", "posts", "avatar"]));
  newUser.setPassword(pick(req.body.user, ["password"]).password);

  newUser.save().then(() => res.json({user: newUser.toAuthJSON()})
  ).catch((e: Error) => {
    res.status(400).send(e);
  });
}

// read user profile from Authentication token
export function readCurrentProfile (req: Request, res: Response, next: NextFunction) {
  const userId = req.payload.id; // current user's id
  User.findById(userId, (err, user: UserModel) => {
    if (err || !user) {
      res.status(404);
      return next(err);
    }
    return res.json({ user: pick(user, ["username", "email", "createdAt"]) });
  });
};

// read profile via USERNAME
export function readProfile (req: Request, res: Response, next: NextFunction) {
  const userName = req.params.username;
  User.findOne({ username: userName }, (err, user: UserModel) => {
    if (err || !user) {
      res.status(404);
      return next(err);
    }
    return res.json({
      user: pick(user, ["username", "email", "createdAt"])
    });
  });
};

// read cuyrrent user posts
export function readUserPosts (req: Request, res: Response, next: NextFunction) {
  const userName = req.params.username;
  User.findOne({ username: userName })
    .populate({
      path: "posts",
      options: { sort: { createdAt: "desc" } },
      populate: [
        {
          path: "image"
        },
        {
          path: "comments",
          populate: {
            path: "owner",
            select: "username"
          }
        }
      ]
    })
    .exec((err, user: UserModel) => {
      if (err) { return next(err); }
      const posts = user.posts;
      return res.json({ posts })
    });
}

/*
* uploading avatar image
*/
export let postAvatar = (req: Request, res: Response, next: NextFunction) => {
  if (!req.file.path) {
    return res.status(422).json({ errors: { file: "can't be blank" } });
  }

  User.findOneAndUpdate(
    { _id: req.payload.id },
    { avatar: req.file.path },
    { new: true }
  ).exec((error: Error, user: UserModel) => {
    if (error || !user) {
      res.status(404);
      return next();
    }
    return res.json({ user });
  });
};


