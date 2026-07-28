//#region src/next.d.ts
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
declare function DomInspector({
  host,
  port,
  baseUrl,
  disableChrome
}: DomInspectorProps): null;
//#endregion
export { DomInspector, DomInspector as default };