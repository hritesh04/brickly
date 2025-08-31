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
import { Code2Icon, ImagePlayIcon, Layers, LucideIcon } from "lucide-react";
import { useState } from "react";
import ActiveSideBar from "./ActiveSideBar";
import { usePropertySideBar } from "./PropertySideBar";

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

export default function SideBar() {
  const [activeItem, setActiveItem] = useState<{
    title: string;
    icon: LucideIcon;
  } | null>(navMain[0]);
  const { toggleSidebar, setOpen } = useSidebar();
  const { setOpen: setPropertyBar, open: PropertyBarOpen } =
    usePropertySideBar();
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
                          setPropertyBar(!PropertyBarOpen);
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
          <p className=" text-center">{activeItem?.title}</p>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupContent>
              <ActiveSideBar activeTitle={activeItem?.title} />
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    </Sidebar>
  );
}
