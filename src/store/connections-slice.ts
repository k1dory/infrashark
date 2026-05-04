import type { Connection } from "../types/schema";
import type { AppStore } from "./index";

export interface ConnectionsSlice {
  connections: Connection[];
  addConnection: (connection: Connection) => void;
  removeConnection: (id: string) => void;
  updateConnection: (id: string, updates: Partial<Connection>) => void;
  getConnectionsForComponent: (componentId: string) => Connection[];
  removeConnectionsForComponent: (componentId: string) => void;
}

type ImmerSet = (fn: (state: AppStore) => void) => void;

export function createConnectionsSlice(set: ImmerSet, get: () => AppStore): ConnectionsSlice {
  return {
    connections: [],

    addConnection: (connection) =>
      set((state) => {
        state.connections.push(connection);
        state.dirty = true;
      }),

    removeConnection: (id) =>
      set((state) => {
        state.connections = state.connections.filter((c) => c.id !== id);
        state.dirty = true;
      }),

    updateConnection: (id, updates) =>
      set((state) => {
        const conn = state.connections.find((c) => c.id === id);
        if (conn) {
          Object.assign(conn, updates);
          state.dirty = true;
        }
      }),

    getConnectionsForComponent: (componentId) => {
      return get().connections.filter(
        (c) =>
          c.from.componentId === componentId ||
          c.to.componentId === componentId,
      );
    },

    removeConnectionsForComponent: (componentId) =>
      set((state) => {
        const before = state.connections.length;
        state.connections = state.connections.filter(
          (c) =>
            c.from.componentId !== componentId &&
            c.to.componentId !== componentId,
        );
        if (state.connections.length !== before) {
          state.dirty = true;
        }
      }),
  };
}
