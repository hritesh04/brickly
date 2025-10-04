"use client";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { PanelRightIcon } from "lucide-react";
import { useRightSidebar } from "./RightSidebar";

export default function RightSidebarTrigger({ className }: { className?: string }) {
  const { open, setOpen } = useRightSidebar();

  return (
    <Button
      variant="ghost"
      size="icon"
      className={cn("size-7", className)}
      onClick={() => setOpen(!open)}
    >
      <PanelRightIcon />
      <span className="sr-only">Toggle Right Sidebar</span>
    </Button>
  );
}
