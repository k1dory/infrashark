import { memo } from "react";
import type { Rect } from "../utils/geometry";
import styles from "../styles/canvas.module.css";

interface Props {
  rect: Rect | null;
}

export const SelectionBox = memo(function SelectionBox({ rect }: Props) {
  if (!rect) return null;

  return (
    <div
      className={styles.selectionBox}
      style={{
        left: rect.x,
        top: rect.y,
        width: rect.width,
        height: rect.height,
      }}
    />
  );
});
