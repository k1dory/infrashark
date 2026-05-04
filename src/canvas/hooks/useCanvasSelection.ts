import { useCallback, useRef, useState } from "react";
import { useStore } from "../../store";
import { screenToCanvas, rectsIntersect, type Rect } from "../../utils/geometry";

export function useCanvasSelection() {
  const [selectionBox, setSelectionBox] = useState<Rect | null>(null);
  const startPoint = useRef<{ x: number; y: number } | null>(null);
  const isSelecting = useRef(false);
  const currentBox = useRef<Rect | null>(null);

  const onPointerDown = useCallback((e: React.PointerEvent) => {
    if (e.button !== 0) return;

    const target = e.target as HTMLElement;
    if (target !== e.currentTarget) return;

    startPoint.current = { x: e.clientX, y: e.clientY };
    isSelecting.current = false;
  }, []);

  const onPointerMove = useCallback((e: React.PointerEvent) => {
    if (!startPoint.current) return;

    const dx = e.clientX - startPoint.current.x;
    const dy = e.clientY - startPoint.current.y;

    if (!isSelecting.current && Math.abs(dx) + Math.abs(dy) < 5) return;

    if (!isSelecting.current) {
      isSelecting.current = true;
      e.currentTarget.setPointerCapture(e.pointerId);
    }

    const canvasRect = e.currentTarget.getBoundingClientRect();
    const x = Math.min(startPoint.current.x, e.clientX) - canvasRect.left;
    const y = Math.min(startPoint.current.y, e.clientY) - canvasRect.top;
    const width = Math.abs(dx);
    const height = Math.abs(dy);

    const box = { x, y, width, height };
    currentBox.current = box;
    setSelectionBox(box);
  }, []);

  const onPointerUp = useCallback((e: React.PointerEvent) => {
    if (!startPoint.current) return;

    if (isSelecting.current && currentBox.current) {
      e.currentTarget.releasePointerCapture(e.pointerId);

      const box = currentBox.current;
      const { zoom, pan, components, select } = useStore.getState();

      const topLeft = screenToCanvas(
        { x: box.x, y: box.y },
        pan,
        zoom,
      );
      const bottomRight = screenToCanvas(
        {
          x: box.x + box.width,
          y: box.y + box.height,
        },
        pan,
        zoom,
      );

      const selRect: Rect = {
        x: topLeft.x,
        y: topLeft.y,
        width: bottomRight.x - topLeft.x,
        height: bottomRight.y - topLeft.y,
      };

      const ids = components
        .filter((comp) =>
          rectsIntersect(selRect, {
            x: comp.position.x,
            y: comp.position.y,
            width: comp.size.width,
            height: comp.size.height,
          }),
        )
        .map((comp) => comp.id);

      select(ids);
    }

    startPoint.current = null;
    isSelecting.current = false;
    currentBox.current = null;
    setSelectionBox(null);
  }, []);

  return {
    selectionBox,
    selectionHandlers: {
      onPointerDown,
      onPointerMove,
      onPointerUp,
    },
  };
}
