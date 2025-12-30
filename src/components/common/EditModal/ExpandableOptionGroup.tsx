import React, { memo } from "react";
import { MdExpandMore } from "react-icons/md";
import Checkbox from "../Checkbox";

export interface OptionItem {
    key: string;
    label: string;
}

export interface OptionGroup {
    groupKey: string;
    title: string;
    expandable?: boolean; // NEW
    items: OptionItem[];
}

interface ExpandableOptionGroupProps {
    groups: OptionGroup[];
    value: Record<string, string[]>;
    expanded: Record<string, boolean>;
    onToggleGroup: (groupKey: string) => void;
    onChange: (groupKey: string, itemKey: string, checked: boolean) => void;
}

const ExpandableOptionGroup: React.FC<ExpandableOptionGroupProps> = ({
    groups,
    value,
    expanded,
    onToggleGroup,
    onChange,
}) => {
    return (
        <div className="max-h-[260px] overflow-y-auto pr-3 space-y-2">
            {groups.map((group) => {
                const isExpandable = group.expandable !== false;
                const isExpanded = expanded[group.groupKey] ?? false;
                const selectedItems = value[group.groupKey] ?? [];

                return (
                    <div key={group.groupKey}>

                        {/* ===== GROUP HEADER ===== */}
                        <div className="flex items-center gap-2">

                            {/* EXPAND ICON (only if expandable) */}
                            {isExpandable && (
                                <button
                                    type="button"
                                    onClick={() => onToggleGroup(group.groupKey)}
                                    className={`
                    w-6 h-6 rounded-full border border-gray-400
                    flex items-center justify-center
                    transition-transform duration-200
                    ${isExpanded ? "rotate-180" : ""}
                  `}
                                >
                                    <MdExpandMore size={18} />
                                </button>
                            )}

                            {/* TITLE BAR */}
                            <div
                                className="
                  flex-1 text-white px-2 py-1 rounded-sm font-medium
                  bg-gradient-to-r from-[#DA0E29] to-[#740716]
                "
                            >
                                {group.title}
                            </div>
                        </div>

                        {/* ===== ITEMS ===== */}
                        {(isExpandable ? isExpanded : true) && (
                            <div
                                className={`
                  ml-${isExpandable ? "9" : "0"}
                  mt-3
                  flex flex-wrap
                  gap-x-10
                  gap-y-3
                `}
                            >
                                {group.items.map((item) => {
                                    const checked = selectedItems.includes(item.key);

                                    return (
                                        <label
                                            key={item.key}
                                            className="flex items-center gap-2 min-w-[200px]"
                                            onClick={(e) => e.stopPropagation()}
                                        >
                                            <Checkbox
                                                checked={checked}
                                                onChange={(v) =>
                                                    onChange(group.groupKey, item.key, v)
                                                }
                                            />
                                            <span className="text-sm whitespace-nowrap">
                                                {item.label}
                                            </span>
                                        </label>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
};

export default memo(ExpandableOptionGroup);
