"use server";

import { prisma } from "@/lib/prisma";
import {
  CreateScriptInput,
  createScriptSchema,
  UpdateScriptInput,
  updateScriptSchema,
  DeleteScriptInput,
  deleteScriptSchema,
  ReturnTypeCreateScript,
  ReturnTypeUpdateScript,
  ReturnTypeDeleteScript,
  ReturnTypeGetScript,
  ReturnTypeGetScripts,
} from "./schema";
import { createSafeAction } from "@/lib/actionState";

async function createScriptHandler(data: CreateScriptInput): Promise<ReturnTypeCreateScript> {
  try {
    const res = await prisma.script.create({
      data: {
        name: data.name,
        content: data.content,
        nodeID: data.nodeID,
      },
      include: {
        actions: true,
        triggers: true,
      },
    });

    return { data: res };
  } catch (error: any) {
    console.error(error);
    return { error: "Failed to create script" };
  }
}

async function updateScriptHandler(data: UpdateScriptInput): Promise<ReturnTypeUpdateScript> {
  try {
    const res = await prisma.script.update({
      where: {
        id: data.id,
      },
      data: {
        ...data,
      },
      include: {
        actions: true,
        triggers: true,
      },
    });
    return { data: res };
  } catch (error: any) {
    console.error(error);
    return { error: "Failed to update script" };
  }
}

async function deleteScriptHandler(data: DeleteScriptInput): Promise<ReturnTypeDeleteScript> {
  try {
    await prisma.script.delete({
      where: {
        id: data.id,
      },
    });
    return { data: { id: data.id } };
  } catch (error: any) {
    console.error(error);
    return { error: "Failed to delete script" };
  }
}

async function getScriptHandler(id: number): Promise<ReturnTypeGetScript> {
  try {
    const script = await prisma.script.findUnique({
      where: {
        id,
      },
      include: {
        actions: true,
        triggers: true,
      },
    });

    if (!script) {
      return { error: "Script not found" };
    }

    return { data: script };
  } catch (error: any) {
    console.error(error);
    return { error: "Failed to get script" };
  }
}

async function getScriptsHandler(nodeID?: number): Promise<ReturnTypeGetScripts> {
  try {
    const whereClause = nodeID ? { nodeID } : {};

    const scripts = await prisma.script.findMany({
      where: whereClause,
      include: {
        actions: true,
        triggers: true,
      },
    });

    return { data: scripts };
  } catch (error: any) {
    console.error(error);
    return { error: "Failed to get scripts" };
  }
}

export const createScript = createSafeAction(createScriptSchema, createScriptHandler);
export const updateScript = createSafeAction(updateScriptSchema, updateScriptHandler);
export const deleteScript = createSafeAction(deleteScriptSchema, deleteScriptHandler);
export const getScript = getScriptHandler;
export const getScripts = getScriptsHandler;
