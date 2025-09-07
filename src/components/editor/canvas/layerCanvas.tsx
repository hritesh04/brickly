import { useEffect, useRef, useCallback } from "react";
import Konva from "konva";
import { Stage, Text, Layer, Circle, Sprite, Group } from "react-konva";
import { node } from "@/actions/node/schema";
import { useEditor } from "@/store/editor";
import { NodeType } from "@prisma/client";
import { SpriteCanvas } from "./SpriteCanvas";
export default function NodeCanvas({ node }: { node: node }) {
  return (
    // <Layer key={node.id}>
    <>
      {node.type === NodeType.Sprite2D && <SpriteCanvas node={node} />}
      {node?.children &&
        node.children.map((n) => (
          <Group key={n.id}>
            <NodeCanvas node={n} />
          </Group>
        ))}
    </>
    // </Layer>
  );
}
