import { useEffect } from "react";
import { useStore, undo, redo } from "../store/index";

export function useKeyboardShortcuts() {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const state = useStore.getState();
      const isInput =
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement ||
        e.target instanceof HTMLSelectElement;

      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        state.toggleSearchPalette();
        return;
      }

      if ((e.ctrlKey || e.metaKey) && (e.key === "=" || e.key === "+")) {
        e.preventDefault();
        state.setZoom(Math.min(3, state.zoom + 0.1));
        return;
      }

      if ((e.ctrlKey || e.metaKey) && (e.key === "-" || e.key === "_")) {
        e.preventDefault();
        state.setZoom(Math.max(0.1, state.zoom - 0.1));
        return;
      }

      if ((e.ctrlKey || e.metaKey) && e.key === "0") {
        e.preventDefault();
        state.setZoom(1);
        state.setPan({ x: 0, y: 0 });
        return;
      }

      const k = e.key.toLowerCase();
      if ((e.ctrlKey || e.metaKey) && !e.shiftKey && (k === "z" || k === "я")) {
        e.preventDefault();
        undo();
        return;
      }

      if ((e.ctrlKey || e.metaKey) && ((e.shiftKey && (k === "z" || k === "я")) || k === "y" || k === "н")) {
        e.preventDefault();
        redo();
        return;
      }

      if (isInput) return;

      if (e.key === "Escape") {
        e.preventDefault();
        if (state.searchPaletteOpen) {
          state.setSearchPaletteOpen(false);
        } else if (state.contextMenu) {
          state.hideContextMenu();
        } else {
          state.clearSelection();
        }
        return;
      }

      if (e.key === "Delete" || e.key === "Backspace") {
        e.preventDefault();
        for (const id of [...state.selectedIds]) {
          const isComponent = state.components.some((c) => c.id === id);
          if (isComponent) {
            state.removeComponent(id);
          } else {
            state.removeConnection(id);
          }
        }
        return;
      }

      if ((e.ctrlKey || e.metaKey) && e.key === "a") {
        e.preventDefault();
        state.select(state.components.map((c) => c.id));
        return;
      }

      if ((e.ctrlKey || e.metaKey) && e.key === "d") {
        e.preventDefault();
        for (const id of [...state.selectedIds]) {
          state.duplicateComponent(id);
        }
        return;
      }

      if (e.key === "=" || e.key === "+") {
        e.preventDefault();
        state.setZoom(Math.min(3, state.zoom + 0.1));
        return;
      }

      if (e.key === "-") {
        e.preventDefault();
        state.setZoom(Math.max(0.1, state.zoom - 0.1));
        return;
      }
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);
}
