import { useEffect, useMemo, useRef, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { parse } from "date-fns";
import toast from "react-hot-toast";

import { DataTableRef } from "../../components/DataTable";
import Footer from "../../components/Footer";
import AtaDataTable from "../../components/AtaDataTable";
import FilterSectionForExam from "../../components/common/FiterSectionForExam";
import AlertModal from "../../components/common/AlertModal/AlertModal";
import Loader from "../../components/common/Loader";

import {
    VALIDATE_QUESTION_PAPER,
} from "../../utils/filterFields";
import { generateAtaGroupColumn } from "../../utils/tableColumns";
import { withRowId } from "../../utils/withRowId";

import {
    generateAtaGroup,
    getAtaForVerification,
} from "../../api/ApiCollection";

import { useAppSelector } from "../../hooks/reduxHooks";
import { useAlert } from "../../hooks/useAlert";

import searchIcon from "../../assets/searchIcon.svg";
import questionBnkIcon from "../../assets/questionBnkIcon.svg";
import { buildFilterFieldsWithOptions } from "../../utils/methods";


const GenerateAtaGroups = () => {
    const tableRef = useRef<DataTableRef>(null);
    const { alert, showAlert, hideAlert } = useAlert();
    const userId = useAppSelector((s) => s.auth.user?.id);

    const [filters, setFilters] = useState<Record<string, any>>({});
    const [getEditedRows, setEditedRows] = useState<any[]>([]);
    const [filterFields, setFilterFields] = useState<any>(VALIDATE_QUESTION_PAPER);
    const [getTableData, setTableData] = useState<any[]>([]);
    const [filterKey, setFilterKey] = useState<number>(0);


    const showError = (message: string) => {
        showAlert({
            title: "Error",
            message: <div className="font-bold">{message}</div>,
            variant: "error",
            showActionButtons: false,
            onClose: hideAlert,
        });
    };


    const getAtaForVerificationQuery: any = useQuery({
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


    const isLoading =
        getAtaForVerificationQuery.isLoading ||
        mutation.isPending;


    const handleReset = () => {
        setFilters({});
        setFilterKey(Math.random());
    };

    const handleSubmit = () => {
    };


    const allRows = useMemo(() => {
        const rows = getTableData ?? [];
        return withRowId(
            rows.map((row: any) => ({
                ...row,
                S1: row.level1Question,
                S2: row.level2Question,
                S3: row.level3Question,
            }))
        );
    }, [getTableData]);

    const handleFields = (v: any) => {
        const courseId = v?.courseId?.value;

        const phase = v?.examPhase?.value;

        const ata = getAtaForVerificationQuery?.data?.atas
            ?.find((e: any) => e.courseId === courseId);

        if (phase && ata) {
            const p = ata.ataPhases?.find((x: any) => x.phase === phase);
            setTableData(p?.ataPhaseDetails ?? []);
            setFilters({ ...v, endDate: parse(p?.examDate, 'dd-MM-yyyy', new Date()) });
        }
        if (!courseId || !ata) return setFilters(v);

        setFilterFields((prev: any[]) =>
            prev.map((f) =>
                f.key === "examPhase"
                    ? {
                        ...f,
                        options: ata.ataPhases?.map((x: any) => ({
                            label: `Phase ${x.phase}`,
                            value: x.phase,
                        })) ?? [],
                    }
                    : f
            )
        );
        setFilters(v);
    };






    useEffect(() => {
        const updatedFields = buildFilterFieldsWithOptions(
            VALIDATE_QUESTION_PAPER,
            getAtaForVerificationQuery?.data?.atas
        );

        setFilterFields(updatedFields);
    }, [getAtaForVerificationQuery?.data?.atas]);






    return (
        <div className="h-screen flex flex-col ">
            <AlertModal {...alert} />
            <Loader visible={isLoading} fullscreen />

            <div className="mx-20 mt-5">
                <div>
                    <FilterSectionForExam
                        filters={filters}
                        setFilters={handleFields}
                        key={filterKey}
                        label="Generate ATA Groups"
                        fields={filterFields}
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
                                rows={allRows || []}
                                actionConfig={{ edit: true }}
                            />
                        </div>
                    </div>
                </div>
            </div>

            <Footer
                buttons={[
                    { label: "Reset", onClick: handleReset },
                    { label: "Generate ATA Group", onClick: handleSubmit },
                ]}
            />
        </div>
    );
};

export default GenerateAtaGroups;
