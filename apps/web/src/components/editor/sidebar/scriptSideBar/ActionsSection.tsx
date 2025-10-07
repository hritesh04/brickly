"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Plus,
  Trash2,
  GripVertical,
  Settings,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { useState } from "react";
import { useDraggable } from "@dnd-kit/core";
import { NodeType } from "@prisma/client";
import { ActionFormRenderer } from "./forms/ActionForms";
import { ActionFactory } from "./utils/ActionFactory";
import { getAvailableActionsForNode } from "@brickly/types";
import { action } from "@/actions/action/schema";
import { ActionType } from "@prisma/client";

// Use Prisma action type directly
type Action = action;

interface ActionsSectionProps {
  actions: Action[];
  onActionsChange: (actions: Action[]) => void;
  nodeType?: NodeType;
}

const DraggableAction = ({
  action,
  onDelete,
  onUpdate,
}: {
  action: Action;
  onDelete: (id: number) => void;
  onUpdate: (action: Action) => void;
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: `action-${action.id}`,
      data: {
        type: "action",
        action: action,
      },
    });

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  const getCategoryColor = (actionType: ActionType) => {
    // You can define your own color mapping based on Prisma ActionType
    const colors: Record<string, string> = {
      MOVE_TO: "bg-blue-100 text-blue-800",
      MOVE_BY: "bg-blue-100 text-blue-800",
      ROTATE_TO: "bg-blue-100 text-blue-800",
      ROTATE_BY: "bg-blue-100 text-blue-800",
      SCALE_TO: "bg-blue-100 text-blue-800",
      SCALE_BY: "bg-blue-100 text-blue-800",
      SET_VISIBLE: "bg-green-100 text-green-800",
      SET_MODULATE: "bg-green-100 text-green-800",
      PLAY_ANIMATION: "bg-purple-100 text-purple-800",
      STOP_ANIMATION: "bg-purple-100 text-purple-800",
      EMIT_SIGNAL: "bg-orange-100 text-orange-800",
      WAIT: "bg-yellow-100 text-yellow-800",
      PRINT: "bg-gray-100 text-gray-800",
    };
    return colors[actionType] || "bg-gray-100 text-gray-800";
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`border rounded-lg bg-white transition-all relative ${
        isDragging ? "opacity-30" : "hover:shadow-sm"
      }`}
    >
      <div className="p-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div
              {...attributes}
              {...listeners}
              className="cursor-grab hover:cursor-grabbing p-1 hover:bg-gray-100 rounded"
            >
              <GripVertical className="h-4 w-4 text-gray-400" />
            </div>
            <span className="font-medium text-sm">{action.name}</span>
            <Badge className={`text-xs ${getCategoryColor(action.type)}`}>
              {ActionFactory.getActionDisplayName(action.type)}
            </Badge>
          </div>
          <div className="flex items-center gap-1">
            <Button
              size="sm"
              variant="ghost"
              onClick={() => setIsExpanded(!isExpanded)}
              className="h-6 w-6 p-0"
            >
              {isExpanded ? (
                <ChevronUp className="h-3 w-3" />
              ) : (
                <ChevronDown className="h-3 w-3" />
              )}
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => onDelete(action.id)}
              className="h-6 w-6 p-0 text-destructive hover:text-destructive"
            >
              <Trash2 className="h-3 w-3" />
            </Button>
          </div>
        </div>

        <p className="text-xs text-muted-foreground mt-1">
          {ActionFactory.getActionDescription(action.type)}
        </p>
      </div>

      {isExpanded && (
        <div className="border-t p-3 bg-gray-50 overflow-x-auto">
          <div className="min-w-0">
            <ActionFormRenderer action={action} onChange={onUpdate} />
          </div>
        </div>
      )}
    </div>
  );
};

