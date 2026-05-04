import { memo, useState, useCallback, useRef, useEffect } from 'react';
import type { InfraComponent } from '../../types/schema';
import { useStore } from '../../store';
import { useNodeDrag } from '../../canvas/hooks/useNodeDrag';
import { useNodeResize } from '../../canvas/hooks/useNodeResize';
import styles from '../../styles/node.module.css';

interface Props {
  component: InfraComponent;
}

export const CommentNode = memo(function CommentNode({ component }: Props) {
  const selectedIds = useStore((s) => s.selectedIds);
  const select = useStore((s) => s.select);
  const updateComponent = useStore((s) => s.updateComponent);
  const showContextMenu = useStore((s) => s.showContextMenu);

  const isSelected = selectedIds.includes(component.id);
  const text = (component.config?.text as string | undefined) ?? '';

  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(text);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (editing && textareaRef.current) {
      textareaRef.current.focus();
      textareaRef.current.select();
    }
  }, [editing]);

  const { onPointerDown: onDragPointerDown } = useNodeDrag(component.id);
  const { onPointerDown: onResizePointerDown } = useNodeResize(component.id);

  const handlePointerDown = useCallback(
    (e: React.PointerEvent) => {
      if (e.button !== 0) return;
      e.stopPropagation();
      select([component.id]);
    },
    [component.id, select],
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

  const startEdit = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      setDraft(text);
      setEditing(true);
    },
    [text],
  );

  const commitEdit = useCallback(() => {
    setEditing(false);
    if (draft !== text) {
      updateComponent(component.id, { config: { ...component.config, text: draft } });
    }
  }, [draft, text, component.id, component.config, updateComponent]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      e.stopPropagation();
      if (e.key === 'Escape') {
        setEditing(false);
      }
    },
    [],
  );

  const classNames = [
    styles.node,
    styles.commentNode,
    isSelected && styles.selected,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div
      className={classNames}
      style={{
        left: component.position.x,
        top: component.position.y,
        width: component.size.width,
        height: component.size.height,
      }}
      data-node-id={component.id}
      onPointerDown={handlePointerDown}
      onContextMenu={handleContextMenu}
    >
      <div className={styles.header} onPointerDown={onDragPointerDown}>
        <span className={styles.headerIcon}>📝</span>
        <span className={styles.headerName}>{component.name}</span>
      </div>
      {editing ? (
        <textarea
          ref={textareaRef}
          className={styles.commentBodyEdit}
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onBlur={commitEdit}
          onKeyDown={handleKeyDown}
          onPointerDown={(e) => e.stopPropagation()}
          placeholder="Type comment..."
        />
      ) : (
        <div
          className={styles.commentBody}
          onDoubleClick={startEdit}
          title="Double-click to edit"
        >
          {text || <span style={{ color: '#78350f', opacity: 0.6 }}>Double-click to edit comment</span>}
        </div>
      )}
      <div
        className={styles.resizeHandle}
        onPointerDown={onResizePointerDown}
      />
    </div>
  );
});
