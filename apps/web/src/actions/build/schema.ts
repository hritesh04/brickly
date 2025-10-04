import z from "zod";

export const buildType = z.enum(["Web", "Linux", "Windows"]);

export const buildSchema = z.object({
  projectID: z.number(),
  buildType,
});

export type BuildInput = z.infer<typeof buildSchema>;
