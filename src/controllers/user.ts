import mongoose from "mongoose";
import passport from "passport";
import { NextFunction, Request, Response } from "express";

// import types
import { UserModel } from "../models/User";

/*
 * USER CONTROLLER FUNCTIONS
 */

// login user
export const login = (req: Request, res: Response, next: NextFunction) => {
  if (!req.body.user.email) {
    res.status(422).json({errors: {email: "can't be blank"}});
  }

  if (!req.body.user.password) {
    res.status(422).json({errors: {password: "can't be blank"}});
  }

  // passport strategy
  passport.authenticate("local", {session: false},  (err: String, user: UserModel, info: String) => {
    if (err) { return next(err); }

    if (!user) {
      return res.status(422).json(info);
    } else {
      return res.json({user: user.toAuthJSON()});
    }
  })(req, res, next);
};

// logout user
export const logout = (req: Request, res: Response, next: NextFunction) => {
  return false;
};
