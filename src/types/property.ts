import { AssetType, ResourceType } from "./resource";
import { variant } from "./variant";

interface BaseProperty {
  canvas: CanvasItemProperty;
}

export type Property = {
  transform: TransformProperty;
  canvas: CanvasItemProperty;
  sprite_2d: Sprite2DProperty;
};

export interface Node2DProperty extends BaseProperty {
  transform: TransformProperty;
}

export interface Sprite2DProperty extends Node2DProperty {
  sprite_2d: { texture: { type: AssetType.Texture2D } };
}
export interface AnimatedSprite2DProperty extends Node2DProperty {
  sprite_2d: { texture: { type: AssetType.Texture2D } };
}

export interface TransformProperty {
  position: {
    name: "position";
    type: variant.Vector2;
    value: { x: number; y: number };
  };
  rotation: { name: "rotation"; type: variant.Float; value: number };
  scale: {
    name: "scale";
    type: variant.Vector2;
    value: { x: number; y: number };
  };
  skew: { name: "skew"; type: variant.Float; value: number };
}

export interface CanvasItemProperty {
  visible: { name: "visible"; type: variant.Bool; value: boolean };
  ZIndex: { name: "z_index"; type: variant.Int; value: number };
}
