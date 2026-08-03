# dom-inspector-mcp

An npm workspace with two packages:

- **`packages/dom-inspector`** — the core unplugin package: a bundler plugin (Vite/Webpack/Rollup/esbuild/Next.js) that instruments React/Vue components for source inspection, plus an embedded MCP server and a browser-side inspector UI/client. This is the actual DOM inspection and MCP tooling logic.
- **`packages/dynamic-island-app`** — an Electron floating status-bar app ("dynamic island") that spawns the `dom-inspector` package's CLI as a subprocess and shows an always-on-top window reflecting agent/tool activity. Ported faithfully; its UI is expected to be redesigned later.

## Build

```bash
npm install
npm run build
```

This runs each package's own `build` script (see `packages/dom-inspector/package.json` and `packages/dynamic-island-app/package.json`).

## Develop

```bash
npm run dev
```

Runs both packages' `dev` scripts (sequentially).

## Notes

This project focuses on the core `dom-inspector` and `dynamic-island-app` packages, without example apps, docs, or CI scaffolding.
# dom-inspector
