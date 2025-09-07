"use client";
import { useEditor } from "@/store/editor";
import { observer } from "mobx-react-lite";
import { createContext, useContext, useMemo, useState } from "react";
import { NodeTypeProperty } from "./properties/NodeTypeProperty";
import { NodeType } from "@prisma/client";
import Node2DProperty from "./Node2DProperty";
import { Sprite2DProperty } from "./properties/Sprite2DProperty";

type PropertySideBarProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

const SidebarContext = createContext<PropertySideBarProps | null>(null);

function usePropertySideBar() {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error(
      "usePropertySideBar must be used within a SidebarProvider."
    );
  }
  return context;
}

function PropertySideBarProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <SidebarContext.Provider value={{ open, setOpen }}>
      {children}
    </SidebarContext.Provider>
  );
}

const PropertySideBar = observer(() => {
  const { open } = usePropertySideBar();
  const editor = useEditor();
  const activeNode = editor.activeNode;

  if (!activeNode) {
    return (
      <div
        className={`h-full w-1/6 bg-white absolute right-0 rounded-lg border shadow-sm p-4 z-50 mt-2
        ${!open && "hidden"}
        `}
      >
        Please select a Node to see its Property
      </div>
    );
  }

  return (
    <div
      className={`h-full w-1/6 bg-white absolute right-0 rounded-lg border shadow-sm p-4 z-50 mt-2
        ${!open && "hidden"}
        `}
    >
      <NodeTypeProperty />
      {activeNode.type === NodeType.Sprite2D && <Sprite2DProperty />}
      <div className=" grid gap-2 mt-4">
        {activeNode.type !== NodeType.Node && <Node2DProperty />}
      </div>
    </div>
  );
});

export { PropertySideBar, PropertySideBarProvider, usePropertySideBar };
