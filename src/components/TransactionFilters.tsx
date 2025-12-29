import DateField from "./common/DateField";
import { SelectField } from "./common/SelectField";
import InputField from "./common/InputField";
import { useState } from "react";
import { ActionButton } from "./common/Buttons";

const airportOptions = [
  { label: "DEL", value: "DEL" },
  { label: "BOM", value: "BOM" },
];

const statusOptions = [
  { label: "Completed", value: "completed" },
  { label: "Pending", value: "pending" },
];

interface Props {
  onApply: (filters: any) => void;
}

const TransactionFilters: React.FC<Props> = ({ onApply }) => {
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
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-8 gap-4 items-end">
        <DateField label="FROM DATE" value={fromDate} onChange={setFromDate} />
        <DateField label="TO DATE" value={toDate} onChange={setToDate} />

        <SelectField
          label="FROM AIRPORT"
          options={airportOptions}
          value={fromAirport}
          onChange={setFromAirport}
        />

        <SelectField
          label="TO AIRPORT"
          options={airportOptions}
          value={toAirport}
          onChange={setToAirport}
        />

        <SelectField
          label="STATUS"
          options={statusOptions}
          value={status}
          onChange={setStatus}
        />

        <InputField
          label="SEARCH"
          placeholder="PNR / Passenger"
          value={search}
          onChange={setSearch}
        />

        <div className="flex gap-2 justify-end xl:col-span-2">
          <ActionButton variant="primary" label="Apply" size="sm" onClick={handleApply} />
          <ActionButton label="Reset" size="sm" onClick={handleReset} />
        </div>
      </div>
    </div>
  );
};

export default TransactionFilters;
