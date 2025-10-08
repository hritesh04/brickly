import { observer } from "mobx-react-lite";
import { useEditor } from "@/store/editor";
import { Property } from "@brickly/types";
import { Input } from "@/components/ui/input";

export const CharacterBody2DProperty = observer(() => {
  const editor = useEditor();
  const property = editor.activeNode?.property as Property;

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-semibold text-gray-900">CharacterBody2D</h3>
      
      {/* Motion Mode */}
      <div className="space-y-3">
        <span className="text-sm font-medium text-gray-700">Motion Mode</span>
        <select
          className="w-full px-3 py-2 text-sm border rounded-md bg-white"
          value={property?.character_body_2d?.motion_mode || "MOTION_MODE_GROUNDED"}
          onChange={(e) => editor.setProperty("character_body_2d", "motion_mode", e.target.value)}
        >
          <option value="MOTION_MODE_GROUNDED">Grounded</option>
          <option value="MOTION_MODE_FLOATING">Floating</option>
        </select>
      </div>

      {/* Velocity */}
      <div className="space-y-3">
        <span className="text-sm font-medium text-gray-700">Velocity</span>
        <div className="flex gap-3">
          <div className="flex items-center gap-2">
            <label className="text-sm text-gray-600 w-4">X:</label>
            <Input
              type="number"
              step="0.1"
              placeholder="0"
              className="w-20 text-sm"
              value={property?.character_body_2d?.velocity?.x || 0}
              onChange={(e) => editor.setProperty("character_body_2d", "velocity", {
                x: parseFloat(e.target.value) || 0,
                y: property?.character_body_2d?.velocity?.y || 0
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
              value={property?.character_body_2d?.velocity?.y || 0}
              onChange={(e) => editor.setProperty("character_body_2d", "velocity", {
                x: property?.character_body_2d?.velocity?.x || 0,
                y: parseFloat(e.target.value) || 0
              })}
            />
          </div>
        </div>
      </div>

      {/* Floor Properties */}
      <div className="space-y-3">
        <span className="text-sm font-medium text-gray-700">Floor Properties</span>
        <div className="space-y-3 pl-2">
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-600 w-20">Max Angle:</span>
            <Input
              type="number"
              step="0.1"
              className="w-20 text-sm"
              value={property?.character_body_2d?.floor_max_angle || 0.5}
              onChange={(e) => editor.setProperty("character_body_2d", "floor_max_angle", parseFloat(e.target.value) || 0.5)}
            />
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-600 w-20">Snap Length:</span>
            <Input
              type="number"
              step="0.1"
              className="w-20 text-sm"
              value={property?.character_body_2d?.floor_snap_length || 0.0}
              onChange={(e) => editor.setProperty("character_body_2d", "floor_snap_length", parseFloat(e.target.value) || 0.0)}
            />
          </div>
        </div>
      </div>

      {/* Motion Properties */}
      <div className="space-y-3">
        <span className="text-sm font-medium text-gray-700">Motion Properties</span>
        <div className="space-y-3 pl-2">
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-600 w-20">Max Slides:</span>
            <Input
              type="number"
              min="1"
              className="w-20 text-sm"
              value={property?.character_body_2d?.max_slides || 6}
              onChange={(e) => editor.setProperty("character_body_2d", "max_slides", parseInt(e.target.value) || 6)}
            />
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-600 w-20">Safe Margin:</span>
            <Input
              type="number"
              step="0.001"
              className="w-20 text-sm"
              value={property?.character_body_2d?.safe_margin || 0.001}
              onChange={(e) => editor.setProperty("character_body_2d", "safe_margin", parseFloat(e.target.value) || 0.001)}
            />
          </div>
        </div>
      </div>
    </div>
  );
});
