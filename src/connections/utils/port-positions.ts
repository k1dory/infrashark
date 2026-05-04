import type { InfraComponent, Port, Size } from '../../types/schema';
import type { Point } from '../../utils/geometry';
import { getAbsolutePosition } from '../../utils/tree';

export interface PortPosition extends Point {
  side: 'top' | 'right' | 'bottom' | 'left';
}

function parseAnchorSide(portId: string): 'top' | 'right' | 'bottom' | 'left' | null {
  const match = portId.match(/^__anchor_(top|right|bottom|left)$/);
  return match ? (match[1] as 'top' | 'right' | 'bottom' | 'left') : null;
}

function getAnchorPosition(
  side: 'top' | 'right' | 'bottom' | 'left',
  abs: Point,
  size: Size,
): PortPosition {
  switch (side) {
    case 'top':
      return { x: abs.x + size.width / 2, y: abs.y, side: 'top' };
    case 'right':
      return { x: abs.x + size.width, y: abs.y + size.height / 2, side: 'right' };
    case 'bottom':
      return { x: abs.x + size.width / 2, y: abs.y + size.height, side: 'bottom' };
    case 'left':
      return { x: abs.x, y: abs.y + size.height / 2, side: 'left' };
  }
}

export function getPortAbsolutePosition(
  port: Port,
  component: InfraComponent,
  allComponents: InfraComponent[],
  nodeSize: Size,
): PortPosition {
  const abs = getAbsolutePosition(allComponents, component.id);

  const sameSide = component.ports.filter((p) => p.side === port.side);
  const idx = sameSide.findIndex((p) => p.id === port.id);
  const count = sameSide.length;
  const t = (idx + 1) / (count + 1);

  let x: number;
  let y: number;

  switch (port.side) {
    case 'top':
      x = abs.x + nodeSize.width * t;
      y = abs.y;
      break;
    case 'right':
      x = abs.x + nodeSize.width;
      y = abs.y + nodeSize.height * t;
      break;
    case 'bottom':
      x = abs.x + nodeSize.width * t;
      y = abs.y + nodeSize.height;
      break;
    case 'left':
      x = abs.x;
      y = abs.y + nodeSize.height * t;
      break;
  }

  return { x, y, side: port.side };
}

export function findPortPosition(
  componentId: string,
  portId: string | undefined,
  allComponents: InfraComponent[],
): PortPosition | null {
  const comp = allComponents.find((c) => c.id === componentId);
  if (!comp) return null;

  const abs = getAbsolutePosition(allComponents, comp.id);

  if (portId) {
    const anchorSide = parseAnchorSide(portId);
    if (anchorSide) {
      return getAnchorPosition(anchorSide, abs, comp.size);
    }

    const port = comp.ports.find((p) => p.id === portId);
    if (port) {
      return getPortAbsolutePosition(port, comp, allComponents, comp.size);
    }
  }

  return {
    x: abs.x + comp.size.width / 2,
    y: abs.y + comp.size.height / 2,
    side: 'right',
  };
}

export function getBestSideForConnection(
  fromComp: InfraComponent,
  toComp: InfraComponent,
): { fromSide: PortPosition['side']; toSide: PortPosition['side'] } {
  const fromCx = fromComp.position.x + fromComp.size.width / 2;
  const fromCy = fromComp.position.y + fromComp.size.height / 2;
  const toCx = toComp.position.x + toComp.size.width / 2;
  const toCy = toComp.position.y + toComp.size.height / 2;

  const dx = toCx - fromCx;
  const dy = toCy - fromCy;

  if (Math.abs(dx) > Math.abs(dy)) {
    return dx > 0
      ? { fromSide: 'right', toSide: 'left' }
      : { fromSide: 'left', toSide: 'right' };
  }
  return dy > 0
    ? { fromSide: 'bottom', toSide: 'top' }
    : { fromSide: 'top', toSide: 'bottom' };
}
