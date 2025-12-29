import { useState } from "react";
import { AlertConfig } from "../components/common/AlertModal/alert.types";

export const useAlert = () => {
  const [alert, setAlert] = useState<AlertConfig>({
    open: false,
    title: "",
    message: "",
    variant: "error",
  });

  const showAlert = (config: Omit<AlertConfig, "open">) => {
    setAlert({ ...config, open: true });
  };

  const hideAlert = () => {
    setAlert((prev) => ({ ...prev, open: false }));
  };

  return {
    alert,
    showAlert,
    hideAlert,
  };
};
