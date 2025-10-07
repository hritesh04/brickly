"use server";

import { prisma } from "@/lib/prisma";
import {
  CreateActionInput,
  createActionSchema,
  UpdateActionInput,
  updateActionSchema,
  DeleteActionInput,
  deleteActionSchema,
  ReturnTypeCreateAction,
  ReturnTypeUpdateAction,
  ReturnTypeDeleteAction,
  ReturnTypeGetAction,
  ReturnTypeGetActions,
} from "./schema";
import { createSafeAction } from "@/lib/actionState";

async function createActionHandler(data: CreateActionInput): Promise<ReturnTypeCreateAction> {
  try {
    const res = await prisma.action.create({
      data: {
        name: data.name,
        type: data.type,
        enabled: data.enabled ?? true,
        order: data.order ?? 0,
        parameters: data.parameters,
        scriptID: data.scriptID,
        triggerID: data.triggerID,
      },
      include: {
        script: true,
        trigger: true,
      },
    });

    return { data: res };
  } catch (error: any) {
    console.error(error);
    return { error: "Failed to create action" };
  }
}

async function updateActionHandler(data: UpdateActionInput): Promise<ReturnTypeUpdateAction> {
  try {
    const res = await prisma.action.update({
      where: {
        id: data.id,
      },
      data: {
        ...data,
      },
      include: {
        script: true,
        trigger: true,
      },
    });
    return { data: res };
  } catch (error: any) {
    console.error(error);
    return { error: "Failed to update action" };
  }
}

async function deleteActionHandler(data: DeleteActionInput): Promise<ReturnTypeDeleteAction> {
  try {
    await prisma.action.delete({
      where: {
        id: data.id,
      },
    });
    return { data: { id: data.id } };
  } catch (error: any) {
    console.error(error);
    return { error: "Failed to delete action" };
  }
}

async function getActionHandler(id: number): Promise<ReturnTypeGetAction> {
  try {
    const action = await prisma.action.findUnique({
      where: {
        id,
      },
      include: {
        script: true,
        trigger: true,
      },
    });

    if (!action) {
      return { error: "Action not found" };
    }

    return { data: action };
  } catch (error: any) {
    console.error(error);
    return { error: "Failed to get action" };
  }
}

async function getActionsHandler(scriptID?: number, triggerID?: number): Promise<ReturnTypeGetActions> {
  try {
    const whereClause: any = {};
    if (scriptID) whereClause.scriptID = scriptID;
    if (triggerID) whereClause.triggerID = triggerID;

    const actions = await prisma.action.findMany({
      where: whereClause,
      include: {
        script: true,
        trigger: true,
      },
    });

    return { data: actions };
  } catch (error: any) {
    console.error(error);
    return { error: "Failed to get actions" };
  }
}

export const createAction = createSafeAction(createActionSchema, createActionHandler);
export const updateAction = createSafeAction(updateActionSchema, updateActionHandler);
export const deleteAction = createSafeAction(deleteActionSchema, deleteActionHandler);
export const getAction = getActionHandler;
export const getActions = getActionsHandler;
