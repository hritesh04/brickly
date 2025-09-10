import { node } from "@/actions/node/schema";
import { File, Folder } from "@/components/magicui/file-tree";
import { useEditor } from "@/store/editor";
import { CircleIcon } from "lucide-react";
import { usePropertySideBar } from "../propertySideBar/PropertySideBar";
import { observer } from "mobx-react-lite";

export const FileTree = observer(({ scene }: { scene: node }) => {
  const editor = useEditor();
  const { setOpen } = usePropertySideBar();
  if (!scene.children) {
    return (
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
    );
  }
  return (
    <Folder
      element={scene.name}
      value={String(scene.id)}
      className="mb-1"
      key={scene.id}
      onClick={(e) => {
        // editor.setActiveScene(scene);
        editor.setActiveNode(scene);
        setOpen(true);
        e.stopPropagation();
      }}
      isSelect={editor.activeNode?.id == scene.id}
    >
      {scene.children.map((n) => (
        <FileTree scene={n as node} key={n.id} />
      ))}
    </Folder>
  );
});
