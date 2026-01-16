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
const dashboardCandidateColumns: GridColDef[] = [
  {
    field: "id",
    headerName: "S.NO",
    flex: 1,
  },
  {
    field: "rollNo",
    headerName: "Roll No",
    flex: 1,
  },
  {
    field: "batchId",
    headerName: "Batch ID",
    flex: 1,
  },
  {
    field: "tq",
    headerName: "TQ",
    flex: 1,
  },
  {
    field: "ta",
    headerName: "TA",
    flex: 1,
  },
  {
    field: "tc",
    headerName: "TC",
    flex: 1,
  },
  {
    field: "marks",
    headerName: "Marks",
    flex: 1,
  },
  {
    field: "result",
    headerName: "Result",
    flex: 1,
  },
  {
    field: "examination",
    headerName: "Examination",
    flex: 1,
  },
  {
    field: "examDate",
    headerName: "ExamDate",
    flex: 1,
  },
  {
    field: "cComment",
    headerName: "C Comment",
    flex: 1,
  },
  {
    field: "eComment",
    headerName: "E Comment",
    flex: 1,
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
    field: "avaiableQuestion1",
    headerName: "A1",
    flex: 1,
  },
  {
    field: "avaiableQuestion2",
    headerName: "A2",
    flex: 1,
  },
  {
    field: "avaiableQuestion3",
    headerName: "A3",
    flex: 1,
  },
  {
    field: "complexity",
    headerName: "Complexity",
    flex: 1.5,

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
    flex: 1.5,
    editable: true
  },
  {
    type: 'number',
    field: "S1",
    headerName: "S1",
    flex: 1,
    editable: false
  },
  {
    type: 'number',
    field: "S2",
    headerName: "S2",
    flex: 1,
    editable: false
  },
  {
    type: 'number',
    field: "S3",
    headerName: "S3",
    flex: 1,
    editable: false
  },
];

const registerCandidate: GridColDef[] = [
  {
    field: "id",
    headerName: "S.NO",
    width: 70,
  },

  {
    field: "aircraftType",
    headerName: "Aircraft Type",
    flex: 1.5,
  },
  {
    field: "courseID",
    headerName: "Course ID",
    flex: 1.2,
  },
  {
    field: "training",
    headerName: "Training",
    flex: 1,
  },
  {
    field: "start",
    headerName: "Start",
    flex: 1,
  },
  {
    field: "end",
    headerName: "End",
    flex: 1,
  },
  {
    field: "emeLicenseNo",
    headerName: "AME License No",
    flex: 2,
  },
  {
    field: "name",
    headerName: "Name",
    flex: 1,
  },
  {
    field: "email",
    headerName: "Email Id",
    flex: 1,
  },
  {
    field: "photo",
    headerName: "Photo",
    flex: 1,
  },
];


const generateExamPaper: GridColDef[] = [
  {
    field: "id",
    headerName: "S.NO",
    width: 120,
  },
  {
    field: "paperId",
    headerName: "Paper ID",
    flex: 1,
  },
  {
    field: "candidate",
    headerName: "Candidate",
     flex: 1,
  },
  
];

export {
  dashboardColumns, dosDontMaster, machineMaster, ataMaster,
  aircraftMaster, userManagement, roleManagement, generateAtaGroupColumn,
  dashboardCandidateColumns, registerCandidate,generateExamPaper
};
