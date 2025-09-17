import z from "zod";
import type { Prisma, Project as ProjectDTO } from "@prisma/client";
import { ActionState } from "@/lib/actionState";
import { nodeWithRelations } from "../node/schema";
import { resourceSchema } from "../resource/schema";

export const createProjectSchema = z.object({
  name: z.string(),
  height: z.number(),
  width: z.number(),
});
export const projectSchema = z.object({
  id: z.number(),
  name: z.string(),
  icon: z.string().nullable(),
  height: z.number(),
  width: z.number(),
  property: z.any().nullable(),
  userID: z.number(),
}) satisfies z.ZodType<ProjectDTO>;

export const projectWithResource = projectSchema.extend({
  resource: z.array(resourceSchema).nullable(),
});

export const projectWithRelationSchema = projectSchema.extend({
  scene: z.array(nodeWithRelations).nullable(),
  resource: z.array(resourceSchema).nullable(),
});

export type Project = z.infer<typeof projectSchema>;
export type CreateProjectInput = z.infer<typeof createProjectSchema>;
export type ReturnTypeCreateProject = ActionState<CreateProjectInput, Project>;
export type projectWithResource = z.infer<typeof projectWithResource>;
export type ProjectWithRelation = z.infer<typeof projectWithRelationSchema>;
export type ReturnTypeGetProject = ActionState<number, ProjectWithRelation>;
