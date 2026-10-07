import React, { useEffect, useState } from "react";
import { Bug, Sparkles, Check, X, Loader2 } from "lucide-react";
import { cn } from "../lib/utils";
import type { CollabReport, ReporterRole } from "../hooks/useCollabReports";
import { getDomPath } from "../sourceDetector";

interface BugMarkerLayerProps {
  reports: CollabReport[];
  role: ReporterRole;
  onResolveWithAI: (report: CollabReport) => void;
  onMarkResolved: (report: CollabReport) => void;
  resolvingId?: string | null;
}

const TYPE_STYLES: Record<CollabReport["type"], string> = {
  bug: "bg-rose-500 text-white",
  correction: "bg-violet-500 text-white",
};

/** Resolves a report's element on the live page — the CSS selector first
 * (built from the element's DOM path at report time), falling back to the
 * raw domPath string if the selector alone doesn't match (e.g. the page
 * re-rendered and lost an id). Returns null if the element can't be found
 * (e.g. it was removed), in which case the marker just doesn't render rather
 * than showing at a stale/wrong position. */
function resolveElement(report: CollabReport): Element | null {
  try {
    const bySelector = document.querySelector(report.selector);
    if (bySelector) return bySelector;
  } catch {
    // invalid selector — fall through
  }
  if (report.domPath) {
    try {
      const byDomPath = document.querySelector(report.domPath);
      if (byDomPath) return byDomPath;
    } catch {
      // invalid selector — fall through
    }
  }
  return resolveLegacyPath(report.domPath || report.selector);
}

/** Reports created before getDomPath escaped class names store paths like
 * `div.max-w-149.5`, which querySelector misreads (or rejects outright for
 * `md:flex`-style classes). Re-derive the unescaped path for every element
 * with the same tag and compare strings instead. */
function resolveLegacyPath(path: string | null): Element | null {
  if (!path) return null;
  const tag = path.split(" > ").pop()?.match(/^[a-z][a-z0-9-]*/i)?.[0];
  if (!tag) return null;
  for (const el of document.getElementsByTagName(tag)) {
    if (getDomPath(el, { legacy: true }) === path) return el;
  }
  return null;
}

// How far apart (px) to stagger markers that share the same element, so
// several bug reports on one spot are all visible and individually
// clickable instead of stacking exactly on top of each other.
const STACK_OFFSET_PX = 10;

