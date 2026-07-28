Object.defineProperty(exports, '__esModule', { value: true });
const require_chunk = require('./chunk.cjs');
const require_helpers = require('./helpers.cjs');
const require_config_updater = require('./config-updater.cjs');
const require_browser_launcher = require('./browser-launcher2.cjs');
let path = require("path");
path = require_chunk.__toESM(path);
let __babel_parser = require("@babel/parser");
__babel_parser = require_chunk.__toESM(__babel_parser);
let magic_string = require("magic-string");
magic_string = require_chunk.__toESM(magic_string);
let node_module = require("node:module");
node_module = require_chunk.__toESM(node_module);
let node_url = require("node:url");
node_url = require_chunk.__toESM(node_url);
let node_path = require("node:path");
node_path = require_chunk.__toESM(node_path);
let unplugin = require("unplugin");
unplugin = require_chunk.__toESM(unplugin);
let __vue_compiler_sfc = require("@vue/compiler-sfc");
__vue_compiler_sfc = require_chunk.__toESM(__vue_compiler_sfc);
let svelte_compiler = require("svelte/compiler");
svelte_compiler = require_chunk.__toESM(svelte_compiler);
let __code_inspector_core = require("@code-inspector/core");
__code_inspector_core = require_chunk.__toESM(__code_inspector_core);

//#region src/utils/stdio-interceptor.ts
let originalStdoutWrite = null;
let originalStderrWrite = null;
let isIntercepting = false;
function toText(chunk) {
	return typeof chunk === "string" ? chunk : String(chunk);
}
function wrapWrite(stream, original) {
	return ((chunk, ...args) => {
		try {
			require_config_updater.addStdioLog(stream, toText(chunk));
		} catch {}
		return original(chunk, ...args);
	});
}
/**
* Initialize stdio interception
* Hooks into process.stdout.write and process.stderr.write
*/
function initStdioInterceptor() {
	if (isIntercepting) return;
	originalStdoutWrite = process.stdout.write.bind(process.stdout);
	originalStderrWrite = process.stderr.write.bind(process.stderr);
	process.stdout.write = wrapWrite("stdout", originalStdoutWrite);
	process.stderr.write = wrapWrite("stderr", originalStderrWrite);
	isIntercepting = true;
}

