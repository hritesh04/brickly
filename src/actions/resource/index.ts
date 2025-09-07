"use server";
import { createSafeAction } from "@/lib/actionState";
import {
  CreateResourceInput,
  createResourceSchema,
  ReturnTypeCreateResource,
} from "./schema";
import { prisma } from "@/lib/prisma";
import { writeFile } from "node:fs/promises";
import { ResourceType } from "@prisma/client";
import path from "node:path";
import { updateNode } from "../node";

async function createResourceHandler(
  data: CreateResourceInput
): Promise<ReturnTypeCreateResource> {
  try {
    // if (data.type === ResourceType.SubResource) {
    if (data.file) {
      const filePath = path.join(process.cwd(), "public", data.file.name);
      const arrayBuffer = await data.file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      await writeFile(filePath, buffer);
    }

    const res = await prisma.resource.create({
      data: {
        name: data.file.name,
        type: data.type,
        assetType: data.assetType,
        parentID: data.parentID,
        projectID: data.projectID ? data.projectID : null,
        path: data.file ? data.file.name : null,
      },
    });
    return { data: res };
  } catch (error: any) {
    return { error };
  }
}

export const createResource = createSafeAction(
  createResourceSchema,
  createResourceHandler
);
