import { memo, useCallback, useRef, type ReactNode } from "react";
import { useStore } from "../store";
import { Grid } from "./Grid";
import { CanvasViewport } from "./CanvasViewport";
import { SelectionBox } from "./SelectionBox";
import { useCanvasZoom } from "./hooks/useCanvasZoom";
import { useCanvasPan } from "./hooks/useCanvasPan";
import { useCanvasSelection } from "./hooks/useCanvasSelection";
import styles from "../styles/canvas.module.css";

interface Props {
  children: ReactNode;
}

export const Canvas = memo(function Canvas({ children }: Props) {
  const canvasRef = useRef<HTMLDivElement>(null);
  const zoom = useStore((s) => s.zoom);
  const drawingConnection = useStore((s) => s.drawingConnection);

  useCanvasZoom(canvasRef);
  const { isPanning, panHandlers } = useCanvasPan();
  const { selectionBox, selectionHandlers } = useCanvasSelection();

  const handlePointerDown = useCallback(
    (e: React.PointerEvent) => {
      const captured = panHandlers.onPointerDown(e);
      if (captured) return;
      selectionHandlers.onPointerDown(e);
    },
    [panHandlers, selectionHandlers],
  );

  const handlePointerMove = useCallback(
    (e: React.PointerEvent) => {
      panHandlers.onPointerMove(e);
      selectionHandlers.onPointerMove(e);
    },
    [panHandlers, selectionHandlers],
  );

  const handlePointerUp = useCallback(
    (e: React.PointerEvent) => {
      panHandlers.onPointerUp(e);
      selectionHandlers.onPointerUp(e);
    },
    [panHandlers, selectionHandlers],
  );

  const handleClick = useCallback(
    (e: React.MouseEvent) => {
      if (e.target === e.currentTarget) {
        useStore.getState().clearSelection();
      }
    },
    [],
  );

  const handleContextMenu = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      useStore.getState().showContextMenu({
        x: e.clientX,
        y: e.clientY,
        targetType: "canvas",
      });
    },
    [],
  );

  let className = styles.canvasRoot;
  if (isPanning) className += ` ${styles.panning}`;
  if (drawingConnection) className += ` ${styles.drawing}`;

  return (
    <div
      ref={canvasRef}
      className={className}
      tabIndex={0}
      data-canvas-root
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onClick={handleClick}
      onContextMenu={handleContextMenu}
      onKeyDown={panHandlers.onKeyDown}
      onKeyUp={panHandlers.onKeyUp}
    >
      <Grid />
      <CanvasViewport>{children}</CanvasViewport>
      <SelectionBox rect={selectionBox} />
      <div className={styles.zoomIndicator}>{Math.round(zoom * 100)}%</div>
    </div>
  );
});
