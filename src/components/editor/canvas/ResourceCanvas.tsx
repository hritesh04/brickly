import { node } from "@/actions/node/schema";
import { Resource } from "@/actions/resource/schema";
import { useEditor } from "@/store/editor";
import { useProjectManager } from "@/store/project";
import { useResourceStore } from "@/store/resource";
import {
  CollisionProperty,
  Property,
  Sprite2DProperty,
} from "@/types/property";
import { SegmentShape2D, Texture2D } from "@/types/resource";
import { variant } from "@/types/variant";
import { AssetType } from "@prisma/client";
import { KonvaEventObject, Node, NodeConfig } from "konva/lib/Node";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import {
  Circle,
  Group,
  Image,
  KonvaNodeEvents,
  Layer,
  Line,
  Text,
} from "react-konva";
import useImage from "use-image";

// onDragMove={(e) => {
//   editor.setProperty("transform", "position", {
//     name: "position",
//     type: variant.Vector2,
//     value: { x: e.target.x(), y: e.target.y() },
//   });
// }}
const stopKonvaPropagation = (
  e: KonvaEventObject<MouseEvent, Node<NodeConfig>>
) => {
  e.cancelBubble = true;
  e.evt.stopPropagation();
  e.evt.preventDefault();
};

export const ResourceCanvas = observer(
  ({ resource }: { resource: Resource }) => {
    // useEffect(() => {});
    const resStore = useResourceStore();
    if (resource.assetType == AssetType.Texture2D) {
      const [image] = useImage("/" + resource.path || "");
      const property = resource.property as Sprite2DProperty;
      return (
        // <Layer>
        <Image
          image={image}
          x={property?.transform?.position?.value?.x || 0}
          y={property?.transform?.position?.value?.y || 0}
          height={image?.height}
          width={image?.width}
          draggable
          onClick={(e) => {
            resStore.setActiveResource(resource);
            e.cancelBubble = true;
          }}
          onDragMove={(e) => {
            resStore.setResourceProperty(resource.id, "transform", "position", {
              name: "position",
              type: variant.Vector2,
              value: { x: e.target.x(), y: e.target.y() },
            });
          }}
          onDragStart={() => {
            resStore.setActiveResource(resource);
            stopKonvaPropagation;
          }}
          onMouseDown={stopKonvaPropagation}
        />
        // </Layer>
      );
    }

    if (resource.assetType === AssetType.SegmentShape2D) {
      const property = resource.property as Property;
      const collision = property?.collison?.shape as SegmentShape2D;
      return (
        <>
          <Circle
            radius={10}
            x={collision?.value?.a?.x || 0}
            y={collision?.value?.a?.y || 0}
            fill="red"
            draggable
            onClick={(e) => {
              resStore.setActiveResource(resource);
              e.cancelBubble = true;
            }}
            onDragMove={(e) => {
              resStore.setResourceProperty(resource.id, "collison", "shape", {
                name: "SegmentShape2D",
                type: variant.Vector2,
                value: {
                  a: { x: e.target.x(), y: e.target.y() },
                  b: { x: collision?.value?.b?.x, y: collision?.value?.b?.y },
                },
              });
            }}
            onDragStart={() => {
              resStore.setActiveResource(resource);
              stopKonvaPropagation;
            }}
            onMouseDown={stopKonvaPropagation}
          />
          <Line
            points={[
              collision?.value?.a?.x || 0,
              collision?.value?.a?.y || 0,
              collision?.value?.b?.x || 0,
              collision?.value?.b?.y || 0,
            ]}
            stroke="blue"
          />
          <Circle
            radius={10}
            x={collision?.value?.b?.x || 0}
            y={collision?.value?.b?.y || 0}
            fill="red"
            draggable
            onClick={(e) => {
              resStore.setActiveResource(resource);
              e.cancelBubble = true;
            }}
            onDragMove={(e) => {
              resStore.setResourceProperty(resource.id, "collison", "shape", {
                name: "SegmentShape2D",
                type: variant.Vector2,
                value: {
                  a: { x: collision?.value?.a?.x, y: collision?.value?.a?.y },
                  b: { x: e.target.x(), y: e.target.y() },
                },
              });
            }}
            onDragStart={() => {
              resStore.setActiveResource(resource);
              stopKonvaPropagation;
            }}
            onMouseDown={stopKonvaPropagation}
          />
        </>
      );
    }

    return <Text />;
  }
);
