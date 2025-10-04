import { ActionState } from "@/lib/actionState";
import z from "zod";

const authResponseSchema = z.object({
  success: z.boolean(),
  error: z.string().optional(),
});

export const signinSchema = z.object({
  email: z.email(),
  password: z.string(),
});

export const signupSchema = z.object({
  name: z.string(),
  email: z.email({ error: "Invalid email address" }),
  password: z
    .string()
    .min(6, { error: "Password must be at least 6 characters" }),
});

const returnTypeAuth = authResponseSchema.extend({
  data: z
    .object({
      id: z.number(),
      email: z.email(),
      name: z.string().nullable(),
      token: z.string(),
    })
    .optional(),
});

export type SignInInput = z.infer<typeof signinSchema>;
export type SignUpInput = z.infer<typeof signupSchema>;
export type AuthResponse = z.infer<typeof returnTypeAuth>;
export type ReturnTypeSignIn = ActionState<SignInInput, AuthResponse>;
export type ReturnTypeSignUp = ActionState<SignUpInput, AuthResponse>;
