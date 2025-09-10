import { CanvasItemProperty, TransformProperty } from "./property";
import { variant } from "./variant";

export interface Script {
  name: "Script";
  type: variant.Text;
  value: string;
}
export interface Texture2D {
  name: "Texture2D";
  type: variant.Text;
  value: string;
}

export interface SegmentShape2D {
  name: "SegmentShape2D";
  type: variant.Vector2;
  value: {
    a: { x: number; y: number };
    b: { x: number; y: number };
  };
}

export interface CollisionPolygon2D {
  name: "CollisionPolygon2D";
  type: variant.Text;
  value: {
    position: {
      name: "position";
      type: variant.Vector2;
      value: { x: number; y: number };
    };
    scale: {
      name: "scale";
      type: variant.Vector2;
      value: { x: number; y: number };
    };
    polygon: {
      name: "position";
      type: variant.PackedVector2Array;
      value: number[];
    };
  };
}

export type ExtResource = Script | Texture2D;
export type SubResource = {
  line: SegmentShape2D;
  polygon: CollisionPolygon2D;
  // transform: TransformProperty;
  // canvas: CanvasItemProperty;
};
