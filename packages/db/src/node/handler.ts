import { Prisma } from "@prisma/client";
import { prisma } from "../client.js";
import { CreateNodeInput, node, UpdateNodeInput } from "./schema.js";

export async function CreateNode(data: CreateNodeInput): Promise<node> {
  try {
    const children =
      data.children?.map((c) => ({
        name: c.type,
        type: c.type,
      })) ?? [];
    const res = await prisma.node.create({
      data: {
        name: data.type,
        type: data.type,
        parentID: data.parentID,
        projectID: data.projectID,
        ...(children.length > 0 && {
          children: { create: children },
        }),
      },
      include: { children: true },
    });

    return res;
  } catch (error: any) {
    console.error(error);
    throw new Error("create node error");
  }
}

export async function UpdateNode(data: UpdateNodeInput) {
  try {
    const res = await prisma.node.update({
      where: {
        id: data.id,
      },
      data,
    });
    return res;
  } catch (error: any) {
    console.error(error);
    throw new Error("create node error");
  }
}

export async function getSceneHierarchy(id: number): Promise<node[]> {
  try {
    const res = await prisma.$queryRaw<
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
    return buildTree(res);
  } catch (error) {
    console.log(error);
    throw new Error("error retrieving scene hierarchy");
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
