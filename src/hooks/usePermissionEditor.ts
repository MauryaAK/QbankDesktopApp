// // hooks/usePermissionEditor.ts
// import { useCallback, useMemo, useState } from "react";
// import { normalizePermissions } from "../utils/permissions/normalizePermissions";

// export const usePermissionEditor = () => {
//   const [groups, setGroups] = useState<any[]>([]);
//   const [state, setState] = useState<Record<string, Set<string>>>({});
//   const [expanded, setExpanded] = useState<Record<string, boolean>>({});

//   const init = useCallback((permissions: any[]) => {
//     const { groups, selected } = normalizePermissions(permissions);
//     setGroups(groups);
//     setState(selected);
//     setExpanded({});
//   }, []);

//   const toggleGroup = useCallback((key: string) => {
//     setExpanded((p) => ({ ...p, [key]: !p[key] }));
//   }, []);

//   const toggleOption = useCallback(
//     (groupKey: string, itemKey: string, checked: boolean) => {
//       setState((prev) => {
//         const next = new Set(prev[groupKey] ?? []);
//         checked ? next.add(itemKey) : next.delete(itemKey);
//         return { ...prev, [groupKey]: next };
//       });
//     },
//     []
//   );

//   const value = useMemo(() => {
//     const out: Record<string, string[]> = {};
//     Object.entries(state).forEach(([k, v]) => {
//       out[k] = Array.from(v);
//     });
//     return out;
//   }, [state]);

//   return {
//     groups,
//     state,
//     expanded,
//     value,
//     init,
//     toggleGroup,
//     toggleOption,
//   };
// };





// // hooks/usePermissionEditor.ts
// import { useCallback, useMemo, useState } from "react";
// import { normalizePermissions } from "../utils/permissions/normalizePermissions";

// export const usePermissionEditor = () => {
//   const [groups, setGroups] = useState<any[]>([]);
//   const [state, setState] = useState<Record<string, Set<string>>>({});
//   const [expanded, setExpanded] = useState<Record<string, boolean>>({});

//   const init = useCallback((permissions: any[]) => {
//     const {
//       groups: normalizedGroups,
//       selected,
//     } = normalizePermissions(permissions);

//     setGroups(normalizedGroups);
//     setState(selected);

//     // ✅ IMPORTANT: use group.groupKey (NOT key)
//     const expandedState: Record<string, boolean> = {};
//     normalizedGroups.forEach((group: any) => {
//       expandedState[group.groupKey] = true;
//     });

//     setExpanded(expandedState);
//   }, []);

//   const toggleGroup = useCallback((groupKey: string) => {
//     setExpanded((prev) => ({
//       ...prev,
//       [groupKey]: !prev[groupKey],
//     }));
//   }, []);

//   const toggleOption = useCallback(
//     (groupKey: string, itemKey: string, checked: boolean) => {
//       setState((prev) => {
//         const next = new Set(prev[groupKey] ?? []);
//         checked ? next.add(itemKey) : next.delete(itemKey);
//         return { ...prev, [groupKey]: next };
//       });
//     },
//     []
//   );

//   const value = useMemo(() => {
//     const out: Record<string, string[]> = {};
//     Object.entries(state).forEach(([k, v]) => {
//       out[k] = Array.from(v);
//     });
//     return out;
//   }, [state]);

//   return {
//     groups,
//     state,
//     expanded,
//     value,
//     init,
//     toggleGroup,
//     toggleOption,
//   };
// };




import { useCallback, useMemo, useState } from "react";
import { normalizePermissions } from "../utils/permissions/normalizePermissions";

export const usePermissionEditor = () => {
  const [groups, setGroups] = useState<any[]>([]);
  const [state, setState] = useState<Record<string, Set<string>>>({});
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  const init = useCallback((permissions: any[]) => {
    const { groups: normalizedGroups, selected } =
      normalizePermissions(permissions);

    setGroups(normalizedGroups);
    setState(selected);

    const expandedState: Record<string, boolean> = {};
    normalizedGroups.forEach((g: any) => {
      expandedState[g.groupKey] = true; // ✅ MUST match component
    });

    setExpanded(expandedState);
  }, []);

  // ✅ NEW: reset for Add New
  const reset = useCallback(() => {
    setGroups([]);
    setState({});
    setExpanded({});
  }, []);

  const toggleGroup = useCallback((groupKey: string) => {
    setExpanded((p) => ({
      ...p,
      [groupKey]: !p[groupKey],
    }));
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
    reset, // 👈 expose reset
    toggleGroup,
    toggleOption,
  };
};
