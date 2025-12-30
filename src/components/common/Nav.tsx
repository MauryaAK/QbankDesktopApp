// import React, { useCallback } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import { ActionButton } from "./Buttons";
// import { GradientSelect } from "./SelectField";

// /* ================= TYPES ================= */
// /* MUST MATCH GradientSelect */

// interface Option {
//     label: string;
//     value: string; // route
// }

// /* ================= DROPDOWN MENU DATA ================= */
// /* EACH DROPDOWN HAS ITS OWN LIST */

// const select1Options: Option[] = [
//     { label: "Administration", value: "/department/admin" },
//     { label: "Operations", value: "/department/ops" },
//     { label: "Finance", value: "/department/finance" },
// ];

// const select2Options: Option[] = [
//     { label: "North", value: "/region/north" },
//     { label: "South", value: "/region/south" },
// ];

// const select3Options: Option[] = [
//     { label: "2024", value: "/year/2024" },
//     { label: "2025", value: "/year/2025" },
// ];

// const select4Options: Option[] = [
//     { label: "Active", value: "/status/active" },
//     { label: "Inactive", value: "/status/inactive" },
// ];

// /* ================= COMPONENT ================= */

// const BTNNavBar: React.FC = () => {
//     const navigate = useNavigate();
//     const location = useLocation();

//     /* ================= HELPERS ================= */

//     const getActiveOption = useCallback(
//         (options: Option[]) => {
//             return options.find((opt) =>
//                 location.pathname.startsWith(opt.value)
//             );
//         },
//         [location.pathname]
//     );

//     const isActiveRoute = useCallback(
//         (route: string) => location.pathname.startsWith(route),
//         [location.pathname]
//     );

//     /* ================= RENDER ================= */

//     return (
//         <div className="px-8 pt-0 pb-0 shrink-0">
//             {/* ===== ROW 1 ===== */}
//             <div className="flex items-center justify-between">
//                 <div className="flex items-center gap-">
//                     <span className="text-lg font-semibold text-[#6B3A1E]">
//                         vistara
//                     </span>
//                 </div>

//                 <div
//                     className="px-10 py-2 rounded-b-2xl
//           bg-gradient-to-b from-red-700 to-red-900
//           text-white font-semibold shadow-md"
//                 >
//                     DASHBOARD
//                 </div>

//                 <div className="flex items-center gap-6 text-sm">
//                     <div>
//                         <p className="font-semibold">Sheetal Nakul</p>
//                         <p className="text-xs text-gray-600">
//                             Examination Manager
//                         </p>
//                     </div>
//                 </div>
//             </div>

//             {/* ===== ROW 2 (STRUCTURE UNCHANGED) ===== */}
//             <div className="flex items-center gap-1 mt-2 justify-center">
//                 {/* DASHBOARD BUTTON */}
//                 <ActionButton
//                     label="Dashboard"
//                     variant="primary"
//                     size="lg"
//                     isActive={isActiveRoute("/dashboard")}
//                     onClick={() => navigate("/dashboard")}
//                 />

//                 {/* SELECT 1 */}
//                 <GradientSelect
//                     size="lg"
//                     options={select1Options}
//                     value={getActiveOption(select1Options)}
//                     isActive={!!getActiveOption(select1Options)}
//                     onChange={(opt) => navigate(opt.value)}
//                 />

//                 {/* SELECT 2 */}
//                 <GradientSelect
//                     size="lg"
//                     options={select2Options}
//                     value={getActiveOption(select2Options)}
//                     isActive={!!getActiveOption(select2Options)}
//                     onChange={(opt) => navigate(opt.value)}
//                 />

//                 {/* SELECT 3 */}
//                 <GradientSelect
//                     size="lg"
//                     options={select3Options}
//                     value={getActiveOption(select3Options)}
//                     isActive={!!getActiveOption(select3Options)}
//                     onChange={(opt) => navigate(opt.value)}
//                 />

//                 {/* REPORT BUTTON */}
//                 <ActionButton
//                     label="Report"
//                     size="lg"
//                     isActive={isActiveRoute("/report")}
//                     onClick={() => navigate("/report")}
//                 />

