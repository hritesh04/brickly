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
  }
}
