"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Play, Trash2, Plus, Zap } from "lucide-react";
import { useDroppable } from "@dnd-kit/core";
import { useState } from "react";
import { Action } from "@brickly/types";
import { getAvailableTriggersForNode, getTriggerOptionsForNode, NodeType } from "@brickly/types";

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

interface TriggerSectionProps {
  triggers: Trigger[];
  onTriggersChange: (triggers: Trigger[]) => void;
  nodeType?: NodeType;
}


const DroppedActionItem = ({ 
  droppedAction, 
  onRemove 
}: { 
  droppedAction: DroppedAction; 
  onRemove: (id: string) => void;
}) => {
  return (
    <div className="flex items-center justify-between p-2 bg-green-50 border border-green-200 rounded-md">
      <div className="flex items-center gap-2">
        <Play className="h-3 w-3 text-green-600" />
        <span className="text-sm font-medium">{droppedAction.actionName}</span>
        <Badge variant="outline" className="text-xs">
          Action
        </Badge>
      </div>
      <Button
        size="sm"
        variant="ghost"
        onClick={() => onRemove(droppedAction.id)}
        className="h-6 w-6 p-0 text-destructive hover:text-destructive"
      >
        <Trash2 className="h-3 w-3" />
      </Button>
    </div>
  );
};

const TriggerItem = ({ 
  trigger, 
  onRemove, 
  onActionsChange,
  nodeType
}: { 
  trigger: Trigger; 
  onRemove: (id: string) => void;
  onActionsChange: (triggerId: string, actions: DroppedAction[]) => void;
  nodeType: NodeType;
}) => {
  const { setNodeRef, isOver } = useDroppable({
    id: `trigger-${trigger.id}`,
    data: {
      type: 'trigger',
      triggerId: trigger.id
    }
  });

  const handleRemoveAction = (actionId: string) => {
    const updatedActions = trigger.actions.filter(action => action.id !== actionId);
    onActionsChange(trigger.id, updatedActions);
  };

  // Get trigger options for the current node type
  const triggerOptions = getTriggerOptionsForNode(nodeType);
  const triggerType = triggerOptions.find(t => t.value === trigger.type);

  return (
    <div className="border rounded-lg p-3 space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Zap className="h-4 w-4 text-orange-600" />
          <span className="font-medium text-sm">{trigger.name}</span>
          <Badge variant="secondary" className="text-xs">
            {triggerType?.label}
          </Badge>
        </div>
        <Button
          size="sm"
          variant="ghost"
          onClick={() => onRemove(trigger.id)}
          className="h-6 w-6 p-0 text-destructive hover:text-destructive"
        >
          <Trash2 className="h-3 w-3" />
        </Button>
      </div>

      <p className="text-xs text-muted-foreground">
        {triggerType?.description}
      </p>

      {/* Droppable Area for Actions */}
      <div
        ref={setNodeRef}
        className={`min-h-[80px] border-2 border-dashed rounded-lg p-3 transition-colors duration-200 ${
          isOver 
            ? 'border-green-400 bg-green-50 dark:bg-green-950/20' 
            : 'border-gray-300 bg-gray-50 dark:bg-gray-900/20'
        }`}
      >
        {trigger.actions.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <Play className="h-6 w-6 text-gray-400 mb-2" />
            <p className="text-sm text-muted-foreground">
              {isOver ? 'Drop action here' : 'Drag actions here'}
            </p>
          </div>
        ) : (
          <div className="space-y-2">
            {trigger.actions
              .sort((a, b) => a.order - b.order)
              .map((droppedAction, index) => (
                <div key={droppedAction.id} className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground w-4">
                    {index + 1}.
                  </span>
                  <div className="flex-1">
                    <DroppedActionItem
                      droppedAction={droppedAction}
                      onRemove={handleRemoveAction}
                    />
                  </div>
                </div>
              ))}
            {isOver && (
              <div className="p-2 border-2 border-dashed border-green-400 rounded-md bg-green-100 dark:bg-green-950/30">
                <p className="text-sm text-green-600 text-center">Drop here to add action</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export const TriggerSection = ({ triggers, onTriggersChange, nodeType = NodeType.Node2D }: TriggerSectionProps) => {
  const [selectedTriggerType, setSelectedTriggerType] = useState<string>("");

  // Get trigger options based on node type
  const triggerOptions = getTriggerOptionsForNode(nodeType);

  const handleAddTrigger = () => {
    if (selectedTriggerType) {
      const triggerType = triggerOptions.find(t => t.value === selectedTriggerType);
      if (triggerType) {
        const newTrigger: Trigger = {
          id: Date.now().toString(),
          type: selectedTriggerType,
          name: triggerType.label,
          actions: []
        };
        onTriggersChange([...triggers, newTrigger]);
        setSelectedTriggerType("");
      }
    }
  };

  const handleRemoveTrigger = (triggerId: string) => {
    onTriggersChange(triggers.filter(trigger => trigger.id !== triggerId));
  };

  const handleTriggerActionsChange = (triggerId: string, actions: DroppedAction[]) => {
    onTriggersChange(triggers.map(trigger => 
      trigger.id === triggerId ? { ...trigger, actions } : trigger
    ));
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-base flex items-center gap-2">
          <Zap className="h-4 w-4" />
          Triggers
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-xs text-muted-foreground">
          Event-driven actions that execute when specific conditions are met
        </p>
        
        {/* Add Trigger */}
        <div className="flex gap-2">
          <Select
            value={selectedTriggerType}
            onValueChange={setSelectedTriggerType}
          >
            <SelectTrigger className="flex-1">
              <SelectValue placeholder="Select trigger type..." />
            </SelectTrigger>
            <SelectContent>
              {triggerOptions.map((triggerType) => (
                <SelectItem key={triggerType.value} value={triggerType.value}>
                  {triggerType.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button size="sm" onClick={handleAddTrigger} disabled={!selectedTriggerType}>
            <Plus className="h-4 w-4" />
          </Button>
        </div>

        {/* Triggers List */}
        <div className="space-y-3">
          {triggers.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-4">
              No triggers created yet. Add your first trigger above.
            </p>
          ) : (
            triggers.map((trigger) => (
              <TriggerItem
                key={trigger.id}
                trigger={trigger}
                onRemove={handleRemoveTrigger}
                onActionsChange={handleTriggerActionsChange}
                nodeType={nodeType}
              />
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
};
