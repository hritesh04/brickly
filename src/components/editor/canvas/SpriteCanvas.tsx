import { node } from "@/actions/node/schema";
import { Property, Sprite2DProperty } from "@/types/property";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { Image as ImgCanvas, Sprite, Text } from "react-konva";
import useImage from "use-image";

export const SpriteCanvas = observer(({ node }: { node: node }) => {
  const [imgPath, setImgPath] = useState<string>("");
  const property = node.property as Property;
  const [image, status] = useImage(imgPath);
  useEffect(() => {
    const img = property?.sprite_2d?.texture?.path;
    console.log(img);
    if (img) setImgPath("/" + img);
  }, [node.property]);
  if (!imgPath) return <Text text="no img" />;
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
    />
  );
});
