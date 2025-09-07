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

async function createResourceHandler(
  data: CreateResourceInput
): Promise<ReturnTypeCreateResource> {
  try {
    if (data.type === ResourceType.SubResource) {
      const res = await prisma.resource.create({
        data,
      });
      return { data: res };
    }
    const filePath = path.join(process.cwd(), "public", data.name);
    // const path = `public/uploads/${data.name}`;
    const arrayBuffer = await data.file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    await writeFile(filePath, buffer);
    const res = await prisma.resource.create({
      data: {
        name: data.name,
        type: data.type,
        assetType: data.assetType,
        path: data.name,
        parentID: data.parentID,
        projectID: data.projectID,
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
