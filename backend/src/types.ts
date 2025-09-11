import z from "zod";

const build = z.enum(["Web", "Android", "Linux", "Windows"]);

export const buildSchema = z.object({
  projectID: z.number(),
  buildType: build,
});

export type BuildMessage = z.infer<typeof buildSchema>;
export type UserJWTPayload = {
  userId: number;
};
