import {
  CreateResourceInput,
  Resource,
  UpdateResourceInput,
} from "./schema.js";
import { prisma } from "../client.js";

export async function createResource(
  data: CreateResourceInput
): Promise<Resource> {
  try {
    const res = await prisma.resource.create({ data });
    return res;
  } catch (error: any) {
    console.error(error);
    throw new Error("error creating resource");
  }
}

export async function updateResource(data: UpdateResourceInput) {
  try {
    const res = await prisma.resource.update({
      where: {
        id: data.id,
      },
      data,
    });
    return res;
  } catch (error: any) {
    return { error };
  }
}
