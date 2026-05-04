import type { PortPosition } from './port-positions';

function sideOffset(
  side: PortPosition['side'],
  offset: number,
): { dx: number; dy: number } {
  switch (side) {
    case 'top':
      return { dx: 0, dy: -offset };
    case 'right':
      return { dx: offset, dy: 0 };
    case 'bottom':
      return { dx: 0, dy: offset };
    case 'left':
      return { dx: -offset, dy: 0 };
  }
}

export function computeConnectionPath(
  from: PortPosition,
  to: PortPosition,
): string {
  const dx = to.x - from.x;
  const dy = to.y - from.y;
  const dist = Math.sqrt(dx * dx + dy * dy);
  const offset = Math.max(20, Math.min(dist * 0.35, 120));

  const c1 = sideOffset(from.side, offset);
  const c2 = sideOffset(to.side, offset);

  const cp1x = from.x + c1.dx;
  const cp1y = from.y + c1.dy;
  const cp2x = to.x + c2.dx;
  const cp2y = to.y + c2.dy;

  return `M ${from.x} ${from.y} C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${to.x} ${to.y}`;
}

const ARROW_SIZE = 8;

export function computeArrowhead(to: PortPosition): string {
  const { x, y, side } = to;

  switch (side) {
    case 'top':
      return `${x},${y} ${x - ARROW_SIZE / 2},${y - ARROW_SIZE} ${x + ARROW_SIZE / 2},${y - ARROW_SIZE}`;
    case 'right':
      return `${x},${y} ${x + ARROW_SIZE},${y - ARROW_SIZE / 2} ${x + ARROW_SIZE},${y + ARROW_SIZE / 2}`;
    case 'bottom':
      return `${x},${y} ${x - ARROW_SIZE / 2},${y + ARROW_SIZE} ${x + ARROW_SIZE / 2},${y + ARROW_SIZE}`;
    case 'left':
      return `${x},${y} ${x - ARROW_SIZE},${y - ARROW_SIZE / 2} ${x - ARROW_SIZE},${y + ARROW_SIZE / 2}`;
  }
}

export function computeStraightPath(
  from: { x: number; y: number },
  to: { x: number; y: number },
): string {
  return `M ${from.x} ${from.y} L ${to.x} ${to.y}`;
}
