import { prisma } from "../client.js";
import { CreateProjectInput, Project } from "./schema.js";

export async function createProject(
  data: CreateProjectInput
): Promise<Project> {
  try {
    const res = await prisma.project.create({
      data,
    });
    return res;
  } catch (e: any) {
    console.log(e);
    throw new Error("Error creating project");
  }
}

export async function getProjectByID(id: number): Promise<Project | null> {
  try {
    const res = await prisma.project.findFirst({
      where: { id: id },
      include: {
        resource: true,
      },
    });
    if (!res) return null;
    return res;
  } catch (e: any) {
    console.log(e);
    throw new Error("Error fetching project details");
  }
}
