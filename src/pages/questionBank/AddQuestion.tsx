import { useMemo, useRef, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import DataTable, { DataTableRef } from "../../components/DataTable";
import FilterSection from "../../components/common/FilterSection";
import Footer from "../../components/Footer";

import { DASHBOARD_FILTER_FIELDS } from "../../utils/filterFields";
import { dashboardColumns } from "../../utils/tableColumns";

import searchIcon from "../../assets/searchIcon.svg";
import questionBnkIcon from "../../assets/questionBnkIcon.svg";

import {
    getQuestionList,
    addEditQuestion,
    getAtaType,
} from "../../api/ApiCollection";

import { useAppSelector } from "../../hooks/reduxHooks";
import { withRowId } from "../../utils/withRowId";

import {
    EditModalShell,
    EditModalRenderer,
    FieldSchema,
} from "../../components/common/EditModal";

import { buildQuestionPayload } from "../../utils/permissions/buildPayloads";

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
    filters: Record<string, any>
) => {
    return rows.filter((row) =>
        Object.entries(filters).every(([key, filterValue]) => {
            if (!filterValue) return true;

            const actualFilterValue =
                typeof filterValue === "object" && "value" in filterValue
                    ? filterValue.value
                    : filterValue;

            return String(row[key]) === String(actualFilterValue);
        })
    );
};

/* ================= FIELD CONFIG ================= */

const questionFields: FieldSchema[] = [
    { name: "question", label: "Question", type: "text", required: true },

    { name: "aircraftType", label: "Aircraft Type", type: "select", required: true },
    { name: "ata", label: "ATA", type: "select", required: true },
    { name: "complexity", label: "Complexity", type: "select", required: true },

    { name: "bookTitle", label: "Book Title", type: "text", required: true },
    { name: "chapter", label: "Chapter", type: "text", required: true },
    { name: "topic", label: "Topic", type: "text", required: true },
    { name: "page", label: "Page", type: "text", required: true },

    { name: "answerA", label: "Answer A", type: "text", required: true },
    { name: "answerB", label: "Answer B", type: "text", required: true },
    { name: "answerC", label: "Answer C", type: "text", required: true },
    { name: "answerD", label: "Answer D", type: "text" },

    { name: "correctAnswer", label: "Correct Answer", type: "select", required: true },

    { name: "reason", label: "Reason", type: "text" },
    { name: "isActive", label: "Status", type: "toggle", required: true },
];

/* ================= COMPONENT ================= */

