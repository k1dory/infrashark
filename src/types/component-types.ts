import type { Protocol } from "./protocols";

export type ComponentType =
  | "vps"
  | "docker"
  | "docker-compose"
  | "container"
  | "app"
  | "nginx"
  | "traefik"
  | "haproxy"
  | "caddy"
  | "rabbitmq"
  | "kafka"
  | "nats"
  | "postgresql"
  | "mysql"
  | "redis"
  | "mongodb"
  | "clickhouse"
  | "elasticsearch"
  | "kubernetes"
  | "k8s-pod"
  | "k8s-service"
  | "k8s-deployment"
  | "k8s-ingress"
  | "load-balancer"
  | "firewall"
  | "network"
  | "dns"
  | "volume"
  | "s3-bucket"
  | "prometheus"
  | "grafana"
  | "loki"
  | "vault"
  | "consul"
  | "etcd"
  | "gitlab-ci"
  | "github-actions"
  | "jenkins"
  | "api-gateway"
  | "comment"
  | "custom";

export type ComponentCategory =
  | "infrastructure"
  | "container"
  | "service"
  | "database"
  | "monitoring"
  | "ci-cd"
  | "network"
  | "storage"
  | "application"
  | "custom";

export interface DefaultPort {
  name: string;
  number: number;
  protocol: Protocol;
  side: "top" | "right" | "bottom" | "left";
}

export interface ComponentTypeInfo {
  type: ComponentType;
  displayName: string;
  category: ComponentCategory;
  isContainer: boolean;
  allowedChildren?: ComponentType[];
  defaultSize: { width: number; height: number };
  defaultPorts: DefaultPort[];
  icon: string;
}

const GENERAL_CHILDREN: ComponentType[] = [
  "docker",
  "docker-compose",
  "container",
  "app",
  "nginx",
  "traefik",
  "haproxy",
  "caddy",
  "rabbitmq",
  "kafka",
  "nats",
  "postgresql",
  "mysql",
  "redis",
  "mongodb",
  "clickhouse",
  "elasticsearch",
  "kubernetes",
  "k8s-pod",
  "k8s-service",
  "k8s-deployment",
  "k8s-ingress",
  "load-balancer",
  "firewall",
  "network",
  "volume",
  "s3-bucket",
  "prometheus",
  "grafana",
  "loki",
  "vault",
  "consul",
  "etcd",
  "gitlab-ci",
  "github-actions",
  "jenkins",
  "api-gateway",
  "custom",
];

const COMPOSE_CHILDREN: ComponentType[] = [
  "container",
  "app",
  "nginx",
  "traefik",
  "caddy",
  "rabbitmq",
  "kafka",
  "nats",
  "postgresql",
  "mysql",
  "redis",
  "mongodb",
  "clickhouse",
  "elasticsearch",
  "prometheus",
  "grafana",
  "loki",
  "vault",
  "consul",
  "etcd",
  "volume",
  "network",
  "custom",
];

const K8S_CHILDREN: ComponentType[] = [
  "k8s-pod",
  "k8s-service",
  "k8s-deployment",
  "k8s-ingress",
  "container",
  "app",
  "load-balancer",
  "volume",
  "custom",
];

// ---------------------------------------------------------------------------
// Metadata registry -- exhaustive over ComponentType
// ---------------------------------------------------------------------------

