import { Resource } from "@/actions/resource/schema";
import { useEditor } from "@/store/editor";
import { useResourceStore } from "@/store/resource";
import {
  ResourceProperty,
  Sprite2DProperty,
  SegmentShape2D,
  CircleShape2D,
  RectangleShape2D,
  CapsuleShape2D,
  CollisionPolygon2D,
  variant,
} from "@brickly/types";
import { AssetType } from "@brickly/db";
import { KonvaEventObject, Node, NodeConfig } from "konva/lib/Node";
import { observer } from "mobx-react-lite";
import { Circle, Image, Line, Text, Rect, Ellipse } from "react-konva";
import useImage from "use-image";

const stopKonvaPropagation = (
  e: KonvaEventObject<MouseEvent, Node<NodeConfig>>
) => {
  e.cancelBubble = true;
  e.evt.stopPropagation();
  e.evt.preventDefault();
};

export const ResourceCanvas = observer(
  ({ id, resourceClick }: { id: number; resourceClick: () => void }) => {
    // useEffect(() => {});
    const resStore = useResourceStore();
    const resource = resStore.getById(id);
    if (!resource) return;
    const editor = useEditor();
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
            resourceClick();
            resStore.setActiveResource(resource);
            e.cancelBubble = true;
          }}
          onDragMove={(e) => {
            editor.setProperty("transform", "position", {
              name: "position",
              type: variant.Vector2,
              value: { x: e.target.x(), y: e.target.y() },
            });
          }}
          onDragStart={(e) => {
            resourceClick();
            resStore.setActiveResource(resource);
            stopKonvaPropagation(e);
          }}
          onMouseDown={stopKonvaPropagation}
        />
        // </Layer>
      );
    }

    if (resource.assetType === AssetType.SegmentShape2D) {
      const property = resource.property as ResourceProperty;
      const collision = property?.collision?.shape as SegmentShape2D;
      return (
        <>
          <Circle
            radius={10}
            x={collision?.value?.a?.x || 0}
            y={collision?.value?.a?.y || 0}
            fill="red"
            draggable
            onClick={(e) => {
              resourceClick();
              resStore.setActiveResource(resource);
              e.cancelBubble = true;
            }}
            onDragMove={(e) => {
              resStore.setResourceProperty(resource.id, "collision", "shape", {
                name: "SegmentShape2D",
                type: variant.Vector2,
                value: {
                  a: { x: e.target.x(), y: e.target.y() },
                  b: { x: collision?.value?.b?.x, y: collision?.value?.b?.y },
                },
              });
            }}
            onDragStart={(e) => {
              resourceClick();
              resStore.setActiveResource(resource);
              stopKonvaPropagation(e);
            }}
            onMouseDown={(e) => {
              resourceClick();
              stopKonvaPropagation(e);
            }}
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
              resourceClick();
              resStore.setActiveResource(resource);
              e.cancelBubble = true;
            }}
            onDragMove={(e) => {
              resStore.setResourceProperty(resource.id, "collision", "shape", {
                name: "SegmentShape2D",
                type: variant.Vector2,
                value: {
                  a: { x: collision?.value?.a?.x, y: collision?.value?.a?.y },
                  b: { x: e.target.x(), y: e.target.y() },
                },
              });
            }}
            onDragStart={(e) => {
              resourceClick();
              resStore.setActiveResource(resource);
              stopKonvaPropagation(e);
            }}
            onMouseDown={(e) => {
              resourceClick();
              stopKonvaPropagation(e);
            }}
          />
        </>
      );
    }

    if (resource.assetType === AssetType.CircleShape2D) {
      const nodeProperty = editor.activeNode?.property as ResourceProperty;
      const property = resource.property as ResourceProperty;
      const collision = property?.collision?.shape as unknown as CircleShape2D;
      const radius = collision?.value?.radius || 50;
      const x = nodeProperty?.transform?.position?.value?.x || 0;
      const y = nodeProperty?.transform?.position?.value?.y || 0;

      return (
        <>
          <Circle
            radius={radius}
            x={x}
            y={y}
            stroke="blue"
            strokeWidth={2}
            fill="rgba(0, 100, 255, 0.2)"
            onClick={(e) => {
              resourceClick();
              resStore.setActiveResource(resource);
              e.cancelBubble = true;
            }}
            onMouseDown={stopKonvaPropagation}
          />

          <Circle
            radius={8}
            x={x}
            y={y}
            fill="red"
            strokeWidth={2}
            draggable
            onClick={(e) => {
              resourceClick();
              resStore.setActiveResource(resource);
              e.cancelBubble = true;
            }}
            onDragMove={(e) => {
              editor.setProperty("transform", "position", {
                name: "position",
                type: variant.Vector2,
                value: { x: e.target.x(), y: e.target.y() },
              });
            }}
            onDragStart={(e) => {
              resourceClick();
              resStore.setActiveResource(resource);
              stopKonvaPropagation(e);
            }}
            onMouseDown={stopKonvaPropagation}
          />

          <Circle
            radius={8}
            x={x + radius}
            y={y}
            fill="red"
            strokeWidth={2}
            draggable
            onClick={(e) => {
              resourceClick();
              resStore.setActiveResource(resource);
              e.cancelBubble = true;
            }}
            onDragMove={(e) => {
              const newRadius = Math.abs(e.target.x() - x);
              if (newRadius >= 5) {
                e.target.y(y); // Keep y position fixed
                resStore.setResourceProperty(
                  resource.id,
                  "collision",
                  "shape",
                  {
                    name: "CircleShape2D",
                    type: variant.Float,
                    value: { radius: newRadius },
                  }
                );
              }
            }}
            onDragStart={(e) => {
              resourceClick();
              resStore.setActiveResource(resource);
              stopKonvaPropagation(e);
            }}
            onMouseDown={stopKonvaPropagation}
          />
        </>
      );
    }

    if (resource.assetType === AssetType.RectangleShape2D) {
      const property = resource.property as ResourceProperty;
      const collision = property?.collision
        ?.shape as unknown as RectangleShape2D;
      const size = collision?.value?.size || { x: 100, y: 100 };
      const centerX = property?.transform?.position?.value?.x || 0;
      const centerY = property?.transform?.position?.value?.y || 0;
      const x = centerX - size.x / 2;
      const y = centerY - size.y / 2;

      return (
        <>
          <Rect
            width={size.x}
            height={size.y}
            x={x}
            y={y}
            stroke="blue"
            strokeWidth={2}
            fill="rgba(0, 100, 255, 0.2)"
            draggable
            onClick={(e) => {
              resourceClick();
              resStore.setActiveResource(resource);
              e.cancelBubble = true;
            }}
            onDragMove={(e) => {
              resStore.setResourceProperty(
                resource.id,
                "transform",
                "position",
                {
                  name: "position",
                  type: variant.Vector2,
                  value: {
                    x: e.target.x() + size.x / 2,
                    y: e.target.y() + size.y / 2,
                  },
                }
              );
            }}
            onDragStart={(e) => {
              resourceClick();
              resStore.setActiveResource(resource);
              stopKonvaPropagation(e);
            }}
            onMouseDown={stopKonvaPropagation}
          />

          <Circle radius={5} x={centerX} y={centerY} fill="red" />

          <Circle
            radius={8}
            x={x}
            y={y}
            fill="red"
            strokeWidth={2}
            draggable
            onClick={(e) => {
              resourceClick();
              resStore.setActiveResource(resource);
              e.cancelBubble = true;
            }}
            onDragMove={(e) => {
              const newX = e.target.x();
              const newY = e.target.y();
              const rightEdge = x + size.x;
              const bottomEdge = y + size.y;
              const newWidth = rightEdge - newX;
              const newHeight = bottomEdge - newY;

              if (newWidth > 10 && newHeight > 10) {
                resStore.setResourceProperty(
                  resource.id,
                  "collision",
                  "shape",
                  {
                    name: "RectangleShape2D",
                    type: variant.Vector2,
                    value: {
                      size: { x: newWidth, y: newHeight },
                    },
                  }
                );
                resStore.setResourceProperty(
                  resource.id,
                  "transform",
                  "position",
                  {
                    name: "position",
                    type: variant.Vector2,
                    value: { x: newX + newWidth / 2, y: newY + newHeight / 2 },
                  }
                );
              }
            }}
            onDragStart={(e) => {
              resourceClick();
              resStore.setActiveResource(resource);
              stopKonvaPropagation(e);
            }}
            onMouseDown={stopKonvaPropagation}
          />

          <Circle
            radius={8}
            x={x + size.x}
            y={y}
            fill="red"
            strokeWidth={2}
            draggable
            onClick={(e) => {
              resourceClick();
              resStore.setActiveResource(resource);
              e.cancelBubble = true;
            }}
            onDragMove={(e) => {
              const newX = e.target.x();
              const newY = e.target.y();
              const leftEdge = x;
              const bottomEdge = y + size.y;
              const newWidth = newX - leftEdge;
              const newHeight = bottomEdge - newY;

              if (newWidth > 10 && newHeight > 10) {
                resStore.setResourceProperty(
                  resource.id,
                  "collision",
                  "shape",
                  {
                    name: "RectangleShape2D",
                    type: variant.Vector2,
                    value: {
                      size: { x: newWidth, y: newHeight },
                    },
                  }
                );
                resStore.setResourceProperty(
                  resource.id,
                  "transform",
                  "position",
                  {
                    name: "position",
                    type: variant.Vector2,
                    value: {
                      x: leftEdge + newWidth / 2,
                      y: newY + newHeight / 2,
                    },
                  }
                );
              }
            }}
            onDragStart={(e) => {
              resourceClick();
              resStore.setActiveResource(resource);
              stopKonvaPropagation(e);
            }}
            onMouseDown={stopKonvaPropagation}
          />

          <Circle
            radius={8}
            x={x}
            y={y + size.y}
            fill="red"
            strokeWidth={2}
            draggable
            onClick={(e) => {
              resourceClick();
              resStore.setActiveResource(resource);
              e.cancelBubble = true;
            }}
            onDragMove={(e) => {
              const newX = e.target.x();
              const newY = e.target.y();
              const rightEdge = x + size.x;
              const topEdge = y;
              const newWidth = rightEdge - newX;
              const newHeight = newY - topEdge;

              if (newWidth > 10 && newHeight > 10) {
                resStore.setResourceProperty(
                  resource.id,
                  "collision",
                  "shape",
                  {
                    name: "RectangleShape2D",
                    type: variant.Vector2,
                    value: {
                      size: { x: newWidth, y: newHeight },
                    },
                  }
                );
                resStore.setResourceProperty(
                  resource.id,
                  "transform",
                  "position",
                  {
                    name: "position",
                    type: variant.Vector2,
                    value: {
                      x: newX + newWidth / 2,
                      y: topEdge + newHeight / 2,
                    },
                  }
                );
              }
            }}
            onDragStart={(e) => {
              resourceClick();
              resStore.setActiveResource(resource);
              stopKonvaPropagation(e);
            }}
            onMouseDown={stopKonvaPropagation}
          />

          <Circle
            radius={8}
            x={x + size.x}
            y={y + size.y}
            fill="red"
            strokeWidth={2}
            draggable
            onClick={(e) => {
              resourceClick();
              resStore.setActiveResource(resource);
              e.cancelBubble = true;
            }}
            onDragMove={(e) => {
              const newX = e.target.x();
              const newY = e.target.y();
              const leftEdge = x;
              const topEdge = y;
              const newWidth = newX - leftEdge;
              const newHeight = newY - topEdge;

              if (newWidth > 10 && newHeight > 10) {
                resStore.setResourceProperty(
                  resource.id,
                  "collision",
                  "shape",
                  {
                    name: "RectangleShape2D",
                    type: variant.Vector2,
                    value: {
                      size: { x: newWidth, y: newHeight },
                    },
                  }
                );
                resStore.setResourceProperty(
                  resource.id,
                  "transform",
                  "position",
                  {
                    name: "position",
                    type: variant.Vector2,
                    value: {
                      x: leftEdge + newWidth / 2,
                      y: topEdge + newHeight / 2,
                    },
                  }
                );
              }
            }}
            onDragStart={(e) => {
              resourceClick();
              resStore.setActiveResource(resource);
              stopKonvaPropagation(e);
            }}
            onMouseDown={stopKonvaPropagation}
          />
        </>
      );
    }

    // TODO: need better visual
    if (resource.assetType === AssetType.CapsuleShap2D) {
      const nodeProperty = editor.activeNode?.property as ResourceProperty;
      const property = resource.property as ResourceProperty;
      const collision = property?.collision?.shape as unknown as CapsuleShape2D;
      const radius = collision?.value?.radius || 25;
      const height = collision?.value?.height || 100;
      const x = nodeProperty?.transform?.position?.value?.x || 0;
      const y = nodeProperty?.transform?.position?.value?.y || 0;

      return (
        <>
          <Rect
            width={radius * 2}
            height={height}
            x={x - radius}
            y={y - height / 2}
            stroke="blue"
            strokeWidth={2}
            fill="rgba(0, 100, 255, 0.2)"
            onClick={(e) => {
              resourceClick();
              resStore.setActiveResource(resource);
              e.cancelBubble = true;
            }}
            onMouseDown={stopKonvaPropagation}
          />

          <Circle
            radius={radius}
            x={x}
            y={y - height / 2}
            stroke="blue"
            strokeWidth={2}
            fill="rgba(0, 100, 255, 0.2)"
            clipY={0}
            clipHeight={radius}
          />

          <Circle
            radius={radius}
            x={x}
            y={y + height / 2}
            stroke="blue"
            strokeWidth={2}
            fill="rgba(0, 100, 255, 0.2)"
            clipY={-radius}
            clipHeight={radius}
          />

          <Circle
            radius={8}
            x={x}
            y={y}
            fill="red"
            strokeWidth={2}
            draggable
            onClick={(e) => {
              resourceClick();
              resStore.setActiveResource(resource);
              e.cancelBubble = true;
            }}
            onDragMove={(e) => {
              editor.setProperty("transform", "position", {
                name: "position",
                type: variant.Vector2,
                value: { x: e.target.x(), y: e.target.y() },
              });
            }}
            onDragStart={(e) => {
              resourceClick();
              resStore.setActiveResource(resource);
              stopKonvaPropagation(e);
            }}
            onMouseDown={stopKonvaPropagation}
          />

          <Circle
            radius={8}
            x={x + radius}
            y={y}
            fill="red"
            strokeWidth={2}
            draggable
            onClick={(e) => {
              resourceClick();
              resStore.setActiveResource(resource);
              e.cancelBubble = true;
            }}
            onDragMove={(e) => {
              const newRadius = Math.abs(e.target.x() - x);
              if (newRadius >= 5) {
                e.target.y(y); // Keep y position fixed
                resStore.setResourceProperty(
                  resource.id,
                  "collision",
                  "shape",
                  {
                    name: "CapsuleShape2D",
                    type: variant.Float,
                    value: { radius: newRadius, height: height },
                  }
                );
              }
            }}
            onDragStart={(e) => {
              resourceClick();
              resStore.setActiveResource(resource);
              stopKonvaPropagation(e);
            }}
            onMouseDown={stopKonvaPropagation}
          />

          <Circle
            radius={8}
            x={x}
            y={y + height / 2}
            fill="red"
            strokeWidth={2}
            draggable
            onClick={(e) => {
              resourceClick();
              resStore.setActiveResource(resource);
              e.cancelBubble = true;
            }}
            onDragMove={(e) => {
              const newHeight = Math.abs((e.target.y() - y) * 2);
              if (newHeight >= 10) {
                e.target.x(x); // Keep x position fixed
                resStore.setResourceProperty(
                  resource.id,
                  "collision",
                  "shape",
                  {
                    name: "CapsuleShape2D",
                    type: variant.Float,
                    value: { radius: radius, height: newHeight },
                  }
                );
              }
            }}
            onDragStart={(e) => {
              resourceClick();
              resStore.setActiveResource(resource);
              stopKonvaPropagation(e);
            }}
            onMouseDown={stopKonvaPropagation}
          />
        </>
      );
    }

    // TODO: add popup for options like add node, delete node, etc.
    // if (resource.assetType === AssetType.CollisionPolygon2D) {
    //   const property = resource.property as ResourceProperty;
    //   const collision = property?.collision?.shape as unknown as CollisionPolygon2D;
    //   const polygon = collision?.value?.polygon?.value || [];
    //   const x = property?.transform?.position?.value?.x || 0;
    //   const y = property?.transform?.position?.value?.y || 0;

    //   const points = polygon.length > 0 ? polygon : [0, 0, 50, 0, 50, 50, 0, 50];

    //   return (
    //     <>
    //       <Line
    //         points={points}
    //         x={x}
    //         y={y}
    //         stroke="blue"
    //         strokeWidth={2}
    //         fill="rgba(0, 100, 255, 0.2)"
    //         closed={true}
    //         draggable
    //         onClick={(e) => {
    //           resourceClick();
    //           resStore.setActiveResource(resource);
    //           e.cancelBubble = true;
    //         }}
    //         onDragMove={(e) => {
    //           resStore.setResourceProperty(resource.id, "transform", "position", {
    //             name: "position",
    //             type: variant.Vector2,
    //             value: { x: e.target.x(), y: e.target.y() },
    //           });
    //         }}
    //         onDragStart={(e) => {
    //           resourceClick();
    //           resStore.setActiveResource(resource);
    //           stopKonvaPropagation(e);
    //         }}
    //         onMouseDown={stopKonvaPropagation}
    //       />
    //       <Circle
    //         radius={5}
    //         x={x}
    //         y={y}
    //         fill="red"
    //       />
    //     </>
    //   );
    // }

    return <Text />;
  }
);
