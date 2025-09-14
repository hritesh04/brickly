import { createResource } from "@/actions/resource";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAction } from "@/hooks/useAction";
import { useEditor } from "@/store/editor";
import { useProjectManager } from "@/store/project";
import { Property } from "@/types/property";
import { AssetType, ResourceType } from "@prisma/client";
import { Plus } from "lucide-react";
import { observer } from "mobx-react-lite";
import { PhysicsProperty } from "./PhysicsProperty";
import { Switch } from "@/components/ui/switch";
import { useScroll } from "motion/react";
import { useState } from "react";

interface optionsType {
  name: string;
  type: AssetType;
}

const options: optionsType[] = [
  { name: "Line", type: AssetType.SegmentShape2D },
  { name: "Circle", type: AssetType.CircleShape2D },
  { name: "Rectangle", type: AssetType.RectangleShape2D },
  { name: "Capsule", type: AssetType.CapsuleShap2D },
  { name: "Polygon", type: AssetType.CollisionPolygon2D },
];

export const CollisionShape2DProperty = observer(() => {
  const editor = useEditor();
  const project = useProjectManager();
  const [physics, setPhysics] = useState(false);
  const properties = editor.activeNode?.property as Property;
  const { execute } = useAction(createResource, {
    onSuccess(data) {
      editor.attachResource(data);
      editor.setProperty("collison", "shape", {
        type: ResourceType.SubResource,
        value: data.id,
      });
    },
  });
  return (
    <div className="space-y-4">
      <h3 className="text-sm font-semibold text-gray-900">Collision</h3>
      
      <div className="space-y-4">
        {/* Priority */}
        <div className="space-y-3">
          <span className="text-sm font-medium text-gray-700">Priority</span>
          <div className="flex items-center gap-2">
            <input 
              type="number"
              className="w-20 px-2 py-1 text-sm border rounded text-center"
              placeholder="0"
            />
          </div>
        </div>

        {/* Shape */}
        <div className="space-y-3">
          <span className="text-sm font-medium text-gray-700">Shape</span>
          <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="flex items-center gap-3 p-2 border rounded-md bg-white hover:bg-gray-50 cursor-pointer">
                  <span className="text-sm text-gray-600">
                    {editor.activeNode?.resource?.find(
                      (r) => r.id == properties?.collison?.shape?.value
                    )?.name || "Select shape"}
                  </span>
                  <Plus className="size-4 text-gray-500" />
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-40">
                {options.map((o: optionsType) => (
                  <DropdownMenuCheckboxItem
                    key={o.name}
                    onCheckedChange={() =>
                      execute({
                        name: o.name,
                        assetType: o.type,
                        type: ResourceType.SubResource,
                        parentID: editor.activeNode!.id,
                      })
                    }
                    className="text-sm"
                  >
                    {o.name}
                  </DropdownMenuCheckboxItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        {/* {physics && <PhysicsProperty />} */}
      </div>
    </div>
  );
});
