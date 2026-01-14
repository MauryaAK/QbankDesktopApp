// import { useMemo, useRef, useState } from "react";
// import { useMutation, useQuery } from "@tanstack/react-query";

// import DataTable, { DataTableRef } from "../../components/DataTable";
// import FilterSection from "../../components/common/FilterSection";
// import Footer from "../../components/Footer";

// import { dashboardCandidateColumns, dashboardColumns } from "../../utils/tableColumns";
// import { DASHBOARD_FILTER_FIELDS, DASHBOARD_FILTER_FIELDS_FOR_CANDIDATE } from "../../utils/filterFields";

// import questionBnkIcon from "../../assets/questionBnkIcon.svg";
// import candidateIcon from "../../assets/candidateIcon.svg";
// import searchIcon from "../../assets/searchIcon.svg";

// import { getCandidateList, getQuestionList } from "../../api/ApiCollection";
// import { useAppSelector } from "../../hooks/reduxHooks";
// import { withRowId } from "../../utils/withRowId";
// import { exportExcel } from "../../utils/exporters/exportExcel";
// import { exportPdf } from "../../utils/exporters/exportPdf";
// import Loader from "../../components/common/Loader";

// /* ================= UTILS ================= */

// const getUniqueOptions = (rows: any[], key: string) => {
//   const set = new Set<any>();

//   rows.forEach((row) => {
//     const value = row[key];
//     if (value !== null && value !== undefined && value !== "") {
//       set.add(value);
//     }
//   });

//   return Array.from(set).map((val) => ({
//     label: String(val),
//     value: val,
//   }));
// };

// const applyLocalFilters = (
//   rows: any[],
//   filters: Record<string, any>
// ) => {
//   return rows.filter((row) =>
//     Object.entries(filters).every(([key, filterValue]) => {
//       if (!filterValue) return true;

//       // ✅ Extract actual value from Select option
//       const actualFilterValue =
//         typeof filterValue === "object" && "value" in filterValue
//           ? filterValue.value
//           : filterValue;

//       const rowValue = row[key];

//       return String(rowValue) === String(actualFilterValue);
//     })
//   );
// };


// /* ================= COMPONENT ================= */

// const Dashboard = () => {
//   const tableRef = useRef<DataTableRef>(null);
//   const [filters, setFilters] = useState<Record<string, any>>({});
//   const userId = useAppSelector((s) => s.auth.user?.id);
//   const [filterKey, setFilterKey] = useState<number>(0);

//   /* ===== API CALL ===== */
//   const { isLoading, data } = useQuery({
//     queryKey: ["questionList", userId],
//     queryFn: getQuestionList,
//     enabled: !!userId,
//   });
//   const [pageType, setPageType] = useState<any>("questionBank");

//   const result = useQuery({
//     queryKey: ["candidate", userId],
//     queryFn: getCandidateList,
//     enabled: !!pageType,
//   });
//   const mutation = useMutation({
//     mutationFn: getCandidateList,
//   });


//   const fetchCandidateList = () => {
//     setPageType("candidate")
//     mutation.mutate();
//   };

//   const handleQuestionBankClick = () => {
//     setPageType("questionBank")
//   }

//   const allRows = useMemo(() => {
//     return withRowId(data?.questions ?? []);
//   }, [data?.questions]);

//   const allRowsCandidate = useMemo(() => {
//     return withRowId(result?.data?.candidate ?? []);
//   }, [result?.data]);




//   /* ===== BUILD FILTER OPTIONS FROM DATA ===== */
//   const filterFieldsWithOptions: any = useMemo(() => {
//     if (pageType == "questionBank") {
//       return DASHBOARD_FILTER_FIELDS?.map((field) => ({
//         ...field,
//         options: getUniqueOptions(allRows, field.key),
//       }));
//     }
//     return DASHBOARD_FILTER_FIELDS_FOR_CANDIDATE?.map((field) => ({
//       ...field,
//       options: getUniqueOptions(allRowsCandidate, field.key),
//     }));
//   }, [allRows, pageType]);


//   const filteredRows = useMemo(() => {
//     return applyLocalFilters(allRows, filters);
//   }, [allRows, filters]);

//   const filteredRowsForCandidate = useMemo(() => {
//     return applyLocalFilters(allRowsCandidate, filters);
//   }, [allRowsCandidate, filters]);

//   const handleReset = () => {
//     setFilters({})
//     setFilterKey(Math.random())
//   }

//   const isPageLoading =
//     isLoading || mutation.isPending;

//   return (
//     <div className="h-screen flex flex-col ">
//       <Loader visible={isPageLoading} fullscreen />
//       <div className="mx-20 mt-5">
//         <div>
//           {/* ===== FILTERS ===== */}
//           <FilterSection
//             key={filterKey}
//             fields={filterFieldsWithOptions}
//             onChange={setFilters}
//           />

