"use client";
import { useEditor } from "@/store/editor";
import { useScriptEditor } from "@/store/scriptEditor";
import { observer } from "mobx-react-lite";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Play, Save, Code, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
} from "@dnd-kit/core";
import { ActionsSection } from "./ActionsSection";
import { MainLoopSection } from "./MainLoopSection";
import { TriggerSection } from "./TriggerSection";
import { NodeType } from "@prisma/client";
import { getScripts } from "@/actions/script";
import { action } from "@/actions/action/schema";

// Use the Prisma action type directly
type Action = action;

interface DroppedAction {
  id: string;
  actionId: number;
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
  const scriptEditor = useScriptEditor();
  const activeNode = editor.activeNode;
  const [activeId, setActiveId] = useState<string | null>(null);
  const [draggedAction, setDraggedAction] = useState<Action | null>(null);

  // Use store data directly - no conversion needed since we're using Prisma types
  const actions: Action[] = scriptEditor.actions;

  const triggers: Trigger[] = scriptEditor.triggers.map((storeTrigger) => ({
    id: storeTrigger.id.toString(),
    type: storeTrigger.type,
    name: storeTrigger.name,
    actions: scriptEditor
      .getActionsForTrigger(storeTrigger.id)
      .map((action) => ({
        id: `dropped-${action.id}`,
        actionId: action.id,
        actionName: action.name,
        order: action.order,
      })),
  }));

  // Main loop actions are actions without a trigger ID
  const mainLoopActions: DroppedAction[] = scriptEditor.actions
    .filter((action) => !action.triggerID)
    .map((action) => ({
      id: `dropped-${action.id}`,
      actionId: action.id,
      actionName: action.name,
      order: action.order,
    }));

