import { useCallback, useEffect, type RefObject } from "react";
import { useStore } from "../../store";

export function useCanvasZoom(canvasRef: RefObject<HTMLDivElement | null>) {
  const handleWheel = useCallback((e: WheelEvent) => {
    e.preventDefault();
    const { zoom, zoomTo } = useStore.getState();
    const factor = e.deltaY > 0 ? 1 / 1.1 : 1.1;
    zoomTo(zoom * factor, { x: e.clientX, y: e.clientY });
  }, []);

  useEffect(() => {
    const el = canvasRef.current;
    if (!el) return;

    el.addEventListener("wheel", handleWheel, { passive: false });
    return () => {
      el.removeEventListener("wheel", handleWheel);
    };
  }, [canvasRef, handleWheel]);
}
