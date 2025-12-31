import * as XLSX from "xlsx-js-style";
import { GridColDef } from "@mui/x-data-grid";
import { normalizeForExport } from "./exportHelpers";
import { saveWithPicker } from "./saveWithPicker";

export const exportExcel = async (
  columns: GridColDef[],
  rows: any[],
  title: string,
  userName: string
) => {
  const { headers, data } = normalizeForExport(columns, rows);

  const sheetData = [headers, ...data];
  const worksheet = XLSX.utils.aoa_to_sheet(sheetData);

  headers.forEach((_, colIndex) => {
    const cellRef = XLSX.utils.encode_cell({ r: 0, c: colIndex });
    worksheet[cellRef].s = {
      fill: { fgColor: { rgb: "DA0E29" } },
      font: { bold: true, color: { rgb: "FFFFFF" } },
      alignment: { horizontal: "center" },
    };
  });

  worksheet["!cols"] = headers.map(() => ({ wch: 22 }));

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Data");

  const buffer = XLSX.write(workbook, {
    bookType: "xlsx",
    type: "array",
  });

  const blob = new Blob([buffer], {
    type:
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });

  const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
  const fileName = `${title}_${userName}_${timestamp}.xlsx`;

  await saveWithPicker(
    blob,
    fileName,
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
  );
};
