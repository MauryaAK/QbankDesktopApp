import Card from "../common/Card";
const Item = ({ label, value }: any) => (
  <div>
    <p className="text-[10px] text-gray-500 uppercase">{label}</p>
    <p className="text-xs text-gray-800 font-medium">{value}</p>
  </div>
);


const VerificationSummary = () => {
  return (
    <Card title="Verification summary" className="border-blue-dark bg-gradient-to-t from-blue-light to-blue-base">
      <div className="grid grid-cols-2 gap-y-4 gap-x-8">
        <Item label="DECISION" value="Visa or additional documents required" />
        <Item label="RULE VERSION" value="TDVS-IN-1.2" />
        <Item label="DOCUMENT TYPE" value="Passport" />
        <Item label="NATIONALITY" value="IND" />
        <Item label="STAY LENGTH" value="5 days" />
        <Item label="EVALUATED AT" value="16 Dec 2025, 10:42 IST" />
      </div>
    </Card>
  );
};

export default VerificationSummary;
