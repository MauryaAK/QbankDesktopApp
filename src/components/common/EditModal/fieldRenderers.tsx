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