// components/filters/FilterContainer.tsx
import React from "react";
import filterBg from "../../assets/filter.svg";

const FilterContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <div
      className="rounded-2xl"
      style={{
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="flex items-center gap-1">
        <img src={filterBg} alt=""/>
        <h2 className="font-semibold text-lg">FILTER</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-2 mx-4">
        {children}
      </div>
    </div>
  );
};

export default FilterContainer;
