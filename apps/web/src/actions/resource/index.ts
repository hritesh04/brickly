"use server";
import { createSafeAction } from "@/lib/actionState";
import { ReturnTypeCreateResource } from "./schema";
import { ObjectStore } from "@/lib/objectStore";
import { resource } from "@brickly/db";

async function createResourceHandler(
  data: resource.CreateResourceInput
): Promise<ReturnTypeCreateResource> {
  try {
    if (data.file) {
      const objStore = ObjectStore.getInstance();
      const arrayBuffer = await data.file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      await objStore.uploadFile(buffer, data.file.name, data.file.type);
    }
    const res = await resource.createResource({
      ...data,
      name: data.file?.name || data.name,
      projectID: data.projectID || null,
      path: data.file?.name || null,
    });
    return { data: res };
  } catch (error: any) {
    return { error };
  }
}

async function updateResourceHandler(data: resource.UpdateResourceInput) {
  try {
    if (data.property) {
      const property = JSON.parse(data.property);
      const res = await resource.updateResource({ ...data, property });
      return { data: res };
    }
    const res = await resource.updateResource(data);
    return { data: res };
  } catch (error: any) {
    return { error };
  }
}

export const createResource = createSafeAction(
  resource.createResourceSchema,
  createResourceHandler
);
export const updateResource = createSafeAction(
  resource.updateResourceSchema,
  updateResourceHandler
);
