import z from "zod";
import { Trigger } from "@prisma/client";

export const triggerSchema = z.object({
  id: z.number(),
  name: z.string(),
  type: z.string(),
  enabled: z.boolean(),
  conditions: z.any().nullable(),
  scriptID: z.number(),
  createdAt: z.date(),
  updatedAt: z.date(),
}) satisfies z.ZodType<Trigger>;

export const triggerWithRelations: z.ZodType<
  z.infer<typeof triggerSchema> & {
    script?: any | null;
    actions?: Array<any> | null;
  }
> = z.lazy(() =>
  triggerSchema.extend({
    script: z.any().nullable().optional(),
    actions: z.array(z.any()).nullable().optional(),
  })
);

export const createTriggerSchema = z.object({
  name: z.string(),
  type: z.string(),
  enabled: z.boolean().optional(),
  conditions: z.any().optional(),
  scriptID: z.number(),
});

export const updateTriggerSchema = z.object({
  id: z.number(),
  name: z.string().optional(),
  type: z.string().optional(),
  enabled: z.boolean().optional(),
  conditions: z.any().optional(),
  scriptID: z.number().optional(),
});

export const deleteTriggerSchema = z.object({
  id: z.number(),
});

export type trigger = z.infer<typeof triggerWithRelations>;
export type CreateTriggerInput = z.infer<typeof createTriggerSchema>;
export type UpdateTriggerInput = z.infer<typeof updateTriggerSchema>;
export type DeleteTriggerInput = z.infer<typeof deleteTriggerSchema>;

export type ReturnTypeCreateTrigger = {
  data?: trigger;
  error?: string;
};

export type ReturnTypeUpdateTrigger = {
  data?: trigger;
  error?: string;
};

export type ReturnTypeDeleteTrigger = {
  data?: { id: number };
  error?: string;
};

export type ReturnTypeGetTrigger = {
  data?: trigger;
  error?: string;
};

export type ReturnTypeGetTriggers = {
  data?: trigger[];
  error?: string;
};
