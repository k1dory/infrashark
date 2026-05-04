import { useState, useCallback, useRef } from "react";
import { useStore } from "../store/index";
import { getComponentsByCategory } from "../types/component-types";
import type { ComponentTypeInfo, ComponentCategory } from "../types/component-types";
import { INFRA_ICONS } from "../components/registry/icons";
import { generateId } from "../utils/id";
import type { Position } from "../types/schema";
import styles from "../styles/panels.module.css";

function screenToCanvas(screen: Position, pan: Position, zoom: number): Position {
  return {
    x: (screen.x - pan.x) / zoom,
    y: (screen.y - pan.y) / zoom,
  };
}

const CATEGORY_LABELS: Record<ComponentCategory, string> = {
  infrastructure: "Infrastructure",
  container: "Containers",
  application: "Application",
  service: "Services",
  database: "Databases",
  network: "Network",
  storage: "Storage",
  monitoring: "Monitoring",
  "ci-cd": "CI / CD",
  custom: "Custom",
};

export function ComponentPalette() {
  const open = useStore((s) => s.componentPaletteOpen);
  const addComponent = useStore((s) => s.addComponent);
  const pan = useStore((s) => s.pan);
  const zoom = useStore((s) => s.zoom);
  const [search, setSearch] = useState("");
  const draggingRef = useRef<ComponentTypeInfo | null>(null);

  const grouped = getComponentsByCategory();

  const handlePointerDown = useCallback(
    (info: ComponentTypeInfo) => {
      draggingRef.current = info;

      const onPointerUp = (e: PointerEvent) => {
        window.removeEventListener("pointerup", onPointerUp);
        const draggedInfo = draggingRef.current;
        draggingRef.current = null;
        if (!draggedInfo) return;

        const pos = screenToCanvas({ x: e.clientX, y: e.clientY }, pan, zoom);

        addComponent({
          id: generateId(),
          type: draggedInfo.type,
          name: draggedInfo.displayName,
          parentId: null,
          position: pos,
          size: { ...draggedInfo.defaultSize },
          config: {},
          ports: draggedInfo.defaultPorts.map((p) => ({ ...p, id: generateId() })),
        });
      };

      window.addEventListener("pointerup", onPointerUp);
    },
    [addComponent, pan, zoom],
  );

  function renderPaletteIcon(type: string) {
    const Icon = INFRA_ICONS[type];
    return Icon ? <Icon size={20} /> : "\u2699";
  }

  if (!open) return null;

  const lowerSearch = search.toLowerCase();

  const filteredGrouped: [ComponentCategory, ComponentTypeInfo[]][] = [];
  for (const [cat, items] of Object.entries(grouped) as [
    ComponentCategory,
    ComponentTypeInfo[],
  ][]) {
    const filtered = items.filter((info) =>
      info.displayName.toLowerCase().includes(lowerSearch) ||
      info.type.toLowerCase().includes(lowerSearch),
    );
    if (filtered.length > 0) {
      filteredGrouped.push([cat, filtered]);
    }
  }

  return (
    <div className={styles.palette}>
      <div className={styles.paletteSearch}>
        <input
          className={styles.paletteSearchInput}
          type="text"
          placeholder="Search components..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className={styles.paletteContent}>
        {filteredGrouped.map(([category, items]) => (
          <div key={category} className={styles.paletteCategory}>
            <div className={styles.paletteCategoryTitle}>
              {CATEGORY_LABELS[category] ?? category}
            </div>
            {items.map((info) => (
              <div
                key={info.type}
                className={styles.paletteItem}
                onPointerDown={() => handlePointerDown(info)}
              >
                <span className={styles.paletteItemIcon}>
                  {renderPaletteIcon(info.type)}
                </span>
                {info.displayName}
              </div>
            ))}
          </div>
        ))}
        {filteredGrouped.length === 0 && (
          <div style={{ padding: "8px", fontSize: "13px", color: "var(--color-text-muted)" }}>
            No components found
          </div>
        )}
      </div>
    </div>
  );
}
