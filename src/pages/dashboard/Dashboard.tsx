// import { useState } from "react";
// import DataTable from "../../components/DataTable";
// import { testData } from "../../pages/ProductTestData";
// import FilterSection from "../../components/common/FilterSection";
// import Footer from "../../components/Footer";
// import { DASHBOARD_FILTER_FIELDS } from "../../utils/filterFields";
// import { dashboardColumns } from "../../utils/tableColumns";
// import questionBnkIcon from '../../assets/questionBnkIcon.svg';
// import candidateIcon from '../../assets/candidateIcon.svg';
// import searchIcon from '../../assets/searchIcon.svg'
// import { useQuery } from "@tanstack/react-query";
// import { getQuestionList } from "../../api/ApiCollection";
// import { useAppSelector } from "../../hooks/reduxHooks";
// const Dashboard = () => {

//   const [visibleRows, setVisibleRows] = useState(5);
//   const userId = useAppSelector(s => s.auth.user?.id);
//   const questionList = useQuery({
//     queryKey: ['questionList', userId],
//     queryFn: getQuestionList,
//     enabled: !!userId, // prevents unwanted calls
//   });
//   console.log("questionList===_->", questionList?.data?.questions);

//   const handleFiltersChange = (filters: Record<string, any>) => {
//     console.log("Filters:", filters);
//   };

//   return (
//     <div className="h-screen flex flex-col">
//       <div className="flex-1 mx-20">
//         <div className=" ">
//           <FilterSection
//             fields={DASHBOARD_FILTER_FIELDS}
//             onChange={handleFiltersChange}
//           />
//           <div className="flex flex-col flex-1 overflow-hidden">
//             <div className="flex items-center justify-between shrink-0 mt-5">
//               <div className="flex gap-6 items-center">
//                 <button
//                   onClick={() => console.log("Question Bank clicked")}
//                   className="flex items-center gap-2 focus:outline-none hover:opacity-80"
//                 >
//                   <img src={questionBnkIcon} alt="Question Bank" className="w-12 h-12" />
//                   <span className="text-md font-extrabold text-black">
//                     Question Bank
//                   </span>
//                 </button>

//                 <button
//                   onClick={() => console.log("Candidate clicked")}
//                   className="flex items-center gap-2 focus:outline-none hover:opacity-80"
//                 >
//                   <img src={candidateIcon} alt="Candidate" className="w-10 h-10" />
//                   <span className="text-md font-extrabold text-black">
//                     Candidate
//                   </span>
//                 </button>
//               </div>


//               <div
//                 className="
//     flex items-center
//     w-[220px] h-8
//     rounded-xl
//     bg-[#C3BFBF]
//     border border-red-200
//     shadow-sm
//     px-2
//     mt-6
//     mr-1
//   "
//               >
//                 <div
//                   className="
//       w-8 h-8
//       rounded-full
//       flex items-center justify-center
//       shrink-0
//     "
//                 >
//                   <img src={searchIcon} alt="Search" className="w-8 h-8 mr-16" />
//                 </div>

//                 {/* Input */}
//                 <input
//                   placeholder="Search"
//                   className="
//       flex-1
//       bg-transparent
//       px-4
//       text-sm
//       placeholder-gray-600
//       focus:outline-none
//       focus:ring-0
//     "
//                 />


//               </div>

//             </div>
//             <div className="flex overflow-hidden mt-0 h-96">
//               <DataTable
//                 slug="question-bank"
//                 isExpandable={true}
//                 columns={dashboardColumns}
//                 rows={questionList?.data?.questions || []}
//                 showExpandedColumn={[1]}
//                 includeActionColumn={false}
//                 visibleRows={visibleRows}
//                 renderExpandedRow={(row) => (
//                   <div className="w-full text-sm leading-relaxed break-words whitespace-normal">
//                     <div>{row.question}</div>
//                   </div>

//                 )}
//               />

//             </div>

//           </div>
//         </div>
//       </div>
//       <Footer
//         exports={[
//           { type: "excel", onClick: () => console.log("Excel export") },
//           { type: "pdf", onClick: () => console.log("PDF export") },
//         ]}
//         actions={[
//           { type: "approve", label: "APPROVE", onClick: () => console.log("Approved") },
//           { type: "disapprove", label: "DISAPPROVE", onClick: () => console.log("Rejected") },
//           { type: "clear", label: "CLEAR", onClick: () => console.log("Cleared") },
//         ]}
//         buttons={[
//           { label: "Reset", onClick: () => console.log("Reset") },
//           { label: "Submit", onClick: () => console.log("Submit") },

