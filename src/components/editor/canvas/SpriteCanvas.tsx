import { node } from "@/actions/node/schema";
import { useEditor } from "@/store/editor";
import { Property, Sprite2DProperty } from "@/types/property";
import { variant } from "@/types/variant";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { Image as ImgCanvas, Sprite, Text } from "react-konva";
import useImage from "use-image";

export const SpriteCanvas = observer(({ node }: { node: node }) => {
  const [imgPath, setImgPath] = useState<string>("");
  const property = node.property as Property;
  const editor = useEditor();
  const [image, status] = useImage(imgPath);
  useEffect(() => {
    const img = property?.sprite_2d?.texture?.path;
    if (img) setImgPath("/" + img);
  }, [node.property]);
  if (!imgPath) return <Text fontSize={32} text="no img" />;
  if (status == "loading" || status == "failed") {
    return <Text text={status} />;
  }
  return (
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
        e.evt.stopPropagation();
        e.evt.preventDefault();
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
  );
});
