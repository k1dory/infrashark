import { useStore } from '../store';

export function DrawingHint() {
  const drawing = useStore((s) => s.drawingConnection);
  if (!drawing) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: 60,
        left: '50%',
        transform: 'translateX(-50%)',
        background: 'var(--color-accent)',
        color: 'white',
        padding: '8px 16px',
        borderRadius: 8,
        fontSize: 13,
        fontWeight: 600,
        zIndex: 200,
        boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
        pointerEvents: 'none',
        display: 'flex',
        gap: 8,
        alignItems: 'center',
      }}
    >
      <span>⚡ Drawing connection</span>
      <span style={{ opacity: 0.8, fontWeight: 400 }}>
        Click any node or anchor to connect
      </span>
      <span
        style={{
          opacity: 0.8,
          fontSize: 11,
          padding: '2px 6px',
          background: 'rgba(0,0,0,0.2)',
          borderRadius: 3,
        }}
      >
        ESC to cancel
      </span>
    </div>
  );
}
