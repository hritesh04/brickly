import { useEffect, useState } from "react";
import { ActiveScene } from "./ActiveScene";
import { AllScenes } from "./AllScene";
import { Node, NodeType } from "@/types/node";
import { Separator } from "@/components/ui/separator";
import { node } from "@/actions/node/schema";
import { useEditor } from "@/store/editor";
import React from "react";
import { observer } from "mobx-react-lite";

export const SceneBar = () => {
  return (
    <div className="h-full w-full flex flex-col gap-2 overflow-hidden">
      <ActiveScene />
      <Separator />
      <AllScenes />
    </div>
  );
};
