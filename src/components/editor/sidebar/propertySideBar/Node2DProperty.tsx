import { CanvasProperty } from "./properties/CanvasProperty";
import { OptionsProperty } from "./properties/OptionsProperty";
import { TransformProperty } from "./properties/TransformProperty";

export default function Node2DProperty() {
  return (
    <>
      <OptionsProperty />
      <TransformProperty />
      <CanvasProperty />
    </>
  );
}
