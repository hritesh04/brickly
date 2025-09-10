import { ActiveScene } from "./ActiveScene";
import { AllScenes } from "./AllScene";
import { Separator } from "@/components/ui/separator";
import React from "react";

export const SceneBar = () => {
  return (
    <div className="h-full w-full flex flex-col gap-2 overflow-hidden">
      <ActiveScene />
      <Separator />
      <AllScenes />
    </div>
  );
};
