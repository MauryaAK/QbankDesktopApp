// import React from "react";
// import { useNavigate } from "react-router-dom";
// import { ActionButton } from "./Buttons";
// import { GradientSelect } from "./SelectField";
// import { FaUser } from "react-icons/fa6";
// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { logout } from "../../api/ApiCollection";
// import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
// import { TbLogout } from "react-icons/tb";

// import { useActiveRoute } from "../../hooks/useActiveRoute";
// import { FaMinus } from "react-icons/fa";
// import { minimizeApp } from "../../utils/tauri";

// /* ================= TYPES ================= */

// interface Option {
//     label: string;
//     value: string;
// }

// /* ================= OPTIONS ================= */

// const ADMIN_OPTIONS: Option[] = [
//     { label: "Role Management", value: "admin/role-management" },
//     { label: "User Management", value: "admin/user-management" },
//     { label: "Aircraft Type Master", value: "admin/aircraft-type-master" },
//     { label: "ATA Master", value: "admin/ata-master" },
//     { label: "Dos and Don’ts Master", value: "admin/dos-donts-master" },
//     { label: "Machine Master", value: "admin/machine-master" },
// ];

// const QUESTION_BANK_OPTIONS: Option[] = [
//     { label: "Add Question", value: "question-bank/add" },
//     { label: "Check Question", value: "question-bank/check" },
//     { label: "Verify Question", value: "question-bank/verify" },
// ];

// const EXAM_PAPER_OPTIONS: Option[] = [
//     { label: "Generate ATA Groups", value: "exam-paper/ata-groups" },
//     { label: "Register Candidate", value: "exam-paper/register-candidate" },
//     { label: "Validate Question Paper", value: "exam-paper/validate" },
//     { label: "Generate Exam Paper / Batch", value: "exam-paper/generate" },
// ];

// const EXAM_STATUS_HARD_COPY_OPTIONS: Option[] = [
//     { label: "View Candidate Exam Status", value: "exam-status/view-exam-status" },
//     { label: "Generate Hard Copy", value: "exam-status/generate-hard-copy" },
//     { label: "Scan OMR Sheet", value: "exam-status/scan-omr-sheet" },
// ];

// const REPORT_OPTIONS: Option[] = [
//     { label: "ATA wise Performance - Overview", value: "report/ata-performance" },
//     { label: "Qs. wise Performance - Overview", value: "report/question-performance" },
//     { label: "Qs. wise Performance - Candidate", value: "report/question-candidate" },
//     { label: "Candidate Exam Activity Log", value: "report/activity-log" },
//     { label: "Examination Result Report", value: "report/result" },
//     { label: "Question Added / Modified Report", value: "report/question-modified" },
//     { label: "Question ID List", value: "report/question-id-list" },
//     { label: "Question Paper Validation Report", value: "report/validation" },
// ];

// const ACTION_BUTTON_PAGES: Option[] = [
//     { label: "Dashboard", value: "dashboard" },
//     { label: "Exam Status / Hard Copy", value: "exam-status" },
// ];

// const ALL_OPTIONS: Option[] = [
//     ...ADMIN_OPTIONS,
//     ...QUESTION_BANK_OPTIONS,
//     ...EXAM_PAPER_OPTIONS,
//     ...REPORT_OPTIONS,
//     ...ACTION_BUTTON_PAGES,
//     ...EXAM_STATUS_HARD_COPY_OPTIONS
// ];

// /* ================= COMPONENT ================= */

// const BTNNavBar: React.FC = () => {
//     const navigate = useNavigate();
//     const dispatch = useAppDispatch();
//     const queryClient = useQueryClient();
//     const userId = useAppSelector((e) => e.auth.user.id);

//     const { getActivePageLabel, isActiveRoute, getActiveOption } = useActiveRoute(ALL_OPTIONS);

//     const mutation = useMutation({ mutationFn: logout });

//     const handleLogout = async () => {
//         mutation.mutate({ userId });
//         dispatch({ type: "auth/resetAuth" });
//         queryClient.clear();
//         localStorage.clear();
//         sessionStorage.clear();
//         navigate("/login");
//     };
//     const handleMinimize = () => {
//         minimizeApp()
//     }

//     return (
//         <div className="px-8 pt-0 pb-0 shrink-0">
//             {/* ===== ROW 1 ===== */}
//             <div className="relative flex items-center justify-between">
//                 {/* LEFT */}
//                 <div />

//                 {/* CENTER */}
//                 <div
//                     className="
//       absolute left-1/2 -translate-x-1/2
//       px-10 py-2 rounded-b-2xl
//       bg-gradient-to-b from-red-700 to-red-900
//       text-white font-semibold shadow-md
//       whitespace-nowrap
//     "
//                 >
//                     {getActivePageLabel()}
//                 </div>

