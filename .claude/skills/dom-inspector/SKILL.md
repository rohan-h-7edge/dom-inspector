---
name: dom-inspector
description: Use the dom-inspector MCP server to inspect, capture, edit, and verify live DOM elements from a running app. Trigger when the user asks to inspect an element, review pending inspections/feedback, fix something flagged in the browser, edit live text, or verify a layout/position change against the DOM.
---

# dom-inspector workflow

The `dom-inspector` MCP server bridges a running browser tab (with the client injected via the bundler plugin) and this agent. Tools only work while a browser tab is actually connected — if a call times out, tell the user to open their app with the inspector client loaded (see `.mcp.json` / `.vscode/mcp.json` for the SSE endpoint) before retrying.

## Core loop

1. **`list_inspections`** — see what's pending. Each inspection has an id, element details, source location, user notes, and status (`pending`/`in-progress`/`completed`/`failed`).
2. **`capture_element_context`** / **`capture_area_context`** — get source location, DOM hierarchy, computed styles, and a screenshot for the element(s) in question. Use the `selector` (or `containerSelector`/`bounds`) param for automated capture instead of waiting on a user click/drag.
3. **`get_page_info`** — page overview (URL, title, viewport, accessibility tree) when you need broader context, e.g. to resolve coordinates for `capture_area_context`.
4. Mark the inspection **`in-progress`** via `update_inspection_status` before starting real work on it.
5. Make the actual source-code edit (find the component via the source location from step 2, edit it normally with Edit/Write).
6. **Verify against the live DOM before declaring done**:
   - `verify_dom_position` — for move/position/margin/padding changes. Pass the selector and the `expected` spec (copied verbatim from the "Apply via AI" prompt if the user used the visual tools, or built from the before/after values you changed).
   - `verify_flex_layout` — for a flex/grid *container's* own layout (display/direction/justify/align/wrap/gap) or its children's count/order.
   - Do not consider a layout edit done until the relevant verify tool reports `pass: true`. A mismatch is a real side effect (extra wrapper, missing margin, a CSS rule you didn't expect) — fix the actual cause, don't force a pass with compensating spacing.
7. **`update_inspection_status`** — mark `completed` (with a `message` summarizing what changed) or `failed` (with why) once verified.

## Direct element edits

- **`edit_element_text`** — set an element's `textContent` directly by selector. This is the AI-driven counterpart to the VisBug "edit text" tool (a human types inline; this sets it programmatically). No verify tool exists for text — just confirm visually via `capture_element_context`/screenshot if needed.
- **`execute_page_script`** — arbitrary script execution in the page for anything the other tools don't cover.

## Other tools

- **`get_network_requests`** / **`get_console_messages`** / **`get_stdio_messages`** — debugging context (network activity, browser console, and dev-server stdout/stderr respectively).

## Notes

- Prefer `selector`/`containerSelector`/`bounds` params over relying on interactive user selection — this agent should drive the tools automatically wherever the schema allows it, only falling back to "ask the user to click/select" when no selector is available.
- If `list_inspections` or any browser-driven tool times out repeatedly, the browser client isn't connected — don't keep retrying blindly, surface that to the user.
