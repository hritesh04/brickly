import { Resource } from "@/actions/resource/schema";
import { variant } from "./variant";

export interface BaseProperty {
  canvas: CanvasItemProperty;
}

export type Property = {
  transform: TransformProperty;
  canvas: CanvasItemProperty;
  sprite_2d: SpriteProperty;
};

export interface Node2DProperty extends BaseProperty {
  transform?: TransformProperty;
}

export interface Sprite2DProperty extends Node2DProperty {
  texture: Resource;
}
export interface AnimatedSprite2DProperty extends Node2DProperty {
  texture: Resource;
}

export interface SpriteProperty {
  texture: Resource;
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
