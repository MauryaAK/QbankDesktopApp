// import React, { useState } from "react";
// import FilterContainer from "../filters";
// import { SelectField } from "./SelectField";
// const TOP_NAV_BUTTONS = [
//     "Dashboard",
//     "Administration",
//     "Question Bank Mgmt",
//     "Exam Paper Mgmt",
//     "Exam Status / Hard Copy",
//     "Report",
// ];

// const FILTER_FIELDS = [
//     { key: "aircraftType", label: "Aircraft Type" },
//     { key: "ata", label: "ATA" },
//     { key: "complexity", label: "Complexity" },
//     { key: "questionId", label: "Question ID" },
//     { key: "bookTitle", label: "Book Title" },
//     { key: "chapter", label: "Chapter" },
//     { key: "topic", label: "Topic" },
//     { key: "page", label: "Page" },
// ];
// const options = [
//     { label: "Administration", value: "admin" },
//     { label: "Operations", value: "ops" },
//     { label: "Finance", value: "finance" },
// ];
// const FilterSection = () => {
//     const [filters, setFilters] = useState<Record<string, any>>({});
//     return (<FilterContainer>
//         {FILTER_FIELDS.map((field) => (
//             <SelectField
//                 key={field.key}
//                 label={field.label}
//                 options={[]}
//                 value={filters[field.key] || null}
//                 onChange={(val) =>
//                     setFilters((prev) => ({ ...prev, [field.key]: val }))
//                 }
//             />
//         ))}
//     </FilterContainer>)
// }


// export { FilterSection }













import React, { useEffect, useState } from "react";
import FilterContainer from "../filters";
import { SelectField } from "./SelectField";
import InputField from "./InputField";
import DateField from "./DateField";
import { FilterField } from "./filterTypes";

interface FilterSectionProps {
  fields: FilterField[];
  onChange: (filters: Record<string, any>) => void;
  initialValues?: Record<string, any>;
}

const FilterSection: React.FC<FilterSectionProps> = ({
  fields,
  onChange,
  initialValues = {},
}) => {
  const [filters, setFilters] = useState<Record<string, any>>(initialValues);

  /* ===== EMIT FILTERS TO PARENT ===== */
  useEffect(() => {
    onChange(filters);
  }, [filters, onChange]);

  /* ===== FIELD RENDERER ===== */
  const renderField = (field: FilterField) => {
    switch (field.type) {
      case "select":
        return (
          <SelectField
            key={field.key}
            label={field.label}
            options={field.options}
            value={filters[field.key] || null}
            onChange={(val) =>
              setFilters((prev) => ({ ...prev, [field.key]: val }))
            }
          />
        );

      case "input":
        return (
          <InputField
            key={field.key}
            label={field.label}
            placeholder={field.placeholder}
            value={filters[field.key] || ""}
            onChange={(val) =>
              setFilters((prev) => ({ ...prev, [field.key]: val }))
            }
          />
        );

      case "date":
        return (
          <DateField
            key={field.key}
            label={field.label}
            value={filters[field.key] || null}
            onChange={(date) =>
              setFilters((prev) => ({ ...prev, [field.key]: date }))
            }
          />
        );

      default:
        return null;
    }
  };

  return (
    <FilterContainer>
      {fields.map((field) => renderField(field))}
    </FilterContainer>
  );
};

export default FilterSection;
