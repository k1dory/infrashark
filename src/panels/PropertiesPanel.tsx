import { useMemo, useCallback } from "react";
import { useStore } from "../store/index";
import { getComponentIcon } from "../components/registry/component-registry";
import { COMPONENT_TYPE_INFO } from "../types/component-types";
import { PROTOCOL_META } from "../types/protocols";
import type { Protocol } from "../types/protocols";
import styles from "../styles/panels.module.css";

export function PropertiesPanel() {
  const open = useStore((s) => s.propertiesPanelOpen);
  const selectedIds = useStore((s) => s.selectedIds);
  const components = useStore((s) => s.components);
  const connections = useStore((s) => s.connections);
  const updateComponent = useStore((s) => s.updateComponent);
  const updateConnection = useStore((s) => s.updateConnection);

  const selected = useMemo(() => {
    if (selectedIds.length !== 1) return null;
    const id = selectedIds[0];
    const comp = components.find((c) => c.id === id);
    if (comp) return { kind: "component" as const, data: comp };
    const conn = connections.find((c) => c.id === id);
    if (conn) return { kind: "connection" as const, data: conn };
    return null;
  }, [selectedIds, components, connections]);

  const handleNameChange = useCallback(
    (value: string) => {
      if (selected?.kind === "component") {
        updateComponent(selected.data.id, { name: value });
      }
    },
    [selected, updateComponent],
  );

  const handleConfigChange = useCallback(
    (value: string) => {
      if (selected?.kind !== "component") return;
      try {
        const parsed = JSON.parse(value);
        updateComponent(selected.data.id, { config: parsed });
      } catch {
        // invalid JSON, ignore
      }
    },
    [selected, updateComponent],
  );

  if (!open) return null;

  if (!selected) {
    return (
      <div className={styles.properties}>
        <div className={styles.propertiesHeader}>Properties</div>
        <div className={styles.propertiesContent}>
          <div style={{ fontSize: "13px", color: "var(--color-text-muted)", padding: "8px 0" }}>
            {selectedIds.length > 1
              ? `${selectedIds.length} items selected`
              : "Select a component"}
          </div>
        </div>
      </div>
    );
  }

  if (selected.kind === "connection") {
    const conn = selected.data;
    const fromComp = components.find((c) => c.id === conn.from.componentId);
    const toComp = components.find((c) => c.id === conn.to.componentId);
    const protocolKeys = Object.keys(PROTOCOL_META) as Protocol[];

    return (
      <div className={styles.properties}>
        <div className={styles.propertiesHeader}>Connection</div>
        <div className={styles.propertiesContent}>
          <div className={styles.propertiesSection}>
            <div className={styles.propertiesSectionTitle}>Protocol</div>
            <div className={styles.formField}>
              <span className={styles.formLabel}>Type</span>
              <select
                className={styles.formInput}
                value={conn.protocol}
                onChange={(e) =>
                  updateConnection(conn.id, { protocol: e.target.value as Protocol })
                }
              >
                {protocolKeys.map((p) => (
                  <option key={p} value={p}>
                    {PROTOCOL_META[p].displayName}
                    {PROTOCOL_META[p].defaultPort
                      ? ` (:${PROTOCOL_META[p].defaultPort})`
                      : ""}
                  </option>
                ))}
              </select>
            </div>
            <div className={styles.formField}>
              <span className={styles.formLabel}>Label</span>
              <input
                className={styles.formInput}
                value={conn.label ?? ""}
                placeholder="e.g. HTTPS :443"
                onChange={(e) =>
                  updateConnection(conn.id, { label: e.target.value })
                }
              />
            </div>
          </div>

          <div className={styles.propertiesSection}>
            <div className={styles.propertiesSectionTitle}>Style</div>
            <div className={styles.formField}>
              <label style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12 }}>
                <input
                  type="checkbox"
                  checked={conn.style?.animated ?? true}
                  onChange={(e) =>
                    updateConnection(conn.id, {
                      style: { ...conn.style, animated: e.target.checked },
                    })
                  }
                />
                Animated flow
              </label>
            </div>
            <div className={styles.formField}>
              <label style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12 }}>
                <input
                  type="checkbox"
                  checked={conn.style?.dashed ?? false}
                  onChange={(e) =>
                    updateConnection(conn.id, {
                      style: { ...conn.style, dashed: e.target.checked },
                    })
                  }
                />
                Dashed
              </label>
            </div>
            <div className={styles.formField}>
              <span className={styles.formLabel}>Custom color (optional)</span>
              <input
                className={styles.formInput}
                type="text"
                placeholder={PROTOCOL_META[conn.protocol]?.color ?? "#6366f1"}
                value={conn.style?.color ?? ""}
                onChange={(e) =>
                  updateConnection(conn.id, {
                    style: { ...conn.style, color: e.target.value || undefined },
                  })
                }
              />
            </div>
          </div>

          <div className={styles.propertiesSection}>
            <div className={styles.propertiesSectionTitle}>From</div>
            <div className={styles.formField}>
              <span className={styles.formLabel}>Component</span>
              <input
                className={styles.formInput}
                value={fromComp?.name ?? conn.from.componentId}
                readOnly
              />
            </div>
          </div>

          <div className={styles.propertiesSection}>
            <div className={styles.propertiesSectionTitle}>To</div>
            <div className={styles.formField}>
              <span className={styles.formLabel}>Component</span>
              <input
                className={styles.formInput}
                value={toComp?.name ?? conn.to.componentId}
                readOnly
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

  const comp = selected.data;
  const typeInfo = COMPONENT_TYPE_INFO[comp.type];
  const icon = getComponentIcon(comp.type);

  return (
    <div className={styles.properties}>
      <div className={styles.propertiesHeader}>
        {icon} {typeInfo.displayName}
      </div>
      <div className={styles.propertiesContent}>
        <div className={styles.propertiesSection}>
          <div className={styles.propertiesSectionTitle}>General</div>
          <div className={styles.formField}>
            <span className={styles.formLabel}>Name</span>
            <input
              className={styles.formInput}
              value={comp.name}
              onChange={(e) => handleNameChange(e.target.value)}
            />
          </div>
          <div className={styles.formField}>
            <span className={styles.formLabel}>Type</span>
            <input className={styles.formInput} value={comp.type} readOnly />
          </div>
          <div className={styles.formField}>
            <span className={styles.formLabel}>ID</span>
            <input
              className={styles.formInput}
              value={comp.id}
              readOnly
              style={{ fontSize: "11px" }}
            />
          </div>
        </div>

        <div className={styles.propertiesSection}>
          <div className={styles.propertiesSectionTitle}>Position & Size</div>
          <div className={styles.formField}>
            <span className={styles.formLabel}>X</span>
            <input
              className={styles.formInput}
              type="number"
              value={Math.round(comp.position.x)}
              onChange={(e) =>
                updateComponent(comp.id, {
                  position: { ...comp.position, x: Number(e.target.value) },
                })
              }
            />
          </div>
          <div className={styles.formField}>
            <span className={styles.formLabel}>Y</span>
            <input
              className={styles.formInput}
              type="number"
              value={Math.round(comp.position.y)}
              onChange={(e) =>
                updateComponent(comp.id, {
                  position: { ...comp.position, y: Number(e.target.value) },
                })
              }
            />
          </div>
          <div className={styles.formField}>
            <span className={styles.formLabel}>Width</span>
            <input
              className={styles.formInput}
              type="number"
              value={comp.size.width}
              onChange={(e) =>
                updateComponent(comp.id, {
                  size: { ...comp.size, width: Number(e.target.value) },
                })
              }
            />
          </div>
          <div className={styles.formField}>
            <span className={styles.formLabel}>Height</span>
            <input
              className={styles.formInput}
              type="number"
              value={comp.size.height}
              onChange={(e) =>
                updateComponent(comp.id, {
                  size: { ...comp.size, height: Number(e.target.value) },
                })
              }
            />
          </div>
        </div>

        {comp.ports.length > 0 && (
          <div className={styles.propertiesSection}>
            <div className={styles.propertiesSectionTitle}>Ports</div>
            {comp.ports.map((port) => (
              <div key={port.id} className={styles.formField}>
                <span className={styles.formLabel}>
                  {port.name} ({port.protocol})
                </span>
                <input
                  className={styles.formInput}
                  value={port.number}
                  readOnly
                />
              </div>
            ))}
          </div>
        )}

        <div className={styles.propertiesSection}>
          <div className={styles.propertiesSectionTitle}>Configuration</div>
          <div className={styles.formField}>
            <textarea
              className={styles.formTextarea}
              value={JSON.stringify(comp.config, null, 2)}
              onChange={(e) => handleConfigChange(e.target.value)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
