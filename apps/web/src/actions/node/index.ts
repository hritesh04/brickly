"use server";

import {
  createNode as CreateNode,
  updateNode as UpdateNode,
} from "@brickly/db";
import {
  CreateNodeInput,
  createNodeWithChildrenSchema,
  UpdateNodeInput,
  updateNodeSchema,
} from "./schema";
import { createSafeAction } from "@/lib/actionState";

async function createNodeHandler(data: CreateNodeInput) {
  try {
    const res = await CreateNode(data);
    return { data: res };
  } catch (error: any) {
    console.error(error);
    return { error: "failed to create node" };
  }
}

async function updateNodeHandler(data: UpdateNodeInput) {
  try {
    if (data.property) {
      const property = JSON.parse(data.property);
      const res = await UpdateNode({ ...data, property });
      return { data: res };
    } else {
      const res = await UpdateNode(data);
      return { data: res };
    }
  } catch (error: any) {
    return { error };
  }
}
export const createNode = createSafeAction(
  createNodeWithChildrenSchema,
  createNodeHandler
);
export const updateNode = createSafeAction(updateNodeSchema, updateNodeHandler);
