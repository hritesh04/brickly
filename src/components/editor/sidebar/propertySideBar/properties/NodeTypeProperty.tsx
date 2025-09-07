import { nodeType } from "@/actions/node/schema";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useEditor } from "@/store/editor";
import { observer } from "mobx-react-lite";
// import { nodeType } from "@/actions/node/schema";
export const NodeTypeProperty = observer(() => {
  const editor = useEditor();
  const activeNode = editor.activeNode;
  if (!activeNode) {
    return <p>node not active</p>;
  }
  return (
    <div className="flex gap-2 items-center">
      <span>Node Type : </span>
      <DropdownMenu
        onOpenChange={(open) => console.log("Dropdown opened:", open)}
      >
        <DropdownMenuTrigger asChild>
          <Button variant="outline">{activeNode.type}</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          {nodeType.options.map((n) => (
            <DropdownMenuCheckboxItem
              key={n}
              checked={activeNode.type == n}
              onCheckedChange={() => (activeNode.type = n)}
            >
              {n}
            </DropdownMenuCheckboxItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
});