//                 {/* SELECT 4 */}
//                 <GradientSelect
//                     size="lg"
//                     options={select4Options}
//                     value={getActiveOption(select4Options)}
//                     isActive={!!getActiveOption(select4Options)}
//                     onChange={(opt) => navigate(opt.value)}
//                 />
//             </div>

//             {/* ===== ROW 3 ===== */}
//             <div className="flex items-center gap-3 mt-4">
//                 <div className="flex-1" />
//             </div>
//         </div>
//     );
// };

// export { BTNNavBar };




// import React, { useCallback } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import { ActionButton } from "./Buttons";
// import { GradientSelect } from "./SelectField";
// import { FiLogOut } from "react-icons/fi";
// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { logout } from "../../api/ApiCollection";
// import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
// import { persistor } from "../../store/store";
// import { resetAuth } from "../../features/auth/authSlice";

// /* ================= TYPES ================= */

// interface Option {
//     label: string;
//     value: string; // route
// }

// /* ================= DROPDOWN OPTIONS ================= */

// /* --- Administration --- */
// const ADMIN_OPTIONS: Option[] = [
//     { label: "Role Management", value: "admin/role-management" },
//     { label: "User Management", value: "admin/user-management" },
//     { label: "Aircraft Type Master", value: "admin/aircraft-type-master" },
//     { label: "ATA Master", value: "admin/ata-master" },
//     { label: "Dos and Don’ts Master", value: "admin/dos-donts-master" },
//     { label: "Machine Master", value: "admin/machine-master" },
// ];

// /* --- Question Bank Mgmt. --- */
// const QUESTION_BANK_OPTIONS: Option[] = [
//     { label: "Add Question", value: "question-bank/add" },
//     { label: "Check Question", value: "question-bank/check" },
//     { label: "Verify Question", value: "question-bank/verify" },
// ];

// /* --- Exam Paper Mgmt. --- */
// const EXAM_PAPER_OPTIONS: Option[] = [
//     { label: "Generate ATA Groups", value: "exam-paper/ata-groups" },
//     { label: "Register Candidate", value: "exam-paper/register-candidate" },
//     { label: "Validate Question Paper", value: "exam-paper/validate" },
//     { label: "Generate Exam Paper / Batch", value: "exam-paper/generate" },
// ];

// /* --- Report --- */
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
// const ACTION_BUTTON_PAGES = [
//     { label: "Dashboard", value: "dashboard" },
//     { label: "Exam Status / Hard Copy", value: "exam-status" },
// ];


// const ALL_OPTIONS: Option[] = [
//     ...ADMIN_OPTIONS,
//     ...QUESTION_BANK_OPTIONS,
//     ...EXAM_PAPER_OPTIONS,
//     ...REPORT_OPTIONS,
//     ...ACTION_BUTTON_PAGES
// ];


// /* ================= COMPONENT ================= */

// const BTNNavBar: React.FC = () => {
//     const navigate = useNavigate();
//     const dispatch = useAppDispatch()
//     const queryClient = useQueryClient();
//     const location = useLocation();
//     const userId = useAppSelector(e => e.auth.user.id)
//     const getActivePageLabel = useCallback(() => {
//         const match = ALL_OPTIONS.find((opt) =>
//             location.pathname.startsWith(opt.value)
//         );

//         return match?.label ?? "Dashboard";
//     }, [location.pathname]);
//     /* ================= HELPERS ================= */

//     const getActiveOption = useCallback(
//         (options: Option[]) =>
//             options.find((opt) => location.pathname.startsWith(opt.value)),
//         [location.pathname]
//     );


//     const isActiveRoute = useCallback(
//         (route: string) => location.pathname.startsWith(route),
//         [location.pathname]
//     );

//     const mutation = useMutation({ mutationFn: logout });

//     const handleLogout = () => {
//         mutation.mutate(
//             { userId },
//             {
//                 onSuccess: async () => {
//                     dispatch(resetAuth());     // 🔥 clears redux memory
//                     await persistor.purge();   // clears persisted redux
//                     queryClient.clear();       // clears react-query
//                     localStorage.clear();
//                     sessionStorage.clear();
//                     navigate("/login", { replace: true });
//                 },
//             }
//         );
//     };



