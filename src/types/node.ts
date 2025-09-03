import {
  AnimatedSprite2DProperty,
  Node2DProperty,
  Sprite2DProperty,
} from "./property";
import { Resource } from "./resource";

export enum NodeType {
  Node = "Node",
  Node2D = "Node2D",
  Sprite2D = "Sprite2D",
  AnimatedSprite2D = "AnimatedSprite2D",
  PackedScene = "PackedScene",
}

interface BaseNode {
  name: string;
  type: NodeType;
  children?: Node[];
  resource?: Resource[];
}

export type Node = BaseNode &
  (
    | { type: NodeType.Node }
    | { type: NodeType.Node2D; property?: Node2DProperty }
    | { type: NodeType.Sprite2D; property?: Sprite2DProperty }
    | { type: NodeType.AnimatedSprite2D; property?: AnimatedSprite2DProperty }
  );
