"use server";

import { prisma } from "@/lib/prisma";
import {
  CreateNodeInput,
  createNodeSchema,
  UpdateNodeInput,
  updateNodeSchema,
} from "./schema";
import { ActionState, createSafeAction } from "@/lib/actionState";

async function createNodeHandler(data: CreateNodeInput) {
  try {
    const res = await prisma.node.create({
      data: {
        name: data.type,
        type: data.type,
        parentID: data.parentID,
        projectID: data.projectID,
      },
    });
    return { data: res };
  } catch (error: any) {
    return { error: "failed to create node" };
  }
}

async function updateNodeHandler(data: UpdateNodeInput) {
  try {
    const res = await prisma.node.update({
      where: {
        id: data.id,
      },
      data: {
        ...data,
      },
    });
    return { data: res };
  } catch (error: any) {
    return { error };
  }
}
export const createNode = createSafeAction(createNodeSchema, createNodeHandler);
export const updateNode = createSafeAction(updateNodeSchema, updateNodeHandler);