export const ActionsSection = ({
  actions,
  onActionsChange,
  nodeType = NodeType.Node,
}: ActionsSectionProps) => {
  console.log(actions, nodeType);
  const [selectedActionType, setSelectedActionType] = useState<ActionType | "">(
    ""
  );
  const [selectedCategory, setSelectedCategory] = useState<string>("TRANSFORM");

  // Get available actions for the current node type
  const availableActionsForNode = getAvailableActionsForNode(nodeType as any);
  console.log(availableActionsForNode);

  // Filter categories to only show those with available actions
  const getFilteredCategories = () => {
    const filteredCategories: Record<
      string,
      { name: string; actions: ActionType[] }
    > = {};

    // Define categories based on Prisma ActionType
    const categories = {
      TRANSFORM: {
        name: "Transform",
        actions: [
          ActionType.MOVE_TO,
          ActionType.MOVE_BY,
          ActionType.TRANSLATE,
          ActionType.ROTATE_TO,
          ActionType.ROTATE_BY,
          ActionType.ROTATE,
          ActionType.SCALE_TO,
          ActionType.SCALE_BY,
          ActionType.LOOK_AT,
          ActionType.GET_ANGLE_TO,
          ActionType.TO_LOCAL,
          ActionType.TO_GLOBAL,
        ],
      },
      PROPERTIES: {
        name: "Properties",
        actions: [
          ActionType.SET_VISIBLE,
          ActionType.SET_MODULATE,
          ActionType.SET_PROPERTY,
          ActionType.TWEEN_PROPERTY,
        ],
      },
      ANIMATION: {
        name: "Animation",
        actions: [
          ActionType.PLAY_ANIMATION,
          ActionType.STOP_ANIMATION,
          ActionType.PAUSE_ANIMATION,
          ActionType.SET_ANIMATION,
          ActionType.GET_ANIMATION,
          ActionType.SET_FRAME,
          ActionType.GET_FRAME,
          ActionType.SET_SPEED_SCALE,
        ],
      },
      SIGNALS: {
        name: "Signals",
        actions: [ActionType.EMIT_SIGNAL, ActionType.CONNECT_SIGNAL],
      },
      FLOW_CONTROL: {
        name: "Flow Control",
        actions: [ActionType.WAIT, ActionType.CONDITION, ActionType.LOOP],
      },
      DEBUG: {
        name: "Debug",
        actions: [ActionType.PRINT],
      },
    };

    Object.entries(categories).forEach(([key, category]) => {
      const availableActions = category.actions.filter((action) =>
        availableActionsForNode.includes(action as any)
      );

      if (availableActions.length > 0) {
        filteredCategories[key] = {
          ...category,
          actions: availableActions,
        };
      }
    });
    console.log(filteredCategories);
    return filteredCategories;
  };

  const filteredCategories = getFilteredCategories();

  const handleAddAction = () => {
    if (selectedActionType) {
      const actionName = ActionFactory.getActionDisplayName(selectedActionType);
      const newAction = ActionFactory.createAction(
        selectedActionType,
        actionName
      );
      onActionsChange([...actions, newAction]);
      setSelectedActionType("");
    }
  };

  const handleDeleteAction = (actionId: number) => {
    onActionsChange(actions.filter((action) => action.id !== actionId));
  };

  const handleUpdateAction = (updatedAction: Action) => {
    onActionsChange(
      actions.map((action) =>
        action.id === updatedAction.id ? updatedAction : action
      )
    );
  };

  const getAvailableActions = () => {
    const category = filteredCategories[selectedCategory];
    return category ? category.actions : [];
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-base flex items-center gap-2">
          <Settings className="h-4 w-4" />
          Visual Actions
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-xs text-muted-foreground">
          Create visual actions using forms - no coding required! Drag them to
          Main Loop or Triggers.
        </p>

        {/* Add Action */}
        <div className="space-y-2">
          <div className="grid grid-cols-2 gap-2">
            <Select
              value={selectedCategory}
              onValueChange={setSelectedCategory}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select category..." />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(filteredCategories).map(([key, category]) => (
                  <SelectItem key={key} value={key}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select
              value={selectedActionType}
              onValueChange={(value) =>
                setSelectedActionType(value as ActionType)
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select action..." />
              </SelectTrigger>
              <SelectContent>
                {getAvailableActions().map((actionType) => (
                  <SelectItem key={actionType} value={actionType}>
                    {ActionFactory.getActionDisplayName(actionType)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Button
            onClick={handleAddAction}
            disabled={!selectedActionType}
            className="w-full"
            size="sm"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add{" "}
            {selectedActionType
              ? ActionFactory.getActionDisplayName(selectedActionType)
              : "Action"}
          </Button>
        </div>

        {/* Actions List */}
        <div className="space-y-3">
          {actions.length === 0 ? (
            <div className="text-center py-8 border-2 border-dashed border-gray-200 rounded-lg">
              <Settings className="h-8 w-8 text-gray-400 mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">
                No actions created yet
              </p>
              <p className="text-xs text-muted-foreground">
                Select a category and action type above to get started
              </p>
            </div>
          ) : (
            actions.map((action) => (
              <DraggableAction
                key={action.id}
                action={action}
                onDelete={handleDeleteAction}
                onUpdate={handleUpdateAction}
              />
            ))
          )}
        </div>

        {/* Quick Actions */}
        <div className="border-t pt-3">
          <p className="text-xs font-medium text-muted-foreground mb-2">
            Quick Add:
          </p>
          <div className="flex flex-wrap gap-1">
            {[
              ActionType.MOVE_BY,
              ActionType.ROTATE_BY,
              ActionType.SET_VISIBLE,
              ActionType.WAIT,
              ActionType.PRINT,
            ]
              .filter((actionType) =>
                availableActionsForNode.includes(actionType as any)
              )
              .map((actionType) => (
                <Button
                  key={actionType}
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    const actionName =
                      ActionFactory.getActionDisplayName(actionType);
                    const newAction = ActionFactory.createAction(
                      actionType,
                      actionName
                    );
                    onActionsChange([...actions, newAction]);
                  }}
                  className="h-6 text-xs"
                >
                  {ActionFactory.getActionDisplayName(actionType)}
                </Button>
              ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
