// hooks/usePermissionEditor.ts
import { useCallback, useMemo, useState } from "react";
import { normalizePermissions } from "../utils/permissions/normalizePermissions";

export const usePermissionEditor = () => {
  const [groups, setGroups] = useState<any[]>([]);
  const [state, setState] = useState<Record<string, Set<string>>>({});
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  const init = useCallback((permissions: any[]) => {
    const { groups, selected } = normalizePermissions(permissions);
    setGroups(groups);
    setState(selected);
    setExpanded({});
  }, []);

  const toggleGroup = useCallback((key: string) => {
    setExpanded((p) => ({ ...p, [key]: !p[key] }));
  }, []);

  const toggleOption = useCallback(
    (groupKey: string, itemKey: string, checked: boolean) => {
      setState((prev) => {
        const next = new Set(prev[groupKey] ?? []);
        checked ? next.add(itemKey) : next.delete(itemKey);
        return { ...prev, [groupKey]: next };
      });
    },
    []
  );

  const value = useMemo(() => {
    const out: Record<string, string[]> = {};
    Object.entries(state).forEach(([k, v]) => {
      out[k] = Array.from(v);
    });
    return out;
  }, [state]);

  return {
    groups,
    state,
    expanded,
    value,
    init,
    toggleGroup,
    toggleOption,
  };
};
