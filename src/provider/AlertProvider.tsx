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

      {alert.open && (
        <AlertModal
          {...alert}
          onClose={() => {
            alert.onClose?.();     // ✅ USER CALLBACK
            hideAlert();           // ✅ CLOSE MODAL
          }}
          onConfirm={async () => {
            await alert.onConfirm?.(); // ✅ USER CONFIRM
            hideAlert();               // ✅ CLOSE MODAL
          }}
        />
      )}
    </>
  );
};
