import { Router } from "express";
import auth from "../auth";

import * as user from "../../controllers/user";

const router = Router();

// users posts
router.get("/:username/posts", user.readUserPosts);

// get current user's profile
router.get("/profile", auth.required, user.readCurrentProfile);
router.get("/profile/:username", user.readProfile);

// authentication
router.post("/login", user.login);
router.post("/logout", user.logout);
router.post("/sign-up", user.signUp);

export default router;
