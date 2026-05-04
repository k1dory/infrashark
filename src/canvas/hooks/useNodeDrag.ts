import { useCallback, useRef } from 'react';
import { useStore } from '../../store';

export function useNodeDrag(componentId: string) {
  const startRef = useRef<{ sx: number; sy: number; ox: number; oy: number } | null>(null);

  const onPointerDown = useCallback(
    (e: React.PointerEvent) => {
      if (e.button !== 0) return;
      e.currentTarget.setPointerCapture(e.pointerId);

      const { components } = useStore.getState();
      const comp = components.find((c) => c.id === componentId);
      if (!comp) return;

      startRef.current = {
        sx: e.clientX,
        sy: e.clientY,
        ox: comp.position.x,
        oy: comp.position.y,
      };

      const target = e.currentTarget as HTMLElement;

      const onPointerMove = (ev: PointerEvent) => {
        if (!startRef.current) return;
        const { zoom } = useStore.getState();
        const dx = (ev.clientX - startRef.current.sx) / zoom;
        const dy = (ev.clientY - startRef.current.sy) / zoom;
        useStore.getState().moveComponent(componentId, {
          x: startRef.current.ox + dx,
          y: startRef.current.oy + dy,
        });
      };

      const onPointerUp = (ev: PointerEvent) => {
        startRef.current = null;
        target.releasePointerCapture(ev.pointerId);
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
