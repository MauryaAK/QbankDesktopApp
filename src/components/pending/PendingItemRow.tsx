import { ActionButton } from "../common/Buttons";

interface PendingItemRowProps {
  code: string;
  name: string;
  route: string;
  source: string;
  waiting: string;
  onOpen: () => void;
}

const PendingItemRow: React.FC<PendingItemRowProps> = ({
  code,
  name,
  route,
  source,
  waiting,
  onOpen,
}) => {
  return (
    <div className="flex items-center justify-between py-2 border-b border-gray-200/60 last:border-none hover:bg-gray-50 transition-colors">
      <div className="min-w-0">
        <p className="text-[13px] font-semibold text-blue truncate">
          <span className="text-primary">{code}</span>
          <span className="mx-1 text-gray-400">•</span>
          {name}
        </p>

        <p className="text-[11px] text-gray-500 truncate">
          {route}
          <span className="mx-1">•</span>
          {source}
          <span className="mx-1">•</span>
          <span className="font-medium text-orange-600">
            Waiting {waiting}
          </span>
        </p>
      </div>

      <ActionButton size="xs" label="Open" onClick={onOpen} variant="primary" />
    </div>
  );
};

export default PendingItemRow;
