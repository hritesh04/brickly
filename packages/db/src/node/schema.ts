import { NodeType } from "@prisma/client";
import { Resource } from "../resource/schema.js";
export type NodeInput = {
  id: number;
  name: string;
  type: NodeType;
  parentID: number | null;
  projectID: number | null;
  property: any;
  resource?: Resource[] | null;
};

export type node = NodeInput & {
  children?: NodeInput[];
};

export type CreateNode = {
  type: NodeType;
  parentID?: number;
  projectID?: number;
};

export type UpdateNodeInput = {
  id: number;
  name?: string;
  type?: NodeType;
  parentID?: number | null;
  projectID?: number | null;
  property?: any;
};

export type CreateNodeInput = CreateNode & { children?: CreateNode[] };
