import { Request, Response } from "express";
import { failedResponse, successResponse } from "./utils";
import BuildQueue from "./lib/rabbitmq";
import { readFileSync, unlinkSync } from "fs";
import { DB } from "./db";
import { BuildMessage } from "./types";
import { parseProject } from "./parser";
import { ObjectStore } from "./lib/objectStore";

export const healthHandler = async (req: Request, res: Response) => {
  return successResponse(200, "Server Healthy", res);
};

export const buildHandler = async (req: Request, res: Response) => {
  try {
    const { projectID, buildType }: BuildMessage = req.body;
    const db = DB.getInstance();
    const objStore = ObjectStore.getInstance();
    const queue = BuildQueue.getInstance();
    const project = await db.userProject(projectID, req.user);
    if (!project)
      return failedResponse(
        402,
        new Error("Invalid userID for the project"),
        res
      );

    const zipDir = await parseProject(project);
    const zipData = readFileSync(zipDir);
    const objKey = zipDir.split("/")[2];
    await objStore.uploadDir(objKey, zipData);
    unlinkSync(zipDir);
    await queue.push({ key: objKey, buildType });
    return successResponse(200, "Build Started", res);
  } catch (error: any) {
    return failedResponse(400, error, res);
  }
};
