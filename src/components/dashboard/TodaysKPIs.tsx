import Card from "../common/Card";
import KPIRow from "./KPIRow";

const TodaysKPIs = () => {
  return (
    <Card
      title="Today's KPIs"
      className="
        border border-blue-dark/60
        bg-gradient-to-br from-blue-light via-blue-base to-white
        rounded-xl
        shadow-sm
      "
    >
      <KPIRow label="Total transactions" value={482} />
      <KPIRow label="OK to travel" value={441} />
      <KPIRow label="Pending approvals" value={18} />
      <KPIRow label="Failed / Not OK" value={23} />
    </Card>
  );
};

export default TodaysKPIs;
