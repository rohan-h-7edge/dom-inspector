#!/usr/bin/env node
const require_chunk = require('./chunk.cjs');
const require_helpers = require('./helpers.cjs');
const require_config_updater = require('./config-updater.cjs');
let fs = require("fs");
fs = require_chunk.__toESM(fs);
let path = require("path");
path = require_chunk.__toESM(path);
let child_process = require("child_process");
child_process = require_chunk.__toESM(child_process);
let __babel_parser = require("@babel/parser");
__babel_parser = require_chunk.__toESM(__babel_parser);
let __babel_traverse = require("@babel/traverse");
__babel_traverse = require_chunk.__toESM(__babel_traverse);
let magic_string = require("magic-string");
magic_string = require_chunk.__toESM(magic_string);

//#region src/utils/package-manager.ts
function detectPackageManager(cwd = process.cwd()) {
	let current = cwd;
	const root = (0, path.dirname)(cwd) === cwd ? cwd : "/";
	while (current !== root) {
		if ((0, fs.existsSync)((0, path.join)(current, "pnpm-lock.yaml"))) return "pnpm";
		if ((0, fs.existsSync)((0, path.join)(current, "yarn.lock"))) return "yarn";
		if ((0, fs.existsSync)((0, path.join)(current, "bun.lockb"))) return "bun";
		if ((0, fs.existsSync)((0, path.join)(current, "package-lock.json"))) return "npm";
		const parent = (0, path.dirname)(current);
		if (parent === current) break;
		current = parent;
	}
	const userAgent = process.env.npm_config_user_agent;
	if (userAgent) {
		if (userAgent.startsWith("pnpm")) return "pnpm";
		if (userAgent.startsWith("yarn")) return "yarn";
		if (userAgent.startsWith("bun")) return "bun";
	}
	return "npm";
}
function getInstallCommand(pm, packageName, dev = true) {
	const flags = dev ? "-D" : "";
	switch (pm) {
		case "npm": return `npm install ${flags} ${packageName}`;
		case "yarn": return `yarn add ${flags} ${packageName}`;
		case "pnpm": return `pnpm add ${flags} ${packageName}`;
		case "bun": return `bun add ${flags} ${packageName}`;
		default: return `npm install ${flags} ${packageName}`;
	}
}
function installPackage(packageName, dev = true) {
	const pm = detectPackageManager();
	const command = getInstallCommand(pm, packageName, dev);
	console.log(`\n📦 Installing ${packageName} with ${pm}...`);
	console.log(`   Running: ${command}`);
	try {
		(0, child_process.execSync)(command, { stdio: "inherit" });
		console.log(`✅ Successfully installed ${packageName}`);
		return true;
	} catch (error) {
		console.error(`❌ Failed to install ${packageName}`);
		return false;
	}
}

