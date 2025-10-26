import { ActionState } from "@/lib/actionState";
import { project } from "@brickly/db";
import z from "zod";
export type ReturnTypeCreateProject = ActionState<
  project.CreateProjectInput,
  project.Project
>;
export type ReturnTypeGetProject = ActionState<
  number,
  project.ProjectWithRelation
>;

export const CreateProjectInputSchema = project.createProjectSchema.omit({
  userID: true,
});

export type CreateProjectInput = z.infer<typeof CreateProjectInputSchema>;
