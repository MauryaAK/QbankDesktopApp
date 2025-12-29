import { getCurrentWindow } from "@tauri-apps/api/window";

const win = getCurrentWindow();

/* ================= BLOCK SYSTEM CLOSE ================= */
win.onCloseRequested((e) => {
  e.preventDefault();
});

/* ================= EXIT APP ================= */
export const exitApp = async () => {
  await win.destroy(); // hard exit
};

/* ================= MINIMIZE APP ================= */
export const minimizeApp = async () => {
  await win.minimize();
};
