import {
  AssetType,
  Prisma,
  Resource as ResourceDTO,
  ResourceType,
} from "@prisma/client";
import z from "zod";

export const resourceType = z.nativeEnum(ResourceType);

export const assetType = z.nativeEnum(AssetType);

export const resourceSchema = z.object({
  id: z.number().describe("unique id of the resource"),
  name: z.string().describe("name of the resource"),
  type: resourceType.describe("type of resource ExtResource or SubResource"),
  assetType: assetType.describe("type of asset"),
  path: z.string().nullable().describe("url to the asset location"),
  property: z.any().nullable().describe("property of the resource"),
  parentID: z
    .number()
    .nullable()
    .optional()
    .describe(
      "id of the node to which this resource belong to. Required if the resource is attached to a node"
    ),
  projectID: z
    .number()
    .nullable()
    .optional()
    .describe(
      "id of the project to which this resource belong to. Required if the resource is attached to a project"
    ),
});
// satisfies z.ZodType<ResourceDTO>;

export const createResourceSchema = resourceSchema
  .omit({ id: true, property: true })
  .extend({
    file: z
      .instanceof(File)
      .optional()
      .describe("asset file. Required for assets like Script"),
  });

export type Resource = z.infer<typeof resourceSchema>;
export type CreateResourceInput = z.infer<typeof createResourceSchema>;
export type UpdateResourceInput = z.infer<typeof resourceSchema>;
