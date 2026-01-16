import { useState } from "react";
import DataTable from "../../components/DataTable";
import FilterSection from "../../components/common/FilterSection";
import Footer from "../../components/Footer";
import { DASHBOARD_FILTER_FIELDS } from "../../utils/filterFields";
import { dashboardColumns } from "../../utils/tableColumns";

const ActivityLog = () => {
    const [visibleRows, setVisibleRows] = useState(5);


    const handleFiltersChange = (filters: Record<string, any>) => {
        console.log("Filters:", filters);
    };

    return (
        <div className="h-screen flex flex-col">
            <div className="flex-1 mx-20">
                <div className=" ">
                    <FilterSection
                        fields={[]}
                        onChange={handleFiltersChange}
                    />
                    <div className="flex flex-col flex-1 overflow-hidden">
                        <div className="flex items-center justify-between shrink-0 mt-10">
                            <div className="flex gap-6">
                                {/* <div>sdklf</div>
                                <div>sdklf</div> */}
                            </div>

                            <input
                                placeholder="Search"
                                className=" w-52 mr-2 mt-3 px-2 py-1 text-sm border-none bg-transparent focus:border-none focus:outline-none focus:ring-0 focus:bg-transparent"
                            />
                        </div>
                        <div className="flex overflow-hidden mt-0 h-96">
                            <DataTable
                                columns={dashboardColumns}
                                rows={[]}
                                includeActionColumn={false}
                                visibleRows={visibleRows}
                            />
                        </div>

                    </div>
                </div>
            </div>
            <Footer
                exports={[
                    { type: "excel", onClick: () => console.log("Excel export") },
                    { type: "pdf", onClick: () => console.log("PDF export") },
                ]}
                actions={[
                    { type: "approve", label: "APPROVE", onClick: () => console.log("Approved") },
                    { type: "disapprove", label: "DISAPPROVE", onClick: () => console.log("Rejected") },
                    { type: "clear", label: "CLEAR", onClick: () => console.log("Cleared") },
                ]}
                buttons={[
                    { label: "Reset", onClick: () => console.log("Reset") },
                    { label: "Submit", onClick: () => console.log("Submit") },

                ]}
            />

        </div>
    );
};

export default ActivityLog;