export const COMPONENT_TYPE_INFO: Record<ComponentType, ComponentTypeInfo> = {
  // ── Infrastructure ──────────────────────────────────────────────────
  vps: {
    type: "vps",
    displayName: "VPS / Server",
    category: "infrastructure",
    isContainer: true,
    allowedChildren: GENERAL_CHILDREN,
    defaultSize: { width: 480, height: 360 },
    defaultPorts: [
      { name: "SSH", number: 22, protocol: "SSH", side: "left" },
      { name: "HTTP", number: 80, protocol: "HTTP", side: "top" },
      { name: "HTTPS", number: 443, protocol: "HTTPS", side: "top" },
    ],
    icon: "server",
  },

  // ── Container runtimes ──────────────────────────────────────────────
  docker: {
    type: "docker",
    displayName: "Docker Host",
    category: "container",
    isContainer: true,
    allowedChildren: COMPOSE_CHILDREN,
    defaultSize: { width: 420, height: 320 },
    defaultPorts: [
      { name: "Docker API", number: 2375, protocol: "TCP", side: "left" },
    ],
    icon: "docker",
  },
  "docker-compose": {
    type: "docker-compose",
    displayName: "Docker Compose",
    category: "container",
    isContainer: true,
    allowedChildren: COMPOSE_CHILDREN,
    defaultSize: { width: 440, height: 340 },
    defaultPorts: [],
    icon: "docker-compose",
  },
  container: {
    type: "container",
    displayName: "Container",
    category: "container",
    isContainer: true,
    allowedChildren: ["app", "volume", "custom"],
    defaultSize: { width: 200, height: 100 },
    defaultPorts: [
      { name: "HTTP", number: 8080, protocol: "HTTP", side: "right" },
    ],
    icon: "container",
  },

  // ── Applications ────────────────────────────────────────────────────
  app: {
    type: "app",
    displayName: "Application",
    category: "application",
    isContainer: false,
    defaultSize: { width: 160, height: 70 },
    defaultPorts: [
      { name: "HTTP", number: 8080, protocol: "HTTP", side: "right" },
    ],
    icon: "app",
  },

  // ── Reverse proxies / web servers ───────────────────────────────────
  nginx: {
    type: "nginx",
    displayName: "Nginx",
    category: "service",
    isContainer: false,
    defaultSize: { width: 180, height: 80 },
    defaultPorts: [
      { name: "HTTP", number: 80, protocol: "HTTP", side: "left" },
      { name: "HTTPS", number: 443, protocol: "HTTPS", side: "left" },
      { name: "Upstream", number: 8080, protocol: "HTTP", side: "right" },
    ],
    icon: "nginx",
  },
  traefik: {
    type: "traefik",
    displayName: "Traefik",
    category: "service",
    isContainer: false,
    defaultSize: { width: 180, height: 80 },
    defaultPorts: [
      { name: "HTTP", number: 80, protocol: "HTTP", side: "left" },
      { name: "HTTPS", number: 443, protocol: "HTTPS", side: "left" },
      { name: "Dashboard", number: 8080, protocol: "HTTP", side: "bottom" },
    ],
    icon: "traefik",
  },
  haproxy: {
    type: "haproxy",
    displayName: "HAProxy",
    category: "service",
    isContainer: false,
    defaultSize: { width: 180, height: 80 },
    defaultPorts: [
      { name: "Frontend", number: 80, protocol: "HTTP", side: "left" },
      { name: "Stats", number: 8404, protocol: "HTTP", side: "bottom" },
      { name: "Backend", number: 8080, protocol: "HTTP", side: "right" },
    ],
    icon: "haproxy",
  },
  caddy: {
    type: "caddy",
    displayName: "Caddy",
    category: "service",
    isContainer: false,
    defaultSize: { width: 180, height: 80 },
    defaultPorts: [
      { name: "HTTP", number: 80, protocol: "HTTP", side: "left" },
      { name: "HTTPS", number: 443, protocol: "HTTPS", side: "left" },
      { name: "Admin", number: 2019, protocol: "HTTP", side: "bottom" },
    ],
    icon: "caddy",
  },

  // ── Message brokers ─────────────────────────────────────────────────
  rabbitmq: {
    type: "rabbitmq",
    displayName: "RabbitMQ",
    category: "service",
    isContainer: false,
    defaultSize: { width: 180, height: 80 },
    defaultPorts: [
      { name: "AMQP", number: 5672, protocol: "AMQP", side: "left" },
      { name: "Management", number: 15672, protocol: "HTTP", side: "bottom" },
    ],
    icon: "rabbitmq",
  },
  kafka: {
    type: "kafka",
    displayName: "Apache Kafka",
    category: "service",
    isContainer: false,
    defaultSize: { width: 180, height: 80 },
    defaultPorts: [
      { name: "Broker", number: 9092, protocol: "TCP", side: "left" },
      { name: "Controller", number: 9093, protocol: "TCP", side: "right" },
    ],
    icon: "kafka",
  },
  nats: {
    type: "nats",
    displayName: "NATS",
    category: "service",
    isContainer: false,
    defaultSize: { width: 180, height: 80 },
    defaultPorts: [
      { name: "Client", number: 4222, protocol: "TCP", side: "left" },
      { name: "Monitor", number: 8222, protocol: "HTTP", side: "bottom" },
    ],
    icon: "nats",
  },

  // ── Databases ───────────────────────────────────────────────────────
  postgresql: {
    type: "postgresql",
    displayName: "PostgreSQL",
    category: "database",
    isContainer: false,
    defaultSize: { width: 180, height: 80 },
    defaultPorts: [
      { name: "PostgreSQL", number: 5432, protocol: "PostgreSQL", side: "left" },
    ],
    icon: "postgresql",
  },
  mysql: {
    type: "mysql",
    displayName: "MySQL",
    category: "database",
    isContainer: false,
    defaultSize: { width: 180, height: 80 },
    defaultPorts: [
      { name: "MySQL", number: 3306, protocol: "TCP", side: "left" },
    ],
    icon: "mysql",
  },
  redis: {
    type: "redis",
    displayName: "Redis",
    category: "database",
    isContainer: false,
    defaultSize: { width: 180, height: 80 },
    defaultPorts: [
      { name: "Redis", number: 6379, protocol: "Redis", side: "left" },
    ],
    icon: "redis",
  },
  mongodb: {
    type: "mongodb",
    displayName: "MongoDB",
    category: "database",
    isContainer: false,
    defaultSize: { width: 180, height: 80 },
    defaultPorts: [
      { name: "MongoDB", number: 27017, protocol: "MongoDB", side: "left" },
    ],
    icon: "mongodb",
  },
  clickhouse: {
    type: "clickhouse",
    displayName: "ClickHouse",
    category: "database",
    isContainer: false,
    defaultSize: { width: 180, height: 80 },
    defaultPorts: [
      { name: "HTTP", number: 8123, protocol: "HTTP", side: "left" },
      { name: "Native", number: 9000, protocol: "TCP", side: "right" },
    ],
    icon: "clickhouse",
  },
  elasticsearch: {
    type: "elasticsearch",
    displayName: "Elasticsearch",
    category: "database",
    isContainer: false,
    defaultSize: { width: 180, height: 80 },
    defaultPorts: [
      { name: "REST", number: 9200, protocol: "REST", side: "left" },
      { name: "Transport", number: 9300, protocol: "TCP", side: "right" },
    ],
    icon: "elasticsearch",
  },

  // ── Kubernetes ──────────────────────────────────────────────────────
  kubernetes: {
    type: "kubernetes",
    displayName: "Kubernetes Cluster",
    category: "infrastructure",
    isContainer: true,
    allowedChildren: K8S_CHILDREN,
    defaultSize: { width: 520, height: 400 },
    defaultPorts: [
      { name: "API Server", number: 6443, protocol: "HTTPS", side: "top" },
    ],
    icon: "kubernetes",
  },
  "k8s-pod": {
    type: "k8s-pod",
    displayName: "Pod",
    category: "container",
    isContainer: true,
    allowedChildren: ["container", "app", "volume", "custom"],
    defaultSize: { width: 240, height: 140 },
    defaultPorts: [],
    icon: "k8s-pod",
  },
  "k8s-service": {
    type: "k8s-service",
    displayName: "Service",
    category: "network",
    isContainer: false,
    defaultSize: { width: 180, height: 80 },
    defaultPorts: [
      { name: "ClusterIP", number: 80, protocol: "TCP", side: "left" },
      { name: "Target", number: 8080, protocol: "TCP", side: "right" },
    ],
    icon: "k8s-service",
  },
  "k8s-deployment": {
    type: "k8s-deployment",
    displayName: "Deployment",
    category: "container",
    isContainer: true,
    allowedChildren: ["k8s-pod", "container", "app", "custom"],
    defaultSize: { width: 380, height: 260 },
    defaultPorts: [],
    icon: "k8s-deployment",
  },
  "k8s-ingress": {
    type: "k8s-ingress",
    displayName: "Ingress",
    category: "network",
    isContainer: false,
    defaultSize: { width: 180, height: 80 },
    defaultPorts: [
      { name: "HTTP", number: 80, protocol: "HTTP", side: "left" },
      { name: "HTTPS", number: 443, protocol: "HTTPS", side: "left" },
      { name: "Backend", number: 8080, protocol: "HTTP", side: "right" },
    ],
    icon: "k8s-ingress",
  },

  // ── Network ─────────────────────────────────────────────────────────
  "load-balancer": {
    type: "load-balancer",
    displayName: "Load Balancer",
    category: "network",
    isContainer: false,
    defaultSize: { width: 180, height: 80 },
    defaultPorts: [
      { name: "Frontend", number: 443, protocol: "HTTPS", side: "left" },
      { name: "Backend", number: 8080, protocol: "HTTP", side: "right" },
    ],
    icon: "load-balancer",
  },
  firewall: {
    type: "firewall",
    displayName: "Firewall",
    category: "network",
    isContainer: false,
    defaultSize: { width: 180, height: 80 },
    defaultPorts: [
      { name: "Ingress", number: 443, protocol: "TCP", side: "left" },
      { name: "Egress", number: 443, protocol: "TCP", side: "right" },
    ],
    icon: "firewall",
  },
  network: {
    type: "network",
    displayName: "Network / Subnet",
    category: "network",
    isContainer: true,
    allowedChildren: GENERAL_CHILDREN,
    defaultSize: { width: 460, height: 340 },
    defaultPorts: [],
    icon: "network",
  },
  dns: {
    type: "dns",
    displayName: "DNS",
    category: "network",
    isContainer: false,
    defaultSize: { width: 180, height: 80 },
    defaultPorts: [
      { name: "DNS", number: 53, protocol: "UDP", side: "top" },
    ],
    icon: "dns",
  },
  "api-gateway": {
    type: "api-gateway",
    displayName: "API Gateway",
    category: "network",
    isContainer: false,
    defaultSize: { width: 180, height: 80 },
    defaultPorts: [
      { name: "HTTPS", number: 443, protocol: "HTTPS", side: "left" },
      { name: "Upstream", number: 8080, protocol: "HTTP", side: "right" },
    ],
    icon: "api-gateway",
  },

  // ── Storage ─────────────────────────────────────────────────────────
  volume: {
    type: "volume",
    displayName: "Volume",
    category: "storage",
    isContainer: false,
    defaultSize: { width: 140, height: 60 },
    defaultPorts: [],
    icon: "volume",
  },
  "s3-bucket": {
    type: "s3-bucket",
    displayName: "S3 Bucket",
    category: "storage",
    isContainer: false,
    defaultSize: { width: 160, height: 70 },
    defaultPorts: [
      { name: "HTTPS", number: 443, protocol: "HTTPS", side: "left" },
    ],
    icon: "s3-bucket",
  },

  // ── Monitoring ──────────────────────────────────────────────────────
  prometheus: {
    type: "prometheus",
    displayName: "Prometheus",
    category: "monitoring",
    isContainer: false,
    defaultSize: { width: 180, height: 80 },
    defaultPorts: [
      { name: "HTTP", number: 9090, protocol: "HTTP", side: "left" },
    ],
    icon: "prometheus",
  },
  grafana: {
    type: "grafana",
    displayName: "Grafana",
    category: "monitoring",
    isContainer: false,
    defaultSize: { width: 180, height: 80 },
    defaultPorts: [
      { name: "HTTP", number: 3000, protocol: "HTTP", side: "left" },
    ],
    icon: "grafana",
  },
  loki: {
    type: "loki",
    displayName: "Loki",
    category: "monitoring",
    isContainer: false,
    defaultSize: { width: 180, height: 80 },
    defaultPorts: [
      { name: "HTTP", number: 3100, protocol: "HTTP", side: "left" },
      { name: "gRPC", number: 9095, protocol: "gRPC", side: "right" },
    ],
    icon: "loki",
  },

  // ── Secrets / Service discovery ─────────────────────────────────────
  vault: {
    type: "vault",
    displayName: "HashiCorp Vault",
    category: "service",
    isContainer: false,
    defaultSize: { width: 180, height: 80 },
    defaultPorts: [
      { name: "HTTP", number: 8200, protocol: "HTTP", side: "left" },
    ],
    icon: "vault",
  },
  consul: {
    type: "consul",
    displayName: "HashiCorp Consul",
    category: "service",
    isContainer: false,
    defaultSize: { width: 180, height: 80 },
    defaultPorts: [
      { name: "HTTP", number: 8500, protocol: "HTTP", side: "left" },
      { name: "DNS", number: 8600, protocol: "UDP", side: "top" },
      { name: "gRPC", number: 8502, protocol: "gRPC", side: "right" },
    ],
    icon: "consul",
  },
  etcd: {
    type: "etcd",
    displayName: "etcd",
    category: "service",
    isContainer: false,
    defaultSize: { width: 180, height: 80 },
    defaultPorts: [
      { name: "Client", number: 2379, protocol: "gRPC", side: "left" },
      { name: "Peer", number: 2380, protocol: "gRPC", side: "right" },
    ],
    icon: "etcd",
  },

  // ── CI / CD ─────────────────────────────────────────────────────────
  "gitlab-ci": {
    type: "gitlab-ci",
    displayName: "GitLab CI",
    category: "ci-cd",
    isContainer: false,
    defaultSize: { width: 180, height: 80 },
    defaultPorts: [
      { name: "HTTPS", number: 443, protocol: "HTTPS", side: "left" },
    ],
    icon: "gitlab-ci",
  },
  "github-actions": {
    type: "github-actions",
    displayName: "GitHub Actions",
    category: "ci-cd",
    isContainer: false,
    defaultSize: { width: 180, height: 80 },
    defaultPorts: [
      { name: "HTTPS", number: 443, protocol: "HTTPS", side: "left" },
    ],
    icon: "github-actions",
  },
  jenkins: {
    type: "jenkins",
    displayName: "Jenkins",
    category: "ci-cd",
    isContainer: false,
    defaultSize: { width: 180, height: 80 },
    defaultPorts: [
      { name: "HTTP", number: 8080, protocol: "HTTP", side: "left" },
      { name: "Agent", number: 50000, protocol: "TCP", side: "right" },
    ],
    icon: "jenkins",
  },

  comment: {
    type: "comment",
    displayName: "Comment",
    category: "custom",
    isContainer: false,
    defaultSize: { width: 220, height: 100 },
    defaultPorts: [],
    icon: "comment",
  },

  custom: {
    type: "custom",
    displayName: "Custom",
    category: "custom",
    isContainer: false,
    defaultSize: { width: 160, height: 70 },
    defaultPorts: [],
    icon: "custom",
  },
} as const;

// ---------------------------------------------------------------------------
// Derived helpers
// ---------------------------------------------------------------------------

/** All component types that are containers (can host children). */
export const CONTAINER_TYPES: readonly ComponentType[] = (
  Object.values(COMPONENT_TYPE_INFO) as ComponentTypeInfo[]
)
  .filter((info) => info.isContainer)
  .map((info) => info.type);

/** Group component types by category for palette rendering. */
export function getComponentsByCategory(): Record<
  ComponentCategory,
  ComponentTypeInfo[]
> {
  const result = {} as Record<ComponentCategory, ComponentTypeInfo[]>;
  for (const info of Object.values(
    COMPONENT_TYPE_INFO,
  ) as ComponentTypeInfo[]) {
    (result[info.category] ??= []).push(info);
  }
  return result;
}
