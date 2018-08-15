import express from "express";

import * as homeController from "./controllers/home";

const router = express.Router();

// home page
router.get("/", homeController.index);

// sample page
router.get("/user", homeController.sample);

export default router;
