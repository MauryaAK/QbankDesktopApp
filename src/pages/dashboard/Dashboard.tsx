import { useMemo, useRef, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";

import DataTable, { DataTableRef } from "../../components/DataTable";
import FilterSection from "../../components/common/FilterSection";
import Footer from "../../components/Footer";

import { dashboardColumns } from "../../utils/tableColumns";
import { DASHBOARD_FILTER_FIELDS } from "../../utils/filterFields";

import questionBnkIcon from "../../assets/questionBnkIcon.svg";
import candidateIcon from "../../assets/candidateIcon.svg";
import searchIcon from "../../assets/searchIcon.svg";

import { getCandidateList, getQuestionList } from "../../api/ApiCollection";
import { useAppSelector } from "../../hooks/reduxHooks";
import { withRowId } from "../../utils/withRowId";
import { exportExcel } from "../../utils/exporters/exportExcel";
import { exportPdf } from "../../utils/exporters/exportPdf";

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
  const tableRef = useRef<DataTableRef>(null);
  const [filters, setFilters] = useState<Record<string, any>>({});
  console.log("filters", filters);

  const userId = useAppSelector((s) => s.auth.user?.id);

  /* ===== API CALL ===== */
  const questionList: any = useQuery({
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
  const allRows = useMemo(() => {
    return withRowId(questionList?.data?.questions ?? []);
  }, [questionList?.data?.questions]);


  /* ===== BUILD FILTER OPTIONS FROM DATA ===== */
  const filterFieldsWithOptions: any = useMemo(() => {
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
      <div className="flex-1 mx-10 mt-9">
        <div>
          {/* ===== FILTERS ===== */}
          <FilterSection
            fields={filterFieldsWithOptions}
            onChange={setFilters}
          />

          <div className="flex flex-col flex-1 overflow-hidden">
            {/* ===== HEADER ROW ===== */}
            <div className="flex items-center justify-between shrink-0 mt-[3%]">
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

            {/* ===== TABLE ===== */}
            <div className="flex overflow-hidden mt-0 h-96">
              <DataTable
                ref={tableRef}
                isExpandable
                columns={dashboardColumns}
                rows={filteredRows}
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
