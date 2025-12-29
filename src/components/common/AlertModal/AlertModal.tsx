import React from "react";
import { AlertConfig } from "./alert.types";
import { ALERT_ICONS, ALERT_STYLES } from "./alert.constants";

const AlertModal: React.FC<AlertConfig> = ({
  open,
  title,
  message,
  variant = "error",
  onClose,
}) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm">
      <div className="relative w-[520px] rounded-xl bg-white shadow-2xl animate-scaleIn">
        
        {/* HEADER */}
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-full bg-red-100 text-red-600 flex items-center justify-center font-bold">
              {ALERT_ICONS[variant]}
            </div>
            <h3 className="text-lg font-semibold text-black">
              {title}
            </h3>
          </div>

          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-red-500 text-white flex items-center justify-center hover:bg-red-600"
          >
            ✕
          </button>
        </div>

        {/* BODY */}
        <div
          className={`mx-6 mb-6 rounded-lg border-2 ${ALERT_STYLES[variant]} p-4 text-sm text-gray-800`}
        >
          {message}
        </div>
      </div>
    </div>
  );
};

export default AlertModal;
