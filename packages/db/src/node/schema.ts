import z from "zod";
import { NodeType, Node } from "@prisma/client";
import { resourceSchema } from "../resource/schema.js";

export const nodeType = z.nativeEnum(NodeType);

export const nodeSchema = z.object({
  id: z.number(),
  name: z.string(),
  type: nodeType,
  parentID: z.number().nullable(),
  projectID: z.number().nullable(),
  property: z.any().nullable(),
});
// satisfies z.ZodType<Node>;

export const nodeWithRelations: z.ZodObject<
  typeof nodeSchema.shape & {
    resource: z.ZodOptional<z.ZodNullable<z.ZodArray<typeof resourceSchema>>>;
    children: z.ZodOptional<z.ZodNullable<z.ZodArray<any>>>;
  }
> = nodeSchema.extend({
  resource: z.array(resourceSchema).nullable().optional(),
  children: z
    .array(z.lazy(() => nodeWithRelations))
    .nullable()
    .optional(),
});

export const createNodeSchema = z.object({
  type: nodeType.describe("Godot node type"),
  parentID: z
    .number()
    .optional()
    .describe(
      "id of the parent node that this node will be the child of. Required if the node is a child node"
    ),
  projectID: z
    .number()
    .optional()
    .describe(
      "id of the project this node is part. Required if the node is a scene root node"
    ),
});

export const createNodeWithChildrenSchema: z.ZodObject<
  typeof createNodeSchema.shape & {
    children: z.ZodOptional<z.ZodNullable<z.ZodArray<any>>>;
  }
> = createNodeSchema.extend({
  children: z
    .array(z.lazy(() => createNodeWithChildrenSchema))
    .nullable()
    .optional()
    .describe(
      "respresents childrens of the node. the parentID and projectID fields are not required if created a nested node structure"
    ),
});

export const updateNodeSchema = z.object({
  id: z.number().describe("unique id of the node"),
  name: z.string().optional().describe("name of the node"),
  type: nodeType.describe("Godot node type"),
  parentID: z
    .number()
    .optional()
    .describe(
      "id of the parent node that this node will be the child of. Required if the node is a child node"
    ),
  projectID: z
    .number()
    .optional()
    .describe(
      "id of the project this node is part. Required if the node is a scene root node"
    ),
  property: z.any().nullable().optional().describe("property of the node"),
});

export type node = z.infer<typeof nodeWithRelations>;
export type nodeType = z.infer<typeof nodeType>;
export type CreateNodeInput = z.infer<typeof createNodeWithChildrenSchema>;
export type UpdateNodeInput = z.infer<typeof updateNodeSchema>;
