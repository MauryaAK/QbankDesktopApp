import { useNavigate } from "react-router-dom";
import { ActionButton } from "../common/Buttons";
import Card from "../common/Card";

const LinkRow = ({
  label,
  onClick,
}: {
  label: string;
  onClick: () => void;
}) => (
  <div className="flex items-center justify-between py-2 border-b border-white/40 last:border-none">
    <span className="text-[13px] font-medium text-primary">
      {label}
    </span>

    <ActionButton
      onClick={onClick}
      label="Open"
      variant="primary"
      size="xs"
      className="shrink-0"
    />
  </div>
);

const QuickLinks = () => {
  const navigate = useNavigate();

  return (
    <Card
      title="Quick links"
      className="
        border border-blue-dark/60
        bg-gradient-to-br from-blue-light via-blue-base to-white
        rounded-xl
        shadow-sm
      "
    >
      <LinkRow
        onClick={() => navigate("/transaction")}
        label="View full transactions report"
      />
      <LinkRow
        onClick={() => navigate("/pendingApprovals")}
        label="See all pending approvals"
      />
      <LinkRow
        onClick={() => navigate("/user&Locations")}
        label="Manage users & locations"
      />
    </Card>
  );
};

export default QuickLinks;
