import { useLocation } from "react-router-dom";
import { useCallback } from "react";

interface Option {
  label: string;
  value: string;
}

export const useActiveRoute = (allOptions: Option[]) => {
  const location = useLocation();

  /** Normalize path (important) */
  const normalize = (path: string) =>
    path.replace(/^\/+/, "").replace(/\/+$/, "");

  /** /app/dashboard -> dashboard */
  const currentPath = normalize(location.pathname.replace("app/", ""));

  /** ===== Active Page Label ===== */
  const getActivePageLabel = useCallback(() => {
    const match = allOptions.find((opt) =>
      currentPath.startsWith(opt.value)
    );
    return match?.label ?? "Dashboard";
  }, [currentPath, allOptions]);

  /** ===== Action Button Active ===== */
  const isActiveRoute = useCallback(
    (route: string) => currentPath.startsWith(route),
    [currentPath]
  );

  /** ===== Dropdown Active Option ===== */
  const getActiveOption = useCallback(
    (options: Option[]) =>
      options.find((opt) => currentPath.startsWith(opt.value)),
    [currentPath]
  );

  return {
    getActivePageLabel,
    isActiveRoute,
    getActiveOption,
  };
};
