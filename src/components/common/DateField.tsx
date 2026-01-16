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




// import React, { useState, useRef, useEffect } from "react";
// import Calendar from "react-calendar";
// import { format } from "date-fns";

// interface DateFieldProps {
//   label: string;
//   value: Date | null;
//   onChange: (date: Date | null) => void;
// }

// const DateField: React.FC<DateFieldProps> = ({
//   label,
//   value,
//   onChange,
// }) => {
//   const [open, setOpen] = useState(false);
//   const ref = useRef<HTMLDivElement>(null);

//   /* ================= CLICK OUTSIDE ================= */
//   useEffect(() => {
//     const handleClickOutside = (e: MouseEvent) => {
//       if (ref.current && !ref.current.contains(e.target as Node)) {
//         setOpen(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () =>
//       document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   return (
//     <div className="flex items-center gap-2 w-full" ref={ref}>
//       {/* LABEL */}
//       <span
//         className="
//           min-w-[90px]
//           text-xs
//           font-medium
//           text-gray-600
//         "
//       >
//         {label}
//       </span>

//       {/* INPUT */}
//       <div className="relative w-full">
//         <input
//           readOnly
//           value={value ? format(value, "dd-MM-yyyy") : ""}
//           placeholder="Select"
//           onClick={() => setOpen((prev) => !prev)}
//           className="
//             h-8 w-full
//             px-2
//             rounded-lg
//             border
//             text-[12px]
//             text-gray-700
//             bg-white
//             cursor-pointer
//             border-[#fbcfe8]
//             focus:outline-none
//             focus:border-[#ec4899]
//             focus:ring-0
//           "
//         />
        

//         {/* CALENDAR DROPDOWN */}
//         {open && (
//           <div
//             className="
//               absolute
//               z-50
//               mt-1
//               bg-white
//               border
//               border-[#fbcfe8]
//               rounded-lg
//               shadow-lg
//               p-2
//             "
//           >
//             <Calendar
//               onChange={(date: any) => {
//                 onChange(date);
//                 setOpen(false);
//               }}
//               value={value}
//               className="!w-[220px] text-xs"
//               tileClassName="!p-1"
//             />
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default DateField;







// import React, { useState, useRef, useEffect } from "react";
// import Calendar from "react-calendar";
// import { addDays, format } from "date-fns";
// import { FaRegCalendarAlt } from "react-icons/fa"; // ✅ ADD THIS

// interface DateFieldProps {
//   label: string;
//   value: Date | null;
//   onChange: (date: Date | null) => void;
//   minDate?:Date | null;
//   maxDate?:Date | null;
// }

// const DateField: React.FC<DateFieldProps> = ({
//   label,
//   value,
//   onChange,
//   minDate=new Date(),
//   maxDate
// }) => {
//   const [open, setOpen] = useState(false);
//   const ref = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     const handleClickOutside = (e: MouseEvent) => {
//       if (ref.current && !ref.current.contains(e.target as Node)) {
//         setOpen(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () =>
//       document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   return (
//     <div className="flex items-center gap-2 w-full" ref={ref}>
//       {/* LABEL */}
//       <span className="min-w-[90px] text-xs font-medium text-gray-600">
//         {label}
//       </span>

//       {/* INPUT */}
//       <div className="relative w-full">
//         <input
//           readOnly
//           value={value ? format(value, "dd-MM-yyyy") : ""}
//           placeholder="Select"
//           onClick={() => setOpen((prev) => !prev)}
//           className="
//             h-8 w-full
//             px-2 pr-8   /* ✅ SPACE FOR ICON */
//             rounded-lg
//             border
//             text-[12px]
//             text-gray-700
//             bg-white
//             cursor-pointer
//             border-[#fbcfe8]
//             focus:outline-none
//             focus:border-[#ec4899]
//             focus:ring-0
//           "
//         />

//         {/* ✅ CALENDAR ICON */}
//         <FaRegCalendarAlt
//           className="
//             absolute
//             right-2
//             top-1/2
//             -translate-y-1/2
//             text-gray-400
//             text-xs
//             pointer-events-none
//           "
//         />

//         {/* CALENDAR DROPDOWN */}
//         {open && (
//           <div
//             className="
//               absolute
//               z-50
//               mt-1
//               bg-white
//               border
//               border-[#fbcfe8]
//               rounded-lg
//               shadow-lg
//               p-2
//             "
//           >
//             <Calendar
//               onChange={(date: any) => {
//                 onChange(date);
//                 setOpen(false);
//               }}
//               value={value}
//               minDate={minDate}
//               maxDate={maxDate}
//               className="!w-[220px] text-xs"
//               tileClassName="!p-1"
//             />
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default DateField;






import React, { useState, useRef, useEffect } from "react";
import Calendar from "react-calendar";
import { format, setHours, setMinutes } from "date-fns";
import { FaRegCalendarAlt } from "react-icons/fa";

interface DateFieldProps {
  label: string;
  value: Date | null;
  onChange: (date: Date | null) => void;
  minDate?: Date | null;
  maxDate?: Date | null;
  showTime?: boolean;              // ✅ NEW
  timeFormat?: "24" | "12";        // ✅ NEW
}

const DateField: React.FC<DateFieldProps> = ({
  label,
  value,
  onChange,
  minDate = new Date(),
  maxDate,
  showTime = false,
  timeFormat = "24",
}) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

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

  const handleTimeChange = (time: string) => {
    if (!value) return;

    const [h, m] = time.split(":").map(Number);
    const updatedDate = setMinutes(setHours(value, h), m);

    onChange(updatedDate);
  };

  return (
    <div className="flex items-center gap-2 w-full" ref={ref}>
      {/* LABEL */}
      <span className="min-w-[90px] text-xs font-medium text-gray-600">
        {label}
      </span>

      {/* INPUT WRAPPER */}
      <div className="relative w-full">
        <div
          className="
            h-8
            w-full
            flex
            items-center
            rounded-lg
            border
            border-[#fbcfe8]
            bg-white
            px-2
            text-[12px]
            text-gray-700
            cursor-pointer
            focus-within:border-[#ec4899]
          "
          onClick={() => setOpen((prev) => !prev)}
        >
          {/* DATE TEXT */}
          <input
            readOnly
            value={value ? format(value, "dd-MM-yyyy") : ""}
            placeholder="Select"
            className="flex-1 bg-transparent outline-none cursor-pointer"
          />

          {/* TIME INPUT (OPTIONAL) */}
          {showTime && (
            <input
              type="time"
              value={
                value
                  ? format(value, timeFormat === "24" ? "HH:mm" : "hh:mm")
                  : ""
              }
              onClick={(e) => e.stopPropagation()}
              onChange={(e) => handleTimeChange(e.target.value)}
              className="
                w-[72px]
                bg-transparent
                outline-none
                text-xs
                text-gray-600
                border-l
                border-gray-200
                pl-2
              "
            />
          )}

          {/* CALENDAR ICON */}
          <FaRegCalendarAlt className="ml-2 text-gray-400 text-xs pointer-events-none" />
        </div>

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
                const selectedDate = value
                  ? setMinutes(
                      setHours(date, value.getHours()),
                      value.getMinutes()
                    )
                  : date;

                onChange(selectedDate);
                setOpen(false);
              }}
              value={value}
              minDate={minDate}
              maxDate={maxDate}
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
