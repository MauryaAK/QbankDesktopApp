export type AlertVariant = "error" | "warning" | "info" | "success";

export interface AlertConfig {
  open: boolean;
  title: string;
  message: string;
  variant?: AlertVariant;
  onClose?: () => void;
}
