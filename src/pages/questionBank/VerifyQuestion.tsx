
// import { useEffect, useMemo, useRef, useState } from "react";
// import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// import DataTable, { DataTableRef } from "../../components/DataTable";
// import FilterSection from "../../components/common/FilterSection";
// import Footer from "../../components/Footer";

// import { DASHBOARD_FILTER_FIELDS } from "../../utils/filterFields";
// import { dashboardColumns } from "../../utils/tableColumns";

// import searchIcon from "../../assets/searchIcon.svg";
// import questionBnkIcon from "../../assets/questionBnkIcon.svg";

// import {
//     getAtaType,
//     getQuestionForChecking,
//     getQuestionForVerification,
//     updatedQuestionList,
//     updatedVerifyQuestion,
// } from "../../api/ApiCollection";

// import { useAppSelector } from "../../hooks/reduxHooks";
// import { withRowId } from "../../utils/withRowId";




// const getUniqueOptions = (rows: any[], key: string) => {
//     const set = new Set<any>();

//     rows.forEach((row) => {
//         const value = row[key];
//         if (value !== null && value !== undefined && value !== "") {
//             set.add(value);
//         }
//     });

//     return Array.from(set).map((val) => ({
//         label: String(val),
//         value: val,
//     }));
// };

// const applyLocalFilters = (
//     rows: any[],
//     filters: Record<string, any>
// ) => {
//     return rows.filter((row) =>
//         Object.entries(filters).every(([key, filterValue]) => {
//             if (!filterValue) return true;

//             // ✅ Extract actual value from Select option
//             const actualFilterValue =
//                 typeof filterValue === "object" && "value" in filterValue
//                     ? filterValue.value
//                     : filterValue;

//             const rowValue = row[key];

//             return String(rowValue) === String(actualFilterValue);
//         })
//     );
// };



// const VerifyQuestion = () => {
//     const tableRef = useRef<DataTableRef>(null);
//     const queryClient = useQueryClient();
//     const userId = useAppSelector((s) => s.auth.user?.id);
//     const [changedQuestions, setChangedQuestions] = useState<
//         { sno: number; isOk: boolean; reason: string }[]
//     >([]);
//     const [filterKey, setFilterKey] = useState<number>(0);
//     const [filters, setFilters] = useState<Record<string, any>>({});
//     const [filteredRows, setFilteredRows] = useState([])

//     /* ================= API ================= */

//     const questionQuery: any = useQuery({
//         queryKey: ["questionList", userId],
//         queryFn: getQuestionForVerification,
//         enabled: !!userId,
//     });

//     const mutation = useMutation({
//         mutationFn: updatedVerifyQuestion,
//         onSuccess: () => {
//             queryClient.invalidateQueries({ queryKey: ["questionList"] });
//         },
//     });

//     /* ================= TABLE ROWS ================= */

//     const allRows = useMemo(() => {
//         return withRowId(questionQuery?.data?.questions ?? []);
//     }, [questionQuery?.data?.questions]);

//     const filterFieldsWithOptions: any = useMemo(() => {
//         return DASHBOARD_FILTER_FIELDS.map((field) => ({
//             ...field,
//             type: "select",
//             options: getUniqueOptions(allRows, field.key),
//         }));
//     }, [allRows]);


//     useEffect(() => {
//         const rows = applyLocalFilters(allRows, filters);
//         setFilteredRows(rows)
//     }, [allRows, filters])

//     /* ================= EDIT / ADD ================= */
//     const onQuestionStatusChange = (row: any) => {
//         const nextIsOk = !row.isChecked;
//         setFilteredRows((prev) =>
//             prev.map((r) =>
//                 r.sno === row.sno
//                     ? { ...r, isChecked: nextIsOk }
//                     : r
//             )
//         );
//         setChangedQuestions((prev) => {
//             const existing = prev.find((q) => q.sno === row.sno);

//             const updatedItem = {
//                 sno: row.sno,
//                 isOk: nextIsOk,
//                 reason: row.reason || "",
//             };

//             if (existing) {
//                 return prev.map((q) =>
//                     q.sno === row.sno ? updatedItem : q
//                 );
//             }
//             return [...prev, updatedItem];
//         });
//     };

//     /* ================= SUBMIT ================= */

//     const handleSubmit = () => {
//         if (!userId) return;
//         const payload = {
//             userId,
//             questions: changedQuestions
//         }
//         mutation.mutate({
//             ...payload,
//         });
//     };


//     const handleReset = () => {
//         setFilters({})
//         setFilterKey(Math.random())
//     }

//     /* ================= UI ================= */

