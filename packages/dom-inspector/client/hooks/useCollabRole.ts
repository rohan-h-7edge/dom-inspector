import { useCallback, useState } from "react";
import type { ReporterRole } from "./useCollabReports";

const ROLE_KEY = "dom-inspector:collab-role";

function readRole(): ReporterRole {
  try {
    const stored = localStorage.getItem(ROLE_KEY);
    return stored === "developer" ? "developer" : "tester";
  } catch {
    return "tester";
  }
}

/**
 * A per-browser "I am a: Tester / Developer" preference — a UI hint only,
 * not enforced (this tool has no auth), so testers get prominent report/
 * correction actions and developers get the review queue, but nothing stops
 * either side from doing both.
 */
export function useCollabRole() {
  const [role, setRoleState] = useState<ReporterRole>(readRole);

  const setRole = useCallback((next: ReporterRole) => {
    setRoleState(next);
    try {
      localStorage.setItem(ROLE_KEY, next);
    } catch {
      // localStorage unavailable
    }
  }, []);

  return { role, setRole };
}
