declare module "js-yaml" {
  interface DumpOptions {
    indent?: number;
    lineWidth?: number;
    noRefs?: boolean;
    sortKeys?: boolean;
    flowLevel?: number;
    noCompatMode?: boolean;
  }

  interface LoadOptions {
    schema?: unknown;
    json?: boolean;
  }

  export function dump(obj: unknown, options?: DumpOptions): string;
  export function load(str: string, options?: LoadOptions): unknown;
}
