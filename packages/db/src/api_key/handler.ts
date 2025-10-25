import { prisma } from "../client.js";
import { CheckAPIKeyOutput } from "./schema.js";

export async function CheckAPIKey(
  key: string
): Promise<CheckAPIKeyOutput | null> {
  const res = await prisma.apiKey.findUnique({
    where: {
      key,
    },
    select: {
      userID: true,
    },
  });
  console.log("db", res);
  if (!res) return null;
  return { ...res, valid: true };
}
