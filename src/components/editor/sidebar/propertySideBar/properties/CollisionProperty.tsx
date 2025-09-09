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

export const CollisionProperty = observer(() => {
  const editor = useEditor();
  const project = useProjectManager();
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
    <div>
      <p className=" font-semibold">Collision</p>
      <div className="flex flex-col p-2">
        <div className="flex items-center">
          <span className="text-md font-medium text-sidebar-foreground/80">
            Priority:
          </span>
          <div className="flex w-full p-2 justify-around">
            <input />
          </div>
        </div>
        <div className="flex items-center">
          <span className="text-md font-medium text-sidebar-foreground/80">
            Shape:
          </span>
          <div className="flex w-full p-2 justify-around">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="flex items-center gap-4">
                  <p>
                    {
                      editor.activeNode?.resource?.find(
                        (r) => r.id == properties?.collison?.shape?.value
                      )?.name
                    }
                  </p>
                  <Plus className=" size-4" />
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent className=" w-40">
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
                  >
                    {o.name}
                  </DropdownMenuCheckboxItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </div>
  );
});
