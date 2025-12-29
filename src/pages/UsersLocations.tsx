import UsersTable from "../components/users/UsersTable";
import LocationsCard from "../components/users/LocationsCard";
import { ActionButton } from "../components/common/Buttons";

const UsersLocations = () => {
  return (
    <div className="min-h-screen">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
        <h1 className="text-base sm:text-lg font-semibold text-primary">
          Users & locations
        </h1>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
          <ActionButton
            label="+ Add user"
            size="sm"
            variant="primary"
            className="w-full sm:w-auto"
          />
          <ActionButton
            label="+ Add location"
            size="sm"
            variant="primary"
            className="w-full sm:w-auto"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mt-4">
        <UsersTable />
        <LocationsCard />
      </div>
    </div>
  );
};

export default UsersLocations;
