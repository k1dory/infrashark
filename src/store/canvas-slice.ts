import type { Position } from "../types/schema";
import type { AppStore } from "./index";

export interface CanvasSlice {
  zoom: number;
  pan: Position;
  selectedIds: string[];
  hoveredId: string | null;
  drawingConnection: {
    fromComponentId: string;
    fromPortId?: string;
    currentPoint: Position;
  } | null;
  setZoom: (zoom: number) => void;
  zoomTo: (zoom: number, focalPoint: Position) => void;
  setPan: (pan: Position) => void;
  panBy: (delta: Position) => void;
  select: (ids: string[]) => void;
  addToSelection: (id: string) => void;
  removeFromSelection: (id: string) => void;
  clearSelection: () => void;
  setHovered: (id: string | null) => void;
  startDrawingConnection: (fromComponentId: string, fromPortId?: string, startPoint?: Position) => void;
  updateDrawingConnection: (point: Position) => void;
  stopDrawingConnection: () => void;
}

const MIN_ZOOM = 0.1;
const MAX_ZOOM = 3.0;

function clampZoom(value: number): number {
  return Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, value));
}

type ImmerSet = (fn: (state: AppStore) => void) => void;

export function createCanvasSlice(set: ImmerSet, _get: () => AppStore): CanvasSlice {
  return {
    zoom: 1,
    pan: { x: 0, y: 0 },
    selectedIds: [],
    hoveredId: null,
    drawingConnection: null,

    setZoom: (zoom) =>
      set((state) => {
        state.zoom = clampZoom(zoom);
      }),

    zoomTo: (zoom, focalPoint) =>
      set((state) => {
        const newZoom = clampZoom(zoom);
        const oldZoom = state.zoom;
        state.pan.x = focalPoint.x - (focalPoint.x - state.pan.x) * (newZoom / oldZoom);
        state.pan.y = focalPoint.y - (focalPoint.y - state.pan.y) * (newZoom / oldZoom);
        state.zoom = newZoom;
      }),

    setPan: (pan) =>
      set((state) => {
        state.pan = pan;
      }),

    panBy: (delta) =>
      set((state) => {
        state.pan.x += delta.x;
        state.pan.y += delta.y;
      }),

    select: (ids) =>
      set((state) => {
        state.selectedIds = ids;
      }),

    addToSelection: (id) =>
      set((state) => {
        if (!state.selectedIds.includes(id)) {
          state.selectedIds.push(id);
        }
      }),

    removeFromSelection: (id) =>
      set((state) => {
        state.selectedIds = state.selectedIds.filter((s) => s !== id);
      }),

    clearSelection: () =>
      set((state) => {
        state.selectedIds = [];
      }),

    setHovered: (id) =>
      set((state) => {
        state.hoveredId = id;
      }),

    startDrawingConnection: (fromComponentId, fromPortId, startPoint) =>
      set((state) => {
        state.drawingConnection = {
          fromComponentId,
          fromPortId,
          currentPoint: startPoint ?? { x: 0, y: 0 },
        };
      }),

    updateDrawingConnection: (point) =>
      set((state) => {
        if (state.drawingConnection) {
          state.drawingConnection.currentPoint = point;
        }
      }),

    stopDrawingConnection: () =>
      set((state) => {
        state.drawingConnection = null;
      }),
  };
}
