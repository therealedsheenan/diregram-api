import { Request, Response, NextFunction } from "express";
import multer  from "multer";
import mongoose from "mongoose";

import { Upload, UploadModel } from "../models/Upload";
import fileFilter from "../helpers/fileFilter";

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(undefined, "./uploads/");
  },
  filename: function(req, file, cb) {
    cb(undefined, new Date().toISOString() + file.originalname);
  }
});

const opts = {
  storage,
  fileFilter,
  limits: {
    fileSize: 1024 * 1024 * 5
  },
};

export let uploadMiddleware = multer(opts).single("post[image]");

/*
* uploading image
*/
export let postUpload = (req: any, res: Response, next: NextFunction) => {
  if (!req.body.post.caption) {
    return res.status(422).json({ errors: { caption: "can't be blank" } });
  }

  if (!req.body.post.title) {
    return res.status(422).json({ errors: { title: "can't be blank" } });
  }

  if (!req.file.path) {
    return res.status(422).json({ errors: { file: "can't be blank" } });
  }

  const newUpload = new Upload({
    _id: new mongoose.Types.ObjectId(),
    image: req.file.path
  });


  newUpload
    .save()
    .then((result: UploadModel) => {
      req.upload = result;
      next();
      // return res.json({ upload: result });
    })
    .catch((error: Error) => {
      return res
        .status(500)
        .json({
          error
        });
    });
};

/*
* getting image
*/
export let getUpload = (req: Request, res: Response) => {
  const id = req.params.uploadId;
  Upload.findById(id)
    .select("name image _id owner")
    .exec()
    .then(doc => {
      if (doc) {
        res.status(200).json({
          upload: doc
        });
      } else {
        res
          .status(404)
          .json({ message: "No valid entry found for provided ID" });
      }
    })
    .catch(err => {
      res.status(500).json({ error: err });
    });
};