//     /* ================= RENDER ================= */

//     return (
//         <div className="px-8 pt-0 pb-0 shrink-0">
//             {/* ===== ROW 1 ===== */}
//             <div className="relative flex items-center justify-between">
//                 {/* LEFT */}
//                 <div className="flex items-center">
//                     <span className="text-lg font-semibold text-[#6B3A1E]">
//                         {/* vistara */}
//                     </span>
//                 </div>

//                 {/* CENTER (ALWAYS SCREEN CENTER) */}
//                 <div
//                     className="
//         absolute left-1/2 -translate-x-1/2
//         px-10 py-2 rounded-b-2xl
//         bg-gradient-to-b from-red-700 to-red-900
//         text-white font-semibold shadow-md
//         whitespace-nowrap
//       "
//                 >
//                     {getActivePageLabel()}
//                 </div>

//                 {/* RIGHT */}

//                 <div className="flex items-center gap-3 text-sm">
//                     {/* ===== USER INFO ===== */}
//                     <div className="text-right">
//                         <p className="font-semibold">Ajay Pal</p>
//                         <p className="text-xs text-gray-600">
//                             Examination Manager
//                         </p>
//                     </div>

//                     {/* ===== LOGOUT BUTTON ===== */}
//                     <button
//                         className="
//       flex items-center gap-2
//       px-4 py-2
//       rounded-lg
//       text-black
//       font-semibold
//       transition-all duration-200
//       active:scale-95
//       focus:outline-none focus:ring-2 focus:ring-red-400
//     "
//                         onClick={handleLogout}
//                     >
//                         <FiLogOut className="text-base" />
//                         Logout
//                     </button>
//                 </div>

//             </div>

//             {/* ===== ROW 2 (NAVIGATION) ===== */}
//             <div className="flex items-center gap-1 mt-8 justify-center">
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

//                 <ActionButton
//                     label="Exam Status/Hard Copy"
//                     size="lg"
//                     isActive={isActiveRoute("exam-status")}
//                     onClick={() => navigate("exam-status")}
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


import React from "react";
import { useNavigate } from "react-router-dom";
import { ActionButton } from "./Buttons";
import { GradientSelect } from "./SelectField";
import { FiLogOut } from "react-icons/fi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout } from "../../api/ApiCollection";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { persistor } from "../../store/store";
import { resetAuth } from "../../features/auth/authSlice";
import { useActiveRoute } from "../../hooks/useActiveRoute";

/* ================= TYPES ================= */

interface Option {
    label: string;
    value: string;
}

/* ================= OPTIONS ================= */

const ADMIN_OPTIONS: Option[] = [
    { label: "Role Management", value: "admin/role-management" },
    { label: "User Management", value: "admin/user-management" },
    { label: "Aircraft Type Master", value: "admin/aircraft-type-master" },
    { label: "ATA Master", value: "admin/ata-master" },
    { label: "Dos and Don’ts Master", value: "admin/dos-donts-master" },
    { label: "Machine Master", value: "admin/machine-master" },
];

const QUESTION_BANK_OPTIONS: Option[] = [
    { label: "Add Question", value: "question-bank/add" },
    { label: "Check Question", value: "question-bank/check" },
    { label: "Verify Question", value: "question-bank/verify" },
];

const EXAM_PAPER_OPTIONS: Option[] = [
    { label: "Generate ATA Groups", value: "exam-paper/ata-groups" },
    { label: "Register Candidate", value: "exam-paper/register-candidate" },
    { label: "Validate Question Paper", value: "exam-paper/validate" },
    { label: "Generate Exam Paper / Batch", value: "exam-paper/generate" },
];

const REPORT_OPTIONS: Option[] = [
    { label: "ATA wise Performance - Overview", value: "report/ata-performance" },
    { label: "Qs. wise Performance - Overview", value: "report/question-performance" },
    { label: "Qs. wise Performance - Candidate", value: "report/question-candidate" },
    { label: "Candidate Exam Activity Log", value: "report/activity-log" },
    { label: "Examination Result Report", value: "report/result" },
    { label: "Question Added / Modified Report", value: "report/question-modified" },
    { label: "Question ID List", value: "report/question-id-list" },
    { label: "Question Paper Validation Report", value: "report/validation" },
];

