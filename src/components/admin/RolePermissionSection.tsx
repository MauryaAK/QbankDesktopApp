// components/modals/PermissionAccordion.tsx
import { useState } from "react";
import Checkbox from "../common/Checkbox";
import { UserPermissionGroup } from "../../features/auth/authTypes";

interface Props {
  permissions: UserPermissionGroup[];
  value: Record<string, boolean>;
  onChange: (key: string, value: boolean) => void;
  readOnly?: boolean;
}

const PermissionAccordion = ({
  permissions,
  value,
  onChange,
  readOnly,
}: Props) => {
  const [open, setOpen] = useState<Record<string, boolean>>({});

  return (
    <div className="space-y-4 mt-6">
      {permissions.map((group:any) => {
        const isOpen = open[group.key] ?? true;

        return (
          <div key={group.key}>
            {/* HEADER */}
            <div
              className="flex items-center gap-3 bg-[#8F1D1D] text-white px-4 py-2 rounded cursor-pointer"
              onClick={() =>
                setOpen((p) => ({ ...p, [group.key]: !isOpen }))
              }
            >
              <span className="text-sm font-semibold">
                {group.title}
              </span>
            </div>

            {/* ITEMS */}
            {isOpen && (
              <div className="grid grid-cols-3 gap-4 px-4 py-3">
                {group.items.map((item) => (
                  <div
                    key={item.key}
                    className="flex items-center gap-2"
                  >
                    <Checkbox
                      checked={!!value[item.key]}
                      disabled={readOnly}
                      onChange={(v) =>
                        onChange(item.key, v)
                      }
                    />
                    <span className="text-sm">{item.label}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default PermissionAccordion;
