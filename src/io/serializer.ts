import type { InfraDocument } from "../types/schema";

export function serializeToJson(doc: InfraDocument): string {
  return JSON.stringify(doc, null, 2);
}
