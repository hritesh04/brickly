import z from "zod";

const build = z.enum(["Web", "Android", "Linux", "Windows"]);

export const buildSchema = z.object({
  projectID: z.number(),
  buildType: build,
});

export const buildTask = z.object({
  key: z.string(),
  buildType: build,
});

export type BuildMessage = z.infer<typeof buildSchema>;
export type BuildTask = z.infer<typeof buildTask>;
export type UserJWTPayload = {
  userId: number;
};
