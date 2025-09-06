import { useState } from "react";
import ActiveScene from "./ActiveScene";
import AllScenes from "./AllScene";
import { Node, NodeType } from "@/types/node";
import { Separator } from "@/components/ui/separator";
import { node } from "@/actions/node/schema";

// const scenes: Node[] = [
//   {
//     name: "Scene",
//     type: NodeType.Node,
//     children: [
//       {
//         name: "Node",
//         type: NodeType.Node2D,
//         children: [
//           {
//             name: "Grand Node",
//             type: NodeType.Sprite2D,
//           },
//         ],
//       },
//       {
//         name: "Node 2",
//         type: NodeType.Node2D,
//       },
//     ],
//   },
//   {
//     name: "Scene 2",
//     type: NodeType.Node,
//     children: [
//       {
//         name: "Node 2",
//         type: NodeType.Node2D,
//       },
//     ],
//   },
//   {
//     name: "Scene 3",
//     type: NodeType.Node,
//     children: [
//       {
//         name: "Node 3",
//         type: NodeType.Node2D,
//       },
//     ],
//   },
// ];

export default function SceneBar({ scenes }: { scenes: node[] | null }) {
  const [activeScene, setActiveScene] = useState<node | null>(null);
  // if (!scenes) {
  //   return <p>no scenes</p>;
  // }
  return (
    <div className="h-full w-full flex flex-col gap-2 overflow-hidden">
      <ActiveScene scene={activeScene} />
      <Separator />
      <AllScenes scenes={scenes} setScene={setActiveScene} />
    </div>
  );
}
