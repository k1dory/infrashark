import { useEffect } from 'react';
import { useStore } from '../../store';
import { clientToCanvas } from '../../utils/canvas-origin';
import { generateId } from '../../utils/id';

type Side = 'top' | 'right' | 'bottom' | 'left';

function getBestSide(
  comp: {
    position: { x: number; y: number };
    size: { width: number; height: number };
  },
  point: { x: number; y: number },
): Side {
  const cx = comp.position.x + comp.size.width / 2;
  const cy = comp.position.y + comp.size.height / 2;
  const dx = point.x - cx;
  const dy = point.y - cy;
  if (Math.abs(dx) > Math.abs(dy)) {
    return dx > 0 ? 'right' : 'left';
  }
  return dy > 0 ? 'bottom' : 'top';
}

export function useDrawingConnection() {
  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      const state = useStore.getState();
      if (!state.drawingConnection) return;
      const point = clientToCanvas(
        { x: e.clientX, y: e.clientY },
        state.pan,
        state.zoom,
      );
      state.updateDrawingConnection(point);
    };

    const onClick = (e: MouseEvent) => {
      const state = useStore.getState();
      const drawing = state.drawingConnection;
      if (!drawing) return;

      const elements = document.elementsFromPoint(e.clientX, e.clientY);
      let targetComponentId: string | null = null;
      let targetSide: Side | null = null;
      let clickedAnchor = false;

      for (const el of elements) {
        const htmlEl = el as HTMLElement;
        if (!htmlEl.dataset) continue;

        const aId = htmlEl.dataset.anchorComponentId;
        const aSide = htmlEl.dataset.anchorSide as Side | undefined;
        if (aId && aSide) {
          clickedAnchor = true;
          if (aId === drawing.fromComponentId) {
            return;
          }
          targetComponentId = aId;
          targetSide = aSide;
          break;
        }

        const nodeId = htmlEl.dataset.nodeId;
        if (nodeId) {
          if (nodeId === drawing.fromComponentId) continue;
          targetComponentId = nodeId;
          const target = state.components.find((c) => c.id === nodeId);
          if (target) {
            const canvasPoint = clientToCanvas(
              { x: e.clientX, y: e.clientY },
              state.pan,
              state.zoom,
            );
            targetSide = getBestSide(target, canvasPoint);
          }
          break;
        }
      }

      if (targetComponentId) {
        e.stopPropagation();
        e.preventDefault();
        state.addConnection({
          id: generateId(),
          from: {
            componentId: drawing.fromComponentId,
            portId: drawing.fromPortId,
          },
          to: {
            componentId: targetComponentId,
            portId: targetSide ? `__anchor_${targetSide}` : undefined,
          },
          protocol: 'TCP',
        });
        state.stopDrawingConnection();
        return;
      }

      if (!clickedAnchor) {
        state.stopDrawingConnection();
      }
    };

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        const state = useStore.getState();
        if (state.drawingConnection) {
          state.stopDrawingConnection();
        }
      }
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('click', onClick, true);
    window.addEventListener('keydown', onKeyDown);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('click', onClick, true);
      window.removeEventListener('keydown', onKeyDown);
    };
  }, []);
}
