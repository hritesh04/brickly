"use client";
import { useEditor } from "@/store/editor";
import { observer } from "mobx-react-lite";
import { createContext, useContext, useState } from "react";
import { NodeTypeProperty } from "./properties/NodeTypeProperty";
import { NodeType } from "@prisma/client";
import Node2DProperty from "./Node2DProperty";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import ScriptSideBar from "./ScriptSideBar";
// import { Sprite2DProperty } from "./properties/Sprite2DProperty";

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
        className={`h-full w-1/6 bg-white absolute right-0 rounded-lg border shadow-sm p-6 z-50 mt-2
        ${!open && "hidden"}
        `}
      >
        <p className="text-sm text-gray-600">Please select a Node to see its Property</p>
      </div>
    );
  }

  return (
    <div
      className={`h-full w-1/6 bg-white absolute right-0 rounded-lg border shadow-sm z-50 mt-2
        ${!open && "hidden"}
        `}
    >
      <Tabs defaultValue="properties" className="h-full flex flex-col">
        <div className="p-4 pb-0">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="properties">Properties</TabsTrigger>
            <TabsTrigger value="script">Script</TabsTrigger>
          </TabsList>
        </div>
        
        <TabsContent value="properties" className="flex-1 overflow-hidden">
          <ScrollArea className="h-full">
            <div className="p-6 space-y-6">
              <NodeTypeProperty />
              {activeNode.type !== NodeType.Node && <Node2DProperty />}
            </div>
          </ScrollArea>
        </TabsContent>
      </Tabs>
    </div>
  );
});

export { PropertySideBar, PropertySideBarProvider, usePropertySideBar };
