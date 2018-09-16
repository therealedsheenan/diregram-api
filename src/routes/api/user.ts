import { Router } from "express";
import auth from "../auth";

import * as user from "../../controllers/user";

const router = Router();

// get current user's profile
router.get("/profile", auth.required, user.readCurrentProfile);
router.get("/profile/:username", user.readProfile);
router.get("/profile/:username/posts", user.readUserPosts);

// authentication
router.post("/login", user.login);
router.post("/logout", user.logout);
router.post("/sign-up", user.signUp);

export default router;
