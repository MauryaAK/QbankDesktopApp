import React from "react";
import { AlertConfig } from "./alert.types";
import { ALERT_ICONS, ALERT_STYLES } from "./alert.constants";

import popupLeftTopCircle from "../../../assets/popupLeftTopCircle.png";
import popupRightBottomCircle from "../../../assets/popupRightBottomCircle.png";

interface AlertModalProps extends AlertConfig {
  showCloseIcon?: boolean;
}

const AlertModal: React.FC<AlertModalProps> = ({
  open,
  title,
  message,
  variant = "error",
  showActionButtons = false,
  showCloseIcon = true,
  onConfirm,
  onClose,
}) => {
  if (!open) return null;

  const handleConfirm = () => {
    onConfirm?.();
    onClose?.();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm">

      {/* ===== OUTER FRAME ===== */}
      <div className="relative animate-scaleIn overflow-hidden">

        <div className="relative rounded-2xl bg-[#F3EADA] p-3 shadow-xl">

          {/* ===== DECORATIVE CIRCLES (OVER BEIGE) ===== */}
          <img
            src={popupLeftTopCircle}
            alt=""
            className="absolute bottom-8 left-8 w-12 opacity-70 z-20 pointer-events-none"
          />

          <img
            src={popupRightBottomCircle}
            alt=""
            className="absolute top-2 left-24 w-16 opacity-70 z-20 pointer-events-none"
          />

          {/* ===== INNER WHITE MODAL ===== */}
          <div className="relative z-10 w-[520px] rounded-xl bg-white shadow-2xl overflow-hidden">

            {/* ===== HEADER ===== */}
            <div className="relative px-6 py-4">

              {/* CENTER ICON + TITLE */}
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center gap-3">
                <div
                  className={`
    w-7 h-7
    rounded-full
    flex items-center justify-center
    font-bold
    ${variant === "error" && "bg-red-100 text-red-600"}
    ${variant === "warning" && "bg-yellow-100 text-yellow-600"}
    ${variant === "info" && "bg-blue-100 text-blue-600"}
    ${variant === "success" && "bg-green-100 text-green-600"}
  `}
                >
                  {ALERT_ICONS[variant]}
                </div>



                <h3 className="text-lg font-semibold text-black">
                  {title}
                </h3>
              </div>

              {/* CLOSE BUTTON (RIGHT) */}
              {showCloseIcon && (
                <div className="flex justify-end">
                  <button
                    onClick={onClose}
                    className="w-7 h-7 rounded-full bg-red-500 text-white flex items-center justify-center hover:bg-red-600 transition"
                  >
                    ✕
                  </button>
                </div>
              )}
            </div>


            {/* ===== BODY (BIGGER CONTENT BOX) ===== */}
            <div
              className={`
                mx-2 my-3
                rounded-lg
                border-2
                ${ALERT_STYLES[variant]}
                px-6 py-5
                text-sm
                leading-relaxed
                text-gray-800
              `}
            >
              {message}
            </div>

            {/* ===== ACTION BUTTONS ===== */}
            {showActionButtons && (
              <div className="flex justify-end gap-6 px-6 pb-6 pt-2">
                <button
                  onClick={handleConfirm}
                  className="
                    w-28 py-2 text-sm font-semibold rounded-full
                    text-white
                    bg-gradient-to-r from-[#DA0E29] to-[#740716]
                    hover:from-[#E1122F] hover:to-[#8A0B1C]
                    transition
                  "
                >
                  Yes
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlertModal;
