// import { useMemo, useRef, useState } from "react";
// import { useMutation, useQuery } from "@tanstack/react-query";

// import { DataTableRef } from "../../components/DataTable";
// import Footer from "../../components/Footer";

// import { GENERATE_ATA_GROUP, trainingTypeOptions } from "../../utils/filterFields";
// import { generateAtaGroupColumn } from "../../utils/tableColumns";

// import searchIcon from "../../assets/searchIcon.svg";
// import questionBnkIcon from "../../assets/questionBnkIcon.svg";

// import {
//     generateAtaGroup,
//     GetAircraftAta,
//     getAircraftType,
//     getRegisteredAta,
// } from "../../api/ApiCollection";

// import { useAppSelector } from "../../hooks/reduxHooks";
// import { withRowId } from "../../utils/withRowId";

// import AtaDataTable from "../../components/AtaDataTable";
// import FilterSectionForExam from "../../components/common/FiterSectionForExam";
// import { addDays, isSameDay, parse } from "date-fns";
// import { useAlert } from "../../hooks/useAlert";
// import AlertModal from "../../components/common/AlertModal/AlertModal";
// import { buildAtaPhasePayload } from "../../utils/permissions/buildPayloads";
// import toast from "react-hot-toast";
// import { validateRequiredFields } from "../../utils/filterUtils";
// import Loader from "../../components/common/Loader";

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


// const GenerateAtaGroups = () => {
//     const tableRef = useRef<DataTableRef>(null);
//     const { alert, showAlert, hideAlert } = useAlert();
//     const userId = useAppSelector((s) => s.auth.user?.id);

//     const showError = (message: string) => {
//         showAlert({
//             title: "Error",
//             message: <div className="font-bold">{message}</div>,
//             variant: "error",
//             showActionButtons: false,
//             onClose: hideAlert,
//         });
//     };
//     const [getEditedRows, setEditedRows] = useState([])

//     const [filters, setFilters] = useState<Record<string, any>>({
//         trainingStartDate: new Date(),
//         trainingEndDate: addDays(new Date(), 1),
//         examDate: new Date
//     });
//     const validator = () => {
//         const fieldError = validateRequiredFields({
//             fields: GENERATE_ATA_GROUP,
//             values: filters,
//         });

//         if (fieldError) {
//             showError(fieldError);
//             return false;
//         }

//         if (getEditedRows.length === 0) {
//             showError("Enter ETA Details");
//             return false;
//         }

//         return true;
//     };


//     const minMax = useMemo(() => ({ min: filters.trainingStartDate, max: filters?.trainingEndDate }), [filters.trainingStartDate, filters?.trainingEndDate])

//     const [getPhaseValues, setPhaseValues] = useState([])
//     const [getCurrentRegisterAta, setCurrentRegisterAta] = useState<any>({})


//     /* ================= API ================= */
//     const selectedAircraftType = useMemo(() => filters?.aircraftType?.value ?? "", [filters?.aircraftType?.value])

//     const questionQuery: any = useQuery({
//         queryKey: ["selectedAircraftType", selectedAircraftType],
//         queryFn: GetAircraftAta,
//         enabled: !!selectedAircraftType,
//     });

//     const aircraftQuery: any = useQuery({
//         queryKey: ["aircraftMaster", userId],
//         queryFn: getAircraftType,
//         enabled: !!userId,
//     });
//     const registeredAta: any = useQuery({
//         queryKey: ["registeredAtaMaster", userId],
//         queryFn: getRegisteredAta,
//         enabled: !!userId,
//     });
//     const [filterKey, setFilterKey] = useState<number>(0);

//     const payload = useMemo(() => {
//         if (!getCurrentRegisterAta || !filters?.examPhase?.value) return null;
//         return buildAtaPhasePayload({
//             registerAta: getCurrentRegisterAta,
//             editedRows: getEditedRows,
//             examPhase: filters.examPhase.value,
//             endDate: filters.examDate,
//             userId,
//         });
//     }, [filters, getCurrentRegisterAta, getEditedRows, userId]);

//     const handleReset = () => {
//         setFilters({})
//         setFilterKey(Math.random())
//     }

//     const mutation = useMutation({
//         mutationFn: generateAtaGroup,
//         onSuccess: (result: any) => {
//             if (result?.isError) {
//                 showError(result?.errorMessage)
//             } else {
//                 toast.success("ATA Generated Successfully")
//             }
//         },
//     });