//                 {/* RIGHT */}
//                 <div className="flex items-center gap-6 text-sm pr-10 pt-2">
//                     {/* USER INFO */}
//                     <div className="flex items-center gap-2">
//                         <FaUser className="text-[22px] text-black" />
//                         <div className="leading-tight">
//                             <p className="font-semibold text-black">Ajay Pal</p>
//                             <p className="text-xs text-gray-700 font-bold">Examination Manager</p>
//                         </div>
//                     </div>

//                     {/* LOGOUT */}
//                     <button
//                         onClick={handleLogout}
//                         className="
//         flex items-center gap-2
//         font-semibold text-black
//         hover:text-red-700
//         transition
//       "
//                     >
//                         <TbLogout className="text-[22px]" />
//                         Logout
//                     </button>

//                 </div>
//             </div>
//             <button
//                 onClick={handleMinimize}
//                 className="
//        flex absolute top-0 right-0 bg-black
// justify-center items-center px-3
// rounded-bl-lg rounded-br-lg

//       "
//             >
//                 <FaMinus className="text-[22px] text-white" />
//             </button>

//             {/* ===== ROW 2 ===== */}
//             <div className="flex items-center gap-1 mt-3 justify-center">
//                 <ActionButton
//                     label="Dashboard"
//                     variant="primary"
//                     size="lg"
//                     isActive={isActiveRoute("dashboard")}
//                     onClick={() => navigate("dashboard")}
//                 />

//                 <GradientSelect
//                     size="lg"
//                     staticLabel="Administration"
//                     options={ADMIN_OPTIONS}
//                     value={getActiveOption(ADMIN_OPTIONS)}
//                     isActive={!!getActiveOption(ADMIN_OPTIONS)}
//                     onChange={(opt) => navigate(opt.value)}
//                 />

//                 <GradientSelect
//                     size="lg"
//                     staticLabel="Question Bank Mgmt"
//                     options={QUESTION_BANK_OPTIONS}
//                     value={getActiveOption(QUESTION_BANK_OPTIONS)}
//                     isActive={!!getActiveOption(QUESTION_BANK_OPTIONS)}
//                     onChange={(opt) => navigate(opt.value)}
//                 />

//                 <GradientSelect
//                     size="lg"
//                     staticLabel="Exam Paper Mgmt"
//                     options={EXAM_PAPER_OPTIONS}
//                     value={getActiveOption(EXAM_PAPER_OPTIONS)}
//                     isActive={!!getActiveOption(EXAM_PAPER_OPTIONS)}
//                     onChange={(opt) => navigate(opt.value)}
//                 />

//                 <GradientSelect
//                     size="lg"
//                     staticLabel="Exam Status/Hard Copy"
//                     options={EXAM_STATUS_HARD_COPY_OPTIONS}
//                     value={getActiveOption(EXAM_STATUS_HARD_COPY_OPTIONS)}
//                     isActive={!!getActiveOption(EXAM_STATUS_HARD_COPY_OPTIONS)}
//                     onChange={(opt) => navigate(opt.value)}
//                 />

//                 <GradientSelect
//                     size="lg"
//                     staticLabel="Report"
//                     options={REPORT_OPTIONS}
//                     value={getActiveOption(REPORT_OPTIONS)}
//                     isActive={!!getActiveOption(REPORT_OPTIONS)}
//                     onChange={(opt) => navigate(opt.value)}
//                 />
//             </div>
//         </div>
//     );
// };

// export { BTNNavBar };










