"use server";

import { prisma } from "@/lib/prisma";
import {
  CreateNodeInput,
  createNodeSchema,
  createNodeWithChildrenSchema,
  UpdateNodeInput,
  updateNodeSchema,
} from "./schema";
import { createSafeAction } from "@/lib/actionState";

async function createNodeHandler(data: CreateNodeInput) {
  try {
    const children =
      data.children?.map((c) => ({
        name: c.type,
        type: c.type,
      })) ?? [];
    console.log(data);
    const res = await prisma.node.create({
      data: {
        name: data.type,
        type: data.type,
        parentID: data.parentID,
        projectID: data.projectID,
        ...(children.length > 0 && {
          children: { create: children },
        }),
      },
      include: { children: true },
    });

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
      const res = await prisma.node.update({
        where: {
          id: data.id,
        },
        data: {
          ...data,
          property,
        },
      });
      return { data: res };
    }
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
export const createNode = createSafeAction(
  createNodeWithChildrenSchema,
  createNodeHandler
);
export const updateNode = createSafeAction(updateNodeSchema, updateNodeHandler);
