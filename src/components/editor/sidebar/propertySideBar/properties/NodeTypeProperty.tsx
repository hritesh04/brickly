import { updateNode } from "@/actions/node";
import { nodeType } from "@/actions/node/schema";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAction } from "@/hooks/useAction";
import { useEditor } from "@/store/editor";
import { observer } from "mobx-react-lite";
// import { nodeType } from "@/actions/node/schema";
export const NodeTypeProperty = observer(() => {
  const editor = useEditor();
  const { execute } = useAction(updateNode, {
    onSuccess(data) {
      editor.updateNode(data);
    },
  });
  const activeNode = editor.activeNode;
  if (!activeNode) {
    return <p>node not active</p>;
  }
  return (
    <div className="flex gap-2 items-center">
      <span>Node Type : </span>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            onClick={(e) => e.stopPropagation()}
            onMouseDown={(e) => e.stopPropagation()}
          >
            {activeNode.type}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          {nodeType.options.map((n) => (
            <DropdownMenuCheckboxItem
              key={n}
              checked={activeNode.type == n}
              onCheckedChange={() => execute({ id: activeNode.id, type: n })}
            >
              {n}
            </DropdownMenuCheckboxItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
});