//#endregion
//#region src/utils/create-plugin.ts
const createDomInspectorPlugin = (name, transformFactory) => {
	return (0, unplugin.createUnplugin)((rawOptions = {}) => {
		const options = require_helpers.substituteEnvVars(rawOptions);
		const enabled = options.enabled ?? false;
		const virtualModuleName = options.virtualModuleName ?? "virtual:dom-inspector-mcp";
		const webpackModuleName = virtualModuleName.replace("virtual:", "");
		let viteCommand;
		let standaloneServerStarted = false;
		let resolvedHost = "localhost";
		let resolvedPort = options.port || require_config_updater.getDefaultPort();
		const transformImpl = transformFactory(options);
		const chromeDisabled = require_helpers.isChromeDisabled(options.disableChrome);
		const ensureStandaloneServer$1 = async (root, appUrl) => {
			if (standaloneServerStarted) return;
			standaloneServerStarted = true;
			const { server, host, port } = await require_config_updater.startStandaloneServer({
				port: options.port,
				host: options.host
			});
			resolvedHost = host;
			resolvedPort = port;
			const displayHost = host === "0.0.0.0" ? "localhost" : host;
			const publicBase = require_helpers.getPublicBaseUrl({
				publicBaseUrl: options.publicBaseUrl,
				host: displayHost,
				port
			});
			const baseUrl = `${publicBase}/__mcp__/sse`;
			console.log(`[dom-inspector] 📡 MCP: ${baseUrl}\n`);
			const serverContext = {
				host: resolvedHost,
				port: resolvedPort,
				appUrl: appUrl ?? options.browserUrl ?? publicBase,
				disableChrome: chromeDisabled,
				prompts: options.prompts,
				defaultPrompts: options.defaultPrompts
			};
			initStdioInterceptor();
			await require_config_updater.setupMcpMiddleware(server, serverContext);
			require_config_updater.setupAcpMiddleware(server, serverContext, {
				acpMode: options.acpMode,
				acpModel: options.acpModel,
				acpDelay: options.acpDelay,
				mcpServers: options.mcpServers
			});
			await require_config_updater.updateMcpConfigs(root, baseUrl, {
				updateConfig: options.updateConfig,
				updateConfigServerName: options.updateConfigServerName,
				updateConfigAdditionalServers: options.updateConfigAdditionalServers,
				customEditors: options.customEditors
			});
			if ((options.autoOpenBrowser ?? false) && !chromeDisabled) {
				const targetUrl = serverContext.appUrl ?? publicBase;
				setTimeout(async () => {
					if (await require_browser_launcher.launchBrowserWithDevTools({
						url: targetUrl,
						serverContext
					})) console.log(`[dom-inspector] 🌐 Browser opened: ${targetUrl}`);
					else console.log(`[dom-inspector] 💡 Use "launch_chrome_devtools" prompt to open browser manually.\n`);
				}, 1e3);
			} else if (chromeDisabled) console.log(`[dom-inspector] 📴 Chrome integration disabled (DOM_INSPECTOR_DISABLE_CHROME=1 or disableChrome: true)`);
			else {
				console.log(`[dom-inspector] ⚠️  autoOpenBrowser: false - Console/Network context unavailable`);
				console.log(`[dom-inspector] 💡 Use "launch_chrome_devtools" prompt or "chrome_devtools" tool to open browser manually.\n`);
			}
			require_config_updater.setupInspectorMiddleware(server, {
				...options,
				defaultPrompts: options.defaultPrompts ?? true
			});
		};
		const entryOption = process.env.DOM_INSPECTOR_ENTRY || options.entry;
		const resolvedEntry = entryOption ? path.default.resolve(process.cwd(), entryOption) : null;
		const transform = (code, id) => {
			if (!enabled) return null;
			if (viteCommand && viteCommand !== "serve") return null;
			if (resolvedEntry && id === resolvedEntry) {
				const injection = `import '${virtualModuleName}';\n`;
				const result = transformImpl(code, id);
				if (typeof result === "string") return injection + result;
				else if (result && typeof result === "object" && "code" in result) return {
					...result,
					code: injection + result.code
				};
				else return injection + code;
			}
			return transformImpl(code, id);
		};
		const createNoopVirtualModule = () => {
			return `
// Production build - no-op
export function registerInspectorTool(_tool) {
  // No-op in production
}
`;
		};
		return {
			name,
			enforce: "pre",
			resolveId(id) {
				if (id === virtualModuleName || id === webpackModuleName) return "\0" + virtualModuleName;
			},
			load(id) {
				if (id === "\0" + virtualModuleName) {
					if (!enabled || viteCommand === "build") return createNoopVirtualModule();
					const host = resolvedHost === "0.0.0.0" ? "localhost" : resolvedHost;
					const port = resolvedPort;
					const showInspectorBar = options.showInspectorBar ?? true;
					const publicBaseUrl = require_helpers.getPublicBaseUrl({
						publicBaseUrl: options.publicBaseUrl,
						host,
						port
					});
					const injectedBaseUrl = publicBaseUrl ? require_helpers.stripTrailingSlash(publicBaseUrl) : void 0;
					return `
// Development-only code - removed in production builds

// Global tools registry
if (typeof window !== 'undefined') {
  if (!window.__INSPECTOR_TOOLS__) {
    window.__INSPECTOR_TOOLS__ = [];
  }
  // Exposed for the inspector client to retrieve tools
  window.__getInspectorTools = () => window.__INSPECTOR_TOOLS__;
}

/**
 * Register a custom tool for the inspector
 * Only registers in development mode
 */
export function registerInspectorTool(tool) {
  // Skip in production (when bundler replaces import.meta.env.DEV with false)
  if (!import.meta.env.DEV) return;
  if (typeof window === 'undefined') return;
  
  window.__INSPECTOR_TOOLS__ = window.__INSPECTOR_TOOLS__ || [];
  window.__INSPECTOR_TOOLS__.push(tool);
}

if (typeof window !== 'undefined' && typeof document !== 'undefined') {
  // Skip if already loaded (e.g., by HTML injection)
  if (window.__DOM_INSPECTOR_LOADED__) {
    // Already initialized, skip
  } else {
    window.__DOM_INSPECTOR_LOADED__ = true;
    
    // Create inspector element
    const inspector = document.createElement('dom-inspector-mcp');
    document.body.appendChild(inspector);

    // Store dev server config globally
    window.__DOM_INSPECTOR_CONFIG__ = {
      host: '${host}',
      port: '${port}',
      base: '/',
      baseUrl: ${injectedBaseUrl ? `'${injectedBaseUrl.replace(/'/g, "\\'")}'` : "undefined"},
      showInspectorBar: ${showInspectorBar},
      disableChrome: ${chromeDisabled}
    };

    // Dynamically load inspector script
    const script = document.createElement('script');
    const config = window.__DOM_INSPECTOR_CONFIG__;
    let baseUrl = config.baseUrl || ('http://' + config.host + ':' + config.port + config.base);
    if (baseUrl.endsWith('/')) baseUrl = baseUrl.slice(0, -1);
    script.src = baseUrl + '/__inspector__/inspector.js';
    script.type = 'module';
    document.head.appendChild(script);
  }
}
`;
				}
			},
			transform,
			vite: {
				apply(_config, env) {
					viteCommand = env.command;
					return true;
				},
				transformIndexHtml: {
					order: "pre",
					handler(html, ctx) {
						if (!enabled) return html;
						if (viteCommand !== "serve") return html;
						if (!(options.autoInject ?? true)) return html;
						const host = resolvedHost === "0.0.0.0" ? "localhost" : resolvedHost;
						const port = resolvedPort;
						const base = ctx.server?.config.base ?? "/";
						const showInspectorBar = options.showInspectorBar ?? true;
						const publicBaseUrl = require_helpers.getPublicBaseUrl({
							publicBaseUrl: options.publicBaseUrl,
							host,
							port
						});
						return html.replace("</body>", `<dom-inspector-mcp></dom-inspector-mcp><script>
(function() {
  if (!window.__DOM_INSPECTOR_LOADED__) {
    window.__DOM_INSPECTOR_LOADED__ = true;
    window.__DOM_INSPECTOR_CONFIG__ = {
      host: '${host}',
      port: '${port}',
      base: '${base}',
      baseUrl: ${publicBaseUrl ? `'${publicBaseUrl.replace(/'/g, "\\'")}'` : "undefined"},
      showInspectorBar: ${showInspectorBar},
      disableChrome: ${chromeDisabled}
    };
    var script = document.createElement('script');
    var config = window.__DOM_INSPECTOR_CONFIG__;
    var baseUrl = config.baseUrl || ('http://' + config.host + ':' + config.port + (config.base || '/'));
    if (baseUrl.endsWith('/')) baseUrl = baseUrl.slice(0, -1);
    script.src = baseUrl + '/__inspector__/inspector.js';
    script.type = 'module';
    document.head.appendChild(script);
  }
})();
<\/script></body>`);
					}
				},
				async configureServer(server) {
					if (!enabled) return;
					const vitePort = server.config.server.port ?? 5173;
					const viteHost = typeof server.config.server.host === "string" ? server.config.server.host : "localhost";
					const appUrl = options.browserUrl ?? `http://${viteHost === "0.0.0.0" ? "localhost" : viteHost}:${vitePort}`;
					await ensureStandaloneServer$1(server.config.root, appUrl);
				}
			},
			webpack(compiler) {
				if (!enabled) return;
				if (compiler.options.mode !== "development") return;
				compiler.hooks.beforeCompile.tapAsync("UnpluginDomInspector", async (_params, callback) => {
					try {
						await ensureStandaloneServer$1(compiler.context);
						callback();
					} catch (e) {
						console.error("[dom-inspector] Failed to start standalone server:", e);
						callback();
					}
				});
			}
		};
	});
};

