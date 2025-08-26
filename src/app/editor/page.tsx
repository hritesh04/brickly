import SideBar from "@/components/editor/sidebar/SideBar";
import TopDock from "@/components/editor/TopDock";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

export default function EditorPage() {
  return (
    <div className=" h-[89.5vh] px-2">
      <SidebarProvider className="min-h-full">
        <SideBar />
        <SidebarInset>
          <SidebarTrigger className="mt-4" />
          <TopDock />
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}
