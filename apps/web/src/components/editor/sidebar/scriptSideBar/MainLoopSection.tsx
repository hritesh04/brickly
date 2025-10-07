"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Settings, Trash2, Play } from "lucide-react";
import { useDroppable } from "@dnd-kit/core";
import { Action } from "@brickly/types";

interface DroppedAction {
  id: string;
  actionId: number;
  actionName: string;
  order: number;
}

interface MainLoopSectionProps {
  droppedActions: DroppedAction[];
  onDroppedActionsChange: (actions: DroppedAction[]) => void;
}

const DroppedActionItem = ({
  droppedAction,
  onRemove,
}: {
  droppedAction: DroppedAction;
  onRemove: (id: string) => void;
}) => {
  return (
    <div className="flex items-center justify-between p-2 bg-blue-50 border border-blue-200 rounded-md">
      <div className="flex items-center gap-2">
        <Play className="h-3 w-3 text-blue-600" />
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

export const MainLoopSection = ({
  droppedActions,
  onDroppedActionsChange,
}: MainLoopSectionProps) => {
  const { setNodeRef, isOver } = useDroppable({
    id: "main-loop-droppable",
    data: {
      type: "main-loop",
    },
  });

  const handleRemoveAction = (actionId: string) => {
    onDroppedActionsChange(
      droppedActions.filter((action) => action.id !== actionId)
    );
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-base flex items-center gap-2">
          <Settings className="h-4 w-4" />
          Main Loop
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="text-xs text-muted-foreground">
          Actions that run every frame while the node is active. Drag actions
          here from the Actions section.
        </p>

        {/* Droppable Area */}
        <div
          ref={setNodeRef}
          className={`min-h-[120px] border-2 border-dashed rounded-lg p-4 transition-colors duration-200 ${
            isOver
              ? "border-blue-400 bg-blue-50 dark:bg-blue-950/20"
              : "border-gray-300 bg-gray-50 dark:bg-gray-900/20"
          }`}
        >
          {droppedActions.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <Settings className="h-8 w-8 text-gray-400 mb-2" />
              <p className="text-sm text-muted-foreground">
                {isOver
                  ? "Drop action here"
                  : "Drag actions here to add to main loop"}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Actions will execute in order every frame
              </p>
            </div>
          ) : (
            <div className="space-y-2">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs font-medium text-muted-foreground">
                  Execution Order:
                </span>
              </div>
              {droppedActions
                .sort((a, b) => a.order - b.order)
                .map((droppedAction, index) => (
                  <div
                    key={droppedAction.id}
                    className="flex items-center gap-2"
                  >
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
                <div className="p-2 border-2 border-dashed border-blue-400 rounded-md bg-blue-100 dark:bg-blue-950/30">
                  <p className="text-sm text-blue-600 text-center">
                    Drop here to add action
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="text-xs text-muted-foreground">
          <p className="font-medium mb-1">Main Loop Execution:</p>
          <ul className="list-disc list-inside space-y-1 ml-2">
            <li>Runs every frame (typically 60 FPS)</li>
            <li>Actions execute in the order shown above</li>
            <li>Use for continuous updates like movement, animations</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};
