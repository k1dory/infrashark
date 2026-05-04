import { dump, load } from "js-yaml";
import type { InfraDocument } from "../types/schema";

export function serializeToYaml(doc: InfraDocument): string {
  return dump(doc, { indent: 2, lineWidth: 120 });
}

export function deserializeFromYaml(yamlStr: string): InfraDocument {
  return load(yamlStr) as InfraDocument;
}
