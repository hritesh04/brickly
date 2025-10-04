import { useEditor } from "@/store/editor";
import { useResourceStore } from "@/store/resource";
import { Node2DProperty } from "@/types/property";
import { variant } from "@/types/variant";
import { Resource } from "@prisma/client";
import { observer } from "mobx-react-lite";

export const TransformProperty = observer(() => {
  const editor = useEditor();
  const resStore = useResourceStore();
  const activeRes = resStore.activeResource;
  const isParent = editor.activeNode?.resource?.includes(activeRes as Resource);
  const property = isParent
    ? (resStore.activeResource?.property as Node2DProperty)
    : (editor.activeNode?.property as Node2DProperty);
  return (
    <div className="space-y-4">
      <h3 className="text-sm font-semibold text-gray-900">Transform</h3>
      
      {/* Position */}
      <div className="space-y-3">
        <span className="text-sm font-medium text-gray-700">Position</span>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <label className="text-sm text-gray-600 w-4">X:</label>
            <div className="flex items-center gap-1">
              <input
                type="number"
                value={property?.transform?.position.value.x || 0}
                onChange={(e) => {
                  editor.setProperty("transform", "position", {
                    name: "position",
                    type: variant.Vector2,
                    value: {
                      x: e.target.valueAsNumber,
                      y: property?.transform?.position?.value.y || 0,
                    },
                  });
                }}
                className="w-16 px-2 py-1 text-sm border rounded text-center"
              />
              <span className="text-xs text-gray-500">px</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <label className="text-sm text-gray-600 w-4">Y:</label>
            <div className="flex items-center gap-1">
              <input
                type="number"
                value={property?.transform?.position.value.y || 0}
                className="w-16 px-2 py-1 text-sm border rounded text-center"
                onChange={(e) =>
                  editor.setProperty("transform", "position", {
                    name: "position",
                    type: variant.Vector2,
                    value: {
                      x: property?.transform?.position?.value.x || 0,
                      y: e.target.valueAsNumber,
                    },
                  })
                }
              />
              <span className="text-xs text-gray-500">px</span>
            </div>
          </div>
        </div>
      </div>

      {/* Scale */}
      <div className="space-y-3">
        <span className="text-sm font-medium text-gray-700">Scale</span>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <label className="text-sm text-gray-600 w-4">X:</label>
            <input
              type="number"
              defaultValue={1}
              className="w-16 px-2 py-1 text-sm border rounded text-center"
            />
          </div>
          <div className="flex items-center gap-2">
            <label className="text-sm text-gray-600 w-4">Y:</label>
            <input
              type="number"
              defaultValue={1}
              className="w-16 px-2 py-1 text-sm border rounded text-center"
            />
          </div>
        </div>
      </div>

      {/* Rotation and Skew */}
      <div className="space-y-3">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-700">Rotation</span>
            <input 
              type="number" 
              defaultValue={0} 
              className="w-16 px-2 py-1 text-sm border rounded text-center" 
            />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-700">Skew</span>
            <input
              type="number"
              defaultValue={property?.transform?.skew?.value || 0}
              className="w-16 px-2 py-1 text-sm border rounded text-center"
            />
          </div>
        </div>
      </div>
    </div>
  );
});
