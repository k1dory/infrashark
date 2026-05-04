import { memo, useMemo } from 'react';
import { useStore } from '../store';
import { findPortPosition } from './utils/port-positions';
import styles from '../styles/connection.module.css';

export const TempConnectionLine = memo(function TempConnectionLine() {
  const drawingConnection = useStore((s) => s.drawingConnection);
  const components = useStore((s) => s.components);

  const fromPos = useMemo(() => {
    if (!drawingConnection) return null;
    return findPortPosition(
      drawingConnection.fromComponentId,
      drawingConnection.fromPortId,
      components,
    );
  }, [drawingConnection, components]);

  if (!drawingConnection || !fromPos) return null;

  const to = drawingConnection.currentPoint;

  const dx = to.x - fromPos.x;
  const dy = to.y - fromPos.y;
  const dist = Math.sqrt(dx * dx + dy * dy);
  const offset = Math.max(15, Math.min(dist * 0.3, 80));

  let cp1x = fromPos.x;
  let cp1y = fromPos.y;
  switch (fromPos.side) {
    case 'top': cp1y -= offset; break;
    case 'right': cp1x += offset; break;
    case 'bottom': cp1y += offset; break;
    case 'left': cp1x -= offset; break;
  }

  const pathD = `M ${fromPos.x} ${fromPos.y} Q ${cp1x} ${cp1y}, ${to.x} ${to.y}`;

  return (
    <g style={{ pointerEvents: 'none' }}>
      <path d={pathD} className={styles.tempConnection} />
      <circle
        cx={to.x}
        cy={to.y}
        r={5}
        fill="var(--color-accent)"
      />
    </g>
  );
});
