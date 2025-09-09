import { Resource } from "@/actions/resource/schema";
import { variant } from "./variant";
import { ResourceType } from "@prisma/client";

export interface BaseProperty {
  canvas: CanvasItemProperty;
}

export type Property = {
  transform: TransformProperty;
  canvas: CanvasItemProperty;
  sprite_2d: SpriteProperty;
  collison: CollisionProperty;
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

export enum CollisionShapeType {
  SegmentShape2D = "SegmentShape2D",
  CircleShape2D = "CircleShape2D",
  RectangleShape2D = "RectangleShape2D",
  CapsuleShap2D = "CapsuleShap2D",
  CollisionPolygon2D = "CollisionPolygon2D",
}
export interface CollisionShapeProperty {
  a: { name: "a"; type: variant.Vector2; value: { x: number; y: number } };
  b: { name: "b"; type: variant.Vector2; value: { x: number; y: number } };
}

export type SubResource = CollisionProperty;

export interface CollisionProperty {
  shape: { type: ResourceType; value: number };
}

export interface SpriteProperty {
  texture: { type: ResourceType; value: number };
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
