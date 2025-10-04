import { Response } from "express";

export const successResponse = (code: number, data: any, res: Response) => {
  return res.status(code).json({ success: true, data });
};

export const failedResponse = (code: number, error: Error, res: Response) => {
  return res.status(code).json({ success: false, error: error.message });
};
