import { AssetType, ResourceType } from "@prisma/client";
export type Resource = {
  id: number;
  name: string;
  type: ResourceType;
  assetType: AssetType;
  path: string | null;
  property: any | null;
  parentID: number | null;
  projectID: number | null;
};

export type CreateResourceInput = {
  name: string;
  type: ResourceType;
  assetType: AssetType;
  parentID: number;
  projectID?: number | null;
  path: string | null;
};

export type UpdateResourceInput = {
  id: number;
  name?: string;
  type?: ResourceType;
  assetType?: AssetType;
  path?: string | null;
  property?: any | null;
  parentID?: number | null;
  projectID?: number | null;
};
