import type { InfraDocument } from "../types/schema";

export function exportToMarkdown(doc: InfraDocument): string {
  const lines: string[] = [];

  lines.push(`# ${doc.meta.name}`);
  if (doc.meta.description) {
    lines.push("");
    lines.push(doc.meta.description);
  }
  lines.push("");

  if (doc.components.length > 0) {
    lines.push("## Components");
    lines.push("");
    lines.push("| Name | Type | Ports |");
    lines.push("|------|------|-------|");
    for (const comp of doc.components) {
      const ports =
        comp.ports.length > 0
          ? comp.ports.map((p) => `${p.name}:${p.number}`).join(", ")
          : "-";
      lines.push(`| ${comp.name} | ${comp.type} | ${ports} |`);
    }
    lines.push("");
  }

  if (doc.connections.length > 0) {
    lines.push("## Connections");
    lines.push("");
    lines.push("| From | To | Protocol | Port |");
    lines.push("|------|-----|----------|------|");
    for (const conn of doc.connections) {
      const fromComp = doc.components.find(
        (c) => c.id === conn.from.componentId,
      );
      const toComp = doc.components.find((c) => c.id === conn.to.componentId);
      const fromPort = fromComp?.ports.find((p) => p.id === conn.from.portId);
      const toPort = toComp?.ports.find((p) => p.id === conn.to.portId);
      lines.push(
        `| ${fromComp?.name ?? conn.from.componentId} | ${toComp?.name ?? conn.to.componentId} | ${conn.protocol} | ${fromPort?.number ?? toPort?.number ?? "-"} |`,
      );
    }
    lines.push("");
  }

  const componentsWithConfig = doc.components.filter(
    (c) => Object.keys(c.config).length > 0,
  );
  if (componentsWithConfig.length > 0) {
    lines.push("## Configuration");
    lines.push("");
    for (const comp of componentsWithConfig) {
      lines.push(`### ${comp.name}`);
      lines.push("");
      lines.push("```json");
      lines.push(JSON.stringify(comp.config, null, 2));
      lines.push("```");
      lines.push("");
    }
  }

  return lines.join("\n");
}
