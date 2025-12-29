// filterTypes.ts
export type FilterFieldType = "select" | "input" | "date";

export interface BaseFilterField {
  key: string;
  label: string;
  type: FilterFieldType;
}

export interface SelectFilterField extends BaseFilterField {
  type: "select";
  options: { label: string; value: string }[];
}

export interface InputFilterField extends BaseFilterField {
  type: "input";
  placeholder?: string;
}

export interface DateFilterField extends BaseFilterField {
  type: "date";
}

export type FilterField =
  | SelectFilterField
  | InputFilterField
  | DateFilterField;
