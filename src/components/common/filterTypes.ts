// filterTypes.ts
export type FilterFieldType = "select" | "input" | "date"|"datetime"|"check";

export interface BaseFilterField {
  key: string;
  label: string;
  type: FilterFieldType;
}

export interface SelectFilterField extends BaseFilterField {
  type: "select";
  options: { label: string; value: string }[];
  isCreateAllowed?:boolean;
}

export interface InputFilterField extends BaseFilterField {
  type: "input";
  placeholder?: string;
}

export interface DateFilterField extends BaseFilterField {
  type: "date";
}
export interface BtnFilterField {
  type: "btn";
}

export interface DateTimeFilterField extends BaseFilterField  {
  type: "datetime";
}
export interface CheckFilterField extends BaseFilterField  {
  type: "check";
}

export type FilterField =
  | SelectFilterField
  | InputFilterField
  | BtnFilterField
  | DateFilterField
  | DateTimeFilterField
  |CheckFilterField;