//           <div className="flex flex-col flex-1 overflow-hidden">
//             {/* ===== HEADER ROW ===== */}
//             <div className="flex items-center justify-between shrink-0 mt-[1%] ">
//               <div className="flex gap-6 items-center">
//                 <button
//                   onClick={handleQuestionBankClick}
//                   className="flex items-center gap-2 focus:outline-none hover:opacity-80"
//                 >
//                   <img
//                     src={questionBnkIcon}
//                     alt="Question Bank"
//                     className="w-12 h-12"
//                   />
//                   <span className="text-md font-extrabold text-black">
//                     Question Bank
//                   </span>
//                 </button>

//                 <button
//                   onClick={fetchCandidateList}
//                   className="flex items-center gap-2 focus:outline-none hover:opacity-80"
//                 >
//                   <img
//                     src={candidateIcon}
//                     alt="Candidate"
//                     className="w-10 h-10"
//                   />
//                   <span className="text-md font-extrabold text-black">
//                     Candidate
//                   </span>
//                 </button>
//               </div>

//               {/* ===== SEARCH (UI ONLY – NO LOGIC CHANGE) ===== */}
//               <div
//                 className="
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
//               >
//                 <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0">
//                   <img
//                     src={searchIcon}
//                     alt="Search"
//                     className="w-8 h-8 mr-16"
//                   />
//                 </div>

//                 <input

//                   placeholder="Search"
//                   className="
//                     flex-1
//                     bg-transparent
//                     px-4
//                     text-sm
//                     placeholder-gray-600
//                     focus:outline-none
//                     focus:ring-0
//                   "
//                   onChange={(e) =>
//                     tableRef.current?.setSearch(
//                       e.target.value
//                     )
//                   }
//                 />
//               </div>
//             </div>

//             {/* ===== TABLE ===== */}
//             <div className="flex overflow-hidden mt-2 h-[360px]">
//               <DataTable
//                 ref={tableRef}
//                 isExpandable
//                 columns={pageType == "questionBank" ? dashboardColumns : dashboardCandidateColumns}
//                 rows={pageType == "questionBank" ? filteredRows : filteredRowsForCandidate}
//                 showExpandedColumn={[1]}
//                 includeActionColumn={false}
//                 renderExpandedRow={(row) => (
//                   <div className="w-full text-sm leading-relaxed break-words whitespace-normal">
//                     {row.question}
//                   </div>
//                 )}
//               />
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* ===== FOOTER ===== */}
//       <Footer

//         exports={[
//           {
//             type: "excel",
//             onClick: async () => {
//               await exportExcel(
//                 dashboardColumns,
//                 filteredRows,
//                 "Question_Bank",
//                 "ajay"
//               );
//             },
//           },
//           {
//             type: "pdf",
//             onClick: async () => {
//               await exportPdf(
//                 dashboardColumns,
//                 filteredRows,
//                 "Question_Bank",
//                 "ajay"
//               );
//             },
//           },
//         ]}

//         buttons={[
//           { label: "Reset", onClick: handleReset },
//         ]}
//       />
//     </div>
//   );
// };

// export default Dashboard;






import { useMemo, useRef, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";

import DataTable, { DataTableRef } from "../../components/DataTable";
import FilterSection from "../../components/common/FilterSection";
import Footer from "../../components/Footer";
import Loader from "../../components/common/Loader";

import {
  dashboardCandidateColumns,
  dashboardColumns,
} from "../../utils/tableColumns";
import {
  DASHBOARD_FILTER_FIELDS,
  DASHBOARD_FILTER_FIELDS_FOR_CANDIDATE,
} from "../../utils/filterFields";

import questionBnkIcon from "../../assets/questionBnkIcon.svg";
import candidateIcon from "../../assets/candidateIcon.svg";
import searchIcon from "../../assets/searchIcon.svg";

import { getCandidateList, getQuestionList } from "../../api/ApiCollection";
import { useAppSelector } from "../../hooks/reduxHooks";
import { withRowId } from "../../utils/withRowId";
import { exportExcel } from "../../utils/exporters/exportExcel";
import { exportPdf } from "../../utils/exporters/exportPdf";

/* ================= TYPES ================= */

type FilterState = Record<string, any>;
type PageType = "questionBank" | "candidate";

/* ================= UTILS ================= */

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
        typeof filterValue === "object" && "value" in filterValue
          ? filterValue.value
          : filterValue;

      return String(row[key]) === String(actualFilterValue);
    })
  );
};

/* ================= COMPONENT ================= */

