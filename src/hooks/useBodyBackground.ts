import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export const useAutoBodyBackground = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // clear existing bg classes
    document.body.classList.remove("bg-default", "bg-admin");

    // 🔥 FIX: admin routes are under /app/admin
    if (pathname.startsWith("/app/admin")) {
      document.body.classList.add("bg-admin");
    } else {
      document.body.classList.add("bg-default");
    }
  }, [pathname]);
};
