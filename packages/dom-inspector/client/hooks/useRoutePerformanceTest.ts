import { useCallback, useEffect, useRef, useState } from "react";
import type { PerformanceMetrics } from "../types";
import { getTtfb, getDomContentLoaded, getPageLoadTime, getFcp, describeElement } from "../lib/webVitals";

export interface RoutePerfResult {
  status: "running" | "done" | "redirected";
  metrics: PerformanceMetrics | null;
  /** Only set when status is "redirected": where the app actually sent us
   * instead — e.g. an auth guard bounced us to /login because this route
   * needed a session we didn't have (or vice versa). The captured metrics
   * describe whatever page we landed on, not the intended route, so they're
   * not stored as that route's result. */
  redirectedTo?: string;
}

// Persistent, per-tab accumulation of every route tested this session — a real
// hard reload wipes all JS state, so results have to live outside of it.
const RESULTS_KEY = "dom-inspector:route-perf-results";
// Ephemeral — only present while a navigation-triggered capture is in flight.
const PENDING_KEY = "dom-inspector:route-perf-pending";

// After the `load` event, how long the page must go quiet — no DOM mutations
// AND no in-flight fetch/XHR requests — before it's considered actually done.
// `load` only means the initial HTML/scripts/images resolved, not that a
// data-fetching SPA has finished loading its data and rendering real content.
const QUIET_MS = 600;
// Upper bound on the quiet-wait above, in case something on the page never
// fully settles (polling, an open websocket, animations) — keeps "Test All
// Routes" from hanging forever on one route.
const MAX_SETTLE_MS = 8000;

/** Tracks in-flight `fetch`/`XMLHttpRequest` calls by monkey-patching them for
 * the duration of one route's measurement. A loading spinner is very often a
 * single DOM mutation (it mounts, then just sits there animating via CSS)
 * followed by a much later one when real data arrives and replaces it — pure
 * DOM-mutation quiet-detection can't tell "waiting on a slow fetch" apart from
 * "actually done" in that window, so this is the other half of the signal:
 * the same "network idle" heuristic tools like Puppeteer use. */
function trackNetworkActivity(onChange: () => void) {
  let pending = 0;

  const originalFetch = window.fetch?.bind(window);
  if (originalFetch) {
    window.fetch = ((...args: Parameters<typeof fetch>) => {
      pending++;
      onChange(); // a request just started — cancel any in-flight quiet timer
      return originalFetch(...args).finally(() => {
        pending--;
        onChange();
      });
    }) as typeof window.fetch;
  }

  const XHR = window.XMLHttpRequest;
  const originalSend = XHR?.prototype.send;
  if (originalSend) {
    XHR.prototype.send = function (this: XMLHttpRequest, ...args: unknown[]) {
      pending++;
      onChange();
      const done = () => {
        pending--;
        onChange();
      };
      this.addEventListener("loadend", done, { once: true });
      return originalSend.apply(this, args as Parameters<typeof originalSend>);
    };
  }

  return {
    isIdle: () => pending === 0,
    restore: () => {
      if (originalFetch) window.fetch = originalFetch;
      if (originalSend) XHR.prototype.send = originalSend;
    },
  };
}

interface PendingState {
  mode: "single" | "all";
  /** Remaining paths still to test, in order (not including currentPath). */
  queue: string[];
  /** The path this exact page load is supposed to measure. */
  currentPath: string;
  /** Where to return to once a "test all" run finishes. */
  returnTo: string;
}

