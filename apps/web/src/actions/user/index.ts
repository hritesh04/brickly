"use server";
import { createSafeAction } from "@/lib/actionState";
import { cookies } from "next/headers";
import { createUser, getUserByEmail, getUserByID } from "@brickly/db";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import {
  ReturnTypeSignIn,
  ReturnTypeSignUp,
  SignInInput,
  signinSchema,
  SignUpInput,
  signupSchema,
} from "./schema";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

export const checkAuth = async () => {
  const cookie = await cookies();
  const token = cookie.get("brickly");
  if (!token) return null;

  try {
    const decoded = jwt.verify(token.value, JWT_SECRET) as { userId: number };

    const user = await getUserByID(decoded.userId);
    return user;
  } catch {
    return null;
  }
};

export const signupHandler = async ({
  name,
  email,
  password,
}: SignUpInput): Promise<ReturnTypeSignIn> => {
  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    return {
      data: { success: false, error: "User with this email already exists" },
    };
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  const user = await createUser(name, email, hashedPassword);

  const token = jwt.sign({ userId: user.id }, JWT_SECRET, {
    expiresIn: "7d",
  });

  (await cookies()).set("brickly", token);

  return { data: { success: true, data: { ...user, token } } };
};

export const signinHandler = async ({
  email,
  password,
}: SignInInput): Promise<ReturnTypeSignUp> => {
  const user = await getUserByEmail(email);

  if (!user) {
    return { data: { success: false, error: "Invalid email or password" } };
  }

  const isValidPassword = await bcrypt.compare(password, user.password);

  if (!isValidPassword) {
    return { data: { success: false, error: "Invalid email or password" } };
  }

  const token = jwt.sign({ userId: user.id }, JWT_SECRET, {
    expiresIn: "7d",
  });

  (await cookies()).set("brickly", token);

  return {
    data: {
      success: true,
      data: { id: user.id, email: user.email, name: user.name, token },
    },
  };
};

export const signout = async () => {
  const cookie = await cookies();
  cookie.delete("brickly");
  return { success: true };
};

export const signin = createSafeAction(signinSchema, signinHandler);

export const signup = createSafeAction(signupSchema, signupHandler);
