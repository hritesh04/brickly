import { CollisionShapeType } from "./property";

export enum ResourceType {
  ExtResource = "ExtResource",
  SubResource = "SubResource",
}

export enum AssetType {
  Script = "Script",
  TileSet = "TileSet",
  Texture2D = "Texture2D",
  JSON = "JSON",
}

type BaseResource = {
  id: number;
  name: string;
  assetType: AssetType;
  // path: string;
};

export type SubResourceType = CollisionShapeType;

// interface SubResource extends BaseResource {
//   type: ResourceType.SubResource;
//   property: Record<string, any>;
// }

// interface ExtResource extends BaseResource {
//   type: ResourceType.ExtResource;
//   path: string;
// }

// export type Resource = SubResource | ExtResource;
