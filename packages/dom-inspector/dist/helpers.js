//#region src/utils/shutdown-manager.ts
const cleanupHandlers = /* @__PURE__ */ new Map();
let isShuttingDown = false;
let registered = false;
/**
* Register a cleanup handler to be called on shutdown.
* Handlers are executed in registration order.
*/
function registerCleanupHandler(name, handler) {
	cleanupHandlers.set(name, handler);
	ensureShutdownHooksRegistered();
}
/**
* Execute all cleanup handlers and exit.
*/
async function executeShutdown() {
	if (isShuttingDown) return;
	isShuttingDown = true;
	for (const [name, handler] of cleanupHandlers) try {
		await handler();
	} catch (err) {
		console.error(`[dom-inspector] Error in cleanup handler "${name}":`, err);
	}
	cleanupHandlers.clear();
	process.exit(0);
}
function ensureShutdownHooksRegistered() {
	if (registered) return;
	registered = true;
	const handleSignal = () => {
		executeShutdown();
	};
	process.once("SIGINT", handleSignal);
	process.once("SIGTERM", handleSignal);
	process.once("SIGHUP", handleSignal);
	process.once("beforeExit", () => {
		if (!isShuttingDown) executeShutdown();
	});
}

//#endregion
//#region src/utils/helpers.ts
/**
* Simple utility functions following KISS principle
*/
function stripTrailingSlash(url) {
	return url.replace(/\/+$/, "");
}
function isEnvTruthy(value) {
	if (!value) return false;
	const normalized = value.trim().toLowerCase();
	return normalized === "1" || normalized === "true" || normalized === "yes" || normalized === "on";
}
function isChromeDisabled(disableOption) {
	if (isEnvTruthy(process.env.DOM_INSPECTOR_DISABLE_CHROME)) return true;
	return disableOption ?? true;
}
function getPublicBaseUrl(options) {
	const fromEnv = process.env.DOM_INSPECTOR_PUBLIC_BASE_URL;
	if (fromEnv) return stripTrailingSlash(fromEnv);
	if (options?.publicBaseUrl) return stripTrailingSlash(options.publicBaseUrl);
	return `http://${options?.host || "localhost"}:${options?.port || 6137}`;
}
/**
* Recursively substitute environment variables in an object or array.
* Replaces strings like "{API_KEY}" with the value of process.env.API_KEY.
* If the environment variable is not defined, the original string is kept.
*/
function substituteEnvVars(value, env = process.env) {
	if (typeof value === "string") {
		const match = value.match(/^\{([a-zA-Z0-9_]+)\}$/);
		if (match) {
			const envValue = env[match[1]];
			if (envValue !== void 0) return envValue;
		}
		return value;
	}
	if (Array.isArray(value)) return value.map((item) => substituteEnvVars(item, env));
	if (typeof value === "object" && value !== null) {
		const result = {};
		for (const key in value) if (Object.prototype.hasOwnProperty.call(value, key)) result[key] = substituteEnvVars(value[key], env);
		return result;
	}
	return value;
}

//#endregion
export { substituteEnvVars as a, stripTrailingSlash as i, isChromeDisabled as n, registerCleanupHandler as o, isEnvTruthy as r, getPublicBaseUrl as t };