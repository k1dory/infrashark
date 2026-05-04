import { memo } from 'react';
import { useStore } from '../store';
import { ConnectionLine } from './ConnectionLine';
import { TempConnectionLine } from './TempConnectionLine';

export const ConnectionsOverlay = memo(function ConnectionsOverlay() {
  const connections = useStore((s) => s.connections);
  const drawingConnection = useStore((s) => s.drawingConnection);

  return (
    <svg
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: 1,
        height: 1,
        pointerEvents: 'none',
        overflow: 'visible',
      }}
    >
      <g style={{ pointerEvents: 'auto' }}>
        {connections.map((conn) => (
          <ConnectionLine key={conn.id} connection={conn} />
        ))}
      </g>
      {drawingConnection && <TempConnectionLine />}
    </svg>
  );
});
