import Card from "../common/Card";
const Row = ({ label, value }: { label: string; value: string }) => (
  <div className="flex items-center justify-between py-1.5 border-b border-gray-200/60 last:border-none">
    <span className="text-[11px] font-medium text-primary uppercase tracking-wide">
      {label}
    </span>

    <span className="text-sm font-semibold text-primary bg-white px-2 py-0.5 rounded-md">
      {value}
    </span>
  </div>
);

const WorkloadSummary = () => {
  return (
    <Card
      title="Workload summary"
      className="
        border border-blue-dark/50
        bg-gradient-to-br from-blue-light via-blue-base to-white
        rounded-xl
        shadow-sm
      "
    >
      <Row label="Open approvals" value="18" />
      <Row label="Oldest pending" value="42 min" />
      <Row label="Average handling time" value="3 min 20 sec" />
    </Card>
  );
};

export default WorkloadSummary;
