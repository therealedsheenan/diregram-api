import jwt from "express-jwt";

// getting Token or Bearer
const getTokenFromHeader = (req: any) => {
  if (req.headers.authorization && req.headers.authorization.split(" ")[0] === "Bearer") {
    return req.headers.authorization.split(" ")[1];
  }

  return undefined;
};

const auth = {
  required: jwt({
    secret: process.env.SECRET_KEY,
    userProperty: "params",
    getToken: getTokenFromHeader
  }),
  optional: jwt({
    secret: process.env.SECRET_KEY,
    userProperty: "params",
    credentialsRequired: false,
    getToken: getTokenFromHeader
  })
};

export default auth;
