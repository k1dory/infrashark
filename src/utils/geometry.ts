export interface Point {
  x: number;
  y: number;
}

export interface Rect {
  x: number;
  y: number;
  width: number;
  height: number;
}

export function screenToCanvas(screen: Point, pan: Point, zoom: number): Point {
  return {
    x: (screen.x - pan.x) / zoom,
    y: (screen.y - pan.y) / zoom,
  };
}

export function canvasToScreen(canvas: Point, pan: Point, zoom: number): Point {
  return {
    x: canvas.x * zoom + pan.x,
    y: canvas.y * zoom + pan.y,
  };
}

export function canvasToLocal(canvas: Point, parentAbsolute: Point): Point {
  return {
    x: canvas.x - parentAbsolute.x,
    y: canvas.y - parentAbsolute.y,
  };
}

export function localToCanvas(local: Point, parentAbsolute: Point): Point {
  return {
    x: local.x + parentAbsolute.x,
    y: local.y + parentAbsolute.y,
  };
}

export function distance(a: Point, b: Point): number {
  const dx = a.x - b.x;
  const dy = a.y - b.y;
  return Math.sqrt(dx * dx + dy * dy);
}

export function rectContainsPoint(
  rect: Rect,
  point: Point,
): boolean {
  return (
    point.x >= rect.x &&
    point.x <= rect.x + rect.width &&
    point.y >= rect.y &&
    point.y <= rect.y + rect.height
  );
}

export function rectsIntersect(a: Rect, b: Rect): boolean {
  return (
    a.x < b.x + b.width &&
    a.x + a.width > b.x &&
    a.y < b.y + b.height &&
    a.y + a.height > b.y
  );
}

export function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

export function snapToGrid(value: number, gridSize: number): number {
  return Math.round(value / gridSize) * gridSize;
}
