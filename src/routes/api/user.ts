import express from "express";
import auth from "../auth";

import * as user from "../../controllers/user";

const router = express.Router();

// logging in
// checks email and password
router.post("/login", user.login);
router.post("/logout", user.logout);
router.post("/sign-up", user.signUp);

export default router;
