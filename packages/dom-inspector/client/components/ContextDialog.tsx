import React, { useState, useEffect } from "react";
import type { McpClientType } from "../hooks/useMcp";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { InspectionQueue, type InspectionItem } from "./InspectionQueue";
import { useContextData } from "../hooks/useContextData";
import { usePageInfo } from "../hooks/usePageInfo";
import { useRouteTree } from "../hooks/useRouteTree";
import { useRoutePerformanceTest, type RoutePerfResult } from "../hooks/useRoutePerformanceTest";
import { joinRoutePath, isTestablePath, collectTestableRoutes, type RouteTreeNode } from "../lib/routeTree";
import { useCollabReports, type CollabReport } from "../hooks/useCollabReports";
import { useCollabRole } from "../hooks/useCollabRole";
import { buildBugReportPrompt, buildCorrectionPrompt } from "../lib/collabPrompts";
import {
  Loader2,
  RefreshCw,
  AlertCircle,
  ChevronDown,
  ChevronRight,
  Globe,
  Search,
  X,
  Copy,
  Check,
  Gauge,
  RotateCcw,
  Sparkles,
  Zap,
  Bug,
} from "lucide-react";
import { cn } from "../lib/utils";
import type { NetworkRequest } from "../types";
import { MessageResponse } from "../../src/components/ai-elements/message";

interface ContextDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  inspectionItems: InspectionItem[];
  onRemoveInspection: (id: string) => void;
  client: McpClientType | null;
  isClientReady: boolean;
  /** Sends a single inspection to the agent directly (Play button). */
  onPlayInspection?: (item: InspectionItem) => void;
  /** Sends every pending inspection to the agent one at a time (Play All button). */
  onPlayAllInspections?: () => void;
  /** Sends a free-form prompt straight to the agent (e.g. "fix this bad performance metric"). */
  onSubmitToAgent?: (text: string) => void;
}

type TabType = "inspections" | "console" | "network" | "stdio" | "page" | "performance" | "routes" | "bugs";

// Persists the active tab across a page reload (e.g. Performance's "Re-run" button),
// so the dialog reopens on the same tab the user was looking at.
const ACTIVE_TAB_KEY = "dom-inspector:context-dialog-active-tab";

// Matches ContextPicker's TAB_ACCENTS palette for the shared tab ids
// (console/network/page/stdio), plus "inspections" for this dialog's own tab.
const TAB_ACCENTS: Record<TabType, { text: string; gradient: string; badge: string }> = {
  inspections: {
    text: "text-fuchsia-500 dark:text-fuchsia-400",
    gradient: "from-violet-600 to-fuchsia-500",
    badge: "bg-fuchsia-500",
  },
  console: {
    text: "text-emerald-500 dark:text-emerald-400",
    gradient: "from-emerald-500 to-teal-500",
    badge: "bg-emerald-500",
  },
  network: {
    text: "text-blue-500 dark:text-blue-400",
    gradient: "from-blue-500 to-cyan-500",
    badge: "bg-blue-500",
  },
  page: {
    text: "text-cyan-500 dark:text-cyan-400",
    gradient: "from-cyan-500 to-sky-500",
    badge: "bg-cyan-500",
  },
  stdio: {
    text: "text-violet-500 dark:text-violet-400",
    gradient: "from-violet-500 to-purple-500",
    badge: "bg-violet-500",
  },
  routes: {
    text: "text-rose-500 dark:text-rose-400",
    gradient: "from-rose-500 to-pink-500",
    badge: "bg-rose-500",
  },
  performance: {
    text: "text-amber-500 dark:text-amber-400",
    gradient: "from-amber-500 to-orange-500",
    badge: "bg-amber-500",
  },
  bugs: {
    text: "text-red-500 dark:text-red-400",
    gradient: "from-red-600 to-rose-500",
    badge: "bg-red-500",
  },
};

type MetricRating = "good" | "needs-improvement" | "poor";

// Google Core Web Vitals thresholds (ms, except cls which is unitless)
const METRIC_THRESHOLDS: Record<string, { good: number; poor: number }> = {
  lcp: { good: 2500, poor: 4000 },
  fcp: { good: 1800, poor: 3000 },
  ttfb: { good: 800, poor: 1800 },
  cls: { good: 0.1, poor: 0.25 },
};

function rateMetric(key: keyof typeof METRIC_THRESHOLDS, value: number | null): MetricRating | undefined {
  if (value === null) return undefined;
  const thresholds = METRIC_THRESHOLDS[key];
  if (!thresholds) return undefined;
  if (value <= thresholds.good) return "good";
  if (value <= thresholds.poor) return "needs-improvement";
  return "poor";
}

// Per-metric investigation checklist: concrete, likely-relevant causes and fixes, not
// generic advice, so the agent has an actual starting point instead of guessing.
const METRIC_PLAYBOOKS: Record<string, string> = {
  LCP: `**Likely causes, roughly in order of frequency:**
1. The LCP element (often an \`<img>\`) is lazy-loaded, or is discovered late because it's added via JS/CSS background-image instead of a plain \`<img src>\` in the initial HTML.
2. No \`fetchpriority="high"\` / \`loading="eager"\` on the LCP image, or it isn't preloaded (\`<link rel="preload" as="image">\`).
3. The image is oversized for its rendered dimensions, or served in an unoptimized format (use responsive \`srcset\`/\`sizes\`, or a modern format like WebP/AVIF).
4. Render-blocking CSS/JS (or a client-side data fetch) delays the element from painting at all — check the network waterfall for what finishes right before the LCP timestamp.
5. Slow TTFB pushes everything else later (see TTFB playbook if that's also bad).

**Do this:**
- Find the actual component that renders the LCP element below (search the codebase for its tag/class/id) and check which of the above applies.
- Apply the most relevant fix(es) — don't add \`loading="eager"\` blindly if the real issue is image size or a client-side fetch delay.`,
  FCP: `**Likely causes, roughly in order of frequency:**
1. Render-blocking \`<script>\`/\`<link rel="stylesheet">\` in \`<head>\` before first paint — move non-critical ones to \`defer\`/\`async\` or load them after first paint.
2. A large synchronous JS bundle that must parse/execute before anything renders — check for code-splitting opportunities on this route.
3. Web fonts blocking text render (FOIT) — add \`font-display: swap\` (or \`optional\`) to \`@font-face\`, and preload the critical font file.
4. Slow TTFB (see TTFB playbook if that's also bad) — FCP can't beat TTFB.

**Do this:**
- Check this page's \`<head>\`/entry bundle for blocking resources and font-loading strategy before assuming it's a JS problem.`,
  TTFB: `**Likely causes, roughly in order of frequency:**
1. Slow server-side data fetching (uncached DB/API calls) blocking the response — look at this route's server/data-loading code for sequential calls that could be parallelized or cached.
2. Cold starts / no CDN caching for a cacheable response.
3. A slow upstream dependency (auth check, session lookup, etc.) on the critical path of every request.

**Do this:**
- Trace this specific route's server-side handler/loader — don't guess at generic "add caching" advice without finding the actual slow call.`,
  CLS: `**Likely causes, roughly in order of frequency:**
1. Images/embeds/ads without explicit \`width\`/\`height\` (or \`aspect-ratio\`), so the browser reflows once they load — this is the #1 cause by far.
2. Web fonts swapping in with different metrics (FOUT) shifting surrounding text — use \`font-display: optional\` or size-adjust/fallback fonts that match metrics.
3. Content injected above existing content after load (banners, cookie notices, late-loading widgets) without reserved space.
4. Animations that change layout properties (top/left/width/height) instead of \`transform\`.

**Do this:**
- Reproduce the shift (resize/scroll/reload while watching layout) to find which element actually moves, then fix that element specifically — CLS fixes are useless if applied to the wrong element.`,
};

