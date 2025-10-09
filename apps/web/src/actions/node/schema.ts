import z from "zod";
import { Node, NodeType } from "@brickly/db";
import { resourceSchema } from "../resource/schema";

export const nodeType = z.enum(NodeType);

export const nodeSchema = z.object({
  id: z.number(),
  name: z.string(),
  type: nodeType,
  parentID: z.number().nullable(),
  projectID: z.number().nullable(),
  property: z.any().nullable(),
}) satisfies z.ZodType<Node>;

export const nodeWithRelations: z.ZodType<
  z.infer<typeof nodeSchema> & {
    resource?: Array<z.infer<typeof resourceSchema>> | null;
    children?: Array<any> | null;
  }
> = z.lazy(() =>
  nodeSchema.extend({
    resource: z.array(resourceSchema).nullable().optional(),
    children: z.array(nodeWithRelations).nullable().optional(),
  })
);
export const createNodeSchema = z.object({
  type: nodeType,
  parentID: z.number().optional(),
  projectID: z.number().optional(),
});

export const createNodeWithChildrenSchema = createNodeSchema.extend({
  children: z.array(createNodeSchema).optional(),
});

export const updateNodeSchema = z.object({
  id: z.number(),
  name: z.string().optional(),
  type: nodeType.optional(),
  parentID: z.number().nullable().optional(),
  projectID: z.number().nullable().optional(),
  property: z.any().nullable().optional(),
});

export type node = z.infer<typeof nodeWithRelations>;
export type nodeType = z.infer<typeof nodeType>;
export type CreateNodeInput = z.infer<typeof createNodeWithChildrenSchema>;
export type UpdateNodeInput = z.infer<typeof updateNodeSchema>;
