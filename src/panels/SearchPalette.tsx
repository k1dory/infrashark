import { useState, useCallback, useEffect, useRef, useMemo } from "react";
import { useStore } from "../store/index";
import { COMPONENT_TYPE_INFO } from "../types/component-types";
import type { ComponentTypeInfo } from "../types/component-types";
import { getComponentIcon } from "../components/registry/component-registry";
import { generateId } from "../utils/id";
import type { Position } from "../types/schema";
import styles from "../styles/panels.module.css";

interface SearchResult {
  id: string;
  icon: string;
  name: string;
  type: string;
  kind: "add" | "select";
  data: ComponentTypeInfo | string;
}

function screenToCanvas(screen: Position, pan: Position, zoom: number): Position {
  return {
    x: (screen.x - pan.x) / zoom,
    y: (screen.y - pan.y) / zoom,
  };
}

export function SearchPalette() {
  const open = useStore((s) => s.searchPaletteOpen);
  const setOpen = useStore((s) => s.setSearchPaletteOpen);
  const components = useStore((s) => s.components);
  const addComponent = useStore((s) => s.addComponent);
  const select = useStore((s) => s.select);
  const pan = useStore((s) => s.pan);
  const zoom = useStore((s) => s.zoom);
  const setPan = useStore((s) => s.setPan);

  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      setQuery("");
      setActiveIndex(0);
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }, [open]);

  const results = useMemo((): SearchResult[] => {
    const lower = query.toLowerCase();
    const items: SearchResult[] = [];

    for (const info of Object.values(COMPONENT_TYPE_INFO) as ComponentTypeInfo[]) {
      if (
        info.displayName.toLowerCase().includes(lower) ||
        info.type.toLowerCase().includes(lower)
      ) {
        items.push({
          id: `add-${info.type}`,
          icon: getComponentIcon(info.type),
          name: `Add ${info.displayName}`,
          type: info.category,
          kind: "add",
          data: info,
        });
      }
    }

    for (const comp of components) {
      if (
        comp.name.toLowerCase().includes(lower) ||
        comp.type.toLowerCase().includes(lower)
      ) {
        items.push({
          id: `sel-${comp.id}`,
          icon: getComponentIcon(comp.type),
          name: comp.name,
          type: comp.type,
          kind: "select",
          data: comp.id,
        });
      }
    }

    return items;
  }, [query, components]);

  const handleSelect = useCallback(
    (result: SearchResult) => {
      if (result.kind === "add") {
        const info = result.data as ComponentTypeInfo;
        const center = screenToCanvas(
          { x: window.innerWidth / 2, y: window.innerHeight / 2 },
          pan,
          zoom,
        );
        addComponent({
          id: generateId(),
          type: info.type,
          name: info.displayName,
          parentId: null,
          position: center,
          size: { ...info.defaultSize },
          config: {},
          ports: info.defaultPorts.map((p) => ({ ...p, id: generateId() })),
        });
      } else {
        const compId = result.data as string;
        select([compId]);
        const comp = components.find((c) => c.id === compId);
        if (comp) {
          setPan({
            x: window.innerWidth / 2 - comp.position.x * zoom,
            y: window.innerHeight / 2 - comp.position.y * zoom,
          });
        }
      }
      setOpen(false);
    },
    [addComponent, select, components, pan, zoom, setPan, setOpen],
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setActiveIndex((i) => Math.min(i + 1, results.length - 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setActiveIndex((i) => Math.max(i - 1, 0));
      } else if (e.key === "Enter") {
        e.preventDefault();
        if (results[activeIndex]) {
          handleSelect(results[activeIndex]);
        }
      } else if (e.key === "Escape") {
        e.preventDefault();
        setOpen(false);
      }
    },
    [results, activeIndex, handleSelect, setOpen],
  );

  if (!open) return null;

  return (
    <>
      <div
        className={styles.searchPaletteBackdrop}
        onClick={() => setOpen(false)}
      />
      <div className={styles.searchPalette}>
        <input
          ref={inputRef}
          className={styles.searchPaletteInput}
          type="text"
          placeholder="Search components or actions..."
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setActiveIndex(0);
          }}
          onKeyDown={handleKeyDown}
        />
        <div className={styles.searchPaletteResults}>
          {results.map((result, i) => (
            <div
              key={result.id}
              className={`${styles.searchPaletteItem}${i === activeIndex ? ` ${styles.active}` : ""}`}
              onClick={() => handleSelect(result)}
              onPointerEnter={() => setActiveIndex(i)}
            >
              <span className={styles.searchPaletteItemIcon}>{result.icon}</span>
              <span className={styles.searchPaletteItemName}>{result.name}</span>
              <span className={styles.searchPaletteItemType}>{result.type}</span>
            </div>
          ))}
          {results.length === 0 && query.length > 0 && (
            <div
              style={{
                padding: "12px 16px",
                fontSize: "13px",
                color: "var(--color-text-muted)",
              }}
            >
              No results found
            </div>
          )}
        </div>
      </div>
    </>
  );
}
