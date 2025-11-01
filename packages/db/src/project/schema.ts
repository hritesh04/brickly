import z from "zod";
import { nodeWithRelations } from "../node/schema.js";
import { resourceSchema } from "../resource/schema.js";

export const projectSchema = z.object({
  id: z.number().describe("unique id of the project"),
  name: z.string().describe("nameof the project"),
  icon: z
    .string()
    .nullable()
    .describe("url path to icon that represent the proejct"),
  height: z.number().describe("viewport height of the game (e.g. 810)"),
  width: z.number().describe("viewport height of the game (e.g. 1440)"),
  userID: z.number().describe("id of the user to whom this project belong to"),
  property: z.any().nullable().describe("property of the node"),
});

export const projectWithResourceSchema = projectSchema.extend({
  resource: z
    .array(resourceSchema)
    .nullable()
    .describe("resource attached to the project"),
});
// satisfies z.ZodType<ProjectDTO>;

export const createProjectSchema = projectSchema
  .omit({ id: true, icon: true, property: true })
  .extend({
    userID: z
      .number()
      .describe("id of the user to whom this project belong to"),
  });

export const projectWithRelationSchema = projectWithResourceSchema.extend({
  scene: z.array(nodeWithRelations).nullable(),
});

export type Project = z.infer<typeof projectSchema>;
export type ProjectWithResource = z.infer<typeof projectWithResourceSchema>;
export type CreateProjectInput = z.infer<typeof createProjectSchema>;
export type ProjectWithRelation = z.infer<typeof projectWithRelationSchema>;
