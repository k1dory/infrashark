import type { InfraComponent } from '../types/schema';
import type { Point } from './geometry';

export function getChildren(
  components: InfraComponent[],
  parentId: string | null,
): InfraComponent[] {
  return components.filter((c) => c.parentId === parentId);
}

export function getRootComponents(components: InfraComponent[]): InfraComponent[] {
  return components.filter((c) => c.parentId == null);
}

export function getAncestorIds(
  components: InfraComponent[],
  componentId: string,
): string[] {
  const ids: string[] = [];
  let current = components.find((c) => c.id === componentId);
  while (current?.parentId != null) {
    ids.push(current.parentId);
    current = components.find((c) => c.id === current!.parentId);
  }
  return ids;
}

export function getAbsolutePosition(
  components: InfraComponent[],
  componentId: string,
): Point {
  let x = 0;
  let y = 0;
  let current = components.find((c) => c.id === componentId);
  while (current != null) {
    x += current.position.x;
    y += current.position.y;
    current =
      current.parentId != null
        ? components.find((c) => c.id === current!.parentId)
        : undefined;
  }
  return { x, y };
}

export function getDescendantIds(
  components: InfraComponent[],
  componentId: string,
): string[] {
  const result: string[] = [];
  const stack = [componentId];
  while (stack.length > 0) {
    const id = stack.pop()!;
    const children = components.filter((c) => c.parentId === id);
    for (const child of children) {
      result.push(child.id);
      stack.push(child.id);
    }
  }
  return result;
}

export function isDescendantOf(
  components: InfraComponent[],
  childId: string,
  ancestorId: string,
): boolean {
  let current = components.find((c) => c.id === childId);
  while (current?.parentId != null) {
    if (current.parentId === ancestorId) {
      return true;
    }
    current = components.find((c) => c.id === current!.parentId);
  }
  return false;
}

export function buildChildrenMap(
  components: InfraComponent[],
): Map<string | null, InfraComponent[]> {
  const map = new Map<string | null, InfraComponent[]>();
  for (const component of components) {
    const key = component.parentId;
    const list = map.get(key);
    if (list != null) {
      list.push(component);
    } else {
      map.set(key, [component]);
    }
  }
  return map;
}
