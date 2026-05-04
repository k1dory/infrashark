import { useCallback } from 'react';
import { useStore } from '../../store';
import { screenToCanvas } from '../../utils/geometry';
import { generateId } from '../../utils/id';

export function useConnectionDraw() {
  const onPortPointerDown = useCallback(
    (componentId: string, portId: string, e: React.PointerEvent) => {
      e.stopPropagation();
      e.preventDefault();

      const { pan, zoom } = useStore.getState();
      const startCanvas = screenToCanvas(
        { x: e.clientX, y: e.clientY },
        pan,
        zoom,
      );

      useStore.getState().startDrawingConnection(componentId, portId, startCanvas);

      const onPointerMove = (ev: PointerEvent) => {
        const state = useStore.getState();
        const point = screenToCanvas(
          { x: ev.clientX, y: ev.clientY },
          state.pan,
          state.zoom,
        );
        state.updateDrawingConnection(point);
      };

      const onPointerUp = (ev: PointerEvent) => {
        window.removeEventListener('pointermove', onPointerMove);
        window.removeEventListener('pointerup', onPointerUp);

        const state = useStore.getState();
        const drawing = state.drawingConnection;
        if (!drawing) return;

        const elements = document.elementsFromPoint(ev.clientX, ev.clientY);
        let targetComponentId: string | null = null;
        let targetPortId: string | null = null;

        for (const el of elements) {
          const htmlEl = el as HTMLElement;
          const pId = htmlEl.dataset?.portId;
          const cId = htmlEl.dataset?.componentId;
          if (pId && cId) {
            targetComponentId = cId;
            targetPortId = pId;
            break;
          }
        }

        if (
          targetComponentId &&
          targetPortId &&
          (targetComponentId !== drawing.fromComponentId ||
            targetPortId !== drawing.fromPortId)
        ) {
          const fromPort = state.components
            .find((c) => c.id === drawing.fromComponentId)
            ?.ports.find((p) => p.id === drawing.fromPortId);
          const toPort = state.components
            .find((c) => c.id === targetComponentId)
            ?.ports.find((p) => p.id === targetPortId);

          const protocol = fromPort?.protocol ?? toPort?.protocol ?? 'TCP';

          state.addConnection({
            id: generateId(),
            from: {
              componentId: drawing.fromComponentId,
              portId: drawing.fromPortId,
            },
            to: {
              componentId: targetComponentId,
              portId: targetPortId,
            },
            protocol,
          });
        }

        state.stopDrawingConnection();
      };

      window.addEventListener('pointermove', onPointerMove);
      window.addEventListener('pointerup', onPointerUp);
    },
    [],
  );

  return { onPortPointerDown };
}
