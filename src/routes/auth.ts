import jwt from "express-jwt";

const secretKey = process.env.SECRET_KEY;

// getting Token or Bearer
const getTokenFromHeader = (req: any) => {
  if (req.headers.authorization && req.headers.authorization.split(" ")[0] === "Bearer") {
    return req.headers.authorization.split(" ")[1];
  }

  return undefined;
};

const auth = {
  required: jwt({
    secret: secretKey,
    userProperty: "params",
    getToken: getTokenFromHeader
  }),
  optional: jwt({
    secret: secretKey,
    userProperty: "params",
    credentialsRequired: false,
    getToken: getTokenFromHeader
  })
};

export default auth;
