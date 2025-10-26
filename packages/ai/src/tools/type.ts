import { RunnableToolLike } from "@langchain/core/runnables";
import {
  DynamicTool,
  StructuredToolInterface,
  DynamicStructuredTool,
} from "@langchain/core/tools";
import z from "zod";

type ServerTool = Record<string, unknown>;
type ClientTool = StructuredToolInterface | DynamicTool | RunnableToolLike;

export type Tool = (ServerTool | ClientTool)[];

export type ToolDescription = {
  name: string;
  description?: string;
  schema?:
    | z.ZodObject<{
        request: z.ZodString;
      }>
    | undefined;
};
