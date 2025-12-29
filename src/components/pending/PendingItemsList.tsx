import Card from "../common/Card";
import PendingItemRow from "./PendingItemRow";

const PendingItemsList = () => {
  return (
    <Card
      title="Pending items"
      className="
        border border-blue-dark/50
        bg-gradient-to-br from-blue-light via-blue-base to-white
        rounded-xl
        shadow-sm
      "
    >
      <PendingItemRow
        code="RDTK5Y"
        name="Punnet Pant"
        route="DEL → SIN"
        source="Home upload"
        waiting="8 min"
        onOpen={() => console.log("Open RDTK5Y")}
      />

      <PendingItemRow
        code="AB12CD"
        name="John Smith"
        route="BOM → DXB"
        source="Airport counter"
        waiting="15 min"
        onOpen={() => console.log("Open AB12CD")}
      />

      <PendingItemRow
        code="XYZ911"
        name="Maria Lopez"
        route="MAA → SYD"
        source="Home upload"
        waiting="22 min"
        onOpen={() => console.log("Open XYZ911")}
      />
    </Card>
  );
};

export default PendingItemsList;
