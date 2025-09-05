import { useEffect, useRef, useCallback } from "react";
import Konva from "konva";
import {Stage,Text,Layer,Circle} from "react-konva"
interface PreviewCanvasProps {
  container: React.RefObject<HTMLDivElement | null>;
}

export default function LayerCanvas(
  // props: PreviewCanvasProps
) {
  return (
    <Layer>
    <Text text="Hello" stroke="black" strokeWidth={1} fontSize={20}
          fontFamily="Calibri" 
          x={0} y={0}
          />
    </Layer>
  );
}
