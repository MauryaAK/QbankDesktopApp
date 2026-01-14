import { useMemo, useRef, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import DataTable, { DataTableRef } from "../../components/DataTable";
import FilterSection from "../../components/common/FilterSection";
import Footer from "../../components/Footer";

import { DASHBOARD_FILTER_FIELDS, GENERATE_ATA_GROUP } from "../../utils/filterFields";
import { dashboardColumns, generateAtaGroupColumn } from "../../utils/tableColumns";

import searchIcon from "../../assets/searchIcon.svg";
import questionBnkIcon from "../../assets/questionBnkIcon.svg";

import {
    getQuestionList,
    addEditQuestion,
    getAtaType,
    GetAircraftAta,
    getAircraftType,
    getRegisteredAta,
} from "../../api/ApiCollection";

import { useAppSelector } from "../../hooks/reduxHooks";
import { withRowId } from "../../utils/withRowId";

import FormikEditModal from "../../components/common/EditModal/FormikEditModal";
import { FieldSchema } from "../../components/common/EditModal";
import { buildQuestionPayload } from "../../utils/permissions/buildPayloads";
import AtaDataTable from "../../components/AtaDataTable";

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

/* ================= EMPTY FORM ================= */

const EMPTY_QUESTION_FORM = {
    mode: "add",          // 🔥 important for disable logic
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

const GenerateAtaGroups = () => {
    const tableRef = useRef<DataTableRef>(null);
    const queryClient = useQueryClient();
    const userId = useAppSelector((s) => s.auth.user?.id);

    const [filters, setFilters] = useState<Record<string, any>>({});
    const [editOpen, setEditOpen] = useState(false);
    const [editForm, setEditForm] = useState<any>(null);
    const [originalRow, setOriginalRow] = useState<any>(null);

    console.log(filters);

    /* ================= API ================= */
    const selectedAircraftType = useMemo(() => filters?.aircraftType?.value ?? "", [filters?.aircraftType?.value])

    const questionQuery: any = useQuery({
        queryKey: ["selectedAircraftType", selectedAircraftType],
        queryFn: GetAircraftAta,
        enabled: !!selectedAircraftType,
    });

    const aircraftQuery: any = useQuery({
        queryKey: ["aircraftMaster", userId],
        queryFn: getAircraftType,
        enabled: !!userId,
    });
    const registeredAta: any = useQuery({
        queryKey: ["registeredAtaMaster", userId],
        queryFn: getRegisteredAta,
        enabled: !!userId,
    });
    const [filterKey, setFilterKey] = useState<number>(0);

    const handleReset = () => {
        setFilters({})
        setFilterKey(Math.random())
    }

    const mutation = useMutation({
        mutationFn: addEditQuestion,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["questionList"] });
            setEditOpen(false);
        },
    });

    /* ================= TABLE ROWS ================= */

    const allRows = useMemo(() => {
        const rows = questionQuery?.data?.ataMasters ?? [];

        return withRowId(
            rows.map((row: any) => ({
                ...row,
                avaiableQuestion1: row.avaiableQuestion1 ?? 0,
                avaiableQuestion2: row.avaiableQuestion2 ?? 0,
                avaiableQuestion3: row.avaiableQuestion3 ?? 0,
                complexity: 0,
                duration: 0,
                S1: 0,
                S2: 0,
                S3: 0,
            }))
        );
    }, [questionQuery?.data?.ataMasters]);


    /* ================= OPTION MAPS ================= */
    const trainingTypeOptions = [{ label: "A1", value: "A1" },
    { label: "B1", value: "B1" },
    { label: "B2", value: "B2" },
    { label: "B1+B2", value: "B1+B2" },
    { label: "C", value: "C" }
    ]
    const optionMaps = useMemo(() => {
        const aircraftMasters = aircraftQuery.data?.aircraftTypes ?? [];
        const registeredAtas = registeredAta.data?.atas ?? []
        const corucetIdOptions = registeredAtas.map((a: any) => ({
            label: a.courseName,
            value: a.courseId,
        }));
        const corucetNameOptions = registeredAtas.map((a: any) => ({
            label: a.courseId,
            value: a.courseName,
        }));

        const aircraftOptions = aircraftMasters
            .filter((a: any) => a.isActive)
            .map((a: any) => ({
                label: a.aircraftType,
                value: a.aircraftType,
            }));


        return {
            aircraftType: aircraftOptions,
            courseId: corucetIdOptions,
            courseName: corucetNameOptions,
            trainingType: trainingTypeOptions
        };
    }, [aircraftQuery.data, registeredAta.data]);

    /* ================= FILTER FIELDS ================= */

    const filterFieldsWithOptions: any = useMemo(() => {
        return GENERATE_ATA_GROUP.map((field) => ({
            ...field,
            options:
                optionMaps[field.key] ??
                getUniqueOptions(allRows, field.key),
        }));
    }, [allRows, optionMaps]);


    /* ================= FORM FIELDS WITH OPTIONS ================= */

    // const questionFieldsWithOptions = useMemo(() => {
    //     return questionFields.map((field) => {
    //         if (optionMaps[field.name]) {
    //             return { ...field, options: optionMaps[field.name] };
    //         }
    //         return field;
    //     });
    // }, [optionMaps]);
    const questionFieldsWithOptions = useMemo(() => {
        return questionFields
            .filter((field) => {
                // 🔥 Hide reason field only in ADD mode
                if (field.name === "reason" && editForm?.mode === "add") {
                    return false;
                }
                return true;
            })
            .map((field) => {
                if (optionMaps[field.name]) {
                    return { ...field, options: optionMaps[field.name] };
                }
                return field;
            });
    }, [optionMaps, editForm?.mode]);


    /* ================= EDIT / ADD ================= */
    const handleEditClick = (row: any) => {
        setOriginalRow(row);
        setEditForm({
            mode: "edit",
            question: row.question ?? "",
            aircraftType: row.aircraftType ?? "",
            ataCode: row.ataCode ?? "",
            complexity: row.complexity ?? "",
            bookTitle: row.bookTitle ?? "",
            chapter: row.chapter ?? "",
            topic: row.topic ?? "",
            page: row.page ?? "",
            answer1: row.answer1 ?? "",
            answer2: row.answer2 ?? "",
            answer3: row.answer3 ?? "",
            correctAnswer: row.correctAnswer || "",
            reason: row.reason ?? "",
            isActive: !!row.isActive,
        });
        setEditOpen(true);
    };

    const handleAddQuestion = () => {
        setOriginalRow(null);
        setEditForm(EMPTY_QUESTION_FORM);
        setEditOpen(true);
    };

    const normalizeFilters = (next) => {
        if (!next.courseId) {
            return { ...next, courseName: null };
        }

        const match = registeredAta.data?.atas?.find(
            (c) => c.courseId === next.courseId.value
        );

        return {
            ...next,
            courseName: match
                ? { label: match.courseName, value: match.courseName }
                : null,
        };
    };





    return (
        <div className="h-screen flex flex-col ">
            <div className="mx-20 mt-5">
                <div>
                    <FilterSection
                        key={filterKey}
                        label="Generate ATA Groups"
                        onApply={handleAddQuestion}
                        fields={filterFieldsWithOptions}
                        onChange={setFilters}
                    />
                    <div className="flex flex-col flex-1 overflow-hidden">
                        {/* ===== HEADER ROW ===== */}
                        <div className="flex items-center justify-between shrink-0 mt-[1%] ">
                            <div className="flex gap-6 items-center">
                                <button
                                    onClick={() => console.log("Question Bank clicked")}
                                    className="flex items-center gap-2 focus:outline-none hover:opacity-80"
                                >
                                    <img
                                        src={questionBnkIcon}
                                        alt="Question Bank"
                                        className="w-12 h-12"
                                    />
                                    <span className="text-md font-extrabold text-black">
                                        ATA Table
                                    </span>
                                </button>
                            </div>

                            {/* ===== SEARCH (UI ONLY – NO LOGIC CHANGE) ===== */}
                            <div
                                className="
                  flex items-center
                  w-[17%] h-8
                  rounded-xl
                  bg-[#C3BFBF]
                  border border-red-200
                  shadow-sm
                  px-2
                  mt-6
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

                        {/* ===== TABLE ===== */}
                        <div className="flex overflow-hidden mt-2 h-96">
                            <AtaDataTable
                                ref={tableRef}
                                onRowsEditChange={(editedRows) => {
                                    console.log("Edited rows:", editedRows);
                                    // 🔥 Send this to API
                                }}
                                columns={generateAtaGroupColumn}
                                rows={allRows}
                                actionConfig={{ edit: true }}
                                onEditClick={handleEditClick}
                            />
                        </div>
                    </div>


                </div>
            </div>

            <Footer buttons={[
                { label: "Reset", onClick: handleReset },
                { label: "Generate ATA Group", onClick: () => { } },
            ]} />


        </div>
    );
};

export default GenerateAtaGroups;

