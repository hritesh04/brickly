import { node } from "@/actions/node/schema";
import { useEditor } from "@/store/editor";
import { useProjectManager } from "@/store/project";
import {
  CollisionShapeProperty,
  Property,
  Sprite2DProperty,
} from "@/types/property";
import { variant } from "@/types/variant";
import { AssetType, ResourceType } from "@prisma/client";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import {
  Circle,
  Group,
  Image as ImgCanvas,
  KonvaNodeComponent,
  Line,
  Sprite,
  Text,
} from "react-konva";
import useImage from "use-image";

// interface drawableResource {
//   konva: KonvaNodeComponent<any, any>;
// }

export const SpriteCanvas = observer(({ node }: { node: node }) => {
  const [draw, setDraw] = useState<React.FC[]>([]);
  const [imgPath, setImgPath] = useState<string>("");
  const property = node.property as Property;
  const editor = useEditor();
  const project = useProjectManager();
  const [image, status] = useImage(imgPath);
  useEffect(() => {
    const konva: React.FC[] = [];
    console.log(node);
    node.resource?.map((r) => {
      switch (r.assetType) {
        case AssetType.Texture2D:
          // texture resource are mapped to project not nodes
          break;
        case AssetType.SegmentShape2D:
          const line = r.property as CollisionShapeProperty;
          const res = () => (
            <Group>
              <Circle
                draggable
                x={line?.a?.value?.x || 0}
                y={line?.a?.value?.y || 0}
                radius={10}
                fill="red"
                onClick={(e) => {
                  e.cancelBubble = true;
                }}
                onDragStart={(e) => {
                  e.cancelBubble = true;
                  e.evt.stopPropagation();
                  e.evt.preventDefault();
                }}
                onMouseDown={(e) => {
                  e.cancelBubble = true;
                  e.evt.stopPropagation();
                  e.evt.preventDefault();
                }}
              />
              <Line
                points={[
                  line?.a?.value?.x || 0,
                  line?.a?.value?.y || 0,
                  line?.b?.value?.x || 0,
                  line?.b?.value?.y || 0,
                ]}
                stroke="blue"
              />
              <Circle
                draggable
                x={line?.b?.value?.x || 0}
                y={line?.b?.value?.y || 0}
                radius={10}
                fill="red"
                onDragMove={(e) => {
                  // editor.setResourceProperty(ResourceType.SubResource);
                  // editor.setProperty("collison", "shape", {
                  //   type: ResourceType.SubResource,
                  //   value: {
                  //     a: {
                  //       name: "a",
                  //       type: variant.Vector2,
                  //       value: {
                  //         x: line?.a?.value?.x,
                  //         y: line?.a?.value?.y,
                  //       },
                  //     },
                  //     b: {
                  //       name: "b",
                  //       type: variant.Vector2,
                  //       value: { x: e.target.x(), y: e.target.y() },
                  //     },
                  //   },
                  // });
                }}
                onClick={(e) => {
                  e.cancelBubble = true;
                }}
                onDragStart={(e) => {
                  e.cancelBubble = true;
                  e.evt.stopPropagation();
                  e.evt.preventDefault();
                }}
                onMouseDown={(e) => {
                  e.cancelBubble = true;
                  e.evt.stopPropagation();
                  e.evt.preventDefault();
                }}
              />
            </Group>
          );
          konva.push(res);
          break;
        case AssetType.CircleShape2D:
          break;
        case AssetType.RectangleShape2D:
          break;
        case AssetType.CapsuleShap2D:
          break;
        case AssetType.CollisionPolygon2D:
          break;
        default:
      }
      setDraw(konva);
      // ].includes(r.assetType as any)
      // ) {
      // }
    });
    const resID = property?.sprite_2d?.texture?.value;
    const img = project.project?.resource?.find((r) => r.id == resID);
    if (img) setImgPath("/" + img.path);
  }, [node.property]);
  if (!imgPath) return <Text fontSize={32} text="no img" />;
  if (status == "loading" || status == "failed") {
    return <Text text={status} />;
  }
  console.log(draw);
  return (
    <Group>
      {draw.map((D, idx) => (
        <D key={idx} />
      ))}
      <ImgCanvas
        image={image}
        x={property?.transform?.position.value.x || 0}
        y={property?.transform?.position.value.y || 0}
        height={image?.height}
        width={image?.width}
        draggable
        onDragMove={(e) => {
          editor.setProperty("transform", "position", {
            name: "position",
            type: variant.Vector2,
            value: { x: e.target.x(), y: e.target.y() },
          });
        }}
        onClick={(e) => {
          editor.setActiveNode(node);
          e.cancelBubble = true;
        }}
        onDragStart={(e) => {
          editor.setActiveNode(node);
          e.cancelBubble = true;
          e.evt.stopPropagation();
          e.evt.preventDefault();
        }}
        onMouseDown={(e) => {
          e.cancelBubble = true;
          e.evt.stopPropagation();
          e.evt.preventDefault();
        }}
      />
    </Group>
  );
});
