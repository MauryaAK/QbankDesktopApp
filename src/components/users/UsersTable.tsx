import { StatusPill } from "../common/Buttons";
import Card from "../common/Card";

const UsersTable = () => {
  return (
    <Card
      title="Users"
      className="
        border border-blue-dark/50
        bg-gradient-to-br from-blue-light via-blue-base to-white
        rounded-xl
        shadow-sm
      "
    >
      <div className="overflow-x-auto">
        <table className="w-full text-[13px]">
          <thead>
            <tr className="text-[11px] text-primary border-b border-gray-200/60">
              <th className="py-1.5 text-left font-bold uppercase tracking-wide">
                Name
              </th>
              <th className="py-1.5 text-left font-bold uppercase tracking-wide">
                Role
              </th>
              <th className="py-1.5 text-left font-bold uppercase tracking-wide">
                Airport
              </th>
              <th className="py-1.5 text-left font-bold uppercase tracking-wide">
                Status
              </th>
            </tr>
          </thead>

          <tbody>
            <tr className="border-b border-gray-200/60 hover:bg-gray-50 transition-colors">
              <td className="py-2 font-medium text-gray-900">
                Agent Admin
              </td>
              <td className="py-2 text-gray-700">Supervisor</td>
              <td className="py-2 text-gray-700">DEL</td>
              <td className="py-2">
                <StatusPill variant="success" label="Active" size="xs" />
              </td>
            </tr>

            <tr className="border-b border-gray-200/60 hover:bg-gray-50 transition-colors">
              <td className="py-2 font-medium text-gray-900">
                Check-in Agent 01
              </td>
              <td className="py-2 text-gray-700">Agent</td>
              <td className="py-2 text-gray-700">BOM</td>
              <td className="py-2">
                <StatusPill variant="success" label="Active" size="xs" />
              </td>
            </tr>

            <tr className="hover:bg-gray-50 transition-colors">
              <td className="py-2 font-medium text-gray-900">
                Audit User
              </td>
              <td className="py-2 text-gray-700">Read-only</td>
              <td className="py-2 text-gray-700">All</td>
              <td className="py-2">
                <StatusPill variant="warning" label="Invited" size="xs" />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </Card>
  );
};

export default UsersTable;
