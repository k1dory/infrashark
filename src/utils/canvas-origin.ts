import type { Point } from './geometry';

const SELECTOR = '[data-canvas-root]';

export function getCanvasOrigin(): Point {
  const root = document.querySelector(SELECTOR) as HTMLElement | null;
  if (!root) return { x: 0, y: 0 };
  const rect = root.getBoundingClientRect();
  return { x: rect.left, y: rect.top };
}

export function clientToCanvas(
  client: Point,
  pan: Point,
  zoom: number,
): Point {
  const origin = getCanvasOrigin();
  return {
    x: (client.x - origin.x - pan.x) / zoom,
    y: (client.y - origin.y - pan.y) / zoom,
  };
}