  // Load script when node changes
  useEffect(() => {
    const loadScriptForNode = async () => {
      if (!activeNode?.id) return;

      try {
        // First, load all scripts to find the one for this node
        const scriptsResult = await getScripts();
        if (scriptsResult.data) {
          scriptEditor.scripts = scriptsResult.data;
          const existingScript = scriptsResult.data.find(
            (s) => s.nodeID === activeNode.id
          );

          if (existingScript) {
            await scriptEditor.loadScript(existingScript.id);
          } else {
            // Create a new script for this node
            await scriptEditor.createScript({
              name: `${activeNode.name}_script`,
              nodeID: activeNode.id,
              content: "",
            });
          }
        }
      } catch (error) {
        console.error("Failed to load script for node:", error);
        scriptEditor.error = "Failed to load script for node";
      }
    };

    loadScriptForNode();
  }, [activeNode?.id, scriptEditor]);

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
        return NodeType.Node2D;
      case "sprite2d":
        return NodeType.Sprite2D;
      case "animatedsprite2d":
        return NodeType.AnimatedSprite2D;
      case "rigidbody2d":
        return NodeType.RigidBody2D;
      case "staticbody2d":
        return NodeType.StaticBody2D;
      case "area2d":
        return NodeType.Area2D;
      case "characterbody2d":
        return NodeType.CharacterBody2D;
      case "collisionshape2d":
        return NodeType.CollisionShape2D;
      case "collisionpolygon2d":
        return NodeType.CollisionPolygon2D;
      default:
        return NodeType.Node;
    }
  };

  const currentNodeType = getNodeType(activeNode.type);

  const handleSaveScript = async () => {
    if (scriptEditor.activeScript) {
      await scriptEditor.saveScript();
    }
  };

  const handleRunScript = () => {
    // TODO: Implement script execution logic
    console.log("Running scripts:", { actions, mainLoopActions, triggers });
    // Here you would execute the generated GDScript
  };

  // const handlePreviewCode = () => {
  //   // Generate and show the GDScript code
  //   import("./utils/CodeGenerator").then(({ CodeGenerator }) => {
  //     const mainLoopCode = CodeGenerator.generateMainLoopFunction(
  //       mainLoopActions
  //         .map((dropped) => actions.find((a) => a.id === dropped.actionId))
  //         .filter(Boolean) as Action[]
  //     );

  //     const triggerCodes = triggers.map((trigger) =>
  //       CodeGenerator.generateTriggerFunction(
  //         trigger.name,
  //         trigger.actions
  //           .map((dropped) => actions.find((a) => a.id === dropped.actionId))
  //           .filter(Boolean) as Action[]
  //       )
  //     );

  //     const fullCode = [mainLoopCode, ...triggerCodes]
  //       .filter(Boolean)
  //       .join("\n\n");
  //     console.log("Generated GDScript:", fullCode);
  //     // You could show this in a modal or copy to clipboard
  //   });
  // };

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
      // Add action to main loop by updating its triggerID to null
      const action = activeData.action as Action;
      const storeAction = scriptEditor.actions.find((a) => a.id === action.id);
      if (storeAction && scriptEditor.activeScript) {
        scriptEditor.updateAction({
          id: storeAction.id,
          name: storeAction.name,
          type: storeAction.type,
          enabled: storeAction.enabled,
          order: storeAction.order,
          parameters: storeAction.parameters,
          scriptID: scriptEditor.activeScript.id,
          triggerID: null,
        });
      }
    } else if (activeData?.type === "action" && overData?.type === "trigger") {
      // Add action to trigger by updating its triggerID
      const action = activeData.action as Action;
      const triggerId = parseInt(overData.triggerId);
      const storeAction = scriptEditor.actions.find((a) => a.id === action.id);
      if (storeAction && scriptEditor.activeScript) {
        scriptEditor.updateAction({
          id: storeAction.id,
          name: storeAction.name,
          type: storeAction.type,
          enabled: storeAction.enabled,
          order: storeAction.order,
          parameters: storeAction.parameters,
          scriptID: scriptEditor.activeScript.id,
          triggerID: triggerId,
        });
      }
    }

    setActiveId(null);
    setDraggedAction(null);
  };

  const handleActionsChange = (newActions: Action[]) => {
    // No conversion needed since we're using Prisma types directly
    if (!scriptEditor.activeScript) return;

    // Remove actions that are no longer in the list
    const currentActionIds = newActions.map((a) => a.id);
    const actionsToRemove = scriptEditor.actions.filter(
      (a) => !currentActionIds.includes(a.id)
    );

    actionsToRemove.forEach((action) => {
      scriptEditor.deleteAction(action.id);
    });

    // Add or update actions
    newActions.forEach((action, index) => {
      const existingAction = scriptEditor.actions.find(
        (a) => a.id === action.id
      );
      if (existingAction) {
        // Update existing action
        scriptEditor.updateAction({
          id: existingAction.id,
          name: action.name,
          type: action.type,
          enabled: action.enabled,
          order: index,
          parameters: action.parameters,
          scriptID: scriptEditor.activeScript!.id,
          triggerID: existingAction.triggerID,
        });
      } else {
        // Create new action
        scriptEditor.createAction({
          name: action.name,
          type: action.type,
          enabled: action.enabled,
          order: index,
          parameters: action.parameters,
          scriptID: scriptEditor.activeScript!.id,
        });
      }
    });
  };

  const handleTriggersChange = (newTriggers: Trigger[]) => {
    // Convert UI triggers to store format and update
    if (!scriptEditor.activeScript) return;

    // Remove triggers that are no longer in the list
    const currentTriggerIds = newTriggers.map((t) => parseInt(t.id));
    const triggersToRemove = scriptEditor.triggers.filter(
      (t) => !currentTriggerIds.includes(t.id)
    );

    triggersToRemove.forEach((trigger) => {
      scriptEditor.deleteTrigger(trigger.id);
    });

    // Add or update triggers
    newTriggers.forEach((trigger, index) => {
      const existingTrigger = scriptEditor.triggers.find(
        (t) => t.id.toString() === trigger.id
      );
      if (existingTrigger) {
        // Update existing trigger
        scriptEditor.updateTrigger({
          id: existingTrigger.id,
          name: trigger.name,
          type: trigger.type,
          enabled: true,
          conditions: {},
          scriptID: scriptEditor.activeScript!.id,
        });
      } else {
        // Create new trigger
        scriptEditor.createTrigger({
          name: trigger.name,
          type: trigger.type,
          enabled: true,
          conditions: {},
          scriptID: scriptEditor.activeScript!.id,
        });
      }
    });
  };

  if (scriptEditor.isLoading) {
    return (
      <div className="p-6 flex items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin mr-2" />
        <p className="text-sm text-gray-600">Loading script...</p>
      </div>
    );
  }

  if (scriptEditor.error) {
    return (
      <div className="p-6">
        <p className="text-sm text-red-600">Error: {scriptEditor.error}</p>
        <Button
          size="sm"
          variant="outline"
          onClick={() => scriptEditor.clearError()}
          className="mt-2"
        >
          Retry
        </Button>
      </div>
    );
  }

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
              {scriptEditor.dirty && (
                <p className="text-xs text-orange-600 font-medium">
                  Unsaved changes
                </p>
              )}
            </div>
            <div className="flex gap-2">
              <Button
                size="sm"
                variant="outline"
                // onClick={handlePreviewCode}
              >
                <Code className="h-4 w-4 mr-1" />
                Preview
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={handleSaveScript}
                disabled={!scriptEditor.dirty}
              >
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
            onDroppedActionsChange={() => {}} // Handled by drag and drop
          />

          {/* Trigger Section */}
          <TriggerSection
            triggers={triggers}
            onTriggersChange={handleTriggersChange}
            nodeType={currentNodeType}
          />

          {/* Actions Section */}
          <ActionsSection
            actions={actions}
            onActionsChange={handleActionsChange}
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
});

export default ScriptSideBar;
