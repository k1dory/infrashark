import type { Protocol } from "./protocols";
import type { ComponentType, ComponentCategory } from "./component-types";

export interface Position {
  x: number;
  y: number;
}

export interface Size {
  width: number;
  height: number;
}

export interface Rect {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface InfraDocument {
  version: "1.0";
  meta: DocumentMeta;
  components: InfraComponent[];
  connections: Connection[];
  customTypes?: CustomTypeDefinition[];
}

export interface DocumentMeta {
  name: string;
  description?: string;
  author?: string;
  created: string;
  updated: string;
}

export interface InfraComponent {
  id: string;
  type: ComponentType;
  name: string;
  parentId: string | null;
  position: Position;
  size: Size;
  config: Record<string, unknown>;
  ports: Port[];
  collapsed?: boolean;
  style?: NodeStyle;
  meta?: Record<string, unknown>;
}

export interface Port {
  id: string;
  name: string;
  number: number;
  protocol: Protocol;
  side: "top" | "right" | "bottom" | "left";
}

export interface Connection {
  id: string;
  from: ConnectionEndpoint;
  to: ConnectionEndpoint;
  protocol: Protocol;
  label?: string;
  style?: ConnectionStyle;
  meta?: Record<string, unknown>;
}

export interface ConnectionEndpoint {
  componentId: string;
  portId?: string;
}

export interface NodeStyle {
  backgroundColor?: string;
  borderColor?: string;
  textColor?: string;
  opacity?: number;
}

export interface ConnectionStyle {
  color?: string;
  strokeWidth?: number;
  dashed?: boolean;
  animated?: boolean;
}

export interface CustomTypeDefinition {
  type: string;
  displayName: string;
  category: ComponentCategory;
  isContainer: boolean;
  defaultSize: Size;
  defaultPorts: Omit<Port, "id">[];
  style: NodeStyle;
  icon?: string;
}
