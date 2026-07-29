import React from "react";
import { Loader2, CheckCircle2, XCircle, X } from "lucide-react";

export type InspectionStatus = "pending" | "in-progress" | "completed" | "failed";

// Serializable version without Element references
export interface SourceInfo {
  file: string;
  component: string;
  line: number;
  column?: number;
  elementInfo?: {
    tagName: string;
    textContent: string;
    className: string;
    id: string;
    styles: Record<string, string>;
  };
  relatedElements?: SourceInfo[];
}

export interface InspectionItem {
  id: string;
  sourceInfo: SourceInfo;
  description: string;
  status: InspectionStatus;
  progress?: {
    steps: Array<{
      id: number;
      title: string;
      status: "pending" | "in-progress" | "completed" | "failed";
    }>;
  };
  result?: string;
  timestamp: number;
  /** User-selected context from Console/Network tabs (with enriched data) */
  selectedContext?: {
    includeElement: boolean;
    includeStyles: boolean;
    consoleIds: number[];
    networkIds: number[];
    consoleMessages?: Array<{
      msgid: number;
      level: string;
      text: string;
      timestamp?: number;
    }>;
    networkRequests?: Array<{
      reqid: number;
      method: string;
      url: string;
      status: string;
      timestamp?: number;
      details?: string | null;
    }>;
    screenshot?: string;
  };
}

interface InspectionQueueProps {
  items: InspectionItem[];
  onRemove: (id: string) => void;
}

export const InspectionQueue: React.FC<InspectionQueueProps> = ({ items, onRemove }) => {
  if (items.length === 0) return null;

  const getStatusIcon = (status: InspectionStatus) => {
    if (status === "in-progress")
      return <Loader2 className="h-4 w-4 animate-spin text-blue-500 dark:text-blue-400" />;
    if (status === "completed")
      return <CheckCircle2 className="h-4 w-4 text-emerald-500 dark:text-emerald-400" />;
    if (status === "failed") return <XCircle className="h-4 w-4 text-red-500 dark:text-red-400" />;
    return <div className="h-4 w-4 rounded-full border-2 border-neutral-400 dark:border-neutral-500" />;
  };

  const getStatusBorderColor = (status: InspectionStatus) => {
    if (status === "in-progress") return "border-l-blue-500";
    if (status === "completed") return "border-l-emerald-500";
    if (status === "failed") return "border-l-red-500";
    return "border-l-neutral-300 dark:border-l-neutral-600";
  };

  const CONTEXT_TAG_STYLES: Record<string, string> = {
    Code: "bg-indigo-500/15 text-indigo-600 dark:text-indigo-300",
    Styles: "bg-fuchsia-500/15 text-fuchsia-600 dark:text-fuchsia-300",
  };
  const getContextTagStyle = (part: string) =>
    CONTEXT_TAG_STYLES[part] ??
    (part.startsWith("Console")
      ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-300"
      : part.startsWith("Network")
        ? "bg-blue-500/15 text-blue-600 dark:text-blue-300"
        : "bg-neutral-500/15 text-neutral-600 dark:text-neutral-300");

  const getStatusText = (item: InspectionItem) => {
    if (item.status === "in-progress" && item.progress?.steps) {
      const completed = item.progress.steps.filter((s) => s.status === "completed").length;
      return `Processing... ${completed}/${item.progress.steps.length}`;
    }
    if (item.status === "completed") return "Completed";
    if (item.status === "failed") return "Failed";
    if (item.status === "in-progress") return "In Progress";
    return "Pending";
  };

  return (
    <div className="w-full bg-white dark:bg-neutral-900 overflow-hidden h-full">
      <div className="h-full overflow-y-auto p-3 space-y-2">
        {items.map((item) => {
          // Calculate context summary
          const ctx = item.selectedContext;
          const contextParts: string[] = [];
          if (ctx?.includeElement) contextParts.push("Code");
          if (ctx?.includeStyles) contextParts.push("Styles");
          if (ctx?.consoleIds?.length) contextParts.push(`Console (${ctx.consoleIds.length})`);
          if (ctx?.networkIds?.length) contextParts.push(`Network (${ctx.networkIds.length})`);

          return (
            <div
              key={item.id}
              className={`px-4 py-3 rounded-lg border-l-4 bg-neutral-50 dark:bg-neutral-800/80 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors ${getStatusBorderColor(item.status)}`}
            >
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 mt-0.5">{getStatusIcon(item.status)}</div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-neutral-900 dark:text-neutral-50 truncate">
                        {item.sourceInfo.component}
                      </p>
                      <p className="text-xs text-neutral-500 dark:text-neutral-400 truncate">
                        {item.sourceInfo.file}:{item.sourceInfo.line}
                        {item.sourceInfo.column !== undefined ? `:${item.sourceInfo.column}` : ""}
                      </p>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onRemove(item.id);
                      }}
                      className="flex-shrink-0 text-neutral-400 hover:text-neutral-700 dark:text-neutral-500 dark:hover:text-neutral-200 transition-colors"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>

                  <p className="text-xs text-neutral-700 dark:text-neutral-200 mt-1 line-clamp-2">
                    {item.description}
                  </p>

                  {/* Context Summary */}
                  {contextParts.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {contextParts.map((part) => (
                        <span
                          key={part}
                          className={`px-1.5 py-0.5 text-[10px] font-medium rounded ${getContextTagStyle(part)}`}
                        >
                          {part}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-xs text-neutral-500 dark:text-neutral-400">
                      {getStatusText(item)}
                    </span>

                    {item.status === "in-progress" && item.progress?.steps && (
                      <div className="flex-1 h-1.5 bg-neutral-200 dark:bg-neutral-700 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-linear-to-r from-blue-500 to-cyan-500 transition-all duration-300"
                          style={{
                            width: `${(item.progress.steps.filter((s) => s.status === "completed").length / item.progress.steps.length) * 100}%`,
                          }}
                        />
                      </div>
                    )}
                  </div>

                  {(item.status === "completed" || item.status === "failed") && item.result && (
                    <p
                      className={`text-xs mt-1 ${item.status === "failed" ? "text-red-600 dark:text-red-400" : "text-neutral-500 dark:text-neutral-400"}`}
                    >
                      {item.result}
                    </p>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