function readResults(): Record<string, PerformanceMetrics> {
  try {
    const raw = sessionStorage.getItem(RESULTS_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function writeResults(results: Record<string, PerformanceMetrics>) {
  try {
    sessionStorage.setItem(RESULTS_KEY, JSON.stringify(results));
  } catch {
    // sessionStorage unavailable
  }
}

function readPending(): PendingState | null {
  try {
    const raw = sessionStorage.getItem(PENDING_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function writePending(state: PendingState | null) {
  try {
    if (state) sessionStorage.setItem(PENDING_KEY, JSON.stringify(state));
    else sessionStorage.removeItem(PENDING_KEY);
  } catch {
    // sessionStorage unavailable
  }
}

function currentLocation(): string {
  return window.location.pathname + window.location.search + window.location.hash;
}

/** Resolves once the page has gone quiet — no DOM mutations AND no in-flight
 * fetch/XHR requests — for QUIET_MS, *after having seen at least one mutation
 * or request*. i.e. it waits for the app to actually start doing something,
 * then for it to finish. Critically, the quiet timer is NOT armed up front:
 * right after `load`, a still-downloading/parsing JS bundle can leave the page
 * completely untouched for a little while, and that silence must not be
 * mistaken for "already finished." Only the MAX_SETTLE_MS hard cap can resolve
 * this before any activity is seen at all, as a safety net for a genuinely
 * static page (or one with a request/animation that never actually finishes). */
function waitForPageSettle(): Promise<void> {
  return new Promise((resolve) => {
    let settled = false;
    let quietTimer: ReturnType<typeof setTimeout> | null = null;
    const network = trackNetworkActivity(() => armIfIdle());

    const finish = () => {
      if (settled) return;
      settled = true;
      observer.disconnect();
      network.restore();
      if (quietTimer) clearTimeout(quietTimer);
      clearTimeout(maxTimer);
      resolve();
    };

    const armIfIdle = () => {
      if (quietTimer) clearTimeout(quietTimer);
      if (network.isIdle()) {
        quietTimer = setTimeout(finish, QUIET_MS);
      }
      // else: a request just started — stay quiet until it (and any DOM
      // mutation it causes) settles, rearmed by the next activity/mutation.
    };

    const observer = new MutationObserver(armIfIdle);
    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      characterData: true,
    });
    const maxTimer = setTimeout(finish, MAX_SETTLE_MS);
  });
}

/** Waits for the page's `load` event (if it hasn't already fired), then for
 * the page to actually go quiet — `load` only means the initial HTML/scripts/
 * images resolved, not that a data-fetching SPA has finished loading its data
 * and rendering real content in place of a loading state. Because this runs
 * after a REAL hard navigation (not a client-side route swap), the browser's
 * Performance APIs behave exactly as they do for the Performance tab's own
 * "Re-run" button — fresh, correct values for TTFB, FCP, LCP,
 * DOMContentLoaded, Page Load Time, and CLS, specific to this one route. */
function waitForLoadAndSettle(): Promise<void> {
  return new Promise((resolve) => {
    const afterLoad = () => {
      waitForPageSettle().then(resolve);
    };
    if (document.readyState === "complete") {
      afterLoad();
    } else {
      window.addEventListener("load", afterLoad, { once: true });
    }
  });
}

function captureMetrics(): Promise<PerformanceMetrics> {
  return new Promise((resolve) => {
    let lcp: number | null = null;
    let lcpElement: string | null = null;
    let clsValue = 0;

    let lcpObserver: PerformanceObserver | null = null;
    try {
      lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries() as Array<PerformanceEntry & { element?: Element }>;
        const last = entries[entries.length - 1];
        if (last) {
          lcp = Math.round(last.startTime);
          lcpElement = describeElement(last.element);
        }
      });
      lcpObserver.observe({ type: "largest-contentful-paint", buffered: true });
    } catch {
      // LCP not supported in this browser
    }

    let clsObserver: PerformanceObserver | null = null;
    try {
      clsObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries() as Array<
          PerformanceEntry & { value: number; hadRecentInput: boolean }
        >) {
          if (!entry.hadRecentInput) clsValue += entry.value;
        }
      });
      clsObserver.observe({ type: "layout-shift", buffered: true });
    } catch {
      // layout-shift not supported in this browser
    }

    waitForLoadAndSettle().then(() => {
      lcpObserver?.disconnect();
      clsObserver?.disconnect();
      resolve({
        lcp,
        lcpElement,
        fcp: getFcp(),
        ttfb: getTtfb(),
        domContentLoaded: getDomContentLoaded(),
        pageLoadTime: getPageLoadTime(),
        cls: Math.round(clsValue * 1000) / 1000,
      });
    });
  });
}

