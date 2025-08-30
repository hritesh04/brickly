"use client";
import { createContext, useContext, useMemo, useState } from "react";

type PropertySideBarProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

const SidebarContext = createContext<PropertySideBarProps | null>(null);

function usePropertySideBar() {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error(
      "usePropertySideBar must be used within a SidebarProvider."
    );
  }
  return context;
}

function PropertySideBarProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <SidebarContext.Provider value={{ open, setOpen }}>
      {children}
    </SidebarContext.Provider>
  );
}

function PropertySideBar() {
  const { open } = usePropertySideBar();

  return (
    <div
      className={`h-full w-1/6 bg-white absolute right-0 rounded-lg border shadow-sm p-4 mt-2
        ${!open && "hidden"}
        `}
    >
      Hello
    </div>
  );
}

export { PropertySideBar, PropertySideBarProvider, usePropertySideBar };
