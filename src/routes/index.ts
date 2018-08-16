
import * as express from "express";

import api from "./api";

const router = express.Router();
const VERSION = "1.0";

// namespace api
router.use(`/api/${VERSION}`, api);

export default router;
