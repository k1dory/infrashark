import { memo, useState, useCallback, useRef, useEffect } from 'react';
import type { InfraComponent } from '../../types/schema';
import { COMPONENT_TYPE_INFO } from '../../types/component-types';
import { useStore } from '../../store';
import { INFRA_ICONS } from '../registry/icons';
import styles from '../../styles/node.module.css';

interface Props {
  component: InfraComponent;
  onPointerDown: (e: React.PointerEvent) => void;
}

export const NodeHeader = memo(function NodeHeader({ component, onPointerDown }: Props) {
  const toggleCollapse = useStore((s) => s.toggleCollapse);
  const updateComponent = useStore((s) => s.updateComponent);
  const info = COMPONENT_TYPE_INFO[component.type];

  const [editing, setEditing] = useState(false);
  const [editValue, setEditValue] = useState(component.name);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (editing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [editing]);

  const handleDoubleClick = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      setEditValue(component.name);
      setEditing(true);
    },
    [component.name],
  );

  const commitRename = useCallback(() => {
    const trimmed = editValue.trim();
    if (trimmed && trimmed !== component.name) {
      updateComponent(component.id, { name: trimmed });
    }
    setEditing(false);
  }, [editValue, component.name, component.id, updateComponent]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      e.stopPropagation();
      if (e.key === 'Enter') {
        commitRename();
      } else if (e.key === 'Escape') {
        setEditing(false);
      }
    },
    [commitRename],
  );

  return (
    <div
      className={styles.header}
      onPointerDown={editing ? undefined : onPointerDown}
    >
      <span className={styles.headerIcon}>
        {renderIcon(component.type)}
      </span>
      {editing ? (
        <input
          ref={inputRef}
          className={styles.headerNameInput}
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
          onBlur={commitRename}
          onKeyDown={handleKeyDown}
          onPointerDown={(e) => e.stopPropagation()}
        />
      ) : (
        <span
          className={`${styles.headerName} ${styles.headerNameEditable}`}
          onDoubleClick={handleDoubleClick}
          title="Double-click to rename"
        >
          {component.name}
        </span>
      )}
      <span className={styles.headerType}>{info.displayName}</span>
      {info.isContainer && (
        <button
          className={styles.collapseBtn}
          onClick={(e) => {
            e.stopPropagation();
            toggleCollapse(component.id);
          }}
          type="button"
        >
          {component.collapsed ? '\u25B6' : '\u25BC'}
        </button>
      )}
    </div>
  );
});

function renderIcon(type: string) {
  const IconComponent = INFRA_ICONS[type];
  if (IconComponent) {
    return <IconComponent size={18} />;
  }
  return '\u2699';
}
