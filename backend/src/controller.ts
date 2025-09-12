import { Request, Response } from "express";
import { failedResponse, successResponse } from "./utils";
import BuildQueue from "./lib/rabbitmq";
import { DB } from "./db";
import { BuildMessage } from "./types";
import { parseProject } from "./parser";

export const healthHandler = async (req: Request, res: Response) => {
  return successResponse(200, "Server Healthy", res);
};

export const buildHandler = async (req: Request, res: Response) => {
  try {
    const { projectID, buildType }: BuildMessage = req.body;
    const db = DB.getInstance();
    const project = await db.userProject(projectID, req.user);
    if (!project)
      return failedResponse(
        402,
        new Error("Invalid userID for the project"),
        res
      );

    const projectPath = parseProject(project);
    // const queue = BuildQueue.getInstance();
    // await queue.push(req.body);
    return successResponse(200, "Build Started", res);
  } catch (error: any) {
    return failedResponse(400, error, res);
  }
};
