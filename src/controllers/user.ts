import mongoose from "mongoose";
import passport from "passport";
import express, { NextFunction, Request, Response } from "express";
import pick from "lodash/pick";

// import types
import User, { UserModel } from "../models/User";
const router = express.Router();

/*
 * USER CONTROLLER FUNCTIONS
 */

// login user
export const login = (req: Request, res: Response, next: NextFunction) => {
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
};

// logout user
export const logout = (req: Request, res: Response, next: NextFunction) => {
  // TODO: add logout logic here
  return false;
};

// register user
export const signUp = (req: Request, res: Response, next: NextFunction) => {
  const newUser = new User(pick(req.body, ["email", "password"]));
  newUser.save().then(() => {
    return newUser.generateJWT();
  }).then((token: string) => {
    res.header("x-auth", token).send(newUser);
  }).catch((e: Error) => {
    res.status(400).send(e);
  });
};

