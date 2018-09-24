import { Request } from "express";

export default (req: Request, file: any, cb: any) => {
  // reject a file
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(undefined, true);
  } else {
    cb(undefined, false);
  }
};
