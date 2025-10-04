"use server";

import { prisma } from "@/lib/prisma";
import {
  CreateProjectInput,
  createProjectSchema,
  ReturnTypeCreateProject,
  ReturnTypeGetProject,
} from "./schema";
import { node } from "@/actions/node/schema";
import { revalidatePath } from "next/cache";
import { createSafeAction } from "@/lib/actionState";
import { Prisma } from "@prisma/client";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

async function createProjectHandler(
  data: CreateProjectInput
): Promise<ReturnTypeCreateProject> {
  try {
    const token = (await cookies()).get("brickly");
    if (!token) return { error: "Token Missing" };
    const session = jwt.verify(token.value, JWT_SECRET) as { userId: number };
    console.log(session);
    const res = await prisma.project.create({
      data: {
        ...data,
        userID: session.userId,
      },
    });
    revalidatePath("/dashboard");
    return { data: res };
  } catch (e: any) {
    console.log(e);
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
    const nodes = await prisma.$queryRaw<
      node[]
    >(Prisma.sql`WITH RECURSIVE node_hierarchy AS (
      SELECT 
        n.id,
        n.name,
        n.type,
        n.property,
        n."parentID",
        n."projectID"
      FROM "Node" n
      WHERE n."projectID" = ${id} AND n."parentID" IS NULL
      
      UNION ALL
      
      SELECT 
        n.id,
        n.name,
        n.type,
        n.property,
        n."parentID",
        n."projectID"
      FROM "Node" n
      INNER JOIN node_hierarchy nh ON n."parentID" = nh.id
    )
    SELECT 
      nh.id,
      nh.name,
      nh.type,
      nh.property,
      nh."parentID",
      nh."projectID",
      COALESCE(
        json_agg(
          json_build_object(
            'id', r.id,
            'name', r.name,
            'type', r.type,
            'assetType', r."assetType",
            'path', r.path,
            'property', r.property
          )
        ) FILTER (WHERE r.id IS NOT NULL), '[]'::json
      ) as resource,
      null as children
    FROM node_hierarchy nh
    LEFT JOIN "Resource" r ON r."parentID" = nh.id
    GROUP BY nh.id, nh.name, nh.type, nh.property, nh."parentID", nh."projectID"
    ORDER BY nh.id;`);
    const scene = buildTree(nodes);
    return { data: { ...project, scene } };
  } catch (e: any) {
    console.log(e);
    return { error: "Error fetching project details" };
  }
}

function buildTree(nodes: node[]) {
  const map = new Map<number, node>();
  const rootNodes: node[] = [];

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
    }
    if (node.projectID) {
      rootNodes.push(node);
    }
  });

  return rootNodes;
}
export const createProject = createSafeAction(
  createProjectSchema,
  createProjectHandler
);
