import { AssetType, Resource, ResourceType } from "@prisma/client";
import z from "zod";

const resourceType = z.enum(ResourceType);

const assetType = z.enum(AssetType);
export const resourceSchema = z.object({
  id: z.number(),
  name: z.string(),
  type: resourceType,
  assetType: assetType,
  path: z.string().nullable(),
  property: z.any(),
  projectID: z.number(),
}) satisfies z.ZodType<Resource>;
