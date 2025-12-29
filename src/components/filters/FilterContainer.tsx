// components/filters/FilterContainer.tsx
import React from "react";

const FilterContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      {/* Header */}
      <div className="flex items-center gap-2 mb-3">
        <span className="text-red-500 text-sm">🔻</span>
        <h2 className="font-semibold text-sm tracking-wide">
          FILTER
        </h2>
      </div>

      {/* Fields */}
      <div className="
        grid grid-cols-1
        md:grid-cols-2
        xl:grid-cols-4
        gap-3
      ">
        {children}
      </div>
    </div>
  );
};

export default FilterContainer;
