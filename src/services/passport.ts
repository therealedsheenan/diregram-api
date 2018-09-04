import passport from "passport";
import passportLocal from "passport-local";
import mongoose from "mongoose";

const LocalStrategy = passportLocal.Strategy;
const User = mongoose.model("User");

// login passport strategy
passport.use(
  new LocalStrategy({
      usernameField: "user[email]",
      passwordField: "user[password]"
    },
    function (email: String, password: String, done: Function) {
      User.findOne({email: email}).then( (user: any) => {
        if (!user) {
          return done(undefined, false, {errors: {"email or username": "is invalid"}});
        }
        if (!user.validPassword(password)) {
          return done(undefined, false, {errors: {"password": "is invalid"}});
        }
        return done(undefined, user);
      });
    })
);
