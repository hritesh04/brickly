import SceneBar from "../SceneBar";

interface ActiveSideBarProps {
  title: string;
}

export default function ActiveSideBar({
  activeTitle,
}: {
  activeTitle: string;
}) {
  switch (activeTitle) {
    case "Scenes":
      return <SceneBar />;
  }
}
