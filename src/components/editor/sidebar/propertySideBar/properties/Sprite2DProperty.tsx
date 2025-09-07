"use client";
import { useEditor } from "@/store/editor";
import { Sprite2DProperty as SpriteProperty } from "@/types/property";
import { observer } from "mobx-react-lite";
export const Sprite2DProperty = observer(() => {
  const editor = useEditor();
  const propery = editor.activeNode?.property as SpriteProperty;
  return (
    <div>
      <p className=" font-semibold">Sprite 2D</p>
      <div className=" flex flex-col p-2">
        <div className=" flex gap-4">
          <span className="text-md font-medium text-sidebar-foreground/80">
            Texture
          </span>
          <input type="file" />
        </div>
      </div>
    </div>
  );
});
