"use client";
import { useEditor } from "@/store/editor";
import { observer } from "mobx-react-lite";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Play, Save, Code } from "lucide-react";
import { useState } from "react";
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
} from "@dnd-kit/core";
import { ActionsSection } from "./ActionsSection";
import { Action } from "./types/ActionTypes";
import { MainLoopSection } from "./MainLoopSection";
import { TriggerSection } from "./TriggerSection";
import { NodeType } from "./types/NodeSpecificMappings";
import { Textarea } from "@/components/ui/textarea";

interface DroppedAction {
  id: string;
  actionId: string;
  actionName: string;
  order: number;
}

interface Trigger {
  id: string;
  type: string;
  name: string;
  actions: DroppedAction[];
}

const ScriptSideBar = observer(() => {
  const editor = useEditor();
  const activeNode = editor.activeNode;
  const [actions, setActions] = useState<Action[]>([]);
  const [mainLoopActions, setMainLoopActions] = useState<DroppedAction[]>([]);
  const [triggers, setTriggers] = useState<Trigger[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [draggedAction, setDraggedAction] = useState<Action | null>(null);

  if (!activeNode) {
    return (
      <div className="p-6">
        <p className="text-sm text-gray-600">
          Please select a Node to edit its script
        </p>
      </div>
    );
  }

  // Map activeNode.type to our NodeType enum
  const getNodeType = (nodeType: string): NodeType => {
    switch (nodeType.toLowerCase()) {
      case "node2d":
        return NodeType.NODE2D;
      case "sprite2d":
        return NodeType.SPRITE2D;
      case "animatedsprite2d":
        return NodeType.ANIMATED_SPRITE2D;
      case "rigidbody2d":
        return NodeType.RIGIDBODY2D;
      case "staticbody2d":
        return NodeType.STATICBODY2D;
      case "area2d":
        return NodeType.AREA2D;
      case "characterbody2d":
        return NodeType.CHARACTERBODY2D;
      case "collisionshape2d":
        return NodeType.COLLISION_SHAPE2D;
      case "collisionpolygon2d":
        return NodeType.COLLISION_POLYGON2D;
      default:
        return NodeType.NODE;
    }
  };

  const currentNodeType = getNodeType(activeNode.type);

  const handleSaveScript = () => {
    // TODO: Implement script saving logic
    console.log("Saving scripts:", { actions, mainLoopActions, triggers });
    // Here you would save the generated GDScript to the node
  };

  const handleRunScript = () => {
    // TODO: Implement script execution logic
    console.log("Running scripts:", { actions, mainLoopActions, triggers });
    // Here you would execute the generated GDScript
  };

  const handlePreviewCode = () => {
    // Generate and show the GDScript code
    import("./utils/CodeGenerator").then(({ CodeGenerator }) => {
      const mainLoopCode = CodeGenerator.generateMainLoopFunction(
        mainLoopActions
          .map((dropped) => actions.find((a) => a.id === dropped.actionId))
          .filter(Boolean) as Action[]
      );

      const triggerCodes = triggers.map((trigger) =>
        CodeGenerator.generateTriggerFunction(
          trigger.name,
          trigger.actions
            .map((dropped) => actions.find((a) => a.id === dropped.actionId))
            .filter(Boolean) as Action[]
        )
      );

      const fullCode = [mainLoopCode, ...triggerCodes]
        .filter(Boolean)
        .join("\n\n");
      console.log("Generated GDScript:", fullCode);
      // You could show this in a modal or copy to clipboard
    });
  };

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    setActiveId(active.id as string);

    if (active.data.current?.type === "action") {
      setDraggedAction(active.data.current.action);
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) {
      setActiveId(null);
      setDraggedAction(null);
      return;
    }

    const activeData = active.data.current;
    const overData = over.data.current;

    if (activeData?.type === "action" && overData?.type === "main-loop") {
      // Add action to main loop
      const action = activeData.action as Action;
      const newDroppedAction: DroppedAction = {
        id: `dropped-${Date.now()}`,
        actionId: action.id,
        actionName: action.name,
        order: mainLoopActions.length,
      };
      setMainLoopActions([...mainLoopActions, newDroppedAction]);
    } else if (activeData?.type === "action" && overData?.type === "trigger") {
      // Add action to trigger
      const action = activeData.action as Action;
      const triggerId = overData.triggerId;
      const newDroppedAction: DroppedAction = {
        id: `dropped-${Date.now()}`,
        actionId: action.id,
        actionName: action.name,
        order: 0, // Will be updated based on existing actions
      };

      setTriggers(
        triggers.map((trigger) => {
          if (trigger.id === triggerId) {
            return {
              ...trigger,
              actions: [
                ...trigger.actions,
                { ...newDroppedAction, order: trigger.actions.length },
              ],
            };
          }
          return trigger;
        })
      );
    }

    setActiveId(null);
    setDraggedAction(null);
  };

  return (
    <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <ScrollArea className="h-full">
        <div className="p-4 space-y-4">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold">Script Editor</h3>
              <p className="text-sm text-muted-foreground">
                Node: {activeNode.name}
              </p>
              <p className="text-xs text-blue-600 font-medium">
                Type: {activeNode.type}
              </p>
            </div>
            <div className="flex gap-2">
              <Button size="sm" variant="outline" onClick={handlePreviewCode}>
                <Code className="h-4 w-4 mr-1" />
                Preview
              </Button>
              <Button size="sm" variant="outline" onClick={handleSaveScript}>
                <Save className="h-4 w-4 mr-1" />
                Save
              </Button>
              <Button size="sm" onClick={handleRunScript}>
                <Play className="h-4 w-4 mr-1" />
                Run
              </Button>
            </div>
          </div>

          <Separator />

          {/* Main Loop Section */}
          <MainLoopSection
            droppedActions={mainLoopActions}
            onDroppedActionsChange={setMainLoopActions}
          />

          {/* Trigger Section */}
          <TriggerSection
            triggers={triggers}
            onTriggersChange={setTriggers}
            nodeType={currentNodeType}
          />

          {/* Actions Section */}
          <ActionsSection
            actions={actions}
            onActionsChange={setActions}
            nodeType={currentNodeType}
          />
        </div>
      </ScrollArea>

      {/* Drag Overlay */}
      <DragOverlay
        style={{
          zIndex: 9999,
        }}
        dropAnimation={{
          duration: 200,
          easing: "cubic-bezier(0.18, 0.67, 0.6, 1.22)",
        }}
      >
        {draggedAction ? (
          <div className="bg-white border rounded-lg p-2 shadow-lg max-w-[200px] pointer-events-none">
            <span className="text-sm font-medium truncate block">
              {draggedAction.name}
            </span>
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );

  // return (
  //   <div className=" p-2 px-4">
  //     <Textarea className=" min-h-full" />
  //   </div>
  // );
});

export default ScriptSideBar;
