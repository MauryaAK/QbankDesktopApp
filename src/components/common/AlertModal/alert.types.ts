import { ReactNode } from "react";

export type AlertVariant = "error" | "warning" | "info" | "success";

export interface AlertConfig {
  open: boolean;
  title: string;
  message: ReactNode|string;
  variant?: AlertVariant;
  showActionButtons?: boolean;
  onConfirm?: () => void;
  onCancel?: () => void;
  onClose?: () => void;
}
