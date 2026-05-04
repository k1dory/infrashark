import { useCallback } from "react";
import { useStore } from "../store/index";
import { serializeToJson } from "../io/serializer";
import { deserializeFromJson } from "../io/deserializer";
import { serializeToYaml, deserializeFromYaml } from "../io/yaml-converter";
import { exportToMarkdown } from "../io/markdown-exporter";
import { openFile, saveFile } from "../io/file-handler";
import type { InfraDocument } from "../types/schema";

function buildDocument(): InfraDocument {
  const state = useStore.getState();
  return {
    version: "1.0",
    meta: state.meta,
    components: state.components,
    connections: state.connections,
  };
}

function loadDocument(doc: InfraDocument) {
  const state = useStore.getState();
  state.setMeta({
    name: doc.meta.name,
    description: doc.meta.description,
    author: doc.meta.author,
    created: doc.meta.created,
    updated: doc.meta.updated,
  });

  state.clearSelection();

  for (const comp of [...state.components]) {
    state.removeComponent(comp.id);
  }
  for (const conn of [...state.connections]) {
    state.removeConnection(conn.id);
  }

  for (const comp of doc.components) {
    state.addComponent(comp);
  }
  for (const conn of doc.connections) {
    state.addConnection(conn);
  }

  state.markClean();
}

export function useFileIO() {
  const newDocument = useCallback(() => {
    const state = useStore.getState();

    state.clearSelection();
    for (const comp of [...state.components]) {
      state.removeComponent(comp.id);
    }
    for (const conn of [...state.connections]) {
      state.removeConnection(conn.id);
    }

    state.setMeta({
      name: "Untitled",
      description: undefined,
      author: undefined,
      created: new Date().toISOString(),
      updated: new Date().toISOString(),
    });
    state.setZoom(1);
    state.setPan({ x: 0, y: 0 });
    state.markClean();
  }, []);

  const openDocument = useCallback(async () => {
    const result = await openFile();
    if (!result) return;

    const isYaml =
      result.name.endsWith(".yaml") || result.name.endsWith(".yml");

    try {
      const doc = isYaml
        ? deserializeFromYaml(result.content)
        : deserializeFromJson(result.content);
      loadDocument(doc);
    } catch (err) {
      console.error("Failed to parse document:", err);
    }
  }, []);

  const saveAsJson = useCallback(async () => {
    const doc = buildDocument();
    const json = serializeToJson(doc);
    const filename = `${doc.meta.name.replace(/\s+/g, "-").toLowerCase()}.json`;
    await saveFile(json, filename, "application/json");
    useStore.getState().markClean();
  }, []);

  const saveAsYaml = useCallback(async () => {
    const doc = buildDocument();
    const yamlStr = serializeToYaml(doc);
    const filename = `${doc.meta.name.replace(/\s+/g, "-").toLowerCase()}.yaml`;
    await saveFile(yamlStr, filename, "text/yaml");
    useStore.getState().markClean();
  }, []);

  const exportMarkdown = useCallback(async () => {
    const doc = buildDocument();
    const md = exportToMarkdown(doc);
    const filename = `${doc.meta.name.replace(/\s+/g, "-").toLowerCase()}.md`;
    await saveFile(md, filename, "text/markdown");
  }, []);

  return {
    newDocument,
    openDocument,
    saveAsJson,
    saveAsYaml,
    exportMarkdown,
  };
}
