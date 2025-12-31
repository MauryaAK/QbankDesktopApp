import { AlertVariant } from "./alert.types";
import { FaExclamation, FaInfo, FaCheck } from "react-icons/fa";

export const ALERT_STYLES: Record<AlertVariant, string> = {
  error: "border-red-500",
  warning: "border-yellow-500",
  info: "border-blue-500",
  success: "border-green-500",
};

export const ALERT_ICONS: Record<AlertVariant, JSX.Element> = {
  error: <FaExclamation className="text-[12px]" />,
  warning: <FaExclamation className="text-[12px]" />,
  info: <FaInfo className="text-[12px]" />,
  success: <FaCheck className="text-[12px]" />,
};
