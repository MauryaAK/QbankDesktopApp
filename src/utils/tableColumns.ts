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

const roleManagement: GridColDef[] = [
  {
    field: "id",
    headerName: "S.NO",
    width: 70,
  },
  {
    field: "role",
    headerName: "Role",
    flex: 2,
  },
  {
    field: "reportTo",
    headerName: "Reporting To",
    flex: 1.2,
  },
];
const userManagement: GridColDef[] = [
  {
    field: "id",
    headerName: "S.NO",
    width: 70,
  },
  {
    field: "userName",
    headerName: "Login Id",
    flex: 2,
  },
  {
    field: "name",
    headerName: "Name",
    flex: 1.2,
  },
  {
    field: "emailId",
    headerName: "Email",
    width: 110,
  },
  {
    field: "contactNumber",
    headerName: "Contact",
    width: 90,
    valueGetter: (params) => params.row.ataCode ?? "-", // ✅ mapped safely
  },
  {
    field: "roleName",
    headerName: "Role",
    width: 120,
    valueGetter: (params) => params.row.sno ?? "-", // ✅ fallback
  },
];
const aircraftMaster: GridColDef[] = [
  {
    field: "id",
    headerName: "S.NO",
    flex: .2,
  },

  {
    field: "aircraftType",
    headerName: "Aircraft Type",
    flex: 1,
  },
];
const ataMaster: GridColDef[] = [
  {
    field: "id",
    headerName: "S.NO",
    width: 70,
  },
  {
    field: "ataCode",
    headerName: "ATA Code",
    width: 90,
  },
  {
    field: "ataDescription",
    headerName: "ATA Description",
    flex: 1,
  },
  {
    field: "aircraftType",
    headerName: "Aircraft Type",
    flex: 2,
  },
];

const dosDontMaster: GridColDef[] = [
  {
    field: "id",
    headerName: "S.NO",
    width: 70,
  },

  {
    field: "rule",
    headerName: "Rule",
    flex: 1,
  },

];
const machineMaster: GridColDef[] = [
  {
    field: "id",
    headerName: "S.NO",
    width: 70,
  },
  {
    field: "deviceName",
    headerName: "Machine Name",
    flex: 2,
  },
  {
    field: "deviceMode",
    headerName: "Mode",
    flex: 1.2,
  },
];
export { dashboardColumns, dosDontMaster, machineMaster, ataMaster, aircraftMaster, userManagement, roleManagement };
