import { ActionButton } from "../common/Buttons";

interface LocationRowProps {
  code: string;
  name: string;
  airlines: number;
  agents: number;
}

const LocationRow: React.FC<LocationRowProps> = ({
  code,
  name,
  airlines,
  agents,
}) => {
  return (
    <div className="flex items-center justify-between py-2 border-b border-gray-200/60 last:border-none hover:bg-gray-50 transition-colors">
      <div className="min-w-0">
        <p className="text-[13px] font-semibold text-blue truncate">
          <span className="text-primary">{code}</span>
          <span className="mx-1 text-gray-400">–</span>
          {name}
        </p>

        <p className="text-[11px] text-gray-500 truncate">
          <span>Airlines: {airlines}</span>
          <span className="mx-1">•</span>
          <span>Agents: {agents}</span>
        </p>
      </div>

      <ActionButton size="xs" label="Edit" variant="primary"/>
    </div>
  );
};

export default LocationRow;
