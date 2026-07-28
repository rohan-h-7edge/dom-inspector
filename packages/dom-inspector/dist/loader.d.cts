import { LoaderContext } from "webpack";

//#region src/loader.d.ts

interface DomInspectorLoaderOptions {
  /**
   * Enable/disable the loader
   * @default true in development, false in production
   */
  enabled?: boolean;
}
declare function domInspectorLoader(this: LoaderContext<DomInspectorLoaderOptions>, source: string): string;
declare const raw = false;
//#endregion
export { DomInspectorLoaderOptions, domInspectorLoader as default, raw };