/** Builds the prompt sent to the agent when the user presses "Fix with AI" on a bad performance metric. */
function buildPerfFixPrompt(options: {
  label: string;
  description: string;
  value: number;
  unit: string;
  rating: MetricRating;
  url: string;
  detail?: string;
}): string {
  const { label, description, value, unit, rating, url, detail } = options;
  const playbook = METRIC_PLAYBOOKS[label];
  return `## Performance Issue: ${label} is ${rating.replace("-", " ")}

**Metric**: ${label} (${description})
**Value**: ${value}${unit} — rated **${rating.replace("-", " ")}** against Google's Core Web Vitals thresholds
**Page**: ${url}${detail ? `\n**Element responsible**: \`${detail}\`` : ""}

${playbook ?? ""}

## Your Task
1. Find the root cause using the checklist above — don't apply a generic/superficial change (e.g. adding a loading attribute, a CSS tweak, or a config flag) without first confirming it addresses what's actually slow on THIS page.
2. Make a real code change that fixes the confirmed root cause.
3. Briefly explain what you changed, why it addresses the specific cause you found (not just "should help ${label}"), and what you'd expect the new ${label} value to be roughly.
4. Note in your reply that ${label} can only be re-measured with a real page reload — ask the user to click "Re-run" in the Performance tab (or reload the page) to confirm the fix actually worked, and be ready to iterate if it didn't.`;
}

const RATING_STYLES: Record<MetricRating, string> = {
  good: "text-emerald-500 dark:text-emerald-400",
  "needs-improvement": "text-amber-500 dark:text-amber-400",
  poor: "text-red-500 dark:text-red-400",
};

const PerfMetricCard: React.FC<{
  label: string;
  description: string;
  value: number | null;
  rating?: MetricRating;
  unit?: string;
  detail?: string;
  onFix?: () => void;
}> = ({ label, description, value, rating, unit = "ms", detail, onFix }) => {
  const isBad = rating === "poor" || rating === "needs-improvement";
  return (
    <div className="p-3 rounded-md bg-neutral-100 dark:bg-white/[0.06] border border-neutral-200 dark:border-white/10">
      <div className="flex items-center justify-between mb-1">
        <div className="text-xs font-medium text-neutral-500 dark:text-neutral-400">{label}</div>
        {rating && (
          <span className={cn("text-[10px] font-medium uppercase tracking-wide", RATING_STYLES[rating])}>
            {rating.replace("-", " ")}
          </span>
        )}
      </div>
      <div className={cn("text-lg font-semibold", rating ? RATING_STYLES[rating] : "text-neutral-900 dark:text-neutral-50")}>
        {value !== null ? `${value}${unit}` : "Measuring…"}
      </div>
      <div className="text-[11px] text-neutral-500 dark:text-neutral-400 mt-0.5">{description}</div>
      {detail && (
        <div className="text-[11px] font-mono text-neutral-500 dark:text-neutral-400 mt-1 truncate">{detail}</div>
      )}
      {isBad && onFix && (
        <button
          type="button"
          onClick={onFix}
          className="mt-2 flex items-center gap-1 px-2 py-1 text-[11px] font-medium rounded border border-red-500/30 bg-red-500/10 text-red-600 dark:text-red-400 hover:bg-red-500/20 transition-colors"
        >
          <Sparkles className="w-3 h-3" />
          Fix with AI
        </button>
      )}
    </div>
  );
};

const ROUTE_KIND_STYLES: Record<RouteTreeNode["kind"], string> = {
  route: "bg-blue-500/15 text-blue-600 dark:text-blue-300",
  layout: "bg-violet-500/15 text-violet-600 dark:text-violet-300",
  guard: "bg-amber-500/15 text-amber-600 dark:text-amber-300",
};

