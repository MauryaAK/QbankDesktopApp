import React from "react";

/* ================= COMMON TYPES ================= */

type Size = "xs" | "sm" | "md" | "lg";
type ActionVariant = "primary" | "outline";

/* ================= SIZE STYLES ================= */

const sizeClasses: Record<Size, string> = {
    xs: "px-3 py-[2px] text-[11px]",
    sm: "px-6 py-2 text-sm",
    md: "px-8 py-[7px] text-sm",
    lg: "px-5 py-3 text-xs",
};

/* ================= PRIMARY PILL ================= */

interface PillButtonProps {
    label: string;
    size?: Size;
    onClick?: () => void;
    disabled?: boolean;
    className?: string;
}

const PillButton: React.FC<PillButtonProps> = ({
    label,
    size = "md",
    onClick,
    disabled = false,
    className = "",
}) => {
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={`
  rounded-tr-sm rounded-bl-sm
  rounded-tl-2xl rounded-br-3xl
  font-semibold
  text-white
  transition-all
  duration-200
  ${sizeClasses[size]}
  ${disabled
                    ? "bg-green-300 cursor-not-allowed"
                    : "bg-green-600 hover:bg-green-700 active:scale-95"
                }
  ${className}
`}
        >
            {label}
        </button>
    );
};

/* ================= STATUS PILL ================= */

interface StatusPillProps {
    label: string;
    size?: Size;
    variant?: "success" | "warning" | "error" | "info";
    onClick?: () => void;
    className?: string;
}

const statusVariantClasses = {
    success: "bg-green-100 text-green-700",
    warning: "bg-yellow-100 text-yellow-700",
    error: "bg-red-100 text-red-700",
    info: "bg-blue-100 text-blue-700",
};

const StatusPill: React.FC<StatusPillProps> = ({
    label,
    size = "md",
    variant = "success",
    onClick,
    className = "",
}) => {
    return (
        <button
            onClick={onClick}
            className={`
        rounded-full
        font-semibold
        transition-all
        duration-200
        ${sizeClasses[size]}
        ${statusVariantClasses[variant]}
        ${onClick ? "hover:opacity-90 active:scale-95" : "cursor-default"}
        ${className}
      `}
        >
            {label}
        </button>
    );
};

/* ================= ACTION BUTTON ================= */

interface ActionButtonProps {
    label: string;
    size?: Size;
    variant?: ActionVariant;
    onClick?: () => void;
    className?: string;
    isActive?: boolean;
}

const actionVariantClasses: Record<ActionVariant, string> = {
    primary:
        "bg-gradient-to-r from-[#DA0E29] to-[#740716] text-white",
    outline:
        "bg-transparent text-blue-900 border border-blue-900 hover:bg-blue-50",
};

const ActionButton: React.FC<ActionButtonProps> = ({
    label,
    size = "md",
    variant = "primary",
    onClick,
    className = "",
    isActive = false,
}) => {
    return (
        <button
            onClick={onClick}
            style={{ minWidth: 170 }} // ✅ consistent width
            className={`
        rounded-2xl
        font-medium
        transition-all
        duration-200
        ${sizeClasses[size]}
        active:scale-95

        ${isActive
                    ? "bg-gradient-to-r from-[#BB9652] to-[#F9CD7C] text-white"
                    : "bg-gradient-to-r from-[#DA0E29] to-[#740716] text-white"
                }

        ${className}
      `}
        >
            {label}
        </button>
    );
};



/* ================= EXPORTS ================= */

export { PillButton, StatusPill, ActionButton };
