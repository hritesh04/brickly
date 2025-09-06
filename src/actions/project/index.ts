"use server";

import { prisma } from "@/lib/prisma";
import {
  CreateProjectInput,
  createProjectSchema,
  ReturnTypeCreateProject,
  ReturnTypeGetProject,
} from "./schema";
import { revalidatePath } from "next/cache";
import { createSafeAction } from "@/lib/actionState";

async function createProjectHandler(
  data: CreateProjectInput
): Promise<ReturnTypeCreateProject> {
  try {
    const res = await prisma.project.create({ data });
    revalidatePath("/dashboard");
    return { data: res };
  } catch (e: any) {
    return { error: "Error creating project" };
  }
}

export async function getProject(id: number): Promise<ReturnTypeGetProject> {
  try {
    const res = await prisma.project.findFirst({
      where: { id: id },
      include: {
        scene: { include: { parent: true, children: true } },
        resource: true,
      },
    });
    return { data: res };
  } catch (e: any) {
    return { error: "Error fetching project details" };
  }
}

export const createProject = createSafeAction(
  createProjectSchema,
  createProjectHandler
);
