"use client";
import { createResource } from "@/actions/resource";
import { useAction } from "@/hooks/useAction";
import { useEditor } from "@/store/editor";
import { useProjectManager } from "@/store/project";
import { Property, Sprite2DProperty as SpriteProperty } from "@/types/property";
import { AssetType, ResourceType } from "@prisma/client";
import { observer } from "mobx-react-lite";
import React from "react";
export const Sprite2DProperty = observer(() => {
  const editor = useEditor();
  const project = useProjectManager();
  const { execute } = useAction(createResource, {
    onSuccess(data) {
      editor.addResource(data);
      editor.setProperty("sprite_2d", "texture", data);
    },
    onError(error) {
      console.log(error);
    },
  });
  const property = editor.activeNode?.property as Property;
  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) throw new Error("File not selected");
    execute({
      name: "texture",
      assetType: AssetType.Texture2D,
      type: ResourceType.ExtResource,
      projectID: project.project?.id,
      parentID: editor.activeNode!.id,
      file: files[0],
    });
  };
  return (
    <div>
      <p className=" font-semibold">Sprite 2D</p>
      <div className=" flex flex-col p-2">
        <div className=" flex gap-4">
          <span className="text-md font-medium text-sidebar-foreground/80">
            Texture
          </span>
          <input
            type="file"
            onChange={handleUpload}
            // defaultValue={property?.sprite_2d?.texture?.name || ""}
          />
          <span>{property?.sprite_2d?.texture?.path || ""}</span>
        </div>
      </div>
    </div>
  );
});
