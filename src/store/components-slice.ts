import type { InfraComponent, Position, Size } from "../types/schema";
import type { AppStore } from "./index";

export interface ComponentsSlice {
  components: InfraComponent[];
  addComponent: (component: InfraComponent) => void;
  removeComponent: (id: string) => void;
  updateComponent: (id: string, updates: Partial<InfraComponent>) => void;
  moveComponent: (id: string, position: Position) => void;
  resizeComponent: (id: string, size: Size) => void;
  reparentComponent: (id: string, newParentId: string | null, localPosition: Position) => void;
  toggleCollapse: (id: string) => void;
  duplicateComponent: (id: string) => InfraComponent | undefined;
  getComponent: (id: string) => InfraComponent | undefined;
}

function collectDescendantIds(components: InfraComponent[], rootId: string): string[] {
  const ids: string[] = [];
  const queue = [rootId];
  while (queue.length > 0) {
    const current = queue.pop()!;
    for (const comp of components) {
      if (comp.parentId === current) {
        ids.push(comp.id);
        queue.push(comp.id);
      }
    }
  }
  return ids;
}

function generateId(): string {
  return crypto.randomUUID();
}

type ImmerSet = (fn: (state: AppStore) => void) => void;

export function createComponentsSlice(set: ImmerSet, get: () => AppStore): ComponentsSlice {
  return {
    components: [],

    addComponent: (component) =>
      set((state) => {
        state.components.push(component);
        state.dirty = true;
      }),

    removeComponent: (id) =>
      set((state) => {
        const descendantIds = collectDescendantIds(state.components, id);
        const removedIds = new Set([id, ...descendantIds]);
        state.components = state.components.filter((c) => !removedIds.has(c.id));
        state.connections = state.connections.filter(
          (c) => !removedIds.has(c.from.componentId) && !removedIds.has(c.to.componentId),
        );
        state.selectedIds = state.selectedIds.filter((s) => !removedIds.has(s));
        state.dirty = true;
      }),

    updateComponent: (id, updates) =>
      set((state) => {
        const comp = state.components.find((c) => c.id === id);
        if (comp) {
          Object.assign(comp, updates);
          state.dirty = true;
        }
      }),

    moveComponent: (id, position) =>
      set((state) => {
        const comp = state.components.find((c) => c.id === id);
        if (comp) {
          comp.position = position;
          state.dirty = true;
        }
      }),

    resizeComponent: (id, size) =>
      set((state) => {
        const comp = state.components.find((c) => c.id === id);
        if (comp) {
          comp.size = size;
          state.dirty = true;
        }
      }),

    reparentComponent: (id, newParentId, localPosition) =>
      set((state) => {
        const comp = state.components.find((c) => c.id === id);
        if (comp) {
          comp.parentId = newParentId;
          comp.position = localPosition;
          state.dirty = true;
        }
      }),

    toggleCollapse: (id) =>
      set((state) => {
        const comp = state.components.find((c) => c.id === id);
        if (comp) {
          comp.collapsed = !comp.collapsed;
          state.dirty = true;
        }
      }),

    duplicateComponent: (id) => {
      const source = get().components.find((c) => c.id === id);
      if (!source) return undefined;

      const cloned: InfraComponent = JSON.parse(JSON.stringify(source));
      cloned.id = generateId();
      cloned.position = {
        x: cloned.position.x + 20,
        y: cloned.position.y + 20,
      };
      if (cloned.ports) {
        for (const port of cloned.ports) {
          port.id = generateId();
        }
      }

      set((state) => {
        state.components.push(cloned);
        state.dirty = true;
      });

      return cloned;
    },

    getComponent: (id) => {
      return get().components.find((c) => c.id === id);
    },
  };
}
