import { memo, type ReactNode } from "react";
import { useStore } from "../store";
import styles from "../styles/canvas.module.css";

interface Props {
  children: ReactNode;
}

export const CanvasViewport = memo(function CanvasViewport({ children }: Props) {
  const zoom = useStore((s) => s.zoom);
  const pan = useStore((s) => s.pan);

  return (
    <div
      className={styles.viewport}
      style={{
        transform: `scale(${zoom}) translate(${pan.x / zoom}px, ${pan.y / zoom}px)`,
      }}
    >
      {children}
    </div>
  );
});
