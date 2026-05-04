# InfraShark

Visual infrastructure / system-design editor for DevOps and architects. Renders machine-readable JSON / YAML / Markdown configs as interactive diagrams in the browser. **Client-side only** — no backend.

Think of it as Miro / Figma for `docker-compose.yml`, Kubernetes manifests, Nginx topologies, and full-stack architectures. Built so that LLMs can read and write the same files humans can.

---

## Quick Start

```bash
npm install
npm run dev
# open http://localhost:5173 (or 3000 if started with --port 3000)
```

Then click **📂 Open** in the toolbar and load `example-architecture.json` from the project root to see a sample architecture (VPS → Nginx → Docker Compose stack with FastAPI, Next.js, PostgreSQL, Redis, RabbitMQ, Worker, Prometheus, Grafana, S3).

---

## Features

- **37 built-in component types** — Docker, Docker Compose, Kubernetes (Pod / Service / Deployment / Ingress), Nginx / Traefik / HAProxy / Caddy, RabbitMQ / Kafka / NATS, PostgreSQL / MySQL / Redis / MongoDB / ClickHouse / Elasticsearch, Prometheus / Grafana / Loki, Vault / Consul / etcd, GitLab CI / GitHub Actions / Jenkins, S3, Load Balancer, Firewall, DNS, API Gateway, Comment.
- **19 protocols** with brand colors — HTTP, HTTPS, HTTP/3, gRPC, REST, WebSocket, TCP, UDP, AMQP, MQTT, VLESS, VMess, Trojan, PostgreSQL, Redis, MongoDB, SSH, FTP.
- **Click-based connection drawing** — click any anchor on a component, then click target node or anchor.
- **Animated data-flow** — connections show flowing dashes by default.
- **Nesting** — drop components inside containers (VPS → Compose → Container → App).
- **Inline rename** — double-click a node title to edit.
- **Comment notes** — yellow sticky notes for annotating diagrams.
- **Pan / zoom** with cursor focus, rubber-band selection, undo/redo (Ctrl+Z / Ctrl+Y).
- **Import / export** — JSON, YAML, Markdown.
- **Custom components** — user-defined types stored inside the document.
- **SVG icons** for every brand (Docker whale, Nginx N, K8s wheel, etc.).

---

## Keyboard Shortcuts

| Action | Shortcut |
|---|---|
| Search palette | `Ctrl+K` |
| Undo | `Ctrl+Z` |
| Redo | `Ctrl+Y` / `Ctrl+Shift+Z` |
| Delete selection | `Delete` / `Backspace` |
| Select all | `Ctrl+A` |
| Duplicate | `Ctrl+D` |
| Zoom in / out | `Ctrl++` / `Ctrl+-` |
| Reset zoom | `Ctrl+0` |
| Cancel | `Escape` |

Pan: middle-mouse drag, or hold `Space` and left-drag.

---

## Document Format

InfraShark documents are JSON (or YAML — same schema). The format is intentionally simple so LLMs can produce and consume it directly.

```jsonc
{
  "version": "1.0",
  "meta": {
    "name": "Production Web App",
    "description": "...",
    "created": "2026-04-23T10:00:00.000Z",
    "updated": "2026-04-23T10:00:00.000Z"
  },
  "components": [
    {
      "id": "vps-1",                          // unique string
      "type": "vps",                          // one of ComponentType
      "name": "Production VPS",               // user-visible label
      "parentId": null,                       // null for top-level, otherwise containing component id
      "position": { "x": 100, "y": 100 },     // canvas coordinates (relative to parent if nested)
      "size":     { "width": 700, "height": 500 },
      "config":   { "provider": "Hetzner" }, // type-specific data, free-form
      "ports":    [],                         // optional Port[]
      "collapsed": false,                     // optional
      "style":    { "backgroundColor": "#..." } // optional NodeStyle
    }
  ],
  "connections": [
    {
      "id": "conn-1",
      "from": { "componentId": "vps-1", "portId": "__anchor_right" },
      "to":   { "componentId": "db-1",  "portId": "__anchor_left"  },
      "protocol": "PostgreSQL",
      "label": "pg :5432",                    // optional
      "style": { "animated": true }           // optional
    }
  ],
  "customTypes": []                           // optional, user-defined component types
}
```

### `portId` values

- `__anchor_top` / `__anchor_right` / `__anchor_bottom` / `__anchor_left` — connection attaches to the side anchor of the component (recommended for AI-generated diagrams).
- A real port ID (UUID) — connection attaches to a declared port on the component.

### Full TypeScript schema

See [`src/types/schema.ts`](src/types/schema.ts), [`src/types/component-types.ts`](src/types/component-types.ts), [`src/types/protocols.ts`](src/types/protocols.ts).

---

## Instructions for AI Agents

> **If you are an LLM (Claude, GPT, etc.) generating an InfraShark document, read this section.**

### Hard rules

