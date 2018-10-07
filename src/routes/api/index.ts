import express, { Request, Response } from "express";
import user from "./user";
import post from "./post";
import like from "./like";

const router = express.Router();

// sample alive message
router.get("/", (req: Request, res: Response) =>
  res.send("Alive!")
);

// api endpoints
router.use("/user", user);

// all posts
router.use("/post", post);

// like posts
router.use("/like", like);

export default router;
