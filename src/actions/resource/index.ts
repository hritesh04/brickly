"use server";
import { createSafeAction } from "@/lib/actionState";
import {
  CreateResourceInput,
  createResourceSchema,
  ReturnTypeCreateResource,
  UpdateResourceInput,
  updateResourceSchema,
} from "./schema";
import { prisma } from "@/lib/prisma";
import { writeFile } from "node:fs/promises";
import path from "node:path";
import { ObjectStore } from "@/lib/objectStore";

async function createResourceHandler(
  data: CreateResourceInput
): Promise<ReturnTypeCreateResource> {
  try {
    // if (data.type === ResourceType.SubResource) {
    if (data.file) {
      const objStore = ObjectStore.getInstance();
      // const filePath = path.join(process.cwd(), "public", data.file.name);
      const arrayBuffer = await data.file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      await objStore.uploadFile(buffer, data.file.name, data.file.type);
      // await writeFile(filePath, buffer);
    }

    const res = await prisma.resource.create({
      data: {
        name: data.file?.name || data.name,
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

async function updateResourceHandler(data: UpdateResourceInput) {
  try {
    if (data.property) {
      const property = JSON.parse(data.property);

      const res = await prisma.resource.update({
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
    const res = await prisma.resource.update({
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

export const createResource = createSafeAction(
  createResourceSchema,
  createResourceHandler
);
export const updateResource = createSafeAction(
  updateResourceSchema,
  updateResourceHandler
);
