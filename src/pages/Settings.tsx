import { ActionButton } from "../components/common/Buttons";

const Settings = () => {
  return (
    <div className="min-h-screen">

      {/* ===== HEADER ===== */}
      <div className="mb-4">
        <h1 className="text-base sm:text-lg font-semibold text-primary">
          Settings
        </h1>
        <p className="text-xs sm:text-sm text-gray-500">
          Basic configuration for TDVS WebMIS
        </p>
      </div>

      {/* ===== NOTIFICATIONS CARD ===== */}
      <div
        className="
          max-w-3xl
          border border-blue-dark/50
          bg-gradient-to-br from-blue-light via-blue-base to-white
          rounded-xl
          shadow-sm
          p-3
        "
      >
        <h2 className="text-[13px] font-semibold text-black mb-2 uppercase tracking-wide">
          Notifications
        </h2>

        {/* Row 1 */}
        <div className="flex items-center justify-between py-2 border-b border-gray-200/60 last:border-none hover:bg-white/40 transition-colors">
          <div className="min-w-0">
            <p className="text-[13px] font-medium text-primary truncate">
              Email on pending &gt; 30 min
            </p>
            <p className="text-[11px] text-primary truncate">
              Alerts for supervisors
            </p>
          </div>

          <ActionButton label="Configure" size="xs" variant="primary"/>
        </div>

        {/* Row 2 */}
        <div className="flex items-center justify-between py-2 hover:bg-white/40 transition-colors">
          <div className="min-w-0">
            <p className="text-[13px] font-medium text-primary truncate">
              Daily summary email
            </p>
            <p className="text-[11px] text-primary truncate">
              Transactions & failures
            </p>
          </div>

          <ActionButton label="Configure" size="xs" variant="primary"/>
        </div>
      </div>
    </div>
  );
};

export default Settings;
