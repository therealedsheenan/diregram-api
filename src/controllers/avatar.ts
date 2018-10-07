// import { Request, Response, NextFunction } from "express";
// import multer from "multer";
// import mongoose from "mongoose";
//
// import Avatar, { AvatarModel } from "../models/Avatar";
// import fileFilter from "../helpers/fileFilter";
//
// export const avatarUploadMiddleware = (multer => {
//   return multer({
//     storage: multer.diskStorage({
//       destination: function(req, file, cb) {
//         cb(undefined, "./uploads/avatars/");
//       },
//       filename: function(req, file, cb) {
//         cb(undefined, req.payload.id + file.originalname);
//       }
//     }),
//     fileFilter,
//     limits: { fileSize: 1024 * 1024 }
//   }).single("avatar[image]");
// })(multer);
//
// /*
// * uploading avatar image
// */
// export let postAvatar = (req: Request, res: Response, next: NextFunction) => {
//   if (!req.file.path) {
//     return res.status(422).json({ errors: { file: "can't be blank" } });
//   }
//
//   const newAvatar = new Avatar({
//     _id: new mongoose.Types.ObjectId(),
//     owner: req.payload.id,
//     image: req.file.path
//   });
//
//   newAvatar
//     .save()
//     .then((avatar: AvatarModel) => {
//       return res.json({ avatar });
//     })
//     .catch((error: Error) => {
//       res.status(500).json({ error });
//     });
// };
//
// /*
// * GET avatar
// */
// export let getAvatar = (req: Request, res: Response, next: NextFunction) => {
//   const id = req.params.avatarId;
//   Avatar.findById(id)
//     .select("name image _id owner")
//     .exec()
//     .then((avatar: AvatarModel) => {
//       if (avatar) {
//         return res.json({ avatar });
//       } else {
//         res
//           .status(404)
//           .json({ message: "No valid entry found for provided ID" });
//       }
//     })
//     .catch((error: Error) => {
//       res.status(500).json({ error });
//       return next();
//     });
// };
