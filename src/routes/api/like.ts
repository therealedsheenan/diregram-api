import { Router } from "express";

import auth from "../auth";
import * as like from "../../controllers/like";

const router = Router();

// like a post
// router.post(
//   "/:postId",
//   auth.required,
//   like.likePost
// );

// unlike a post
router.delete(
  "/",
  auth.required,
  like.unlikePost
);

// like or unlike a post
router.post(
  "/",
  auth.required,
  like.likeUnlikePost
);

export default router;
