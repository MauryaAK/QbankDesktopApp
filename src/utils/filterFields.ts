
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

const GENERATE_ATA_GROUP = [
    { key: "aircraftType", label: "Aircraft Type", type: "select" },
    {
        key: "trainingType", label: "Training Type", type: "select"
    },
    { key: "trainingStartDate", label: "Training Start Date", type: "date" },
    { key: "trainingEndDate", label: "Training End Date", type: "date" },
    { key: "courseId", label: "Course ID", type: "select" },
    { key: "courseName", label: "Course Name", type: "select" },
    { key: "examPhase", label: "Exam Phase", type: "select" },
    { key: "ExamDate", label: "Exam Date", type: "date" },
];


export { DASHBOARD_FILTER_FIELDS, GENERATE_ATA_GROUP }