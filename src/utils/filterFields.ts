import { FilterField } from "../components/common/filterTypes";

// const DASHBOARD_FILTER_FIELDS: FilterField[] = [
//     {
//         key: "aircraftType",
//         label: "Aircraft Type",
//         type: "select",
//         options: [
//             { label: "A320", value: "A320" },
//             { label: "B737", value: "B737" },
//         ],
//     },
//     {
//         key: "ata",
//         label: "ATA",
//         type: "select",
//         options: [
//             { label: "21 – Air Conditioning", value: "21" },
//             { label: "22 – Auto Flight", value: "22" },
//             { label: "24 – Electrical Power", value: "24" },
//         ],
//     },
//     {
//         key: "complexity",
//         label: "Complexity",
//         type: "select",
//         options: [
//             { label: "Low", value: "low" },
//             { label: "Medium", value: "medium" },
//             { label: "High", value: "high" },
//         ],
//     },
//     {
//         key: "questionId",
//         label: "Question ID",
//         type: "input",
//         placeholder: "Enter Question ID",
//     },
//     {
//         key: "bookTitle",
//         label: "Book Title",
//         type: "input",
//         placeholder: "Enter Book Title",
//     },
//     {
//         key: "chapter",
//         label: "Chapter",
//         type: "input",
//         placeholder: "Enter Chapter",
//     },
//     {
//         key: "topic",
//         label: "Topic",
//         type: "input",
//         placeholder: "Enter Topic",
//     },
//     {
//         key: "page",
//         label: "Page",
//         type: "input",
//         placeholder: "Enter Page No",
//     },
// ];

const DASHBOARD_FILTER_FIELDS = [
    { key: "aircraftType", label: "Aircraft Type", type: "select" },
    { key: "ataCode", label: "ATA", type: "select" },
    { key: "complexity", label: "Complexity", type: "select" },
    { key: "sno", label: "Question ID", type: "select" },
    { key: "bookTitle", label: "Book Title", type: "select" },
    { key: "chapter", label: "Chapter", type: "select" },
    { key: "topic", label: "Topic", type: "select" },
    { key: "page", label: "Page", type: "select" },
];



export { DASHBOARD_FILTER_FIELDS }