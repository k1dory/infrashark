import { memo } from "react";
import { useStore } from "../store";
import styles from "../styles/canvas.module.css";

export const Grid = memo(function Grid() {
  const zoom = useStore((s) => s.zoom);
  const pan = useStore((s) => s.pan);

  const gridSize = 20 * zoom;
  const offsetX = pan.x % gridSize;
  const offsetY = pan.y % gridSize;

  return (
    <div
      className={styles.grid}
      style={{
        backgroundSize: `${gridSize}px ${gridSize}px`,
        backgroundPosition: `${offsetX}px ${offsetY}px`,
      }}
    />
  );
});
