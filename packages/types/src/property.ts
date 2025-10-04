import { variant } from "./variant";
import { CapsuleShape2D, CircleShape2D, CollisionPolygon2D, RectangleShape2D, SegmentShape2D } from "./resource";

// Define ResourceType enum locally to avoid Prisma dependency
export enum ResourceType {
  ExtResource = "ExtResource",
  SubResource = "SubResource",
}

// Define Resource interface locally to avoid Prisma dependency
export interface Resource {
  id: number;
  name: string;
  type: ResourceType;
  assetType: string;
  path: string | null;
  property: any | null;
  parentID: number | null;
  projectID: number | null;
}

export interface BaseProperty {
  canvas: CanvasItemProperty;
}

export type Property = {
  transform: TransformProperty;
  canvas: CanvasItemProperty;
  sprite_2d: SpriteProperty;
  collision: { shape: { name: "shape"; type: ResourceType; value: number } };
  animated_sprite_2d: AnimatedSprite2DProperty;
  area_2d: Area2DProperty;
  character_body_2d: CharacterBody2DProperty;
  rigid_body_2d: RigidBody2DProperty;
  static_body_2d: StaticBody2DProperty;
};

export type ResourceProperty = {
  transform: TransformProperty;
  collision: { shape: SegmentShape2D | CollisionPolygon2D | CircleShape2D | RectangleShape2D |CapsuleShape2D | CollisionPolygon2D };
};

export interface Node2DProperty extends BaseProperty {
  transform?: TransformProperty;
}

export interface Sprite2DProperty extends Node2DProperty {
  texture: Resource;
}
export interface AnimatedSprite2DProperty extends Node2DProperty {
  sprite_frames?: { name: "sprite_frames"; type: ResourceType; value: number };
  animation?: string;
  autoplay?: string;
  centered?: boolean;
  flip_h?: boolean;
  flip_v?: boolean;
  frame?: number;
  speed_scale?: number;
  offset?: { x: number; y: number };
}

export interface Area2DProperty extends Node2DProperty {
  monitoring?: boolean;
  monitorable?: boolean;
  gravity_override?: boolean;
  gravity?: number;
  gravity_direction?: { x: number; y: number };
  gravity_point?: boolean;
  gravity_point_center?: { x: number; y: number };
  linear_damp?: number;
  angular_damp?: number;
  space_override?: string;
}

export interface CharacterBody2DProperty extends Node2DProperty {
  motion_mode?: string;
  velocity?: { x: number; y: number };
  up_direction?: { x: number; y: number };
  floor_max_angle?: number;
  wall_min_slide_angle?: number;
  max_slides?: number;
  floor_snap_length?: number;
  safe_margin?: number;
  floor_stop_on_slope?: boolean;
}

export interface RigidBody2DProperty extends Node2DProperty {
  mode?: string;
  mass?: number;
  weight?: number;
  friction?: number;
  bounce?: number;
  gravity_scale?: number;
  linear_velocity?: { x: number; y: number };
  angular_velocity?: number;
  linear_damp?: number;
  angular_damp?: number;
  custom_integrator?: boolean;
  contact_monitor?: boolean;
  continuous_cd?: boolean;
  freeze?: boolean;
  max_contacts_reported?: number;
}

export interface StaticBody2DProperty extends Node2DProperty {
  physics_material_override?: {
    name: "physics_material_override";
    type: ResourceType;
    value: number;
  };
  constant_linear_velocity?: { x: number; y: number };
  constant_angular_velocity?: number;
  sync_to_physics?: boolean;
}

export enum CollisionShapeType {
  SegmentShape2D = "SegmentShape2D",
  CircleShape2D = "CircleShape2D",
  RectangleShape2D = "RectangleShape2D",
  CapsuleShap2D = "CapsuleShap2D",
  CollisionPolygon2D = "CollisionPolygon2D",
}

// export type Texture2DProperty

export interface CollisionProperty {
  shape: { name: "shape"; type: CollisionShapeType; value: number };
}

export interface SpriteProperty {
  texture: { name: "texture"; type: ResourceType; value: number };
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
