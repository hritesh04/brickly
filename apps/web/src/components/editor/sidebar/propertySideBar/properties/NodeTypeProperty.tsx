import { updateNode } from "@/actions/node";
import { NodeType } from "@brickly/db";
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
    <div className="space-y-3">
      <div className="flex items-center gap-3">
        <span className="text-sm font-medium text-gray-700">Node Type:</span>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              onClick={(e) => e.stopPropagation()}
              onMouseDown={(e) => e.stopPropagation()}
              className="text-sm"
            >
              {activeNode.type}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            {Object.values(NodeType).map((n) => (
              <DropdownMenuCheckboxItem
                key={n}
                checked={activeNode.type === n}
                onCheckedChange={() => execute({ id: activeNode.id, type: n })}
                className="text-sm"
              >
                {n}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
});
