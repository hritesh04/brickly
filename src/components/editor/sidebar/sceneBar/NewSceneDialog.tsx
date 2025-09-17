import { createNode } from "@/actions/node";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
// import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useAction } from "@/hooks/useAction";
import { useEditor } from "@/store/editor";
import { useProjectManager } from "@/store/project";
import { NodeType } from "@prisma/client";
import { Plus } from "lucide-react";
import { useState } from "react";

export const NewSceneDialog = () => {
  const [sceneName, setSceneName] = useState("");
  const [selection, setSelection] = useState<Set<string>>(new Set());
  const [visualOptions, setVisualOptions] = useState<{
    [key: string]: boolean;
    texture: boolean;
    ui: boolean;
  }>({
    texture: false,
    ui: false,
  });
  const [hasPhysics, setHasPhysics] = useState(false);
  const [physicsType, setPhysicsType] = useState<NodeType | null>(null);
  const [hasAnimation, setHasAnimation] = useState(false);
  const editor = useEditor();
  const project = useProjectManager();
  const { execute } = useAction(createNode, {
    onSuccess(data) {
      editor.addNode(data);
    },
  });

  const handleToggle = (feature: string) => {
    const newSelection = new Set<string>(selection);
    if (newSelection.has(feature)) {
      newSelection.delete(feature);
      if (feature === "Collision") {
        setHasPhysics(false);
      }
    } else {
      newSelection.add(feature);
    }
    setSelection(newSelection);
  };

  const handleVisualToggle = (option: "texture" | "ui", checked: boolean) => {
    setVisualOptions((prev) => {
      const newOptions = { ...prev, [option]: checked };
      if (!checked && option === "texture" && !newOptions.ui) {
        setSelection((prev) => {
          const newSet = new Set(prev);
          newSet.delete("Visual");
          return newSet;
        });
      } else if (checked && !prev[option]) {
        if (!selection.has("Visual")) {
          handleToggle("Visual");
        }
      }
      return newOptions;
    });
  };

  const handlePhysicsToggle = (checked: boolean) => {
    setHasPhysics(checked);
  };

  const generateNodeStructure = () => {
    const result: {
      type: NodeType;
      projectID: number;
      children?: { type: NodeType }[];
      name?: string;
    } = {
      type: NodeType.Node, // Default to Node
      projectID: project.project?.id!,
      children: [],
      name: sceneName || "New Scene",
    };

    // If has physics and collision
    if (hasPhysics && selection.has("Collision")) {
      if (!physicsType) {
        result.type = NodeType.Node2D;
        result.children = [];
      } else {
        result.type = physicsType;
        result.children = [{ type: NodeType.CollisionShape2D }];
      }

      // Add visual children if Visual is selected
      if (selection.has("Visual")) {
        if (visualOptions.texture) {
          result.children.push({
            type: hasAnimation ? NodeType.AnimatedSprite2D : NodeType.Sprite2D,
          });
        }
        if (visualOptions.ui) {
          result.children.push({ type: NodeType.Control });
        }
      }
    }
    // If has collision but no physics
    else if (selection.has("Collision") && !hasPhysics) {
      result.type = NodeType.Node2D;
      result.children = [{ type: NodeType.CollisionShape2D }];

      // Add visual children if Visual is selected
      if (selection.has("Visual")) {
        if (visualOptions.texture) {
          result.children.push({
            type: hasAnimation ? NodeType.AnimatedSprite2D : NodeType.Sprite2D,
          });
        }
        if (visualOptions.ui) {
          result.children.push({ type: NodeType.Control });
        }
      }
    }
    // If has visual only (no collision)
    else if (selection.has("Visual")) {
      if (visualOptions.ui && visualOptions.texture) {
        result.type = NodeType.Control;
        result.children = [
          {
            type: hasAnimation ? NodeType.AnimatedSprite2D : NodeType.Sprite2D,
          },
        ];
      } else if (visualOptions.ui) {
        result.type = NodeType.Control;
        result.children = [];
      } else if (visualOptions.texture) {
        result.type = hasAnimation
          ? NodeType.AnimatedSprite2D
          : NodeType.Sprite2D;
        result.children = [];
      }
    }

    return result;
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Plus size={18} />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New Scene</DialogTitle>
          <DialogDescription>You can edit it later</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4">
          <div className="flex gap-2 items-center">
            <span>Scene Name:</span>
            <Input
              type="text"
              value={sceneName}
              onChange={(e) => setSceneName(e.target.value)}
              placeholder="e.g., MyEnemy"
            />
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex gap-2 items-center">
              <span>Visual</span>
              <Switch
                checked={selection.has("Visual")}
                onCheckedChange={() => handleToggle("Visual")}
              />
            </div>
            {selection.has("Visual") && (
              <div className="ml-6 grid gap-2">
                <div className="flex gap-2 items-center">
                  <label className="flex items-center">
                    <Checkbox
                      id="texture"
                      checked={visualOptions.texture}
                      onCheckedChange={(checked: boolean) =>
                        handleVisualToggle("texture", checked)
                      }
                    />
                    <span className="ml-2">Texture</span>
                  </label>
                  <label className="flex items-center">
                    <Checkbox
                      id="ui"
                      checked={visualOptions.ui}
                      onCheckedChange={(checked: boolean) =>
                        handleVisualToggle("ui", checked)
                      }
                    />
                    <span className="ml-2">UI</span>
                  </label>
                </div>
                {visualOptions.texture && (
                  <div className="grid gap-2">
                    <div className="flex gap-2 items-center">
                      <span>Animation</span>
                      <Switch
                        checked={hasAnimation}
                        onCheckedChange={setHasAnimation}
                      />
                    </div>
                  </div>
                )}
              </div>
            )}
            <div className="flex gap-2 items-center">
              <span>Collision</span>
              <Switch
                checked={selection.has("Collision")}
                onCheckedChange={() => handleToggle("Collision")}
              />
            </div>
            {selection.has("Collision") && (
              <div className="ml-6 grid gap-2">
                <div className="flex gap-2 items-center">
                  <span>Physics:</span>
                  <Switch
                    checked={hasPhysics}
                    onCheckedChange={handlePhysicsToggle}
                  />
                </div>
                {hasPhysics && (
                  <div className="ml-6 grid gap-2">
                    <span className="text-sm font-medium">Physics Type:</span>
                    <RadioGroup
                      // value={physicsType}
                      onValueChange={(value: NodeType) => setPhysicsType(value)}
                      className="flex flex-col gap-2"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem
                          value={NodeType.StaticBody2D}
                          id="static"
                        />
                        <label htmlFor="static">Static Body</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem
                          value={NodeType.RigidBody2D}
                          id="rigid"
                        />
                        <label htmlFor="rigid">Rigid Body</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem
                          value={NodeType.CharacterBody2D}
                          id="character"
                        />
                        <label htmlFor="character">Character Body</label>
                      </div>
                    </RadioGroup>
                  </div>
                )}
              </div>
            )}
          </div>
          <Button
            variant="default"
            onClick={() => {
              const result = generateNodeStructure();
              console.log(result);
              execute(result);
            }}
          >
            Create
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
