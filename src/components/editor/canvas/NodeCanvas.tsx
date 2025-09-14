import { Layer, Group } from "react-konva";
import { node } from "@/actions/node/schema";
import { NodeType } from "@prisma/client";
import { ResourceCanvas } from "./ResourceCanvas";
import { observer } from "mobx-react-lite";
import { useEditor } from "@/store/editor";
export const NodeCanvas = observer(({ node }: { node: node }) => {
  const editor = useEditor();
  return (
    <>
      {node.type !== NodeType.Node && node.resource && (
        <Group key={node.id}>
          {node.resource.map((r) => (
            <ResourceCanvas
              key={r.id}
              resource={r}
              resourceClick={() => editor.setActiveNode(node)}
            />
          ))}
        </Group>
      )}
      {node?.children &&
        node.children.map((n) => (
          // <Layer key={n.id}>
          <Group key={n.id}>
            <NodeCanvas node={n} key={n.id} />
          </Group>
          // </Layer>
        ))}
    </>
  );
});
