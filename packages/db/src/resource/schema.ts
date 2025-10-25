import {
  AssetType,
  Prisma,
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

export const createResourceSchema = z.object({
  name: z.string(),
  type: resourceType,
  assetType: assetType,
  parentID: z.number(),
  projectID: z.number().nullable().optional(),
  file: z.file().optional(),
}) satisfies z.ZodType<Prisma.ResourceCreateManyInput>;

export const updateResourceSchema = z.object({
  id: z.number(),
  name: z.string().optional(),
  type: resourceType.optional(),
  assetType: assetType.optional(),
  path: z.string().nullable().optional(),
  property: z.any().nullable().optional(),
  parentID: z.number().nullable().optional(),
  projectID: z.number().nullable().optional(),
});

export type Resource = z.infer<typeof resourceSchema>;
export type CreateResourceInput = z.infer<typeof createResourceSchema>;
export type UpdateResourceInput = z.infer<typeof updateResourceSchema>;
