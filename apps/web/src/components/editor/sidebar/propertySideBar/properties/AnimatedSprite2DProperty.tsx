import { observer } from "mobx-react-lite";
import { useState } from "react";
import { useEditor } from "@/store/editor";
import { useProjectManager } from "@/store/project";
import { useAction } from "@/hooks/useAction";
import { createResource } from "@/actions/resource";
import { Property, ResourceType } from "@brickly/types";
import { AssetType } from "@brickly/db";
import { Input } from "@/components/ui/input";

export const AnimatedSprite2DProperty = observer(() => {
  const [visuals, setVisuals] = useState<Set<string>>(new Set());
  const editor = useEditor();
  const project = useProjectManager();

  const property = editor.activeNode?.property as Property;
  const resource = useAction(createResource, {
    onSuccess(data) {
      editor.addResource(data);
      editor.setProperty("animated_sprite_2d", "sprite_frames", {
        name: "sprite_frames",
        type: ResourceType.ExtResource,
        value: data.id,
      });
    },
    onError(error) {
      console.error("Resource creation failed:", error);
    },
  });

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!editor.activeNode || !project.project) return;

    const files = e.target.files;
    if (!files || files.length === 0) {
      console.error("No file selected");
      return;
    }

    resource.execute({
      name: "sprite_frames",
      assetType: AssetType.SpriteFrames,
      type: ResourceType.ExtResource,
      projectID: project.project.id,
      parentID: editor.activeNode.id,
      file: files[0],
    });
  };

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-semibold text-gray-900">AnimatedSprite2D</h3>

      {/* Sprite Frames */}
      <div className="space-y-3">
        <span className="text-sm font-medium text-gray-700">Sprite Frames</span>
        <div className="space-y-3">
          {property?.animated_sprite_2d?.sprite_frames?.value ? (
            <div className="p-3 bg-gray-50 rounded-md">
              <div className="text-sm text-gray-600 mb-1">Current frames:</div>
              <div className="text-sm font-medium text-gray-900">
                {project.project?.resource?.find(
                  (r) =>
                    r.id == property.animated_sprite_2d?.sprite_frames?.value
                )?.path || "Unknown frames"}
              </div>
            </div>
          ) : (
            <div className="p-3 border-2 border-dashed border-gray-300 rounded-md">
              <div className="text-sm text-gray-600 mb-2">
                No frames assigned
              </div>
              <input
                type="file"
                onChange={handleUpload}
                accept=".tres,.res"
                className="text-sm file:mr-2 file:py-1 file:px-3 file:rounded file:border-0 file:text-sm file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              />
            </div>
          )}
        </div>
      </div>

      {/* Animation */}
      <div className="space-y-3">
        <span className="text-sm font-medium text-gray-700">Animation</span>
        <Input
          placeholder="Animation name"
          value={property?.animated_sprite_2d?.animation || ""}
          onChange={(e) =>
            editor.setProperty(
              "animated_sprite_2d",
              "animation",
              e.target.value
            )
          }
          className="text-sm"
        />
      </div>

      {/* Speed Scale */}
      <div className="space-y-3">
        <span className="text-sm font-medium text-gray-700">Speed Scale</span>
        <div className="flex items-center gap-2">
          <Input
            type="number"
            step="0.1"
            className="w-20 text-sm"
            value={property?.animated_sprite_2d?.speed_scale || 1.0}
            onChange={(e) =>
              editor.setProperty(
                "animated_sprite_2d",
                "speed_scale",
                parseFloat(e.target.value) || 1.0
              )
            }
          />
        </div>
      </div>

      {/* Visual Properties */}
      <div className="space-y-3">
        <span className="text-sm font-medium text-gray-700">Visual</span>
        <div className="space-y-3 pl-2">
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="centered"
              checked={property?.animated_sprite_2d?.centered || false}
              onChange={(e) =>
                editor.setProperty(
                  "animated_sprite_2d",
                  "centered",
                  e.target.checked
                )
              }
              className="w-4 h-4"
            />
            <label htmlFor="centered" className="text-sm text-gray-600">
              Centered
            </label>
          </div>
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="flip_h"
              checked={property?.animated_sprite_2d?.flip_h || false}
              onChange={(e) =>
                editor.setProperty(
                  "animated_sprite_2d",
                  "flip_h",
                  e.target.checked
                )
              }
              className="w-4 h-4"
            />
            <label htmlFor="flip_h" className="text-sm text-gray-600">
              Flip H
            </label>
          </div>
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="flip_v"
              checked={property?.animated_sprite_2d?.flip_v || false}
              onChange={(e) =>
                editor.setProperty(
                  "animated_sprite_2d",
                  "flip_v",
                  e.target.checked
                )
              }
              className="w-4 h-4"
            />
            <label htmlFor="flip_v" className="text-sm text-gray-600">
              Flip V
            </label>
          </div>
        </div>
      </div>
    </div>
  );
});
