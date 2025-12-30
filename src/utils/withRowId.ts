export function withRowId<
  T extends object,
  K extends PropertyKey = "id"
>(
  rows: readonly T[],
  idKey: K = "id" as K
): Array<T & { [P in K]: number }> {
  return rows.map((row, index) => {
    return {
      ...row,
      [idKey]: index + 1,
    } as T & { [P in K]: number };
  });
}