//#endregion
//#region src/utils/file-type-detector.ts
/**
* Detects the file type based on the file path extension
* @param id - The file path
* @returns The file type ('jsx' | 'vue' | 'svelte') or null if not supported
*/
function detectFileType(id) {
	if (id.match(/\.(jsx|tsx|js|ts|mjs|mts)$/)) return "jsx";
	if (id.match(/\.vue$/)) return "vue";
	if (id.match(/\.svelte$/)) return "svelte";
	return null;
}

//#endregion
//#region src/compiler/jsx-transform.ts
const traverse = (0, node_module.createRequire)(require("url").pathToFileURL(__filename).href)("@babel/traverse").default;
function normalizePath$2(id) {
	return id.split(node_path.default.sep).join("/");
}
const DATA_SOURCE_ATTR$2 = "data-source";
/**
* Check if JSX element name is a Fragment (React.Fragment, Fragment, or <>)
*/
function isFragment(name) {
	if (name.type === "JSXIdentifier") return name.name === "Fragment";
	if (name.type === "JSXMemberExpression") {
		const object = name.object;
		const property = name.property;
		return object.type === "JSXIdentifier" && object.name === "React" && property.type === "JSXIdentifier" && property.name === "Fragment";
	}
	return false;
}
/**
* Transform JSX/TSX code to inject data-source attributes for dev inspection.
*
* Handles:
* - Regular components: <Div>, <Button>
* - Member expressions: <Foo.Bar>, <Layout.Content>
* - Generic components: <Table<T>>, <Select<Option>>
* - Namespaced: <svg:rect>
*
* Skips:
* - Fragments: <>, <Fragment>, <React.Fragment>
* - Elements that already have data-source
* - Parse errors (returns null gracefully)
*/
function transformJSX({ code, id }) {
	if (!code.includes("<")) return null;
	let ast;
	try {
		ast = (0, __babel_parser.parse)(code, {
			sourceType: "module",
			plugins: [
				"jsx",
				"typescript",
				"decorators-legacy",
				"classProperties",
				"importMeta"
			],
			errorRecovery: true
		});
	} catch {
		return null;
	}
	const relativePath = normalizePath$2(node_path.default.relative(process.cwd(), id));
	const s = new magic_string.default(code);
	let hasModifications = false;
	try {
		traverse(ast, { JSXOpeningElement(path$6) {
			try {
				const node = path$6.node;
				if (!node.name || isFragment(node.name)) return;
				if (!node.loc?.start || !node.name.end) return;
				if (node.attributes?.some((attr$1) => attr$1.type === "JSXAttribute" && attr$1.name?.type === "JSXIdentifier" && attr$1.name.name === DATA_SOURCE_ATTR$2)) return;
				const { line, column } = node.loc.start;
				const sourceValue = `${relativePath}:${line}:${column}`;
				let insertPos;
				if (node.typeParameters?.end) insertPos = node.typeParameters.end;
				else if (node.name.end) insertPos = node.name.end;
				else return;
				if (insertPos < 0 || insertPos > code.length) return;
				const attr = ` ${DATA_SOURCE_ATTR$2}="${sourceValue}"`;
				s.appendLeft(insertPos, attr);
				hasModifications = true;
			} catch {}
		} });
	} catch {
		return null;
	}
	if (!hasModifications) return null;
	return {
		code: s.toString(),
		map: s.generateMap({ hires: true })
	};
}

