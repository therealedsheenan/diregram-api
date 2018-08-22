import express, { Request, Response } from "express";
import user from "./user";

const router = express.Router();

// sample alive message
router.get("/", (req: Request, res: Response) =>
  res.json({ message: "Alive!" })
);

// api endpoints
router.use("/user", user);

export default router;
