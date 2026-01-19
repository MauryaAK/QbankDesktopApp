import { options } from "@fullcalendar/core/preact.js";

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

const DASHBOARD_FILTER_FIELDS_FOR_CANDIDATE = [
    { key: "rollNo", label: "Roll No", type: "select" },
    { key: "batchId", label: "Batch Id", type: "select" },
    { key: "result", label: "Result", type: "select" },
    { key: "examination", label: "Examination", type: "select" },
    { key: "examDateRange", label: "Exam Date Range", type: "date" },
    { key: "tillDate", label: "", type: "date" },
];

const GENERATE_ATA_GROUP = [
    { key: "aircraftType", label: "Aircraft Type", type: "select" },
    {
        key: "trainingType", label: "Training Type", type: "select"
    },
    { key: "trainingStartDate", label: "Training Start Date", type: "date" },
    { key: "trainingEndDate", label: "Training End Date", type: "date" },
    { key: "courseId", label: "Course ID", type: "select", isCreateAllowed: true },
    { key: "courseName", label: "Course Name", type: "select", isCreateAllowed: true },
    { key: "examPhase", label: "Exam Phase", type: "select" },
    { key: "examDate", label: "Exam Date", type: "date" },
];

const REGISTER_CANDIDATE_FILTER = [
    { key: "aircraftType", label: "Aircraft Type", type: "select" },
    {
        key: "levelOfTraining", label: "Training Type", type: "select"
    },
    { key: "licenceNumber", label: "AME License No", type: "select" },
    { key: "emailId", label: "Email", type: "select" },
    { key: "courseId", label: "Course ID", type: "select" },
    { key: "courseName", label: "Course Name", type: "select" },
     { key: "startDate", label: "Training Start Date", type: "date" },
    { key: "endDate", label: "Training End Date", type: "date" },
];

const VALIDATE_QUESTION_PAPER = [
    { key: "aircraftType", label: "Aircraft Type", type: "select",options:[] },
    { key: "courseId", label: "Course ID", type: "select",options:[] },
    { key: "examPhase", label: " Exam Phase", type: "select",options:[] },
    { key: "endDate", label: "Exam Date", type: "date",options:[] },
];


const GENERATE_EXAM_PAPER = [
    { key: "aircraftType", label: "Aircraft Type", type: "select" },
    { key: "examPhase", label: " Exam Phase", type: "select" },
    { key: "courseId", label: "Course ID", type: "select" },
    { key: "examDateTime", label: "Exam Date/Time", type: "datetime" },
    { key: "checkRepeat", label: "Repeat", type: "check" },
];

const trainingTypeOptions = [
    { label: "A1", value: "A1" },
    { label: "B1", value: "B1" },
    { label: "B2", value: "B2" },
    { label: "B1+B2", value: "B1+B2" },
    { label: "C", value: "C" }
]


export {
    DASHBOARD_FILTER_FIELDS, GENERATE_ATA_GROUP, DASHBOARD_FILTER_FIELDS_FOR_CANDIDATE,
    REGISTER_CANDIDATE_FILTER, VALIDATE_QUESTION_PAPER, GENERATE_EXAM_PAPER, trainingTypeOptions
}