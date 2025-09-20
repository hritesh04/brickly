import { useDroppable } from "@dnd-kit/core";
import { node } from "@/actions/node/schema";
import { File, Folder } from "@/components/magicui/file-tree";
import { useEditor } from "@/store/editor";
import { CircleIcon } from "lucide-react";
import { useRightSidebar } from "../RightSidebar";
import { observer } from "mobx-react-lite";

interface DroppableTreeProps {
  scene: node;
}

export const FileTree = observer(({ scene }: DroppableTreeProps) => {
  const editor = useEditor();
  const { setOpen } = useRightSidebar();

  const { setNodeRef, isOver } = useDroppable({
    id: `drop-${scene.id}`,
    data: { scene },
  });

  const isLeaf = !scene.children || scene.children.length === 0;

  if (isLeaf) {
    return (
      <div
        ref={setNodeRef}
        className={`relative transition-all duration-200 ${
          isOver
            ? "bg-blue-100 dark:bg-blue-900/20 border-2 border-dashed border-blue-400 rounded scale-105"
            : ""
        }`}
      >
        <File
          key={scene.id}
          value={String(scene.id)}
          className="p-1"
          fileIcon={<CircleIcon className=" size-4" />}
          onClick={(e) => {
            editor.setActiveNode(scene);
            e.stopPropagation();
          }}
          isSelect={editor.activeNode?.id == scene.id}
        >
          <p>{scene.name}</p>
        </File>
        {isOver && (
          <div className="absolute inset-0 bg-blue-200 dark:bg-blue-800/30 rounded flex items-center justify-center text-xs text-blue-600 dark:text-blue-300">
            Drop here
          </div>
        )}
      </div>
    );
  }

  return (
    <div
      ref={setNodeRef}
      className={`relative transition-all duration-200 ${
        isOver
          ? "bg-blue-100 dark:bg-blue-900/20 border-2 border-dashed border-blue-400 rounded scale-105"
          : ""
      }`}
    >
      <Folder
        element={scene.name}
        value={String(scene.id)}
        className="mb-1"
        key={scene.id}
        onClick={(e) => {
          editor.setActiveNode(scene);
          setOpen(true);
          e.stopPropagation();
        }}
        isSelect={editor.activeNode?.id == scene.id}
      >
        {scene.children?.map((n) => (
          <FileTree scene={n as node} key={n.id} />
        ))}
      </Folder>
      {isOver && (
        <div className="absolute inset-0 bg-blue-200 dark:bg-blue-800/30 rounded flex items-center justify-center text-xs text-blue-600 dark:text-blue-300">
          Drop here
        </div>
      )}
    </div>
  );
});
