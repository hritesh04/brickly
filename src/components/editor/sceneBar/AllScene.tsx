import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Node } from "@/types/node";
import { Image, Plus } from "lucide-react";
import { SetStateAction } from "react";

interface AllScenesProps {
  scenes: Node[];
  setScene: React.Dispatch<SetStateAction<Node | null>>;
}

export default function AllScenes({ scenes, setScene }: AllScenesProps) {
  if (scenes.length < 1) {
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
        <div className="p-1 hover:bg-secondary rounded-md cursor-pointer">
          <Plus size={18} />
        </div>
      </div>
      <div className="flex-1 min-h-0 pb-2">
        <ScrollArea className="h-full rounded-md">
          {scenes.map((s, index) => (
            <div key={index}>
              <div
                className="flex items-center gap-2 text-sm py-2 cursor-pointer hover:bg-secondary/50 px-2 rounded-md"
                onClick={() => setScene(s)}
              >
                <Image className="size-5" />
                {s.name}
              </div>
              {index < scenes.length - 1 && <Separator className="my-1" />}
            </div>
          ))}
        </ScrollArea>
      </div>
    </div>
  );
}
