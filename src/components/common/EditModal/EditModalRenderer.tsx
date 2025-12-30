import React from "react";
import Select from "react-select";
import Checkbox from "../Checkbox";
import ToggleRadio from "../ToggleRadio";
import { FieldSchema } from "./editModal.types";

interface EditModalRendererProps {
  fields: FieldSchema[];
  values: Record<string, any>;
  onChange: (name: string, value: any) => void;
  readOnly?: boolean;
}

/* ================= REACT SELECT STYLE (COMPACT) ================= */

const selectStyles = {
  control: (base: any, state: any) => ({
    ...base,
    minHeight: 32,
    height: 32,
    border: "none",
    boxShadow: "none",
    backgroundColor: state.isDisabled ? "#E5E5E5" : "#B9ACAC",
    borderRadius: 4,
  }),

  valueContainer: (base: any) => ({
    ...base,
    padding: "0 8px",
  }),

  singleValue: (base: any) => ({
    ...base,
    color: "#000",
    fontSize: "13px",
  }),

  indicatorsContainer: (base: any) => ({
    ...base,
    height: 32,
  }),

  indicatorSeparator: () => ({
    display: "none",
  }),

  /* ===== DROPDOWN MENU ===== */
  menu: (base: any) => ({
    ...base,
    marginTop: 4,
    borderRadius: 6,
    overflow: "hidden",
  }),

  /* ===== DROPDOWN ITEM ===== */
  option: (base: any, state: any) => ({
    ...base,
    fontSize: "13px",
    cursor: "pointer",
    color: state.isSelected || state.isFocused ? "#fff" : "#000",

    background: state.isSelected
      ? "linear-gradient(90deg, #DA0E29 0%, #740716 100%)"
      : state.isFocused
      ? "linear-gradient(90deg, #E73A4D 0%, #9A0F22 100%)"
      : "transparent",

    ":active": {
      background: "linear-gradient(90deg, #DA0E29 0%, #740716 100%)",
    },
  }),
};


/* ================= COMPONENT ================= */

const EditModalRenderer: React.FC<EditModalRendererProps> = ({
  fields,
  values,
  onChange,
  readOnly = false,
}) => {
  return (
    <div className="space-y-3">
      {fields.map((field) => {
        const value = values[field.name];

        return (
          /* ================= FIELD WRAPPER ================= */
          <div key={field.name} className="relative py-2">

            {/* ================= FIELD ROW ================= */}
            <div className="flex items-center min-h-[34px]">

              {/* LEFT GOLD BAR */}
              <div className="w-[2px] h-5 bg-[#C7A35D] mx-2 rounded-tr-md rounded-br-md" />

              {/* LABEL */}
              <div className="w-[130px] text-sm font-medium flex">
                {field.label}
                {field.required && " *"}
              </div>

              {/* VERTICAL GOLD DIVIDER */}
              <div className="w-[2px] h-5 bg-[#C7A35D] mx-3" />

              {/* FIELD CONTROL */}
              <div className="flex-1">

                {/* TEXT / NUMBER */}
                {(field.type === "text" || field.type === "number") && (
                  <input
                    type={field.type}
                    value={value ?? ""}
                    disabled={readOnly}
                    onChange={(e) =>
                      onChange(field.name, e.target.value)
                    }
                    className={`
                      w-full h-8 px-2
                      bg-transparent
                      outline-none
                      text-sm
                      ${readOnly ? "text-gray-600" : "text-black"}
                    `}
                  />
                )}

                {/* SELECT */}
                {field.type === "select" && (
                  <Select
                    isDisabled={readOnly}
                    value={field.options?.find(
                      (opt) => opt.value === value
                    )}
                    onChange={(opt: any) =>
                      onChange(field.name, opt?.value)
                    }
                    options={field.options}
                    styles={selectStyles}
                    isSearchable={false}
                  />
                )}

                {/* CHECKBOX */}
                {field.type === "checkbox" && (
                  <div className="flex items-center gap-2">
                    <Checkbox
                      checked={!!value}
                      disabled={readOnly}
                      onChange={(v) =>
                        onChange(field.name, v)
                      }
                    />
                    <span className="text-sm">{field.label}</span>
                  </div>
                )}

                {/* TOGGLE */}
                {field.type === "toggle" && (
                  <ToggleRadio
                    checked={!!value}
                    disabled={readOnly}
                    onChange={(v) =>
                      onChange(field.name, v)
                    }
                  />
                )}

              </div>
            </div>

            {/* ================= HORIZONTAL GOLD LINE ================= */}
            <div className="absolute left-0 right-0 bottom-1 h-[1px] bg-[#C7A35D]">
              <span
                className="
                  absolute
                  -right-[3px]
                  -top-[3px]
                  w-[6px]
                  h-[6px]
                  rounded-full
                  bg-[#C7A35D]
                "
              />
            </div>

          </div>
        );
      })}
    </div>
  );
};

export default EditModalRenderer;
