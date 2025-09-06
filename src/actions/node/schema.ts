import z from "zod";
import { Node, NodeType } from "@prisma/client";

export const nodeType = z.enum(NodeType);

export const nodeSchema = z.object({
  id: z.number(),
  name: z.string(),
  type: nodeType,
  parentID: z.number().nullable(),
  projectID: z.number().nullable(),
}) satisfies z.ZodType<Node>;

export const nodeWithRelations = nodeSchema.extend({
  // parent: nodeSchema.nullable(),
  children: z.array(nodeSchema).nullable(),
});

export const createNodeSchema = z.object({
  type: nodeType,
  parentID: z.number().optional(),
  projectID: z.number().optional(),
});

export type node = z.infer<typeof nodeWithRelations>;
export type nodeType = z.infer<typeof nodeType>;
export type CreateNodeInput = z.infer<typeof createNodeSchema>;
