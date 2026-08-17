import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Resets window scroll when the pathname changes (dashboard section navigation).
 * Materials folder depth is handled separately via URL params in MaterialsProvider.
 */
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [pathname]);

  return null;
};

export default ScrollToTop;
