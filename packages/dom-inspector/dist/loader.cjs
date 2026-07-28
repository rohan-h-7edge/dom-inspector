Object.defineProperty(exports, '__esModule', { value: true });
const require_chunk = require('./chunk.cjs');
let __code_inspector_core = require("@code-inspector/core");
__code_inspector_core = require_chunk.__toESM(__code_inspector_core);

//#region src/loader.ts
function domInspectorLoader(source) {
	if (!((this.getOptions() || {}).enabled ?? false)) return source;
	const resourcePath = this.resourcePath;
	const isJsx = resourcePath.match(/\.(jsx|tsx|js|ts|mjs|mts)$/);
	const isVue = resourcePath.match(/\.vue$/);
	const isSvelte = resourcePath.match(/\.svelte$/);
	if (isJsx || isVue || isSvelte) try {
		return (0, __code_inspector_core.transformCode)({
			content: source,
			filePath: resourcePath,
			fileType: isJsx ? "jsx" : isVue ? "vue" : "svelte",
			escapeTags: [],
			pathType: "absolute"
		});
	} catch (error) {
		console.error(`[dom-inspector-loader] Failed to transform ${resourcePath}:`, error);
	}
	return source;
}
const raw = false;

//#endregion
exports.default = domInspectorLoader;
exports.raw = raw;