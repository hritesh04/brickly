import { File, Folder, Tree } from "@/components/magicui/file-tree";
import { Node } from "@/types/node";
import { CircleIcon } from "lucide-react";

export default function FileTree({ scene }: { scene: Node }) {
  if (!scene.children) {
    return (
      <File
        value={scene.name}
        className="p-1"
        fileIcon={<CircleIcon className=" size-4" />}
      >
        <p>{scene.name}</p>
      </File>
    );
  }
  return (
    <Folder element={scene.name} value={scene.name} className="mb-1">
      {scene.children.map((n) => (
        <FileTree scene={n} />
      ))}
    </Folder>
  );
}
