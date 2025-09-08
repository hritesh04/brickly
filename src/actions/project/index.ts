"use server";

import { prisma } from "@/lib/prisma";
import {
  CreateProjectInput,
  createProjectSchema,
  ProjectWithRelation,
  ReturnTypeCreateProject,
  ReturnTypeGetProject,
} from "./schema";
import { node } from "@/actions/node/schema";
import { revalidatePath } from "next/cache";
import { createSafeAction } from "@/lib/actionState";
import { Prisma } from "@prisma/client";

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
    const project = await prisma.project.findFirst({
      where: { id: id },
      include: {
        resource: true,
      },
    });
    if (!project) return { error: "project not found" };
    const nodes = await prisma.$queryRaw<node[]>(Prisma.sql`
  WITH RECURSIVE scene_hierarchy AS (
    SELECT n.*
    FROM "Node" n
    WHERE n."projectID" = ${id} AND n."parentID" IS NULL
    UNION ALL
    SELECT cn.*
    FROM "Node" cn
    INNER JOIN scene_hierarchy sh ON cn."parentID" = sh.id
  )
  SELECT *
  FROM scene_hierarchy
`);

    const scene = buildTree(nodes);
    return { data: { ...project, scene } };
  } catch (e: any) {
    return { error: "Error fetching project details" };
  }
}

function buildTree(nodes: node[]) {
  const map = new Map<number, node>();
  let rootNodes: node[] = [];

  nodes.forEach((node) => {
    map.set(node.id, node);
  });

  nodes.forEach((node) => {
    if (node.parentID) {
      const parent = map.get(node.parentID);
      if (parent) {
        if (!parent.children) parent.children = [];
        parent.children.push(node);
      }
    } else {
      rootNodes.push(node);
    }
  });

  return rootNodes;
}
export const createProject = createSafeAction(
  createProjectSchema,
  createProjectHandler
);
