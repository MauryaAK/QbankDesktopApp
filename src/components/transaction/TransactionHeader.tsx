import { PillButton, StatusPill } from "../common/Buttons";

const TransactionHeader = () => {
  return (
    <div className="flex justify-between items-start">
      <div>
        <h2 className="font-semibold text-base text-gray-900">
          RDTK5Y <span className="text-gray-500">•</span> Punnet Pant
        </h2>

        <p className="text-base font-bold text-orange mt-0.5 font-quicksand">
          DEL → SIN <span className="text-gray-500">•</span> 16 Dec 2025 <span className="text-gray-500">•</span> Flight 6E 101
        </p>

        <p className="text-xs text-primary">
          Transaction ID: TXN-240015 <span className="text-gray-500">•</span> Mode: User (Home link)
        </p>
      </div>

      <div className="text-right space-y-1">
        <div>
          <PillButton label="OK to travel" size="xs" />
        </div>

        <div className="flex flex-row justify-center align-middle gap-2 mt-2">
          <p className="text-[11px] text-gray-500 mt-1">TXN STATUS</p>
          <StatusPill size="xs" label="Success" />
        </div>
      </div>
    </div>
  );
};

export default TransactionHeader;
