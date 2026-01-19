import { useMemo, useRef, useState } from "react";
import {
    useMutation,
    useQuery,
    useQueryClient,
} from "@tanstack/react-query";

import DataTable, { DataTableRef } from "../../components/DataTable";
import FilterSection from "../../components/common/FilterSection";
import Footer from "../../components/Footer";
import Loader from "../../components/common/Loader";
import { format, isDate, parse } from "date-fns";

import { DASHBOARD_FILTER_FIELDS, REGISTER_CANDIDATE_FILTER, trainingTypeOptions } from "../../utils/filterFields";
import { dashboardColumns, registerCandidate } from "../../utils/tableColumns";

import searchIcon from "../../assets/searchIcon.svg";
import questionBnkIcon from "../../assets/questionBnkIcon.svg";

import {
    getQuestionList,
    addEditQuestion,
    getAtaType,
    getQuestionListForQuestionPage,
    getCandidateMaster,
    getGeneratedAta,
    addEditCandidate,
} from "../../api/ApiCollection";

import { useAppSelector } from "../../hooks/reduxHooks";
import { withRowId } from "../../utils/withRowId";

import FormikEditModal from "../../components/common/EditModal/FormikEditModal";
import { FieldSchema } from "../../components/common/EditModal";
import { buildQuestionPayload, buildRegisterCandidatePayload } from "../../utils/permissions/buildPayloads";
import AlertModal from "../../components/common/AlertModal/AlertModal";
import { useAlert } from "../../hooks/useAlert";
import toast from "react-hot-toast";

/* ================= TYPES ================= */



type QuestionFormState = {
    mode: string;
    courseId: string;
    courseName: string;
    aircraftType: string;
    startDate: string;
    endDate: string | number;
    name: string;
    ameLicenseNo: string;
    dob: any;
    contactNo: string | number;
    emailId: string;
    photo: string;
    isActive: boolean;
};

type FilterState = Record<string, any>;

/* ================= DASHBOARD FILTER UTILS ================= */

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

// const applyLocalFilters = (
//     rows: any[],
//     filters: FilterState
// ) => {
//     return rows.filter((row) =>
//         Object.entries(filters).every(([key, filterValue]) => {
//             if (!filterValue) return true;

//             const actualFilterValue =
//                 typeof filterValue === "object" &&
//                     "value" in filterValue
//                     ? filterValue.value
//                     : filterValue;

//             return (
//                 String(row[key]) ===
//                 String(actualFilterValue)
//             );
//         })
//     );
// };

const normalizeDate = (val: any) => {
    if (!val) return "";

    // If Date object → format
    if (isDate(val)) {
        return format(val, "dd-MM-yyyy");
    }

    // If already string → return trimmed
    if (typeof val === "string") {
        return val.trim();
    }

    return String(val);
};

const applyLocalFilters = (rows: any[], filters: FilterState) => {
    return rows.filter((row) =>
        Object.entries(filters).every(([key, filterValue]) => {
            if (!filterValue) return true;

            // Handle react-select values
            const actualFilterValue =
                typeof filterValue === "object" && "value" in filterValue
                    ? filterValue.value
                    : filterValue;

            const rowValue = normalizeDate(row[key]);
            const filterVal = normalizeDate(actualFilterValue);

            return rowValue === filterVal;
        })
    );
};

/* ================= FORM FIELD CONFIG ================= */

const questionFields: FieldSchema[] = [
    { name: "courseId", label: "Course ID", type: "select", required: true },
    { name: "courseName", label: "Course Name", type: "text", required: true },
    { name: "aircraftType", label: "Aircraft Type", type: "text", required: true },
    { name: "startDate", label: "Training Start Date", type: "text", required: true },
    { name: "endDate", label: "Training End Date", type: "text", required: true },
    { name: "name", label: "Name", type: "text", required: true },
    { name: "ameLicenseNo", label: "AME License NO", type: "number", required: true },
    { name: "dob", label: "Date Of Birth", type: "date", required: true },
    { name: "contactNo", label: "ContactNo", type: "number", required: true },
    { name: "emailId", label: "Email ID", type: "text", required: true },
    { name: "photo", label: "photo", type: "file", required: false },
    { name: "isActive", label: "Status", type: "toggle", required: true },
];

