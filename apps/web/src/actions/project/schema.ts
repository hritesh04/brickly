import { ActionState } from "@/lib/actionState";
import { project, Project } from "@brickly/db";

export type ReturnTypeCreateProject = ActionState<
  project.CreateProjectInput,
  project.Project
>;
export type ReturnTypeGetProject = ActionState<
  number,
  project.ProjectWithRelation
>;
