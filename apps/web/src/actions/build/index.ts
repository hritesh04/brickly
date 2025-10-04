"use server";
import { ActionState, createSafeAction } from "@/lib/actionState";
import { BuildInput, buildSchema } from "./schema";
import { cookies } from "next/headers";

async function buildHandler(
  data: BuildInput
): Promise<ActionState<BuildInput, any>> {
  try {
    const cookie = await cookies();
    const token = cookie.get("brickly");

    if (!token) {
      console.error("No auth token found in cookies");
      return {
        error: "No authentication token found",
      };
    }

    console.log("Token found:", token.value);

    const res = await fetch(`http://localhost:3001/build`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token.value}`,
      },
      body: JSON.stringify({
        projectID: data.projectID,
        buildType: data.buildType,
      }),
    });

    if (!res.ok) {
      console.log(`Build failed: ${res.statusText}`);
      return { error: res.statusText };
    }

    const responseData = await res.json();
    console.log("Build success:", responseData);

    return {
      data: responseData,
    };
  } catch (err) {
    console.error("Error building:", err);
    return {
      error: err instanceof Error ? err.message : "An unknown error occurred",
    };
  }
}

export const buildProject = createSafeAction(buildSchema, buildHandler);
