import { prisma } from "../client.js";
import { CreateProjectInput, Project } from "./schema.js";

export async function createProject(
  data: CreateProjectInput
): Promise<Project> {
  try {
    const res = await prisma.project.create({
      data,
      include: {
        resource: true,
      },
    });
    return res;
  } catch (e: any) {
    console.log(e);
    throw new Error("Error creating project");
  }
}

export async function getProjectByID(
  id: number,
  userID: number
): Promise<Project | null> {
  try {
    const res = await prisma.project.findFirst({
      where: { id: id, userID: userID },
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
