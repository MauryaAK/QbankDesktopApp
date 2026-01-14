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


interface FieldMappingConfig {
  sourceField: string;
  targetField: string;
  data: any[];
  matchKey: string;
  targetLabel: string;
  targetValue: string;
}

interface FilterSectionProps {
  fields: FilterField[];
  label?: string;
  onChange: (filters: Record<string, any>) => void;

  /** Optional */
  initialValues?: Record<string, any>;
  showActionButtons?: boolean;

  /** Action callbacks */
  onApply?: (filters: Record<string, any>) => void;
  /** Button labels */
  applyLabel?: string;
  resetLabel?: string;

  /** Button states */
  applyDisabled?: boolean;
  fieldMapping?: FieldMappingConfig;
}

const FilterSection: React.FC<FilterSectionProps> = ({
  fields,
  label,
  onChange,
  initialValues = {},
  showActionButtons = false,
  onApply,
  applyLabel = "Add New",
  resetLabel = "Reset",
  applyDisabled = false,
  fieldMapping
}) => {
  const [filters, setFilters] = useState<Record<string, any>>(initialValues);
  const [examPhaseOptions, setExamPhaseOptions] = useState<
    { label: string; value: string }[]
  >([]);

  /* ===== EMIT FILTERS TO PARENT (LIVE CHANGE) ===== */
  useEffect(() => {
    onChange(filters);
  }, [filters, onChange]);

  const handleGenerateExamPhase = () => {
    const number = examPhaseOptions.length + 1;

    const option = {
      label: `Phase ${number}`,
      value: `phase${number}`,
    };

    setExamPhaseOptions((prev) => [
      ...prev,
      option,
    ]);
  };



  /* ===== FIELD RENDERER ===== */
  const renderField = (field: FilterField) => {
    switch (field.type) {
      case "select":
        if (field.key === "examPhase") {
          return (
            <SelectField
              onClickPlus={handleGenerateExamPhase}
              key={field.key}
              label={field.label}
              options={examPhaseOptions || []}
              value={filters[field.key] ?? null}
              onChange={(val) =>
                setFilters((prev) => ({ ...prev, [field.key]: val }))
              }
            />

          );
        }
        return (
          <SelectField
            key={field.key}
            label={field.label}
            options={field.options || []}
            value={filters[field.key] ?? null}
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
            value={filters[field.key] ?? ""}
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
            value={filters[field.key] ?? null}
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
    <FilterContainer
      label={label}
      actions={
        showActionButtons && (


          <button
            disabled={applyDisabled}
            onClick={() => onApply?.(filters)}
            className="h-8 px-5 rounded-md bg-red-700 text-white hover:bg-red-800 disabled:opacity-50 text-sm"
          >
            {applyLabel}
          </button>
        )
      }
    >
      {fields.map(renderField)}
    </FilterContainer>
  );
};

export default FilterSection;
