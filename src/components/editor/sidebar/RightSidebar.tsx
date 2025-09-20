"use client";
import { useEditor } from "@/store/editor";
import { observer } from "mobx-react-lite";
import { createContext, useContext, useState } from "react";
import { NodeTypeProperty } from "./propertySideBar/properties/NodeTypeProperty";
import { NodeType } from "@prisma/client";
import Node2DProperty from "./propertySideBar/Node2DProperty";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import ScriptSideBar from "./scriptSideBar/ScriptSideBar";

type RightSidebarProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

const SidebarContext = createContext<RightSidebarProps | null>(null);

function useRightSidebar() {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error(
      "useRightSidebar must be used within a RightSidebarProvider."
    );
  }
  return context;
}

function RightSidebarProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <SidebarContext.Provider value={{ open, setOpen }}>
      {children}
    </SidebarContext.Provider>
  );
}

const RightSidebar = observer(() => {
  const { open } = useRightSidebar();
  const editor = useEditor();
  const activeNode = editor.activeNode;
  const [activeTab, setActiveTab] = useState("properties");

  if (!activeNode) {
    return (
      <div
        className={`h-full w-1/6 bg-white absolute right-0 rounded-lg border shadow-sm p-6 z-50 mt-2
        ${!open && "hidden"}
        `}
      >
        <p className="text-sm text-gray-600">Please select a Node to see its Properties and Script</p>
      </div>
    );
  }

  // Dynamic width based on active tab
  const sidebarWidth = activeTab === "script" 
    ? "w-1/3 min-w-[400px] max-w-[500px]" 
    : "w-1/6";

  return (
    <div
      className={`h-full ${sidebarWidth} bg-white absolute right-0 rounded-lg border shadow-sm z-50 mt-2 transition-all duration-300
        ${!open && "hidden"}
        `}
    >
      <Tabs 
        defaultValue="properties" 
        value={activeTab}
        onValueChange={setActiveTab}
        className="h-full flex flex-col"
      >
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
        
        <TabsContent value="script" className="flex-1 overflow-hidden">
          <ScriptSideBar />
        </TabsContent>
      </Tabs>
    </div>
  );
});

export { RightSidebar, RightSidebarProvider, useRightSidebar };
