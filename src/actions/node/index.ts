"use server";

import { prisma } from "@/lib/prisma";
import { CreateNodeInput, createNodeSchema, nodeType } from "./schema";
import { createSafeAction } from "@/lib/actionState";

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

export const createNode = createSafeAction(createNodeSchema, createNodeHandler);
