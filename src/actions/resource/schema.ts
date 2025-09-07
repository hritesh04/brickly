import {
  AssetType,
  Resource as ResourceDTO,
  ResourceType,
} from "@prisma/client";
import z from "zod";

export const resourceType = z.enum(ResourceType);

export const assetType = z.enum(AssetType);

export const resourceSchema = z.object({
  id: z.number(),
  name: z.string(),
  type: resourceType,
  assetType: assetType,
  path: z.string().nullable(),
  property: z.any().nullable(),
  parentID: z.number().nullable(),
  projectID: z.number().nullable(),
}) satisfies z.ZodType<ResourceDTO>;

export type Resource = z.infer<typeof resourceSchema>;
