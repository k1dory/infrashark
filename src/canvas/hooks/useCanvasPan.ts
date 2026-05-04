import { useCallback, useRef, useState } from "react";
import { useStore } from "../../store";

export function useCanvasPan() {
  const [isPanning, setIsPanning] = useState(false);
  const lastPointer = useRef<{ x: number; y: number } | null>(null);
  const spaceHeld = useRef(false);

  const onKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.code === "Space" && !e.repeat) {
      spaceHeld.current = true;
    }
  }, []);

  const onKeyUp = useCallback((e: React.KeyboardEvent) => {
    if (e.code === "Space") {
      spaceHeld.current = false;
    }
  }, []);

  const onPointerDown = useCallback((e: React.PointerEvent) => {
    const isMiddle = e.button === 1;
    const isSpaceLeft = e.button === 0 && spaceHeld.current;

    if (!isMiddle && !isSpaceLeft) return false;

    e.preventDefault();
    e.currentTarget.setPointerCapture(e.pointerId);
    lastPointer.current = { x: e.clientX, y: e.clientY };
    setIsPanning(true);
    return true;
  }, []);

  const onPointerMove = useCallback((e: React.PointerEvent) => {
    if (!isPanning || !lastPointer.current) return;

    const dx = e.clientX - lastPointer.current.x;
    const dy = e.clientY - lastPointer.current.y;
    lastPointer.current = { x: e.clientX, y: e.clientY };

    useStore.getState().panBy({ x: dx, y: dy });
  }, [isPanning]);

  const onPointerUp = useCallback((e: React.PointerEvent) => {
    if (!isPanning) return;

    e.currentTarget.releasePointerCapture(e.pointerId);
    lastPointer.current = null;
    setIsPanning(false);
  }, [isPanning]);

  return {
    isPanning,
    panHandlers: {
      onPointerDown,
      onPointerMove,
      onPointerUp,
      onKeyDown,
      onKeyUp,
    },
  };
}
