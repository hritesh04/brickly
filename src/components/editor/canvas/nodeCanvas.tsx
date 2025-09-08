import { useEffect, useRef, useCallback } from "react";
import Konva from "konva";
import { Stage, Text, Layer, Circle, Sprite, Group } from "react-konva";
import { node } from "@/actions/node/schema";
import { useEditor } from "@/store/editor";
import { NodeType } from "@prisma/client";
import { SpriteCanvas } from "./SpriteCanvas";
import { observer } from "mobx-react-lite";
export const NodeCanvas = ({ node }: { node: node }) => {
  return (
    <>
      {node.type === NodeType.Sprite2D && <SpriteCanvas node={node} />}
      {node?.children &&
        node.children.map((n) => (
          <Group key={n.id}>
            <NodeCanvas node={n} />
          </Group>
        ))}
    </>
  );
};
