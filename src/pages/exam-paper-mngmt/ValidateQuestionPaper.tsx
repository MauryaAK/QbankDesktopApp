

import { useMemo, useRef, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { addDays } from "date-fns";
import toast from "react-hot-toast";

import { DataTableRef } from "../../components/DataTable";
import Footer from "../../components/Footer";
import AtaDataTable from "../../components/AtaDataTable";
import FilterSectionForExam from "../../components/common/FiterSectionForExam";
import AlertModal from "../../components/common/AlertModal/AlertModal";
import Loader from "../../components/common/Loader";

import {
    GENERATE_ATA_GROUP,
    trainingTypeOptions,
    VALIDATE_QUESTION_PAPER,
} from "../../utils/filterFields";
import { generateAtaGroupColumn } from "../../utils/tableColumns";
import { buildAtaPhasePayload } from "../../utils/permissions/buildPayloads";
import { validateRequiredFields } from "../../utils/filterUtils";
import { withRowId } from "../../utils/withRowId";

import {
    generateAtaGroup,
    getAtaForVerification,
} from "../../api/ApiCollection";

import { useAppSelector } from "../../hooks/reduxHooks";
import { useAlert } from "../../hooks/useAlert";

import searchIcon from "../../assets/searchIcon.svg";
import questionBnkIcon from "../../assets/questionBnkIcon.svg";

/* ================= HELPERS ================= */

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

const ValidateQuestionPaper = () => {
    const tableRef = useRef<DataTableRef>(null);

    const { alert, showAlert, hideAlert } = useAlert();
    const userId = useAppSelector((s) => s.auth.user?.id);

    const [filters, setFilters] = useState<Record<string, any>>({
        trainingStartDate: new Date(),
        trainingEndDate: addDays(new Date(), 1),
        examDate: new Date(),
    });

    const [getEditedRows, setEditedRows] = useState<any[]>([]);
    const [getPhaseValues, setPhaseValues] = useState<any[]>([]);
    const [getCurrentRegisterAta, setCurrentRegisterAta] = useState<any>({});
    const [filterKey, setFilterKey] = useState<number>(0);

    /* ================= ERROR ================= */

    const showError = (message: string) => {
        showAlert({
            title: "Error",
            message: <div className="font-bold">{message}</div>,
            variant: "error",
            showActionButtons: false,
            onClose: hideAlert,
        });
    };

    /* ================= VALIDATION ================= */

    const validator = () => {
        const fieldError = validateRequiredFields({
            fields: GENERATE_ATA_GROUP,
            values: filters,
        });

        if (fieldError) {
            showError(fieldError);
            return false;
        }

        if (getEditedRows.length === 0) {
            showError("Enter ETA Details");
            return false;
        }

        return true;
    };

    /* ================= MEMO ================= */

    const minMax = useMemo(() => ({ min: addDays(new Date(), -120), max: addDays(new Date(), 120), }), []);


    /* ================= API ================= */

    const qetAtaForVerificationQuery: any = useQuery({
        queryKey: ["getAtaForVerification", userId],
        queryFn: getAtaForVerification,
        enabled: !!userId,
    });



    const mutation = useMutation({
        mutationFn: generateAtaGroup,
        onSuccess: (result: any) => {
            if (result?.isError) {
                showError(result?.errorMessage);
            } else {
                toast.success("ATA Generated Successfully");
            }
        },
    });

    /* ================= LOADER (ONLY API CALLS) ================= */

    const isLoading =
        qetAtaForVerificationQuery.isLoading ||
        mutation.isPending;

    /* ================= PAYLOAD ================= */

    const payload = useMemo(() => {
        if (!getCurrentRegisterAta || !filters?.examPhase?.value) return null;

        return buildAtaPhasePayload({
            registerAta: getCurrentRegisterAta,
            editedRows: getEditedRows,
            examPhase: filters.examPhase.value,
            endDate: filters.examDate,
            userId,
        });
    }, [filters, getCurrentRegisterAta, getEditedRows, userId]);

    /* ================= HANDLERS ================= */

    const handleReset = () => {
        setFilters({});
        setFilterKey(Math.random());
    };

    const handleSubmit = () => {
        if (validator()) {
            mutation.mutate(payload);
        }
    };

    const handleFields = (values: any) => {
        setFilters(values);
    };

    /* ================= TABLE ================= */

    const allRows = useMemo(() => {
        const rows = qetAtaForVerificationQuery?.data?.atas ?? [];
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
    }, [qetAtaForVerificationQuery?.data?.atas]);

    const optionMaps = useMemo(() => {
        return {
            trainingType: trainingTypeOptions,
            examPhase: getPhaseValues,
        };
    }, [getPhaseValues]);

    const filterFieldsWithOptions: any = useMemo(() => {
        return VALIDATE_QUESTION_PAPER.map((field) => ({
            ...field,
            options:
                optionMaps[field.key] ??
                getUniqueOptions(allRows, field.key),
        }));

    }, [allRows, optionMaps]);

    return (
        <div className="h-screen flex flex-col ">
            <AlertModal {...alert} />
            <Loader visible={isLoading} fullscreen />

            <div className="mx-20 mt-5">
                <div>
                    <FilterSectionForExam
                        minMaxDate={minMax}
                        filters={filters}
                        setFilters={handleFields}
                        key={filterKey}
                        label="Question Paper Validation Form"
                        fields={filterFieldsWithOptions}
                    />

                    <div className="flex flex-col flex-1 overflow-hidden">
                        <div className="flex items-center justify-between shrink-0 mt-[1%] ">
                            <div className="flex gap-6 items-center">
                                <button className="flex items-center gap-2 focus:outline-none hover:opacity-80">
                                    <img src={questionBnkIcon} className="w-12 h-12" />
                                    <span className="text-md font-extrabold text-black">
                                        ATA Table
                                    </span>
                                </button>
                            </div>

                            <div className="flex items-center w-[17%] h-8 rounded-xl bg-[#C3BFBF] border border-red-200 shadow-sm px-2 mt-6 mr-0">
                                <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0">
                                    <img src={searchIcon} className="w-8 h-8 mr-16" />
                                </div>

                                <input
                                    placeholder="Search"
                                    className="flex-1 bg-transparent px-4 text-sm placeholder-gray-600 focus:outline-none focus:ring-0"
                                    onChange={(e) =>
                                        tableRef.current?.setSearch(e.target.value)
                                    }
                                />
                            </div>
                        </div>

                        <div className="flex overflow-hidden mt-2 h-96">
                            <AtaDataTable
                                ref={tableRef}
                                onRowsEditChange={setEditedRows}
                                columns={generateAtaGroupColumn}
                                rows={allRows}
                                actionConfig={{ edit: true }}
                            />
                        </div>
                    </div>
                </div>
            </div>

            <Footer
                buttons={[
                    { label: "Reset", onClick: handleReset },
                    { label: "Validate", onClick: handleSubmit },
                ]}
            />
        </div>
    );
};

export default ValidateQuestionPaper;

