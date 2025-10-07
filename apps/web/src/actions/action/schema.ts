import { Action, ActionType } from "@prisma/client";
import z from "zod";

const actionType = z.enum(
  Object.values(ActionType) as [ActionType, ...ActionType[]],
  {
    error: (issue) =>
      `Invalid role. Expected one of ${Object.values(ActionType).join(
        ", "
      )}, received '${issue.input}'`,
  }
);

export const actionSchema = z.object({
  id: z.number(),
  name: z.string(),
  type: actionType,
  enabled: z.boolean(),
  order: z.number(),
  parameters: z.any().nullable(),
  scriptID: z.number(),
  triggerID: z.number().nullable(),
  createdAt: z.date(),
  updatedAt: z.date(),
}) satisfies z.infer<Action>;

export const actionWithRelations: z.ZodType<
  z.infer<typeof actionSchema> & {
    script?: any | null;
    trigger?: any | null;
  }
> = z.lazy(() =>
  actionSchema.extend({
    script: z.any().nullable().optional(),
    trigger: z.any().nullable().optional(),
  })
);

export const createActionSchema = z.object({
  name: z.string(),
  type: actionType,
  enabled: z.boolean().optional(),
  order: z.number().optional(),
  parameters: z.any().optional(),
  scriptID: z.number(),
  triggerID: z.number().optional(),
});

export const updateActionSchema = z.object({
  id: z.number(),
  name: z.string().optional(),
  type: actionType.optional(),
  enabled: z.boolean().optional(),
  order: z.number().optional(),
  parameters: z.any().optional(),
  scriptID: z.number().optional(),
  triggerID: z.number().nullable().optional(),
});

export const deleteActionSchema = z.object({
  id: z.number(),
});

export type action = z.infer<typeof actionWithRelations>;
export type CreateActionInput = z.infer<typeof createActionSchema>;
export type UpdateActionInput = z.infer<typeof updateActionSchema>;
export type DeleteActionInput = z.infer<typeof deleteActionSchema>;

export type ReturnTypeCreateAction = {
  data?: action;
  error?: string;
};

export type ReturnTypeUpdateAction = {
  data?: action;
  error?: string;
};

export type ReturnTypeDeleteAction = {
  data?: { id: number };
  error?: string;
};

export type ReturnTypeGetAction = {
  data?: action;
  error?: string;
};

export type ReturnTypeGetActions = {
  data?: action[];
  error?: string;
};
