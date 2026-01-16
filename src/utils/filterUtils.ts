export const getUniqueOptions = (
  rows: any[],
  key: string,
  labelFormatter?: (val: any) => string
) => {
  const set = new Set<any>();

  rows.forEach((row) => {
    const value = row[key];
    if (value !== null && value !== undefined && value !== "") {
      set.add(value);
    }
  });

  return Array.from(set).map((val) => ({
    label: labelFormatter ? labelFormatter(val) : String(val),
    value: val,
  }));
};

export const applyLocalFilters = (
  rows: any[],
  filters: Record<string, any>
) => {
  return rows.filter((row) =>
    Object.entries(filters).every(([key, filterValue]) => {
      if (!filterValue) return true;

      const rowValue = row[key];

      if (typeof filterValue === "string") {
        return String(rowValue ?? "")
          .toLowerCase()
          .includes(filterValue.toLowerCase());
      }

      return rowValue === filterValue;
    })
  );
};


interface ValidateConfig {
  fields: { key: string; label: string }[];
  values: Record<string, any>;
}

export const validateRequiredFields = ({ fields, values }: ValidateConfig) => {
  for (const field of fields) {
    const value = values[field.key];

    if (
      value === undefined ||
      value === null ||
      value === ""
    ) {
      return `${field.label} is required`;
    }
  }
  return "";
};


