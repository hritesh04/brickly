"use client";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import GameTab from "./GameTab";
import { ImagePlayIcon, Layers, LucideIcon } from "lucide-react";
import { useEffect, useState } from "react";
import ActiveSideBar from "./ActiveSideBar";
import { usePropertySideBar } from "./propertySideBar/PropertySideBar";
import { Separator } from "@/components/ui/separator";
import { ProjectWithRelation } from "@/actions/project/schema";
import { useProjectManager } from "@/store/project";
import { useEditor } from "@/store/editor";
import { node } from "@/actions/node/schema";
import { observer } from "mobx-react-lite";

const navMain = [
  {
    title: "Scenes",
    icon: Layers,
  },
  {
    title: "Animations",
    icon: ImagePlayIcon,
  },
  //   {
  // title: "Code Editor",
  // icon: Code2Icon,
  //   },
];

export const SideBar = observer(
  ({ project }: { project: ProjectWithRelation }) => {
    const [activeItem, setActiveItem] = useState<{
      title: string;
      icon: LucideIcon;
    } | null>(null);
    const { setOpen } = useSidebar();
    const projectManger = useProjectManager();
    const editor = useEditor();
    useEffect(() => {
      projectManger.setProject(project);
      editor.initScene(project.scene as node[]);
      if (!activeItem) setOpen(false);
    }, [project]);

    if (!project) {
      return <div>INVALID PROJECT</div>;
    }

    return (
      <Sidebar
        collapsible="icon"
        variant="floating"
        className="relative h-full overflow-hidden *:data-[sidebar=sidebar]:flex-row"
      >
        <Sidebar collapsible="none" className="w-fit border-r py-2">
          <SidebarHeader className="h-fit m-auto">
            <GameTab />
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupContent className="px-1.5 md:px-0">
                <SidebarMenu className=" gap-2">
                  {navMain.map((nav) => (
                    <SidebarMenuItem key={nav.title}>
                      <SidebarMenuButton
                        size="lg"
                        className="[&>svg]:size-6 group-data-[collapsible=icon]:[&>svg]:ml-1"
                        onClick={() => {
                          if (activeItem?.title === nav.title) {
                            setOpen(false);
                            // setPropertyBar(!PropertyBarOpen);
                            setActiveItem(null);
                          } else {
                            setOpen(true);
                            setActiveItem(nav);
                          }
                          // activeItem.title == nav.title
                          //   ? setOpen(false)
                          // toggleSidebar();
                        }}
                        isActive={activeItem?.title === nav.title}
                      >
                        <nav.icon />
                        {/* <span>{nav.title}</span> */}
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>
        <Sidebar collapsible="none" className="hidden flex-1 md:flex">
          <SidebarHeader>
            <div className=" flex items-center gap-3 px-2">
              {activeItem?.icon && <activeItem.icon className="size-4" />}
              <p className=" text-center font-medium">{activeItem?.title}</p>
            </div>
            <Separator />
          </SidebarHeader>
          <SidebarContent className=" h-full px-2">
            <ActiveSideBar activeTitle={activeItem?.title} />
          </SidebarContent>
        </Sidebar>
      </Sidebar>
    );
  }
);
