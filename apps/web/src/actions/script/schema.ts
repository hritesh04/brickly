import z from "zod";
import { Script } from "@prisma/client";

export const scriptSchema = z.object({
  id: z.number(),
  name: z.string(),
  content: z.string().nullable(),
  nodeID: z.number(),
  createdAt: z.date(),
  updatedAt: z.date(),
}) satisfies z.ZodType<Script>;

export const scriptWithRelations: z.ZodType<
  z.infer<typeof scriptSchema> & {
    actions?: Array<any> | null;
    triggers?: Array<any> | null;
  }
> = z.lazy(() =>
  scriptSchema.extend({
    actions: z.array(z.any()).nullable().optional(),
    triggers: z.array(z.any()).nullable().optional(),
  })
);

export const createScriptSchema = z.object({
  name: z.string(),
  content: z.string().optional(),
  nodeID: z.number(),
});

export const updateScriptSchema = z.object({
  id: z.number(),
  name: z.string().optional(),
  content: z.string().optional(),
});

export const deleteScriptSchema = z.object({
  id: z.number(),
});

export type script = z.infer<typeof scriptWithRelations>;
export type CreateScriptInput = z.infer<typeof createScriptSchema>;
export type UpdateScriptInput = z.infer<typeof updateScriptSchema>;
export type DeleteScriptInput = z.infer<typeof deleteScriptSchema>;

export type ReturnTypeCreateScript = {
  data?: script;
  error?: string;
};

export type ReturnTypeUpdateScript = {
  data?: script;
  error?: string;
};

export type ReturnTypeDeleteScript = {
  data?: { id: number };
  error?: string;
};

export type ReturnTypeGetScript = {
  data?: script;
  error?: string;
};

export type ReturnTypeGetScripts = {
  data?: script[];
  error?: string;
};
