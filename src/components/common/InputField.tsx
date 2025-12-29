// import React from "react";

// interface InputFieldProps {
//   label: string;
//   placeholder?: string;
//   value: string;
//   onChange: (val: string) => void;
// }

// const InputField: React.FC<InputFieldProps> = ({
//   label,
//   placeholder,
//   value,
//   onChange,
// }) => {
//   return (
//     <div className="flex flex-col gap-[1px] w-full">
//       <label className="text-xs font-medium text-black uppercase">
//         {label}
//       </label>
//       <input
//         value={value}
//         onChange={(e) => onChange(e.target.value)}
//         placeholder={placeholder}
//         className="h-8 px-3 rounded-md border border-[#2BA2FF80]
//                    text-xs text-gray-700 bg-white
//                    focus:outline-none focus:ring-1 focus:ring-blue-500"
//       />
//     </div>
//   );
// };

// export default InputField;








import React from "react";

interface InputFieldProps {
  label: string;
  placeholder?: string;
  value: string;
  onChange: (val: string) => void;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  placeholder = "Enter",
  value,
  onChange,
}) => {
  return (
    <div className="flex items-center gap-2 w-full">
      {/* LABEL */}
      <span
        className="
          min-w-[90px]
          text-xs
          font-medium
          text-gray-600
        "
      >
        {label}
      </span>

      {/* INPUT */}
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="
          h-8 w-full
          px-2
          rounded-lg
          border
          text-[12px]
          text-gray-700
          bg-white
          border-[#fbcfe8]
          focus:outline-none
          focus:border-[#ec4899]
          focus:ring-0
        "
      />
    </div>
  );
};

export default InputField;
