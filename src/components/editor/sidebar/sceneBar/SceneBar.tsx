import { ActiveScene } from "./ActiveScene";
import { AllScenes } from "./AllScene";
import { Separator } from "@/components/ui/separator";
import React from "react";
import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragStartEvent,
  DragOverlay,
  closestCenter,
  pointerWithin,
  rectIntersection,
} from "@dnd-kit/core";
import { node } from "@/actions/node/schema";
import { useEditor } from "@/store/editor";
import { observer } from "mobx-react-lite";
import { Image, Layers } from "lucide-react";
import { useAction } from "@/hooks/useAction";
import { createNode, updateNode } from "@/actions/node";

export const SceneBar = observer(() => {
  const editor = useEditor();
  const [activeId, setActiveId] = React.useState<string | null>(null);
  const [draggedScene, setDraggedScene] = React.useState<node | null>(null);

  const { execute } = useAction(updateNode, {
    onSuccess(data) {
      editor.addChild(data.id, data.parentID!);
    },
  });

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    setActiveId(active.id as string);

    if (active.data.current) {
      setDraggedScene(active.data.current.scene);
    }
  };

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;

    if (!over) return;
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    setActiveId(null);
    setDraggedScene(null);

    if (!over) {
      return;
    }

    if (!active.data.current || !over.data.current) return;
    console.log(active.data.current.scene, over.data.current.scene);

    execute({
      id: active.data.current.scene.id,
      parentID: over.data.current.scene.id,
    });
  };

  return (
    <DndContext
      collisionDetection={rectIntersection}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <div className="h-full w-full flex flex-col gap-2 overflow-hidden">
        <ActiveScene />
        <Separator />
        <AllScenes />
      </div>
      <DragOverlay>
        {activeId && draggedScene ? (
          <div className="flex items-center gap-2 text-sm py-2 px-2 rounded-md bg-white dark:bg-gray-800 shadow-lg border">
            <Image className=" size-4" />
            {draggedScene.name}
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
});
