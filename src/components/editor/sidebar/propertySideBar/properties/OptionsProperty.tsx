// "use client";
import { updateNode } from "@/actions/node";
import { Checkbox } from "@/components/ui/checkbox";
import { useAction } from "@/hooks/useAction";
import { useEditor } from "@/store/editor";
import { useProjectManager } from "@/store/project";
import { Property } from "@/types/property";
import { NodeType } from "@prisma/client";
import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import { PhysicsProperty } from "./PhysicsProperty";

type OptionType = {
  name: string;
  component: React.FC;
};

const options: OptionType[] = [
  // { name: "Visual", component: VisualProperty },
  // { name: "Collision", component: CollisionProperty },
  // { name: "Physics", component: PhysicsProperty },
];
//physics
// const physicsBodyTypes = [
//   { value: NodeType.RigidBody2D, label: "RigidBody2D" },
//   { value: NodeType.StaticBody2D, label: "StaticBody2D" },
//   { value: NodeType.CharacterBody2D, label: "CharacterBody2D" },
// ];

export const NodeBasedProperty = observer(() => {
  const [selectedOptions, setSelectedOptions] = useState<Set<string>>(
    new Set()
  );
  // const [selectedBodyType, setSelectedBodyType] = useState<NodeType>(
  //   NodeType.RigidBody2D
  // );

  const editor = useEditor();
  const project = useProjectManager();

  // const resource = useAction(createResource, {
  //   onSuccess(data) {
  //     editor.addResource(data);
  //     editor.setProperty("sprite_2d", "texture", data);
  //   },
  //   onError(error) {
  //     console.error("Resource creation failed:", error);
  //   },
  // });

  const nodeUpdate = useAction(updateNode, {
    onSuccess(data) {
      editor.updateNode(data);
    },
    onError(error) {
      console.error("Node update failed:", error);
    },
  });

  const property = editor.activeNode?.property as Property;

  useEffect(() => {
    if (!editor.activeNode) return;

    const currentType = editor.activeNode.type;
    const newSelectedOptions = new Set<string>();

    if (currentType === NodeType.Area2D) {
      newSelectedOptions.add("Collision");
    } else if (
      [
        NodeType.StaticBody2D,
        NodeType.RigidBody2D,
        NodeType.CharacterBody2D,
      ].includes(currentType as any)
    ) {
      newSelectedOptions.add("Collision");
      newSelectedOptions.add("Physics");
      // setSelectedBodyType(currentType); // physics
    }

    setSelectedOptions(newSelectedOptions);
  }, [editor.activeNode?.type]);

  const handleOptionChange = (optionName: string, checked: boolean) => {
    if (!editor.activeNode) return;

    const newSelectedOptions = new Set(selectedOptions);

    if (checked) {
      newSelectedOptions.add(optionName);
    } else {
      newSelectedOptions.delete(optionName);
    }

    if (optionName === "Physics") {
      if (checked) {
        // If Physics is selected, Collision is required
        newSelectedOptions.add("Collision");
        nodeUpdate.execute({
          id: editor.activeNode.id,
          type: NodeType.StaticBody2D,
        });
      } else {
        // If Physics is deselected, update to Area2D (collision only) or basic node
        if (newSelectedOptions.has("Collision")) {
          nodeUpdate.execute({
            id: editor.activeNode.id,
            type: NodeType.Area2D,
          });
        } else {
          // Remove both collision and physics - revert to basic node type
          nodeUpdate.execute({
            id: editor.activeNode.id,
            type: NodeType.Node2D,
          });
        }
      }
    }

    if (optionName === "Collision") {
      if (!checked) {
        // If Collision is deselected, Physics must also be deselected
        newSelectedOptions.delete("Physics");
        nodeUpdate.execute({
          id: editor.activeNode.id,
          type: NodeType.Node2D,
        });
      } else {
        // If only Collision is selected (no Physics), use Area2D
        if (!newSelectedOptions.has("Physics")) {
          nodeUpdate.execute({
            id: editor.activeNode.id,
            type: NodeType.Area2D,
          });
        }
      }
    }

    // If both Collision and Physics are selected, handle body type selection
    // if (
    //   newSelectedOptions.has("Collision") &&
    //   newSelectedOptions.has("Physics")
    // ) {
    //   nodeUpdate.execute({
    //     id: editor.activeNode.id,
    //     type: selectedBodyType,
    //   });
    // }

    setSelectedOptions(newSelectedOptions);
  };

  // const handleBodyTypeChange = (bodyType: NodeType) => {
  //   if (!editor.activeNode) return;

  //   setSelectedBodyType(bodyType);

  //   // Update the node if both collision and physics are selected
  //   if (selectedOptions.has("Collision") && selectedOptions.has("Physics")) {
  //     nodeUpdate.execute({
  //       id: editor.activeNode.id,
  //       type: bodyType,
  //     });
  //   }
  // };

  // const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   if (!editor.activeNode || !project.project) return;

  //   const files = e.target.files;
  //   if (!files || files.length === 0) {
  //     console.error("No file selected");
  //     return;
  //   }

  //   resource.execute({
  //     name: "texture",
  //     assetType: AssetType.Texture2D,
  //     type: ResourceType.ExtResource,
  //     projectID: project.project.id,
  //     parentID: editor.activeNode.id,
  //     file: files[0],
  //   });
  // };

  if (!editor.activeNode) {
    return <div className="p-4 text-muted-foreground">No node selected</div>;
  }

  return (
    <div className="space-y-4">
      <div>
        <p className="font-semibold mb-2">Node Options</p>
        <div className="flex items-center gap-4 flex-wrap">
          {options.map((option, idx) => {
            const isChecked = selectedOptions.has(option.name);
            const isDisabled =
              (option.name === "Collision" && selectedOptions.has("Physics")) || // Collision required when Physics is selected
              false;

            return (
              <div key={idx} className="flex items-center gap-2">
                <Checkbox
                  id={`option-${idx}`}
                  checked={isChecked}
                  disabled={isDisabled}
                  onCheckedChange={(checked) =>
                    handleOptionChange(option.name, Boolean(checked))
                  }
                />
                <label
                  htmlFor={`option-${idx}`}
                  className={`text-sm font-medium ${
                    isDisabled ? "text-muted-foreground" : "cursor-pointer"
                  }`}
                >
                  {option.name}
                  {option.name === "Collision" &&
                    selectedOptions.has("Physics") && (
                      <span className="text-xs text-muted-foreground ml-1">
                        (required)
                      </span>
                    )}
                </label>
              </div>
            );
          })}

          {/* Show physics body type selector when both collision and physics are selected */}
          {/* {selectedOptions.has("Collision") &&
            selectedOptions.has("Physics") && (
              <div className="mt-4 space-y-2">
                <label className="text-sm font-medium">
                  Physics Body Type:
                </label>
                <Select
                  value={selectedBodyType}
                  onValueChange={(value: NodeType) =>
                    handleBodyTypeChange(value as NodeType)
                  }
                >
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {physicsBodyTypes.map((bodyType) => (
                      <SelectItem key={bodyType.value} value={bodyType.value}>
                        {bodyType.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )} */}
        </div>
      </div>

      {/* Render property components for selected options */}
      {selectedOptions.size > 0 && (
        <div className="space-y-4">
          {Array.from(selectedOptions).map((optionName, idx) => {
            const option = options.find((o) => o.name === optionName);
            if (!option) return null;

            return <option.component key={idx} />;
          })}
        </div>
      )}

      {/* <div>
        <p className="font-semibold mb-2">Texture</p>
        <div className="flex flex-col gap-2 p-2">
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium text-muted-foreground">
              Upload:
            </span>
            <input
              type="file"
              onChange={handleUpload}
              accept="image/*"
              className="text-sm"
            />
          </div>
          {property?.sprite_2d?.texture?.path && (
            <div className="text-xs text-muted-foreground">
              Current: {property.sprite_2d.texture.path}
            </div>
          )}
        </div>
      </div> */}
    </div>
  );
});