const BugMarker: React.FC<{
  report: CollabReport;
  role: ReporterRole;
  onResolveWithAI: (report: CollabReport) => void;
  onMarkResolved: (report: CollabReport) => void;
  isResolving: boolean;
  /** Position within the group of reports sharing this element (0 = first/topmost). */
  stackIndex: number;
  isOpen: boolean;
  onToggleOpen: () => void;
  onClose: () => void;
}> = ({ report, role, onResolveWithAI, onMarkResolved, isResolving, stackIndex, isOpen, onToggleOpen, onClose }) => {
  const [rect, setRect] = useState<DOMRect | null>(null);

  useEffect(() => {
    const update = () => {
      const el = resolveElement(report);
      setRect(el ? el.getBoundingClientRect() : null);
    };
    update();
    window.addEventListener("scroll", update, { capture: true, passive: true });
    window.addEventListener("resize", update);
    const interval = setInterval(update, 1000); // catches layout shifts scroll/resize miss
    return () => {
      window.removeEventListener("scroll", update, { capture: true });
      window.removeEventListener("resize", update);
      clearInterval(interval);
    };
  }, [report.selector, report.domPath]);

  if (!rect) return null;

  return (
    <div
      // Deliberately a low z-index (not the inspector's usual near-max value)
      // so the app's own dropdowns/modals/menus still render above it instead
      // of the marker covering them.
      className="fixed z-10 pointer-events-auto"
      style={{
        top: rect.top - 8 + stackIndex * STACK_OFFSET_PX,
        left: rect.right - 8 + stackIndex * STACK_OFFSET_PX,
      }}
    >
      <button
        type="button"
        onClick={onToggleOpen}
        title={report.description || (report.type === "bug" ? "Bug report" : "Suggested correction")}
        className={cn(
          "flex items-center justify-center w-6 h-6 rounded-full shadow-md border-2 border-white dark:border-neutral-900 transition-transform hover:scale-110",
          TYPE_STYLES[report.type],
          report.status === "in_progress" && "opacity-70",
        )}
      >
        <Bug className="w-3.5 h-3.5" />
      </button>

      {isOpen && (
        <div className="absolute top-7 left-0 w-72 p-3 rounded-lg border border-neutral-200 dark:border-white/10 bg-white dark:bg-neutral-900 shadow-xl text-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className={cn("px-1.5 py-0.5 rounded text-[10px] font-medium uppercase tracking-wide", TYPE_STYLES[report.type])}>
              {report.type === "bug" ? "Bug" : "Correction"}
            </span>
            <button type="button" onClick={onClose} className="text-neutral-400 hover:text-neutral-600">
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          <p className="text-neutral-700 dark:text-neutral-300 whitespace-pre-wrap">
            {report.description || "(no description)"}
          </p>

          <p className="text-[10px] text-neutral-400 font-mono truncate" title={report.selector}>
            {report.selector}
          </p>

          <div className="flex items-center justify-between pt-1">
            <span className="text-[10px] text-neutral-500 dark:text-neutral-400 capitalize">
              {report.status.replace("_", " ")}
              {report.reporterRole ? ` · reported by ${report.reporterRole}` : ""}
            </span>
          </div>

          {role === "developer" && report.status !== "resolved" && (
            <div className="flex items-center gap-2 pt-1">
              <button
                type="button"
                onClick={() => onResolveWithAI(report)}
                disabled={isResolving}
                className="flex-1 flex items-center justify-center gap-1 px-2 py-1 rounded border border-violet-500/30 bg-violet-500/10 text-violet-600 dark:text-violet-300 hover:bg-violet-500/20 transition-colors disabled:opacity-50"
              >
                {isResolving ? <Loader2 className="w-3 h-3 animate-spin" /> : <Sparkles className="w-3 h-3" />}
                Resolve with AI
              </button>
              <button
                type="button"
                onClick={() => onMarkResolved(report)}
                title="Mark resolved without AI"
                className="flex items-center justify-center gap-1 px-2 py-1 rounded border border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-300 hover:bg-emerald-500/20 transition-colors"
              >
                <Check className="w-3 h-3" />
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

/** Renders one persistent bug icon per open/in-progress collab report,
 * positioned at its element's live location on the page. */
export const BugMarkerLayer: React.FC<BugMarkerLayerProps> = ({
  reports,
  role,
  onResolveWithAI,
  onMarkResolved,
  resolvingId,
}) => {
  // Only one marker's popover open at a time — opening another closes
  // whichever was already open, rather than letting them pile up.
  const [openReportId, setOpenReportId] = useState<string | null>(null);

  const visible = reports.filter((r) => r.status !== "resolved");
  if (visible.length === 0) return null;

  // Multiple reports can target the same element — group by its identity
  // (selector, falling back to domPath) so each gets a stable stack position
  // rather than all rendering at the exact same spot.
  const groupKeyCounts = new Map<string, number>();

  return (
    <>
      {visible.map((report) => {
        const groupKey = report.selector || report.domPath || report.id;
        const stackIndex = groupKeyCounts.get(groupKey) ?? 0;
        groupKeyCounts.set(groupKey, stackIndex + 1);

        return (
          <BugMarker
            key={report.id}
            isOpen={openReportId === report.id}
            onToggleOpen={() => setOpenReportId((id) => (id === report.id ? null : report.id))}
            onClose={() => setOpenReportId(null)}
            report={report}
            role={role}
            onResolveWithAI={onResolveWithAI}
            onMarkResolved={onMarkResolved}
            isResolving={resolvingId === report.id}
            stackIndex={stackIndex}
          />
        );
      })}
    </>
  );
};
