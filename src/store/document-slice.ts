import type { DocumentMeta } from "../types/schema";
import type { AppStore } from "./index";

export interface DocumentSlice {
  meta: DocumentMeta;
  version: "1.0";
  dirty: boolean;
  setMeta: (meta: Partial<DocumentMeta>) => void;
  markDirty: () => void;
  markClean: () => void;
}

type ImmerSet = (fn: (state: AppStore) => void) => void;

export function createDocumentSlice(set: ImmerSet, _get: () => AppStore): DocumentSlice {
  return {
    meta: {
      name: "Untitled",
      created: new Date().toISOString(),
      updated: new Date().toISOString(),
    },
    version: "1.0",
    dirty: false,

    setMeta: (meta) =>
      set((state) => {
        Object.assign(state.meta, meta);
        state.meta.updated = new Date().toISOString();
        state.dirty = true;
      }),

    markDirty: () =>
      set((state) => {
        state.dirty = true;
      }),

    markClean: () =>
      set((state) => {
        state.dirty = false;
      }),
  };
}
