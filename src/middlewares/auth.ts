import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import AuthConfig from "../config/auth";

const authMiddleware = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const token =
    request.headers.authorization &&
    request.headers.authorization.split(" ")[1];

  if (!token) {
    console.log(token)
    return response.status(401).json({ error: "Token not found." });
  }

  jwt.verify(token, AuthConfig.JWTsecretKey, (err, decoded) => {
    if (err) {
      return response.status(401).json({ error: "Invalid token." });
    }
    
    if (typeof decoded === 'string' || !decoded) {
      return response.status(401).json({ error: "Invalid token payload." });
    }

    request.headers.userId = decoded.id

    next();
  });
};

export default authMiddleware;