const RouteTreeItem: React.FC<{
  node: RouteTreeNode;
  depth: number;
  basePath: string;
  /** True if an ancestor node was classified as a "guard" — passed down so
   * every descendant knows it likely needs an authenticated session. */
  underGuard: boolean;
  results: Record<string, RoutePerfResult>;
  onRunTest: (path: string) => void;
  onSubmitToAgent?: (text: string) => void;
  onOpenChange: (open: boolean) => void;
}> = ({ node, depth, basePath, underGuard, results, onRunTest, onSubmitToAgent, onOpenChange }) => {
  const fullPath = joinRoutePath(basePath, node.path);
  const guarded = underGuard || node.kind === "guard";
  const testable = (node.path !== null || node.index) && isTestablePath(fullPath);
  const result = testable ? results[fullPath] : undefined;

  const makeOnFix = (
    label: string,
    description: string,
    value: number | null,
    rating: MetricRating | undefined,
    unit: string,
    detail?: string,
  ) =>
    value !== null && rating && rating !== "good" && onSubmitToAgent
      ? () => {
          onSubmitToAgent(
            buildPerfFixPrompt({
              label,
              description,
              value,
              unit,
              rating,
              url: `${window.location.origin}${fullPath}`,
              detail,
            }),
          );
          onOpenChange(false);
        }
      : undefined;

  return (
    <div>
      <div
        className="flex items-center gap-2 py-1 rounded hover:bg-neutral-100/50 dark:hover:bg-neutral-700/50"
        style={{ paddingLeft: `${depth * 16 + 8}px` }}
      >
        <span className={cn("px-1.5 py-0.5 text-[10px] font-medium rounded uppercase tracking-wide", ROUTE_KIND_STYLES[node.kind])}>
          {node.kind}
        </span>
        {node.index ? (
          <span className="text-xs font-mono text-neutral-500 dark:text-neutral-400">(index)</span>
        ) : node.path ? (
          <span className="text-xs font-mono text-neutral-900 dark:text-neutral-50">{node.path}</span>
        ) : (
          <span className="text-xs text-neutral-400 dark:text-neutral-500 italic">(no path)</span>
        )}
        {node.componentName && (
          <span className="text-xs text-neutral-500 dark:text-neutral-400">→ {node.componentName}</span>
        )}
        {testable && guarded && (
          <span
            className="px-1.5 py-0.5 text-[10px] font-medium rounded bg-neutral-500/15 text-neutral-600 dark:text-neutral-300"
            title="Under a guard node in the tree — likely needs an authenticated session to reach without redirecting"
          >
            requires login
          </span>
        )}
        {testable && (
          <button
            type="button"
            onClick={() => onRunTest(fullPath)}
            disabled={result?.status === "running"}
            title={`Reload into ${fullPath} and measure real performance metrics, same as the Performance tab's Re-run`}
            className="ml-auto flex items-center gap-1 px-1.5 py-0.5 text-[10px] font-medium rounded border border-neutral-200 dark:border-white/10 text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-white/10 transition-colors disabled:opacity-50 flex-shrink-0"
          >
            {result?.status === "running" ? (
              <Loader2 className="w-3 h-3 animate-spin" />
            ) : (
              <Zap className="w-3 h-3" />
            )}
            Test
          </button>
        )}
      </div>

      {result?.status === "redirected" && (
        <div style={{ paddingLeft: `${depth * 16 + 24}px` }} className="pr-2 pb-3">
          <div className="flex items-start gap-2 p-2.5 rounded-md bg-amber-500/10 border border-amber-500/30 text-xs text-amber-700 dark:text-amber-300">
            <AlertCircle className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" />
            <span>
              Redirected to <code className="font-mono">{result.redirectedTo}</code> instead of{" "}
              <code className="font-mono">{fullPath}</code> — this route probably needs
              {guarded ? " you to be logged in" : " a different session state"} to reach directly. Metrics for the
              intended route weren't recorded; log in/out as needed and retest.
            </span>
          </div>
        </div>
      )}

      {result?.status === "done" && result.metrics && (
        <div style={{ paddingLeft: `${depth * 16 + 24}px` }} className="pr-2 pb-3">
          <div className="grid grid-cols-3 gap-2">
            {(() => {
              const m = result.metrics!;
              const lcpRating = rateMetric("lcp", m.lcp);
              const fcpRating = rateMetric("fcp", m.fcp);
              const ttfbRating = rateMetric("ttfb", m.ttfb);
              const clsRating = rateMetric("cls", m.cls);
              return (
                <>
                  <PerfMetricCard
                    label="LCP"
                    description="Largest Contentful Paint"
                    value={m.lcp}
                    rating={lcpRating}
                    detail={m.lcpElement ?? undefined}
                    onFix={makeOnFix("LCP", "Largest Contentful Paint", m.lcp, lcpRating, "ms", m.lcpElement ?? undefined)}
                  />
                  <PerfMetricCard
                    label="FCP"
                    description="First Contentful Paint"
                    value={m.fcp}
                    rating={fcpRating}
                    onFix={makeOnFix("FCP", "First Contentful Paint", m.fcp, fcpRating, "ms")}
                  />
                  <PerfMetricCard
                    label="TTFB"
                    description="Time to First Byte"
                    value={m.ttfb}
                    rating={ttfbRating}
                    onFix={makeOnFix("TTFB", "Time to First Byte", m.ttfb, ttfbRating, "ms")}
                  />
                  <PerfMetricCard
                    label="CLS"
                    description="Cumulative Layout Shift"
                    value={m.cls}
                    rating={clsRating}
                    unit=""
                    onFix={makeOnFix("CLS", "Cumulative Layout Shift", m.cls, clsRating, "")}
                  />
                  <PerfMetricCard
                    label="DOMContentLoaded"
                    description="Navigation start → DOM ready"
                    value={m.domContentLoaded}
                  />
                  <PerfMetricCard label="Page Load Time" description="Navigation start → load event" value={m.pageLoadTime} />
                </>
              );
            })()}
          </div>
          <p className="text-[11px] text-neutral-500 dark:text-neutral-400 mt-2">
            Measured via a real page reload into this route, just like the Performance tab's "Re-run" button —
            these are fresh, correct values for this specific route, not fallbacks from the original page load.
          </p>
        </div>
      )}

      {node.children.map((child, i) => (
        <RouteTreeItem
          key={i}
          node={child}
          depth={depth + 1}
          basePath={fullPath}
          underGuard={guarded}
          results={results}
          onRunTest={onRunTest}
          onSubmitToAgent={onSubmitToAgent}
          onOpenChange={onOpenChange}
        />
      ))}
    </div>
  );
};

