import { SceneBar } from "./sceneBar/SceneBar";
import AiChat from "./AiChat";
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
    case "AI Assistant":
      return <AiChat />;
  }
}
