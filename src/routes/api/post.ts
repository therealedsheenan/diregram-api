import { Router } from "express";

import auth from "../auth";
import * as post from "../../controllers/post";
import * as upload from "../../controllers/upload";

const router = Router();

router.get(
  "/",
  post.readAllPosts
);

router.post(
  "/",
  auth.required,
  upload.uploadMiddleware,
  upload.postUpload,
  post.createPost
);

export default router;