const AddQuestions = () => {
    const tableRef = useRef<DataTableRef>(null);
    const queryClient = useQueryClient();
    const userId = useAppSelector((s) => s.auth.user?.id);

    const [filters, setFilters] = useState<Record<string, any>>({});
    const [editOpen, setEditOpen] = useState(false);
    const [editForm, setEditForm] = useState<any>(null);
    const [originalRow, setOriginalRow] = useState<any>(null);

    /* ===== API ===== */

    const questionQuery: any = useQuery({
        queryKey: ["questionList", userId],
        queryFn: getQuestionList,
        enabled: !!userId,
    });

    const ataQuery: any = useQuery({
        queryKey: ["ataMaster", userId],
        queryFn: getAtaType,
        enabled: !!userId,
    });

    const mutation = useMutation({
        mutationFn: addEditQuestion,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["questionList"] });
            setEditOpen(false);
        },
    });

    /* ===== TABLE ROWS ===== */

    const allRows = useMemo(() => {
        return withRowId(questionQuery?.data?.questions ?? []);
    }, [questionQuery?.data?.questions]);

    /* ===== OPTION MAPS (ATA API → DROPDOWNS) ===== */

    const optionMaps = useMemo(() => {
        const ataMasters = ataQuery?.data?.ataMasters ?? [];

        const ataOptions = ataMasters.map((a: any) => ({
            label: `${a.ataCode} - ${a.ataDescription}`,
            value: a.ataCode,
        }));

        const aircraftTypeOptions = Array.from(
            new Set(
                ataMasters.flatMap((a: any) =>
                    a.aircraftType
                        ? a.aircraftType.split(",").map((v: string) => v.trim())
                        : []
                )
            )
        ).map((t) => ({ label: t, value: t }));

        return {
            ata: ataOptions,
            aircraftType: aircraftTypeOptions,
            complexity: [
                { label: "1", value: 1 },
                { label: "2", value: 2 },
                { label: "3", value: 3 },
            ],
            correctAnswer: [
                { label: "A", value: "A" },
                { label: "B", value: "B" },
                { label: "C", value: "C" },
                { label: "D", value: "D" },
            ],
        };
    }, [ataQuery.data]);

    /* ===== FILTER OPTIONS (DASHBOARD LOGIC) ===== */

    const filterFieldsWithOptions: any = useMemo(() => {
        return DASHBOARD_FILTER_FIELDS.map((field) => ({
            ...field,
            type: "select",
            options:
                optionMaps[field.key] ??
                getUniqueOptions(allRows, field.key),
        }));
    }, [allRows, optionMaps]);

    const filteredRows = useMemo(() => {
        return applyLocalFilters(allRows, filters);
    }, [allRows, filters]);

    /* ===== POPUP FIELDS WITH OPTIONS ===== */

    const questionFieldsWithOptions = useMemo(() => {
        return questionFields.map((field) => {
            if (optionMaps[field.name]) {
                return { ...field, options: optionMaps[field.name] };
            }
            return field;
        });
    }, [optionMaps]);

    /* ===== EDIT / ADD ===== */

    const handleEditClick = (row: any) => {
        setOriginalRow(row);
        setEditForm({
            question: row.question ?? "",
            aircraftType: row.aircraftType ?? "",
            ata: row.ata ?? "",
            complexity: row.complexity ?? "",
            bookTitle: row.bookTitle ?? "",
            chapter: row.chapter ?? "",
            topic: row.topic ?? "",
            page: row.page ?? "",
            answerA: row.answerA ?? "",
            answerB: row.answerB ?? "",
            answerC: row.answerC ?? "",
            answerD: row.answerD ?? "",
            correctAnswer: row.correctAnswer ?? "",
            reason: row.reason ?? "",
            isActive: !!row.isActive,
        });
        setEditOpen(true);
    };

    const handleAddQuestion = () => {
        setOriginalRow(null);
        setEditForm({
            question: "",
            aircraftType: "",
            ata: "",
            complexity: "",
            bookTitle: "",
            chapter: "",
            topic: "",
            page: "",
            answerA: "",
            answerB: "",
            answerC: "",
            answerD: "",
            correctAnswer: "",
            reason: "",
            isActive: true,
        });
        setEditOpen(true);
    };

    const handleSubmit = () => {
        if (!userId) return;
        mutation.mutate(buildQuestionPayload(originalRow, editForm, userId));
    };

    /* ================= UI ================= */

    return (
        <div className="h-screen flex flex-col">
            <div className="flex-1 mx-10 mt-9">

                <FilterSection
                    showActionButtons={true}
                    onApply={handleAddQuestion}
                    fields={filterFieldsWithOptions}
                    onChange={setFilters}
                />

                <div className="flex items-center justify-between mt-6">
                    <div className="flex items-center gap-4">
                        <img src={questionBnkIcon} className="w-10 h-10" />
                        <h2 className="text-lg font-extrabold">Question Bank</h2>
                    </div>

                    <div
                        className="
                  flex items-center
                  w-[16%] h-8
                  rounded-xl
                  bg-[#C3BFBF]
                  border border-red-200
                  shadow-sm
                  px-2
                  mt-5
                  mr-0
                "
                    >
                        <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0">
                            <img
                                src={searchIcon}
                                alt="Search"
                                className="w-8 h-8 mr-16"
                            />
                        </div>

                        <input

                            placeholder="Search"
                            className="
                    flex-1
                    bg-transparent
                    px-4
                    text-sm
                    placeholder-gray-600
                    focus:outline-none
                    focus:ring-0
                  "
                            onChange={(e) =>
                                tableRef.current?.setSearch(
                                    e.target.value
                                )
                            }
                        />
                    </div>
                </div>

                <div className="flex overflow-hidden h-96 ">
                    <DataTable
                        ref={tableRef}
                        columns={dashboardColumns}
                        rows={filteredRows}
                        includeActionColumn
                        actionConfig={{ edit: true }}
                        onEditClick={handleEditClick}
                    />
                </div>
            </div>

            <Footer />

            {editOpen && editForm && (
                <EditModalShell
                    open={editOpen}
                    title={originalRow ? "Edit Question" : "Add Question"}
                    leftTitle="Question"
                    onClose={() => setEditOpen(false)}
                    onSubmit={handleSubmit}
                >
                    <EditModalRenderer
                        fields={questionFieldsWithOptions}
                        values={editForm}
                        onChange={(name, value) =>
                            setEditForm((prev: any) => ({ ...prev, [name]: value }))
                        }
                    />
                </EditModalShell>
            )}
        </div>
    );
};

export default AddQuestions;
