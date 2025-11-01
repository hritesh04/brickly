import { prisma } from "../client.js";
import { CreateProjectInput, Project, ProjectWithResource } from "./schema.js";

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

export async function getProjectByID(
  id: number,
  userID: number
): Promise<ProjectWithResource | null> {
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

export async function getUserProjects(id: number): Promise<Project[]> {
  try {
    const res = await prisma.project.findMany({
      where: { userID: id },
    });
    return res;
  } catch (e: any) {
    console.log(e);
    throw new Error("Error fetching user projects");
  }
}