//     return (
//         <div className="h-screen flex flex-col ">
//             <div className="mx-20 mt-5">
//                 <div>
//                     <FilterSection
//                         key={filterKey}
//                         fields={filterFieldsWithOptions}
//                         onChange={setFilters}
//                     />
//                     <div className="flex flex-col flex-1 overflow-hidden">
//                         {/* ===== HEADER ROW ===== */}
//                         <div className="flex items-center justify-between shrink-0 mt-[1%] ">
//                             <div className="flex gap-6 items-center">
//                                 <button
//                                     onClick={() => console.log("Question Bank clicked")}
//                                     className="flex items-center gap-2 focus:outline-none hover:opacity-80"
//                                 >
//                                     <img
//                                         src={questionBnkIcon}
//                                         alt="Question Bank"
//                                         className="w-12 h-12"
//                                     />
//                                     <span className="text-md font-extrabold text-black">
//                                         Question Bank- Verify Question
//                                     </span>
//                                 </button>
//                             </div>

//                             {/* ===== SEARCH (UI ONLY – NO LOGIC CHANGE) ===== */}
//                             <div
//                                 className="
//                   flex items-center
//                   w-[17%] h-8
//                   rounded-xl
//                   bg-[#C3BFBF]
//                   border border-red-200
//                   shadow-sm
//                   px-2
//                   mt-6
//                   mr-0
//                 "
//                             >
//                                 <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0">
//                                     <img
//                                         src={searchIcon}
//                                         alt="Search"
//                                         className="w-8 h-8 mr-16"
//                                     />
//                                 </div>

//                                 <input

//                                     placeholder="Search"
//                                     className="
//                     flex-1
//                     bg-transparent
//                     px-4
//                     text-sm
//                     placeholder-gray-600
//                     focus:outline-none
//                     focus:ring-0
//                   "
//                                     onChange={(e) =>
//                                         tableRef.current?.setSearch(
//                                             e.target.value
//                                         )
//                                     }
//                                 />
//                             </div>
//                         </div>

//                         {/* ===== TABLE ===== */}
//                         <div className="flex overflow-hidden mt-2 h-96">
//                             <DataTable
//                                 ref={tableRef}
//                                 columns={dashboardColumns}
//                                 rows={filteredRows}
//                                 includeActionColumn
//                                 actionConfig={{ questionStatus: true }}
//                                 onQuestionStatusChange={onQuestionStatusChange}

//                             />
//                         </div>
//                     </div>


//                 </div>
//             </div>

//             <Footer
//                 buttons={[
//                     {
//                         label: "Reset", onClick: handleReset,
//                     },
//                     { label: "Submit", onClick: handleSubmit },
//                 ]}
//             />
//         </div>
//     );
// };

// export default VerifyQuestion;












import { useEffect, useMemo, useRef, useState } from "react";
import {
    useMutation,
    useQuery,
    useQueryClient,
} from "@tanstack/react-query";

import DataTable, { DataTableRef } from "../../components/DataTable";
import FilterSection from "../../components/common/FilterSection";
import Footer from "../../components/Footer";
import Loader from "../../components/common/Loader";

import { DASHBOARD_FILTER_FIELDS } from "../../utils/filterFields";
import { dashboardColumns } from "../../utils/tableColumns";

import searchIcon from "../../assets/searchIcon.svg";
import questionBnkIcon from "../../assets/questionBnkIcon.svg";

import {
    getQuestionForVerification,
    updatedVerifyQuestion,
} from "../../api/ApiCollection";

import { useAppSelector } from "../../hooks/reduxHooks";
import { withRowId } from "../../utils/withRowId";
import { useAlert } from "../../hooks/useAlert";
import AlertModal from "../../components/common/AlertModal/AlertModal";
import toast from "react-hot-toast";

/* ================= TYPES ================= */

type FilterState = Record<string, any>;

type ChangedQuestion = {
    sno: number;
    isOk: boolean;
    reason: string;
};

/* ================= FILTER UTILS ================= */

const getUniqueOptions = (rows: any[], key: string) => {
    const set = new Set<any>();

    rows.forEach((row) => {
        const value = row[key];
        if (value !== null && value !== undefined && value !== "") {
            set.add(value);
        }
    });

    return Array.from(set).map((val) => ({
        label: String(val),
        value: val,
    }));
};

const applyLocalFilters = (
    rows: any[],
    filters: FilterState
) => {
    return rows.filter((row) =>
        Object.entries(filters).every(([key, filterValue]) => {
            if (!filterValue) return true;

            const actualFilterValue =
                typeof filterValue === "object" &&
                    "value" in filterValue
                    ? filterValue.value
                    : filterValue;

            return (
                String(row[key]) ===
                String(actualFilterValue)
            );
        })
    );
};

/* ================= COMPONENT ================= */

