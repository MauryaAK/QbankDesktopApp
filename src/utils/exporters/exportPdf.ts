import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { GridColDef } from "@mui/x-data-grid";
import { normalizeForExport } from "./exportHelpers";

export const exportPdf = (
  columns: GridColDef[],
  rows: any[],
  title: string
) => {
  setTimeout(() => {
    const { headers, data } =
      normalizeForExport(columns, rows);

    // ❗ HARD LIMIT (prevents freeze)
    if (data.length > 1000) {
      alert("Please filter data (max 1000 rows)");
      return;
    }

    const doc = new jsPDF({
      orientation: "landscape",
      unit: "pt",
    });

    doc.setFontSize(14);
    doc.text(title, 40, 30);

    autoTable(doc, {
      startY: 50,
      head: [headers],
      body: data,
      styles: {
        fontSize: 9,
        cellPadding: 4,
      },
      headStyles: {
        fillColor: [60, 60, 60],
        textColor: 255,
        fontStyle: "bold",
      },
      alternateRowStyles: {
        fillColor: [245, 245, 245],
      },
    });

    doc.save(`${title}.pdf`);
  }, 0);
};