//#endregion
//#region src/commands/setup/utils.ts
/**
* Detects a configuration file in the given directory based on patterns.
*/
function detectConfigFile(cwd, patterns) {
	for (const pattern of patterns) {
		const configPath = (0, path.resolve)(cwd, pattern);
		if ((0, fs.existsSync)(configPath)) return configPath;
	}
	return null;
}
/**
* Detects the indentation style used in the code.
* Simple approach: find the first indented line and use its indent.
*/
function detectIndent(code) {
	const match = code.match(/\n(\t+|[ ]+)(?=\S)/);
	if (match) {
		const indent = match[1];
		if (indent[0] === "	") return "	";
		if (indent.length >= 4 && indent.startsWith("    ")) return "    ";
		if (indent.length >= 2) return "  ";
	}
	return "  ";
}
/**
* Calculates the character position to insert an import, based on the last import line.
*/
function getInsertPosition(code, lastImportLine) {
	const lines = code.split("\n");
	let insertPos = 0;
	for (let i = 0; i < lastImportLine; i++) insertPos += lines[i].length + 1;
	return insertPos;
}
/**
* Sanitizes a path string to prevent syntax errors in generated code.
*/
function sanitizePath(path$1) {
	return path$1.replace(/\\/g, "\\\\").replace(/'/g, "\\'").replace(/\n/g, "");
}
/**
* Serializes an object to a formatted string.
* @param obj - The object to serialize
* @param baseIndent - The base indentation unit (e.g., "  " for 2 spaces)
* @param depth - Current nesting depth
*/
function serializeObject(obj, baseIndent = "  ", depth = 0) {
	if (obj === null) return "null";
	if (obj === void 0) return "undefined";
	if (typeof obj === "string") return `'${sanitizePath(obj)}'`;
	if (typeof obj !== "object") return String(obj);
	if (Array.isArray(obj)) return `[${obj.map((item) => serializeObject(item, baseIndent, depth)).join(", ")}]`;
	const keys = Object.keys(obj);
	if (keys.length === 0) return "{}";
	const indent = baseIndent.repeat(depth);
	const propIndent = baseIndent.repeat(depth + 1);
	return `{\n${keys.map((key) => {
		const value = serializeObject(obj[key], baseIndent, depth + 1);
		return `${propIndent}${/^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(key) ? key : `'${key}'`}: ${value}`;
	}).join(",\n")}\n${indent}}`;
}
/**
* Parses a Babel ObjectExpression node into a simple JS object (shallow).
*/
function parseObjectExpression(node) {
	const result = {};
	node.properties.forEach((prop) => {
		if (prop.type === "ObjectProperty" && prop.key.type === "Identifier") {
			let value = void 0;
			if (prop.value.type === "StringLiteral") value = prop.value.value;
			else if (prop.value.type === "BooleanLiteral") value = prop.value.value;
			else if (prop.value.type === "NumericLiteral") value = prop.value.value;
			if (value !== void 0) result[prop.key.name] = value;
		}
	});
	return result;
}
/**
* Unwraps TS expressions like 'as any', '!', etc. to get the underlying expression.
*/
function unwrapNode(node) {
	if (!node) return node;
	let current = node;
	while (current.type === "TSAsExpression" || current.type === "TSNonNullExpression" || current.type === "TSSatisfiesExpression" || current.type === "TSTypeAssertion") current = current.expression;
	return current;
}

//#endregion
//#region src/commands/setup/frameworks/vite.ts
const traverse$2 = __babel_traverse.default.default || __babel_traverse.default;
const PLUGIN_IMPORT$2 = "@mcpc-tech/unplugin-dom-inspector-mcp";
const PLUGIN_VAR_NAME$2 = "DomInspector";
function transformViteConfig(code, options) {
	try {
		const s = new magic_string.default(code);
		const ast = (0, __babel_parser.parse)(code, {
			sourceType: "module",
			plugins: ["typescript", "jsx"]
		});
		const indent = detectIndent(code);
		let lastImportEnd = 0;
		let pluginsArrayStart = -1;
		let firstPluginStart = -1;
		let hasPluginsArray = false;
		let hasImport = false;
		let hasPluginUsage = false;
		let importedVarName = PLUGIN_VAR_NAME$2;
		let existingOptionsNode = null;
		let usageStart = -1;
		let usageEnd = -1;
		traverse$2(ast, {
			ImportDeclaration(path$1) {
				if (path$1.node.source.value === PLUGIN_IMPORT$2) {
					hasImport = true;
					const spec = path$1.node.specifiers.find((s$1) => s$1.type === "ImportDefaultSpecifier");
					if (spec?.local.type === "Identifier") importedVarName = spec.local.name;
				}
				if (path$1.node.loc) lastImportEnd = Math.max(lastImportEnd, path$1.node.loc.end.line);
			},
			ObjectProperty(path$1) {
				if (path$1.node.key.type === "Identifier" && path$1.node.key.name === "plugins" && path$1.node.value.type === "ArrayExpression") {
					hasPluginsArray = true;
					pluginsArrayStart = path$1.node.value.start ?? -1;
					const elements = path$1.node.value.elements;
					elements.forEach((rawElement) => {
						const element = unwrapNode(rawElement);
						if (element && element.type === "CallExpression" && element.callee.type === "MemberExpression" && element.callee.object.type === "Identifier" && element.callee.object.name === importedVarName && element.callee.property.type === "Identifier" && element.callee.property.name === "vite") {
							hasPluginUsage = true;
							if (typeof element.start === "number" && typeof element.end === "number") {
								usageStart = element.start;
								usageEnd = element.end;
							}
							if (element.arguments.length > 0 && element.arguments[0].type === "ObjectExpression") existingOptionsNode = element.arguments[0];
						}
					});
					if (elements.length > 0 && elements[0]?.start != null) firstPluginStart = elements[0].start;
				}
			}
		});
		if (!hasImport) {
			const importLine = `import ${PLUGIN_VAR_NAME$2} from '${PLUGIN_IMPORT$2}';\n`;
			if (lastImportEnd > 0) s.appendLeft(getInsertPosition(code, lastImportEnd), importLine);
			else s.prepend(importLine);
		}
		const cliConfig = {};
		if (options.entryPath) {
			cliConfig.entry = options.entryPath;
			cliConfig.autoInject = false;
		}
		if (options.jsonOptions) Object.assign(cliConfig, options.jsonOptions);
		if (options.updateConfig !== void 0) cliConfig.updateConfig = options.updateConfig;
		if (options.disableChrome !== void 0) cliConfig.disableChrome = options.disableChrome;
		if (options.autoOpenBrowser !== void 0) cliConfig.autoOpenBrowser = options.autoOpenBrowser;
		if (options.defaultAgent !== void 0) cliConfig.defaultAgent = options.defaultAgent;
		if (options.visibleAgents !== void 0) cliConfig.visibleAgents = options.visibleAgents;
		if (options.publicBaseUrl !== void 0) cliConfig.publicBaseUrl = options.publicBaseUrl;
		const pluginIndent = indent.repeat(2);
		if (hasPluginUsage) {
			const mergedConfig = existingOptionsNode ? parseObjectExpression(existingOptionsNode) : {};
			Object.assign(mergedConfig, cliConfig);
			if (usageStart > -1 && usageEnd > -1) s.overwrite(usageStart, usageEnd, `${importedVarName}.vite(${serializeObject(mergedConfig, indent, 3)})`);
		} else if (hasPluginsArray) {
			const finalConfig = {
				enabled: true,
				...cliConfig
			};
			const pluginCall = `${importedVarName}.vite(${serializeObject(finalConfig, indent, 3)})`;
			if (firstPluginStart > -1) s.appendLeft(firstPluginStart, `${pluginCall},\n${pluginIndent}`);
			else if (pluginsArrayStart > -1) s.appendLeft(pluginsArrayStart + 1, `\n${pluginIndent}${pluginCall},\n${indent}`);
		} else {
			let injected = false;
			traverse$2(ast, { ExportDefaultDeclaration(path$1) {
				if (injected) return;
				const decl = path$1.node.declaration;
				let configObj = null;
				if (decl.type === "CallExpression" && decl.arguments[0]?.type === "ObjectExpression") configObj = decl.arguments[0];
				else if (decl.type === "CallExpression" && decl.arguments[0]?.type === "ArrowFunctionExpression") {
					const fn = decl.arguments[0];
					if (fn.body.type === "ObjectExpression") configObj = fn.body;
					else if (fn.body.type === "BlockStatement") {
						for (const stmt of fn.body.body) if (stmt.type === "ReturnStatement" && stmt.argument?.type === "ObjectExpression") {
							configObj = stmt.argument;
							break;
						}
					}
				} else if (decl.type === "ObjectExpression") configObj = decl;
				if (configObj?.start != null) {
					const finalConfig = {
						enabled: true,
						...cliConfig
					};
					const newPlugins = `\n${indent}plugins: [\n${pluginIndent}${`${importedVarName}.vite(${serializeObject(finalConfig, indent, 3)})`},\n${indent}],`;
					s.appendLeft(configObj.start + 1, newPlugins);
					injected = true;
				}
			} });
			if (!injected) return {
				success: false,
				modified: false,
				error: "Could not find plugins array in config",
				message: "Please add DomInspector manually to your plugins array"
			};
		}
		if (options.host || options.allowedHosts?.length) {
			const injectServerConfig = (configObj) => {
				const serverProp = configObj.properties.find((p) => p.type === "ObjectProperty" && p.key.type === "Identifier" && p.key.name === "server");
				const serverIndent = indent.repeat(2);
				if (serverProp?.value.start != null) {
					const serverContentStart = serverProp.value.start + 1;
					const currentBlock = code.slice(serverContentStart, serverProp.value.end);
					let injection = "";
					if (options.host && !currentBlock.includes("host:")) injection += `\n${serverIndent}host: '${options.host}',`;
					if (options.allowedHosts?.length && !currentBlock.includes("allowedHosts:")) injection += `\n${serverIndent}allowedHosts: [${options.allowedHosts.map((h) => `'${h}'`).join(", ")}],`;
					if (injection) s.appendLeft(serverContentStart, injection);
				} else if (configObj.start != null) {
					let injection = `\n${indent}server: {\n`;
					if (options.host) injection += `${serverIndent}host: '${options.host}',\n`;
					if (options.allowedHosts?.length) injection += `${serverIndent}allowedHosts: [${options.allowedHosts.map((h) => `'${h}'`).join(", ")}],\n`;
					injection += `${indent}},`;
					s.appendLeft(configObj.start + 1, injection);
				}
			};
			const extractConfigFromFunction = (fn) => {
				if (fn.type === "ArrowFunctionExpression" && fn.body.type === "ObjectExpression") return fn.body;
				if (fn.body.type === "BlockStatement") {
					for (const stmt of fn.body.body) if (stmt.type === "ReturnStatement" && stmt.argument?.type === "ObjectExpression") return stmt.argument;
				}
				return null;
			};
			traverse$2(ast, { ExportDefaultDeclaration(path$1) {
				const decl = path$1.node.declaration;
				if (decl.type === "CallExpression" && decl.arguments[0]?.type === "ObjectExpression") {
					injectServerConfig(decl.arguments[0]);
					return;
				}
				if (decl.type === "CallExpression" && (decl.arguments[0]?.type === "ArrowFunctionExpression" || decl.arguments[0]?.type === "FunctionExpression")) {
					const configObj = extractConfigFromFunction(decl.arguments[0]);
					if (configObj) injectServerConfig(configObj);
					return;
				}
				if (decl.type === "ObjectExpression") injectServerConfig(decl);
			} });
		}
		if (s.toString() === code) return {
			success: true,
			modified: false,
			message: "DomInspector is already configured"
		};
		return {
			success: true,
			modified: true,
			code: s.toString(),
			message: "Successfully added/updated DomInspector in Vite config"
		};
	} catch (error) {
		return {
			success: false,
			modified: false,
			error: error instanceof Error ? error.message : String(error),
			message: "Failed to transform Vite config"
		};
	}
}
function detectViteConfig(cwd) {
	return detectConfigFile(cwd, [
		"vite.config.ts",
		"vite.config.js",
		"vite.config.mjs"
	]);
}

//#endregion
//#region src/commands/setup/frameworks/webpack.ts
const traverse$1 = __babel_traverse.default.default || __babel_traverse.default;
const PLUGIN_IMPORT$1 = "@mcpc-tech/unplugin-dom-inspector-mcp";
const PLUGIN_VAR_NAME$1 = "DomInspector";
function transformWebpackConfig(code, options) {
	try {
		const s = new magic_string.default(code);
		const isESM = code.includes("import ") && !code.includes("require(");
		const ast = (0, __babel_parser.parse)(code, {
			sourceType: "module",
			plugins: ["typescript"]
		});
		const indent = detectIndent(code);
		let lastImportEnd = 0;
		let pluginsArrayStart = -1;
		let firstPluginStart = -1;
		let hasImport = false;
		let hasPluginUsage = false;
		let importedVarName = PLUGIN_VAR_NAME$1;
		let existingOptionsNode = null;
		let usageStart = -1;
		let usageEnd = -1;
		traverse$1(ast, {
			ImportDeclaration(path$1) {
				if (path$1.node.loc) lastImportEnd = Math.max(lastImportEnd, path$1.node.loc.end.line);
				if (path$1.node.source.value === PLUGIN_IMPORT$1) {
					hasImport = true;
					const spec = path$1.node.specifiers.find((s$1) => s$1.type === "ImportDefaultSpecifier");
					if (spec?.local.type === "Identifier") importedVarName = spec.local.name;
				}
			},
			VariableDeclaration(path$1) {
				if (path$1.node.loc && !isESM) lastImportEnd = Math.max(lastImportEnd, path$1.node.loc.end.line);
				for (const decl of path$1.node.declarations) if (decl.init?.type === "CallExpression" && decl.init.callee.type === "Identifier" && decl.init.callee.name === "require" && decl.init.arguments[0]?.type === "StringLiteral" && decl.init.arguments[0].value === PLUGIN_IMPORT$1 && decl.id.type === "Identifier") {
					hasImport = true;
					importedVarName = decl.id.name;
				}
			},
			ObjectProperty(path$1) {
				if (path$1.node.key.type === "Identifier" && path$1.node.key.name === "plugins" && path$1.node.value.type === "ArrayExpression") {
					pluginsArrayStart = path$1.node.value.start ?? -1;
					const elements = path$1.node.value.elements;
					elements.forEach((rawElement) => {
						const element = unwrapNode(rawElement);
						if (element && element.type === "CallExpression" && element.callee.type === "MemberExpression" && element.callee.object.type === "Identifier" && element.callee.object.name === importedVarName && element.callee.property.type === "Identifier" && element.callee.property.name === "webpack") {
							hasPluginUsage = true;
							if (typeof element.start === "number" && typeof element.end === "number") {
								usageStart = element.start;
								usageEnd = element.end;
							}
							if (element.arguments.length > 0 && element.arguments[0].type === "ObjectExpression") existingOptionsNode = element.arguments[0];
						}
					});
					if (elements.length > 0 && elements[0]?.start != null) firstPluginStart = elements[0].start;
				}
			}
		});
		if (!hasImport) {
			const importLine = isESM ? `import ${PLUGIN_VAR_NAME$1} from '${PLUGIN_IMPORT$1}';\n` : `const ${PLUGIN_VAR_NAME$1} = require('${PLUGIN_IMPORT$1}');\n`;
			if (lastImportEnd > 0) s.appendLeft(getInsertPosition(code, lastImportEnd), importLine);
			else s.prepend(importLine);
		}
		const cliConfig = {};
		if (options.entryPath) {
			cliConfig.entry = options.entryPath;
			cliConfig.autoInject = false;
		}
		if (options.jsonOptions) Object.assign(cliConfig, options.jsonOptions);
		if (options.updateConfig !== void 0) cliConfig.updateConfig = options.updateConfig;
		if (options.disableChrome !== void 0) cliConfig.disableChrome = options.disableChrome;
		if (options.autoOpenBrowser !== void 0) cliConfig.autoOpenBrowser = options.autoOpenBrowser;
		if (options.defaultAgent !== void 0) cliConfig.defaultAgent = options.defaultAgent;
		if (options.visibleAgents !== void 0) cliConfig.visibleAgents = options.visibleAgents;
		if (options.publicBaseUrl !== void 0) cliConfig.publicBaseUrl = options.publicBaseUrl;
		const pluginIndent = indent.repeat(2);
		if (hasPluginUsage) {
			const mergedConfig = existingOptionsNode ? parseObjectExpression(existingOptionsNode) : {};
			Object.assign(mergedConfig, cliConfig);
			if (usageStart > -1 && usageEnd > -1) s.overwrite(usageStart, usageEnd, `${importedVarName}.webpack(${serializeObject(mergedConfig, indent, 3)})`);
		} else if (firstPluginStart > -1) {
			const finalConfig = {
				enabled: true,
				...cliConfig
			};
			s.appendLeft(firstPluginStart, `${importedVarName}.webpack(${serializeObject(finalConfig, indent, 3)}),\n${pluginIndent}`);
		} else if (pluginsArrayStart > -1) {
			const finalConfig = {
				enabled: true,
				...cliConfig
			};
			s.appendLeft(pluginsArrayStart + 1, `\n${pluginIndent}${importedVarName}.webpack(${serializeObject(finalConfig, indent, 3)}),\n${indent}`);
		} else return {
			success: false,
			modified: false,
			error: "Could not find plugins array in config",
			message: "Please add DomInspector manually to your plugins array"
		};
		if (s.toString() === code) return {
			success: true,
			modified: false,
			message: "DomInspector is already configured in this file"
		};
		return {
			success: true,
			modified: true,
			code: s.toString(),
			message: "Successfully added DomInspector to Webpack config"
		};
	} catch (error) {
		return {
			success: false,
			modified: false,
			error: error instanceof Error ? error.message : String(error),
			message: "Failed to transform Webpack config"
		};
	}
}
function detectWebpackConfig(cwd) {
	return detectConfigFile(cwd, [
		"webpack.config.ts",
		"webpack.config.js",
		"webpack.config.cjs",
		"webpack.config.mjs"
	]);
}

//#endregion
//#region src/commands/setup/frameworks/nextjs.ts
const traverse = __babel_traverse.default.default || __babel_traverse.default;
const PLUGIN_IMPORT = "@mcpc-tech/unplugin-dom-inspector-mcp";
const PLUGIN_VAR_NAME = "DomInspector";
function transformNextConfig(code, _options) {
	try {
		if (code.includes(PLUGIN_IMPORT)) return {
			success: true,
			modified: false,
			message: "DomInspector is already configured in this file"
		};
		const s = new magic_string.default(code);
		const ast = (0, __babel_parser.parse)(code, {
			sourceType: "module",
			plugins: ["typescript"]
		});
		const indent = detectIndent(code);
		let lastImportEnd = 0;
		let nextConfigStart = -1;
		let hasWebpackProperty = false;
		let hasTurbopackProperty = false;
		traverse(ast, {
			ImportDeclaration(path$1) {
				if (path$1.node.loc) lastImportEnd = Math.max(lastImportEnd, path$1.node.loc.end.line);
			},
			VariableDeclarator(path$1) {
				if (path$1.node.id.type === "Identifier" && path$1.node.id.name === "nextConfig" && path$1.node.init?.type === "ObjectExpression") {
					nextConfigStart = path$1.node.init.start ?? -1;
					for (const prop of path$1.node.init.properties) if (prop.type === "ObjectProperty" && prop.key.type === "Identifier") {
						if (prop.key.name === "webpack") hasWebpackProperty = true;
						if (prop.key.name === "turbopack") hasTurbopackProperty = true;
					}
				}
			}
		});
		const importLine = `import ${PLUGIN_VAR_NAME}, { turbopackDomInspector } from '${PLUGIN_IMPORT}';\n`;
		if (lastImportEnd > 0) s.appendLeft(getInsertPosition(code, lastImportEnd), importLine);
		else s.prepend(importLine);
		if (nextConfigStart > -1 && !hasWebpackProperty && !hasTurbopackProperty) {
			const i1 = indent, i2 = indent.repeat(2);
			indent.repeat(3);
			const webpackConfig = `
${i1}webpack: (config) => {
${i2}config.plugins.push(${PLUGIN_VAR_NAME}.webpack({ enabled: true }));
${i2}return config;
${i1}},
${i1}turbopack: {
${i2}rules: turbopackDomInspector({ enabled: true }),
${i1}},`;
			s.appendLeft(nextConfigStart + 1, webpackConfig);
		} else if (hasWebpackProperty || hasTurbopackProperty) return {
			success: false,
			modified: false,
			message: `${hasWebpackProperty ? "webpack" : "turbopack"} property already exists. Please add DomInspector manually`
		};
		else return {
			success: false,
			modified: false,
			error: "Could not find nextConfig object",
			message: "Please add DomInspector manually"
		};
		return {
			success: true,
			modified: true,
			code: s.toString(),
			message: "Successfully added DomInspector to Next.js config"
		};
	} catch (error) {
		return {
			success: false,
			modified: false,
			error: error instanceof Error ? error.message : String(error),
			message: "Failed to transform Next.js config"
		};
	}
}
function transformNextLayout(code) {
	try {
		const COMPONENT_IMPORT = "@mcpc-tech/unplugin-dom-inspector-mcp/next";
		if (code.includes("DomInspector") || code.includes(COMPONENT_IMPORT)) return {
			success: true,
			modified: false,
			message: "DomInspector component is already in this file"
		};
		const s = new magic_string.default(code);
		const ast = (0, __babel_parser.parse)(code, {
			sourceType: "module",
			plugins: ["typescript", "jsx"]
		});
		const indent = detectIndent(code);
		let lastImportEnd = 0;
		let bodyStart = -1;
		traverse(ast, {
			ImportDeclaration(path$1) {
				if (path$1.node.loc) lastImportEnd = Math.max(lastImportEnd, path$1.node.loc.end.line);
			},
			JSXElement(path$1) {
				if (path$1.node.openingElement.name.type === "JSXIdentifier" && path$1.node.openingElement.name.name === "body" && path$1.node.openingElement.end != null) bodyStart = path$1.node.openingElement.end;
			}
		});
		const importLine = `import { DomInspector } from "${COMPONENT_IMPORT}";\n`;
		if (lastImportEnd > 0) s.appendLeft(getInsertPosition(code, lastImportEnd), importLine);
		else s.prepend(importLine);
		if (bodyStart > -1) s.appendLeft(bodyStart, `\n${indent.repeat(4)}<DomInspector />`);
		else return {
			success: false,
			modified: false,
			error: "Could not find <body> element",
			message: "Please add <DomInspector /> manually"
		};
		return {
			success: true,
			modified: true,
			code: s.toString(),
			message: "Successfully added DomInspector component to layout"
		};
	} catch (error) {
		return {
			success: false,
			modified: false,
			error: error instanceof Error ? error.message : String(error),
			message: "Failed to transform layout file"
		};
	}
}
function detectNextConfig(cwd) {
	return detectConfigFile(cwd, [
		"next.config.ts",
		"next.config.js",
		"next.config.mjs"
	]);
}

//#endregion
//#region src/commands/setup/index.ts
async function runSetupCommand() {
	const args = process.argv.slice(3);
	let dryRun = false;
	let configPath;
	let bundlerType;
	let entryPath;
	let host;
	const allowedHosts = [];
	let updateConfig;
	let disableChrome;
	let autoOpenBrowser;
	let defaultAgent;
	let visibleAgents;
	let publicBaseUrl;
	let jsonOptions;
	for (let i = 0; i < args.length; i++) if (args[i] === "--dry-run") dryRun = true;
	else if (args[i] === "--config" && args[i + 1]) {
		configPath = args[i + 1];
		i++;
	} else if (args[i] === "--entry" && args[i + 1]) {
		entryPath = args[i + 1];
		i++;
	} else if (args[i] === "--host" && args[i + 1]) {
		host = args[i + 1];
		i++;
	} else if (args[i] === "--allowed-hosts" && args[i + 1]) {
		const hosts = args[i + 1].split(",").map((h) => h.trim()).filter(Boolean);
		allowedHosts.push(...hosts);
		i++;
	} else if (args[i] === "--bundler" && args[i + 1]) {
		bundlerType = args[i + 1];
		i++;
	} else if (args[i] === "--no-update-config") updateConfig = false;
	else if (args[i] === "--disable-chrome") disableChrome = true;
	else if (args[i] === "--auto-open-browser") autoOpenBrowser = true;
	else if (args[i] === "--default-agent" && args[i + 1]) {
		defaultAgent = args[i + 1];
		i++;
	} else if (args[i] === "--visible-agents" && args[i + 1]) {
		visibleAgents = args[i + 1].split(",").map((a) => a.trim()).filter(Boolean);
		i++;
	} else if (args[i] === "--public-base-url" && args[i + 1]) {
		publicBaseUrl = args[i + 1];
		i++;
	} else if (args[i] === "--options" && args[i + 1]) {
		try {
			jsonOptions = JSON.parse(args[i + 1]);
		} catch (e) {
			console.error("❌ Failed to parse JSON options:", e);
			process.exit(1);
		}
		i++;
	} else if (args[i] === "--help" || args[i] === "-h") {
		printHelp();
		process.exit(0);
	}
	console.log(`
╔══════════════════════════════════════════════════════════╗
║           🔧 DomInspector Setup                          ║
╚══════════════════════════════════════════════════════════╝
`);
	try {
		const cwd = process.cwd();
		let selectedConfigPath = null;
		let selectedBundler = null;
		const frameworks = [
			{
				type: "vite",
				detect: detectViteConfig,
				transform: transformViteConfig
			},
			{
				type: "webpack",
				detect: detectWebpackConfig,
				transform: transformWebpackConfig
			},
			{
				type: "nextjs",
				detect: detectNextConfig,
				transform: transformNextConfig
			}
		];
		const validBundlers = [
			"vite",
			"webpack",
			"nextjs"
		];
		if (configPath) {
			if (!(0, fs.existsSync)(configPath)) {
				console.error(`❌ Provided config file does not exist: ${configPath}`);
				process.exit(1);
			}
			selectedConfigPath = configPath;
			const filename = configPath.toLowerCase();
			if (/vite\.config\.(ts|js|mjs)$/i.test(filename)) selectedBundler = "vite";
			else if (/webpack\.config\.(ts|js|cjs|mjs)$/i.test(filename)) selectedBundler = "webpack";
			else if (/next\.config\.(ts|js|mjs)$/i.test(filename)) selectedBundler = "nextjs";
			if (!selectedBundler) {
				console.error(`❌ Could not determine bundler type from config path: ${configPath}`);
				console.error(`💡 Use --bundler flag to specify: ${validBundlers.join(", ")}`);
				process.exit(1);
			}
		} else if (bundlerType) {
			if (!validBundlers.includes(bundlerType)) {
				console.error(`❌ Invalid bundler type: ${bundlerType}`);
				console.error(`💡 Valid options: ${validBundlers.join(", ")}`);
				process.exit(1);
			}
			selectedBundler = bundlerType;
			const fw = frameworks.find((f) => f.type === bundlerType);
			if (fw) selectedConfigPath = fw.detect(cwd);
		} else {
			const detected = frameworks.map((f) => ({
				type: f.type,
				path: f.detect(cwd)
			})).filter((d) => d.path !== null);
			if (detected.length === 0) {
				console.error("❌ No bundler config files found in current directory");
				process.exit(1);
			}
			if (detected.length > 1) {
				console.log("📦 Multiple configs detected:");
				detected.forEach((d, i) => console.log(`  ${i + 1}. ${d.type}: ${d.path}`));
				console.log("\n💡 Tip: Use --bundler or --config to specify which one to transform");
			}
			selectedBundler = detected[0].type;
			selectedConfigPath = detected[0].path;
			console.log(`🎯 Using: ${selectedBundler} (${selectedConfigPath})`);
		}
		if (!selectedConfigPath || !selectedBundler) {
			console.error(`❌ Could not find or detect ${bundlerType || "any"} configuration`);
			process.exit(1);
		}
		console.log(`\n${dryRun ? "🔍 Previewing" : "🔧 Transforming"} ${selectedBundler} config...`);
		const code = (0, fs.readFileSync)(selectedConfigPath, "utf-8");
		const options = {
			dryRun,
			configPath: selectedConfigPath,
			entryPath,
			host,
			allowedHosts,
			updateConfig,
			disableChrome,
			autoOpenBrowser,
			defaultAgent,
			visibleAgents,
			publicBaseUrl,
			jsonOptions
		};
		const framework = frameworks.find((f) => f.type === selectedBundler);
		if (!framework) {
			console.error(`❌ Unsupported bundler: ${selectedBundler}`);
			process.exit(1);
		}
		const result = framework.transform(code, options);
		if (!result.success) {
			console.error(`\n❌ ${result.message}`);
			if (result.error) console.error(`   Error: ${result.error}`);
			process.exit(1);
		}
		if (dryRun) {
			showPreview(result);
			process.exit(0);
		}
		const installed = installPackage("@mcpc-tech/unplugin-dom-inspector-mcp@latest", true);
		if (!installed) console.warn("⚠️  Package installation failed, but setup will continue with config transformation.");
		if (result.modified) {
			(0, fs.writeFileSync)(selectedConfigPath, result.code, "utf-8");
			console.log(`\n✅ ${result.message}`);
		} else console.log(`\n✅ ${result.message}`);
		if (selectedBundler === "nextjs") {
			const layoutPath = (entryPath ? [(0, path.resolve)(cwd, entryPath)] : [
				(0, path.resolve)(cwd, "src/app/layout.tsx"),
				(0, path.resolve)(cwd, "src/app/layout.jsx"),
				(0, path.resolve)(cwd, "app/layout.tsx"),
				(0, path.resolve)(cwd, "app/layout.jsx")
			]).find((p) => (0, fs.existsSync)(p));
			if (!layoutPath) {
				console.warn(`\n⚠️  Layout file not found`);
				console.warn(`   Please add <DomInspector /> to your root layout manually.`);
				console.warn(`   Import: import { DomInspector } from "@mcpc-tech/unplugin-dom-inspector-mcp/next";`);
			} else {
				console.log(`\n🔧 Transforming layout file: ${layoutPath}`);
				const layoutResult = transformNextLayout((0, fs.readFileSync)(layoutPath, "utf-8"));
				if (layoutResult.success && layoutResult.modified) {
					if (!dryRun) (0, fs.writeFileSync)(layoutPath, layoutResult.code, "utf-8");
					console.log(`✅ ${layoutResult.message}`);
				} else if (!layoutResult.success) {
					console.warn(`⚠️  ${layoutResult.message}`);
					if (layoutResult.error) console.warn(`   ${layoutResult.error}`);
				} else console.log(`ℹ️  ${layoutResult.message}`);
			}
		}
		printNextSteps(selectedConfigPath, entryPath, selectedBundler, installed);
	} catch (error) {
		console.error("❌ Setup failed:", error instanceof Error ? error.message : error);
		process.exit(1);
	}
}
function printHelp() {
	console.log(`
Usage:
  npx @mcpc-tech/unplugin-dom-inspector-mcp setup [options]

Options:
  --config <path>         Specify config file path (auto-detect by default)
  --entry <path>          Specify entry file path to add import (optional)
  --bundler <type>        Specify bundler type: vite, webpack, nextjs
  --host <string>         Specify server host (e.g. 0.0.0.0)
  --allowed-hosts <list>  Specify allowed hosts (comma-separated)
  --no-update-config      Disable auto MCP config updates
  --disable-chrome        Disable Chrome DevTools integration
  --auto-open-browser     Auto open browser on start
  --default-agent <name>  Set default agent name
  --visible-agents <list> Comma-separated list of visible agents
  --public-base-url <url> Set public base URL (e.g. https://dev.example.com)
  --options <json>        JSON string for advanced options (merges with flags)
  --dry-run               Preview changes without applying them
  --help, -h              Show this help message
`);
}
function showPreview(result) {
	if (result.modified) {
		console.log("\n📄 Preview of config changes:");
		console.log("─".repeat(60));
		console.log(result.code);
		console.log("─".repeat(60));
	} else console.log(`\n✅ Config: ${result.message}`);
	console.log("\n💡 Run without --dry-run to apply these changes");
}
function printNextSteps(configPath, entryPath, bundler, installed) {
	console.log(`\n📝 Next steps:`);
	if (!installed) {
		console.log(`   1. Install the package manually: npm install -D @mcpc-tech/unplugin-dom-inspector-mcp`);
		console.log(`   2. Review the changes in ${configPath} and package.json`);
		console.log(`   3. Start your dev server`);
	} else {
		console.log(`   1. Review the changes in ${configPath} and package.json`);
		console.log(`   2. Start your dev server`);
	}
	if (entryPath) {
		console.log(`\n💡 Entry file specified: ${entryPath}`);
		console.log(`   This has been added to your config with autoInject: false`);
		console.log(`   No modifications were made to your entry file`);
	}
	if (bundler === "nextjs") {
		console.log(`\n⚠️  Next.js 16+ uses Turbopack by default`);
		console.log(`   Turbopack mode requires running a standalone MCP server:`);
		console.log(`   `);
		console.log(`   Terminal 1: npm run dev`);
		console.log(`   Terminal 2: npx dom-inspector-server`);
		console.log(`   `);
		console.log(`   Or use concurrently: npx concurrently "npm run dev" "npx dom-inspector-server"`);
		console.log(`   (Webpack mode works without standalone server: npm run dev -- --webpack)`);
	}
	if (bundler === "vite") {
		console.log(`\n⚠️  Important: DomInspector should be placed BEFORE framework plugins (react/vue/svelte)`);
		console.log(`   Please verify the plugin order in your config.`);
	}
}

//#endregion
//#region src/commands/server/index.ts
async function runServerCommand() {
	const args = process.argv.slice(3);
	let port = require_config_updater.getDefaultPort();
	let host = "localhost";
	const allowedHosts = [];
	for (let i = 0; i < args.length; i++) if (args[i] === "--port" && args[i + 1]) {
		port = parseInt(args[i + 1], 10);
		i++;
	} else if (args[i] === "--host" && args[i + 1]) {
		host = args[i + 1];
		i++;
	} else if (args[i] === "--allowed-hosts" && args[i + 1]) {
		const hosts = args[i + 1].split(",").map((h) => h.trim()).filter(Boolean);
		allowedHosts.push(...hosts);
		i++;
	} else if (args[i] === "--help" || args[i] === "-h") {
		console.log(`
╔══════════════════════════════════════════════════════════╗
║           🔍 DomInspector MCP Server                     ║
╠══════════════════════════════════════════════════════════╣
║                                                          ║
║  Standalone MCP server for dom-inspector                 ║
║  (for Turbopack and other non-webpack builds)            ║
║                                                          ║
╚══════════════════════════════════════════════════════════╝

Usage:
  npx dom-inspector-server [options]

Options:
  --port <number>   Port to run the server on (default: 6137)
  --host <string>   Host to bind to (default: localhost)
  --allowed-hosts <string>  Comma-separated list of allowed hosts (e.g. "example.com,.my-ide.com")
  --help, -h        Show this help message

To act as a collaboration hub for cross-machine bug reports/UI corrections, set:
  DOM_INSPECTOR_COLLAB_DB_URL         Turso database URL (create a free one at https://turso.tech)
  DOM_INSPECTOR_COLLAB_DB_AUTH_TOKEN  Turso auth token

Example:
  npx dom-inspector-server --port 3001 --host 0.0.0.0 --allowed-hosts my-ide.example.com
`);
		process.exit(0);
	}
	try {
		const { server, host: actualHost, port: actualPort } = await require_config_updater.startStandaloneServer({
			port,
			host,
			allowedHosts
		});
		const serverContext = {
			host: actualHost,
			port: actualPort,
			disableChrome: require_helpers.isEnvTruthy(process.env.DOM_INSPECTOR_DISABLE_CHROME)
		};
		const displayHost = actualHost === "0.0.0.0" ? "localhost" : actualHost;
		const baseUrl = `${require_helpers.getPublicBaseUrl({
			publicBaseUrl: process.env.DOM_INSPECTOR_PUBLIC_BASE_URL,
			host: displayHost,
			port: actualPort
		})}/__mcp__/sse`;
		console.log(`[dom-inspector] 📡 MCP (Standalone): ${baseUrl}\n`);
		require_config_updater.setupMcpMiddleware(server, serverContext);
		require_config_updater.setupAcpMiddleware(server, serverContext, {});
		require_config_updater.setupInspectorMiddleware(server, {});
		require_config_updater.setupCollabMiddleware(server);
		if (require_config_updater.isCollabDbConfigured()) console.log(`[dom-inspector] 🤝 Collaboration hub active at http://${displayHost}:${actualPort}/__collab__`);
		await require_config_updater.updateMcpConfigs(process.cwd(), baseUrl, {});
	} catch (error) {
		console.error("Failed to start dom-inspector server:", error);
		process.exit(1);
	}
}

//#endregion
//#region src/cli.ts
async function main() {
	const command = process.argv[2];
	if (command === "setup") await runSetupCommand();
	else if (command === "server" || !command) await runServerCommand();
	else {
		console.log(`
Unknown command: ${command}

Available commands:
  setup   - Add DomInspector to your bundler config
  server  - Start standalone MCP server (default)

Run with --help for more information:
  npx @mcpc-tech/unplugin-dom-inspector-mcp setup --help
  npx dom-inspector-server --help
`);
		process.exit(1);
	}
}
main();

//#endregion