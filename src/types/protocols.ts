export type Protocol =
  | "HTTP"
  | "HTTPS"
  | "HTTP/3"
  | "gRPC"
  | "REST"
  | "WebSocket"
  | "TCP"
  | "UDP"
  | "AMQP"
  | "MQTT"
  | "VLESS"
  | "VMess"
  | "Trojan"
  | "PostgreSQL"
  | "Redis"
  | "MongoDB"
  | "SSH"
  | "FTP"
  | "custom";

export interface ProtocolMeta {
  displayName: string;
  color: string;
  defaultPort?: number;
}

export const PROTOCOL_META: Record<Protocol, ProtocolMeta> = {
  HTTP: {
    displayName: "HTTP",
    color: "#4CAF50",
    defaultPort: 80,
  },
  HTTPS: {
    displayName: "HTTPS",
    color: "#2E7D32",
    defaultPort: 443,
  },
  "HTTP/3": {
    displayName: "HTTP/3 (QUIC)",
    color: "#1B5E20",
    defaultPort: 443,
  },
  gRPC: {
    displayName: "gRPC",
    color: "#2196F3",
    defaultPort: 50051,
  },
  REST: {
    displayName: "REST API",
    color: "#42A5F5",
    defaultPort: 443,
  },
  WebSocket: {
    displayName: "WebSocket",
    color: "#7C4DFF",
    defaultPort: 443,
  },
  TCP: {
    displayName: "TCP",
    color: "#78909C",
  },
  UDP: {
    displayName: "UDP",
    color: "#90A4AE",
  },
  AMQP: {
    displayName: "AMQP",
    color: "#FF6F00",
    defaultPort: 5672,
  },
  MQTT: {
    displayName: "MQTT",
    color: "#7B1FA2",
    defaultPort: 1883,
  },
  VLESS: {
    displayName: "VLESS",
    color: "#E040FB",
    defaultPort: 443,
  },
  VMess: {
    displayName: "VMess",
    color: "#CE93D8",
    defaultPort: 443,
  },
  Trojan: {
    displayName: "Trojan",
    color: "#AB47BC",
    defaultPort: 443,
  },
  PostgreSQL: {
    displayName: "PostgreSQL",
    color: "#336791",
    defaultPort: 5432,
  },
  Redis: {
    displayName: "Redis",
    color: "#D32F2F",
    defaultPort: 6379,
  },
  MongoDB: {
    displayName: "MongoDB",
    color: "#4DB33D",
    defaultPort: 27017,
  },
  SSH: {
    displayName: "SSH",
    color: "#37474F",
    defaultPort: 22,
  },
  FTP: {
    displayName: "FTP",
    color: "#8D6E63",
    defaultPort: 21,
  },
  custom: {
    displayName: "Custom",
    color: "#9E9E9E",
  },
} as const;
