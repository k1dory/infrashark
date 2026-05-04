interface FilePickerOptions {
  types?: {
    description: string;
    accept: Record<string, string[]>;
  }[];
  suggestedName?: string;
}

interface FileSystemFileHandle {
  getFile(): Promise<File>;
  createWritable(): Promise<{
    write(data: string): Promise<void>;
    close(): Promise<void>;
  }>;
}

declare global {
  interface Window {
    showOpenFilePicker?: (options?: FilePickerOptions) => Promise<FileSystemFileHandle[]>;
    showSaveFilePicker?: (options?: FilePickerOptions) => Promise<FileSystemFileHandle>;
  }
}

export async function openFile(): Promise<{ content: string; name: string } | null> {
  if (window.showOpenFilePicker) {
    try {
      const [handle] = await window.showOpenFilePicker({
        types: [
          {
            description: "InfraShark files",
            accept: {
              "application/json": [".json"],
              "text/yaml": [".yaml", ".yml"],
            },
          },
        ],
      });
      const file = await handle.getFile();
      const content = await file.text();
      return { content, name: file.name };
    } catch {
      return null;
    }
  }

  return new Promise((resolve) => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".json,.yaml,.yml";
    input.addEventListener("change", async () => {
      const file = input.files?.[0];
      if (!file) {
        resolve(null);
        return;
      }
      const content = await file.text();
      resolve({ content, name: file.name });
    });
    input.addEventListener("cancel", () => resolve(null));
    input.click();
  });
}

export async function saveFile(
  content: string,
  filename: string,
  type: string,
): Promise<void> {
  if (window.showSaveFilePicker) {
    try {
      const ext = filename.split(".").pop() ?? "json";
      const handle = await window.showSaveFilePicker({
        suggestedName: filename,
        types: [
          {
            description: `${ext.toUpperCase()} file`,
            accept: { [type]: [`.${ext}`] },
          },
        ],
      });
      const writable = await handle.createWritable();
      await writable.write(content);
      await writable.close();
      return;
    } catch {
      return;
    }
  }

  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
