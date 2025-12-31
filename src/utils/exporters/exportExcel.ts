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

    // ✅ HEADER BACKGROUND COLOR
    headers.forEach((_, colIndex) => {
      const cellRef = XLSX.utils.encode_cell({
        r: 0,
        c: colIndex,
      });
      if (!worksheet[cellRef]) return;

      worksheet[cellRef].s = {
        fill: {
          fgColor: { rgb: "D9D9D9" }, // light grey
        },
        font: {
          bold: true,
        },
        alignment: {
          horizontal: "center",
        },
      };
    });

    worksheet["!cols"] = headers.map(() => ({
      wch: 22,
    }));

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(
      workbook,
      worksheet,
      "Data"
    );

    const buffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
      cellStyles: true, // ⚠️ ONLY header uses styles
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
