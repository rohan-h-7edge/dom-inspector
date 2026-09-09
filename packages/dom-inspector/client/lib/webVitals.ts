/** Shared Performance-API helpers used by both the whole-page Performance tab
 * (usePageInfo) and per-route performance tests (useRoutePerformanceTest). */

export function getNavigationEntry(): PerformanceNavigationTiming | null {
  const [nav] = performance.getEntriesByType("navigation") as PerformanceNavigationTiming[];
  return nav ?? null;
}

/** Time to First Byte: navigation start -> first byte of the response, in ms.
 * There is only ever one navigation entry per hard page load, so this value is
 * identical no matter when during the page's life it's read. */
export function getTtfb(): number | null {
  const nav = getNavigationEntry();
  return nav && nav.responseStart > 0 ? Math.round(nav.responseStart - nav.startTime) : null;
}

/** Time from navigation start to DOMContentLoaded, in ms (same caveat as getTtfb). */
export function getDomContentLoaded(): number | null {
  const nav = getNavigationEntry();
  return nav && nav.domContentLoadedEventEnd > 0
    ? Math.round(nav.domContentLoadedEventEnd - nav.startTime)
    : null;
}

/** Time from navigation start to the load event, in ms (same caveat as getTtfb). */
export function getPageLoadTime(): number | null {
  const nav = getNavigationEntry();
  if (nav && nav.loadEventEnd > 0) {
    return Math.round(nav.loadEventEnd - nav.startTime);
  }
  return document.readyState === "complete" && performance.timing?.loadEventEnd
    ? performance.timing.loadEventEnd - performance.timing.navigationStart
    : null;
}

/** First Contentful Paint, in ms — only ever reported once per hard page load. */
export function getFcp(): number | null {
  const paintEntries = performance.getEntriesByType("paint");
  const fcpEntry = paintEntries.find((entry) => entry.name === "first-contentful-paint");
  return fcpEntry ? Math.round(fcpEntry.startTime) : null;
}

export function describeElement(el: Element | undefined): string | null {
  if (!el) return null;
  const id = el.id ? `#${el.id}` : "";
  const cls =
    el.className && typeof el.className === "string" ? `.${el.className.trim().split(/\s+/).join(".")}` : "";
  return `${el.tagName.toLowerCase()}${id}${cls}`;
}
