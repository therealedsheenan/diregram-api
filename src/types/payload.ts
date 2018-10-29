import { Request } from "express";
import { UserModel } from "../models/User";
import { UploadModel } from "../models/Upload";

declare global {
  export interface payloadInterface extends UserModel {}
  export interface RequestPayload extends Request {
    payload: payloadInterface
  }
  export interface RequestUpload extends Request {
    upload: UploadModel
  }

  export interface RequestPayloadUpload extends Request {
    upload: UploadModel,
    payload: payloadInterface
  }
}
