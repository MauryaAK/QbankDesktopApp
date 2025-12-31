export const saveWithPicker = async (
  blob: Blob,
  suggestedName: string,
  mimeType: string
) => {
  // ✅ If browser supports File Picker
  if ("showSaveFilePicker" in window) {
    const handle = await (window as any).showSaveFilePicker({
      suggestedName,
      types: [
        {
          description: "Export File",
          accept: {
            [mimeType]: [`.${suggestedName.split(".").pop()}`],
          },
        },
      ],
    });

    const writable = await handle.createWritable();
    await writable.write(blob);
    await writable.close();
  } else {
    // ❌ Fallback (Firefox / Safari)
    const { saveAs } = await import("file-saver");
    saveAs(blob, suggestedName);
  }
};