// Network request item component with expandable details
const NetworkRequestItem: React.FC<{
  request: NetworkRequest;
  client: McpClientType | null;
  isClientReady: boolean;
}> = ({ request, client, isClientReady }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [details, setDetails] = useState<string | null>(null);
  const [loadingDetails, setLoadingDetails] = useState(false);

  const fetchDetails = async () => {
    if (details !== null) return;

    setLoadingDetails(true);
    try {
      // Check if we should use Chrome DevTools or fallback to local storage
      const config =
        typeof window !== "undefined" ? (window as any).__DOM_INSPECTOR_CONFIG__ : null;
      // Use Chrome DevTools only when: Chrome is enabled AND running in automated/headless mode
      // In non-automated mode, Chrome DevTools may not be available even if enabled
      const shouldUseChrome = config && !config.disableChrome && config.isAutomated;

      // Try Chrome DevTools only if explicitly enabled
      if (shouldUseChrome && client && isClientReady) {
        try {
          const result = await client.callTool({
            name: "chrome_devtools",
            arguments: {
              useTool: "chrome_get_network_request",
              hasDefinitions: ["chrome_get_network_request"],
              chrome_get_network_request: { reqid: request.reqid },
            },
          });
          const content = (result as { content?: Array<{ text?: string }> })?.content;
          const text = content?.map((item) => item.text).join("\n") || "No details";
          setDetails(text);
          return; // Success, exit early
        } catch (mcpError) {
          // Chrome DevTools failed, fall through to API method
          console.log("[ContextDialog] Chrome DevTools failed, using local storage");
        }
      }

      // Fallback: Fetch from local storage API (Chromeless mode or Chrome unavailable)
      const baseUrl = config
        ? (() => {
            const url =
              config.baseUrl || `http://${config.host}:${config.port}${config.base || "/"}`;
            return url.endsWith("/") ? url.slice(0, -1) : url;
          })()
        : "";

      const response = await fetch(`${baseUrl}/__inspector__/request-details/${request.reqid}`);

      if (response.ok) {
        const text = await response.text();
        setDetails(text);
      } else {
        throw new Error(`Failed to fetch: ${response.status} ${response.statusText}`);
      }
    } catch (error) {
      setDetails(
        `Failed to fetch details: ${error instanceof Error ? error.message : String(error)}`,
      );
    } finally {
      setLoadingDetails(false);
    }
  };

  const handleToggle = () => {
    if (!isExpanded) {
      fetchDetails();
    }
    setIsExpanded(!isExpanded);
  };

  const getMethodColor = (method: string) => {
    switch (method.toUpperCase()) {
      case "GET":
        return "bg-green-500/20 text-green-600";
      case "POST":
        return "bg-blue-500/20 text-blue-500";
      case "PUT":
        return "bg-yellow-500/20 text-yellow-600";
      case "DELETE":
        return "bg-red-500/20 text-red-500";
      case "PATCH":
        return "bg-purple-500/20 text-purple-500";
      default:
        return "bg-neutral-100 dark:bg-white/[0.06] border border-neutral-200 dark:border-white/10 text-neutral-500 dark:text-neutral-400";
    }
  };

  const getStatusColor = (status: string) => {
    // Extract status code from string like "failed - 304" or "success - 200"
    const match = status.match(/\b(\d{3})\b/);
    const code = match ? parseInt(match[1]) : 0;

    if (code >= 200 && code < 300) return "text-green-600";
    if (code >= 300 && code < 400) return "text-yellow-600"; // 3xx is warning/redirect, not error
    if (code >= 400) return "text-red-500";

    if (status.includes("success")) return "text-green-600";
    if (status.includes("failed")) return "text-red-500";
    if (status.includes("pending")) return "text-yellow-600";
    return "text-neutral-500 dark:text-neutral-400";
  };

  // Re-indents any "Body:" section that holds valid JSON via JSON.parse + JSON.stringify(..., null, 2)
  const prettifyDetails = (raw: string): string =>
    raw.replace(/(Body:\n)([\s\S]*?)(?=\n\n|$)/g, (match, prefix, body) => {
      const trimmed = body.trim();
      if (!trimmed) return match;
      try {
        const parsed = JSON.parse(trimmed);
        return `${prefix}${JSON.stringify(parsed, null, 2)}`;
      } catch {
        return match;
      }
    });

  const renderDetails = () => {
    if (loadingDetails) {
      return (
        <div className="flex items-center gap-2 py-2 text-sm text-neutral-500 dark:text-neutral-400">
          <Loader2 className="w-4 h-4 animate-spin" />
          Loading...
        </div>
      );
    }

    if (!details) return null;

    const effectiveDetails = prettifyDetails(details);
    let markdownContent = effectiveDetails;
    let sourceMapJson = null;

    try {
      const sourceMapPrefix = "//# sourceMappingURL=data:application/json;base64,";
      const lines = effectiveDetails.split("\n");
      const sourceMapLine = lines.find((l) => l.trim().startsWith(sourceMapPrefix));

      if (sourceMapLine) {
        const base64 = sourceMapLine.trim().substring(sourceMapPrefix.length);
        const jsonStr = atob(base64);
        sourceMapJson = JSON.parse(jsonStr);

        // If we have a source map, construct a nice markdown display
        markdownContent = `**Source Map (Decoded):**
\`\`\`json
${JSON.stringify(sourceMapJson, null, 2)}
\`\`\`

**Raw Content:**
\`\`\`
${effectiveDetails}
\`\`\`
`;
      }
    } catch (e) {
      // Ignore parsing errors
    }

    // Outside a fenced code block, markdown collapses newlines/indentation into a single
    // flowing paragraph — always render as code block(s) so Request/Headers/Body stay on
    // their own lines, regardless of whether the body itself is JSON.
    if (!sourceMapJson && !effectiveDetails.includes("###")) {
      const asFence = (text: string) => {
        const lang = text.trim().startsWith("{") || text.trim().startsWith("[") ? "json" : "";
        return `\`\`\`${lang}\n${text.trim()}\n\`\`\``;
      };

      // The raw text always separates Request/Response with a blank line (see interceptor.ts);
      // split on that so each shows under its own bold label instead of one undifferentiated block.
      const responseMarkerIndex = effectiveDetails.indexOf("\n\nResponse:");
      if (responseMarkerIndex !== -1) {
        const requestText = effectiveDetails.slice(0, responseMarkerIndex);
        const responseText = effectiveDetails.slice(responseMarkerIndex + 2); // drop the leading blank line
        markdownContent = `**Request**\n${asFence(requestText)}\n\n**Response**\n${asFence(responseText)}`;
      } else {
        markdownContent = asFence(effectiveDetails);
      }
    }

    return (
      <div className="text-xs text-neutral-900 dark:text-neutral-100 bg-neutral-100 dark:bg-white/[0.06] border border-neutral-200 dark:border-white/10 p-3 rounded overflow-x-auto max-h-[400px] overflow-y-auto">
        <MessageResponse>{markdownContent}</MessageResponse>
      </div>
    );
  };

  return (
    <div className="rounded-md bg-neutral-100 dark:bg-white/[0.06] border border-neutral-200 dark:border-white/10 hover:bg-neutral-200 dark:hover:bg-white/[0.1] transition-colors overflow-hidden">
      <button onClick={handleToggle} className="w-full p-3 text-left flex items-start gap-3">
        <span className="mt-0.5 flex-shrink-0">
          {isExpanded ? (
            <ChevronDown className="w-4 h-4 text-neutral-500 dark:text-neutral-400" />
          ) : (
            <ChevronRight className="w-4 h-4 text-neutral-500 dark:text-neutral-400" />
          )}
        </span>
        <span
          className={cn(
            "px-2 py-0.5 text-xs font-medium rounded flex-shrink-0",
            getMethodColor(request.method),
          )}
        >
          {request.method}
        </span>
        <div className="flex-1 min-w-0 overflow-hidden">
          <div className="text-sm text-neutral-900 dark:text-neutral-50 font-mono truncate" title={request.url}>
            {request.url}
          </div>
          <div className={cn("text-xs mt-1", getStatusColor(request.status))}>
            Status: {request.status}
          </div>
        </div>
      </button>

      {isExpanded && <div className="px-3 pb-3 pl-10">{renderDetails()}</div>}
    </div>
  );
};

