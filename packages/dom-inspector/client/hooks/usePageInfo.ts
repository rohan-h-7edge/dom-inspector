import { useState, useEffect, useRef } from "react";
import type { PageInfo, PerformanceMetrics } from "../types";

function getNavigationEntry(): PerformanceNavigationTiming | null {
  const [nav] = performance.getEntriesByType("navigation") as PerformanceNavigationTiming[];
  return nav ?? null;
}

/** Time to First Byte: navigation start -> first byte of the response, in ms */
function getTtfb(): number | null {
  const nav = getNavigationEntry();
  return nav && nav.responseStart > 0 ? Math.round(nav.responseStart - nav.startTime) : null;
}

/** Time from navigation start to DOMContentLoaded, in ms */
function getDomContentLoaded(): number | null {
  const nav = getNavigationEntry();
  return nav && nav.domContentLoadedEventEnd > 0
    ? Math.round(nav.domContentLoadedEventEnd - nav.startTime)
    : null;
}

/** Time from navigation start to the load event, in ms (null if the page hasn't finished loading yet) */
function getPageLoadTime(): number | null {
  const nav = getNavigationEntry();
  if (nav && nav.loadEventEnd > 0) {
    return Math.round(nav.loadEventEnd - nav.startTime);
  }
  return document.readyState === "complete" && performance.timing?.loadEventEnd
    ? performance.timing.loadEventEnd - performance.timing.navigationStart
    : null;
}

/** First Contentful Paint, in ms */
function getFcp(): number | null {
  const paintEntries = performance.getEntriesByType("paint");
  const fcpEntry = paintEntries.find((entry) => entry.name === "first-contentful-paint");
  return fcpEntry ? Math.round(fcpEntry.startTime) : null;
}

function describeElement(el: Element | undefined): string | null {
  if (!el) return null;
  const id = el.id ? `#${el.id}` : "";
  const cls = el.className && typeof el.className === "string" ? `.${el.className.trim().split(/\s+/).join(".")}` : "";
  return `${el.tagName.toLowerCase()}${id}${cls}`;
}

const EMPTY_METRICS: PerformanceMetrics = {
  lcp: null,
  lcpElement: null,
  fcp: null,
  ttfb: null,
  domContentLoaded: null,
  pageLoadTime: null,
  cls: null,
};

/**
 * Hook to capture current page information, including web performance metrics
 * (LCP, FCP, TTFB, DOMContentLoaded, page load time, CLS).
 *
 * @param active - Whether to capture/observe right now. Pass `false` while the
 * consumer (e.g. a dialog) is hidden to avoid holding stale data — re-passing
 * `true` re-runs the whole capture from scratch, so callers that only mount
 * once (like a permanently-rendered dialog whose visibility is toggled by a
 * prop rather than mount/unmount) still get a fresh snapshot each time they
 * become visible again.
 */
export function usePageInfo(active: boolean = true): PageInfo | null {
  const [pageInfo, setPageInfo] = useState<PageInfo | null>(null);
  const performanceRef = useRef<PerformanceMetrics>({ ...EMPTY_METRICS });

  useEffect(() => {
    if (!active) return;

    // Start every activation from a clean slate so old numbers (e.g. from the last
    // time this was open) can't linger behind fresh "Measuring…" placeholders.
    performanceRef.current = { ...EMPTY_METRICS };

    const capturePageInfo = (): PageInfo => ({
      url: window.location.href,
      title: document.title,
      viewport: {
        width: window.innerWidth,
        height: window.innerHeight,
      },
      language: document.documentElement.lang || navigator.language,
      performance: { ...performanceRef.current },
    });

    setPageInfo(capturePageInfo());

    // Update on viewport resize
    const handleResize = () => setPageInfo(capturePageInfo());
    window.addEventListener("resize", handleResize);

    // --- Largest Contentful Paint ---
    let lcpObserver: PerformanceObserver | null = null;
    try {
      lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries() as Array<PerformanceEntry & { element?: Element }>;
        const lastEntry = entries[entries.length - 1];
        if (lastEntry) {
          performanceRef.current = {
            ...performanceRef.current,
            lcp: Math.round(lastEntry.startTime),
            lcpElement: describeElement(lastEntry.element),
          };
          setPageInfo(capturePageInfo());
        }
      });
      lcpObserver.observe({ type: "largest-contentful-paint", buffered: true });
    } catch {
      // LCP not supported in this browser
    }

    // --- Cumulative Layout Shift ---
    let clsObserver: PerformanceObserver | null = null;
    let clsValue = 0;
    try {
      clsObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries() as Array<
          PerformanceEntry & { value: number; hadRecentInput: boolean }
        >) {
          if (!entry.hadRecentInput) {
            clsValue += entry.value;
          }
        }
        performanceRef.current = { ...performanceRef.current, cls: Math.round(clsValue * 1000) / 1000 };
        setPageInfo(capturePageInfo());
      });
      clsObserver.observe({ type: "layout-shift", buffered: true });
    } catch {
      // CLS not supported in this browser
    }

    // --- First Contentful Paint ---
    let fcpObserver: PerformanceObserver | null = null;
    const fcp = getFcp();
    if (fcp !== null) {
      performanceRef.current = { ...performanceRef.current, fcp };
    } else {
      try {
        fcpObserver = new PerformanceObserver(() => {
          const value = getFcp();
          if (value !== null) {
            performanceRef.current = { ...performanceRef.current, fcp: value };
            setPageInfo(capturePageInfo());
            fcpObserver?.disconnect();
          }
        });
        fcpObserver.observe({ type: "paint", buffered: true });
      } catch {
        // paint timing not supported in this browser
      }
    }

    // --- Navigation-timing metrics: TTFB, DOMContentLoaded, page load time ---
    let pollTimer: ReturnType<typeof setInterval> | null = null;

    const updateNavigationMetrics = () => {
      const ttfb = getTtfb();
      const domContentLoaded = getDomContentLoaded();
      const pageLoadTime = getPageLoadTime();

      if (ttfb !== null || domContentLoaded !== null || pageLoadTime !== null) {
        performanceRef.current = {
          ...performanceRef.current,
          ttfb: ttfb ?? performanceRef.current.ttfb,
          domContentLoaded: domContentLoaded ?? performanceRef.current.domContentLoaded,
          pageLoadTime: pageLoadTime ?? performanceRef.current.pageLoadTime,
        };
        setPageInfo(capturePageInfo());
      }

      if (pageLoadTime !== null && pollTimer) {
        clearInterval(pollTimer);
        pollTimer = null;
      }
    };

    updateNavigationMetrics();
    window.addEventListener("load", updateNavigationMetrics, { once: true });
    // loadEventEnd can still read 0 for a brief moment even after readyState is "complete" /
    // the load event has fired, so keep polling until it resolves.
    if (performanceRef.current.pageLoadTime === null) {
      pollTimer = setInterval(updateNavigationMetrics, 200);
    }

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("load", updateNavigationMetrics);
      if (pollTimer) clearInterval(pollTimer);
      lcpObserver?.disconnect();
      clsObserver?.disconnect();
      fcpObserver?.disconnect();
    };
  }, [active]);

  return pageInfo;
}
