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
} from "../../api/ApiCollection";

import { useAppSelector } from "../../hooks/reduxHooks";
import { withRowId } from "../../utils/withRowId";

import FormikEditModal from "../../components/common/EditModal/FormikEditModal";
import { FieldSchema } from "../../components/common/EditModal";
import { buildQuestionPayload } from "../../utils/permissions/buildPayloads";
import AlertModal from "../../components/common/AlertModal/AlertModal";
import { useAlert } from "../../hooks/useAlert";
import toast from "react-hot-toast";

/* ================= TYPES ================= */

type QuestionFormState = {
    mode: "add" | "edit";
    question: string;
    aircraftType: string;
    ataCode: string;
    complexity: string | number;
    bookTitle: string;
    chapter: string;
    topic: string;
    page: string | number;
    answer1: string;
    answer2: string;
    answer3: string;
    correctAnswer: string | number;
    reason: string;
    isActive: boolean;
} | null;

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

/* ================= FORM FIELD CONFIG ================= */

const questionFields: FieldSchema[] = [
    { name: "question", label: "Question", type: "text", required: true },

    { name: "aircraftType", label: "Aircraft Type", type: "select", required: true },
    { name: "ataCode", label: "ATA", type: "select", required: true },
    { name: "complexity", label: "Complexity", type: "select", required: true },

    { name: "bookTitle", label: "Book Title", type: "text", required: true },
    { name: "chapter", label: "Chapter", type: "text", required: true },
    { name: "topic", label: "Topic", type: "text", required: true },
    { name: "page", label: "Page", type: "number", required: true },

    { name: "answer1", label: "Answer A", type: "text", required: true },
    { name: "answer2", label: "Answer B", type: "text", required: true },
    { name: "answer3", label: "Answer C", type: "text", required: true },

    { name: "correctAnswer", label: "Correct Answer", type: "select", required: true },
    { name: "reason", label: "Reason", type: "text", required: true },
    { name: "isActive", label: "Status", type: "toggle", required: true },
];

/* ================= EMPTY FORM (ADD MODE) ================= */

const EMPTY_QUESTION_FORM: QuestionFormState = {
    mode: "add",
    question: "",
    aircraftType: "",
    ataCode: "",
    complexity: "",
    bookTitle: "",
    chapter: "",
    topic: "",
    page: "",
    answer1: "",
    answer2: "",
    answer3: "",
    correctAnswer: "",
    reason: "",
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
        queryFn: getQuestionListForQuestionPage,
        enabled: !!userId,
    });

    const registerCandidatesQuery: any = useQuery({
        queryKey: ["getCandidateMaster", userId],
        queryFn: getCandidateMaster,
        enabled: !!userId,
    });

    const mutation = useMutation({
        mutationFn: addEditQuestion,
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
                toast.success("Question Added Successfully")
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
                getGeneratedAtaQuery.data?.registeredAtas ?? []
            ),
        [getGeneratedAtaQuery.data?.registeredAtas]
    );

    /* ================= OPTION MAPS ================= */

    const optionMaps = useMemo(() => {
        const registerCandidates = registerCandidatesQuery.data?.registeredCandidates ?? [];
        const aircraftTypeOptions = registerCandidates.map((t) => ({
            label: t.aircraftType,
            value: t.aircraftType,
        }))
        const licenceNumber = registerCandidates.map((t) => ({
            label: t.licenceNumber,
            value: t.licenceNumber,
        }))
        const email = registerCandidates.map((t) => ({
            label: t.emailId,
            value: t.emailId,
        }))
        const courseId = registerCandidates.map((t) => ({
            label: t.courseId,
            value: t.courseId,
        }))
        const courseName = registerCandidates.map((t) => ({
            label: t.courseName,
            value: t.courseName,
        }))
        return {
            aircraftType: aircraftTypeOptions,
            trainingType: trainingTypeOptions,
            emailId: email,
            courseId: courseId,
            courseName: courseName,
            licenceNumber: licenceNumber
        };
    }, [registerCandidatesQuery.data]);

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
        setOriginalRow(null);
        setEditForm(EMPTY_QUESTION_FORM);
        setEditOpen(true);
    };

    /* ================= SUBMIT ================= */

    const handleSubmit = (values: any) => {
        if (!userId || !editForm) return;

        const isAddMode =
            editForm.mode !== "edit";

        const payload = buildQuestionPayload(
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

    /* ================= UI ================= */

    return (
        <div className="h-screen flex flex-col">
            <Loader visible={isPageLoading} fullscreen />
            <AlertModal {...alert} />
            <div className="mx-20 mt-5">
                <FilterSection
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
                            actionConfig={{ questionStatus: true }}
                            onQuestionStatusChange={() => { }}
                        />
                    </div>
                </div>
            </div>

            <Footer buttons={[

                { label: "Download Excel", onClick: () => { } },
                { label: "Bulk Registration", onClick: () => { } },
                { label: "Reset", onClick: () => { } },
            ]} />

            {/* ===== ADD / EDIT MODAL ===== */}
            {editOpen && editForm && (
                <FormikEditModal
                    open={editOpen}
                    type={originalRow}
                    title={
                        originalRow
                            ? "Edit Question"
                            : "Add Question"
                    }
                    leftTitle="Question"
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
