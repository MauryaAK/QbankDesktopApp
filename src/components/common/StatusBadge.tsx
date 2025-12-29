interface StatusBadgeProps {
  label?: string;   // old usage
  status?: string;  // new usage
}

const STATUS_STYLES: Record<string, string> = {
  Active: "bg-green-100 text-green-700",
  Invited: "bg-yellow-100 text-yellow-700",
  Inactive: "bg-gray-100 text-gray-700",
  Success: "bg-green-100 text-green-700",
  Pending: "bg-orange-100 text-orange-700",
  Failed: "bg-red-100 text-red-700",
};

const StatusBadge: React.FC<StatusBadgeProps> = ({ label, status }) => {
  const value = status || label || "";

  return (
    <span
      className={`px-2 py-0.5 rounded-full text-[11px] font-medium
      ${STATUS_STYLES[value] ?? "bg-gray-100 text-gray-700"}`}
    >
      {value}
    </span>
  );
};

export default StatusBadge;
