import { CanvasProperty } from "./properties/CanvasProperty";
import { TransformProperty } from "./properties/TransformProperty";

export default function Node2DProperty() {
  return (
    <>
      <TransformProperty />
      <CanvasProperty />
    </>
  );
}
