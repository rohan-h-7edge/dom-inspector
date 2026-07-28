import { transformCode } from "@code-inspector/core";

//#region src/loader.ts
function domInspectorLoader(source) {
	if (!((this.getOptions() || {}).enabled ?? false)) return source;
	const resourcePath = this.resourcePath;
	const isJsx = resourcePath.match(/\.(jsx|tsx|js|ts|mjs|mts)$/);
	const isVue = resourcePath.match(/\.vue$/);
	const isSvelte = resourcePath.match(/\.svelte$/);
	if (isJsx || isVue || isSvelte) try {
		return transformCode({
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
export { domInspectorLoader as default, raw };