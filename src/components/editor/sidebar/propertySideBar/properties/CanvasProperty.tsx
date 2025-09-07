import { useEditor } from "@/store/editor";
import { BaseProperty } from "@/types/property";
import { variant } from "@/types/variant";
import { observer } from "mobx-react-lite";

export const CanvasProperty = observer(() => {
  const editor = useEditor();
  const property = editor.activeNode?.property as BaseProperty;
  return (
    <div>
      <p className=" font-semibold">Canvas</p>
      <div className=" flex flex-col p-2">
        <div className=" flex gap-4">
          <span className="text-md font-medium text-sidebar-foreground/80">
            Visibility
          </span>
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
          />
        </div>
        <div className="flex gap-4">
          <span>Z Index : </span>
          <input
            type="number"
            defaultValue={property?.canvas?.ZIndex?.value || 0}
            className="w-10"
          />
        </div>
      </div>
    </div>
  );
});
