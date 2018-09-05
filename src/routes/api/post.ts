import { Router } from "express";

import auth from "../auth";
import * as post from "../../controllers/post";
import * as upload from "../../controllers/upload";

const router = Router();

// all posts
router.get(
  "/all",
  post.readAllPosts
);

// create post
router.post(
  "/",
  auth.required,
  upload.uploadMiddleware,
  upload.postUpload,
  post.createPost
);

// get post
router.get(
  "/:postId",
  post.readPost
);

// update post
router.put(
  "/:postId",
  auth.required,
  post.updatePost
);

export default router;
