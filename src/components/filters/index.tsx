// // components/filters/FilterContainer.tsx
// import React from "react";
// import filterBg from "../../assets/filter.svg";

// const FilterContainer = ({ children }: { children: React.ReactNode }) => {
//   return (
//     <div
//       className="rounded-2xl"
//       style={{
//         backgroundSize: "cover",
//         backgroundPosition: "center",
//       }}
//     >
//       <div className="flex items-center gap-1">
//         <img src={filterBg} alt=""/>
//         <h2 className="font-semibold text-lg">FILTER</h2>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-2 mx-4">
//         {children}
//       </div>
//     </div>
//   );
// };

// export default FilterContainer;



// components/filters/FilterContainer.tsx
import React from "react";
import filterBg from "../../assets/filter.svg";

const FilterContainer = ({
  children,
  actions,
}: {
  children: React.ReactNode;
  actions?: React.ReactNode;
}) => {
  return (
    <div className="rounded-2xl px-4 py-1">
      {/* HEADER */}
      <div className="flex items-center gap-1">
        <img src={filterBg} alt="" className="w-5 h-5" />
        <h2 className="font-bold text-md">FILTER</h2>
      </div>

      {/* CONTENT */}
      <div className="flex items-end gap-3">
        {/* LEFT: FILTER FIELDS */}
        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-2">
          {children}
        </div>

        {/* RIGHT: ACTION BUTTONS */}
        {actions && (
          <div className="flex items-center gap-2 pb-1 flex-col justify-center">
            {actions}
          </div>
        )}
      </div>
    </div>
  );
};

export default FilterContainer;
