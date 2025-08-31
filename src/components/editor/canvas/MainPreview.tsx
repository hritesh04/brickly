"use client";
import { useRef } from "react";
import PreviewCanvas from "./PreviewCanvas";

export default function MainPreview() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  return (
    <div className="h-full w-full relative" ref={containerRef}>
      <PreviewCanvas container={containerRef} />
    </div>
  );
}
