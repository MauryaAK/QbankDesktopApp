import { FieldSchema } from "./editModal.types";

export const roleFields: FieldSchema[] = [
  {
    name: "role",
    label: "Role",
    type: "text",
    required: true,
  },
  {
    name: "reportTo",
    label: "Reporting To",
    type: "select",
    required: true,
    options: [
      { label: "Examination Manager", value: "Examination Manager" },
      { label: "Administrator", value: "Administrator" },
    ],
  },
];



export const userFields: FieldSchema[] = [
  {
    name: "userName",
    label: "Login ID",
    type: "text",
    required: true,
  },
  {
    name: "name",
    label: "Name",
    type: "text",
    required: true,
  },
  {
    name: "emailId",
    label: "Email",
    type: "text",
    required: true,
  },
  {
    name: "contactNumber",
    label: "Contact No.",
    type: "number",
    required: true,
  },
  {
    name: "roleName",
    label: "Role",
    type: "select",
    required: true,
  },
  {
    name: "isActive",
    label: "Status",
    type: "toggle",
    required: true,
  },
];


export const aircraftTypeFields: FieldSchema[] = [
  {
    name: "aircraftType",
    label: "Aircraft Type",
    type: "text",
    required: true,
  },
  {
    name: "isActive",
    label: "Status",
    type: "toggle",
    required: true,
  },
];




export const ataFields: FieldSchema[] = [
  {
    name: "ataCode",
    label: "ATA Code",
    type: "text",
    required: true,
  },
  {
    name: "ataDescription",
    label: "ATA Desc.",
    type: "text",
    required: true,
  },
  {
    name: "isActive",
    label: "Status",
    type: "toggle",
    required: true,
  },
];


export const dosDontFields: FieldSchema[] = [
  {
    name: "rule",
    label: "Rule",
    type: "text",
    required: true,
  },
  {
    name: "isActive",
    label: "Status",
    type: "toggle",
    required: true,
  },
];





export const questionFields: FieldSchema[] = [
  {
    name: "question",
    label: "Question",
    type: "text",
    required: true,
  },
  {
    name: "aircraftType",
    label: "Aircraft Type",
    type: "select",
    required: true,
  },
  {
    name: "ata",
    label: "ATA",
    type: "select",
    required: true,
  },
  {
    name: "complexity",
    label: "Complexity",
    type: "select",
    required: true,
  },
  {
    name: "bookTitle",
    label: "Book Title",
    type: "text",
    required: true,
  },
  {
    name: "chapter",
    label: "Chapter",
    type: "text",
    required: true,
  },
  {
    name: "topic",
    label: "Topic",
    type: "text",
    required: true,
  },
  {
    name: "page",
    label: "Page",
    type: "text",
    required: true,
  },

  // ===== OPTIONS =====
  { name: "answerA", label: "Answer A", type: "text", required: true },
  { name: "answerB", label: "Answer B", type: "text", required: true },
  { name: "answerC", label: "Answer C", type: "text", required: true },
  { name: "answerD", label: "Answer D", type: "text", required: false },

  {
    name: "correctAnswer",
    label: "Correct Answer",
    type: "select",
    required: true,
    options: [

    ],
  },

  {
    name: "reason",
    label: "Reason",
    type: "text",
    required: false,
  },

  {
    name: "isActive",
    label: "Status",
    type: "toggle",
    required: true,
  },
];
