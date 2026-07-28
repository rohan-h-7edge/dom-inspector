"use client";


Object.defineProperty(exports, '__esModule', { value: true });
const require_chunk = require('./chunk.cjs');
let react = require("react");
react = require_chunk.__toESM(react);

//#region src/next.tsx
function DomInspector({ host = "localhost", port = "6137", baseUrl, disableChrome = true }) {
	(0, react.useEffect)(() => {
		if (typeof window === "undefined") return;
		if (window.__DOM_INSPECTOR_LOADED__) return;
		window.__DOM_INSPECTOR_LOADED__ = true;
		const inspector = document.createElement("dom-inspector-mcp");
		document.body.appendChild(inspector);
		window.__DOM_INSPECTOR_CONFIG__ = {
			host,
			port: String(port),
			base: "/",
			baseUrl,
			disableChrome
		};
		const resolvedBaseUrl = (baseUrl || `http://${host}:${port}`).replace(/\/$/, "");
		const script = document.createElement("script");
		script.src = `${resolvedBaseUrl}/__inspector__/inspector.js`;
		script.type = "module";
		document.head.appendChild(script);
	}, [
		host,
		port,
		baseUrl,
		disableChrome
	]);
	return null;
}
var next_default = DomInspector;

//#endregion
exports.DomInspector = DomInspector;
exports.default = next_default;