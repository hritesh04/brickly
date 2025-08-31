import DotBackGround from "@/components/editor/DotBackGround";
import MainPreview from "@/components/editor/canvas/MainPreview";
import {
  PropertySideBar,
  PropertySideBarProvider,
} from "@/components/editor/sidebar/PropertySideBar";
import SideBar from "@/components/editor/sidebar/SideBar";
import TopDock from "@/components/editor/TopDock";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import SideBarTrigger from "@/components/editor/sidebar/SideBarTrigger";

export default function EditorPage() {
  return (
    <DotBackGround>
      <SidebarProvider className="min-h-full absolute">
        <PropertySideBarProvider>
          <SideBar />
          <SideBarTrigger className="mt-4 z-50" />
          <SidebarInset className=" bg-transparent overflow-hidden absolute h-full">
            <TopDock />
            <PropertySideBar />
            <MainPreview />
          </SidebarInset>
        </PropertySideBarProvider>
      </SidebarProvider>
    </DotBackGround>
  );
}
