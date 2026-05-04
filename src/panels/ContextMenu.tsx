import { useEffect, useCallback } from "react";
import { useStore } from "../store/index";
import { COMPONENT_TYPE_INFO } from "../types/component-types";
import type { ComponentTypeInfo } from "../types/component-types";
import { getComponentIcon } from "../components/registry/component-registry";
import { generateId } from "../utils/id";
import type { Position } from "../types/schema";
import styles from "../styles/panels.module.css";

function screenToCanvas(screen: Position, pan: Position, zoom: number): Position {
  return {
    x: (screen.x - pan.x) / zoom,
    y: (screen.y - pan.y) / zoom,
  };
}

export function ContextMenu() {
  const ctx = useStore((s) => s.contextMenu);
  const hideContextMenu = useStore((s) => s.hideContextMenu);
  const addComponent = useStore((s) => s.addComponent);
  const removeComponent = useStore((s) => s.removeComponent);
  const removeConnection = useStore((s) => s.removeConnection);
  const duplicateComponent = useStore((s) => s.duplicateComponent);
  const components = useStore((s) => s.components);
  const select = useStore((s) => s.select);
  const pan = useStore((s) => s.pan);
  const zoom = useStore((s) => s.zoom);
  const startDrawingConnection = useStore((s) => s.startDrawingConnection);

  useEffect(() => {
    if (!ctx) return;
    const handler = () => hideContextMenu();
    window.addEventListener("pointerdown", handler);
    return () => window.removeEventListener("pointerdown", handler);
  }, [ctx, hideContextMenu]);

  const handleAddComponent = useCallback(
    (info: ComponentTypeInfo) => {
      if (!ctx) return;
      const pos = screenToCanvas({ x: ctx.x, y: ctx.y }, pan, zoom);
      addComponent({
        id: generateId(),
        type: info.type,
        name: info.displayName,
        parentId: null,
        position: pos,
        size: { ...info.defaultSize },
        config: {},
        ports: info.defaultPorts.map((p) => ({ ...p, id: generateId() })),
      });
      hideContextMenu();
    },
    [ctx, addComponent, hideContextMenu, pan, zoom],
  );

  const handleSelectAll = useCallback(() => {
    select(components.map((c) => c.id));
    hideContextMenu();
  }, [components, select, hideContextMenu]);

  const handleDelete = useCallback(() => {
    if (!ctx?.targetId) return;
    if (ctx.targetType === "component") {
      removeComponent(ctx.targetId);
    } else if (ctx.targetType === "connection") {
      removeConnection(ctx.targetId);
    }
    hideContextMenu();
  }, [ctx, removeComponent, removeConnection, hideContextMenu]);

  const handleDuplicate = useCallback(() => {
    if (!ctx?.targetId) return;
    const dup = duplicateComponent(ctx.targetId);
    if (dup) {
      select([dup.id]);
    }
    hideContextMenu();
  }, [ctx, duplicateComponent, select, hideContextMenu]);

  const handleEdit = useCallback(() => {
    if (!ctx?.targetId) return;
    select([ctx.targetId]);
    hideContextMenu();
  }, [ctx, select, hideContextMenu]);

  const handleAddConnectionFrom = useCallback(() => {
    if (!ctx?.targetId) return;
    startDrawingConnection(ctx.targetId, undefined, { x: ctx.x, y: ctx.y });
    hideContextMenu();
  }, [ctx, startDrawingConnection, hideContextMenu]);

  if (!ctx) return null;

  const targetType = ctx.targetType ?? "canvas";

  return (
    <div
      className={styles.contextMenu}
      style={{ left: ctx.x, top: ctx.y }}
      onPointerDown={(e) => e.stopPropagation()}
    >
      {targetType === "canvas" && (
        <>
          {Object.values(COMPONENT_TYPE_INFO)
            .slice(0, 8)
            .map((info) => (
              <button
                key={info.type}
                className={styles.contextMenuItem}
                onClick={() => handleAddComponent(info)}
              >
                {getComponentIcon(info.type)} Add {info.displayName}
              </button>
            ))}
          <div className={styles.contextMenuDivider} />
          <button className={styles.contextMenuItem} onClick={handleSelectAll}>
            Select All
            <span className={styles.contextMenuShortcut}>Ctrl+A</span>
          </button>
        </>
      )}

      {targetType === "component" && (
        <>
          <button className={styles.contextMenuItem} onClick={handleEdit}>
            Edit
          </button>
          <button className={styles.contextMenuItem} onClick={handleDuplicate}>
            Duplicate
            <span className={styles.contextMenuShortcut}>Ctrl+D</span>
          </button>
          <button
            className={styles.contextMenuItem}
            onClick={handleAddConnectionFrom}
          >
            Add Connection From Here
          </button>
          <div className={styles.contextMenuDivider} />
          <button className={styles.contextMenuItem} onClick={handleDelete}>
            Delete
            <span className={styles.contextMenuShortcut}>Del</span>
          </button>
        </>
      )}

      {targetType === "connection" && (
        <>
          <button className={styles.contextMenuItem} onClick={handleEdit}>
            Edit Protocol
          </button>
          <div className={styles.contextMenuDivider} />
          <button className={styles.contextMenuItem} onClick={handleDelete}>
            Delete
            <span className={styles.contextMenuShortcut}>Del</span>
          </button>
        </>
      )}
    </div>
  );
}
