// import { GridColDef } from "@mui/x-data-grid";

// const dashboardColumns: GridColDef[] = [
//     { field: "sno", headerName: "S.NO", width: 70 },
//     { field: "question", headerName: "Question", flex: 2 },
//     { field: "aircraftType", headerName: "Aircraft Type", flex: 1.2 },
//     { field: "complexity", headerName: "Complexity", width: 110 },
//     { field: "ata", headerName: "ATA", width: 90 },
//     { field: "questionId", headerName: "Question ID", width: 120 },
//     { field: "bookTitle", headerName: "Book Title", flex: 1 },
//     { field: "chapter", headerName: "Chapter", width: 110 },
//     { field: "topic", headerName: "Topic", width: 110 },
//     { field: "page", headerName: "Page", width: 80 },
// ];


// export { dashboardColumns }



import { GridColDef } from "@mui/x-data-grid";

const dashboardColumns: GridColDef[] = [
  {
    field: "id",
    headerName: "S.NO",
    width: 70,
  },
  {
    field: "question",
    headerName: "Question",
    flex: 2,
  },
  {
    field: "aircraftType",
    headerName: "Aircraft Type",
    flex: 1.2,
  },
  {
    field: "complexity",
    headerName: "Complexity",
    width: 110,
  },
  {
    field: "ata",
    headerName: "ATA",
    width: 90,
    valueGetter: (params) => params.row.ataCode ?? "-", // ✅ mapped safely
  },
  {
    field: "sno",
    headerName: "Question ID",
    width: 120,
    valueGetter: (params) => params.row.sno ?? "-", // ✅ fallback
  },
  {
    field: "bookTitle",
    headerName: "Book Title",
    flex: 1,
  },
  {
    field: "chapter",
    headerName: "Chapter",
    width: 110,
  },
  {
    field: "topic",
    headerName: "Topic",
    width: 110,
  },
  {
    field: "page",
    headerName: "Page",
    width: 80,
  },
];

export { dashboardColumns };
