"use server";

import { prisma } from "@/lib/prisma";
import {
  CreateTriggerInput,
  createTriggerSchema,
  UpdateTriggerInput,
  updateTriggerSchema,
  DeleteTriggerInput,
  deleteTriggerSchema,
  ReturnTypeCreateTrigger,
  ReturnTypeUpdateTrigger,
  ReturnTypeDeleteTrigger,
  ReturnTypeGetTrigger,
  ReturnTypeGetTriggers,
} from "./schema";
import { createSafeAction } from "@/lib/actionState";

async function createTriggerHandler(data: CreateTriggerInput): Promise<ReturnTypeCreateTrigger> {
  try {
    const res = await prisma.trigger.create({
      data: {
        name: data.name,
        type: data.type,
        enabled: data.enabled ?? true,
        conditions: data.conditions,
        scriptID: data.scriptID,
      },
      include: {
        script: true,
        actions: true,
      },
    });

    return { data: res };
  } catch (error: any) {
    console.error(error);
    return { error: "Failed to create trigger" };
  }
}

async function updateTriggerHandler(data: UpdateTriggerInput): Promise<ReturnTypeUpdateTrigger> {
  try {
    const res = await prisma.trigger.update({
      where: {
        id: data.id,
      },
      data: {
        ...data,
      },
      include: {
        script: true,
        actions: true,
      },
    });
    return { data: res };
  } catch (error: any) {
    console.error(error);
    return { error: "Failed to update trigger" };
  }
}

async function deleteTriggerHandler(data: DeleteTriggerInput): Promise<ReturnTypeDeleteTrigger> {
  try {
    await prisma.trigger.delete({
      where: {
        id: data.id,
      },
    });
    return { data: { id: data.id } };
  } catch (error: any) {
    console.error(error);
    return { error: "Failed to delete trigger" };
  }
}

async function getTriggerHandler(id: number): Promise<ReturnTypeGetTrigger> {
  try {
    const trigger = await prisma.trigger.findUnique({
      where: {
        id,
      },
      include: {
        script: true,
        actions: true,
      },
    });

    if (!trigger) {
      return { error: "Trigger not found" };
    }

    return { data: trigger };
  } catch (error: any) {
    console.error(error);
    return { error: "Failed to get trigger" };
  }
}

async function getTriggersHandler(scriptID?: number): Promise<ReturnTypeGetTriggers> {
  try {
    const whereClause = scriptID ? { scriptID } : {};

    const triggers = await prisma.trigger.findMany({
      where: whereClause,
      include: {
        script: true,
        actions: true,
      },
    });

    return { data: triggers };
  } catch (error: any) {
    console.error(error);
    return { error: "Failed to get triggers" };
  }
}

export const createTrigger = createSafeAction(createTriggerSchema, createTriggerHandler);
export const updateTrigger = createSafeAction(updateTriggerSchema, updateTriggerHandler);
export const deleteTrigger = createSafeAction(deleteTriggerSchema, deleteTriggerHandler);
export const getTrigger = getTriggerHandler;
export const getTriggers = getTriggersHandler;
