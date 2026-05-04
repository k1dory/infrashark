import { useCallback, useRef } from 'react';
import { useStore } from '../../store';

const MIN_WIDTH = 120;
const MIN_HEIGHT = 60;

export function useNodeResize(componentId: string) {
  const startRef = useRef<{
    sx: number;
    sy: number;
    ow: number;
    oh: number;
  } | null>(null);

  const onPointerDown = useCallback(
    (e: React.PointerEvent) => {
      if (e.button !== 0) return;
      e.stopPropagation();
      e.preventDefault();
      e.currentTarget.setPointerCapture(e.pointerId);

      const { components } = useStore.getState();
      const comp = components.find((c) => c.id === componentId);
      if (!comp) return;

      startRef.current = {
        sx: e.clientX,
        sy: e.clientY,
        ow: comp.size.width,
        oh: comp.size.height,
      };

      const target = e.currentTarget as HTMLElement;

      const onPointerMove = (ev: PointerEvent) => {
        if (!startRef.current) return;
        const { zoom } = useStore.getState();
        const dx = (ev.clientX - startRef.current.sx) / zoom;
        const dy = (ev.clientY - startRef.current.sy) / zoom;
        useStore.getState().resizeComponent(componentId, {
          width: Math.max(MIN_WIDTH, startRef.current.ow + dx),
          height: Math.max(MIN_HEIGHT, startRef.current.oh + dy),
        });
      };

      const onPointerUp = (ev: PointerEvent) => {
        startRef.current = null;
        try {
          target.releasePointerCapture(ev.pointerId);
        } catch {}
        target.removeEventListener('pointermove', onPointerMove);
        target.removeEventListener('pointerup', onPointerUp);
      };

      target.addEventListener('pointermove', onPointerMove);
      target.addEventListener('pointerup', onPointerUp);
    },
    [componentId],
  );

  return { onPointerDown };
}
