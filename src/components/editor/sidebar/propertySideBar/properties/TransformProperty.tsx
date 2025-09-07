import { useEditor } from "@/store/editor";
import { BaseProperty, Node2DProperty } from "@/types/property";
import { variant } from "@/types/variant";
import { observer } from "mobx-react-lite";

export const TransformProperty = observer(() => {
  const editor = useEditor();
  const property = editor.activeNode?.property as Node2DProperty;
  return (
    <div>
      <p className=" font-semibold">Transform</p>
      <div className="flex flex-col p-2">
        <div className="flex items-center">
          <span className="text-md font-medium text-sidebar-foreground/80">
            Position
          </span>
          <div className="flex w-full p-2 justify-around items-center">
            <div className="flex justify-between items-center gap-2">
              <label className=" text-sm">X : </label>
              <div>
                <input
                  type="number"
                  defaultValue={property?.transform?.position.value.x || 0.0}
                  onChange={(e) =>
                    editor.setProperty("transform", "position", {
                      name: "position",
                      type: variant.Vector2,
                      value: {
                        x: e.target.valueAsNumber,
                        y: property?.transform?.position.value.y || 0.0,
                      },
                    })
                  }
                  className="w-8 text-center"
                />
                <span>px</span>
              </div>
            </div>
            <div className="flex justify-between items-center gap-2">
              <label className=" text-sm">Y : </label>
              <div>
                <input
                  type="number"
                  defaultValue={property?.transform?.position?.value.y || 0.0}
                  className="w-8 text-center"
                  onChange={(e) =>
                    editor.setProperty("transform", "position", {
                      name: "position",
                      type: variant.Vector2,
                      value: {
                        x: property?.transform?.position?.value.x || 0.0,
                        y: e.target.valueAsNumber,
                      },
                    })
                  }
                />
                <span>px</span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-md font-medium text-sidebar-foreground/80">
            Rotation
          </span>
          <input
            type="number"
            defaultValue={property?.transform?.rotation?.value || 0}
            className="w-10"
          />
        </div>
        <div className="flex items-center">
          <span className="text-md font-medium text-sidebar-foreground/80">
            Scale
          </span>
          <div className="flex w-full p-2 justify-around items-center">
            <div className="flex justify-between items-center gap-2">
              <label className=" text-sm">X : </label>
              <div>
                <input
                  type="number"
                  defaultValue={property?.transform?.scale?.value.x || 1}
                  className="w-8 text-center"
                />
                {/* <span>px</span> */}
              </div>
            </div>
            <div className="flex justify-between items-center gap-2">
              <label className=" text-sm">Y : </label>
              <div>
                <input
                  type="number"
                  defaultValue={property?.transform?.scale?.value.y || 1}
                  className="w-8 text-center"
                />
                {/* <span>px</span> */}
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-md font-medium text-sidebar-foreground/80">
            Skew
          </span>
          <input
            type="number"
            defaultValue={property?.transform?.skew?.value || 0}
            className="w-10"
          />
        </div>
      </div>
    </div>
  );
});