//#endregion
//#region src/compiler/vue-transform.ts
function normalizePath$1(id) {
	return id.split(node_path.default.sep).join("/");
}
const DATA_SOURCE_ATTR$1 = "data-source";
function compileVue({ code, id }) {
	const relativePath = normalizePath$1(node_path.default.relative(process.cwd(), id));
	const { descriptor } = (0, __vue_compiler_sfc.parse)(code, {
		filename: id,
		sourceMap: true
	});
	if (!descriptor.template || !descriptor.template.ast) return null;
	const s = new magic_string.default(code);
	let hasModifications = false;
	function traverse$1(node) {
		if (node.type === 1) {
			if (!node.props.some((prop) => prop.type === 6 && prop.name === DATA_SOURCE_ATTR$1)) {
				const { line, column } = node.loc.start;
				const sourceValue = `${relativePath}:${line}:${column}`;
				const tagName = node.tag;
				const insertPos = node.loc.start.offset + 1 + tagName.length;
				s.prependLeft(insertPos, ` ${DATA_SOURCE_ATTR$1}="${sourceValue}"`);
				hasModifications = true;
			}
		}
		if (node.children) node.children.forEach(traverse$1);
	}
	traverse$1(descriptor.template.ast);
	if (!hasModifications) return null;
	return {
		code: s.toString(),
		map: s.generateMap({ hires: true })
	};
}