/* ================= EMPTY FORM (ADD MODE) ================= */

const EMPTY_REGISTER_FORM = {
    mode: "add",
    courseId: "",
    courseName: "",
    aircraftType: "",
    startDate: "",
    endDate: "",
    name: "",
    ameLicenseNo: "",
    dob: "",
    contactNo: "",
    emailId: "",
    photo: "",
    isActive: true,
};

/* ================= COMPONENT ================= */

const RegisterCandidate = () => {
    /* ===== REFS ===== */
    const tableRef = useRef<DataTableRef>(null);

    const { alert, showAlert, hideAlert } = useAlert();
    /* ===== GLOBAL STATE ===== */
    const userId = useAppSelector((s) => s.auth.user?.id);
    const queryClient = useQueryClient();
    const [filterKey, setFilterKey] = useState<number>(0);
    /* ===== LOCAL STATE ===== */
    const [filters, setFilters] =
        useState<FilterState>({});

    const [editOpen, setEditOpen] =
        useState<boolean>(false);
    const [editForm, setEditForm] =
        useState<QuestionFormState>(null);
    const [originalRow, setOriginalRow] =
        useState<any>(null);

    /* ================= API ================= */

    const getGeneratedAtaQuery: any = useQuery({
        queryKey: ["getGeneratedAta", userId],
        queryFn: getGeneratedAta,
        enabled: !!userId,
    });



    const registerCandidatesQuery: any = useQuery({
        queryKey: ["getCandidateMaster", userId],
        queryFn: getCandidateMaster,
        enabled: !!userId,
    });

    const mutation = useMutation({
        mutationFn: addEditCandidate,
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
                toast.success("Added Successfully")
            }
            queryClient.invalidateQueries({
                queryKey: ["questionList"],
            });
            setEditOpen(false);
        },
    });

    /* ================= TABLE ROWS ================= */

    const allRows = useMemo(
        () =>
            withRowId(
                registerCandidatesQuery.data?.registeredCandidates?.reverse() ?? []
            ),
        [registerCandidatesQuery.data?.registeredCandidates]
    );

    /* ================= OPTION MAPS ================= */

