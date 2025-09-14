import { useEditor } from "@/store/editor";
import { NodeType } from "@prisma/client";
import { observer } from "mobx-react-lite";
import { Area2DProperty } from "./properties/Area2DProperty";
import { StaticBody2DProperty } from "./properties/StaticBody2DProperty";
import { RigidBody2DProperty } from "./properties/RigidBody2DProperty";
import { CharacterBody2DProperty } from "./properties/CharacterBody2DProperty";
import { Sprite2DProperty } from "./properties/Sprite2DProperty";
import { AnimatedSprite2DProperty } from "./properties/AnimatedSprite2DProperty";
import { CollisionShape2DProperty } from "./properties/CollisionShape2DProperty";

export const NodeBasedProperty = observer(() => {
  const editor = useEditor();
  const activeNode = editor.activeNode;
  if (!activeNode) return <p className="text-sm text-gray-600">Select a Scene or Node to see its properties</p>;
  switch (activeNode?.type) {
    case NodeType.Sprite2D:
      return <Sprite2DProperty />;
    case NodeType.AnimatedSprite2D:
      return <AnimatedSprite2DProperty />;
    case NodeType.Area2D:
      return <Area2DProperty />;
    case NodeType.StaticBody2D:
      return <StaticBody2DProperty />;
    case NodeType.RigidBody2D:
      return <RigidBody2DProperty />;
    case NodeType.CharacterBody2D:
      return <CharacterBody2DProperty />;
    case NodeType.CollisionShape2D || NodeType.CollisionPolygon2D:
      return <CollisionShape2DProperty />;
    default:
      return <p className="text-sm text-gray-600">Invalid Node Type</p>;
  }
});
