export enum ResourceType {
  ExtResource,
  SubResource,
}

export enum AssetType {
  Script = "Script",
  TileSet = "TileSet",
  Texture2D = "Texture2D",
  JSON = "JSON",
}

type BaseResource = {
  name: string;
  type: AssetType;
  path: string;
  id: number;
  //   resType: ResourceType;
};

export type Resource =
  | (BaseResource & {
      resType: ResourceType.SubResource;
      property: Record<string, any>;
    })
  | (BaseResource & {
      resType: ResourceType.ExtResource;
    });
