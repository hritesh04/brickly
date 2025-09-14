import { createNode } from "@/actions/node";
import { node } from "@/actions/node/schema";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { useAction } from "@/hooks/useAction";
import { useEditor } from "@/store/editor";
import { Image, Plus } from "lucide-react";
import { observer } from "mobx-react-lite";
import { usePropertySideBar } from "../propertySideBar/PropertySideBar";
import { useProjectManager } from "@/store/project";
import { NodeType } from "@prisma/client";
import { NewSceneDialog } from "./NewSceneDialog";

interface AllScenesProps {
  scenes: node[] | null;
  // setScene: React.Dispatch<SetStateAction<node | null>>;
}

export const AllScenes = observer(() => {
  const project = useProjectManager();
  const editor = useEditor();
  const { setOpen } = usePropertySideBar();
  const { execute, error } = useAction(createNode, {
    onSuccess(data) {
      editor.addNode(data as node);
    },
  });
  if (!editor.scene) {
    return (
      <div className="min-h-2/5 max-h-2/5 w-full flex flex-col gap-1">
        <div className="flex justify-between items-center px-2">
          <p className="text-sm font-medium text-sidebar-foreground/80">
            All Scenes
          </p>
          <div className="p-1 hover:bg-secondary rounded-md cursor-pointer">
            <Plus size={18} />
          </div>
        </div>
        <div className="flex-1 flex justify-center flex-col">
          <p className="text-center">You dont have any saved Scene</p>
          <p className="text-center">Start by Creating your first scene.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-2/5 max-h-2/5 flex flex-col gap-2">
      <div className="flex justify-between items-center px-2 flex-shrink-0">
        <p className="text-sm font-medium text-sidebar-foreground/80">
          All Scenes
        </p>
        <div
          className="p-1 hover:bg-secondary rounded-md cursor-pointer"
          // onClick={() =>
          //   execute({ type: NodeType.Node2D, projectID: project.project?.id })
          // }
        >
          <NewSceneDialog />
        </div>
      </div>
      <div className="flex-1 min-h-0 pb-2">
        <ScrollArea className="h-full rounded-md">
          {editor.scene.map((s, index) => (
            <div key={index}>
              <div
                className="flex items-center gap-2 text-sm py-2 cursor-pointer hover:bg-secondary/50 px-2 rounded-md"
                onClick={() => {
                  editor.setActiveScene(s);
                  editor.setActiveNode(s);
                  setOpen(true);
                }}
              >
                <Image className="size-5" />
                {s.name}
              </div>
              {index < editor.scene.length - 1 && (
                <Separator className="my-1" />
              )}
            </div>
          ))}
        </ScrollArea>
      </div>
    </div>
  );
});