1. **Output valid JSON conforming to the schema in `src/types/schema.ts`.** No markdown fences in the file itself, no comments. Pretty-print with 2-space indent.
2. **Every `id` must be a unique string** within the document. Use kebab-case identifiers (`api-1`, `db-prod`, not random UUIDs) so humans can read the file.
3. **Every `connection.from.componentId` and `connection.to.componentId` must reference an existing `component.id`.** No dangling references.
4. **`parentId` must reference an existing component or be `null`.** No cycles. A nested component's `position` is relative to its parent's top-left.
5. **`type` must be one of the `ComponentType` union values** in `src/types/component-types.ts`. If nothing fits, use `"custom"` and set `style.backgroundColor` / `name` to convey meaning.
6. **`protocol` must be one of the `Protocol` union values** in `src/types/protocols.ts`. If nothing fits, use `"custom"`.
7. **Use `__anchor_<side>` for `portId`** unless you are explicitly modeling declared ports. Side choice should reflect physical layout: a service to the right connects via `__anchor_right` → target `__anchor_left`.

### Layout heuristics for readable diagrams

- **Top-level components** spread horizontally with ~240–320 px gaps, vertical bands by role (clients top, edge / proxy upper-middle, services middle, databases lower-middle, monitoring bottom).
- **Containers** (VPS, Docker Compose, Kubernetes, network) should be sized large enough to fit children with ~20 px padding. Default container size is roughly 480×360.
- **Children inside a container**: arrange in a grid, ~20 px gap. Children's `position` is relative to the container's top-left, **not** to the canvas.
- **Layer ordering**: edge / ingress on top, app servers in the middle, databases / queues at the bottom. Monitoring components on a side band.
- **Don't stack two services exactly above each other** if they have a connection — pick anchors that route around, otherwise the line passes through other nodes.

### Connection guidance

- **Pick anchor sides based on relative position.** Source on the left of target → `from.__anchor_right`, `to.__anchor_left`. Above / below → `top`/`bottom`.
- **Always set `protocol`.** It drives the line color and the displayed label (label defaults to the protocol name if empty).
- **Set `label` to include the port** when relevant (`"HTTPS :443"`, `"AMQP :5672"`, `"pg :5432"`).
- **Animated flow is on by default** — you don't need to set `style.animated`. Set it to `false` only for inert references.

### Generating from a stack description

Given a description like *"FastAPI behind Nginx, Postgres + Redis, RabbitMQ with a Celery worker, all in Docker Compose on one VPS, with Prometheus + Grafana"*:

1. Create one `vps` component as the outer container.
2. Inside it, create a `nginx` component and a `docker-compose` component.
3. Inside `docker-compose`, create the app components: `app` (FastAPI), `postgresql`, `redis`, `rabbitmq`, `app` (worker).
4. Add `prometheus` and `grafana` inside the VPS but outside the compose stack.
5. Add a top-level `custom` component named "Browser / Mobile" representing clients.
6. Wire connections: client → nginx (HTTPS), nginx → fastapi (HTTP), fastapi → postgres (PostgreSQL), fastapi → redis (Redis), fastapi → rabbitmq (AMQP), rabbitmq → worker (AMQP), worker → postgres (PostgreSQL), fastapi → prometheus (HTTP `/metrics`), prometheus → grafana (HTTP query).

A complete worked example matching the above lives in [`example-architecture.json`](example-architecture.json) — read it before generating new documents.

### Updating an existing document

- **Preserve unknown fields.** If the file contains `meta.author`, `customTypes`, or fields you don't recognize, copy them through unchanged.
- **Don't renumber existing IDs.** Add new components with new IDs; existing connection references must keep working.
- **Bump `meta.updated` to the current ISO timestamp** when you change anything. Don't touch `meta.created`.

---

## Architecture Overview

```
src/
  types/             # InfraDocument, InfraComponent, Connection, Port, Protocol, ComponentType
  store/             # Zustand slices: components, connections, canvas, document, ui (+ zundo undo/redo)
  utils/             # geometry, tree (parentId helpers), id, canvas-origin
  canvas/            # Canvas, Viewport, Grid, SelectionBox + hooks (zoom, pan, selection, drag, resize)
  components/
    node/            # InfraNode, NodeHeader, ConnectionAnchors, CommentNode
    registry/        # icons.tsx (SVG components per service)
    ErrorBoundary.tsx
  connections/       # ConnectionsOverlay (SVG), ConnectionLine, TempConnectionLine, path-calculator
  panels/            # Toolbar, ComponentPalette, PropertiesPanel, ContextMenu, SearchPalette, DrawingHint
  io/                # serializer, deserializer, yaml-converter, markdown-exporter, file-handler
  hooks/             # useKeyboardShortcuts, useFileIO
  styles/            # global.css + CSS modules per area
  App.tsx, main.tsx
```

### Tech stack

- **React 19** + **TypeScript 5** with **Vite 8**
- **Zustand 5** + **Immer** for state, **Zundo** for undo/redo
- **js-yaml** for YAML round-trip
- DOM-based canvas (no Canvas / WebGL) — CSS transform for zoom/pan, SVG overlay for connections

---

## Files of Interest

- [`example-architecture.json`](example-architecture.json) — sample document, load it via 📂 Open
- [`src/types/schema.ts`](src/types/schema.ts) — single source of truth for the file format
- [`CLAUDE.md`](CLAUDE.md) — project-level rules for Claude Code
- [`.claude/agents/docs-infrashark.md`](.claude/agents/docs-infrashark.md) — Claude Code agent specialised for generating / editing InfraShark documents

---

## Build / Type-check

```bash
npm run build       # production bundle
npx tsc --noEmit    # type-check only
```
