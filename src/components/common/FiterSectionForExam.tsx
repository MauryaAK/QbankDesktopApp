

import React, { useEffect, useState } from "react";
import FilterContainer from "../filters";
import { SelectField } from "./SelectField";
import InputField from "./InputField";
import DateField from "./DateField";
import { FilterField } from "./filterTypes";
import { addDays } from "date-fns";
import CheckboxField from "./CheckboxField";


interface FieldMappingConfig {
    sourceField: string;
    targetField: string;
    data: any[];
    matchKey: string;
    targetLabel: string;
    targetValue: string;

}

interface FilterSectionForExamProps {
    fields: FilterField[];
    label?: string;
    filters: any;
    setFilters: any;
    /** Optional */
    showActionButtons?: boolean;

    /** Action callbacks */
    onApply?: (filters: Record<string, any>) => void;
    /** Button labels */
    applyLabel?: string;

    /** Button states */
    applyDisabled?: boolean;
    minMaxDate?: any;
}

const FilterSectionForExam: React.FC<FilterSectionForExamProps> = ({
    fields,
    minMaxDate,
    label,
    showActionButtons = false,
    onApply,
    applyLabel = "Add New",
    applyDisabled = false,
    filters,
    setFilters,
}) => {
    const [examPhaseOptions, setExamPhaseOptions] = useState<
        { label: string; value: string }[]
    >([]);

    /* ===== EMIT FILTERS TO PARENT (LIVE CHANGE) ===== */

    const handleGenerateExamPhase = (number) => {

        const option = {
            label: `Phase ${number + 1}`,
            value: `phase${number + 1}`,
        };

        setExamPhaseOptions((prev) => [
            ...prev,
            option,
        ]);
    };

    const handleOnChange = (val, field) => {
        const updated = { ...filters, [field.key]: val };
        setFilters(updated)
    }


    /* ===== FIELD RENDERER ===== */
    const renderField = (field: FilterField) => {

        switch (field.type) {
            case "select":
                if (field.key === "examPhase") {
                    return (
                        <SelectField
                            onClickPlus={() => handleGenerateExamPhase([...field.options, ...examPhaseOptions].length)}
                            key={field.key}
                            label={field.label}
                            options={[...field.options, ...examPhaseOptions]}
                            value={filters[field.key] ?? null}
                            onChange={(val) =>
                                handleOnChange(val, field)
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
                            handleOnChange(val, field)
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
                            handleOnChange(val, field)
                        }
                    />
                );

            case "date":
                return (
                    <DateField
                        key={field.key}
                        label={field.label}
                        minDate={field.key == "examDate" ? minMaxDate?.min : new Date()}
                        maxDate={field.key == "examDate" ? minMaxDate?.max : addDays(new Date(), 120)}
                        value={filters[field.key] ?? null}
                        onChange={(val) =>
                            handleOnChange(val, field)
                        }
                    />
                );
            case "datetime":
                return (
                    <DateField
                        showTime={true}
                        key={field.key}
                        label={field.label}
                        minDate={field.key == "examDate" ? minMaxDate?.min : new Date()}
                        maxDate={field.key == "examDate" ? minMaxDate?.max : addDays(new Date(), 120)}
                        value={filters[field.key] ?? null}
                        onChange={(val) =>
                            handleOnChange(val, field)
                        }
                    />
                );

            case "check":
                return (
                    <CheckboxField
                        key={field.key}
                        label={field.label}
                        checked={!!filters[field.key]}
                        onChange={(val) => handleOnChange(val, field)}
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

export default FilterSectionForExam;
