import { observer } from "mobx-react-lite";
import { useEditor } from "@/store/editor";
import { Property } from "@brickly/types";
import { Input } from "@/components/ui/input";

export const RigidBody2DProperty = observer(() => {
  const editor = useEditor();
  const property = editor.activeNode?.property as Property;

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-semibold text-gray-900">RigidBody2D</h3>
      
      {/* Mode */}
      {/* <div className="space-y-3">
        <span className="text-sm font-medium text-gray-700">Mode</span>
        <select
          className="w-full px-3 py-2 text-sm border rounded-md bg-white"
          value={property?.rigid_body_2d?.mode || "RIGID"}
          onChange={(e) => editor.setProperty("rigid_body_2d", "mode", e.target.value)}
        >
          <option value="RIGID">Rigid</option>
          <option value="STATIC">Static</option>
          <option value="CHARACTER">Character</option>
          <option value="KINEMATIC">Kinematic</option>
        </select>
      </div> */}

      {/* Mass */}
      <div className="space-y-3">
        <span className="text-sm font-medium text-gray-700">Mass</span>
        <div className="flex items-center gap-2">
          <Input
            type="number"
            step="0.1"
            className="w-20 text-sm"
            value={property?.rigid_body_2d?.mass || 1.0}
            onChange={(e) => editor.setProperty("rigid_body_2d", "mass", parseFloat(e.target.value) || 1.0)}
          />
        </div>
      </div>

      {/* Physics Material */}
      <div className="space-y-3">
        <span className="text-sm font-medium text-gray-700">Physics Material</span>
        <div className="flex gap-3">
          <div className="flex items-center gap-2">
            <label className="text-sm text-gray-600 w-12">Friction:</label>
            <Input
              type="number"
              step="0.1"
              min="0"
              max="1"
              placeholder="1.0"
              className="w-20 text-sm"
              value={property?.rigid_body_2d?.friction || 1.0}
              onChange={(e) => editor.setProperty("rigid_body_2d", "friction", parseFloat(e.target.value) || 1.0)}
            />
          </div>
          <div className="flex items-center gap-2">
            <label className="text-sm text-gray-600 w-12">Bounce:</label>
            <Input
              type="number"
              step="0.1"
              min="0"
              max="1"
              placeholder="0.0"
              className="w-20 text-sm"
              value={property?.rigid_body_2d?.bounce || 0.0}
              onChange={(e) => editor.setProperty("rigid_body_2d", "bounce", parseFloat(e.target.value) || 0.0)}
            />
          </div>
        </div>
      </div>

      {/* Gravity Scale */}
      <div className="space-y-3">
        <span className="text-sm font-medium text-gray-700">Gravity Scale</span>
        <div className="flex items-center gap-2">
          <Input
            type="number"
            step="0.1"
            className="w-20 text-sm"
            value={property?.rigid_body_2d?.gravity_scale || 1.0}
            onChange={(e) => editor.setProperty("rigid_body_2d", "gravity_scale", parseFloat(e.target.value) || 1.0)}
          />
        </div>
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
              value={property?.rigid_body_2d?.linear_velocity?.x || 0}
              onChange={(e) => editor.setProperty("rigid_body_2d", "linear_velocity", {
                x: parseFloat(e.target.value) || 0,
                y: property?.rigid_body_2d?.linear_velocity?.y || 0
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
              value={property?.rigid_body_2d?.linear_velocity?.y || 0}
              onChange={(e) => editor.setProperty("rigid_body_2d", "linear_velocity", {
                x: property?.rigid_body_2d?.linear_velocity?.x || 0,
                y: parseFloat(e.target.value) || 0
              })}
            />
          </div>
        </div>
      </div>

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
              value={property?.rigid_body_2d?.linear_damp || 0}
              onChange={(e) => editor.setProperty("rigid_body_2d", "linear_damp", parseFloat(e.target.value) || 0)}
            />
          </div>
          <div className="flex items-center gap-2">
            <label className="text-sm text-gray-600 w-12">Angular:</label>
            <Input
              type="number"
              step="0.1"
              placeholder="0"
              className="w-20 text-sm"
              value={property?.rigid_body_2d?.angular_damp || 0}
              onChange={(e) => editor.setProperty("rigid_body_2d", "angular_damp", parseFloat(e.target.value) || 0)}
            />
          </div>
        </div>
      </div>

      {/* Advanced Properties */}
      <div className="space-y-3">
        <span className="text-sm font-medium text-gray-700">Advanced</span>
        <div className="space-y-3 pl-2">
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="contact_monitor"
              checked={property?.rigid_body_2d?.contact_monitor || false}
              onChange={(e) => editor.setProperty("rigid_body_2d", "contact_monitor", e.target.checked)}
              className="w-4 h-4"
            />
            <label htmlFor="contact_monitor" className="text-sm text-gray-600">Contact Monitor</label>
          </div>
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="freeze"
              checked={property?.rigid_body_2d?.freeze || false}
              onChange={(e) => editor.setProperty("rigid_body_2d", "freeze", e.target.checked)}
              className="w-4 h-4"
            />
            <label htmlFor="freeze" className="text-sm text-gray-600">Freeze</label>
          </div>
        </div>
      </div>
    </div>
  );
});
