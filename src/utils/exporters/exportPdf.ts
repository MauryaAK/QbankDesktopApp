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

    if (data.length > 1000) {
      alert("Please filter data (max 1000 rows)");
      return;
    }

    const doc = new jsPDF({
      orientation: "landscape",
      unit: "pt",
      format: "a4",
      compress: false, // ✅ better quality
    });

    doc.setFont("helvetica", "normal");
    doc.setFontSize(14);
    doc.text(title, 40, 30);

    autoTable(doc, {
      startY: 50,
      head: [headers],
      body: data,

      // ❌ STOP HEADER REPEAT
      showHead: "firstPage",

      styles: {
        font: "helvetica",
        fontSize: 10, // 🔥 improved clarity
        cellPadding: 5,
        lineColor: [220, 220, 220],
        lineWidth: 0.5,
      },
      headStyles: {
        fillColor: [230, 230, 230],
        textColor: 20,
        fontStyle: "bold",
      },
      alternateRowStyles: {
        fillColor: [248, 248, 248],
      },
    });

    doc.save(`${title}.pdf`);
  }, 0);
};