//         ]}
//       />

//     </div>
//   );
// };

// export default Dashboard;















import { useMemo, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";

import DataTable from "../../components/DataTable";
import FilterSection from "../../components/common/FilterSection";
import Footer from "../../components/Footer";

import { dashboardColumns } from "../../utils/tableColumns";
import { DASHBOARD_FILTER_FIELDS } from "../../utils/filterFields";

import questionBnkIcon from "../../assets/questionBnkIcon.svg";
import candidateIcon from "../../assets/candidateIcon.svg";
import searchIcon from "../../assets/searchIcon.svg";

import { getCandidateList, getQuestionList } from "../../api/ApiCollection";
import { useAppSelector } from "../../hooks/reduxHooks";

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
  filters: Record<string, any>
) => {
  return rows.filter((row) =>
    Object.entries(filters).every(([key, filterValue]) => {
      if (!filterValue) return true;

      // ✅ Extract actual value from Select option
      const actualFilterValue =
        typeof filterValue === "object" && "value" in filterValue
          ? filterValue.value
          : filterValue;

      const rowValue = row[key];

      return String(rowValue) === String(actualFilterValue);
    })
  );
};


/* ================= COMPONENT ================= */

const Dashboard = () => {
  const [visibleRows, setVisibleRows] = useState(5);
  const [filters, setFilters] = useState<Record<string, any>>({});
  console.log("filters", filters);

  const userId = useAppSelector((s) => s.auth.user?.id);

  /* ===== API CALL ===== */
  const questionList = useQuery({
    queryKey: ["questionList", userId],
    queryFn: getQuestionList,
    enabled: !!userId,
  });

  const mutation = useMutation({
    mutationFn: getCandidateList,
  });

  const fetchCandidateList = () => {
    mutation.mutate();
  };
  const allRows = questionList?.data?.questions || [];

  /* ===== BUILD FILTER OPTIONS FROM DATA ===== */
  const filterFieldsWithOptions = useMemo(() => {
    return DASHBOARD_FILTER_FIELDS.map((field) => ({
      ...field,
      type: "select", // force all as select
      options: getUniqueOptions(allRows, field.key),
    }));
  }, [allRows]);

  /* ===== APPLY LOCAL FILTERING ===== */
  const filteredRows = useMemo(() => {
    return applyLocalFilters(allRows, filters);
  }, [allRows, filters]);

  return (
    <div className="h-screen flex flex-col">
      <div className="flex-1 mx-20">
        <div>
          {/* ===== FILTERS ===== */}
          <FilterSection
            fields={filterFieldsWithOptions}
            onChange={setFilters}
          />

          <div className="flex flex-col flex-1 overflow-hidden">
            {/* ===== HEADER ROW ===== */}
            <div className="flex items-center justify-between shrink-0 mt-5">
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

              {/* ===== SEARCH (UI ONLY – NO LOGIC CHANGE) ===== */}
              <div
                className="
                  flex items-center
                  w-[220px] h-8
                  rounded-xl
                  bg-[#C3BFBF]
                  border border-red-200
                  shadow-sm
                  px-2
                  mt-6
                  mr-1
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
                />
              </div>
            </div>

            {/* ===== TABLE ===== */}
            <div className="flex overflow-hidden mt-0 h-96">
              <DataTable
                slug="question-bank"
                isExpandable
                columns={dashboardColumns}
                rows={filteredRows}
                showExpandedColumn={[1]}
                includeActionColumn={false}
                visibleRows={visibleRows}
                renderExpandedRow={(row) => (
                  <div className="w-full text-sm leading-relaxed break-words whitespace-normal">
                    {row.question}
                  </div>
                )}
              />
            </div>
          </div>
        </div>
      </div>

      {/* ===== FOOTER ===== */}
      <Footer
        exports={[
          { type: "excel", onClick: () => console.log("Excel export") },
          { type: "pdf", onClick: () => console.log("PDF export") },
        ]}
        actions={[
          {
            type: "approve",
            label: "APPROVE",
            onClick: () => console.log("Approved"),
          },
          {
            type: "disapprove",
            label: "DISAPPROVE",
            onClick: () => console.log("Rejected"),
          },
          {
            type: "clear",
            label: "CLEAR",
            onClick: () => console.log("Cleared"),
          },
        ]}
        buttons={[
          { label: "Reset", onClick: () => console.log("Reset") },
          { label: "Submit", onClick: () => console.log("Submit") },
        ]}
      />
    </div>
  );
};

export default Dashboard;
