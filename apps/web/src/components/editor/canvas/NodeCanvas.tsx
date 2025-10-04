import { Layer, Group } from "react-konva";
import { node } from "@/actions/node/schema";
import { NodeType } from "@prisma/client";
import { ResourceCanvas } from "./ResourceCanvas";
import { observer } from "mobx-react-lite";
import { useEditor } from "@/store/editor";
import { Resource } from "@/actions/resource/schema";
export const NodeCanvas = observer(({ node }: { node: node }) => {
  const editor = useEditor();
  return (
    <>
      {node.type !== NodeType.Node && node.resource && (
        <Group key={node.id}>
          {node.resource.map((r: Resource) => (
            <ResourceCanvas
              key={r.id}
              id={r.id}
              resourceClick={() => editor.setActiveNode(node)}
            />
          ))}
        </Group>
      )}
      {node?.children &&
        node.children.map((n: node) => (
          // <Layer key={n.id}>
          // <Group key={n.id}>
          <NodeCanvas node={n} key={n.id} />
          // </Group>
          // </Layer>
        ))}
    </>
  );
});
