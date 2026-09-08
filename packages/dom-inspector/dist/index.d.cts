import * as unplugin0 from "unplugin";
import { McpServer } from "@agentclientprotocol/sdk";

//#region src/utils/config-updater.d.ts
type EditorId = "cursor" | "vscode" | "windsurf" | "claude-code" | "antigravity";
interface CustomEditorConfig {
  id: string;
  name: string;
  /** Path to config directory (absolute, ~/relative, or project-relative) */
  configPath: string;
  configFileName: string;
  /** @default 'url' */
  serverUrlKey?: string;
  /** @default 'mcpServers' */
  configFormat?: "servers" | "mcpServers";
}
interface McpConfigOptions {
  /**
   * Auto-update MCP config for editors
   * - `true` or `'auto'`: Auto-detect editors
   * - `false`: Disable
   * - `EditorId[]`: Specific editors only
   * @default true
   */
  updateConfig?: boolean | "auto" | EditorId[];
  /** @default 'dom-inspector' */
  updateConfigServerName?: string;
  updateConfigAdditionalServers?: Array<{
    name: string;
    url: string;
  }>;
  customEditors?: CustomEditorConfig[];
}
//#endregion
//#region client/constants/types.d.ts
/**
 * MCP Server configuration for the Agent Client Protocol
 * Re-exported from @agentclientprotocol/sdk for convenience
 */
type McpServer$1 = McpServer;
/**
 * ACP (Agent Client Protocol) options for configuring agent behavior
 */
