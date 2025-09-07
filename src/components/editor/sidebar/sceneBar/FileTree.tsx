import { node } from "@/actions/node/schema";
import { File, Folder, Tree } from "@/components/magicui/file-tree";
import { useEditor } from "@/store/editor";
import { Node } from "@/types/node";
import { CircleIcon } from "lucide-react";
import { usePropertySideBar } from "../propertySideBar/PropertySideBar";

export default function FileTree({ scene }: { scene: node }) {
  const editor = useEditor();
  const { setOpen } = usePropertySideBar();
  if (!scene.children) {
    return (
      <File
        key={scene.id}
        value={scene.name}
        className="p-1"
        fileIcon={<CircleIcon className=" size-4" />}
        onClick={() => editor.setActiveNode(scene)}
      >
        <p>{scene.name}</p>
      </File>
    );
  }
  return (
    <Folder
      element={scene.name}
      value={scene.name}
      className="mb-1"
      key={scene.id}
      onClick={() => {
        editor.setActiveNode(scene);
        setOpen(true);
      }}
      isSelectable
    >
      {scene.children.map((n) => (
        <FileTree scene={n as node} key={n.id} />
      ))}
    </Folder>
  );
}
