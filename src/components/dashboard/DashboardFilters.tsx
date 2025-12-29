import DateField from "../common/DateField";
import { SelectField } from "../common/SelectField";
import { useState } from "react";
import { ActionButton } from "../common/Buttons";

const airportOptions = [
    { label: "User", value: "User" },
    { label: "Agent", value: "Agent" },
    { label: "User & Agent", value: "User & Agent" },
];

const airports = [
    { label: "IGI", value: "DEL" },
];

interface Props {
    onApply: (filters: any) => void;
}

const DashboardFilters: React.FC<Props> = ({ onApply }) => {
    const [fromDate, setFromDate] = useState<Date | null>(null);
    const [toDate, setToDate] = useState<Date | null>(null);
    const [fromAirport, setFromAirport] = useState<any>(null);
    const [toAirport, setToAirport] = useState<any>(null);
    const [status, setStatus] = useState<any>(null);
    const [search, setSearch] = useState("");

    const handleApply = () => {
        onApply({
            fromDate,
            toDate,
            fromAirport,
            toAirport,
            status,
            search,
        });
    };

    const handleReset = () => {
        setFromDate(null);
        setToDate(null);
        setFromAirport(null);
        setToAirport(null);
        setStatus(null);
        setSearch("");
    };

    return (
        <div className="w-full bg-[#DEF0FE69] rounded-lg px-4 py-3">

            {/* CONTENT WRAPPER */}
            <div className="flex flex-col xl:flex-row xl:items-end xl:justify-between gap-4">

                {/* FILTERS */}
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3">
                    <DateField
                        label="FROM DATE"
                        value={fromDate}
                        onChange={setFromDate}
                    />

                    <DateField
                        label="TO DATE"
                        value={toDate}
                        onChange={setToDate}
                    />

                    <SelectField
                        label="AIRPORT"
                        options={airports}
                        value={fromAirport}
                        onChange={setFromAirport}
                    />

                    <SelectField
                        label="MODE"
                        options={airportOptions}
                        value={toAirport}
                        onChange={setToAirport}
                    />
                </div>

                {/* ACTION BUTTONS */}
                <div className="flex gap-2 w-full xl:w-auto xl:justify-end">
                    <ActionButton
                        variant="primary"
                        label="Apply"
                        size="sm"
                        onClick={handleApply}
                        className="flex-1 xl:flex-none"
                    />
                    <ActionButton
                        label="Reset"
                        size="sm"
                        onClick={handleReset}
                        className="flex-1 xl:flex-none"
                    />
                </div>

            </div>
        </div>
    );


};

export default DashboardFilters;
