import React from "react";

type ToggleSize = "xs" | "sm" | "lg" | "xl";

interface ToggleRadioProps {
  checked: boolean;
  onChange: (value: boolean) => void;
  size?: ToggleSize;
  disabled?: boolean;
  icon?: React.ReactNode;
}

const SIZE_MAP: Record<ToggleSize, string> = {
  xs: "w-10 h-5",
  sm: "w-12 h-6",
  lg: "w-16 h-8",
  xl: "w-20 h-10",
};

const KNOB_MAP: Record<ToggleSize, string> = {
  xs: "w-4 h-4",
  sm: "w-5 h-5",
  lg: "w-7 h-7",
  xl: "w-9 h-9",
};

const TRANSLATE_MAP: Record<ToggleSize, string> = {
  xs: "translate-x-5",
  sm: "translate-x-6",
  lg: "translate-x-8",
  xl: "translate-x-10",
};

const ToggleRadio: React.FC<ToggleRadioProps> = ({
  checked,
  onChange,
  size = "sm",
  disabled = false,
  icon,
}) => {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={(e) => {
        e.stopPropagation();
        if (!disabled) onChange(!checked);
      }}
      className={`
        relative
        ${SIZE_MAP[size]}
        rounded-full
        flex items-center
        transition-all duration-300
        ${checked
          ? "bg-[#C7A35D]"
          : "bg-[#EFE6D6]"}
        ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
      `}
    >
      {/* ICON (LEFT SIDE) */}
      {icon && (
        <span className="absolute left-2 text-white text-xs">
          {icon}
        </span>
      )}

      {/* KNOB */}
      <span
        className={`
          absolute
          left-1
          ${KNOB_MAP[size]}
          rounded-full
          bg-white
          shadow-md
          transition-transform duration-300
          ${checked ? TRANSLATE_MAP[size] : "translate-x-0"}
        `}
      />
    </button>
  );
};

export default ToggleRadio;