const ACTION_BUTTON_PAGES: Option[] = [
    { label: "Dashboard", value: "dashboard" },
    { label: "Exam Status / Hard Copy", value: "exam-status" },
];

const ALL_OPTIONS: Option[] = [
    ...ADMIN_OPTIONS,
    ...QUESTION_BANK_OPTIONS,
    ...EXAM_PAPER_OPTIONS,
    ...REPORT_OPTIONS,
    ...ACTION_BUTTON_PAGES,
];

/* ================= COMPONENT ================= */

const BTNNavBar: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const queryClient = useQueryClient();
    const userId = useAppSelector((e) => e.auth.user.id);

    const { getActivePageLabel, isActiveRoute, getActiveOption } =
        useActiveRoute(ALL_OPTIONS);

    const mutation = useMutation({ mutationFn: logout });

    const handleLogout = async () => {
        mutation.mutate({ userId });
        dispatch(resetAuth());
        await persistor.purge();
        queryClient.clear();
        localStorage.clear();
        sessionStorage.clear();
        navigate("/login");
    };

    return (
        <div className="px-8 pt-0 pb-0 shrink-0">
            {/* ===== ROW 1 ===== */}
            <div className="relative flex items-center justify-between">
                {/* LEFT */}
                <div className="flex items-center">
                    <span className="text-lg font-semibold text-[#6B3A1E]" />
                </div>

                {/* CENTER */}
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

                {/* RIGHT */}
                <div className="flex items-center gap-3 text-sm">
                    <div className="text-right">
                        <p className="font-semibold">Ajay Pal</p>
                        <p className="text-xs text-gray-600">Examination Manager</p>
                    </div>

                    <button
                        className="
              flex items-center gap-2
              px-4 py-2
              rounded-lg
              text-black
              font-semibold
              transition-all duration-200
              active:scale-95
              focus:outline-none focus:ring-2 focus:ring-red-400
            "
                        onClick={handleLogout}
                    >
                        <FiLogOut className="text-base" />
                        Logout
                    </button>
                </div>
            </div>

            {/* ===== ROW 2 ===== */}
            <div className="flex items-center gap-1 mt-8 justify-center">
                <ActionButton
                    label="Dashboard"
                    variant="primary"
                    size="lg"
                    isActive={isActiveRoute("dashboard")}
                    onClick={() => navigate("dashboard")}
                />

                <GradientSelect
                    size="lg"
                    staticLabel="Administration"
                    options={ADMIN_OPTIONS}
                    value={getActiveOption(ADMIN_OPTIONS)}
                    isActive={!!getActiveOption(ADMIN_OPTIONS)}
                    onChange={(opt) => navigate(opt.value)}
                />

                <GradientSelect
                    size="lg"
                    staticLabel="Question Bank Mgmt"
                    options={QUESTION_BANK_OPTIONS}
                    value={getActiveOption(QUESTION_BANK_OPTIONS)}
                    isActive={!!getActiveOption(QUESTION_BANK_OPTIONS)}
                    onChange={(opt) => navigate(opt.value)}
                />

                <GradientSelect
                    size="lg"
                    staticLabel="Exam Paper Mgmt"
                    options={EXAM_PAPER_OPTIONS}
                    value={getActiveOption(EXAM_PAPER_OPTIONS)}
                    isActive={!!getActiveOption(EXAM_PAPER_OPTIONS)}
                    onChange={(opt) => navigate(opt.value)}
                />

                <ActionButton
                    label="Exam Status/Hard Copy"
                    size="lg"
                    isActive={isActiveRoute("exam-status")}
                    onClick={() => navigate("exam-status")}
                />

                <GradientSelect
                    size="lg"
                    staticLabel="Report"
                    options={REPORT_OPTIONS}
                    value={getActiveOption(REPORT_OPTIONS)}
                    isActive={!!getActiveOption(REPORT_OPTIONS)}
                    onChange={(opt) => navigate(opt.value)}
                />
            </div>
        </div>
    );
};

export { BTNNavBar };
