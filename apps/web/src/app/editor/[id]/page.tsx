import DotBackGround from "@/components/editor/DotBackGround";
import { MainCanvas } from "@/components/editor/canvas/MainCanvas";
import {
  RightSidebar,
  RightSidebarProvider,
} from "@/components/editor/sidebar/RightSidebar";
import { SideBar } from "@/components/editor/sidebar/SideBar";
import TopDock from "@/components/editor/TopDock";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import SideBarTrigger from "@/components/editor/sidebar/SideBarTrigger";
import RightSidebarTrigger from "@/components/editor/sidebar/RightSidebarTrigger";
import { getProject } from "@/actions/project";
import { Suspense } from "react";
import SpinnerLoading from "@/components/editor/loading";

export default function EditorPage({ params }: { params: { id: string } }) {
  const projectId = Number(params.id);

  if (!Number.isFinite(projectId)) {
    return <div>INVALID ID</div>;
  }

  return (
    <DotBackGround>
      <SidebarProvider className="min-h-[92.25vh] absolute" defaultOpen={false}>
        <RightSidebarProvider>
          <Suspense fallback={<SpinnerLoading />}>
            <Main id={projectId} />
          </Suspense>
        </RightSidebarProvider>
      </SidebarProvider>
    </DotBackGround>
  );
}

async function Main({ id }: { id: number }) {
  const { data, error } = await getProject(id);
  if (error) {
    return <div>INVALID ID</div>;
  }
  return (
    <>
      {data && (
        // <div className=" h-full overflow-clip">
        <SideBar project={data} />
        // </div>
      )}
      <SideBarTrigger className="mt-4 z-50" />
      <SidebarInset className=" bg-transparent overflow-hidden absolute h-full">
        <TopDock />
        <RightSidebarTrigger className="absolute top-4 right-4 z-50" />
        <RightSidebar />
        <MainCanvas />
      </SidebarInset>
    </>
  );
}
