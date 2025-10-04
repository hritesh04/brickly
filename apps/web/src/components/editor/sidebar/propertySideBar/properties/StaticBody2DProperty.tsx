import { observer } from "mobx-react-lite";
import { useEditor } from "@/store/editor";
import { useProjectManager } from "@/store/project";
import { useAction } from "@/hooks/useAction";
import { createResource } from "@/actions/resource";
import { Property } from "@brickly/types";
import { AssetType, ResourceType } from "@prisma/client";
import { Input } from "@/components/ui/input";

export const StaticBody2DProperty = observer(() => {
  const editor = useEditor();
  const project = useProjectManager();
  const property = editor.activeNode?.property as Property;

  const resource = useAction(createResource, {
    onSuccess(data) {
      editor.addResource(data);
      editor.setProperty("static_body_2d", "physics_material_override", {
        name: "physics_material_override",
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
      name: "physics_material",
      assetType: AssetType.PhysicsMaterial,
      type: ResourceType.ExtResource,
      projectID: project.project.id,
      parentID: editor.activeNode.id,
      file: files[0],
    });
  };

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-semibold text-gray-900">StaticBody2D</h3>
      
      {/* Physics Material Override */}
      <div className="space-y-3">
        <span className="text-sm font-medium text-gray-700">Physics Material</span>
        <div className="space-y-3">
          {property?.static_body_2d?.physics_material_override?.value ? (
            <div className="p-3 bg-gray-50 rounded-md">
              <div className="text-sm text-gray-600 mb-1">Current material:</div>
              <div className="text-sm font-medium text-gray-900">
                {project.project?.resource?.find(
                  (r) => r.id == property.static_body_2d?.physics_material_override?.value
                )?.path || "Unknown material"}
              </div>
            </div>
          ) : (
            <div className="p-3 border-2 border-dashed border-gray-300 rounded-md">
              <div className="text-sm text-gray-600 mb-2">No material assigned</div>
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

      {/* Constant Linear Velocity */}
      <div className="space-y-3">
        <span className="text-sm font-medium text-gray-700">Linear Velocity</span>
        <div className="flex gap-3">
          <div className="flex items-center gap-2">
            <label className="text-sm text-gray-600 w-4">X:</label>
            <Input
              type="number"
              step="0.1"
              placeholder="0"
              className="w-20 text-sm"
              value={property?.static_body_2d?.constant_linear_velocity?.x || 0}
              onChange={(e) => editor.setProperty("static_body_2d", "constant_linear_velocity", {
                x: parseFloat(e.target.value) || 0,
                y: property?.static_body_2d?.constant_linear_velocity?.y || 0
              })}
            />
          </div>
          <div className="flex items-center gap-2">
            <label className="text-sm text-gray-600 w-4">Y:</label>
            <Input
              type="number"
              step="0.1"
              placeholder="0"
              className="w-20 text-sm"
              value={property?.static_body_2d?.constant_linear_velocity?.y || 0}
              onChange={(e) => editor.setProperty("static_body_2d", "constant_linear_velocity", {
                x: property?.static_body_2d?.constant_linear_velocity?.x || 0,
                y: parseFloat(e.target.value) || 0
              })}
            />
          </div>
        </div>
      </div>

      {/* Constant Angular Velocity */}
      <div className="space-y-3">
        <span className="text-sm font-medium text-gray-700">Angular Velocity</span>
        <div className="flex items-center gap-2">
          <Input
            type="number"
            step="0.1"
            className="w-20 text-sm"
            value={property?.static_body_2d?.constant_angular_velocity || 0}
            onChange={(e) => editor.setProperty("static_body_2d", "constant_angular_velocity", parseFloat(e.target.value) || 0)}
          />
        </div>
      </div>

      {/* Sync to Physics */}
      <div className="space-y-3">
        <span className="text-sm font-medium text-gray-700">Sync to Physics</span>
        <div className="flex items-center gap-3 pl-2">
          <input
            type="checkbox"
            id="sync_to_physics"
            checked={property?.static_body_2d?.sync_to_physics || false}
            onChange={(e) => editor.setProperty("static_body_2d", "sync_to_physics", e.target.checked)}
            className="w-4 h-4"
          />
          <label htmlFor="sync_to_physics" className="text-sm text-gray-600">Sync to Physics</label>
        </div>
      </div>
    </div>
  );
});
