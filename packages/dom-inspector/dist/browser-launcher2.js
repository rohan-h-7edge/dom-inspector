import { n as isChromeDisabled, o as registerCleanupHandler } from "./helpers.js";
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { SSEClientTransport } from "@modelcontextprotocol/sdk/client/sse.js";

//#region src/utils/browser-launcher.ts
let sharedClient = null;
let sharedSseUrl = null;
let connectPromise = null;
let cleanupRegistered = false;
async function closeSharedClient(reason) {
	const clientToClose = sharedClient;
	sharedClient = null;
	sharedSseUrl = null;
	connectPromise = null;
	if (!clientToClose) return;
	try {
		console.log(`[dom-inspector] Closing shared browser client: ${reason}`);
		await clientToClose.close();
	} catch {}
}
function registerProcessCleanupOnce() {
	if (cleanupRegistered) return;
	cleanupRegistered = true;
	registerCleanupHandler("browser-client", async () => {
		await closeSharedClient("shutdown");
	});
}
async function getOrCreateClient(sseUrl) {
	if (sharedClient && sharedSseUrl === sseUrl) return sharedClient;
	if (connectPromise && sharedSseUrl === sseUrl) return connectPromise;
	if (sharedClient && sharedSseUrl !== sseUrl) await closeSharedClient("sseUrl-changed");
	sharedSseUrl = sseUrl;
	sharedClient = new Client({
		name: "dom-inspector-auto-browser",
		version: "1.0.0"
	});
	const transport = new SSEClientTransport(new URL(sseUrl));
	connectPromise = sharedClient.connect(transport).then(() => sharedClient).catch(async (error) => {
		await closeSharedClient("connect-failed");
		throw error;
	}).finally(() => {
		connectPromise = null;
	});
	registerProcessCleanupOnce();
	return connectPromise;
}
/**
* Launch browser via Chrome DevTools MCP
* Uses MCP Client to connect to the MCP server endpoint
*/
async function launchBrowserWithDevTools(options) {
	const { url, serverContext } = options;
	if (isChromeDisabled(serverContext.disableChrome)) {
		console.log(`[dom-inspector] 📴 Skipping browser launch: Chrome integration disabled (DOM_INSPECTOR_DISABLE_CHROME=1 or disableChrome: true)`);
		return false;
	}
	const sseUrl = `http://${serverContext.host === "0.0.0.0" ? "localhost" : serverContext.host || "localhost"}:${serverContext.port || 6137}/__mcp__/sse?clientId=browser-launcher-${process.pid}&isAutomated=true`;
	try {
		await (await getOrCreateClient(sseUrl)).callTool({
			name: "chrome_devtools",
			arguments: {
				tool: "chrome_navigate_page",
				args: { url }
			}
		});
		return true;
	} catch (error) {
		console.error(`[dom-inspector] ⚠️  Failed to auto-open browser:`, error instanceof Error ? error.message : String(error));
		return false;
	}
}

//#endregion
export { launchBrowserWithDevTools as t };