//     const handleSubmit = () => {
//         const isValid = validator();
//         if (isValid) {
//             mutation.mutate(payload);
//         }

//     };

//     /* ================= TABLE ROWS ================= */

//     const allRows = useMemo(() => {
//         const rows = questionQuery?.data?.ataMasters ?? [];
//         return withRowId(
//             rows.map((row: any) => ({
//                 ...row,
//                 avaiableQuestion1: row.avaiableQuestion1 ?? 0,
//                 avaiableQuestion2: row.avaiableQuestion2 ?? 0,
//                 avaiableQuestion3: row.avaiableQuestion3 ?? 0,
//                 complexity: 0,
//                 duration: 0,
//                 S1: 0,
//                 S2: 0,
//                 S3: 0,
//             }))
//         );
//     }, [questionQuery?.data?.ataMasters]);




//     const optionMaps = useMemo(() => {
//         const aircraftMasters = aircraftQuery.data?.aircraftTypes ?? [];
//         const registeredAtas = registeredAta.data?.atas ?? []
//         const corucetIdOptions = registeredAtas.map((a: any) => ({
//             label: a.courseName,
//             value: a.courseId,
//         }));
//         const corucetNameOptions = registeredAtas.map((a: any) => ({
//             label: a.courseId,
//             value: a.courseName,
//         }));

//         const aircraftOptions = aircraftMasters
//             .filter((a: any) => a.isActive)
//             .map((a: any) => ({
//                 label: a.aircraftType,
//                 value: a.aircraftType,
//             }));


//         return {
//             aircraftType: aircraftOptions,
//             courseId: corucetIdOptions,
//             courseName: corucetNameOptions,
//             trainingType: trainingTypeOptions,
//             examPhase: getPhaseValues
//         };
//     }, [aircraftQuery.data, registeredAta.data, getPhaseValues, trainingTypeOptions]);

//     /* ================= FILTER FIELDS ================= */

//     const filterFieldsWithOptions: any = useMemo(() => {
//         return GENERATE_ATA_GROUP.map((field) => ({
//             ...field,
//             options:
//                 optionMaps[field.key] ??
//                 getUniqueOptions(allRows, field.key),
//         }));
//     }, [allRows, optionMaps]);

//     const handleFields = (values) => {
//         if (
//             values?.trainingType &&
//             values?.aircraftType
//         ) {
//             const a = registeredAta.data?.atas?.find((e) => {
//                 const startDate = parse(e.startDate, "dd-MM-yyyy", new Date());
//                 const endDate = parse(e.endDate, "dd-MM-yyyy", new Date());

//                 return (
//                     isSameDay(startDate, values.trainingStartDate) &&
//                     isSameDay(endDate, values.trainingEndDate)
//                 );
//             });

//             if (a) {
//                 const corucetIdOptions = {
//                     label: a.courseName,
//                     value: a.courseId,
//                 };

//                 const corucetNameOptions = {
//                     label: a.courseId,
//                     value: a.courseName,
//                 };

//                 const phaseValues = a.ataPhases.map((e) => ({
//                     label: `Phase ${e.phase}`,
//                     value: e.phase,
//                 }));
//                 setCurrentRegisterAta(a)
//                 setPhaseValues(phaseValues);

//                 setFilters({
//                     ...values,
//                     courseId: corucetIdOptions,
//                     courseName: corucetNameOptions,
//                 });
//                 return;
//             }
//         }
//         if (values?.courseName) {
//             const { courseName, courseId, ...rest } = values;
//             setFilters(rest);
//             return
//         }
//         setFilters(values);
//     };
//     const isLoading =
//         questionQuery.isLoading ||
//         aircraftQuery.isLoading ||
//         registeredAta.isLoading ||
//         mutation.isPending;

//     return (
//         <div className="h-screen flex flex-col ">
//             <AlertModal {...alert} />
//             <Loader visible={isLoading} fullscreen />
//             <div className="mx-20 mt-5">
//                 <div>
//                     <FilterSectionForExam
//                         minMaxDate={minMax}
//                         filters={filters}
//                         setFilters={handleFields}
//                         key={filterKey}
//                         label="Generate ATA Groups"
//                         fields={filterFieldsWithOptions}
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
//                                         ATA Table
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
//                             <AtaDataTable
//                                 ref={tableRef}
//                                 onRowsEditChange={setEditedRows}
//                                 columns={generateAtaGroupColumn}
//                                 rows={allRows}
//                                 actionConfig={{ edit: true }}
//                             />

