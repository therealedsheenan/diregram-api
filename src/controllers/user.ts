import passport from "passport";
import mongoose from "mongoose";
import { NextFunction, Request, Response } from "express";
import pick from "lodash/pick";

// import types
import { UserModel } from "../models/User";

const User = mongoose.model("User");

/*
 * USER CONTROLLER FUNCTIONS
 */

// login user
export function login (req: Request, res: Response, next: NextFunction) {
  const { email, password } = req.body.user;
  if (!email) {
    res.status(422).json({ errors: { email: "can't be blank" } });
  }

  if (!password) {
    res.status(422).json({ errors: { password: "can't be blank" } });
  }

  // passport strategy
  passport.authenticate(
    "local",
    { session: false },
    (err: String, user: UserModel, info: String) => {
      if (err) {
        return next(err);
      }

      if (!user) {
        return res.status(422).json(info);
      } else {
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
  const newUser: any = new User(pick(req.body, ["email", "password"]));
  newUser.save().then(() => {
    return res.json({user: newUser.toAuthJSON()});
  }).catch((e: Error) => {
    res.status(400).send(e);
  });
}

