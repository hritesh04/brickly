import { ActionState } from "@/lib/actionState";
import { Resource, resource } from "@brickly/db";

export type ReturnTypeCreateResource = ActionState<
  resource.CreateResourceInput,
  resource.Resource
>;
