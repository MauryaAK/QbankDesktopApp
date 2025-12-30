// src/components/common/AlertModal/AlertProvider.tsx
import React, { useEffect } from "react";
import AlertModal from "../components/common/AlertModal/AlertModal";
import { useAlert } from "../hooks/useAlert";
import { alertService } from "../services/global/alertService"; 

export const AlertProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { alert, showAlert, hideAlert } = useAlert();

  useEffect(() => {
    alertService.register(showAlert);
  }, [showAlert]);

  return (
    <>
      {children}
      <AlertModal {...alert} onClose={hideAlert} />
    </>
  );
};
