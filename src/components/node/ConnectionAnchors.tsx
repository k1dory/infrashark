import { memo, useCallback } from 'react';
import type { Size } from '../../types/schema';
import { useStore } from '../../store';
import { clientToCanvas } from '../../utils/canvas-origin';
import { generateId } from '../../utils/id';
import styles from '../../styles/node.module.css';

interface Props {
  componentId: string;
  nodeSize: Size;
}

type Side = 'top' | 'right' | 'bottom' | 'left';

const SIDES: Array<{
  side: Side;
  getPos: (w: number, h: number) => { x: number; y: number };
}> = [
  { side: 'top', getPos: (w) => ({ x: w / 2, y: 0 }) },
  { side: 'right', getPos: (w, h) => ({ x: w, y: h / 2 }) },
  { side: 'bottom', getPos: (w, h) => ({ x: w / 2, y: h }) },
  { side: 'left', getPos: (_, h) => ({ x: 0, y: h / 2 }) },
];

export const ConnectionAnchors = memo(function ConnectionAnchors({
  componentId,
  nodeSize,
}: Props) {
  const drawingConnection = useStore((s) => s.drawingConnection);

  const handleAnchorClick = useCallback(
    (side: Side, e: React.MouseEvent) => {
      e.stopPropagation();
      e.preventDefault();

      const state = useStore.getState();
      const drawing = state.drawingConnection;

      if (!drawing) {
        const { pan, zoom } = state;
        const startCanvas = clientToCanvas(
          { x: e.clientX, y: e.clientY },
          pan,
          zoom,
        );
        state.startDrawingConnection(
          componentId,
          `__anchor_${side}`,
          startCanvas,
        );
        return;
      }

      if (drawing.fromComponentId === componentId) {
        state.stopDrawingConnection();
        return;
      }

      state.addConnection({
        id: generateId(),
        from: {
          componentId: drawing.fromComponentId,
          portId: drawing.fromPortId,
        },
        to: {
          componentId,
          portId: `__anchor_${side}`,
        },
        protocol: 'TCP',
      });
      state.stopDrawingConnection();
    },
    [componentId],
  );

  const isDrawingFromThis =
    drawingConnection && drawingConnection.fromComponentId === componentId;

  return (
    <>
      {SIDES.map(({ side, getPos }) => {
        const pos = getPos(nodeSize.width, nodeSize.height);
        const isActive =
          isDrawingFromThis &&
          drawingConnection?.fromPortId === `__anchor_${side}`;
        return (
          <div
            key={side}
            className={`${styles.connectionAnchor} ${isActive ? styles.connectionAnchorActive : ''}`}
            style={{ left: pos.x, top: pos.y }}
            data-anchor-component-id={componentId}
            data-anchor-side={side}
            onClick={(e) => handleAnchorClick(side, e)}
            onPointerDown={(e) => e.stopPropagation()}
            title={
              drawingConnection
                ? 'Click to finish connection here'
                : `Click to start connection from ${side}`
            }
          />
        );
      })}
    </>
  );
});
