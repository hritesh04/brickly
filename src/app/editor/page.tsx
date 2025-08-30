import DotBackGround from "@/components/editor/DotBackGround";
import {
  PropertySideBar,
  PropertySideBarProvider,
} from "@/components/editor/sidebar/PropertySideBar";
import SideBar from "@/components/editor/sidebar/SideBar";
import TopDock from "@/components/editor/TopDock";
import { Button } from "@/components/ui/button";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

export default function EditorPage() {
  return (
    <DotBackGround>
      <SidebarProvider className="min-h-full">
        <PropertySideBarProvider>
          <SideBar />
          <SidebarInset className=" bg-transparent overflow-hidden">
            <SidebarTrigger className="mt-4" />
            <TopDock />
            <PropertySideBar />
          </SidebarInset>
        </PropertySideBarProvider>
      </SidebarProvider>
    </DotBackGround>
  );
}
