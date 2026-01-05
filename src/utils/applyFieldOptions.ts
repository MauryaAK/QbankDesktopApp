import { FieldSchema } from "../components/common/EditModal";

type SelectSource<T> = {
  field: string;               // field name in schema
  data: T[];                   // API data
  labelKey: keyof T;
  valueKey: keyof T;
};

export const attachSelectOptions = <T>(
  fields: FieldSchema[],
  sources: SelectSource<T>[]
): FieldSchema[] => {
  return fields.map((field) => {
    const source = sources.find(
      (s) => s.field === field.name
    );

    if (!source || field.type !== "select") {
      return field;
    }

    return {
      ...field,
      options: source.data.map((item) => ({
        label: String(item[source.labelKey]),
        value: item[source.valueKey],
      })),
    };
  });
};
