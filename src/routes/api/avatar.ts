import { Router } from "express";
import auth from "../auth";

import * as avatar from "../../controllers/avatar";

const router = Router();

// avatar
router.post(
  "/",
  auth.required,
  avatar.avatarUploadMiddleware,
  avatar.postAvatar
);
router.get("/:username", avatar.getAvatar);


export default router;
