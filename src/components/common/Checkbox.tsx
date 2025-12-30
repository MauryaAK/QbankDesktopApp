import React from "react";
import { HiCheck } from "react-icons/hi";

type CheckboxSize = "xs" | "sm" | "lg" | "xl";

interface CheckboxProps {
    checked: boolean;
    onChange: (nextChecked: boolean) => void;
    size?: CheckboxSize;
    disabled?: boolean;
}

const SIZE_MAP: Record<CheckboxSize, string> = {
    xs: "w-3.5 h-3.5",
    sm: "w-4 h-4",
    lg: "w-5 h-5",
    xl: "w-6 h-6",
};

const ICON_SIZE_MAP: Record<CheckboxSize, number> = {
    xs: 10,
    sm: 12,
    lg: 14,
    xl: 16,
};

const Checkbox: React.FC<CheckboxProps> = ({
    checked,
    onChange,
    size = "sm",
    disabled = false,
}) => {
    const handleMouseDown = (e: React.MouseEvent) => {
        e.preventDefault();      // 🔑 stop focus + double click
        e.stopPropagation();
        if (disabled) return;

        const nextChecked = !checked;
        onChange(nextChecked);
    };

    return (
        <button
            type="button"
            disabled={disabled}
            onMouseDown={handleMouseDown}   // 🔥 IMPORTANT
            className={`
        ${SIZE_MAP[size]}
        flex items-center justify-center
        border rounded-[3px]
        transition
        ${checked
                    ? "bg-white border-gray-500"
                    : "bg-white border-gray-400"}
        ${disabled
                    ? "opacity-50 cursor-not-allowed"
                    : "cursor-pointer hover:border-gray-600"}
      `}
        >
            {checked && (
                <HiCheck
                    size={ICON_SIZE_MAP[size]}
                    className="text-black"
                />
            )}
        </button>
    );
};

export default Checkbox;
