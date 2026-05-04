import type { AppStore } from "./index";

export interface ContextMenuState {
  x: number;
  y: number;
  targetId?: string;
  targetType?: "canvas" | "component" | "connection";
}

export interface UISlice {
  contextMenu: ContextMenuState | null;
  searchPaletteOpen: boolean;
  propertiesPanelOpen: boolean;
  componentPaletteOpen: boolean;
  showContextMenu: (state: ContextMenuState) => void;
  hideContextMenu: () => void;
  toggleSearchPalette: () => void;
  togglePropertiesPanel: () => void;
  toggleComponentPalette: () => void;
  setSearchPaletteOpen: (open: boolean) => void;
}

type ImmerSet = (fn: (state: AppStore) => void) => void;

export function createUISlice(set: ImmerSet, _get: () => AppStore): UISlice {
  return {
    contextMenu: null,
    searchPaletteOpen: false,
    propertiesPanelOpen: true,
    componentPaletteOpen: true,

    showContextMenu: (ctx) =>
      set((state) => {
        state.contextMenu = ctx;
      }),

    hideContextMenu: () =>
      set((state) => {
        state.contextMenu = null;
      }),

    toggleSearchPalette: () =>
      set((state) => {
        state.searchPaletteOpen = !state.searchPaletteOpen;
      }),

    togglePropertiesPanel: () =>
      set((state) => {
        state.propertiesPanelOpen = !state.propertiesPanelOpen;
      }),

    toggleComponentPalette: () =>
      set((state) => {
        state.componentPaletteOpen = !state.componentPaletteOpen;
      }),

    setSearchPaletteOpen: (open) =>
      set((state) => {
        state.searchPaletteOpen = open;
      }),
  };
}
