// import React from "react";
// import Select from "react-select";
// import Checkbox from "../Checkbox";
// import ToggleRadio from "../ToggleRadio";
// import { FieldSchema } from "./editModal.types";

// interface EditModalRendererProps {
//   fields: FieldSchema[];
//   values: Record<string, any>;
//   onChange: (name: string, value: any) => void;
//   readOnly?: boolean;
// }

// /* ================= REACT SELECT STYLE (COMPACT) ================= */

// const selectStyles = {
//   control: (base: any, state: any) => ({
//     ...base,
//     minHeight: 32,
//     height: 32,
//     border: "none",
//     boxShadow: "none",
//     backgroundColor: state.isDisabled ? "#E5E5E5" : "transparent",
//     borderRadius: 4,
//   }),

//   menuList: (base: any) => ({
//     ...base,
//     maxHeight: 200,     // height limit
//     overflowY: "auto",  // 🔥 SCROLL ENABLED
//   }),
//   valueContainer: (base: any) => ({
//     ...base,
//     padding: "0 8px",
//   }),

//   singleValue: (base: any) => ({
//     ...base,
//     color: "#000",
//     fontSize: "13px",
//   }),

//   indicatorsContainer: (base: any) => ({
//     ...base,
//     height: 32,
//   }),

//   indicatorSeparator: () => ({
//     display: "none",
//   }),

//   /* ===== DROPDOWN MENU ===== */
//   menu: (base: any) => ({
//     ...base,
//     marginTop: 4,
//     borderRadius: 6,
//     overflow: "hidden",
//   }),

//   /* ===== DROPDOWN ITEM ===== */
//   option: (base: any, state: any) => ({
//     ...base,
//     fontSize: "13px",
//     cursor: "pointer",
//     color: state.isSelected || state.isFocused ? "#fff" : "#000",

//     background: state.isSelected
//       ? "linear-gradient(90deg, #DA0E29 0%, #740716 100%)"
//       : state.isFocused
//         ? "linear-gradient(90deg, #E73A4D 0%, #9A0F22 100%)"
//         : "transparent",

//     ":active": {
//       background: "linear-gradient(90deg, #DA0E29 0%, #740716 100%)",
//     },
//   }),
// };


// /* ================= COMPONENT ================= */

// const EditModalRenderer: React.FC<EditModalRendererProps> = ({
//   fields,
//   values,
//   onChange,
//   readOnly = false,
// }) => {
//   return (
//     <div className="space-y-3">
//       {fields.map((field) => {
//         const value = values[field.name];

//         return (
//           /* ================= FIELD WRAPPER ================= */
//           <div key={field.name} className="relative py-2">

//             {/* ================= FIELD ROW ================= */}
//             <div className="flex items-center min-h-[34px]">

//               {/* LEFT GOLD BAR */}
//               <div className="w-[2px] h-5 bg-[#C7A35D] mx-2 rounded-tr-md rounded-br-md" />

//               {/* LABEL */}
//               <div className="w-[130px] text-sm font-medium flex">
//                 {field.label}
//                 {field.required && " *"}
//               </div>

//               {/* VERTICAL GOLD DIVIDER */}
//               <div className="w-[2px] h-5 bg-[#C7A35D] mx-3" />

//               {/* FIELD CONTROL */}
//               <div className="flex-1">

//                 {/* TEXT / NUMBER */}
//                 {(field.type === "text" || field.type === "number") && (
//                   <input
//                     type={field.type}
//                     value={value ?? ""}
//                     disabled={readOnly}
//                     onChange={(e) =>
//                       onChange(field.name, e.target.value)
//                     }
//                     className={`
//                       w-full h-8 px-2
//                       bg-transparent
//                       outline-none
//                       text-sm
//                       ${readOnly ? "text-gray-600" : "text-black"}
//                     `}
//                   />
//                 )}

//                 {/* SELECT */}
//                 {field.type === "select" && (
//                   <Select
//                     isDisabled={readOnly}
//                     value={field.options?.find(
//                       (opt) => opt.value === value
//                     )}
//                     onChange={(opt: any) =>
//                       onChange(field.name, opt?.value)
//                     }
//                     options={field.options}
//                     styles={selectStyles}
//                     isSearchable={false}
//                   />
//                 )}

