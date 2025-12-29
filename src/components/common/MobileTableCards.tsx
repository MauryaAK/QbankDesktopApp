// import React from "react";
// import { GridColDef } from "@mui/x-data-grid";
// import { useNavigate } from "react-router-dom";
// import { HiOutlineEye } from "react-icons/hi2";

// interface MobileTableCardsProps {
//   columns: GridColDef[];
//   rows: any[];
//   slug: string;
//   includeActionColumn: boolean;
// }

// const MobileTableCards: React.FC<MobileTableCardsProps> = ({
//   columns,
//   rows,
//   slug,
//   includeActionColumn,
// }) => {
//   const navigate = useNavigate();

//   return (
//     <div className="space-y-3">
//       {rows.map((row) => (
//         <div
//           key={row.id}
//           className="
//             relative overflow-hidden
//             rounded-2xl
//             border border-blue-light/60
//             bg-gradient-to-b from-blue-base/20 via-blue-light/40 to-blue-light/70
//             p-3.5
//             shadow-md shadow-primary/10
//             transition-all duration-300
//             hover:shadow-lg hover:shadow-primary/20
//             hover:-translate-y-0.5
//           "
//         >
//           {/* Optional subtle white overlay for better text readability */}
//           <div className="absolute inset-0 bg-white/40 pointer-events-none" />

//           <div className="relative">
//             {/* Header: ID + View Button */}
//             <div className="flex items-center justify-between mb-2.5">
//               <span className="text-base font-heading font-extrabold text-primary">
//                 #{row.id}
//               </span>

//               {includeActionColumn && (
//                 <button
//                   onClick={() => navigate(`/${slug}/${row.id}`)}
//                   className="
//                     flex items-center gap-1
//                     px-2.5 py-1
//                     bg-primary text-white
//                     text-xs font-heading font-semibold
//                     rounded-full
//                     shadow-sm
//                     transition-all duration-200
//                     hover:bg-primary/90
//                     active:scale-95
//                   "
//                 >
//                   <HiOutlineEye className="w-3 h-3" />
//                   View
//                 </button>
//               )}
//             </div>

//             {/* Compact Data Fields */}
//             <div className="space-y-1.5">
//               {columns.map((col) => {
//                 if (!col.field || col.field === "action") return null;

//                 const value =
//                   typeof col.valueGetter === "function"
//                     ? col.valueGetter({ row })
//                     : row[col.field];

//                 if (value === null || value === undefined || value === "") return null;

//                 return (
//                   <div key={col.field} className="flex justify-between items-center">
//                     <span className="text-[10px] text-gray-dark font-medium uppercase tracking-wide">
//                       {col.headerName}
//                     </span>

//                     <span
//                       className="
//                         text-xs
//                         font-bold
//                         text-primary
//                         bg-white/80
//                         px-2.5 py-0.5
//                         rounded-md
//                         shadow-sm
//                       "
//                     >
//                       {value ?? "-"}
//                     </span>
//                   </div>
//                 );
//               })}
//             </div>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default MobileTableCards;









import React from "react";
import { GridColDef } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import { HiOutlineEye } from "react-icons/hi2";

interface MobileTableCardsProps {
  columns: GridColDef[];
  rows: any[];
  slug: string;
  includeActionColumn: boolean;
}

const MobileTableCards: React.FC<MobileTableCardsProps> = ({
  columns,
  rows,
  slug,
  includeActionColumn,
}) => {
  const navigate = useNavigate();

  const getCellValue = (col: GridColDef, row: any) => {
    if (!col.field) return null;

    const rawValue = row[col.field];

    if (col.valueFormatter) {
      return col.valueFormatter({ value: rawValue } as any);
    }

    return rawValue;
  };


  return (
    <div className="space-y-3">
      {rows.map((row) => (
        <div
          key={row.id}
          className="
            relative overflow-hidden
            rounded-2xl
            border border-blue-light/60
            bg-gradient-to-b from-blue-base/20 via-blue-light/40 to-blue-light/70
            p-3.5
            shadow-md shadow-primary/10
            transition-all duration-300
            hover:shadow-lg hover:shadow-primary/20
            hover:-translate-y-0.5
          "
        >
          <div className="absolute inset-0 bg-white/40 pointer-events-none" />

          <div className="relative">
            {/* Header */}
            <div className="flex items-center justify-between mb-2.5">
              <span className="text-base font-heading font-extrabold text-primary">
                #{row.id}
              </span>

              {includeActionColumn && (
                <button
                  onClick={() => navigate(`/${slug}/${row.id}`)}
                  className="
                    flex items-center gap-1
                    px-2.5 py-1
                    bg-primary text-white
                    text-xs font-heading font-semibold
                    rounded-full
                    shadow-sm
                    transition-all duration-200
                    hover:bg-primary/90
                    active:scale-95
                  "
                >
                  <HiOutlineEye className="w-3 h-3" />
                  View
                </button>
              )}
            </div>

            {/* Data */}
            <div className="space-y-1.5">
              {columns.map((col) => {
                if (!col.field || col.field === "action") return null;

                const value = getCellValue(col, row);

                if (
                  value === null ||
                  value === undefined ||
                  value === ""
                )
                  return null;

                return (
                  <div
                    key={col.field}
                    className="flex justify-between items-center"
                  >
                    <span className="text-[10px] text-gray-dark font-medium uppercase tracking-wide">
                      {col.headerName}
                    </span>

                    <span
                      className="
                        text-xs
                        font-bold
                        text-primary
                        bg-white/80
                        px-2.5 py-0.5
                        rounded-md
                        shadow-sm
                      "
                    >
                      {value}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MobileTableCards;
