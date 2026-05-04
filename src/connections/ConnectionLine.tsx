import { memo, useCallback, useMemo } from 'react';
import type { Connection } from '../types/schema';
import { PROTOCOL_META } from '../types/protocols';
import { useStore } from '../store';
import { findPortPosition } from './utils/port-positions';
import { computeConnectionPath } from './utils/path-calculator';
import styles from '../styles/connection.module.css';

interface Props {
  connection: Connection;
}

export const ConnectionLine = memo(function ConnectionLine({ connection }: Props) {
  const components = useStore((s) => s.components);
  const selectedIds = useStore((s) => s.selectedIds);
  const select = useStore((s) => s.select);
  const showContextMenu = useStore((s) => s.showContextMenu);

  const fromPos = findPortPosition(
    connection.from.componentId,
    connection.from.portId,
    components,
  );
  const toPos = findPortPosition(
    connection.to.componentId,
    connection.to.portId,
    components,
  );

  const pathD = useMemo(() => {
    if (!fromPos || !toPos) return null;
    return computeConnectionPath(fromPos, toPos);
  }, [fromPos, toPos]);

  const handleClick = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      select([connection.id]);
    },
    [connection.id, select],
  );

  const handleContextMenu = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      showContextMenu({
        x: e.clientX,
        y: e.clientY,
        targetId: connection.id,
        targetType: 'connection',
      });
    },
    [connection.id, showContextMenu],
  );

  if (!pathD || !fromPos || !toPos) return null;

  const protocolMeta = PROTOCOL_META[connection.protocol] ?? PROTOCOL_META.custom;
  const color = connection.style?.color ?? protocolMeta.color;
  const strokeWidth = connection.style?.strokeWidth ?? 2.5;
  const isSelected = selectedIds.includes(connection.id);
  const flow = connection.style?.animated ?? true;

  const pathClasses = [
    styles.connection,
    isSelected && styles.selected,
    connection.style?.dashed && styles.connectionDashed,
    flow && styles.connectionFlow,
  ]
    .filter(Boolean)
    .join(' ');

  const midX = (fromPos.x + toPos.x) / 2;
  const midY = (fromPos.y + toPos.y) / 2;

  const label = connection.label || connection.protocol;
  const labelWidth = label.length * 7 + 14;
  const markerId = `arrow-${connection.id}`;

  return (
    <g onClick={handleClick} onContextMenu={handleContextMenu}>
      <defs>
        <marker
          id={markerId}
          markerWidth="10"
          markerHeight="10"
          refX="9"
          refY="5"
          orient="auto"
          markerUnits="userSpaceOnUse"
        >
          <polygon points="0 0, 10 5, 0 10" fill={color} />
        </marker>
      </defs>
      <path d={pathD} className={styles.connectionHitArea} />
      <path
        d={pathD}
        className={pathClasses}
        style={{ stroke: color, strokeWidth, color }}
        markerEnd={`url(#${markerId})`}
      />
      <g style={{ pointerEvents: 'none' }}>
        <rect
          x={midX - labelWidth / 2}
          y={midY - 10}
          width={labelWidth}
          height={20}
          rx={4}
          ry={4}
          fill="#12121a"
          stroke={color}
          strokeWidth={1.2}
          opacity={0.96}
        />
        <text
          x={midX}
          y={midY + 4}
          textAnchor="middle"
          fill={color}
          fontSize={11}
          fontFamily="var(--font-mono)"
          fontWeight={600}
        >
          {label}
        </text>
      </g>
    </g>
  );
});
