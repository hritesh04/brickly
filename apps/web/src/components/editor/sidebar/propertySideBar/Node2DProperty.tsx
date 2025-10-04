import { CanvasProperty } from "./properties/CanvasProperty";
import { NodeBasedProperty } from "./NodeBasedProperty";
import { TransformProperty } from "./properties/TransformProperty";

export default function Node2DProperty() {
  return (
    <div className="space-y-6">
      <NodeBasedProperty />
      <TransformProperty />
      <CanvasProperty />
    </div>
  );
}
