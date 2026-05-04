import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { temporal } from "zundo";
import type { TemporalState } from "zundo";
import { useStore as useZustandStore } from "zustand";
import { type DocumentSlice, createDocumentSlice } from "./document-slice";
import { type ComponentsSlice, createComponentsSlice } from "./components-slice";
import { type ConnectionsSlice, createConnectionsSlice } from "./connections-slice";
import { type CanvasSlice, createCanvasSlice } from "./canvas-slice";
import { type UISlice, createUISlice } from "./ui-slice";

export type AppStore = DocumentSlice & ComponentsSlice & ConnectionsSlice & CanvasSlice & UISlice;

interface TrackedState {
  components: AppStore["components"];
  connections: AppStore["connections"];
  meta: AppStore["meta"];
}

export const useStore = create<AppStore>()(
  devtools(
    temporal(
      immer((set, get) => {
        const immerSet = set as unknown as (fn: (state: AppStore) => void) => void;
        const getState = get as () => AppStore;
        return {
          ...createDocumentSlice(immerSet, getState),
          ...createComponentsSlice(immerSet, getState),
          ...createConnectionsSlice(immerSet, getState),
          ...createCanvasSlice(immerSet, getState),
          ...createUISlice(immerSet, getState),
        };
      }),
      {
        partialize: (state): TrackedState => ({
          components: state.components,
          connections: state.connections,
          meta: state.meta,
        }),
        equality: (a, b) =>
          a.components === b.components &&
          a.connections === b.connections &&
          a.meta === b.meta,
        limit: 100,
      },
    ),
  ),
);

export const useTemporalStore = <T,>(
  selector: (state: TemporalState<TrackedState>) => T,
): T => useZustandStore(useStore.temporal, selector);

export function undo() {
  useStore.temporal.getState().undo();
}

export function redo() {
  useStore.temporal.getState().redo();
}