//#endregion
//#region src/compiler/svelte-transform.ts
function normalizePath(id) {
	return id.split(node_path.default.sep).join("/");
}
const DATA_SOURCE_ATTR = "data-source";
/**
* Transform Svelte code to inject data-source attributes for dev inspection.
*
* Handles:
* - Regular elements: <div>, <button>
* - Components: <Counter>, <MyComponent>
* - Svelte special elements: <svelte:window>, <svelte:head>, etc.
*
* Skips:
* - Fragments and elements that cannot have attributes
* - Elements that already have data-source
* - Parse errors (returns null gracefully)
*/
function compileSvelte({ code, id }) {
	if (!code.includes("<")) return null;
	let ast;
	try {
		ast = (0, svelte_compiler.parse)(code, {
			filename: id,
			modern: true
		});
	} catch {
		return null;
	}
	const relativePath = normalizePath(node_path.default.relative(process.cwd(), id));
	const s = new magic_string.default(code);
	let hasModifications = false;
	function traverse$1(node) {
		if ("nodes" in node && Array.isArray(node.nodes)) {
			for (const childNode of node.nodes) traverse$1(childNode);
			return;
		}
		if ("type" in node && node.type !== "Fragment" && isElementLike(node)) {
			const element = node;
			if (!element.start || !element.end) return;
			if (!element.attributes?.some((attr) => attr.type === "Attribute" && attr.name === DATA_SOURCE_ATTR)) {
				const lines = code.substring(0, element.start).split("\n");
				const sourceValue = `${relativePath}:${lines.length}:${lines[lines.length - 1].length + 1}`;
				const tagMatch = code.substring(element.start).match(/^<([^\s/>]+)/);
				if (tagMatch) {
					const insertPos = element.start + tagMatch[0].length;
					s.appendLeft(insertPos, ` ${DATA_SOURCE_ATTR}="${sourceValue}"`);
					hasModifications = true;
				}
			}
		}
		if ("fragment" in node && node.fragment) traverse$1(node.fragment);
		if ("consequent" in node && node.consequent) traverse$1(node.consequent);
		if ("alternate" in node && node.alternate) traverse$1(node.alternate);
		if ("body" in node && node.body) traverse$1(node.body);
		if ("pending" in node && node.pending) traverse$1(node.pending);
		if ("then" in node && node.then) traverse$1(node.then);
		if ("catch" in node && node.catch) traverse$1(node.catch);
		if ("fallback" in node && node.fallback) traverse$1(node.fallback);
	}
	function isElementLike(node) {
		return node.type === "RegularElement" || node.type === "Component" || node.type === "SlotElement" || node.type === "TitleElement" || node.type === "SvelteBody" || node.type === "SvelteComponent" || node.type === "SvelteDocument" || node.type === "SvelteElement" || node.type === "SvelteHead" || node.type === "SvelteSelf" || node.type === "SvelteWindow" || node.type === "SvelteBoundary";
	}
	traverse$1(ast.fragment);
	if (!hasModifications) return null;
	return {
		code: s.toString(),
		map: s.generateMap({ hires: true })
	};
}

//#endregion
//#region src/core.ts
const unplugin$1 = createDomInspectorPlugin("unplugin-dom-inspector", () => {
	return async (code, id) => {
		if (!id || id.includes("node_modules")) return null;
		const fileType = detectFileType(id);
		if (!fileType) return null;
		try {
			switch (fileType) {
				case "jsx": return transformJSX({
					code,
					id
				});
				case "vue": return compileVue({
					code,
					id
				});
				case "svelte": return compileSvelte({
					code,
					id
				});
				default: return null;
			}
		} catch (error) {
			console.error(`[dom-inspector] Failed to transform ${id}:`, error);
			return null;
		}
	};
});

//#endregion
//#region src/core-external.ts
const unpluginExternal = createDomInspectorPlugin("unplugin-dom-inspector-external", (options) => {
	return async (code, id) => {
		if (!id || id.includes("node_modules")) return null;
		const fileType = detectFileType(id);
		if (!fileType) return null;
		try {
			return (0, __code_inspector_core.transformCode)({
				content: code,
				filePath: id,
				fileType,
				escapeTags: [],
				pathType: "absolute"
			});
		} catch (error) {
			console.error(`[dom-inspector] Failed to transform ${id}:`, error);
			return null;
		}
	};
});

