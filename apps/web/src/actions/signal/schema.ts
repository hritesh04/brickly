import z from "zod";
import { Signal } from "@prisma/client";

export const signalSchema = z.object({
  id: z.number(),
  name: z.string(),
  fromID: z.number(),
  toID: z.number(),
  script: z.string(),
}) satisfies z.ZodType<Signal>;

export const signalWithRelations: z.ZodType<
  z.infer<typeof signalSchema> & {
    from?: any | null;
    to?: any | null;
  }
> = z.lazy(() =>
  signalSchema.extend({
    from: z.any().nullable().optional(),
    to: z.any().nullable().optional(),
  })
);

export const createSignalSchema = z.object({
  name: z.string(),
  fromID: z.number(),
  toID: z.number(),
  script: z.string(),
});

export const updateSignalSchema = z.object({
  id: z.number(),
  name: z.string().optional(),
  fromID: z.number().optional(),
  toID: z.number().optional(),
  script: z.string().optional(),
});

export const deleteSignalSchema = z.object({
  id: z.number(),
});

export type signal = z.infer<typeof signalWithRelations>;
export type CreateSignalInput = z.infer<typeof createSignalSchema>;
export type UpdateSignalInput = z.infer<typeof updateSignalSchema>;
export type DeleteSignalInput = z.infer<typeof deleteSignalSchema>;

export type ReturnTypeCreateSignal = {
  data?: signal;
  error?: string;
};

export type ReturnTypeUpdateSignal = {
  data?: signal;
  error?: string;
};

export type ReturnTypeDeleteSignal = {
  data?: { id: number };
  error?: string;
};

export type ReturnTypeGetSignal = {
  data?: signal;
  error?: string;
};

export type ReturnTypeGetSignals = {
  data?: signal[];
  error?: string;
};
