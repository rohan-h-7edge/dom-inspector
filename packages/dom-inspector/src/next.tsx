"use client";

import { useEffect } from "react";

interface DomInspectorProps {
  host?: string;
  port?: string | number;
  /**
   * Full public reachable base URL including protocol.
   * If provided, it overrides host/port and will be used for loading inspector assets and API calls.
   * @example "https://your-domain.com"
   */
  baseUrl?: string;
  /**
   * Disable Chrome DevTools integration
   * @default true
   */
  disableChrome?: boolean;
}

export function DomInspector({
  host = "localhost",
  port = "6137",
  baseUrl,
  disableChrome = true,
}: DomInspectorProps) {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if ((window as any).__DOM_INSPECTOR_LOADED__) return;
    (window as any).__DOM_INSPECTOR_LOADED__ = true;

    const inspector = document.createElement("dom-inspector-mcp");
    document.body.appendChild(inspector);

    (window as any).__DOM_INSPECTOR_CONFIG__ = {
      host,
      port: String(port),
      base: "/",
      baseUrl: baseUrl,
      disableChrome: disableChrome,
    };

    const resolvedBaseUrl = (baseUrl || `http://${host}:${port}`).replace(/\/$/, "");

    const script = document.createElement("script");
    script.src = `${resolvedBaseUrl}/__inspector__/inspector.js`;
    script.type = "module";
    document.head.appendChild(script);
  }, [host, port, baseUrl, disableChrome]);

  return null;
}

export default DomInspector;
