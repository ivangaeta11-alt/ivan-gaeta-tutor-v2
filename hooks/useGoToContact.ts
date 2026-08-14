import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

/** Navigate home and scroll to the contact form — shared by public route wrappers. */
export function useGoToContact() {
  const navigate = useNavigate();

  return useCallback(() => {
    navigate("/");
    setTimeout(() => {
      document.getElementById("contatti")?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }, [navigate]);
}
