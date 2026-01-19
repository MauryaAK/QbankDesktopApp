type Option = { label: string; value: any };

type Field = {
  key: string;
  options?: Option[];
  [key: string]: any;
};

export function buildFilterFieldsWithOptions<T>(
  baseFields: Field[],
  apiData: T[] | undefined | null
): Field[] {
  const rows = apiData ?? [];

  const optionsMap: Record<string, Option[]> = {
    aircraftType: rows.map((t: any) => ({
      label: t.aircraftType,
      value: t.aircraftType,
    })),
    courseId: rows.map((t: any) => ({
      label: t.courseId,
      value: t.courseId,
    })),
  };

  return baseFields.map((field) => ({
    ...field,
    options: optionsMap[field.key] ?? field.options ?? [],
  }));
}