//                 {/* CHECKBOX */}
//                 {field.type === "checkbox" && (
//                   <div className="flex items-center gap-2">
//                     <Checkbox
//                       checked={!!value}
//                       disabled={readOnly}
//                       onChange={(v) =>
//                         onChange(field.name, v)
//                       }
//                     />
//                     <span className="text-sm">{field.label}</span>
//                   </div>
//                 )}

//                 {/* TOGGLE */}
//                 {field.type === "toggle" && (
//                   <ToggleRadio
//                     checked={!!value}
//                     disabled={readOnly}
//                     onChange={(v) =>
//                       onChange(field.name, v)
//                     }
//                   />
//                 )}

//               </div>
//             </div>

//             {/* ================= HORIZONTAL GOLD LINE ================= */}
//             <div className="absolute left-0 right-0 bottom-1 h-[1px] bg-[#C7A35D]">
//               <span
//                 className="
//                   absolute
//                   -right-[3px]
//                   -top-[3px]
//                   w-[6px]
//                   h-[6px]
//                   rounded-full
//                   bg-[#C7A35D]
//                 "
//               />
//             </div>

//           </div>
//         );
//       })}
//     </div>
//   );
// };

// export default EditModalRenderer;
import Select from "react-select";
import { useFormikContext } from "formik";
import Checkbox from "../Checkbox";
import ToggleRadio from "../ToggleRadio";
import { FieldSchema } from "./editModal.types";

interface Props {
  fields: FieldSchema[];
  values: Record<string, any>;
  onChange: (name: string, value: any) => void;
  readOnly?: boolean;
}


const selectStyles = {
  control: (base: any, state: any) => ({
    ...base,
    minHeight: 32,
    height: 32,
    border: "none",
    boxShadow: "none",
    backgroundColor: state.isDisabled ? "#E5E5E5" : "transparent",
    borderRadius: 4,
  }),

  menuList: (base: any) => ({
    ...base,
    maxHeight: 200,     // height limit
    overflowY: "auto",  // 🔥 SCROLL ENABLED
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

const EditModalRenderer = ({
  fields,
  values,
  onChange,
  readOnly,
}: Props) => {
  const { errors, touched } = useFormikContext<any>();

  return (
    <div className="space-y-3">
      {fields.map((field) => {
        const error = touched[field.name] && errors[field.name];
        const isDisabled =
          typeof field.disabled === "function"
            ? field.disabled(values)
            : field.disabled;

        return (
          <div key={field.name} className="relative py-2">
            <div className="flex items-center min-h-[34px]">
              <div className="w-[2px] h-5 bg-[#C7A35D] mx-2 rounded-tr-md rounded-br-md" />

              <div className="w-[130px] text-sm font-medium">
                {field.label}
                {field.required && " *"}
              </div>
              <div className="w-[2px] h-5 bg-[#C7A35D] mx-3" />

              <div className="flex-1">
                {(field.type === "text" ||
                  field.type === "number") && (
                    <input
                      type={field.type}
                      value={values[field.name] ?? ""}
                      disabled={isDisabled}
                      onChange={(e) =>
                        onChange(field.name, e.target.value)
                      }
                      className={`
                      w-full h-8 px-2 bg-transparent outline-none text-sm
                      ${isDisabled ? "text-gray-500 cursor-not-allowed" : ""}
                    `}
                    />
                  )}

                {field.type === "select" && (
                  <Select
                    value={field.options?.find(
                      (o) => o.value === values[field.name]
                    )}
                    options={field.options}
                    onChange={(o: any) =>
                      onChange(field.name, o?.value)
                    }
                    styles={selectStyles}
                    isDisabled={isDisabled}
                    isSearchable={false}
                  />
                )}

                {field.type === "checkbox" && (
                  <Checkbox
                    disabled={isDisabled}
                    checked={!!values[field.name]}
                    onChange={(v) =>
                      onChange(field.name, v)
                    }
                  />
                )}

                {field.type === "toggle" && (
                  <ToggleRadio
                    disabled={isDisabled}
                    checked={!!values[field.name]}
                    onChange={(v) =>
                      onChange(field.name, v)
                    }
                  />
                )}
              </div>
            </div>

            {error && !isDisabled && (
              <div className="text-xs text-red-600 ml-[160px] mt-1">
                {error}
              </div>
            )}

            <div className="absolute left-0 right-0 bottom-1 h-[1px] bg-[#C7A35D]" />
          </div>
        );
      })}
    </div>
  );
};

export default EditModalRenderer;