/**
 * Runs the same performance metrics shown in the Performance tab (LCP, FCP,
 * TTFB, DOMContentLoaded, Page Load Time, CLS) against a single route — via a
 * REAL hard navigation (`window.location.href = path`), the same mechanism as
 * the Performance tab's own "Re-run" button. This is deliberate: a client-side
 * route swap can't produce trustworthy FCP/LCP (the browser only reports those
 * once per hard load, and stops collecting LCP candidates after the first user
 * input), so testing each route with an actual reload is the only way to get
 * fresh, correct values for all six metrics.
 *
 * Because a hard reload wipes all in-memory state, progress is persisted to
 * `sessionStorage`: which route this exact page load is meant to measure,
 * what's left in the queue for "test all", and results collected so far. On
 * mount, if a test was left pending by the reload that just happened, this
 * captures that route's metrics, saves them, and either continues to the next
 * queued route (reloading again) or — for "test all" — returns to wherever
 * the user started once every route has been measured.
 */
export function useRoutePerformanceTest() {
  const [results, setResults] = useState<Record<string, RoutePerfResult>>(() => {
    const out: Record<string, RoutePerfResult> = {};
    for (const [path, metrics] of Object.entries(readResults())) {
      out[path] = { status: "done", metrics };
    }
    const pending = readPending();
    if (pending) out[pending.currentPath] = { status: "running", metrics: null };
    return out;
  });
  const [isRunningAll, setIsRunningAll] = useState(() => readPending()?.mode === "all");
  const startedRef = useRef(false);

  useEffect(() => {
    if (startedRef.current) return;
    startedRef.current = true;

    const pending = readPending();
    if (!pending) return;

    captureMetrics().then((metrics) => {
      // If an auth guard (or anything else) bounced us somewhere other than
      // the route we meant to test, these metrics describe that other page,
      // not this one — don't attribute them to pending.currentPath.
      const landedPath = currentLocation();
      const redirected = landedPath !== pending.currentPath;
      const finishedResult: RoutePerfResult = redirected
        ? { status: "redirected", metrics, redirectedTo: landedPath }
        : { status: "done", metrics };

      if (!redirected) {
        writeResults({ ...readResults(), [pending.currentPath]: metrics });
      }

      if (pending.queue.length > 0) {
        const [nextPath, ...rest] = pending.queue;
        writePending({ ...pending, queue: rest, currentPath: nextPath });
        setResults((r) => ({
          ...r,
          [pending.currentPath]: finishedResult,
          [nextPath]: { status: "running", metrics: null },
        }));
        window.location.href = nextPath;
        return;
      }

      writePending(null);
      setIsRunningAll(false);
      setResults((r) => ({ ...r, [pending.currentPath]: finishedResult }));
      if (pending.mode === "all") {
        window.location.href = pending.returnTo;
      }
    });
  }, []);

  const runTest = useCallback((path: string) => {
    setResults((r) => ({ ...r, [path]: { status: "running", metrics: null } }));
    writePending({ mode: "single", queue: [], currentPath: path, returnTo: currentLocation() });
    window.location.href = path;
  }, []);

  const runAll = useCallback(
    (paths: string[]) => {
      if (paths.length === 0 || isRunningAll) return;
      const [first, ...rest] = paths;
      setIsRunningAll(true);
      setResults((r) => ({ ...r, [first]: { status: "running", metrics: null } }));
      writePending({ mode: "all", queue: rest, currentPath: first, returnTo: currentLocation() });
      window.location.href = first;
    },
    [isRunningAll],
  );

  return { results, runTest, runAll, isRunningAll };
}
