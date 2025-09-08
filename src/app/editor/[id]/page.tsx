import DotBackGround from "@/components/editor/DotBackGround";
import { MainCanvas } from "@/components/editor/canvas/MainCanvas";
import {
  PropertySideBar,
  PropertySideBarProvider,
} from "@/components/editor/sidebar/propertySideBar/PropertySideBar";
import { SideBar } from "@/components/editor/sidebar/SideBar";
import TopDock from "@/components/editor/TopDock";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import SideBarTrigger from "@/components/editor/sidebar/SideBarTrigger";
import { getProject } from "@/actions/project";

export default async function EditorPage({ params }: { params: { id: string } }) {
  const projectId = Number(params.id);
  if (!Number.isFinite(projectId)) {
    return <div>INVALID ID</div>;
  }

  const { data, error } = await getProject(projectId);

  if (error) {
    return <div>INVALID ID</div>;
  }

  return (
    <DotBackGround>
      <SidebarProvider className="min-h-full absolute">
        <PropertySideBarProvider>
          {data && <SideBar project={data} />}
          <SideBarTrigger className="mt-4 z-50" />
          <SidebarInset className=" bg-transparent overflow-hidden absolute h-full">
            <TopDock />
            <PropertySideBar />
            <MainCanvas />
          </SidebarInset>
        </PropertySideBarProvider>
      </SidebarProvider>
    </DotBackGround>
  );
}