import React, { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { ActionButton } from "./Buttons";
import { GradientSelect } from "./SelectField";
import { FaUser, FaMinus } from "react-icons/fa6";
import { TbLogout } from "react-icons/tb";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { logout } from "../../api/ApiCollection";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { useActiveRoute } from "../../hooks/useActiveRoute";
import { minimizeApp } from "../../utils/tauri";

/* ================= TYPES ================= */

interface Option {
    label: string;
    value: string;
}
const MENU_ORDER: string[] = [
    "Role",
    "User",
    "AircraftType",
    "ATA",
    "Dos And Dont",
    "Machine Master",

    "Add Question",
    "Check Question",
    "Verify Question",

    "Add ATA Groups",
    "Register Candidates",
    "Validate Questions",
    "Generate Exam Papers",

    "View Candidate Exam Status",
    "Generate Hard Copy",
    "Scan OMR Sheet",

    "ATA Wise Performance - Overview",
    "Question Wise Performance - Overview",
    "Question Wise Performance - Candidate",
    "Candidate Exam Activity Log",
    "Examination Results",
    "Report of Questions Added/Amended",
    "Question ID List",
    "Question Paper Validation Report",
];


/* ================= MENU → ROUTE MAP ================= */

const MENU_ROUTE_MAP: Record<string, Option> = {
    Role: { label: "Role Management", value: "admin/role-management" },
    User: { label: "User Management", value: "admin/user-management" },
    AircraftType: { label: "Aircraft Type Master", value: "admin/aircraft-type-master" },
    ATA: { label: "ATA Master", value: "admin/ata-master" },
    "Dos And Dont": { label: "Dos and Don’ts Master", value: "admin/dos-donts-master" },
    "Machine Master": { label: "Machine Master", value: "admin/machine-master" },

    "Add Question": { label: "Add Question", value: "question-bank/add" },
    "Check Question": { label: "Check Question", value: "question-bank/check" },
    "Verify Question": { label: "Verify Question", value: "question-bank/verify" },

    "Add ATA Groups": { label: "Generate ATA Groups", value: "exam-paper/generate-ata-groups" },
    "Register Candidates": { label: "Register Candidate", value: "exam-paper/register-candidate" },
    "Validate Questions": { label: "Validate Question Paper", value: "exam-paper/validate-question-paper" },
    "Generate Exam Papers": { label: "Generate Exam Paper / Batch", value: "exam-paper/generate-exam-paper" },

    "View Candidate Exam Status": { label: "View Candidate Exam Status", value: "exam-status/view-exam-status" },
    "Generate Hard Copy": { label: "Generate Hard Copy", value: "exam-status/generate-hard-copy" },
    "Scan OMR Sheet": { label: "Scan OMR Sheet", value: "exam-status/scan-omr-sheet" },

    "ATA Wise Performance - Overview": { label: "ATA wise Performance - Overview", value: "report/ata-performance" },
    "Question Wise Performance - Overview": { label: "Qs. wise Performance - Overview", value: "report/question-performance" },
    "Question Wise Performance - Candidate": { label: "Qs. wise Performance - Candidate", value: "report/question-candidate" },
    "Candidate Exam Activity Log": { label: "Candidate Exam Activity Log", value: "report/activity-log" },
    "Examination Results": { label: "Examination Result Report", value: "report/result" },
    "Report of Questions Added/Amended": { label: "Question Added / Modified Report", value: "report/question-modified" },
    "Question ID List": { label: "Question ID List", value: "report/question-id-list" },
    "Question Paper Validation Report": { label: "Question Paper Validation Report", value: "report/validation" },
};

/* ================= HELPERS ================= */

const buildOptionsFromPermission = (
    permissionName: string,
    permissions: any[]
): Option[] => {
    const section = permissions?.find(
        (p) => p.permission === permissionName
    );
    if (!section) return [];

    const activeMenus = new Set(
        section.permissionList
            .filter((m: any) => m.isActive)
            .map((m: any) => m.menu)
    );

    return MENU_ORDER
        .filter((menu) => activeMenus.has(menu))
        .map((menu) => MENU_ROUTE_MAP[menu])
        .filter(Boolean);
};

/* ================= COMPONENT ================= */

const BTNNavBar: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const queryClient = useQueryClient();

    const user = useAppSelector((s) => s.auth.user);
    const permissions = user?.permissions || [];
    const userId = user?.id;

    /* ================= PERMISSION BASED OPTIONS ================= */

    const ADMIN_OPTIONS = useMemo(
        () => buildOptionsFromPermission("Administration", permissions),
        [permissions]
    );

    const QUESTION_BANK_OPTIONS = useMemo(
        () => buildOptionsFromPermission("Question Bank Management", permissions),
        [permissions]
    );

    const EXAM_PAPER_OPTIONS = useMemo(
        () => buildOptionsFromPermission("Examination Papers Management", permissions),
        [permissions]
    );

    const EXAM_STATUS_OPTIONS = useMemo(
        () => buildOptionsFromPermission("Exam Status", permissions),
        [permissions]
    );

    const REPORT_OPTIONS = useMemo(
        () => buildOptionsFromPermission("Reports", permissions),
        [permissions]
    );

    const hasDashboardAccess = permissions.some(
        (p: any) =>
            p.permission === "Dashboard" &&
            p.permissionList.some((m: any) => m.isActive)
    );

    const ALL_OPTIONS: Option[] = [
        ...ADMIN_OPTIONS,
        ...QUESTION_BANK_OPTIONS,
        ...EXAM_PAPER_OPTIONS,
        ...EXAM_STATUS_OPTIONS,
        ...REPORT_OPTIONS,
        ...(hasDashboardAccess ? [{ label: "Dashboard", value: "dashboard" }] : []),
    ];

    const { getActivePageLabel, isActiveRoute, getActiveOption } = useActiveRoute(ALL_OPTIONS);

    /* ================= LOGOUT ================= */

    const mutation = useMutation({ mutationFn: logout });

    const handleLogout = () => {
        mutation.mutate({ userId });
        dispatch({ type: "auth/resetAuth" });
        queryClient.clear();
        localStorage.clear();
        sessionStorage.clear();
        navigate("/login");
    };

    const handleMinimize = () => minimizeApp();

    /* ================= JSX ================= */

    return (
        <div className="px-8 pt-0 pb-0 shrink-0">
            {/* ===== ROW 1 ===== */}
            <div className="relative flex items-center justify-between">
                <div />

                <div
                    className="
                        absolute left-1/2 -translate-x-1/2
                        px-10 py-2 rounded-b-2xl
                        bg-gradient-to-b from-red-700 to-red-900
                        text-white font-semibold shadow-md
                        whitespace-nowrap
                    "
                >
                    {getActivePageLabel()}
                </div>

                <div className="flex items-center gap-6 text-sm pr-10 pt-2">
                    <div className="flex items-center gap-2">
                        <FaUser className="text-[22px] text-black" />
                        <div className="leading-tight">
                            <p className="font-semibold text-black">{user?.name}</p>
                            <p className="text-xs text-gray-700 font-bold">{user?.role}</p>
                        </div>
                    </div>

                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 font-semibold text-black hover:text-red-700 transition"
                    >
                        <TbLogout className="text-[22px]" />
                        Logout
                    </button>
                </div>
            </div>

            <button
                onClick={handleMinimize}
                className="flex absolute top-0 right-0 bg-black justify-center items-center px-3 rounded-bl-lg rounded-br-lg"
            >
                <FaMinus className="text-[22px] text-white" />
            </button>

            {/* ===== ROW 2 ===== */}
            <div className="flex items-center gap-1 mt-3 justify-center">
                {hasDashboardAccess && (
                    <ActionButton
                        label="Dashboard"
                        variant="primary"
                        size="lg"
                        isActive={isActiveRoute("dashboard")}
                        onClick={() => navigate("dashboard")}
                    />
                )}

                {ADMIN_OPTIONS.length > 0 && (
                    <GradientSelect
                        size="lg"
                        staticLabel="Administration"
                        options={ADMIN_OPTIONS}
                        value={getActiveOption(ADMIN_OPTIONS)}
                        isActive={!!getActiveOption(ADMIN_OPTIONS)}
                        onChange={(opt) => navigate(opt.value)}
                    />
                )}

                {QUESTION_BANK_OPTIONS.length > 0 && (
                    <GradientSelect
                        size="lg"
                        staticLabel="Question Bank Mgmt"
                        options={QUESTION_BANK_OPTIONS}
                        value={getActiveOption(QUESTION_BANK_OPTIONS)}
                        isActive={!!getActiveOption(QUESTION_BANK_OPTIONS)}
                        onChange={(opt) => navigate(opt.value)}
                    />
                )}

                {EXAM_PAPER_OPTIONS.length > 0 && (
                    <GradientSelect
                        size="lg"
                        staticLabel="Exam Paper Mgmt"
                        options={EXAM_PAPER_OPTIONS}
                        value={getActiveOption(EXAM_PAPER_OPTIONS)}
                        isActive={!!getActiveOption(EXAM_PAPER_OPTIONS)}
                        onChange={(opt) => navigate(opt.value)}
                    />
                )}

                {EXAM_STATUS_OPTIONS.length > 0 && (
                    <GradientSelect
                        size="lg"
                        staticLabel="Exam Status / Hard Copy"
                        options={EXAM_STATUS_OPTIONS}
                        value={getActiveOption(EXAM_STATUS_OPTIONS)}
                        isActive={!!getActiveOption(EXAM_STATUS_OPTIONS)}
                        onChange={(opt) => navigate(opt.value)}
                    />
                )}

                {REPORT_OPTIONS.length > 0 && (
                    <GradientSelect
                        size="lg"
                        staticLabel="Report"
                        options={REPORT_OPTIONS}
                        value={getActiveOption(REPORT_OPTIONS)}
                        isActive={!!getActiveOption(REPORT_OPTIONS)}
                        onChange={(opt) => navigate(opt.value)}
                    />
                )}
            </div>
        </div>
    );
};

export { BTNNavBar };
