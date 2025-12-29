import { AlertVariant } from "./alert.types";

export const ALERT_STYLES: Record<AlertVariant, string> = {
  error: "border-red-500",
  warning: "border-yellow-500",
  info: "border-blue-500",
  success: "border-green-500",
};

export const ALERT_ICONS: Record<AlertVariant, string> = {
  error: "!",
  warning: "!",
  info: "i",
  success: "✓",
};
