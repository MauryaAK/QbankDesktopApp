import { GridColDef } from "@mui/x-data-grid";

export const normalizeForExport = (
  columns: GridColDef[],
  rows: any[]
) => {
  const validColumns = columns.filter(
    (c) =>
      !c.field.startsWith("__") &&
      c.field !== "id"
  );

  const headers = validColumns.map(
    (c) => c.headerName || c.field
  );

  const data = rows
    .filter((r) => !r.__expanded)
    .map((row) =>
      validColumns.map((c) =>
        row[c.field] === null ||
        row[c.field] === undefined
          ? ""
          : String(row[c.field])
      )
    );

  return { headers, data };
};
