import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { GridColDef } from "@mui/x-data-grid";
import { normalizeForExport } from "./exportHelpers";

export const exportExcel = (
  columns: GridColDef[],
  rows: any[],
  fileName: string
) => {
  setTimeout(() => {
    const { headers, data } =
      normalizeForExport(columns, rows);

    const sheetData = [headers, ...data];

    const worksheet = XLSX.utils.aoa_to_sheet(sheetData);
    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(
      workbook,
      worksheet,
      "Data"
    );

    const buffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array", // ✅ VERY IMPORTANT
    });

    saveAs(
      new Blob([buffer], {
        type:
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      }),
      `${fileName}.xlsx`
    );
  }, 0);
};