export const ContextDialog: React.FC<ContextDialogProps> = ({
  open,
  onOpenChange,
  inspectionItems,
  onRemoveInspection,
  client,
  isClientReady,
  onPlayInspection,
  onPlayAllInspections,
  onSubmitToAgent,
}) => {
  const [activeTab, setActiveTab] = useState<TabType>(() => {
    try {
      const saved = sessionStorage.getItem(ACTIVE_TAB_KEY) as TabType | null;
      return saved ?? "inspections";
    } catch {
      return "inspections";
    }
  });

  useEffect(() => {
    try {
      sessionStorage.setItem(ACTIVE_TAB_KEY, activeTab);
    } catch {
      // sessionStorage unavailable (private mode, etc.) — tab just won't survive a reload
    }
  }, [activeTab]);
  const [consoleSearch, setConsoleSearch] = useState("");
  const [networkSearch, setNetworkSearch] = useState("");
  const [stdioSearch, setStdioSearch] = useState("");
  const [copied, setCopied] = useState(false);
  // Selection state for copy
  const [selectedConsoleIds, setSelectedConsoleIds] = useState<Set<number>>(new Set());
  const [selectedNetworkIds, setSelectedNetworkIds] = useState<Set<number>>(new Set());
  const [selectedStdioIds, setSelectedStdioIds] = useState<Set<number>>(new Set());
  const pageInfo = usePageInfo(open);
  const routeTree = useRouteTree(open);
  const routePerf = useRoutePerformanceTest();
  const { publicRoutePaths, protectedRoutePaths } = React.useMemo(() => {
    const routes = collectTestableRoutes(routeTree.tree);
    return {
      publicRoutePaths: Array.from(new Set(routes.filter((r) => !r.requiresAuth).map((r) => r.path))),
      protectedRoutePaths: Array.from(new Set(routes.filter((r) => r.requiresAuth).map((r) => r.path))),
    };
  }, [routeTree.tree]);
  const collab = useCollabReports();
  const { role: collabRole } = useCollabRole();
  const { consoleMessages, networkRequests, stdioMessages, loading, error, refresh } =
    useContextData(client, isClientReady);

  // Filtered lists
  const filteredConsole = consoleSearch
    ? consoleMessages.filter(
        (msg) =>
          msg.text.toLowerCase().includes(consoleSearch.toLowerCase()) ||
          msg.level.toLowerCase().includes(consoleSearch.toLowerCase()),
      )
    : consoleMessages;

  const filteredNetwork = networkSearch
    ? networkRequests.filter(
        (req) =>
          req.url.toLowerCase().includes(networkSearch.toLowerCase()) ||
          req.method.toLowerCase().includes(networkSearch.toLowerCase()),
      )
    : networkRequests;

  const filteredStdio = stdioSearch
    ? stdioMessages.filter(
        (msg) =>
          msg.data.toLowerCase().includes(stdioSearch.toLowerCase()) ||
          msg.stream.toLowerCase().includes(stdioSearch.toLowerCase()),
      )
    : stdioMessages;

  // Toggle selection helper
  const toggleSelection = (
    id: number,
    setter: React.Dispatch<React.SetStateAction<Set<number>>>,
  ) => {
    setter((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  // Copy all tabs content (selected items only, or all if none selected)
  const handleCopy = async () => {
    const sections: string[] = [];

    // Console
    const consoleItems =
      selectedConsoleIds.size > 0
        ? consoleMessages.filter((msg) => selectedConsoleIds.has(msg.msgid))
        : consoleMessages;
    if (consoleItems.length > 0) {
      sections.push(
        `## Console (${consoleItems.length})\n${consoleItems.map((msg) => `[${msg.level}] ${msg.text}`).join("\n")}`,
      );
    }

    // Network
    const networkItems =
      selectedNetworkIds.size > 0
        ? networkRequests.filter((req) => selectedNetworkIds.has(req.reqid))
        : networkRequests;
    if (networkItems.length > 0) {
      sections.push(
        `## Network (${networkItems.length})\n${networkItems.map((req) => `${req.method} ${req.url} (${req.status})`).join("\n")}`,
      );
    }

    // Terminal
    const stdioItems =
      selectedStdioIds.size > 0
        ? stdioMessages.filter((msg) => selectedStdioIds.has(msg.stdioid))
        : stdioMessages;
    if (stdioItems.length > 0) {
      sections.push(
        `## Terminal (${stdioItems.length})\n${stdioItems.map((msg) => `[${msg.stream}] ${msg.data}`).join("\n")}`,
      );
    }

    // Page
    if (pageInfo) {
      sections.push(
        `## Page\nURL: ${pageInfo.url}\nTitle: ${pageInfo.title}\nViewport: ${pageInfo.viewport.width} × ${pageInfo.viewport.height}\nLanguage: ${pageInfo.language}`,
      );
    }

    const content = sections.join("\n\n");
    if (content) {
      await navigator.clipboard.writeText(content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // Get total selected count across all tabs
  const getTotalSelectedCount = () => {
    return selectedConsoleIds.size + selectedNetworkIds.size + selectedStdioIds.size;
  };

  // Fetch data when dialog opens
  useEffect(() => {
    if (open) {
      refresh();
    }
  }, [open, refresh]);

  const tabs: Array<{ id: TabType; label: string; count?: number }> = [
    { id: "inspections", label: "Inspections", count: inspectionItems.length },
    { id: "console", label: "Console", count: consoleMessages.length },
    { id: "network", label: "Network", count: networkRequests.length },
    { id: "page", label: "Page" },
    { id: "performance", label: "Performance" },
    { id: "routes", label: "Routes", count: routeTree.tree.length || undefined },
    { id: "stdio", label: "Terminal", count: stdioMessages.length },
    ...(collab.enabled
      ? [
          {
            id: "bugs" as const,
            label: "Bugs",
            count: collab.reports.filter((r) => r.status !== "resolved").length || undefined,
          },
        ]
      : []),
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="w-[70vw] max-w-[70vw] h-[80vh] max-h-[80vh] flex flex-col"
        onClose={() => onOpenChange(false)}
      >
        <DialogHeader className="flex-shrink-0 pr-8">
          <div className="flex items-center justify-between gap-4">
            <DialogTitle>Full Page Context</DialogTitle>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleCopy}
                disabled={loading}
                className={cn(
                  "flex items-center gap-1.5 px-3 h-8 text-xs font-semibold rounded-full transition-all disabled:opacity-50 text-white shadow-sm",
                  copied
                    ? "bg-emerald-500 shadow-emerald-500/30"
                    : "bg-linear-to-r from-violet-600 via-fuchsia-500 to-pink-500 shadow-fuchsia-500/30 hover:shadow-md hover:shadow-fuchsia-500/40 hover:scale-[1.03]",
                )}
                title={
                  getTotalSelectedCount() > 0
                    ? `Copy ${getTotalSelectedCount()} selected items`
                    : "Copy all context"
                }
              >
                {copied ? (
                  <Check className="w-3.5 h-3.5" />
                ) : (
                  <Copy className="w-3.5 h-3.5" />
                )}
                <span>
                  {getTotalSelectedCount() > 0 ? `Copy (${getTotalSelectedCount()})` : "Copy All"}
                </span>
              </button>
              <button
                type="button"
                onClick={() => refresh()}
                disabled={loading}
                className="flex items-center justify-center w-8 h-8 text-sm text-neutral-600 dark:text-neutral-300 border border-neutral-200 dark:border-white/15 bg-neutral-100 dark:bg-white/10 hover:bg-neutral-200 dark:hover:bg-white/20 hover:text-neutral-900 dark:hover:text-white rounded-md transition-colors disabled:opacity-50"
                title="Refresh Data"
              >
                <RefreshCw className={cn("w-3.5 h-3.5", loading && "animate-spin")} />
              </button>
            </div>
          </div>
        </DialogHeader>

        {/* Tabs */}
        <div className="flex gap-1 border-b border-neutral-200 dark:border-neutral-700 flex-shrink-0">
          {tabs.map((tab) => {
            const accent = TAB_ACCENTS[tab.id];
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "px-4 py-2 text-sm font-medium transition-colors relative",
                  activeTab === tab.id ? accent.text : "text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-50",
                )}
              >
                {tab.label}
                {tab.count !== undefined && tab.count > 0 && (
                  <span
                    className={cn(
                      "ml-2 px-1.5 py-0.5 text-xs font-medium text-white rounded-full",
                      accent.badge,
                    )}
                  >
                    {tab.count}
                  </span>
                )}
                {activeTab === tab.id && (
                  <div
                    className={cn(
                      "absolute bottom-0 left-0 right-0 h-0.5 bg-linear-to-r",
                      accent.gradient,
                    )}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Tab Content */}
        <div className="flex-1 overflow-auto min-h-0">
          {error && (
            <div className="flex items-center gap-2 p-4 text-sm text-red-600 dark:text-red-400 bg-red-500/10 rounded-md m-4">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span className="break-all">{error}</span>
            </div>
          )}

          {activeTab === "inspections" && (
            <div className="h-full overflow-auto">
              {inspectionItems.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-neutral-500 dark:text-neutral-400">
                  <p className="text-sm">No inspections</p>
                  <p className="text-xs mt-1">Use ⌥I to inspect elements</p>
                </div>
              ) : (
                <InspectionQueue
                  items={inspectionItems}
                  onRemove={onRemoveInspection}
                  onPlay={onPlayInspection}
                  onPlayAll={onPlayAllInspections}
                />
              )}
            </div>
          )}

          {activeTab === "console" && (
            <div className="p-4 space-y-2 h-full overflow-auto">
              {/* Search Input */}
              <div className="relative mb-2">
                <Search className="absolute left-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-neutral-500 dark:text-neutral-400" />
                <input
                  type="text"
                  value={consoleSearch}
                  onChange={(e) => setConsoleSearch(e.target.value)}
                  placeholder="Filter logs..."
                  className="w-full pl-7 pr-7 py-1.5 text-xs text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400 dark:placeholder:text-neutral-500 rounded border border-neutral-300 dark:border-white/15 bg-white dark:bg-white/5 focus:outline-none focus:ring-1 focus:ring-fuchsia-500/50"
                />
                {consoleSearch && (
                  <button
                    type="button"
                    onClick={() => setConsoleSearch("")}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-50"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
              {loading && (
                <div className="flex items-center justify-center py-12">
                  <Loader2 className="w-6 h-6 animate-spin text-neutral-500 dark:text-neutral-400" />
                </div>
              )}
              {!loading && filteredConsole.length === 0 && (
                <div className="flex flex-col items-center justify-center py-12 text-neutral-500 dark:text-neutral-400">
                  <p className="text-sm">
                    {consoleSearch ? "No matching logs" : "No console logs"}
                  </p>
                </div>
              )}
              {!loading &&
                filteredConsole.map((msg) => (
                  <label
                    key={msg.msgid}
                    className="flex items-start gap-2 p-3 rounded-md bg-neutral-100 dark:bg-white/[0.06] border border-neutral-200 dark:border-white/10 hover:bg-neutral-200 dark:hover:bg-white/[0.1] transition-colors cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={selectedConsoleIds.has(msg.msgid)}
                      onChange={() => toggleSelection(msg.msgid, setSelectedConsoleIds)}
                      className="mt-0.5 rounded border-neutral-200 dark:border-neutral-700"
                    />
                    <span
                      className={cn(
                        "px-2 py-0.5 text-xs font-medium rounded flex-shrink-0",
                        msg.level === "error" && "bg-red-500/20 text-red-500",
                        msg.level === "warn" && "bg-yellow-500/20 text-yellow-600",
                        msg.level === "info" && "bg-blue-500/20 text-blue-500",
                        msg.level === "log" && "bg-neutral-100 dark:bg-white/[0.06] border border-neutral-200 dark:border-white/10 text-neutral-500 dark:text-neutral-400",
                        msg.level === "debug" && "bg-purple-500/20 text-purple-500",
                      )}
                    >
                      {msg.level}
                    </span>
                    <span className="text-sm text-neutral-900 dark:text-neutral-100 flex-1 font-mono break-all overflow-hidden">
                      {msg.text}
                    </span>
                  </label>
                ))}
            </div>
          )}

          {activeTab === "network" && (
            <div className="p-4 space-y-2 h-full overflow-auto">
              {/* Search Input */}
              <div className="relative mb-2">
                <Search className="absolute left-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-neutral-500 dark:text-neutral-400" />
                <input
                  type="text"
                  value={networkSearch}
                  onChange={(e) => setNetworkSearch(e.target.value)}
                  placeholder="Filter requests..."
                  className="w-full pl-7 pr-7 py-1.5 text-xs text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400 dark:placeholder:text-neutral-500 rounded border border-neutral-300 dark:border-white/15 bg-white dark:bg-white/5 focus:outline-none focus:ring-1 focus:ring-fuchsia-500/50"
                />
                {networkSearch && (
                  <button
                    type="button"
                    onClick={() => setNetworkSearch("")}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-50"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
              {loading && (
                <div className="flex items-center justify-center py-12">
                  <Loader2 className="w-6 h-6 animate-spin text-neutral-500 dark:text-neutral-400" />
                </div>
              )}
              {!loading && filteredNetwork.length === 0 && (
                <div className="flex flex-col items-center justify-center py-12 text-neutral-500 dark:text-neutral-400">
                  <p className="text-sm">
                    {networkSearch ? "No matching requests" : "No network requests"}
                  </p>
                </div>
              )}
              {!loading &&
                filteredNetwork.map((req) => (
                  <div key={req.reqid} className="flex items-start gap-2">
                    <input
                      type="checkbox"
                      checked={selectedNetworkIds.has(req.reqid)}
                      onChange={() => toggleSelection(req.reqid, setSelectedNetworkIds)}
                      className="mt-3 rounded border-neutral-200 dark:border-neutral-700 flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <NetworkRequestItem
                        request={req}
                        client={client}
                        isClientReady={isClientReady}
                      />
                    </div>
                  </div>
                ))}
            </div>
          )}

          {activeTab === "stdio" && (
            <div className="p-4 space-y-2 h-full overflow-auto">
              {/* Search Input */}
              <div className="relative mb-2">
                <Search className="absolute left-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-neutral-500 dark:text-neutral-400" />
                <input
                  type="text"
                  value={stdioSearch}
                  onChange={(e) => setStdioSearch(e.target.value)}
                  placeholder="Filter terminal..."
                  className="w-full pl-7 pr-7 py-1.5 text-xs text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400 dark:placeholder:text-neutral-500 rounded border border-neutral-300 dark:border-white/15 bg-white dark:bg-white/5 focus:outline-none focus:ring-1 focus:ring-fuchsia-500/50"
                />
                {stdioSearch && (
                  <button
                    type="button"
                    onClick={() => setStdioSearch("")}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-50"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
              {loading && (
                <div className="flex items-center justify-center py-12">
                  <Loader2 className="w-6 h-6 animate-spin text-neutral-500 dark:text-neutral-400" />
                </div>
              )}
              {!loading && filteredStdio.length === 0 && (
                <div className="flex flex-col items-center justify-center py-12 text-neutral-500 dark:text-neutral-400">
                  <p className="text-sm">
                    {stdioSearch ? "No matching messages" : "No terminal messages"}
                  </p>
                </div>
              )}
              {!loading &&
                filteredStdio.map((msg) => (
                  <label
                    key={msg.stdioid}
                    className="flex items-start gap-2 p-3 rounded-md bg-neutral-100 dark:bg-white/[0.06] border border-neutral-200 dark:border-white/10 hover:bg-neutral-200 dark:hover:bg-white/[0.1] transition-colors cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={selectedStdioIds.has(msg.stdioid)}
                      onChange={() => toggleSelection(msg.stdioid, setSelectedStdioIds)}
                      className="mt-0.5 rounded border-neutral-200 dark:border-neutral-700"
                    />
                    <span
                      className={cn(
                        "px-2 py-0.5 text-xs font-medium rounded flex-shrink-0 uppercase",
                        msg.stream === "stderr"
                          ? "bg-red-500/20 text-red-500"
                          : "bg-blue-500/20 text-blue-500",
                      )}
                    >
                      {msg.stream}
                    </span>
                    <pre className="text-sm text-neutral-900 dark:text-neutral-100 flex-1 font-mono break-all overflow-hidden whitespace-pre-wrap">
                      {msg.data}
                    </pre>
                  </label>
                ))}
            </div>
          )}

          {activeTab === "page" && (
            <div className="p-4 h-full overflow-auto">
              {!pageInfo ? (
                <div className="flex items-center justify-center py-12">
                  <Loader2 className="w-6 h-6 animate-spin text-neutral-500 dark:text-neutral-400" />
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-start gap-3 p-3 rounded-md bg-neutral-100 dark:bg-white/[0.06] border border-neutral-200 dark:border-white/10">
                    <Globe className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <div className="flex-1 min-w-0 space-y-3">
                      <div>
                        <div className="text-xs font-medium text-neutral-500 dark:text-neutral-400 mb-1">URL</div>
                        <div className="text-sm text-neutral-900 dark:text-neutral-50 font-mono break-all">
                          {pageInfo.url}
                        </div>
                      </div>
                      <div>
                        <div className="text-xs font-medium text-neutral-500 dark:text-neutral-400 mb-1">Title</div>
                        <div className="text-sm text-neutral-900 dark:text-neutral-50">{pageInfo.title}</div>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <div className="text-xs font-medium text-neutral-500 dark:text-neutral-400 mb-1">
                            Viewport
                          </div>
                          <div className="text-sm text-neutral-900 dark:text-neutral-50">
                            {pageInfo.viewport.width} × {pageInfo.viewport.height}
                          </div>
                        </div>
                        <div>
                          <div className="text-xs font-medium text-neutral-500 dark:text-neutral-400 mb-1">
                            Language
                          </div>
                          <div className="text-sm text-neutral-900 dark:text-neutral-50">{pageInfo.language}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === "performance" && (
            <div className="p-4 h-full overflow-auto">
              {!pageInfo?.performance ? (
                <div className="flex items-center justify-center py-12">
                  <Loader2 className="w-6 h-6 animate-spin text-neutral-500 dark:text-neutral-400" />
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2 text-sm text-neutral-500 dark:text-neutral-400">
                      <Gauge className="w-4 h-4 text-primary flex-shrink-0" />
                      Web performance metrics for this page's initial load
                    </div>
                    <button
                      type="button"
                      onClick={() => window.location.reload()}
                      title="Reloads the page to take a fresh measurement — these metrics are tied to page navigation and can't be recomputed without one"
                      className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-md border border-neutral-200 dark:border-white/10 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-white/[0.06] transition-colors flex-shrink-0"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      Re-run
                    </button>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    {(() => {
                      const makeOnFix = (
                        label: string,
                        description: string,
                        value: number | null,
                        rating: MetricRating | undefined,
                        unit: string,
                        detail?: string,
                      ) =>
                        value !== null && rating && rating !== "good" && onSubmitToAgent
                          ? () => {
                              onSubmitToAgent(
                                buildPerfFixPrompt({
                                  label,
                                  description,
                                  value,
                                  unit,
                                  rating,
                                  url: pageInfo.url,
                                  detail,
                                }),
                              );
                              onOpenChange(false);
                            }
                          : undefined;

                      const lcpRating = rateMetric("lcp", pageInfo.performance.lcp);
                      const fcpRating = rateMetric("fcp", pageInfo.performance.fcp);
                      const ttfbRating = rateMetric("ttfb", pageInfo.performance.ttfb);
                      const clsRating = rateMetric("cls", pageInfo.performance.cls);

                      return (
                        <>
                          <PerfMetricCard
                            label="LCP"
                            description="Largest Contentful Paint"
                            value={pageInfo.performance.lcp}
                            rating={lcpRating}
                            detail={pageInfo.performance.lcpElement ?? undefined}
                            onFix={makeOnFix(
                              "LCP",
                              "Largest Contentful Paint",
                              pageInfo.performance.lcp,
                              lcpRating,
                              "ms",
                              pageInfo.performance.lcpElement ?? undefined,
                            )}
                          />
                          <PerfMetricCard
                            label="FCP"
                            description="First Contentful Paint"
                            value={pageInfo.performance.fcp}
                            rating={fcpRating}
                            onFix={makeOnFix("FCP", "First Contentful Paint", pageInfo.performance.fcp, fcpRating, "ms")}
                          />
                          <PerfMetricCard
                            label="TTFB"
                            description="Time to First Byte"
                            value={pageInfo.performance.ttfb}
                            rating={ttfbRating}
                            onFix={makeOnFix("TTFB", "Time to First Byte", pageInfo.performance.ttfb, ttfbRating, "ms")}
                          />
                          <PerfMetricCard
                            label="CLS"
                            description="Cumulative Layout Shift"
                            value={pageInfo.performance.cls}
                            rating={clsRating}
                            unit=""
                            onFix={makeOnFix("CLS", "Cumulative Layout Shift", pageInfo.performance.cls, clsRating, "")}
                          />
                          <PerfMetricCard
                            label="DOMContentLoaded"
                            description="Navigation start → DOM ready"
                            value={pageInfo.performance.domContentLoaded}
                          />
                          <PerfMetricCard
                            label="Page Load Time"
                            description="Navigation start → load event"
                            value={pageInfo.performance.pageLoadTime}
                          />
                        </>
                      );
                    })()}
                  </div>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400">
                    Metrics reflect this page's initial navigation, not client-side route changes. Ratings use
                    Google's Core Web Vitals thresholds where available.
                  </p>
                </div>
              )}
            </div>
          )}

          {activeTab === "routes" && (
            <div className="p-4 h-full overflow-auto">
              {routeTree.loading ? (
                <div className="flex items-center justify-center py-12">
                  <Loader2 className="w-6 h-6 animate-spin text-neutral-500 dark:text-neutral-400" />
                </div>
              ) : !routeTree.ok ? (
                <div className="text-center py-12">
                  <p className="text-sm text-neutral-500 dark:text-neutral-400">
                    {routeTree.reason ?? "Could not extract a route tree for this page."}
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2 flex-wrap">
                    <div className="flex items-center gap-2 text-sm text-neutral-500 dark:text-neutral-400">
                      <Sparkles className="w-4 h-4 text-primary flex-shrink-0" />
                      React Router navigation tree — extracted live from this page's fiber tree
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <button
                        type="button"
                        onClick={() => routePerf.runAll(publicRoutePaths)}
                        disabled={routePerf.isRunningAll || publicRoutePaths.length === 0}
                        title="Reload into every public route (no login required), one at a time, and measure real performance metrics — returns to the current page when done. Run this while logged OUT."
                        className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-md border border-neutral-200 dark:border-white/10 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-white/[0.06] transition-colors disabled:opacity-50"
                      >
                        {routePerf.isRunningAll ? (
                          <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        ) : (
                          <Zap className="w-3.5 h-3.5" />
                        )}
                        Test Public Routes
                      </button>
                      <button
                        type="button"
                        onClick={() => routePerf.runAll(protectedRoutePaths)}
                        disabled={routePerf.isRunningAll || protectedRoutePaths.length === 0}
                        title="Reload into every route that needs an authenticated session, one at a time — make sure you're logged IN first, or these will just redirect to login."
                        className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-md border border-neutral-200 dark:border-white/10 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-white/[0.06] transition-colors disabled:opacity-50"
                      >
                        {routePerf.isRunningAll ? (
                          <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        ) : (
                          <Zap className="w-3.5 h-3.5" />
                        )}
                        Test Protected Routes ({protectedRoutePaths.length})
                      </button>
                    </div>
                  </div>
                  <div className="rounded-md border border-neutral-200 dark:border-white/10 divide-y divide-neutral-200/50 dark:divide-white/5">
                    {routeTree.tree.map((node, i) => (
                      <RouteTreeItem
                        key={i}
                        node={node}
                        depth={0}
                        basePath=""
                        underGuard={false}
                        results={routePerf.results}
                        onRunTest={routePerf.runTest}
                        onSubmitToAgent={onSubmitToAgent}
                        onOpenChange={onOpenChange}
                      />
                    ))}
                  </div>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400">
                    Only reflects the branch currently resolved for this session (e.g. lazy-loaded route names
                    appear only once that route has been visited). Guard vs. layout is a naming heuristic, not
                    certain — verify before relying on it. "Test" reloads the page into that route (like the
                    Performance tab's "Re-run" button) to get real, fresh metrics rather than stale/duplicated
                    values from the original load. Routes with dynamic segments (<code>:id</code>) or catch-alls
                    aren't directly testable since there's no real param value to substitute. Routes marked
                    "requires login" are grouped separately since testing them in the wrong auth state just
                    redirects instead of measuring the intended route — if a test does get redirected anyway,
                    it's flagged rather than silently recorded under the wrong route.
                  </p>
                </div>
              )}
            </div>
          )}

          {activeTab === "bugs" && (
            <div className="p-4 h-full overflow-auto">
              {collab.reports.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-sm text-neutral-500 dark:text-neutral-400">
                    No bug reports or corrections yet. Testers can submit them from the "Report a bug" / "Submit
                    correction" buttons on the inspector bar.
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm text-neutral-500 dark:text-neutral-400">
                    <Bug className="w-4 h-4 text-primary flex-shrink-0" />
                    Bug reports & UI corrections submitted by testers, shared across everyone pointed at this
                    collab hub
                  </div>
                  <div className="rounded-md border border-neutral-200 dark:border-white/10 divide-y divide-neutral-200/50 dark:divide-white/5">
                    {collab.reports
                      .slice()
                      .reverse()
                      .map((report) => (
                        <div key={report.id} className="p-3 space-y-1.5">
                          <div className="flex items-center gap-2">
                            <span
                              className={cn(
                                "px-1.5 py-0.5 text-[10px] font-medium rounded uppercase tracking-wide",
                                report.type === "bug"
                                  ? "bg-rose-500/15 text-rose-600 dark:text-rose-300"
                                  : "bg-violet-500/15 text-violet-600 dark:text-violet-300",
                              )}
                            >
                              {report.type}
                            </span>
                            <span className="text-[10px] text-neutral-500 dark:text-neutral-400 capitalize">
                              {report.status.replace("_", " ")}
                            </span>
                            <span className="text-xs font-mono text-neutral-500 dark:text-neutral-400 truncate">
                              {report.selector}
                            </span>
                            {report.status !== "resolved" && (
                              <div className="ml-auto flex items-center gap-1.5 flex-shrink-0">
                                <button
                                  type="button"
                                  onClick={() => {
                                    collab.updateReport(report.id, { status: "in_progress" });
                                    const prompt =
                                      report.type === "correction"
                                        ? buildCorrectionPrompt(report, window.location.href)
                                        : buildBugReportPrompt(report, window.location.href);
                                    onSubmitToAgent?.(prompt);
                                    onOpenChange(false);
                                  }}
                                  className="flex items-center gap-1 px-2 py-0.5 text-[10px] font-medium rounded border border-violet-500/30 bg-violet-500/10 text-violet-600 dark:text-violet-300 hover:bg-violet-500/20 transition-colors"
                                >
                                  <Sparkles className="w-3 h-3" />
                                  Resolve with AI
                                </button>
                                <button
                                  type="button"
                                  onClick={() =>
                                    collab.updateReport(report.id, { status: "resolved", resolvedBy: collabRole })
                                  }
                                  className="flex items-center gap-1 px-2 py-0.5 text-[10px] font-medium rounded border border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-300 hover:bg-emerald-500/20 transition-colors"
                                >
                                  <Check className="w-3 h-3" />
                                  Mark resolved
                                </button>
                              </div>
                            )}
                          </div>
                          {report.description && (
                            <p className="text-xs text-neutral-700 dark:text-neutral-300 whitespace-pre-wrap">
                              {report.description}
                            </p>
                          )}
                        </div>
                      ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