//#endregion
//#region src/turbopack.ts
let serverStarted = false;
let actualPort = null;
/**
* Start the standalone MCP server (called once)
*/
async function ensureStandaloneServer(options) {
	if (serverStarted && actualPort) return actualPort;
	serverStarted = true;
	const chromeDisabled = require_helpers.isChromeDisabled(options.disableChrome);
	const { server, host, port } = await require_config_updater.startStandaloneServer({
		port: options.port,
		host: options.host
	});
	actualPort = port;
	const serverContext = {
		host,
		port,
		disableChrome: chromeDisabled,
		prompts: options.prompts,
		defaultPrompts: options.defaultPrompts
	};
	const displayHost = host === "0.0.0.0" ? "localhost" : host;
	const publicBase = require_helpers.getPublicBaseUrl({
		publicBaseUrl: options.publicBaseUrl,
		host: displayHost,
		port
	});
	const baseUrl = `${publicBase}/__mcp__/sse`;
	console.log(`[dom-inspector] 📡 MCP: ${baseUrl}\n`);
	initStdioInterceptor();
	await require_config_updater.setupMcpMiddleware(server, serverContext);
	require_config_updater.setupAcpMiddleware(server, serverContext, {
		acpMode: options.acpMode,
		acpModel: options.acpModel,
		acpDelay: options.acpDelay,
		mcpServers: options.mcpServers
	});
	await require_config_updater.updateMcpConfigs(process.cwd(), baseUrl, {
		updateConfig: options.updateConfig,
		updateConfigServerName: options.updateConfigServerName,
		updateConfigAdditionalServers: options.updateConfigAdditionalServers,
		customEditors: options.customEditors
	});
	require_config_updater.setupInspectorMiddleware(server, {
		agents: options.agents,
		visibleAgents: options.visibleAgents,
		defaultAgent: options.defaultAgent,
		showInspectorBar: options.showInspectorBar
	});
	if (options.autoOpenBrowser && !chromeDisabled) {
		const { launchBrowserWithDevTools: launchBrowserWithDevTools$1 } = await Promise.resolve().then(() => require("./browser-launcher.cjs"));
		const targetUrl = options.browserUrl || publicBase;
		setTimeout(async () => {
			if (await launchBrowserWithDevTools$1({
				url: targetUrl,
				serverContext
			})) console.log(`[dom-inspector] 🌐 Browser opened: ${targetUrl}`);
			else console.log(`[dom-inspector] 💡 Use "launch_chrome_devtools" prompt to open browser manually.\n`);
		}, 1e3);
	} else if (chromeDisabled) console.log(`[dom-inspector] 📴 Chrome integration disabled (DOM_INSPECTOR_DISABLE_CHROME=1 or disableChrome: true)`);
	else {
		console.log(`[dom-inspector] ⚠️  autoOpenBrowser: false - Console/Network context unavailable`);
		console.log(`[dom-inspector] 💡 Use "launch_chrome_devtools" prompt or "chrome_devtools" tool to open browser manually.\n`);
	}
	return port;
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
function turbopackDomInspector(options = {}) {
	let loaderPath = "";
	if (typeof __dirname !== "undefined") loaderPath = node_path.default.resolve(__dirname, "./loader.js");
	else try {
		const currentDir = node_path.default.dirname((0, node_url.fileURLToPath)(require("url").pathToFileURL(__filename).href));
		loaderPath = node_path.default.resolve(currentDir, "./loader.js");
	} catch {
		loaderPath = "./loader.js";
	}
	if (!(options.enabled ?? false)) return {};
	if (!serverStarted) ensureStandaloneServer(options).catch((err) => {
		console.error("[dom-inspector] Failed to start standalone server:", err);
	});
	return { ["**/*.{jsx,tsx,js,ts,mjs,mts}"]: { loaders: [{
		loader: loaderPath,
		options
	}] } };
}

//#endregion
//#region src/index.ts
const external = unpluginExternal;

//#endregion
exports.default = unplugin$1;
exports.unplugin = unplugin$1;
exports.external = external;
exports.turbopackDomInspector = turbopackDomInspector;
exports.unpluginExternal = unpluginExternal;