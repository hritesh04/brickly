import { prisma } from "../client.js";
import { User } from "./schema.js";

export async function getUserByID(id: number): Promise<User | null> {
  try {
    const res = await prisma.user.findUnique({
      where: { id },
    });
    if (!res) return null;
    return res;
  } catch (error) {
    console.error(error);
    throw new Error("error finding user by id");
  }
}

export async function getUserByEmail(email: string): Promise<User | null> {
  const res = await prisma.user.findUnique({
    where: { email },
  });
  if (!res) return null;

  return res;
}

export async function createUser(
  name: string,
  email: string,
  password: string
): Promise<User> {
  const user = await prisma.user.create({
    data: {
      name,
      email,
      password,
    },
  });
  // if (!user) {
  //   return null;
  // }
  return user;
}
