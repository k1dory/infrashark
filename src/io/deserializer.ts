import type { InfraDocument } from "../types/schema";

export function deserializeFromJson(json: string): InfraDocument {
  return JSON.parse(json) as InfraDocument;
}
