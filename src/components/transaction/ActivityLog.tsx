import Card from "../common/Card";

const LogItem = ({ time, user, action }: any) => (
  <div className="text-xs border-b py-1 last:border-none">
    <span className="text-gray-500">
      {time} • {user}
    </span>
    <p className="text-gray-800">{action}</p>
  </div>
);

const ActivityLog = () => {
  return (
    <Card title="Activity log" className="border-blue-dark bg-gradient-to-t from-blue-light to-blue-base">
      <LogItem time="10:42" user="System" action="Decision: OK to travel" />
      <LogItem time="10:41" user="Passenger" action="Visa document uploaded" />
      <LogItem time="10:40" user="Passenger" action="Passport image uploaded" />
    </Card>
  );
};

export default ActivityLog;
