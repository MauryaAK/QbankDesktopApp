import React from "react";

interface CheckboxFieldProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
}

const CheckboxField: React.FC<CheckboxFieldProps> = ({
  label,
  checked,
  onChange,
  disabled = false,
}) => {
  return (
    <div className="flex items-center gap-2 w-full">
      {/* LABEL */}
      <span className="min-w-[90px] text-xs font-medium text-gray-600">
        {label}
      </span>

      {/* CHECKBOX WRAPPER */}
      <div
        className={`
          h-8
          w-full
          flex
          items-center
          px-2
          rounded-lg
          border
          bg-white
          border-[#fbcfe8]
          ${disabled ? "opacity-60 cursor-not-allowed" : "cursor-pointer"}
          focus-within:border-[#ec4899]
        `}
      >
        <input
          type="checkbox"
          checked={checked}
          disabled={disabled}
          onChange={(e) => onChange(e.target.checked)}
          className="
            h-4
            w-4
            cursor-pointer
            accent-[#ec4899]
          "
        />

        {/* OPTIONAL TEXT */}
        <span className="ml-2 text-xs text-gray-700">
          {checked ? "Yes" : "No"}
        </span>
      </div>
    </div>
  );
};

export default CheckboxField;
