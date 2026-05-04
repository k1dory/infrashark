import { useStore } from './store';
import { Canvas } from './canvas/Canvas';
import { CanvasViewport } from './canvas/CanvasViewport';
import { Grid } from './canvas/Grid';
import { ConnectionsOverlay } from './connections/ConnectionsOverlay';
import { InfraNode } from './components/node/InfraNode';
import { CommentNode } from './components/node/CommentNode';
import { Toolbar } from './panels/Toolbar';
import { ComponentPalette } from './panels/ComponentPalette';
import { PropertiesPanel } from './panels/PropertiesPanel';
import { ContextMenu } from './panels/ContextMenu';
import { SearchPalette } from './panels/SearchPalette';
import { DrawingHint } from './panels/DrawingHint';
import { useKeyboardShortcuts } from './hooks/useKeyboardShortcuts';
import { useDrawingConnection } from './canvas/hooks/useDrawingConnection';
import { getRootComponents, buildChildrenMap } from './utils/tree';
import { useMemo } from 'react';

function NodeTree({ componentId, childrenMap }: {
  componentId: string;
  childrenMap: Map<string | null, import('./types/schema').InfraComponent[]>;
}) {
  const component = useStore((s) => s.components.find((c) => c.id === componentId));
  if (!component) return null;

  if (component.type === 'comment') {
    return <CommentNode component={component} />;
  }

  const children = childrenMap.get(componentId) ?? [];

  return (
    <InfraNode component={component}>
      {children.map((child) => (
        <NodeTree key={child.id} componentId={child.id} childrenMap={childrenMap} />
      ))}
    </InfraNode>
  );
}

export default function App() {
  useKeyboardShortcuts();
  useDrawingConnection();

  const components = useStore((s) => s.components);
  const componentPaletteOpen = useStore((s) => s.componentPaletteOpen);
  const propertiesPanelOpen = useStore((s) => s.propertiesPanelOpen);

  const childrenMap = useMemo(() => buildChildrenMap(components), [components]);
  const rootComponents = useMemo(() => getRootComponents(components), [components]);

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative' }}>
      <Toolbar />
      {componentPaletteOpen && <ComponentPalette />}
      <div style={{
        position: 'absolute',
        top: 48,
        left: componentPaletteOpen ? 240 : 0,
        right: propertiesPanelOpen ? 280 : 0,
        bottom: 0,
      }}>
        <Canvas>
          <Grid />
          <CanvasViewport>
            <div style={{ position: 'relative' }}>
              {rootComponents.map((comp) => (
                <NodeTree key={comp.id} componentId={comp.id} childrenMap={childrenMap} />
              ))}
            </div>
            <ConnectionsOverlay />
          </CanvasViewport>
        </Canvas>
      </div>
      {propertiesPanelOpen && <PropertiesPanel />}
      <ContextMenu />
      <SearchPalette />
      <DrawingHint />
    </div>
  );
}
