import AIChat from "./ai/AIChat";
import { SceneBar } from "./sceneBar/SceneBar";
export default function ActiveSideBar({
  activeTitle,
}: // project,
{
  activeTitle?: string;
  // project: ProjectWithRelation;
}) {
  switch (activeTitle) {
    case "Scenes":
      return <SceneBar />;
    case "Animations":
      return <div>ANIMATION</div>;
    case "AI":
      return <AIChat />;
    default:
      return <p className=" text-center">Select a Tab to view</p>;
  }
}
