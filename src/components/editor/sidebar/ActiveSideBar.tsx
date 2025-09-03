import SceneBar from "../sceneBar/SceneBar";

export default function ActiveSideBar({
  activeTitle,
}: {
  activeTitle?: string;
}) {
  switch (activeTitle) {
    case "Scenes":
      return <SceneBar />;
  }
}
