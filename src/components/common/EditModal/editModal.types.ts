// export type FieldType =
//   | "text"
//   | "number"
//   | "select"
//   | "checkbox"
//   | "checkbox-group"
//   | "toggle";

// export interface FieldOption {
//   label: string;
//   value: any;
// }

// export interface FieldSchema {
//   name: string;
//   label: string;
//   type: FieldType;
//   required?: boolean;
//   options?: FieldOption[];
// }


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

  /* 🔥 DISABLE CONTROL */
  disabled?: boolean | ((values: Record<string, any>) => boolean);

  /* 🔥 VALIDATION (OPTIONAL) */
  min?: number;
  max?: number;
  email?: boolean;
  matches?: RegExp;
  when?: {
    field: string;
    is: any;
    thenRequired?: boolean;
  };

  options?: FieldOption[];
}
