# dom-inspector-mcp

Point at any element in your running app, edit it visually, and let an AI coding agent make the same change in your source code.

`dom-inspector-mcp` is a dev-only bundler plugin (Vite, Webpack, Rollup, esbuild, Next.js). It adds:

- **A visual editor in the page**: a built-in copy of [VisBug](https://github.com/GoogleChromeLabs/ProjectVisBug). You can nudge margins, padding, flexbox, shadows, colors and text, then send each change to an AI agent with one click.
- **An Inspector Bar**: a floating chat bar wired to Claude Code, Codex, Gemini CLI, Copilot and other [ACP](https://agentclientprotocol.com) agents.
- **An MCP server**: your editor's agent (Claude Code, Cursor, VS Code, Windsurf) gets the page's elements, console, network, terminal output and layout-verification tools.
- **Team bug reporting**: testers pin bug reports onto elements, and developers see them on the page and fix them with AI.


▶ **[Watch the full demo video](https://unpkg.com/dom-inspector-mcp@0.1.49/docs/demo.mp4)** (13 min, 720p). It shows inspecting elements, editing with VisBug and applying the change via AI, the context dialog, and bug reporting.

---

## Contents

- [Install](#install)
- [Set up with an AI agent](#set-up-with-an-ai-agent)
- [Quick start](#quick-start)
- [The Inspector Bar](#the-inspector-bar)
- [Selecting and capturing elements](#selecting-and-capturing-elements)
- [VisBug tools and how they work with AI](#visbug-tools-and-how-they-work-with-ai)
- [The "Tell the AI" dialog](#the-tell-the-ai-dialog)
- [Full Page Context dialog: Inspections and all tabs](#full-page-context-dialog-inspections-and-all-tabs)
- [Bug reporting (tester / developer collaboration)](#bug-reporting-tester--developer-collaboration)
- [Designing a new screen from an image](#designing-a-new-screen-from-an-image)
- [AI agents](#ai-agents)
- [MCP server and tools](#mcp-server-and-tools)
- [Configuration reference](#configuration-reference)
- [CLI](#cli)
- [Troubleshooting](#troubleshooting)

---

## Install

```bash
npm install -D dom-inspector-mcp
```

The plugin runs only in development. Production builds get an empty module, so nothing ships to users.

## Set up with an AI agent

You can have your coding agent (Claude Code, Cursor, Copilot, Codex…) set the plugin up for you. Open your project and paste this prompt:

````text
Set up the npm package `dom-inspector-mcp` in this project. It is a dev-only
bundler plugin that adds an in-page element inspector, a VisBug visual editor,
an AI chat bar and an MCP server. Follow these steps exactly and do not change
anything unrelated.

1. Detect the project setup:
   - Package manager from the lockfile (package-lock.json → npm,
     pnpm-lock.yaml → pnpm, yarn.lock → yarn, bun.lockb → bun).
   - Bundler / framework: Vite (vite.config.*), Next.js (next.config.*),
     Webpack (webpack.config.*), Rollup or esbuild.
   - UI framework (React or Vue).
   If the bundler config can't be edited directly (for example plain Create React
   App), stop and tell me the options rather than ejecting.

2. Install it as a dev dependency, e.g. `npm install -D dom-inspector-mcp`.

3. Register the plugin.
   - Vite: in vite.config.*, add `import DomInspector from "dom-inspector-mcp"`
     and put `DomInspector.vite({ enabled: true })` as the FIRST entry in
     `plugins`, before react()/vue(), so it can instrument components.
   - Webpack: add `DomInspector.webpack({ enabled: true })` to `plugins`
     (CommonJS: `require("dom-inspector-mcp").default`). It only runs in
     development mode.
   - Next.js: in next.config.*, push `DomInspector.webpack({ enabled: true })`
     inside the `webpack` callback and add
     `turbopack: { rules: turbopackDomInspector({ enabled: true }) }`
     (both from "dom-inspector-mcp"). Then render `<DomInspector />` from
     "dom-inspector-mcp/next" at the end of <body> in the root layout
     (app/layout.tsx or pages/_app.tsx).
   - Rollup / esbuild: use `DomInspector.rollup(...)` / `DomInspector.esbuild(...)`.
   Keep the existing code style (quotes, semicolons, import style).

4. Add `.dom-inspector-uploads/` to .gitignore (images picked in the
   inspector are saved there).

5. Do NOT hand-edit .mcp.json, .cursor/mcp.json or .vscode/mcp.json. The
   plugin writes its MCP server entry into them automatically on dev start.

6. Optional: only if I gave you a collab hub URL for team bug reporting, add
   `collabServerUrl: "<that URL>"` (and `collabProjectKey: "<app name>"`) to
   the plugin options. Otherwise skip this.

7. Verify: run the project's type-check/lint if it has one. Do NOT start the
   dev server yourself (an agent session can't host the inspector's own
   agent). Instead tell me to start it in my own terminal and check that it
   prints `[dom-inspector] 📡 MCP: http://localhost:6137/__mcp__/sse` and that
   a pill reading "⌥I or hover to inspect" appears at the bottom of the page.

Finally, list every file you changed and why.
````

Then start your dev server from your own terminal and press **⌥I** in the app.

## Quick start

### Vite

```ts
// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import DomInspector from "dom-inspector-mcp";

export default defineConfig({
  plugins: [
    DomInspector.vite({ enabled: true }), // must come before react()
    react(),
  ],
});
```

### Webpack

```js
// webpack.config.js
const DomInspector = require("dom-inspector-mcp").default;

module.exports = {
  plugins: [DomInspector.webpack({ enabled: true })], // active when mode === "development"
};
```

### Next.js

```js
// next.config.js
const { default: DomInspector, turbopackDomInspector } = require("dom-inspector-mcp");

module.exports = {
  webpack: (config) => {
    config.plugins.push(DomInspector.webpack({ enabled: true }));
    return config;
  },
  turbopack: { rules: turbopackDomInspector({ enabled: true }) },
};
```

```tsx
// app/layout.tsx
import { DomInspector } from "dom-inspector-mcp/next";

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <DomInspector />
      </body>
    </html>
  );
}
```

Rollup and esbuild use `DomInspector.rollup()` and `DomInspector.esbuild()` in the same way.

Start your dev server. The terminal prints:

```
[dom-inspector] 📡 MCP: http://localhost:6137/__mcp__/sse
[dom-inspector] Updated Cursor: .cursor/mcp.json, Updated VSCode: .vscode/mcp.json, Updated Claude Code: .mcp.json
```

Open your app and a small pill appears at the bottom of the page: **"⌥I or hover to inspect"**.

---

## The Inspector Bar

The bar floats at the bottom-centre of the page. You can drag it anywhere.

- **Collapsed:** a small pill. Hover over it to expand it, or click outside to collapse it. While an agent is working, the pill shows live status: the current plan step, the tool being run, or the latest reply.
- **Expanded:** a 480 px bar. From left to right:

| Control | What it does |
|---|---|
| 📥 **Context** (badge = number of inspections) | Opens the [Full Page Context dialog](#full-page-context-dialog-inspections-and-all-tabs) |
| 🖼️ **Design a new screen from an image** | Opens [Annotate Design Specs](#designing-a-new-screen-from-an-image) |
| 🐞 **Report a bug on an element** *(collab only)* | Starts [bug reporting](#bug-reporting-tester--developer-collaboration) |
| 🔧 **Submit a correction** *(collab only)* | Edit an element live, then submit the change as a suggested correction |
| `tester` / `developer` *(collab only)* | Switches your role |
| ✅ **Capture N** *(while elements are selected)* | Captures the selection, the same as **⌘/Ctrl+Enter** |
| 👁️ **Toggle Inspector (⌥I)** | Turns inspect mode and the VisBug toolbar on or off |
| Agent icon | Chooses which [AI agent](#ai-agents) to talk to |
| **Ask Claude Code…** | Chat with the agent. **Enter** sends; **Esc** collapses the bar |
| ⌃ | Expands or collapses the chat panel |
| → / ■ | Send / **Cancel request** |

**Chat panel.** This shows the conversation with the agent, including each tool call it makes. Use the 📌 pin to keep the bar and panel open while you work on the page. The conversation is kept across page reloads.

**Quick-action chips.** When the bar is expanded and idle, chips appear above it: **Capture Element**, **Capture Area**, **List All Inspections**, **Get Stdio Messages**, **Get Network Requests**, **Get Console Messages**. They are MCP prompts. Clicking one fills the chat input with a ready-made prompt (and asks for any arguments first) so you can review it before sending. Add your own with the `prompts` option, or hide the built-ins with `defaultPrompts`.

### Keyboard shortcuts

| Key | Action |
|---|---|
| **⌥I / Alt+I** | Turn the inspector on or off |
| **⌘/Ctrl+Enter** | Capture the selected element(s) |
| **Shift+click** | Add or remove an element from the selection |
| **Esc** | Close the dialog and turn the inspector off |

---

## Selecting and capturing elements

1. Press **⌥I** (or click 👁️). The cursor becomes a crosshair and the VisBug toolbar appears on the left.
2. **Click** an element to select it. **Shift+click** adds more elements (for example, a whole card or form).
3. Press **⌘/Ctrl+Enter**, or click **Capture N** in the bar.
4. The ["Tell the AI" dialog](#the-tell-the-ai-dialog) opens with a screenshot, the source file and line, styles, and page details. Describe what you want and press **Submit**.

When you select several elements, the first one is the **primary** and the rest are **related elements**. The screenshot covers all of them. An empty description becomes `Region: N elements (primary: div)`.

Each element is mapped back to its **source file, component and line**. A tag is added during the build, with React Fiber metadata as a fallback, so the agent knows exactly which code to edit.

---

## VisBug tools and how they work with AI

When the inspector is on, the full VisBug toolbar is mounted on the left of the page. Select a tool by clicking its icon or pressing its hotkey. Every tool works on the **current selection** (click / shift+click).

**How the AI step works.** When you change an element with a tool that supports AI, two buttons appear next to it for 10 seconds:

- **▶ Apply via AI** sends a precise instruction to the agent in the Inspector Bar. The chat panel opens and the agent edits your source code.
- **💾 Save to Context** adds the change to the [Inspections](#inspections-tab-in-detail) queue, so you can collect several changes and send them later.

The instructions are deliberately strict. The agent is told *what the value was*, *what it is now*, to change **only** that property, and to prove the change. Most tools include a stable selector and an expected result, for example:

```
verify_dom_position({ selector: "#root > div:nth-of-type(2) > button:nth-of-type(1)",
                      expected: { padding: "12px 16px 12px 16px" } })
```

The agent must call that [MCP tool](#mcp-server-and-tools) after editing, and must not consider the change finished until it returns `pass: true`. If it fails, the agent gets a list of mismatches to fix.

### Toolbar at a glance

| Key | Tool | Changes the page | Works with AI |
|---|---|---|---|
| **G** | Guides | — (overlay only) | — |
| **I** | Inspect (metatip) | inline style edits | ▶ / 💾 |
| **X** | Accessibility | — (read-only) | — |
| **L** | Position | drag / nudge | ▶ / 💾 + `verify_dom_position` |
| **M** | Margin | margin | ▶ / 💾 + `verify_dom_position` |
| **P** | Padding | padding | ▶ / 💾 + `verify_dom_position` |
| **A** | Flexbox Align | flex properties | ▶ / 💾 + `verify_flex_layout` |
| **V** | Move | DOM order | ▶ / 💾 + `verify_dom_position` |
| **H** | Hue Shift | colors | ▶ / 💾 + `verify_dom_position` |
| **D** | Box Shadows | box-shadow | ▶ / 💾 + `verify_dom_position` |
| **F** | Font Styles | typography | — |
| **E** | Edit Text | text content | ▶ / 💾 |
| **S** | Search | selection | — |

`⌘` is Ctrl and `⌥` is Alt on Windows and Linux. Press **Shift+/** in any tool to see its hotkey cheat sheet.

### 1. Guides (G)

The default tool, for **measuring**.

- **Hover** any element to see pink guide lines along its edges.
- **Click** an element, then **hover** others to see the pixel distance between them.
- **Shift+click** keeps several measurements on screen. **Esc** clears them.

Guides only draws overlays. It doesn't change the page and doesn't send anything to the AI. Use it to find spacing problems before fixing them with Margin or Padding.

### 2. Accessibility (X)

An **accessibility checker** for any element.

- **Hover** to see a tooltip. **Click** to pin it, **Shift+click** to pin several, and **Esc** to clear.
- The tooltip shows:
  - The element's ARIA and accessibility attributes, and its `alt` and `title` text.
  - **WCAG 2.1 contrast ratio** with AA/AAA pass or fail for its text size.
  - **APCA** contrast with a pass or fail check.
  - L\* contrast, and a warning when the foreground color matches the background.

Accessibility is read-only and doesn't send anything to the AI. To fix a failing contrast, select the element and use **Hue Shift** or the metatip color editor, then **▶ Apply via AI**.

### 3. Move: Position (L) and Move (V)

VisBug has two "move" tools.

#### Position (L): put an element at an exact spot

- **Drag** a selected element with the mouse, or **nudge** it with the arrow keys: 1 px per press, or 10 px with **Shift**.
- While you drag, the element temporarily gets `position: relative` + `left`/`top` (or `transform` for SVG).
- **Alt+Delete** removes the temporary inline styles.

**AI.** When you stop (on mouse-up, or 600 ms after the last nudge), **▶ Apply via AI** appears. The agent receives:

- The bounding box before and after, and the net Δx/Δy.
- The element's computed position and margin, and its parent's layout (display, gap, flex-direction).

The agent is told to make the move using the layout's **existing** mechanism (margin, gap, flex, grid), and to remove the temporary override. It must also match the "after" bounding box exactly, within ±2 px, even if that means overlapping other elements. It verifies the result with `verify_dom_position({ expected: { elementRect } })`.

#### Move (V): reorder elements in the DOM

- **← / →** swaps the element with its previous or next sibling.
- **↑** moves it out of its parent, placing it just before the parent.
- **↓** moves it into the next sibling, or out after the parent.
- **Drag and drop:** select one element and grips appear on its siblings. Drag them to reorder.

**AI.** When the element's parent or position actually changes, the agent receives the old and new location (for example "child #2 of `<ul>`, between X and Y"). It is told to change **only the ordering**, and to reorder the underlying data array if the list comes from data rather than JSX. It verifies with `verify_dom_position({ expected: { index, siblingCount, parentRect, margin } })`.

### 4. Margin (M)

- **Arrow keys** add 1 px of margin on that side. **Shift** adds 10 px, and **Alt** shrinks instead (never below 0).
- **⌘↑ / ⌘↓** grows or shrinks all four sides at once.
- The margin is shown as a pink box overlay while you work.

**AI.** After each change you get **▶ Apply via AI**. The prompt is *"Update this element's margin in the source… It was: `margin: 0px 0px 8px 0px`. It is now: `margin: 0px 0px 16px 0px`… ONLY change the margin"*. The agent then calls `verify_dom_position({ expected: { margin: "0px 0px 16px 0px" } })`.

### 5. Padding (P)

Same keys as Margin, applied to **padding**: arrows, **Shift** for 10 px, **Alt** to shrink, and **⌘↑/↓** for all sides. The overlay includes borders.

**AI.** The prompt is the same as for Margin, for `padding`. The agent verifies the exact `padding` value with `verify_dom_position`.

### 6. Flexbox Align (A)

Select a container. Any change first sets `display: flex` on it.

| Keys | Changes |
|---|---|
| **← / →** | `justify-content`: flex-start → center → flex-end |
| **↑ / ↓** | `align-items`: flex-start → center → flex-end |
| **Shift + ← / →** | `justify-content`: space-around / space-between |
| **Shift + ↑ / ↓** | `align-content`: space-around / space-between |
| **⌘ + ← / →** | `flex-direction: row` |
| **⌘ + ↑ / ↓** | `flex-direction: column` |
| **⌘ + Shift + ← / →** | reverse direction (`row-reverse` / `column-reverse`) |
| **⌘ + Shift + ↑ / ↓** | `flex-wrap`: nowrap / wrap |

**AI.** Flexbox is the only tool that uses **`verify_flex_layout`**. The agent receives:

- The flex properties that changed (was → now), plus the full current set: display, direction, justify, align, wrap and gap.
- The container's **direct children in order**, with a snippet of their text.

It is told to change only the listed layout properties, and to update the source order if the children's order differs. It verifies the container's `style`, `childCount` and the selector of every child.

### 7. Box Shadows (D)

If the element has no shadow, it starts with a subtle one.

| Keys | Changes |
|---|---|
| **← / → / ↑ / ↓** | shadow X / Y offset (Shift = 10 px) |
| **Alt + ↑ / ↓** | blur |
| **Alt + ← / →** | spread |
| **⌘ + ← / →** | shadow opacity |
| **⌘ + ↓ / ↑** | make inset / remove inset |

**AI.** The prompt is *"Update this element's box-shadow in the source… It was / It is now… ONLY change the box-shadow"*. The agent verifies the exact `boxShadow` value with `verify_dom_position`.

### Other tools

- **Inspect (I).** Hover to see a tooltip with tag, id, classes, size and every computed style. **Click** to pin it. You can **edit any value inline**: classes, width/height, any CSS property, and colors through a color picker. Changes preview live. As soon as something changes, **💾** and **▶** appear in the tooltip header. ▶ sends *"Update the style of this element… `color`: `#333` → `#e11d48`"* to the agent.
- **Edit Text (E).** You can also **double-click** any element. The text becomes editable; when you click away, **▶ Apply via AI** asks the agent to change only that text in the source.
- **Hue Shift (H).** Adjusts the active color slot (text / background / border; switch with `[` `]`). **← / →** changes saturation, **↑ / ↓** lightness, **⌘↑ / ⌘↓** hue, and **⌘← / ⌘→** alpha. **AI:** the agent changes only those color properties and verifies them with `verify_dom_position`.
- **Font Styles (F).** Size, alignment, line-height, letter-spacing, weight, bold and italic. This is a visual preview only and is not sent to the AI.
- **Search (S).** Selects elements by CSS selector, or with the shortcuts `links`, `buttons`, `images` and `text`.
- **Image swap.** No toolbar button. **Drag an image file** onto an `<img>` or an element with a background image, or **Alt+click** it to pick a file. The image is saved into your project (`.dom-inspector-uploads/`). **▶ Apply via AI** asks the agent to move the image into your assets folder and update the reference.
- **Selection shortcuts (all tools).** Esc unselects. Delete removes an element and ⌘D duplicates it. Tab and Enter move through the element tree. Alt+Delete clears inline styles.

> **Tester mode:** when [bug reporting](#bug-reporting-tester--developer-collaboration) is enabled and your role is **tester**, ▶ Apply via AI is hidden everywhere. Every edit offers a single **🐞 Report bug** button instead.

---

## The "Tell the AI" dialog

This dialog opens after you capture elements.

1. **Describe the task** in the text box. **Enter** submits, and **Shift+Enter** submits and keeps inspecting.
2. **Choose what context to send.** Each tab shows a count of selected items:

| Tab | Contents | Selected by default |
|---|---|---|
| **Code** | Source file, component and line for each element. Click 💬 to add a note to a specific element | ✅ |
| **Styles** | Computed typography and color | ✅ |
| **Page** | URL, title, viewport, language, LCP and load time | ✅ |
| **Visual** | Screenshot of the element(s) | ✅ for multi-select |
| **Console** | Browser console messages (filterable) | pick |
| **Network** | Requests with full request and response details (filterable) | pick |
| **Terminal** | Your dev server's stdout and stderr | pick |

3. **Smart Select ✨** asks the agent to read the recent console, network and terminal entries, tick the ones relevant to your description, and explain why.
4. Choose how to send it:
   - **Submit** adds it to the Inspections queue, and returns it to any agent waiting on `capture_element_context`.
   - **Submit & Continue** queues it and keeps the inspector on, so you can capture more.
   - **Copy & Go** copies everything as Markdown (with the screenshot, where supported) so you can paste it into any AI chat.

---

## Full Page Context dialog: Inspections and all tabs

Click 📥 **Context** in the bar. The badge shows how many inspections are queued. The dialog has a **Copy All** / **Copy (N)** button, which copies the Console, Network, Terminal and Page tabs as Markdown, and a **Refresh** button.

### Inspections tab in detail

The Inspections tab is your **to-do list for the agent**. Items get there in four ways:

- **Submit** in the "Tell the AI" dialog.
- **💾 Save to Context** on any VisBug edit.
- Automatic captures by an agent through `capture_element_context` / `capture_area_context`.
- The `dom-inspector:inspect-element` browser event.

Each item card shows:

- The component and `file:line`.
- Your description.
- Tags for what's attached: **Code**, **Styles**, **Console (n)**, **Network (n)**.
- A colored status:

| Status | Meaning |
|---|---|
| ⚪ **Pending** | Waiting to be sent |
| 🔵 **In Progress** / **Processing… 2/5** | The agent is working on it, with a progress bar of its plan steps |
| 🟢 **Completed** | The agent edited the code, with its result message |
| 🔴 **Failed** | The agent couldn't do it, with the reason in red |

The actions are:

- **▶ Send to agent** (pending items)
- **↺ Retry with the agent** (failed items)
- **✕ Delete**
- **Play All (N)**: sends every pending item to the agent **one at a time**. Each starts only when the previous one finishes, so changes never get mixed together.

**How the status gets updated.** The agent reports progress through the `update_inspection_status` MCP tool:

- It sends a plan as steps (shown as `Step 2/5: Update padding` in the bar).
- It marks the item **completed** only if it actually changed code, otherwise **failed** with the reason.

The queue is stored in `localStorage`, so it survives page reloads.

### The other tabs

| Tab | What you can do |
|---|---|
| **Console** | Every console message from the page, with level badges and a filter. Tick entries to copy them |
| **Network** | Every fetch/XHR request. Expand one to see headers, request body and response |
| **Page** | URL, title, viewport and language |
| **Performance** | Core Web Vitals: **LCP, FCP, TTFB, CLS**, DOMContentLoaded and load time, each rated good / needs improvement / poor. **Re-run** reloads the page to measure again. **Fix with AI** appears on weak metrics and sends a targeted performance prompt to the agent |
| **Routes** | Your React Router route tree. Protected routes are marked **requires login**. **Test**, **Test Public Routes** and **Test Protected Routes** ask the agent to visit and check them |
| **Terminal** | Dev server stdout/stderr, filterable |
| **Bugs** *(collab only)* | All open bug reports and corrections, with **Resolve with AI** and **Mark resolved** |

---

## Bug reporting (tester / developer collaboration)

Testers and developers share one **collab hub**. A tester reports a bug **on the exact element**. Every developer pointed at the same hub then sees a 🐞 marker on that element in their own running app, and can send it to the AI to fix.

### Enable it

Point every machine at the same hub:

```ts
DomInspector.vite({
  enabled: true,
  collabServerUrl: "https://your-hub.example.com", // or env DOM_INSPECTOR_COLLAB_SERVER_URL
  collabProjectKey: "my-app",                      // optional; separates apps sharing one hub
});
```

When this is set, the bar shows 🐞, 🔧 and a **tester / developer** toggle. Your role is remembered per browser and defaults to **tester**.

### As a tester

- **Report a bug.** Click 🐞, click the broken element, and a **Report a bug** dialog opens. Explain *what's wrong and what you expected*, and press **Submit report**. The report saves the element's selector, a screenshot, your description and your role.
- **Report a visual fix.** Use any [VisBug tool](#visbug-tools-and-how-they-work-with-ai) to adjust the element (padding, margin, color, text…). In tester mode **▶ Apply via AI is hidden**, so you get **🐞 Report bug** instead. Clicking it opens the same dialog so you can explain the problem. The exact change you made (before → after) is attached under *"Change made with VisBug"*.
- **Suggest a correction.** Click 🔧, select an element, edit it with VisBug, then submit. The report includes a before/after table of the CSS properties you changed: color, background, font size/weight, padding, margin, border, radius, display, width and height.

### As a developer

- Open reports appear as markers on the element's top-right corner: 🐞 rose for bugs, violet for corrections, and faded for in-progress reports. Markers follow the element as you scroll and resize. Several reports on one element are fanned out.
- Click a marker to see the description, the selector and who reported it.
  - **✨ Resolve with AI** sets the report to *in progress* and sends the agent a full bug brief: element, page, description and before/after diff. The agent is asked for the root cause and a real fix, not a patch.
  - **✓ Mark resolved** closes it, and the marker disappears for everyone.
- The **Bugs** tab in the Context dialog lists every open report.

Reports go from `open` to `in_progress` (Resolve with AI) to `resolved` (Mark resolved). Clients check the hub every 4 seconds.

### Running a hub

The hub is a small REST API (`GET/POST /__collab__/reports`, `PATCH /__collab__/reports/:id`) that stores reports in a free [Turso](https://turso.tech) (libSQL) database. The hub needs two environment variables; client machines only need `collabServerUrl`.

```bash
export DOM_INSPECTOR_COLLAB_DB_URL="libsql://<db>-<org>.turso.io"
export DOM_INSPECTOR_COLLAB_DB_AUTH_TOKEN="<token>"
```

Pick one:

- **AWS Lambda** (Serverless Framework):
  ```bash
  npm run build:lambda && npx serverless deploy
  ```
  Then use the printed API URL as `collabServerUrl`.
- **Any Node host:**
  ```bash
  npm run build:hub && node dist-hub/index.js
  ```
  It listens on `$PORT`, default 8080.
- **A dev server or `npx dom-inspector-server`**: any instance started with the two DB variables also serves `/__collab__`.

> The hub has no authentication, and the tester/developer role is a UI preference. Don't expose a hub publicly unless anyone with the URL is allowed to read and create reports.

---

## Designing a new screen from an image

Turn a design screenshot (for example from Figma) into a new screen.

1. In the expanded bar, click 🖼️ **Design a new screen from an image**. The **Annotate Design Specs** dialog opens.
2. Click **Upload screenshot** (PNG or JPG). It is saved into your project at `.dom-inspector-uploads/` so the agent can open it.
3. **Click any part of the image** to drop a numbered pin, then describe that element in the side form:
   - **Component name** (required; for example "Primary Button") and **Type** (button, card, input, typography, color, spacing, icon, other).
   - Design tokens: **text color, background, padding, radius, font, size, weight, shadow**, and **notes**.
   - **+ Add state** for **hover, active, disabled and focus** variants, each with its own tokens.
4. Repeat for every important element. The **Specs (N)** list lets you edit, delete or clear pins.
5. Click **Send specs to agent**. The agent receives *"Build this UI from the following design specs…"* with the screenshot path and a JSON list of every pinned element, its position on the image, and its tokens for each state. It then builds the screen in your codebase. The chat panel opens so you can follow along and refine the result.

**Copy JSON** gives you the same spec to paste into any other tool.

> Add `.dom-inspector-uploads/` to your `.gitignore` if you don't want uploaded images committed.

---

## AI agents

The Inspector Bar talks to any agent that supports the [Agent Client Protocol](https://agentclientprotocol.com). Pick one from the agent menu; your choice is remembered.

| Agent | Command used |
|---|---|
| **Claude Code** (default) | `npx -y @zed-industries/claude-code-acp` |
| Codex CLI | `npx -y @zed-industries/codex-acp` |
| GitHub Copilot | `copilot --acp` |
| Gemini CLI | `gemini --experimental-acp` |
| Kimi CLI | `kimi --acp` |
| Goose | `goose acp` |
| Opencode | `opencode acp` |
| Cursor Agent | `cursor agent acp` |
| Droid | `droid exec --output-format acp` |
| CodeBuddy Code | `npx -y @tencent-ai/codebuddy-code --acp` |

The agent runs on your machine in your project folder, using your own login (for example `claude /login`). Use `agents`, `visibleAgents` and `defaultAgent` to customise the list.

---

## MCP server and tools

The plugin starts an MCP server at `http://localhost:6137/__mcp__/sse` and writes it into your editor's MCP config automatically:

- **Cursor:** `.cursor/mcp.json`
- **VS Code:** `.vscode/mcp.json`
- **Claude Code:** `.mcp.json`, only if the file already exists
- **Windsurf** and **Antigravity:** in your home directory, if they're installed

Any agent connected to it, whether the one in the bar or your editor's, gets these tools:

| Tool | What it does |
|---|---|
| `get_page_info` | URL, title, viewport and accessibility tree. The best place to start |
| `capture_element_context` | Waits for you to click an element (or takes a `selector`), then returns its source location, DOM path, styles, notes and screenshot |
| `capture_area_context` | Captures several elements (shift+click, or `containerSelector` / `bounds`), up to 50 |
| `list_inspections` | The Inspections queue and its statuses |
| `update_inspection_status` | Reports a plan, progress, completion or failure, which updates the UI live |
| `verify_dom_position` | Checks an element's box, position, margin, padding or styles against an expected spec, returning `{ pass, mismatches, actual }` |
| `verify_flex_layout` | Checks a flex or grid container's styles and child order against a spec |
| `edit_element_text` | Sets an element's text |
| `execute_page_script` | Runs JavaScript in the page and returns the result |
| `get_console_messages` | Browser console logs |
| `get_network_requests` | Browser network requests, with details |
| `get_stdio_messages` | Dev server terminal output |

With Chrome integration on (`disableChrome: false`), a `chrome_devtools` tool adds navigation, clicking, form filling, screenshots and DevTools console/network access.

You can expose your own tools from app code:

```ts
import { registerInspectorTool } from "virtual:dom-inspector-mcp";
```

---

## Configuration reference

```ts
DomInspector.vite({ /* options */ });
```

| Option | Default | Description |
|---|---|---|
| `enabled` | `NODE_ENV !== "production"` | Turn the plugin on or off |
| `port` | `6137` | MCP/inspector server port. Uses the next free port if taken (`DOM_INSPECTOR_PORT`) |
| `host` | `"localhost"` | Bind address. `true` / `"0.0.0.0"` binds all interfaces |
| `publicBaseUrl` | — | External URL when behind a proxy or cloud IDE (`DOM_INSPECTOR_PUBLIC_BASE_URL`) |
| `showInspectorBar` | `true` | Show the floating bar |
| `agents` / `visibleAgents` / `defaultAgent` | built-ins / all / `"Claude Code"` | Agent list, filter and default |
| `prompts` | — | Extra quick-action prompts (`{{arg}}` placeholders supported) |
| `defaultPrompts` | `true` | `true`, `false`, or a list of built-in prompt names to keep |
| `collabServerUrl` | — | Collab hub URL; enables bug reporting (`DOM_INSPECTOR_COLLAB_SERVER_URL`) |
| `collabProjectKey` | `"default"` | Separates projects sharing one hub (`DOM_INSPECTOR_COLLAB_PROJECT_KEY`) |
| `disableChrome` | `true` | Chrome DevTools integration is off by default (`DOM_INSPECTOR_DISABLE_CHROME=1` forces it off) |
| `autoOpenBrowser` | `false` | Open Chrome with DevTools on start (needs Chrome integration) |
| `browserUrl` | your app URL | URL to open |
| `updateConfig` | `true` | Write MCP config for detected editors: `true`, `"auto"`, `false` or a list of editor ids |
| `updateConfigServerName` | `"dom-inspector"` | Server name used in those configs |
| `autoInject` | `true` | Inject the inspector into HTML (Vite) |
| `entry` | — | File to inject into, for setups without HTML injection (`DOM_INSPECTOR_ENTRY`) |

An option value written as `"{ENV_NAME}"` is replaced with that environment variable.

---

## CLI

```bash
npx dom-inspector-server --port 6137  # run the inspector/MCP server on its own
```

Options: `--port`, `--host`, `--allowed-hosts a.com,.b.com`, `-h` for help.

---

## Troubleshooting

- **The agent in the bar fails with "Claude Code cannot be launched inside another Claude Code session".** You started the dev server from a terminal inside Claude Code, so it inherited `CLAUDECODE`. Start the dev server from a normal terminal, or run it with `env -u CLAUDECODE npm run dev`.
- **No 🐞 button.** Bug reporting appears only when `collabServerUrl` is set.
- **A bug marker doesn't appear.** The element couldn't be found on the current page. It may be on another route or not rendered yet. Markers reappear when the element does.
- **Nothing shows in production.** This is by design: the plugin only runs in development.

## License

MIT
