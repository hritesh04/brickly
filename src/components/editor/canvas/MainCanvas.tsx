"use client";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { NodeCanvas } from "./NodeCanvas";
import { Layer, Stage, Text } from "react-konva";
import Konva from "konva";
import { useEditor } from "@/store/editor";
import { observer } from "mobx-react-lite";
import { useProjectManager } from "@/store/project";
import { useResourceStore } from "@/store/resource";

Konva.pixelRatio = 5;

export const MainCanvas = observer(() => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLDivElement | null>(null);
  const dragRef = useRef(false);
  const positionRef = useRef({ x: 0, y: 0 });
  const dragStartRef = useRef({ x: 0, y: 0 });
  const scaleRef = useRef(1);
  const project = useProjectManager();
  const [dimensions, setDimensions] = useState({ width: 400, height: 300 });
  const [isInitialized, setIsInitialized] = useState(false);
  const editor = useEditor();
  const resStore = useResourceStore();
  const activeNode = editor.activeScene;

  useEffect(() => {
    if (project.project) {
      setDimensions({
        height: project.project.height,
        width: project.project.width,
      });
    }
  }, []);

  const updateCanvasTransform = useCallback(() => {
    if (canvasRef.current) {
      canvasRef.current.style.transform = `translate(${positionRef.current.x}px, ${positionRef.current.y}px) scale(${scaleRef.current})`;
    }
  }, []);

  const centerCanvas = useCallback(() => {
    if (containerRef.current && canvasRef.current) {
      const containerRect = containerRef.current.getBoundingClientRect();
      const centerX = (containerRect.width - dimensions.width) / 2;
      const centerY = (containerRect.height - dimensions.height) / 2;

      positionRef.current = { x: centerX, y: centerY };
      updateCanvasTransform();
    }
  }, [dimensions, updateCanvasTransform]);

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
    (e: React.MouseEvent) => {
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
    (e: React.WheelEvent) => {
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

  return (
    <div
      className="h-full w-full relative"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      <div
        ref={canvasRef}
        style={{
          position: "absolute",
          transform: `translate(${positionRef.current.x}px, ${positionRef.current.y}px) scale(${scaleRef.current})`,
          transformOrigin: "0 0",
          cursor: "grab",
          userSelect: "none",
        }}
        className="bg-white border border-gray-300 shadow-lg"
        onMouseDown={handleMouseDown}
        onWheel={handleWheel}
      >
        <Stage
          width={dimensions.width}
          height={dimensions.height}
          className="z-10"
          onClick={() => {
            // resStore.clearActive();
            editor.setActiveNode(activeNode!);
          }}
        >
          {activeNode && (
            <Layer key={1}>
              <NodeCanvas node={activeNode} />
            </Layer>
          )}
          {!activeNode && (
            <Layer key={1}>
              <Text
                text="Please select a node to view its Preview"
                x={dimensions.width / 2 - 100}
                y={dimensions.height / 2 - 50}
                width={200}
                fontSize={20}
                fontFamily="Calibri"
                fill="#555"
                align="center"
              />
            </Layer>
          )}
        </Stage>
      </div>
    </div>
  );
});
