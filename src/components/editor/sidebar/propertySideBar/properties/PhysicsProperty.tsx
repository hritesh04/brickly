import { updateNode } from "@/actions/node";
import { createResource } from "@/actions/resource";
import { resourceType } from "@/actions/resource/schema";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useAction } from "@/hooks/useAction";
import { useEditor } from "@/store/editor";
import { useProjectManager } from "@/store/project";
import { Property } from "@/types/property";
import { AssetType, NodeType, ResourceType } from "@prisma/client";
import { observer } from "mobx-react-lite";
import { useState } from "react";
import { property } from "zod";

const options = [
  { value: NodeType.RigidBody2D, label: "Rigid" },
  { value: NodeType.StaticBody2D, label: "Static" },
  { value: NodeType.CharacterBody2D, label: "Controllable" },
];
export const PhysicsProperty = observer(() => {
  const editor = useEditor();
  //   const [selectedOptions, setSelectedOptions] = useState<NodeType>(
  // editor.activeNode!.type
  //   );

  const project = useProjectManager();

  const property = editor.activeNode?.property as Property;

  const resource = useAction(createResource, {
    onSuccess(data) {
      editor.addResource(data);
      editor.setProperty("sprite_2d", "texture", {
        type: ResourceType.ExtResource,
        value: data.id,
      });
    },
    onError(error) {
      console.error("Resource creation failed:", error);
    },
  });

  const nodeUpdate = useAction(updateNode, {
    onSuccess(data) {
      editor.updateNode(data);
    },
    onError(error) {
      console.error("Node update failed:", error);
    },
  });

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!editor.activeNode || !project.project) return;

    const files = e.target.files;
    if (!files || files.length === 0) {
      console.error("No file selected");
      return;
    }

    resource.execute({
      name: "texture",
      assetType: AssetType.Texture2D,
      type: ResourceType.ExtResource,
      projectID: project.project.id,
      parentID: editor.activeNode.id,
      file: files[0],
    });
  };
  return (
    <div className="">
      <p className=" font-semibold">Physics</p>
      <div className="flex flex-col p-2 gap-1">
        <div className="flex">
          <RadioGroup
            className="flex"
            defaultValue={editor.activeNode?.type}
            onValueChange={(value: NodeType) =>
              nodeUpdate.execute({ id: editor.activeNode!.id, type: value })
            }
          >
            {options.map((option, idx) => {
              return (
                <div key={idx} className="flex items-center gap-2">
                  <RadioGroupItem value={option.value} id={option.label} />
                  <label
                    htmlFor={`option-${idx}`}
                    className={`text-sm font-medium ${
                      //   isDisabled ? "text-muted-foreground" : "cursor-pointer"
                      ""
                    }`}
                  >
                    {option.label}
                  </label>
                </div>
              );
            })}
          </RadioGroup>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-md font-medium text-sidebar-foreground/80">
            Texture:
          </span>
          <div className="flex flex-col gap-2">
            {property?.sprite_2d?.texture?.value ? (
              <div className="text-md text-sidebar-foreground/80">
                {
                  project.project?.resource?.find(
                    (r) => r.id == property.sprite_2d.texture.value
                  )?.path
                }
                {/* {property.sprite_2d.texture.path} */}
              </div>
            ) : (
              <div className="flex items-center gap-4">
                {/* <span className="text-md font-medium text-sidebar-foreground/80"> */}
                {/* Upload: */}
                {/* </span> */}
                <input
                  type="file"
                  onChange={handleUpload}
                  accept="image/*"
                  className="text-sm"
                />
              </div>
            )}
          </div>
        </div>
        <div className="flex items-center">
          <span className="text-md font-medium text-sidebar-foreground/80">
            Mass:
          </span>
          <div className="flex w-full p-2 justify-center">
            <input
              type="number"
              className=" w-10"
              value={1}
              onChange={() => {}}
            />
            <span>kg</span>
          </div>
        </div>
        <div className="flex items-center">
          <span className="text-md font-medium text-sidebar-foreground/80">
            Gravity Scale:
          </span>
          <div className="flex w-full p-2 justify-center">
            <input
              type="number"
              className=" w-10"
              value={1}
              onChange={() => {}}
            />
          </div>
        </div>
      </div>
    </div>
  );
});
