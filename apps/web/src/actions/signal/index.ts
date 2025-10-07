"use server";

import { prisma } from "@/lib/prisma";
import {
  CreateSignalInput,
  createSignalSchema,
  UpdateSignalInput,
  updateSignalSchema,
  DeleteSignalInput,
  deleteSignalSchema,
  ReturnTypeCreateSignal,
  ReturnTypeUpdateSignal,
  ReturnTypeDeleteSignal,
  ReturnTypeGetSignal,
  ReturnTypeGetSignals,
} from "./schema";
import { createSafeAction } from "@/lib/actionState";

async function createSignalHandler(
  data: CreateSignalInput
): Promise<ReturnTypeCreateSignal> {
  try {
    const res = await prisma.signal.create({
      data: {
        name: data.name,
        fromID: data.fromID,
        toID: data.toID,
        script: data.script,
      },
      include: {
        from: true,
        to: true,
      },
    });

    return { data: res };
  } catch (error: any) {
    console.error(error);
    return { error: "Failed to create signal" };
  }
}

async function updateSignalHandler(
  data: UpdateSignalInput
): Promise<ReturnTypeUpdateSignal> {
  try {
    const res = await prisma.signal.update({
      where: {
        id: data.id,
      },
      data: {
        ...data,
      },
      include: {
        from: true,
        to: true,
      },
    });
    return { data: res };
  } catch (error: any) {
    console.error(error);
    return { error: "Failed to update signal" };
  }
}

async function deleteSignalHandler(
  data: DeleteSignalInput
): Promise<ReturnTypeDeleteSignal> {
  try {
    await prisma.signal.delete({
      where: {
        id: data.id,
      },
    });
    return { data: { id: data.id } };
  } catch (error: any) {
    console.error(error);
    return { error: "Failed to delete signal" };
  }
}

async function getSignalHandler(id: number): Promise<ReturnTypeGetSignal> {
  try {
    const signal = await prisma.signal.findUnique({
      where: {
        id,
      },
      include: {
        from: true,
        to: true,
      },
    });

    if (!signal) {
      return { error: "Signal not found" };
    }

    return { data: signal };
  } catch (error: any) {
    console.error(error);
    return { error: "Failed to get signal" };
  }
}

async function getSignalsHandler(
  projectID?: number
): Promise<ReturnTypeGetSignals> {
  try {
    const whereClause = projectID
      ? {
          OR: [{ from: { projectID } }, { to: { projectID } }],
        }
      : {};

    const signals = await prisma.signal.findMany({
      where: whereClause,
      include: {
        from: true,
        to: true,
      },
    });

    return { data: signals };
  } catch (error: any) {
    console.error(error);
    return { error: "Failed to get signals" };
  }
}

export const createSignal = createSafeAction(
  createSignalSchema,
  createSignalHandler
);
export const updateSignal = createSafeAction(
  updateSignalSchema,
  updateSignalHandler
);
export const deleteSignal = createSafeAction(
  deleteSignalSchema,
  deleteSignalHandler
);
export const getSignal = getSignalHandler;
export const getSignals = getSignalsHandler;