interface AcpOptions {
  /**
   * ACP provider mode
   * @default undefined (skipped if not specified)
   */
  acpMode?: string;
  /**
   * ACP provider model
   * @default undefined (skipped if not specified)
   */
  acpModel?: string;
  /**
   * Delay in milliseconds after session is initialized to ensure mcp server is ready,
   * some agents may connect mcp asynchronously after session init
   * @default undefined (skipped if not specified)
   */
  acpDelay?: number;
  /**
   * Custom system instructions to prepend to user messages
   * @default undefined (uses built-in DomInspector context)
   */
  acpSystemPrompt?: string;
  /**
   * List of MCP (Model Context Protocol) servers the agent should connect to
   * @default []
   */
  mcpServers?: McpServer$1[];
}
interface Agent extends AcpOptions {
  name: string;
  command: string;
  args?: string[];
  env: Array<{
    key: string;
    required: boolean;
    default?: string;
  }>;
  authMethodId?: string;
  meta?: {
    icon?: string;
  };
  /**
   * Configuration hint text to help users set up the agent
   */
  configHint?: string;
  /**
   * Link to configuration documentation or setup guide
   */
  configLink?: string;
  /**
   * Installation command for the agent (shown in error messages)
   */
  installCommand?: string;
  /**
   * NPM package name for agents that use npm packages (for faster loading via require.resolve)
   */
  npmPackage?: string;
  /**
   * Arguments to pass when using npm package resolution (separate from npx args)
   */
  npmArgs?: string[];
}
/** MCP Prompt argument schema */
interface PromptArgument {
  name: string;
  description?: string;
  required?: boolean;
}
/** MCP Prompt definition (matches MCP spec + template extension) */
interface Prompt {
  name: string;
  title?: string;
  description?: string;
  /** The actual content/template to insert into the input when selected */
  template?: string;
  arguments?: PromptArgument[];
  icons?: Array<{
    src: string;
    mimeType?: string;
    sizes?: string[];
  }>;
}
//#endregion
//#region src/utils/create-plugin.d.ts
interface DomInspectorOptions extends McpConfigOptions, AcpOptions {
  /**
   * Enable/disable the plugin
   * @default true (automatically disabled in production)
   */
  enabled?: boolean;
  /**
   * Host address for the standalone server to bind to.
   * - `"localhost"` (default): Only accessible locally, avoids Mixed Content errors (HTTPS→HTTP allowed)
   * - `"0.0.0.0"` or `true`: Accessible from all network interfaces (useful for Docker, remote access)
   * - Custom hostname: Bind to specific interface
   * @default "localhost"
   * @example true
   */
  host?: string | boolean;
  /**
   * Custom port for MCP server URL
   * Useful when behind a proxy or port forwarding (e.g., Docker, SSH tunnels)
   * Can also be set via DOM_INSPECTOR_PORT environment variable
   * @default 6137
   * @example 6137
   */
  port?: number;
  /**
   * Public base URL (including protocol) that editors/browsers should use to reach the dev server.
   *
   * Use this when the dev server runs in a cloud IDE or behind a reverse proxy where the externally
   * reachable URL differs from the internal host/port.
   *
   * Common use cases:
   * - Cloud IDEs: Fly.io (`https://app-6137.fly.dev`), Gitpod, GitHub Codespaces
   * - Docker with port mapping
   * - Reverse proxy / tunnel (ngrok, cloudflared)
   *
   * If provided, it will be used for MCP config auto-update and console output.
   *
   * @example "https://my-app-6137.fly.dev"
   */
  publicBaseUrl?: string;
  /**
   * Custom agents configuration
   * If provided, these will be merged with or replace the default agents
   * @see AVAILABLE_AGENTS https://github.com/mcpc-tech/dom-inspector-mcp/blob/main/packages/unplugin-dom-inspector/client/constants/agents.ts
   */
  agents?: Agent[];
  /**
   * Custom prompts configuration
   * @example [{ name: 'debug', description: 'Debug this' }]
   */
  prompts?: Prompt[];
  /**
   * Filter which agents are visible in the UI
   * Only agents with names in this list will be shown (applies after merging custom agents)
   * If not specified or empty array, all agents are visible
   * @example ['Claude Code', 'Gemini CLI', 'My Custom Agent']
   */
  visibleAgents?: string[];
  /**
   * Configure which default built-in prompts to enable.
   * - `true` (default): Enable all built-in prompts.
   * - `false`: Disable all built-in prompts.
   * - `string[]`: Whitelist of specific prompt names to enable.
   * @default true
   */
  defaultPrompts?: boolean | string[];
  /**
   * Default agent name to use
   * @default "Claude Code"
   * @see https://github.com/mcpc-tech/dom-inspector-mcp/blob/main/packages/unplugin-dom-inspector/client/constants/agents.ts
   */
  defaultAgent?: string;
  /**
   * Auto-inject inspector into HTML files
   * Set to false for non-HTML projects (miniapps, library bundles)
   * @default true
   */
  autoInject?: boolean;
  /**
   * Custom virtual module name
   * Useful if the default name conflicts with your project
   * @default "virtual:dom-inspector-mcp"
   * @example "virtual:my-inspector" or "virtual:custom-mcp"
   */
  virtualModuleName?: string;
  /**
   * Automatically open browser with Chrome DevTools when dev server starts
   * Uses Chrome DevTools Protocol for full debugging capabilities (console, network, etc.)
   * @default false
   */
  autoOpenBrowser?: boolean;
  /**
   * Disable Chrome DevTools integration entirely (chrome_devtools tool + related prompts).
   * Can also be controlled via DOM_INSPECTOR_DISABLE_CHROME=1
   * @default true
   */
  disableChrome?: boolean;
  /**
   * Custom browser launch URL
   * If not specified, uses the MCP server URL (e.g., http://localhost:6137)
   * @example "http://localhost:3000/dashboard"
   */
  browserUrl?: string;
  /**
   * Whether to show the inspector bar UI
   * Set to false if you only want to use the editor integration
   * @default true
   */
  showInspectorBar?: boolean;
  /**
   * Entry file to safely inject the inspector import.
   * Useful when `autoInject: false` or when using a framework where HTML injection is insufficient.
   * Can also be set via `DOM_INSPECTOR_ENTRY` environment variable.
   *
   * @example "src/main.tsx"
   */
  entry?: string;
}
//#endregion
//#region src/core.d.ts
declare const unplugin: unplugin0.UnpluginInstance<DomInspectorOptions | undefined, boolean>;
//#endregion
//#region src/core-external.d.ts
declare const unpluginExternal: unplugin0.UnpluginInstance<DomInspectorOptions | undefined, boolean>;
//#endregion
//#region src/turbopack.d.ts
interface TurbopackDomInspectorOptions extends DomInspectorOptions {
  /**
   * Enable/disable the plugin
   * @default true in development
   */
  enabled?: boolean;
}
/**
 * Returns the Turbopack rules config for dom-inspector.
 *
 * Usage in next.config.ts:
 * ```ts
 * const nextConfig: NextConfig = {
 *   turbopack: {
 *     rules: turbopackDomInspector()
 *   }
 * }
 * ```
 */
declare function turbopackDomInspector(options?: TurbopackDomInspectorOptions): any;
//#endregion
//#region src/index.d.ts
declare const external: unplugin0.UnpluginInstance<DomInspectorOptions | undefined, boolean>;
declare module "virtual:dom-inspector-mcp" {}
//#endregion
export { type CustomEditorConfig, type DomInspectorOptions, type EditorId, type McpConfigOptions, type TurbopackDomInspectorOptions, unplugin as default, unplugin, external, turbopackDomInspector, unpluginExternal };