import { observer } from "mobx-react-lite";
import { useEditor } from "@/store/editor";
import { Property } from "@brickly/types";
import { Input } from "@/components/ui/input";

export const Area2DProperty = observer(() => {
  const editor = useEditor();
  const property = editor.activeNode?.property as Property;

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-semibold text-gray-900">Area2D</h3>
      
      {/* Monitoring */}
      <div className="space-y-3">
        <span className="text-sm font-medium text-gray-700">Monitoring</span>
        <div className="space-y-3 pl-2">
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="monitoring"
              checked={property?.area_2d?.monitoring || false}
              onChange={(e) => editor.setProperty("area_2d", "monitoring", e.target.checked)}
              className="w-4 h-4"
            />
            <label htmlFor="monitoring" className="text-sm text-gray-600">Enable Monitoring</label>
          </div>
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="monitorable"
              checked={property?.area_2d?.monitorable || false}
              onChange={(e) => editor.setProperty("area_2d", "monitorable", e.target.checked)}
              className="w-4 h-4"
            />
            <label htmlFor="monitorable" className="text-sm text-gray-600">Monitorable</label>
          </div>
        </div>
      </div>

      {/* Gravity Override */}
      <div className="space-y-3">
        <span className="text-sm font-medium text-gray-700">Gravity Override</span>
        <div className="flex items-center gap-3 pl-2">
          <input
            type="checkbox"
            id="gravity_override"
            checked={property?.area_2d?.gravity_override || false}
            onChange={(e) => editor.setProperty("area_2d", "gravity_override", e.target.checked)}
            className="w-4 h-4"
          />
          <label htmlFor="gravity_override" className="text-sm text-gray-600">Override Gravity</label>
        </div>
      </div>

      {/* Gravity Properties */}
      {property?.area_2d?.gravity_override && (
        <div className="space-y-4 pl-2 border-l-2 border-gray-200">
          <div className="space-y-3">
            <span className="text-sm font-medium text-gray-700">Gravity</span>
            <div className="flex items-center gap-2">
              <Input
                type="number"
                step="0.1"
                className="w-20 text-sm"
                value={property?.area_2d?.gravity || 0}
                onChange={(e) => editor.setProperty("area_2d", "gravity", parseFloat(e.target.value) || 0)}
              />
            </div>
          </div>

          <div className="space-y-3">
            <span className="text-sm font-medium text-gray-700">Gravity Direction</span>
            <div className="flex gap-3">
              <div className="flex items-center gap-2">
                <label className="text-sm text-gray-600 w-4">X:</label>
                <Input
                  type="number"
                  step="0.1"
                  placeholder="0"
                  className="w-16 text-sm"
                  value={property?.area_2d?.gravity_direction?.x || 0}
                  onChange={(e) => editor.setProperty("area_2d", "gravity_direction", {
                    ...property?.area_2d?.gravity_direction,
                    x: parseFloat(e.target.value) || 0
                  })}
                />
              </div>
              <div className="flex items-center gap-2">
                <label className="text-sm text-gray-600 w-4">Y:</label>
                <Input
                  type="number"
                  step="0.1"
                  placeholder="-1"
                  className="w-16 text-sm"
                  value={property?.area_2d?.gravity_direction?.y || -1}
                  onChange={(e) => editor.setProperty("area_2d", "gravity_direction", {
                    ...property?.area_2d?.gravity_direction,
                    y: parseFloat(e.target.value) || -1
                  })}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Damping */}
      <div className="space-y-3">
        <span className="text-sm font-medium text-gray-700">Damping</span>
        <div className="flex gap-3">
          <div className="flex items-center gap-2">
            <label className="text-sm text-gray-600 w-12">Linear:</label>
            <Input
              type="number"
              step="0.1"
              placeholder="0"
              className="w-20 text-sm"
              value={property?.area_2d?.linear_damp || 0}
              onChange={(e) => editor.setProperty("area_2d", "linear_damp", parseFloat(e.target.value) || 0)}
            />
          </div>
          <div className="flex items-center gap-2">
            <label className="text-sm text-gray-600 w-12">Angular:</label>
            <Input
              type="number"
              step="0.1"
              placeholder="0"
              className="w-20 text-sm"
              value={property?.area_2d?.angular_damp || 0}
              onChange={(e) => editor.setProperty("area_2d", "angular_damp", parseFloat(e.target.value) || 0)}
            />
          </div>
        </div>
      </div>
    </div>
  );
});
