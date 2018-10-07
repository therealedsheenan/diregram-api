import { Router } from "express";

import auth from "../auth";
import * as like from "../../controllers/like";

const router = Router();

// like a post
router.post(
  "/:postId",
  auth.required,
  like.likePost
);

// unlike a post
router.delete(
  "/:likeId",
  auth.required,
  like.unlikePost
);

export default router;
