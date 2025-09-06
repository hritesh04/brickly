import z from "zod";
import SceneBar from "../sceneBar/SceneBar";
import { projectWithRelation } from "@/actions/project/schema";
export default function ActiveSideBar({
  activeTitle,
  project,
}: {
  activeTitle?: string;
  project: z.infer<typeof projectWithRelation>;
}) {
  switch (activeTitle) {
    case "Scenes":
      return <SceneBar scenes={project.scene} />;
  }
}
