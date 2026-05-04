import React from "react";

interface IconProps {
  size?: number;
}

function DockerIcon({ size = 20 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path
        d="M13 3h2v2h-2V3zm-3 0h2v2h-2V3zm-3 0h2v2H7V3zm9 0h2v2h-2V3zm-9 3h2v2H7V6zm3 0h2v2h-2V6zm3 0h2v2h-2V6zm3 0h2v2h-2V6zM4 9h2v2H4V9zm3 0h2v2H7V9zm3 0h2v2h-2V9zm3 0h2v2h-2V9zm3 0h2v2h-2V9z"
        fill="#2496ED"
      />
      <path
        d="M22 11.5c-.4-.3-1.3-.5-2-.4-.2-1-1-1.9-1.8-2.4l-.4-.2-.3.4c-.3.5-.5 1.2-.4 1.8.1.4.2.8.5 1.1-.4.2-.8.4-1.2.5-.5.1-1 .2-1.5.2H1.8l-.1.5c-.1 1.1 0 2.2.4 3.2.5 1.1 1.3 2 2.4 2.5 1.3.6 3.4.8 5.6.1.9-.3 1.7-.7 2.5-1.3 1.2-1 2.1-2.3 2.7-3.8h.2c.8 0 1.4-.3 1.8-.7.3-.2.4-.6.6-.9l.1-.3-.3-.3z"
        fill="#2496ED"
      />
    </svg>
  );
}

function DockerComposeIcon({ size = 20 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <rect x="3" y="4" width="7" height="5" rx="1" fill="#2496ED" />
      <rect x="14" y="4" width="7" height="5" rx="1" fill="#2496ED" />
      <rect x="3" y="11" width="7" height="5" rx="1" fill="#2496ED" opacity="0.7" />
      <rect x="14" y="11" width="7" height="5" rx="1" fill="#2496ED" opacity="0.7" />
      <rect x="8.5" y="18" width="7" height="3" rx="1" fill="#2496ED" opacity="0.5" />
      <line x1="12" y1="9" x2="12" y2="11" stroke="#2496ED" strokeWidth="1.5" />
      <line x1="6.5" y1="16" x2="12" y2="18" stroke="#2496ED" strokeWidth="1" />
      <line x1="17.5" y1="16" x2="12" y2="18" stroke="#2496ED" strokeWidth="1" />
    </svg>
  );
}

function KubernetesIcon({ size = 20 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path
        d="M12 2l9.5 5.5v11L12 24l-9.5-5.5v-11L12 2z"
        fill="#326CE5"
        fillOpacity="0.15"
        stroke="#326CE5"
        strokeWidth="1.5"
      />
      <path
        d="M12 7v10M7.5 9.5L12 12l4.5-2.5M7.5 14.5L12 12l4.5 2.5"
        stroke="#326CE5"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <circle cx="12" cy="12" r="2" fill="#326CE5" />
    </svg>
  );
}

