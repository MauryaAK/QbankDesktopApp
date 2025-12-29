import { ActionButton } from "../common/Buttons";

const ActionButtons = () => {
  return (
    <div className="flex gap-1 sm:gap-2 overflow-hidden">
      <ActionButton
        label="Approve"
        variant="primary"
        size="sm"
        className="px-1.5 sm:px-3 py-0.5 text-[10px] sm:text-sm whitespace-nowrap"
      />

      <ActionButton
        label="Reject"
        variant="outline"
        size="sm"
        className="px-1.5 sm:px-3 py-0.5 text-[10px] sm:text-sm whitespace-nowrap"
      />

      <ActionButton
        label="Request more docs"
        variant="outline"
        size="sm"
        className="px-1 sm:px-3 py-0.5 text-[10px] sm:text-sm whitespace-nowrap"
      />
    </div>
  );
};

export default ActionButtons;