const VerifyQuestion = () => {
    /* ===== REFS ===== */
    const tableRef = useRef<DataTableRef>(null);
    const { alert, showAlert, hideAlert } = useAlert();
    /* ===== GLOBAL STATE ===== */
    const userId = useAppSelector((s) => s.auth.user?.id);
    const queryClient = useQueryClient();

    /* ===== LOCAL STATE ===== */
    const [filters, setFilters] =
        useState<FilterState>({});
    const [filterKey, setFilterKey] =
        useState<number>(0);

    const [filteredRows, setFilteredRows] =
        useState<any[]>([]);
    const [changedQuestions, setChangedQuestions] =
        useState<ChangedQuestion[]>([]);

    /* ================= API ================= */

    const questionQuery: any = useQuery({
        queryKey: ["questionList", userId],
        queryFn: getQuestionForVerification,
        enabled: !!userId,
    });

    const mutation = useMutation({
        mutationFn: updatedVerifyQuestion,
        onSuccess: (result: any) => {
            if (result?.isError) {
                showAlert({
                    title: "Error",
                    message: <div className="font-bold">{result?.errorMessage}</div>,
                    variant: "error",
                    showActionButtons: false,
                    onClose: hideAlert,
                });
            } else {
                toast.success("Status Updated Successfully")
            }
            queryClient.invalidateQueries({
                queryKey: ["questionList"],
            });
        },
    });

    /* ================= TABLE ROWS ================= */

    const allRows = useMemo(
        () =>
            withRowId(
                questionQuery.data?.questions ?? []
            ),
        [questionQuery.data?.questions]
    );

    /* ================= FILTER FIELDS ================= */

    const filterFieldsWithOptions: any = useMemo(
        () =>
            DASHBOARD_FILTER_FIELDS.map((field) => ({
                ...field,
                type: "select",
                options: getUniqueOptions(
                    allRows,
                    field.key
                ),
            })),
        [allRows]
    );

    /* ================= FILTER EFFECT ================= */

    useEffect(() => {
        const rows = applyLocalFilters(
            allRows,
            filters
        );
        setFilteredRows(rows);
    }, [allRows, filters]);

    /* ================= QUESTION STATUS ================= */

    const onQuestionStatusChange = (row: any) => {
        const nextIsOk = !row.isChecked;

        // 1️⃣ Update table UI
        setFilteredRows((prev) =>
            prev.map((r) =>
                r.sno === row.sno
                    ? { ...r, isChecked: nextIsOk }
                    : r
            )
        );

        // 2️⃣ Track only changed rows
        setChangedQuestions((prev) => {
            const existing = prev.find(
                (q) => q.sno === row.sno
            );

            const updatedItem: ChangedQuestion = {
                sno: row.sno,
                isOk: nextIsOk,
                reason: row.reason || "",
            };

            if (existing) {
                return prev.map((q) =>
                    q.sno === row.sno
                        ? updatedItem
                        : q
                );
            }

            return [...prev, updatedItem];
        });
    };

    /* ================= SUBMIT ================= */

    const handleSubmit = () => {
        if (!userId) return;

        mutation.mutate({
            userId,
            questions: changedQuestions,
        });
    };

    /* ================= RESET ================= */

    const handleReset = () => {
        setFilters({});
        setFilterKey(Math.random());
        setChangedQuestions([]);
    };

    /* ================= LOADING ================= */

    const isPageLoading =
        questionQuery.isLoading ||
        mutation.isPending;

    /* ================= UI ================= */

    return (
        <div className="h-screen flex flex-col">
            <Loader visible={isPageLoading} fullscreen />
            <AlertModal {...alert} />
            <div className="mx-20 mt-5">
                <FilterSection
                    key={filterKey}
                    fields={filterFieldsWithOptions}
                    onChange={setFilters}
                />

                <div className="flex flex-col flex-1 overflow-hidden">
                    {/* ===== HEADER ===== */}
                    <div className="flex items-center justify-between shrink-0 mt-[1%]">
                        <div className="flex gap-6 items-center">
                            <button className="flex items-center gap-2 focus:outline-none hover:opacity-80">
                                <img
                                    src={questionBnkIcon}
                                    alt="Question Bank"
                                    className="w-12 h-12"
                                />
                                <span className="text-md font-extrabold text-black">
                                    Question Bank – Verify Question
                                </span>
                            </button>
                        </div>

                        {/* ===== SEARCH ===== */}
                        <div className="flex items-center w-[17%] h-8 rounded-xl bg-[#C3BFBF] border border-red-200 shadow-sm px-2 mt-6">
                            <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0">
                                <img
                                    src={searchIcon}
                                    alt="Search"
                                    className="w-8 h-8 mr-16"
                                />
                            </div>

                            <input
                                placeholder="Search"
                                className="flex-1 bg-transparent px-4 text-sm placeholder-gray-600 focus:outline-none"
                                onChange={(e) =>
                                    tableRef.current?.setSearch(
                                        e.target.value
                                    )
                                }
                            />
                        </div>
                    </div>

                    {/* ===== TABLE ===== */}
                    <div className="flex overflow-hidden mt-2 h-96">
                        <DataTable
                            ref={tableRef}
                            columns={dashboardColumns}
                            rows={filteredRows}
                            includeActionColumn
                            actionConfig={{ questionStatus: true }}
                            onQuestionStatusChange={
                                onQuestionStatusChange
                            }
                        />
                    </div>
                </div>
            </div>

            <Footer
                buttons={[
                    { label: "Reset", onClick: handleReset },
                    { label: "Submit", onClick: handleSubmit },
                ]}
            />
        </div>
    );
};

export default VerifyQuestion;
