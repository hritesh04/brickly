import { NextFunction, Request, Response } from "express";
import { failedResponse } from "./utils";
import jwt from "jsonwebtoken";
import { buildSchema, UserJWTPayload } from "./types";
import z from "zod";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  if (!authHeader)
    return failedResponse(
      400,
      new Error("Authorization header not found"),
      res
    );
  const token = authHeader?.split(" ")[1];
  try {
    const user = jwt.verify(token, JWT_SECRET) as UserJWTPayload;
    req.user = user.userId;
    next();
  } catch (error: any) {
    return failedResponse(401, error, res);
  }
};

export const buildValidation = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const valid = buildSchema.safeParse(req.body);
  if (!valid.success) {
    return failedResponse(400, new Error("Invalid Request"), res);
  }
  next();
};
