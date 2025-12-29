import { HiCheck } from "react-icons/hi";
import { HiXMark } from "react-icons/hi2";
import { BsCircle } from "react-icons/bs";

import excel from "../assets/xls.svg";
import pdf from "../assets/pdf.svg";
import { useDeviceFingerprint } from "../hooks/useDeviceFingerprint";

/* =========================================================
   TYPES
========================================================= */

type ExportType = "excel" | "pdf";
type ActionType = "approve" | "disapprove" | "clear";

interface ExportItem {
  type: ExportType;
  onClick?: () => void;
}

interface ActionItem {
  type: ActionType;
  label: string;
  onClick?: () => void;
}

interface FooterButton {
  label: string;
  onClick?: () => void;
  disabled?: boolean;
}

interface FooterProps {
  version?: string;
  environment?: string;

  showExports?: boolean;
  exports?: ExportItem[];

  actions?: ActionItem[];
  buttons?: FooterButton[];
}

/* =========================================================
   CONFIG MAPS
========================================================= */

const exportConfig = {
  excel: {
    icon: excel,
    label: "Excel",
  },
  pdf: {
    icon: pdf,
    label: "Pdf",
  },
};

const actionConfig = {
  approve: {
    icon: <HiCheck size={16} />,
    className: "border-green-600 text-green-600 rounded-md",
  },
  disapprove: {
    icon: <HiXMark size={16} />,
    className: "border-red-600 text-red-600 rounded-md",
  },
  clear: {
    icon: <BsCircle size={10} />,
    className: "border-gray-500 text-gray-600 rounded-full",
  },
};

/* =========================================================
   COMPONENT
========================================================= */

const Footer: React.FC<FooterProps> = ({
  version = "0.1",
  showExports = true,
  exports = [],

  actions = [],
  buttons = [],
}) => {
  const { deviceInfo } = useDeviceFingerprint();

  return (
    <div className="absolute left-0 bottom-0 w-full px-12 py-5">
      {/* ================= EXPORT ICONS ================= */}
      {showExports && exports.length > 0 && (
        <div className="flex justify-end items-center gap-6 mr-16 mb-4 text-[11px] font-semibold text-gray-600 uppercase">
          {exports.map((item, index) => (
            <div
              key={index}
              onClick={item.onClick}
              className="flex items-center gap-1 cursor-pointer"
            >
              <img
                src={exportConfig[item.type].icon}
                alt={exportConfig[item.type].label}
                className="w-8 h-8"
              />
              <span>{exportConfig[item.type].label}</span>
            </div>
          ))}
        </div>
      )}

      {/* ================= MAIN FOOTER ================= */}
      <div className="flex items-center justify-between">
        {/* VERSION INFO */}
        <span className="text-sm leading-tight">
          Version {version} <br />
          {deviceInfo?.deviceName || ""}
        </span>

        {/* ACTIONS + BUTTONS */}
        <div className="flex gap-4 mr-6 items-center">
          {/* ACTION ICONS */}
          {actions.map((action, index) => {
            const cfg = actionConfig[action.type];
            return (
              <div
                key={index}
                onClick={action.onClick}
                className="flex items-center gap-2 cursor-pointer"
              >
                <span
                  className={`w-6 h-6 flex items-center justify-center border ${cfg.className}`}
                >
                  {cfg.icon}
                </span>
                <span className="text-sm font-semibold">
                  {action.label}
                </span>
              </div>
            );
          })}

          {/* BUTTONS */}
          {buttons.map((btn, index) => (
            <button
              key={index}
              onClick={btn.onClick}
              disabled={btn.disabled}
              className={`
                bg-[#DA0E29]
                rounded-lg
                px-10
                py-2
                text-white
                ${btn.disabled ? "opacity-50 cursor-not-allowed" : ""}
              `}
            >
              {btn.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Footer;
