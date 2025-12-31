import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { GridColDef } from "@mui/x-data-grid";
import { normalizeForExport } from "./exportHelpers";
import { saveWithPicker } from "./saveWithPicker";

export const exportPdf = async (
  columns: GridColDef[],
  rows: any[],
  title: string,
  userName: string
) => {
  const { headers, data } = normalizeForExport(columns, rows);

  if (data.length > 1000) {
    alert("Please filter data (max 1000 rows)");
    return;
  }

  const doc = new jsPDF({
    orientation: "landscape",
    unit: "pt",
    format: "a4",
    compress: true,
  });

  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  doc.text(title, 40, 30);

  autoTable(doc, {
    startY: 50,
    head: [headers],
    body: data,
    showHead: "firstPage",

    styles: {
      font: "helvetica",
      fontSize: 10,
      cellPadding: 5,
      textColor: [0, 0, 0],
    },

    headStyles: {
      fillColor: [218, 14, 41],
      textColor: [255, 255, 255],
      fontStyle: "bold",
    },

    alternateRowStyles: {
      fillColor: [248, 248, 248],
    },
  });

  const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
  const fileName = `${title}_${userName}_${timestamp}.pdf`;

  const blob = doc.output("blob");

  await saveWithPicker(
    blob,
    fileName,
    "application/pdf"
  );
};
