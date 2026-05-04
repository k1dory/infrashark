import { memo, useCallback, type ReactNode } from 'react';
import type { InfraComponent } from '../../types/schema';
import { COMPONENT_TYPE_INFO } from '../../types/component-types';
import { useStore } from '../../store';
import { useNodeDrag } from '../../canvas/hooks/useNodeDrag';
import { useNodeResize } from '../../canvas/hooks/useNodeResize';
import { NodeHeader } from './NodeHeader';
import { ConnectionAnchors } from './ConnectionAnchors';
import styles from '../../styles/node.module.css';

interface Props {
  component: InfraComponent;
  children?: ReactNode;
}

export const InfraNode = memo(function InfraNode({ component, children }: Props) {
  const selectedIds = useStore((s) => s.selectedIds);
  const select = useStore((s) => s.select);
  const addToSelection = useStore((s) => s.addToSelection);
  const showContextMenu = useStore((s) => s.showContextMenu);

  const { onPointerDown: onDragPointerDown } = useNodeDrag(component.id);
  const { onPointerDown: onResizePointerDown } = useNodeResize(component.id);

  const info = COMPONENT_TYPE_INFO[component.type];
  const isSelected = selectedIds.includes(component.id);

  const handlePointerDown = useCallback(
    (e: React.PointerEvent) => {
      if (e.button !== 0) return;
      e.stopPropagation();
      if (e.ctrlKey || e.metaKey) {
        addToSelection(component.id);
      } else {
        select([component.id]);
      }
    },
    [component.id, select, addToSelection],
  );

  const handleContextMenu = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      showContextMenu({
        x: e.clientX,
        y: e.clientY,
        targetId: component.id,
        targetType: 'component',
      });
    },
    [component.id, showContextMenu],
  );

  const classNames = [
    styles.node,
    isSelected && styles.selected,
    info.isContainer && styles.container,
    component.collapsed && styles.collapsed,
  ]
    .filter(Boolean)
    .join(' ');

  const nodeStyle: React.CSSProperties = {
    left: component.position.x,
    top: component.position.y,
    width: component.size.width,
    height: component.size.height,
  };

  if (component.style?.backgroundColor) {
    nodeStyle.backgroundColor = component.style.backgroundColor;
  }
  if (component.style?.borderColor) {
    nodeStyle.borderColor = component.style.borderColor;
  }
  if (component.style?.opacity != null) {
    nodeStyle.opacity = component.style.opacity;
  }

  return (
    <div
      className={classNames}
      style={nodeStyle}
      data-node-id={component.id}
      onPointerDown={handlePointerDown}
      onContextMenu={handleContextMenu}
    >
      <NodeHeader component={component} onPointerDown={onDragPointerDown} />
      <ConnectionAnchors
        componentId={component.id}
        nodeSize={component.size}
      />
      {info.isContainer && !component.collapsed && (
        <div className={styles.childrenArea}>{children}</div>
      )}
      <div
        className={styles.resizeHandle}
        onPointerDown={onResizePointerDown}
      />
    </div>
  );
});
