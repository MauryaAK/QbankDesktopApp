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
    field: "ataCode",
    headerName: "ATA",
    width: 90,
  },
  {
    field: "sno",
    headerName: "Question ID",
    width: 120,
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
    width: 100,
  },
  {
    field: "role",
    headerName: "Role",
    flex: 1,
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
    width: 100,
  },
  {
    field: "userName",
    headerName: "Login Id",
    flex: 1,
  },
  {
    field: "name",
    headerName: "Name",
    flex: 1,
  },
  {
    field: "emailId",
    headerName: "Email",
    flex: 1,
  },
  {
    field: "contactNumber",
    headerName: "Contact",
    flex: 1,
  },
  {
    field: "roleName",
    headerName: "Role",
    flex: 1,
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
    width: 100,
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


const generateAtaGroupColumn: GridColDef[] = [
  {
    field: "id",
    headerName: "S.NO",
    width: 70,
  },
  {
    field: "ataCode",
    headerName: "ATA",
    width: 100,
  },
  {
    field: "ataDescription",
    headerName: "ATA Description",
    flex: 4,
  },
  {
    type: 'number',
    field: "avaiableQuestion1",
    headerName: "A1",
    flex: 1,
  },
  {
    type: 'number',
    field: "avaiableQuestion2",
    headerName: "A2",
    flex: 1,
  },
  {
    type: 'number',
    field: "avaiableQuestion3",
    headerName: "A3",
    flex: 1,
  },
  {
    field: "complexity",
    headerName: "Complexity",
    flex: 2,

    editable: true,          // 🔑 REQUIRED
    type: "singleSelect",    // 🔑 REQUIRED

    valueOptions: [
      { label: "1", value: 1 },
      { label: "2", value: 2 },
      { label: "3", value: 3 },
    ],
  },

  {
    type: 'number',
    field: "duration",
    headerName: "Duration (Hrs)",
    flex: 2,
    editable: true
  },
  {
    type: 'number',
    field: "S1",
    headerName: "S1",
    flex: 1,
    editable: true
  },
  {
    type: 'number',
    field: "S2",
    headerName: "S2",
    flex: 1,
    editable: true
  },
  {
    type: 'number',
    field: "S3",
    headerName: "S3",
    flex: 1,
    editable: true
  },
];

export { dashboardColumns, dosDontMaster, machineMaster, ataMaster, aircraftMaster, userManagement, roleManagement, generateAtaGroupColumn };
