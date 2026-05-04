import { useCallback, useEffect } from "react";
import { useStore, undo, redo } from "../store/index";
import { useFileIO } from "../hooks/useFileIO";
import styles from "../styles/panels.module.css";

export function Toolbar() {
  const zoom = useStore((s) => s.zoom);
  const setZoom = useStore((s) => s.setZoom);
  const componentPaletteOpen = useStore((s) => s.componentPaletteOpen);
  const propertiesPanelOpen = useStore((s) => s.propertiesPanelOpen);
  const toggleComponentPalette = useStore((s) => s.toggleComponentPalette);
  const togglePropertiesPanel = useStore((s) => s.togglePropertiesPanel);
  const toggleSearchPalette = useStore((s) => s.toggleSearchPalette);
  const dirty = useStore((s) => s.dirty);
  const meta = useStore((s) => s.meta);

  const { openDocument, saveAsJson, saveAsYaml, exportMarkdown } = useFileIO();

  const handleCtrlK = useCallback(
    (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        toggleSearchPalette();
      }
    },
    [toggleSearchPalette],
  );

  useEffect(() => {
    window.addEventListener("keydown", handleCtrlK);
    return () => window.removeEventListener("keydown", handleCtrlK);
  }, [handleCtrlK]);

  const zoomIn = useCallback(() => {
    setZoom(Math.min(3, zoom + 0.1));
  }, [zoom, setZoom]);

  const zoomOut = useCallback(() => {
    setZoom(Math.max(0.1, zoom - 0.1));
  }, [zoom, setZoom]);

  const zoomReset = useCallback(() => {
    setZoom(1);
  }, [setZoom]);

  const zoomPercent = Math.round(zoom * 100);

  return (
    <div className={styles.toolbar}>
      <span className={styles.toolbarTitle}>
        InfraShark
      </span>

      <div className={styles.toolbarGroup}>
        <button
          className={styles.toolbarBtn}
          onClick={openDocument}
          title="Open JSON/YAML file"
        >
          📂 Open
        </button>
        <button
          className={styles.toolbarBtn}
          onClick={saveAsJson}
          title="Save as JSON"
        >
          💾 Save{dirty ? " *" : ""}
        </button>
        <button
          className={styles.toolbarBtn}
          onClick={saveAsYaml}
          title="Export as YAML"
        >
          YAML
        </button>
        <button
          className={styles.toolbarBtn}
          onClick={exportMarkdown}
          title="Export as Markdown"
        >
          MD
        </button>
      </div>

      <div className={styles.toolbarDivider} />

      <div className={styles.toolbarGroup}>
        <button
          className={styles.toolbarBtn}
          onClick={undo}
          title="Undo (Ctrl+Z)"
        >
          ↶ Undo
        </button>
        <button
          className={styles.toolbarBtn}
          onClick={redo}
          title="Redo (Ctrl+Y)"
        >
          ↷ Redo
        </button>
      </div>


      <div className={styles.toolbarDivider} />

      <div className={styles.toolbarGroup}>
        <button className={styles.toolbarBtn} onClick={zoomOut} title="Zoom Out">
          -
        </button>
        <button
          className={styles.toolbarBtn}
          onClick={zoomReset}
          title="Reset Zoom"
        >
          {zoomPercent}%
        </button>
        <button className={styles.toolbarBtn} onClick={zoomIn} title="Zoom In">
          +
        </button>
      </div>

      <div className={styles.toolbarDivider} />

      <div className={styles.toolbarGroup}>
        <button
          className={`${styles.toolbarBtn}${componentPaletteOpen ? ` ${styles.active}` : ""}`}
          onClick={toggleComponentPalette}
          title="Toggle Palette"
        >
          Palette
        </button>
        <button
          className={`${styles.toolbarBtn}${propertiesPanelOpen ? ` ${styles.active}` : ""}`}
          onClick={togglePropertiesPanel}
          title="Toggle Properties"
        >
          Properties
        </button>
      </div>

      <div className={styles.toolbarSpacer} />

      <span className={styles.toolbarBtn} style={{ cursor: "default" }}>
        {meta.name}
      </span>
    </div>
  );
}
