import { Switch } from "@/components/ui/switch";
import { observer } from "mobx-react-lite";
import { useState } from "react";
import { PhysicsProperty } from "./PhysicsProperty";
import { useProjectManager } from "@/store/project";
import { useEditor } from "@/store/editor";
import { useAction } from "@/hooks/useAction";
import { createResource } from "@/actions/resource";
import { Property } from "@/types/property";
import { AssetType, ResourceType } from "@prisma/client";

export const Sprite2DProperty = observer(() => {
  const [visuals, setVisuals] = useState<Set<string>>(new Set());
  const editor = useEditor();

  const project = useProjectManager();

  const property = editor.activeNode?.property as Property;
  const resource = useAction(createResource, {
    onSuccess(data) {
      editor.addResource(data);
      editor.setProperty("sprite_2d", "texture", {
        name: "texture",
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
      name: "texture",
      assetType: AssetType.Texture2D,
      type: ResourceType.ExtResource,
      projectID: project.project.id,
      parentID: editor.activeNode.id,
      file: files[0],
    });
  };

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-semibold text-gray-900">Sprite2D</h3>
      
      <div className="space-y-3">
        <span className="text-sm font-medium text-gray-700">Texture</span>
        <div className="space-y-3">
          {property?.sprite_2d?.texture?.value ? (
            <div className="p-3 bg-gray-50 rounded-md">
              <div className="text-sm text-gray-600 mb-1">Current texture:</div>
              <div className="text-sm font-medium text-gray-900">
                {project.project?.resource?.find(
                  (r) => r.id == property.sprite_2d.texture.value
                )?.path || "Unknown texture"}
              </div>
            </div>
          ) : (
            <div className="p-3 border-2 border-dashed border-gray-300 rounded-md">
              <div className="text-sm text-gray-600 mb-2">No texture assigned</div>
              <input
                type="file"
                onChange={handleUpload}
                accept="image/*"
                className="text-sm file:mr-2 file:py-1 file:px-3 file:rounded file:border-0 file:text-sm file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
});