const optionMaps = useMemo(() => {
    const registeredAtas = getGeneratedAtaQuery.data?.registeredAtas ?? [];

    /* ---------- COURSE OPTIONS ---------- */
    const courseId = registeredAtas.map((t) => ({
        label: t.courseId,
        value: t.courseId,
    }));

    const startDate = registeredAtas.map((t) => ({
        label: t.startDate,
        value: t.startDate,
    }));

    const endDate = registeredAtas.map((t) => ({
        label: t.endDate,
        value: t.endDate,
    }));

    /* ---------- PHASE OPTIONS (NEW) ---------- */
    const phaseSet = new Set<number>();

    registeredAtas.forEach((ata) => {
        ata.ataPhases?.forEach((p) => {
            if (p?.phase !== undefined && p?.phase !== null) {
                phaseSet.add(p.phase);
            }
        });
    });

    const phaseOptions = Array.from(phaseSet).map((phase) => ({
        label: `Phase ${phase}`,
        value: phase,
    }));

    return {
        courseId,
        levelOfTraining: trainingTypeOptions,
        startDate,
        endDate,
        phase: phaseOptions, // ✅ ADD THIS
    };
}, [getGeneratedAtaQuery.data]);

    /* ================= FILTER FIELDS ================= */

    const filterFieldsWithOptions: any = useMemo(
        () =>
            REGISTER_CANDIDATE_FILTER.map((field) => ({
                ...field,
                options:
                    optionMaps[field.key] ??
                    getUniqueOptions(allRows, field.key),
            })),
        [allRows, optionMaps]
    );

    const filteredRows = useMemo(
        () => applyLocalFilters(allRows, filters),
        [allRows, filters]
    );

    /* ================= FORM FIELDS WITH OPTIONS ================= */

    const questionFieldsWithOptions = useMemo(
        () =>
            questionFields
                .filter((field) => {
                    if (
                        field.name === "reason" &&
                        editForm?.mode === "add"
                    ) {
                        return false;
                    }
                    return true;
                })
                .map((field) =>
                    optionMaps[field.name]
                        ? {
                            ...field,
                            options:
                                optionMaps[field.name],
                        }
                        : field
                ),
        [optionMaps, editForm?.mode]
    );

    /* ================= EDIT / ADD ================= */

    const handleAddQuestion = () => {
        if (getGeneratedAtaQuery.data?.registeredAtas?.length > 0) {
            setOriginalRow(null);
            setEditForm(EMPTY_REGISTER_FORM);
            setEditOpen(true);
        } else {
            showAlert({
                title: "Error",
                message: <div className="font-bold">No Course Available</div>,
                variant: "error",
                showActionButtons: false,
                onClose: hideAlert,
            });
        }
    };

    /* ================= SUBMIT ================= */

    const handleSubmit = (values: any) => {
        if (!userId || !editForm) return;

        const isAddMode =
            editForm.mode !== "edit";

        const payload = buildRegisterCandidatePayload(
            originalRow,
            values,
            userId,
            isAddMode
        );

        mutation.mutate({
            ...payload,
            ...(isAddMode && {
                isChecked: false,
                isVerified: false,
            }),
        });
    };

    /* ================= LOADING ================= */

    const isPageLoading =
        getGeneratedAtaQuery.isLoading ||
        registerCandidatesQuery.isLoading ||
        mutation.isPending;


    const handleEditClick = (row: any) => {
        setOriginalRow(row);

        setEditForm({
            mode: "edit",
            courseId: row.courseId,
            courseName: row.courseName,
            aircraftType: row.aircraftType,
            startDate: row.startDate,
            endDate: row.endDate,
            name: row.candidateName,
            ameLicenseNo: row.licenceNumber,
            dob: parse(row.dateOfBirth, "dd-MM-yyyy", new Date()),
            contactNo: row.conatctNumber,
            emailId: row.emailId,
            photo: "",
            isActive: row.isActive
        });

        setEditOpen(true);
    };

    const handleReset = () => {
        setFilters({});
        setFilterKey(Math.random());
    };
    /* ================= UI ================= */

    return (
        <div className="h-screen flex flex-col">
            <Loader visible={isPageLoading} fullscreen />
            <AlertModal {...alert} />
            <div className="mx-20 mt-5">
                <FilterSection
                    key={filterKey}
                    applyLabel="Register New"
                    showActionButtons
                    onApply={handleAddQuestion}
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
                                    Registered Candidate
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
                            columns={registerCandidate}
                            rows={filteredRows}
                            includeActionColumn
                            actionConfig={{ edit: true }}
                            onEditClick={handleEditClick}
                        />
                    </div>
                </div>
            </div>

            <Footer buttons={[

                { label: "Download Excel", onClick: () => { } },
                { label: "Bulk Registration", onClick: () => { } },
                { label: "Reset", onClick: handleReset },
            ]} />

            {/* ===== ADD / EDIT MODAL ===== */}
            {editOpen && editForm && (
                <FormikEditModal
                    allValues={getGeneratedAtaQuery.data?.registeredAtas || []}
                    open={editOpen}
                    type={originalRow}
                    title={
                        originalRow
                            ? "Edit Candidate"
                            : "Register Candidate"
                    }
                    leftTitle="Register Candidate"
                    fields={questionFieldsWithOptions}
                    initialValues={editForm}
                    onClose={() => setEditOpen(false)}
                    onSubmit={handleSubmit}
                />
            )}
        </div>
    );
};

export default RegisterCandidate;
