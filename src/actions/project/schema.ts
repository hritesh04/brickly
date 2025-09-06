import z from "zod";
import type { Prisma, Project } from "@prisma/client";
import { ActionState } from "@/lib/actionState";
import { nodeSchema, nodeWithRelations } from "../node/schema";
import { resourceSchema } from "../resource/schema";

export const createProjectSchema = z.object({
  name: z.string(),
  userID: z.number(),
}) satisfies z.ZodType<Prisma.ProjectCreateManyInput>;

export const projectSchema = z.object({
  id: z.number(),
  name: z.string(),
  icon: z.string().nullable(),
  property: z.any().nullable(),
  userID: z.number(),
}) satisfies z.ZodType<Project>;

export const projectWithRelation = projectSchema.extend({
  scene: z.array(nodeWithRelations).nullable(),
  resource: z.array(resourceSchema).nullable(),
});

export type CreateProjectInput = z.infer<typeof createProjectSchema>;
export type ReturnTypeCreateProject = ActionState<CreateProjectInput, Project>;
export type ReturnTypeGetProject = ActionState<
  number,
  z.infer<typeof projectWithRelation>
>;
