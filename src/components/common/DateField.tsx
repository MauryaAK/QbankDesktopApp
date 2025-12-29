// import React, { useState, useRef, useEffect } from "react";
// import Calendar from "react-calendar";
// import { format } from "date-fns";

// interface DateFieldProps {
//     label: string;
//     value: Date | null;
//     onChange: (date: Date | null) => void;
// }

// const DateField: React.FC<DateFieldProps> = ({ label, value, onChange }) => {
//     const [open, setOpen] = useState(false);
//     const ref = useRef<HTMLDivElement>(null);

//     useEffect(() => {
//         const handleClickOutside = (e: MouseEvent) => {
//             if (ref.current && !ref.current.contains(e.target as Node)) {
//                 setOpen(false);
//             }
//         };
//         document.addEventListener("mousedown", handleClickOutside);
//         return () => document.removeEventListener("mousedown", handleClickOutside);
//     }, []);

//     return (
//         <div className="relative w-full" ref={ref}>
//             <label className="text-xs font-medium text-black uppercase mb-[1px] block">
//                 {label}
//             </label>

//             <input
//                 readOnly
//                 onClick={() => setOpen(!open)}
//                 value={value ? format(value, "dd-MM-yyyy") : ""}
//                 placeholder="DD-MM-YYYY"
//                 className="h-8 w-full px-3 rounded-md border border-[#2BA2FF80]
//                    text-xs text-gray-700 bg-white cursor-pointer
//                    focus:outline-none focus:ring-1 focus:ring-blue-500"
//             />

//             {open && (
//                 <div className="absolute z-50 mt-2 bg-white border rounded-lg shadow-lg p-2">
//                     <Calendar
//                         onChange={(date: any) => {
//                             onChange(date);
//                             setOpen(false);
//                         }}
//                         value={value}
//                         className="!w-[220px] text-sm"
//                         tileClassName="!p-1"
//                     />
//                 </div>
//             )}
//         </div>
//     );
// };

// export default DateField;




import React, { useState, useRef, useEffect } from "react";
import Calendar from "react-calendar";
import { format } from "date-fns";

interface DateFieldProps {
  label: string;
  value: Date | null;
  onChange: (date: Date | null) => void;
}

const DateField: React.FC<DateFieldProps> = ({
  label,
  value,
  onChange,
}) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  /* ================= CLICK OUTSIDE ================= */
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="flex items-center gap-2 w-full" ref={ref}>
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
      <div className="relative w-full">
        <input
          readOnly
          value={value ? format(value, "dd-MM-yyyy") : ""}
          placeholder="Select"
          onClick={() => setOpen((prev) => !prev)}
          className="
            h-8 w-full
            px-2
            rounded-lg
            border
            text-[12px]
            text-gray-700
            bg-white
            cursor-pointer
            border-[#fbcfe8]
            focus:outline-none
            focus:border-[#ec4899]
            focus:ring-0
          "
        />

        {/* CALENDAR DROPDOWN */}
        {open && (
          <div
            className="
              absolute
              z-50
              mt-1
              bg-white
              border
              border-[#fbcfe8]
              rounded-lg
              shadow-lg
              p-2
            "
          >
            <Calendar
              onChange={(date: any) => {
                onChange(date);
                setOpen(false);
              }}
              value={value}
              className="!w-[220px] text-xs"
              tileClassName="!p-1"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default DateField;