function NginxIcon({ size = 20 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M12 2L3 7v10l9 5 9-5V7l-9-5z" fill="#009639" />
      <path
        d="M8 16V8l8 8V8"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function PostgresqlIcon({ size = 20 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path
        d="M17.5 7.5c0-3-2.5-5-5.5-5S6 4.5 6 7.5c0 2.5 1.5 4 3 5l-1 5.5c0 1.5 1 3 3 3h1c2 0 3-1.5 3-3l-1-5.5c1.5-1 3-2.5 3-5z"
        fill="#336791"
      />
      <ellipse cx="10" cy="7" rx="1" ry="1.5" fill="white" />
      <ellipse cx="14" cy="7" rx="1" ry="1.5" fill="white" />
      <path d="M10 10c0 1 1 2 2 2s2-1 2-2" stroke="white" strokeWidth="0.8" fill="none" />
    </svg>
  );
}

function RedisIcon({ size = 20 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M12 3L3 8v3l9 5 9-5V8L12 3z" fill="#DC382D" />
      <path d="M3 11v3l9 5 9-5v-3l-9 5-9-5z" fill="#DC382D" opacity="0.7" />
      <path d="M3 14v3l9 5 9-5v-3l-9 5-9-5z" fill="#DC382D" opacity="0.5" />
    </svg>
  );
}

function MongodbIcon({ size = 20 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path
        d="M12 2C12 2 8 6 8 12c0 5 3 9 4 10v-1c0 0 0-1 0-1C12 20 8 17 8 12S12 2 12 2z"
        fill="#47A248"
      />
      <path
        d="M12 2c0 0 4 4 4 10s-4 8-4 10v-1c0 0 0-1 0-1 0 0 4-3 4-8S12 2 12 2z"
        fill="#47A248"
        opacity="0.7"
      />
      <rect x="11.25" y="18" width="1.5" height="4" rx="0.5" fill="#47A248" opacity="0.5" />
    </svg>
  );
}

function RabbitmqIcon({ size = 20 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path
        d="M20 11h-3V4c0-.6-.4-1-1-1h-2c-.6 0-1 .4-1 1v7h-2V4c0-.6-.4-1-1-1H8c-.6 0-1 .4-1 1v7H4c-.6 0-1 .4-1 1v3c0 .6.4 1 1 1h16c.6 0 1-.4 1-1v-3c0-.6-.4-1-1-1z"
        fill="#FF6600"
      />
      <rect x="5" y="16" width="14" height="4" rx="1" fill="#FF6600" opacity="0.7" />
    </svg>
  );
}

function KafkaIcon({ size = 20 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="3" fill="#231F20" />
      <circle cx="6" cy="6" r="2" fill="#231F20" />
      <circle cx="18" cy="6" r="2" fill="#231F20" />
      <circle cx="6" cy="18" r="2" fill="#231F20" />
      <circle cx="18" cy="18" r="2" fill="#231F20" />
      <line x1="10" y1="10.5" x2="7.5" y2="7.5" stroke="#231F20" strokeWidth="1.5" />
      <line x1="14" y1="10.5" x2="16.5" y2="7.5" stroke="#231F20" strokeWidth="1.5" />
      <line x1="10" y1="13.5" x2="7.5" y2="16.5" stroke="#231F20" strokeWidth="1.5" />
      <line x1="14" y1="13.5" x2="16.5" y2="16.5" stroke="#231F20" strokeWidth="1.5" />
    </svg>
  );
}

function PrometheusIcon({ size = 20 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="10" fill="#E6522C" />
      <path
        d="M12 4c0 0-1 2-1 4s.5 3 1 4c.5-1 1-2 1-4s-1-4-1-4z"
        fill="white"
      />
      <path
        d="M12 12v4M9 18h6M10 20h4"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <circle cx="12" cy="9" r="1.5" fill="white" />
    </svg>
  );
}

function GrafanaIcon({ size = 20 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="10" fill="#F46800" />
      <rect x="6" y="13" width="2.5" height="5" rx="0.5" fill="white" />
      <rect x="9.5" y="10" width="2.5" height="8" rx="0.5" fill="white" />
      <rect x="13" y="7" width="2.5" height="11" rx="0.5" fill="white" />
      <rect x="16.5" y="11" width="2.5" height="7" rx="0.5" fill="white" opacity="0.8" />
    </svg>
  );
}

function VaultIcon({ size = 20 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M12 2L3 7v10l9 5 9-5V7l-9-5z" fill="#231F20" />
      <path d="M12 2L3 7l9 5 9-5-9-5z" fill="#231F20" />
      <circle cx="12" cy="12" r="3" stroke="#FFD814" strokeWidth="1.5" fill="none" />
      <circle cx="12" cy="12" r="1" fill="#FFD814" />
      <line x1="12" y1="15" x2="12" y2="18" stroke="#FFD814" strokeWidth="1.5" />
    </svg>
  );
}

function ConsulIcon({ size = 20 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path
        d="M12 2l8.66 5v10L12 22l-8.66-5V7L12 2z"
        fill="#CA2171"
      />
      <path
        d="M14.5 9.5c-1.4-1.4-3.6-1.4-5 0s-1.4 3.6 0 5"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
      />
      <circle cx="15" cy="15" r="1" fill="white" />
    </svg>
  );
}

function EtcdIcon({ size = 20 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="7" r="5" fill="#419EDA" />
      <rect x="10.5" y="10" width="3" height="10" rx="1" fill="#419EDA" />
      <path d="M7 18h10" stroke="#419EDA" strokeWidth="2" strokeLinecap="round" />
      <path d="M8 20h8" stroke="#419EDA" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function TraefikIcon({ size = 20 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path
        d="M4 14c0-4.4 3.6-8 8-8s8 3.6 8 8"
        stroke="#24A1C1"
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M7 14c0-2.8 2.2-5 5-5s5 2.2 5 5"
        stroke="#24A1C1"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
      />
      <rect x="3" y="15" width="18" height="4" rx="2" fill="#24A1C1" />
    </svg>
  );
}

function HaproxyIcon({ size = 20 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <rect x="2" y="2" width="20" height="20" rx="3" fill="#00569E" />
      <path
        d="M7 6v12M17 6v12M7 12h10"
        stroke="white"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function CaddyIcon({ size = 20 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <rect x="6" y="10" width="12" height="10" rx="2" fill="#22B573" />
      <path
        d="M8 10V7a4 4 0 0 1 8 0v3"
        stroke="#22B573"
        strokeWidth="2.5"
        fill="none"
      />
      <circle cx="12" cy="15" r="1.5" fill="white" />
      <line x1="12" y1="16.5" x2="12" y2="18" stroke="white" strokeWidth="1.5" />
    </svg>
  );
}

function NatsIcon({ size = 20 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path
        d="M13 2l-1 8.5h4L11 22l1-8.5H8L13 2z"
        fill="#27AAE1"
      />
    </svg>
  );
}

function ElasticsearchIcon({ size = 20 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <circle cx="11" cy="11" r="7" stroke="#FEC514" strokeWidth="2.5" fill="none" />
      <line x1="16" y1="16" x2="21" y2="21" stroke="#FEC514" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="7" y1="11" x2="15" y2="11" stroke="#FEC514" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function ClickhouseIcon({ size = 20 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <rect x="3" y="8" width="3" height="13" rx="0.5" fill="#FFCC00" />
      <rect x="7.5" y="5" width="3" height="16" rx="0.5" fill="#FFCC00" />
      <rect x="12" y="3" width="3" height="18" rx="0.5" fill="#FFCC00" />
      <rect x="16.5" y="7" width="3" height="14" rx="0.5" fill="#FFCC00" />
      <circle cx="18" cy="5" r="2" fill="#FFCC00" />
    </svg>
  );
}

function MysqlIcon({ size = 20 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path
        d="M12 3C8 3 5 5 5 7v10c0 2 3 4 7 4s7-2 7-4V7c0-2-3-4-7-4z"
        fill="#4479A1"
      />
      <ellipse cx="12" cy="7" rx="7" ry="3" fill="#4479A1" />
      <ellipse cx="12" cy="7" rx="7" ry="3" fill="white" opacity="0.3" />
      <path d="M5 12c0 2 3 3.5 7 3.5s7-1.5 7-3.5" stroke="white" strokeWidth="0.8" opacity="0.5" fill="none" />
      <path d="M5 17c0 2 3 3.5 7 3.5s7-1.5 7-3.5" stroke="white" strokeWidth="0.8" opacity="0.5" fill="none" />
    </svg>
  );
}

function LokiIcon({ size = 20 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <rect x="4" y="4" width="16" height="3" rx="1" fill="#F7D060" />
      <rect x="4" y="9" width="12" height="3" rx="1" fill="#F7D060" opacity="0.8" />
      <rect x="4" y="14" width="14" height="3" rx="1" fill="#F7D060" opacity="0.6" />
      <rect x="4" y="19" width="10" height="3" rx="1" fill="#F7D060" opacity="0.4" />
    </svg>
  );
}

function JenkinsIcon({ size = 20 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <rect x="3" y="2" width="18" height="20" rx="3" fill="#D33833" />
      <path
        d="M14 6v8c0 2-1.5 3-3 3s-3-1-3-3"
        stroke="white"
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}

function GitlabCiIcon({ size = 20 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M12 3L2 19h20L12 3z" fill="#FC6D26" />
      <path d="M12 3L7 19h10L12 3z" fill="#FC6D26" opacity="0.7" />
      <path d="M2 19l3-10 7 10H2z" fill="#FC6D26" opacity="0.5" />
      <path d="M22 19l-3-10-7 10h10z" fill="#FC6D26" opacity="0.5" />
    </svg>
  );
}

function GithubActionsIcon({ size = 20 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="10" fill="#24292E" />
      <circle cx="12" cy="12" r="3" stroke="white" strokeWidth="1.5" fill="none" />
      <path d="M12 5v3M12 16v3M5 12h3M16 12h3" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M7 7l2 2M15 15l2 2M7 17l2-2M15 9l2-2" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function VpsIcon({ size = 20 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <rect x="5" y="2" width="14" height="7" rx="1.5" fill="#718096" />
      <rect x="5" y="11" width="14" height="7" rx="1.5" fill="#718096" opacity="0.7" />
      <circle cx="8" cy="5.5" r="1" fill="white" />
      <circle cx="8" cy="14.5" r="1" fill="white" />
      <line x1="11" y1="5.5" x2="17" y2="5.5" stroke="white" strokeWidth="1" strokeLinecap="round" />
      <line x1="11" y1="14.5" x2="17" y2="14.5" stroke="white" strokeWidth="1" strokeLinecap="round" />
      <line x1="10" y1="20" x2="14" y2="20" stroke="#718096" strokeWidth="2" strokeLinecap="round" />
      <line x1="12" y1="18" x2="12" y2="20" stroke="#718096" strokeWidth="2" />
    </svg>
  );
}

function ContainerIcon({ size = 20 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M3 8l9-5 9 5-9 5-9-5z" fill="#4299E1" />
      <path d="M3 8v8l9 5V13L3 8z" fill="#4299E1" opacity="0.7" />
      <path d="M21 8v8l-9 5V13l9-5z" fill="#4299E1" opacity="0.5" />
    </svg>
  );
}

function AppIcon({ size = 20 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <rect x="3" y="3" width="18" height="18" rx="3" fill="#805AD5" />
      <path
        d="M8 8l4 4-4 4"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <line x1="13" y1="16" x2="17" y2="16" stroke="white" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function LoadBalancerIcon({ size = 20 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <circle cx="4" cy="12" r="2.5" fill="#38B2AC" />
      <circle cx="20" cy="5" r="2.5" fill="#38B2AC" />
      <circle cx="20" cy="12" r="2.5" fill="#38B2AC" />
      <circle cx="20" cy="19" r="2.5" fill="#38B2AC" />
      <line x1="6.5" y1="11" x2="17.5" y2="5.5" stroke="#38B2AC" strokeWidth="1.5" />
      <line x1="6.5" y1="12" x2="17.5" y2="12" stroke="#38B2AC" strokeWidth="1.5" />
      <line x1="6.5" y1="13" x2="17.5" y2="18.5" stroke="#38B2AC" strokeWidth="1.5" />
    </svg>
  );
}

function FirewallIcon({ size = 20 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path
        d="M12 2L4 6v5c0 5.5 3.4 10.3 8 12 4.6-1.7 8-6.5 8-12V6l-8-4z"
        fill="#E53E3E"
      />
      <path d="M9 12l2 2 4-4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function NetworkIcon({ size = 20 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="5" r="2.5" fill="#319795" />
      <circle cx="5" cy="18" r="2.5" fill="#319795" />
      <circle cx="19" cy="18" r="2.5" fill="#319795" />
      <circle cx="12" cy="13" r="2" fill="#319795" />
      <line x1="12" y1="7.5" x2="12" y2="11" stroke="#319795" strokeWidth="1.5" />
      <line x1="10.5" y1="14.5" x2="6.5" y2="16" stroke="#319795" strokeWidth="1.5" />
      <line x1="13.5" y1="14.5" x2="17.5" y2="16" stroke="#319795" strokeWidth="1.5" />
    </svg>
  );
}

function DnsIcon({ size = 20 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="9" stroke="#4299E1" strokeWidth="2" fill="none" />
      <ellipse cx="12" cy="12" rx="4" ry="9" stroke="#4299E1" strokeWidth="1.5" fill="none" />
      <line x1="3" y1="12" x2="21" y2="12" stroke="#4299E1" strokeWidth="1.5" />
      <line x1="4.5" y1="7.5" x2="19.5" y2="7.5" stroke="#4299E1" strokeWidth="1" />
      <line x1="4.5" y1="16.5" x2="19.5" y2="16.5" stroke="#4299E1" strokeWidth="1" />
    </svg>
  );
}

function VolumeIcon({ size = 20 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <ellipse cx="12" cy="6" rx="8" ry="3" fill="#A0AEC0" />
      <path d="M4 6v12c0 1.7 3.6 3 8 3s8-1.3 8-3V6" fill="none" stroke="#A0AEC0" strokeWidth="2" />
      <ellipse cx="12" cy="18" rx="8" ry="3" fill="#A0AEC0" opacity="0.5" />
      <path d="M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3" stroke="#A0AEC0" strokeWidth="1.5" fill="none" />
    </svg>
  );
}

function S3BucketIcon({ size = 20 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path
        d="M6 4h12l2 4v10c0 1.1-.9 2-2 2H6c-1.1 0-2-.9-2-2V8l2-4z"
        fill="#FF9900"
      />
      <ellipse cx="12" cy="8" rx="8" ry="2" fill="#FF9900" />
      <ellipse cx="12" cy="8" rx="8" ry="2" fill="white" opacity="0.3" />
      <path d="M4 8v10c0 1.1 3.6 2 8 2s8-.9 8-2V8" fill="none" stroke="white" strokeWidth="0.5" opacity="0.3" />
    </svg>
  );
}

function ApiGatewayIcon({ size = 20 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M8 3h8v4l-4 3-4-3V3z" fill="#6B46C1" />
      <path d="M8 21h8v-4l-4-3-4 3v4z" fill="#6B46C1" />
      <rect x="10" y="9" width="4" height="6" rx="1" fill="#6B46C1" />
      <line x1="4" y1="12" x2="10" y2="12" stroke="#6B46C1" strokeWidth="2" strokeLinecap="round" />
      <line x1="14" y1="12" x2="20" y2="12" stroke="#6B46C1" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function CustomIcon({ size = 20 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="3" fill="#718096" />
      <path
        d="M12 1v3M12 20v3M1 12h3M20 12h3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1"
        stroke="#718096"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <circle cx="12" cy="12" r="7" stroke="#718096" strokeWidth="2" fill="none" />
    </svg>
  );
}

function CommentIcon({ size = 20 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M4 4h16v12H6l-2 4V4z" fill="#FCD34D" stroke="#F59E0B" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  );
}

export const INFRA_ICONS: Record<string, React.FC<IconProps>> = {
  comment: CommentIcon,
  docker: DockerIcon,
  "docker-compose": DockerComposeIcon,
  kubernetes: KubernetesIcon,
  "k8s-pod": KubernetesIcon,
  "k8s-deployment": KubernetesIcon,
  "k8s-service": KubernetesIcon,
  "k8s-ingress": KubernetesIcon,
  nginx: NginxIcon,
  postgresql: PostgresqlIcon,
  redis: RedisIcon,
  mongodb: MongodbIcon,
  rabbitmq: RabbitmqIcon,
  kafka: KafkaIcon,
  prometheus: PrometheusIcon,
  grafana: GrafanaIcon,
  vault: VaultIcon,
  consul: ConsulIcon,
  etcd: EtcdIcon,
  traefik: TraefikIcon,
  haproxy: HaproxyIcon,
  caddy: CaddyIcon,
  nats: NatsIcon,
  elasticsearch: ElasticsearchIcon,
  clickhouse: ClickhouseIcon,
  mysql: MysqlIcon,
  loki: LokiIcon,
  jenkins: JenkinsIcon,
  "gitlab-ci": GitlabCiIcon,
  "github-actions": GithubActionsIcon,
  vps: VpsIcon,
  container: ContainerIcon,
  app: AppIcon,
  "load-balancer": LoadBalancerIcon,
  firewall: FirewallIcon,
  network: NetworkIcon,
  dns: DnsIcon,
  volume: VolumeIcon,
  "s3-bucket": S3BucketIcon,
  "api-gateway": ApiGatewayIcon,
  custom: CustomIcon,
};
