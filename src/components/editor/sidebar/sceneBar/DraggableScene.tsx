import { useDraggable } from "@dnd-kit/core";
import { node } from "@/actions/node/schema";
import { Grip, Image } from "lucide-react";
import { useRightSidebar } from "../RightSidebar";
import { useEditor } from "@/store/editor";
import { observer } from "mobx-react-lite";
import { CSS } from "@dnd-kit/utilities";

interface DraggableSceneProps {
  scene: node;
}

export const DraggableScene = observer(({ scene }: DraggableSceneProps) => {
  const editor = useEditor();
  const { setOpen } = useRightSidebar();

  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: `scene-${scene.id}`,
      data: { scene },
    });

  const style = {
    transform: CSS.Translate.toString(transform),
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`flex items-center text-sm py-2 hover:bg-secondary/50 px-4 rounded-md justify-between transition-all duration-200 ${
        isDragging ? "opacity-50 scale-105 shadow-lg" : "hover:scale-105"
      }`}
      onClick={(e) => {
        editor.setActiveScene(scene);
        editor.setActiveNode(scene);
        setOpen(true);
      }}
    >
      <div className="inline-flex items-center gap-2 justify-start ">
        <Image className="size-5" />
        {scene.name}
      </div>
      <Grip
        {...listeners}
        {...attributes}
        aria-label="Drag scene"
        className=" size-5 cursor-grab active:cursor-grabbing"
      />
    </div>
  );
});
