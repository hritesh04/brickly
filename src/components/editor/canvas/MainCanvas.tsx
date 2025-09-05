"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import LayerCanvas from "./layerCanvas";
import { Stage } from "react-konva";
import Konva from "konva";

Konva.pixelRatio=5

export default function MainCanvas() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLDivElement | null>(null);
  const dragRef = useRef(false);
  const positionRef = useRef({ x: 0, y: 0 });
  const dragStartRef = useRef({ x: 0, y: 0 });
  const scaleRef = useRef(1);
  const [dimensions, setDimensions] = useState({ width: 400, height: 300 });
  const [isInitialized, setIsInitialized] = useState(false);

  const updateCanvasTransform = useCallback(() => {
    if (canvasRef.current) {
      canvasRef.current.style.transform = `translate(${positionRef.current.x}px, ${positionRef.current.y}px) scale(${scaleRef.current})`;
    }
  }, []);

  // Center the canvas on initial render
  const centerCanvas = useCallback(() => {
    if (containerRef.current && canvasRef.current) {
      const containerRect = containerRef.current.getBoundingClientRect();
      const centerX = (containerRect.width - dimensions.width) / 2;
      const centerY = (containerRect.height - dimensions.height) / 2;
      
      positionRef.current = { x: centerX, y: centerY };
      updateCanvasTransform();
    }
  }, [dimensions, updateCanvasTransform]);

  // Initialize canvas position and dimensions
  useEffect(() => {
    if (containerRef.current && !isInitialized) {
      centerCanvas();
      setIsInitialized(true);
    }
  }, [centerCanvas, isInitialized]);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    dragRef.current = true;
    dragStartRef.current = {
      x: e.clientX - positionRef.current.x,
      y: e.clientY - positionRef.current.y,
    };

    if (canvasRef.current) {
      canvasRef.current.style.cursor = "grabbing";
    }
    e.preventDefault();
  }, []);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!dragRef.current || !canvasRef.current) return;

      const newX = e.clientX - dragStartRef.current.x;
      const newY = e.clientY - dragStartRef.current.y;

      if (containerRef.current) {
        const containerRect = containerRef.current.getBoundingClientRect();
        const scaledWidth = dimensions.width * scaleRef.current;
        const scaledHeight = dimensions.height * scaleRef.current;

        const minX = -scaledWidth + 100;
        const maxX = containerRect.width - 100;
        const minY = -scaledHeight + 100;
        const maxY = containerRect.height - 100;

        positionRef.current = {
          x: Math.max(minX, Math.min(maxX, newX)),
          y: Math.max(minY, Math.min(maxY, newY)),
        };
      } else {
        positionRef.current = { x: newX, y: newY };
      }

      updateCanvasTransform();
    },
    [dimensions, updateCanvasTransform]
  );

  const handleMouseUp = useCallback(() => {
    dragRef.current = false;
    if (canvasRef.current) {
      canvasRef.current.style.cursor = "grab";
    }
  }, []);

  const handleWheel = useCallback(
    (e: WheelEvent) => {
      e.preventDefault();

      if (!canvasRef.current) return;

      const rect = canvasRef.current.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      const zoomFactor = e.deltaY > 0 ? 0.9 : 1.1;
      const newScale = Math.max(
        0.1,
        Math.min(5, scaleRef.current * zoomFactor)
      );

      const scaleDiff = newScale - scaleRef.current;
      const newX =
        positionRef.current.x - (mouseX * scaleDiff) / scaleRef.current;
      const newY =
        positionRef.current.y - (mouseY * scaleDiff) / scaleRef.current;

      scaleRef.current = newScale;
      positionRef.current = { x: newX, y: newY };

      updateCanvasTransform();
    },
    [updateCanvasTransform]
  );

  useEffect(() => {
    const handleGlobalMouseMove = (e: MouseEvent) => handleMouseMove(e);
    const handleGlobalMouseUp = () => handleMouseUp();

    document.addEventListener("mousemove", handleGlobalMouseMove);
    document.addEventListener("mouseup", handleGlobalMouseUp);

    return () => {
      document.removeEventListener("mousemove", handleGlobalMouseMove);
      document.removeEventListener("mouseup", handleGlobalMouseUp);
    };
  }, [handleMouseMove, handleMouseUp]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.addEventListener("wheel", handleWheel, { passive: false });
      return () => {
        canvas.removeEventListener("wheel", handleWheel);
      };
    }
  }, [handleWheel]);

  return (
    <div className="h-full w-full relative" ref={containerRef}>
      <div
        ref={canvasRef}
        style={{
          position: "absolute",
          // width: `${dimensions.width}px`,
          // height: `${dimensions.height}px`,
          transform: `translate(${positionRef.current.x}px, ${positionRef.current.y}px) scale(${scaleRef.current})`,
          transformOrigin: "0 0",
          cursor: "grab",
          userSelect: "none",
        }}
        className="bg-white border border-gray-300 shadow-lg"
        onMouseDown={handleMouseDown}
      >
   <Stage width={dimensions.width} height={dimensions.height}>
        <LayerCanvas />
   </Stage>
      </div>
    </div>
  );
}
