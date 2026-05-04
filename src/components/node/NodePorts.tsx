import { memo } from 'react';
import type { Port, Size } from '../../types/schema';
import { useConnectionDraw } from '../../canvas/hooks/useConnectionDraw';
import styles from '../../styles/node.module.css';

interface Props {
  ports: Port[];
  nodeSize: Size;
  componentId: string;
}

type Side = Port['side'];

function computePortPositions(
  ports: Port[],
  nodeSize: Size,
): Array<{ port: Port; x: number; y: number }> {
  const grouped: Record<Side, Port[]> = { top: [], right: [], bottom: [], left: [] };
  for (const p of ports) {
    grouped[p.side].push(p);
  }

  const result: Array<{ port: Port; x: number; y: number }> = [];

  for (const side of ['top', 'right', 'bottom', 'left'] as Side[]) {
    const sidePorts = grouped[side];
    const count = sidePorts.length;
    if (count === 0) continue;

    for (let i = 0; i < count; i++) {
      const t = (i + 1) / (count + 1);
      let x: number;
      let y: number;

      switch (side) {
        case 'top':
          x = nodeSize.width * t;
          y = 0;
          break;
        case 'right':
          x = nodeSize.width;
          y = nodeSize.height * t;
          break;
        case 'bottom':
          x = nodeSize.width * t;
          y = nodeSize.height;
          break;
        case 'left':
          x = 0;
          y = nodeSize.height * t;
          break;
      }

      result.push({ port: sidePorts[i], x, y });
    }
  }

  return result;
}

export const NodePorts = memo(function NodePorts({ ports, nodeSize, componentId }: Props) {
  const { onPortPointerDown } = useConnectionDraw();
  const positions = computePortPositions(ports, nodeSize);

  return (
    <>
      {positions.map(({ port, x, y }) => (
        <div
          key={port.id}
          className={styles.port}
          style={{ left: x, top: y }}
          data-port-id={port.id}
          data-component-id={componentId}
          title={`${port.name} :${port.number}`}
          onPointerDown={(e) => onPortPointerDown(componentId, port.id, e)}
        >
          <span className={`${styles.portLabel} ${styles[port.side]}`}>
            {port.name}
          </span>
        </div>
      ))}
    </>
  );
});
