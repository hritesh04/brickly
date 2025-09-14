import { useEditor } from "@/store/editor";
import { BaseProperty } from "@/types/property";
import { variant } from "@/types/variant";
import { observer } from "mobx-react-lite";

export const CanvasProperty = observer(() => {
  const editor = useEditor();
  const property = editor.activeNode?.property as BaseProperty;
  return (
    <div className="space-y-4">
      <h3 className="text-sm font-semibold text-gray-900">Canvas</h3>
      
      <div className="space-y-4">
        {/* Visibility and Z Index */}
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-gray-700">Visibility</span>
            <input
              type="checkbox"
              checked={property?.canvas?.visible?.value}
              onChange={(e) =>
                editor.setProperty("canvas", "visible", {
                  name: "visible",
                  type: variant.Bool,
                  value: e.target.checked,
                })
              }
              className="w-4 h-4"
            />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-700">Z Index</span>
            <input
              type="number"
              defaultValue={property?.canvas?.ZIndex?.value || 0}
              className="w-20 px-2 py-1 text-sm border rounded text-center"
            />
          </div>
        </div>
      </div>
    </div>
  );
});
