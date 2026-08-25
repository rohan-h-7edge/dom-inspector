import { createClientExecClient } from "@mcpc-tech/cmcp";
import { McpServer } from "@agentclientprotocol/sdk";
import { ChatStatus, UIMessage } from "ai";

//#region client/hooks/useMcp.d.ts
type McpClientType = ReturnType<typeof createClientExecClient>;
declare function useMcp(): {
  client: McpClientType | null;
  isClientReady: boolean;
};
//#endregion
//#region client/hooks/useAgent.d.ts
declare const useAgent: (defaultAgent: string) => {
  readonly agent: string;
  readonly setAgent: (newAgent: string) => void;
  readonly isReady: boolean;
};
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
//#region client/hooks/usePrompts.d.ts
declare function usePrompts(mcpClient: McpClientType | null): {
  prompts: Prompt[];
  isLoading: boolean;
};
//#endregion
//#region client/types.d.ts

interface ConsoleMessage {
  msgid: number;
  level: string;
  text: string;
  timestamp?: number;
}
interface NetworkRequest {
  reqid: number;
  method: string;
  url: string;
  status: string;
  timestamp?: number;
}
interface StdioMessage {
  stdioid: number;
  stream: "stdout" | "stderr";
  data: string;
  timestamp?: number;
}
interface PageInfo {
  url: string;
  title: string;
  viewport: {
    width: number;
    height: number;
  };
  language: string;
  scrollPosition?: {
    x: number;
    y: number;
  };
  documentSize?: {
    width: number;
    height: number;
  };
}
//#endregion
//#region client/hooks/useContextData.d.ts
interface ContextData {
  consoleMessages: ConsoleMessage[];
  networkRequests: NetworkRequest[];
  stdioMessages: StdioMessage[];
  loading: boolean;
  error: string | null;
}
/**
 * Hook to fetch and manage context data from chrome_devtools MCP tool
 * @param client - MCP client instance (passed from useMcp hook in parent component)
 * @param isClientReady - whether the client is ready
 * @param isEnabled - whether to enable data fetching (default: true)
 */
declare function useContextData(client: McpClientType | null, isClientReady: boolean, isEnabled?: boolean): {
  refresh: () => Promise<void>;
  consoleMessages: ConsoleMessage[];
  networkRequests: NetworkRequest[];
  stdioMessages: StdioMessage[];
  loading: boolean;
  error: string | null;
};
//#endregion
//#region client/hooks/useIslandState.d.ts
interface IslandContext {
  uiState: "expanded" | "collapsed";
  chatStatus: ChatStatus;
  toolName: string | null;
  displayText: string;
  isStreaming: boolean;
  lastMessage?: UIMessage;
}
/**
 * Derives the Dynamic Island state from AI SDK messages and status
 */
declare function useIslandState(messages: UIMessage[], status: ChatStatus, isExpanded: boolean): IslandContext;
//#endregion
//#region client/hooks/usePageInfo.d.ts
/**
 * Hook to capture current page information
 * KISS: Captures only essential page context (URL, title, viewport, language)
 */
declare function usePageInfo(): PageInfo | null;
//#endregion
//#region client/utils/config-loader.d.ts
/**
 * Get the dev server base URL from injected config.
 * Uses __DOM_INSPECTOR_CONFIG__ set by the plugin at build time.
 * Falls back to window.location.origin for sidebar pages.
 */
declare function getDevServerBaseUrl(): string;
/**
 * Get available agents (merged with custom configuration and filtered by visibleAgents)
 */
declare function getAvailableAgents(): Promise<Agent[]>;
//#endregion
export { type Agent, type ContextData, type McpClientType, type Prompt, getAvailableAgents, getDevServerBaseUrl, useAgent, useContextData, useIslandState, useMcp, usePageInfo, usePrompts };