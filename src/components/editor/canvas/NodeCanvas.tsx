import { Layer, Group } from "react-konva";
import { node } from "@/actions/node/schema";
import { NodeType } from "@prisma/client";
import { ResourceCanvas } from "./ResourceCanvas";
export const NodeCanvas = ({ node }: { node: node }) => {
  return (
    <>
      {node.type !== NodeType.Node && node.resource && (
        <Layer key={node.id}>
          {node.resource.map((r) => (
            <ResourceCanvas key={r.id} resource={r} />
          ))}
        </Layer>
      )}
      {node?.children &&
        node.children.map((n) => (
          <Layer key={n.id}>
            <Group>
              <NodeCanvas node={n} key={n.id} />
            </Group>
          </Layer>
        ))}
    </>
  );
};
