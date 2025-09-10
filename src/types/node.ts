import {
  AnimatedSprite2DProperty,
  Node2DProperty,
  Sprite2DProperty,
} from "./property";
import { Resource } from "@prisma/client";

export enum NodeType {
  Node = "Node",
  Node2D = "Node2D",
  Sprite2D = "Sprite2D",
  AnimatedSprite2D = "AnimatedSprite2D",
  PackedScene = "PackedScene",
}

interface BaseNode {
  name: string;
  // type: NodeType;
  children?: INode[];
  resource?: Resource[];
}

export interface Node extends BaseNode {
  type: NodeType.Node;
}

export interface Node2D extends BaseNode {
  type: NodeType.Node2D;
  property?: Node2DProperty;
}
export interface Sprite2D extends BaseNode {
  type: NodeType.Sprite2D;
  property?: Sprite2DProperty;
}

interface AnimatedSprite2D extends BaseNode {
  type: NodeType.AnimatedSprite2D;
  property?: AnimatedSprite2DProperty;
}

export type INode = Node | Node2D | Sprite2D | AnimatedSprite2D;

// export type Node = BaseNode &
// (
//   | { type: NodeType.Node }
//   | { type: NodeType.Node2D; property?: Node2DProperty }
//   | { type: NodeType.Sprite2D; property?: Sprite2DProperty }
//   | { type: NodeType.AnimatedSprite2D; property?: AnimatedSprite2DProperty }
// );
