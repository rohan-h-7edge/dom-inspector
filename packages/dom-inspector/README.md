# dom-inspector-mcp

Point at any element in your running app, tweak it visually, and let an AI agent (Claude Code, Codex, Gemini, Copilot…) make the same change in your source code.

A dev-only plugin for Vite, Webpack, Rollup, esbuild and Next.js. Nothing ships to production.

## Install

```bash
npm install -D dom-inspector-mcp
```

```ts
// vite.config.ts
import DomInspector from "dom-inspector-mcp";

export default defineConfig({
  plugins: [DomInspector.vite({ enabled: true }), react()], // before react()
});
```

Other bundlers use `DomInspector.webpack()`, `.rollup()` or `.esbuild()`. For Next.js, add `DomInspector.webpack()` in `next.config` and render `<DomInspector />` from `dom-inspector-mcp/next` in your root layout.

Start your dev server, open the app and press **⌥I** (Alt+I).

**Or let your AI agent set it up.** Paste this into Claude Code, Cursor or similar:

```text
Install the dev dependency `dom-inspector-mcp` and register it in this project's
bundler config: `DomInspector.vite({ enabled: true })` as the first Vite plugin,
`DomInspector.webpack({ enabled: true })` for Webpack, or for Next.js the webpack
plugin plus `<DomInspector />` from "dom-inspector-mcp/next" in the root layout.
Add `.dom-inspector-uploads/` to .gitignore. Don't edit any MCP config files and
don't start the dev server. Tell me which files you changed.
```

## VisBug tools

Press **⌥I** to turn on the inspector. A [VisBug](https://github.com/GoogleChromeLabs/ProjectVisBug) toolbar appears on the left. **Click** an element to select it; **Shift+click** selects several.

| Key | Tool | What it does |
|---|---|---|
| **G** | Guides | Hover to see guide lines; click an element, then hover another to measure the distance between them |
| **I** | Inspect | See every style of an element and edit any value inline |
| **X** | Accessibility | Contrast (WCAG / APCA) and ARIA info |
| **L** | Position | Drag an element, or nudge it with the arrow keys |
| **V** | Move | Reorder an element among its siblings |
| **M** | Margin | Arrow keys add margin (Shift = 10px, Alt = shrink) |
| **P** | Padding | Arrow keys add padding (Shift = 10px, Alt = shrink) |
| **A** | Flexbox | Arrow keys change justify / align / direction / wrap |
| **D** | Box Shadow | Arrow keys move the shadow; Alt for blur / spread |
| **H** | Hue Shift | Adjust color, saturation and lightness |
| **E** | Edit Text | Edit text in place (or double-click any element) |

**Sending changes to the AI.** After an edit with Inspect, Position, Move, Margin, Padding, Flexbox, Box Shadow, Hue Shift or Edit Text, two buttons appear next to the element:

- **▶ Apply via AI** sends the exact change ("padding was X, now Y") to the agent, which edits your source code. For most tools the agent then checks the result in the live page with `verify_dom_position` / `verify_flex_layout`.
- **💾 Save to Context** queues the change to send later.

Guides and Accessibility are read-only and don't send anything to the AI.

To ask the AI about elements without editing them, select them and press **⌘/Ctrl+Enter**. Describe what you want, choose what context to attach (code, styles, screenshot, console, network, terminal) and press **Submit**.

## Bug reporting

Testers report bugs directly on elements, and developers see them as 🐞 markers in their own running app.

Point everyone at a shared hub:

```ts
DomInspector.vite({ enabled: true, collabServerUrl: "https://your-hub-url" });
```

**Testers**

- Click 🐞 in the bar, click the broken element, describe what's wrong, and press **Submit report**. A screenshot and the element's location are attached.
- Or fix the element visually with any VisBug tool. In tester mode, **▶ Apply via AI** is replaced by **🐞 Report bug**, and the change you made is attached to the report.

**Developers**

- Switch the role toggle in the bar to `developer`. Open reports appear as 🐞 markers on the elements.
- Click a marker, then **✨ Resolve with AI** to have the agent fix it, or **✓** to mark it resolved.

## Add a new screen from a design

1. Click 🖼️ **Design a new screen from an image** in the bar.
2. Upload a screenshot of the design (for example from Figma).
3. Click parts of the image to pin them. For each pin, fill in its name and design tokens: colors, padding, radius, font and shadow, plus hover, disabled and other states.
4. Click **Send specs to agent**. The agent builds the screen in your codebase from the screenshot and the specs.

## Performance testing

Open 📥 **Context** → **Performance** to see the page's Core Web Vitals: **LCP, FCP, TTFB, CLS** and load time. Each is rated *good*, *needs improvement* or *poor*.

- **Re-run** reloads the page and measures again.
- **Fix with AI** appears on weak metrics. It sends the agent a targeted prompt to improve that metric.

## Other tabs

The 📥 **Context** dialog also has these tabs:

- **Inspections**: your queue of saved requests for the AI. Send them one at a time or use **Play All**; each shows its status (pending, in progress, done or failed).
- **Console / Network / Terminal**: browser logs, API requests and dev-server output, which you can attach to an AI request.
- **Page**: URL, title and viewport.
- **Routes**: your app's routes, with buttons that ask the AI to test the public and protected ones.
- **Bugs**: open bug reports, when bug reporting is enabled.

## AI agents and MCP

- **Agents.** The chat bar supports Claude Code (the default), Codex, Gemini CLI, GitHub Copilot, Cursor, Goose and other [ACP](https://agentclientprotocol.com) agents. Choose one from the agent menu.
- **MCP server.** The plugin also starts one at `http://localhost:6137/__mcp__/sse` and adds it to your editor's MCP config (Cursor, VS Code, Claude Code), so your editor's agent can inspect the page as well.

> If the agent in the bar says *"cannot be launched inside another Claude Code session"*, start your dev server from a normal terminal, not from inside Claude Code.

## License

MIT
