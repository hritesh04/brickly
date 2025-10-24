"use server";

import { getSceneHierarchy, project } from "@brickly/db";
import {
  CreateProjectInput,
  createProjectSchema,
  ReturnTypeCreateProject,
  ReturnTypeGetProject,
} from "./schema";
import { node } from "@/actions/node/schema";
import { revalidatePath } from "next/cache";
import { createSafeAction } from "@/lib/actionState";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

async function createProjectHandler(
  data: CreateProjectInput
): Promise<ReturnTypeCreateProject> {
  try {
    const token = (await cookies()).get("brickly");
    if (!token) return { error: "Token Missing" };
    const session = jwt.verify(token.value, JWT_SECRET) as { userId: number };
    const res = await project.createProject({
      ...data,
      userID: session.userId,
    });
    revalidatePath("/dashboard");
    return { data: res };
  } catch (e: any) {
    console.log(e);
    return { error: "Error creating project" };
  }
}

export async function getProject(id: number): Promise<ReturnTypeGetProject> {
  try {
    const res = await project.getProjectByID(id);
    if (!res) return { error: "project not found" };

    const nodes = await getSceneHierarchy(id);

    const scene = buildTree(nodes);

    return { data: { ...res, scene } };
  } catch (e: any) {
    console.log(e);
    return { error: "Error fetching project details" };
  }
}

function buildTree(nodes: node[]) {
  const map = new Map<number, node>();
  const rootNodes: node[] = [];

  nodes.forEach((node) => {
    map.set(node.id, node);
  });

  nodes.forEach((node) => {
    if (node.parentID) {
      const parent = map.get(node.parentID);
      if (parent) {
        if (!parent.children) parent.children = [];
        parent.children.push(node);
      }
    }
    if (node.projectID) {
      rootNodes.push(node);
    }
  });

  return rootNodes;
}
export const createProject = createSafeAction(
  createProjectSchema,
  createProjectHandler
);