const Dashboard = () => {
  /* ===== REFS ===== */
  const tableRef = useRef<DataTableRef>(null);

  /* ===== GLOBAL STATE ===== */
  const userId = useAppSelector((s) => s.auth.user?.id);

  /* ===== LOCAL STATE ===== */
  const [filters, setFilters] = useState<FilterState>({});
  const [filterKey, setFilterKey] = useState<number>(0);
  const [pageType, setPageType] = useState<PageType>("questionBank");

  /* ===== API: QUESTION BANK ===== */
  const {
    isLoading: isQuestionLoading,
    data: questionData,
  }: any = useQuery({
    queryKey: ["questionList", userId],
    queryFn: getQuestionList,
    enabled: !!userId,
  });

  /* ===== API: CANDIDATE ===== */
  const candidateQuery: any = useQuery({
    queryKey: ["candidate", userId],
    queryFn: getCandidateList,
    enabled: !!pageType,
  });

  const candidateMutation = useMutation({
    mutationFn: getCandidateList,
  });

  /* ===== HANDLERS ===== */
  const fetchCandidateList = () => {
    setPageType("candidate");
    candidateMutation.mutate();
  };

  const handleQuestionBankClick = () => {
    setPageType("questionBank");
  };

  const handleReset = () => {
    setFilters({});
    setFilterKey(Math.random());
  };

  /* ===== DATA PREPARATION ===== */
  const allRows = useMemo(() => {
    return withRowId(questionData?.questions ?? []);
  }, [questionData?.questions]);

  const allRowsCandidate = useMemo(() => {
    return withRowId(candidateQuery?.data?.candidate ?? []);
  }, [candidateQuery?.data]);

  /* ===== FILTER OPTIONS ===== */
  const filterFieldsWithOptions: any = useMemo(() => {
    if (pageType === "questionBank") {
      return DASHBOARD_FILTER_FIELDS.map((field) => ({
        ...field,
        options: getUniqueOptions(allRows, field.key),
      }));
    }

    return DASHBOARD_FILTER_FIELDS_FOR_CANDIDATE.map((field) => ({
      ...field,
      options: getUniqueOptions(allRowsCandidate, field.key),
    }));
  }, [allRows, allRowsCandidate, pageType]);

  /* ===== FILTERED DATA ===== */
  const filteredRows = useMemo(() => {
    return applyLocalFilters(allRows, filters);
  }, [allRows, filters]);

  const filteredRowsForCandidate = useMemo(() => {
    return applyLocalFilters(allRowsCandidate, filters);
  }, [allRowsCandidate, filters]);

  /* ===== LOADING STATE ===== */
  const isPageLoading =
    isQuestionLoading || candidateMutation.isPending;

  /* ===== RENDER ===== */
  return (
    <div className="h-screen flex flex-col">
      <Loader visible={isPageLoading} fullscreen />

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
              <button
                onClick={handleQuestionBankClick}
                className="flex items-center gap-2 focus:outline-none hover:opacity-80"
              >
                <img
                  src={questionBnkIcon}
                  alt="Question Bank"
                  className="w-12 h-12"
                />
                <span className="text-md font-extrabold text-black">
                  Question Bank
                </span>
              </button>

              <button
                onClick={fetchCandidateList}
                className="flex items-center gap-2 focus:outline-none hover:opacity-80"
              >
                <img
                  src={candidateIcon}
                  alt="Candidate"
                  className="w-10 h-10"
                />
                <span className="text-md font-extrabold text-black">
                  Candidate
                </span>
              </button>
            </div>

            {/* ===== SEARCH ===== */}
            <div className="flex items-center w-[17%] h-8 rounded-xl bg-[#C3BFBF] border border-red-200 shadow-sm px-2 mt-6">
              <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0">
                <img src={searchIcon} alt="Search" className="w-8 h-8 mr-16" />
              </div>

              <input
                placeholder="Search"
                className="flex-1 bg-transparent px-4 text-sm placeholder-gray-600 focus:outline-none"
                onChange={(e) =>
                  tableRef.current?.setSearch(e.target.value)
                }
              />
            </div>
          </div>

          {/* ===== TABLE ===== */}
          <div className="flex overflow-hidden mt-2 h-[360px]">
            <DataTable
              ref={tableRef}
              isExpandable
              columns={
                pageType === "questionBank"
                  ? dashboardColumns
                  : dashboardCandidateColumns
              }
              rows={
                pageType === "questionBank"
                  ? filteredRows
                  : filteredRowsForCandidate
              }
              showExpandedColumn={[1]}
              includeActionColumn={false}
              renderExpandedRow={(row) => (
                <div className="w-full text-sm leading-relaxed break-words whitespace-normal">
                  {row.question}
                </div>
              )}
            />
          </div>
        </div>
      </div>

      {/* ===== FOOTER ===== */}
      <Footer
        exports={[
          {
            type: "excel",
            onClick: async () => {
              await exportExcel(
                dashboardColumns,
                filteredRows,
                "Question_Bank",
                "ajay"
              );
            },
          },
          {
            type: "pdf",
            onClick: async () => {
              await exportPdf(
                dashboardColumns,
                filteredRows,
                "Question_Bank",
                "ajay"
              );
            },
          },
        ]}
        buttons={[{ label: "Reset", onClick: handleReset }]}
      />
    </div>
  );
};

export default Dashboard;
