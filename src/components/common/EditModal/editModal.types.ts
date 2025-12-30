export type FieldType =
  | "text"
  | "number"
  | "select"
  | "checkbox"
  | "checkbox-group"
  | "toggle";

export interface FieldOption {
  label: string;
  value: any;
}

export interface FieldSchema {
  name: string;
  label: string;
  type: FieldType;
  required?: boolean;
  options?: FieldOption[];
}
