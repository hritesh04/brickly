import { Separator } from "@/components/ui/separator";
import { Image, Layers, Plus } from "lucide-react";
import FileTree from "./FileTree";
import { Node, NodeType } from "@/types/node";
import { Tree } from "@/components/magicui/file-tree";
import { node } from "@/actions/node/schema";
import { useAction } from "@/hooks/useAction";
import { createNode } from "@/actions/node";

export default function ActiveScene({ scene }: { scene: node | null }) {
  const { execute } = useAction(createNode);
  if (!scene) {
    return (
      <div className="flex-1 flex items-center flex-col">
        <div className="flex items-center w-full justify-between">
          <p className="text-sm font-medium text-sidebar-foreground/80">
            Active Scene
          </p>
          <div
            className="p-1 hover:bg-secondary rounded-md cursor-pointer"
            onClick={() => execute({ type: "Node", projectID: 1 })}
          >
            <Plus size={18} />
          </div>
        </div>
        <div className="flex-1 flex items-center">
          <p className=" text-center">
            Please Select a Scene to View its children
          </p>
        </div>
      </div>
    );
  }
  return (
    <div className="flex flex-col gap-2 flex-1">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-sidebar-foreground/80">
          Active Scene
        </p>
        <div
          className="flex p-1 hover:bg-secondary rounded-md cursor-pointer"
          onClick={() =>
            execute({
              type: "Node",
              parentID: scene.id,
              // projectID: 1
            })
          }
        >
          <Plus size={18} />
        </div>
      </div>
      <Tree
        initialExpandedItems={[scene.name]}
        closeIcon={<Image className=" size-4" />}
        openIcon={<Layers className=" size-4" />}
      >
        <FileTree scene={scene} />
      </Tree>
    </div>
  );
}
