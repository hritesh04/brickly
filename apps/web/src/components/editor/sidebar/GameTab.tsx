import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

export default function GameTab() {
  return (
    <SidebarMenu className="h-fit w-fit">
      <SidebarMenuItem>
        <SidebarMenuButton
          size="lg"
          className="[&>svg]:size-6 group-data-[collapsible=icon]:[&>svg]:ml-1 p-0"
        >
          <img
            src="/icon_maskot.png"
            className="h-full w-full object-contain"
          />
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
