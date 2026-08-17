import { useLayoutEffect, useRef } from "react";
import { useLocation, useNavigationType } from "react-router-dom";
import {
  isMaterialsInternalNavigation,
  parseMaterialsPath,
  shouldScrollMaterialsEntry,
} from "../features/area-personale/studente/materials/utils/materialsRoutes";

const scrollPositionsByPath = new Map<string, number>();

function restoreScroll(pathname: string): boolean {
  const saved = scrollPositionsByPath.get(pathname);
  if (saved === undefined) return false;
  window.scrollTo({ top: saved, left: 0, behavior: "auto" });
  return true;
}

/**
 * Resets window scroll on dashboard section changes.
 * Materials folder navigation preserves scroll; browser back/forward restores it.
 */
const ScrollToTop = () => {
  const { pathname } = useLocation();
  const navigationType = useNavigationType();
  const prevPathnameRef = useRef<string | null>(null);

  useLayoutEffect(() => {
    const prev = prevPathnameRef.current;
    const prevParts = prev ? parseMaterialsPath(prev) : null;
    const nextParts = parseMaterialsPath(pathname);

    if (prev !== null) {
      scrollPositionsByPath.set(prev, window.scrollY);
    }

    prevPathnameRef.current = pathname;

    if (prev === null) {
      if (nextParts.isMaterials && nextParts.workspaceId) {
        window.scrollTo({ top: 0, left: 0, behavior: "auto" });
      }
      return;
    }

    if (prev === pathname) {
      return;
    }

    if (shouldScrollMaterialsEntry(prevParts!, nextParts)) {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
      return;
    }

    if (isMaterialsInternalNavigation(prevParts!, nextParts)) {
      if (navigationType === "POP") {
        restoreScroll(pathname);
      }
      return;
    }

    if (prevParts!.workspaceId && nextParts.isMaterials && !nextParts.workspaceId) {
      if (!restoreScroll(pathname)) {
        window.scrollTo({ top: 0, left: 0, behavior: "auto" });
      }
      return;
    }

    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [pathname, navigationType]);

  return null;
};

export default ScrollToTop;