//                         </div>

//                     </div>


//                 </div>
//             </div>

//             <Footer buttons={[
//                 { label: "Reset", onClick: handleReset },
//                 { label: "Generate ATA Group", onClick: handleSubmit },
//             ]} />


//         </div>
//     );
// };

// export default GenerateAtaGroups;







import { useMemo, useRef, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { addDays, isSameDay, parse } from "date-fns";
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
} from "../../utils/filterFields";
import { generateAtaGroupColumn } from "../../utils/tableColumns";
import { buildAtaPhasePayload } from "../../utils/permissions/buildPayloads";
import { validateRequiredFields } from "../../utils/filterUtils";
import { withRowId } from "../../utils/withRowId";

import {
    generateAtaGroup,
    GetAircraftAta,
    getAircraftType,
    getRegisteredAta,
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

const GenerateAtaGroups = () => {
    /* ================= REFS ================= */
    const tableRef = useRef<DataTableRef>(null);

    /* ================= GLOBAL ================= */
    const { alert, showAlert, hideAlert } = useAlert();
    const userId = useAppSelector((s) => s.auth.user?.id);

    /* ================= STATE (ON TOP) ================= */
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

    const minMax = useMemo(
        () => ({
            min: filters.trainingStartDate,
            max: filters.trainingEndDate,
        }),
        [filters.trainingStartDate, filters.trainingEndDate]
    );

    const selectedAircraftType = useMemo(
        () => filters?.aircraftType?.value ?? "",
        [filters?.aircraftType?.value]
    );

    /* ================= API ================= */

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
        questionQuery.isLoading ||
        aircraftQuery.isLoading ||
        registeredAta.isLoading ||
        mutation.isPending;

    /* ================= PAYLOAD ================= */

    const payload = useMemo(() => {
        if (!getCurrentRegisterAta || !filters?.examPhase?.value) return null;

        return buildAtaPhasePayload({
            editedRows: getEditedRows,
            filteredData: filters,
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
        if (values.trainingStartDate && values.trainingEndDate) {
            const a = registeredAta.data?.atas?.find((e: any) => {
                const startDate = parse(e.startDate, "dd-MM-yyyy", new Date());
                const endDate = parse(e.endDate, "dd-MM-yyyy", new Date());

                return (
                    isSameDay(startDate, values.trainingStartDate) &&
                    isSameDay(endDate, values.trainingEndDate)
                );
            });

            if (a) {
                setCurrentRegisterAta(a);
                setPhaseValues(
                    a.ataPhases.map((e: any) => ({
                        label: `Phase ${e.phase}`,
                        value: e.phase,
                    }))
                );

                setFilters({
                    ...values,
                    courseId: { label: a.courseName, value: a.courseId },
                    courseName: { label: a.courseId, value: a.courseName },
                });
                return;
            }
        }
        setFilters(values);
    };

    /* ================= TABLE ================= */

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

    const optionMaps = useMemo(() => {
        const aircraftMasters = aircraftQuery.data?.aircraftTypes ?? [];
        const registeredAtas = registeredAta.data?.atas ?? [];

        return {
            aircraftType: aircraftMasters
                .filter((a: any) => a.isActive)
                .map((a: any) => ({
                    label: a.aircraftType,
                    value: a.aircraftType,
                })),
            // courseId: registeredAtas.map((a: any) => ({
            //     label: a.courseName,
            //     value: a.courseId,
            // })),
            // courseName: registeredAtas.map((a: any) => ({
            //     label: a.courseId,
            //     value: a.courseName,
            // })),
            trainingType: trainingTypeOptions,
            examPhase: getPhaseValues,
        };
    }, [aircraftQuery.data, registeredAta.data, getPhaseValues]);

    const filterFieldsWithOptions: any = useMemo(() => {
        return GENERATE_ATA_GROUP.map((field) => ({
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
                        label="Generate ATA Groups"
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
                    { label: "Generate ATA Group", onClick: handleSubmit },
                ]}
            />
        </div>
    );
};

export default GenerateAtaGroups;
