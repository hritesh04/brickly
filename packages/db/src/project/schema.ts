import { Resource } from "../resource/schema.js";

export type CreateProjectInput = {
  name: string;
  height: number;
  width: number;
  userID: number;
};

export type Project = {
  id: number;
  name: string;
  icon: string | null;
  height: number;
  width: number;
  property: any | null;
  userID: number;
  resource: Resource[] | null;
};
