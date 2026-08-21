/**
 * Shared tool schemas for MCP inspector tools
 * Used by both server and client implementations
 */

export const TOOL_SCHEMAS = {
  capture_element_context: {
    name: "capture_element_context",
    description: `Capture single element context.

**Modes**:
1. **Interactive (default)**: User clicks element to select
2. **Automated**: Use \`selector\` param for programmatic capture

Returns: source location, DOM hierarchy, computed styles, dimensions, user notes, screenshot.`,
    inputSchema: {
      type: "object" as const,
      properties: {
        selector: {
          type: "string",
          description: "CSS selector for automated capture (no user interaction).",
        },
      },
    },
  },

  capture_area_context: {
    name: "capture_area_context",
    description: `Capture multiple elements in an area.

**Modes**:
1. **Interactive (default)**: User draws rectangle to select area
2. **Automated**: Use \`containerSelector\` or \`bounds\` param

Returns: array of element contexts (max 50).`,
    inputSchema: {
      type: "object" as const,
      properties: {
        containerSelector: {
          type: "string",
          description: "CSS selector for container - captures all meaningful child elements.",
        },
        bounds: {
          type: "object",
          properties: {
            x: { type: "number" },
            y: { type: "number" },
            width: { type: "number" },
            height: { type: "number" },
          },
          description:
            "Page coordinates - captures elements intersecting this area. Use get_page_info for context.",
        },
      },
    },
  },

  list_inspections: {
    name: "list_inspections",
    description:
      "List all captured inspections with ID, element details, source location, notes, and status (pending/in-progress/completed/failed).",
    inputSchema: {
      type: "object" as const,
      properties: {},
    },
  },

  update_inspection_status: {
    name: "update_inspection_status",
    description:
      "Update inspection status. Parameters: inspectionId (optional, auto-detects), status ('in-progress'|'completed'|'failed'|'deleted'), message (required for completed/failed).",
    inputSchema: {
      type: "object" as const,
      properties: {
        inspectionId: {
          type: "string",
          description: "Optional. If omitted, uses current active inspection.",
        },
        status: {
          type: "string",
          enum: ["in-progress", "completed", "failed", "deleted"],
          description: "New status.",
        },
        message: {
          type: "string",
          description: "Summary. Required for 'completed' or 'failed'.",
        },
      },
      required: ["status"] as string[],
    },
  },

  execute_page_script: {
    name: "execute_page_script",
    description:
      "Execute JavaScript in browser context. Access: window, document, DOM APIs, React/Vue instances, localStorage. Must return a value.",
    inputSchema: {
      type: "object" as const,
      properties: {
        code: {
          type: "string",
          description: "JavaScript code to execute. Must return a value.",
        },
      },
      required: ["code"] as string[],
    },
  },

  get_network_requests: {
    name: "get_network_requests",
    description: `Get network requests from browser. Returns list with reqid, method, URL, status. Use reqid param to get full request/response details.`,
    inputSchema: {
      type: "object" as const,
      properties: {
        reqid: {
          type: "number",
          description: "Request ID from list to get full details (headers, body, timing).",
        },
      },
    },
  },

  get_console_messages: {
    name: "get_console_messages",
    description: `Get console messages from browser. Returns list with msgid, level (log/warn/error), message. Use msgid param to get full message details.`,
    inputSchema: {
      type: "object" as const,
      properties: {
        msgid: {
          type: "number",
          description: "Message ID from list to get full details.",
        },
      },
    },
  },

  get_stdio_messages: {
    name: "get_stdio_messages",
    description: `Get dev server stdout/stderr. Returns list with stdioid, stream type, content. Use stdioid param to get full message.`,
    inputSchema: {
      type: "object" as const,
      properties: {
        stdioid: {
          type: "number",
          description: "Stdio ID from list to get full details.",
        },
      },
    },
  },

  verify_dom_position: {
    name: "verify_dom_position",
    description: `Verify an element's live DOM position/box after a source-code edit exactly matches an expected structural spec (produced by the DOM inspector's move feature).

Deterministically re-measures the element identified by \`selector\` (index among siblings, sibling count, parent box, own margin) and diffs it against \`expected\` with a small pixel tolerance.

Returns \`{ pass, mismatches, actual }\`. Use this instead of eyeballing bounding boxes — it is the authoritative check for "did my edit reproduce the requested DOM change with no side effects".`,
    inputSchema: {
      type: "object" as const,
      properties: {
        selector: {
          type: "string",
          description: "CSS selector locating the moved element in the current (post-edit) page.",
        },
        expected: {
          type: "object",
          description: "Expected structural spec, as emitted by the move feature's 'Apply via AI' prompt.",
          properties: {
            index: { type: "number", description: "Expected index among parent's children." },
            siblingCount: { type: "number", description: "Expected number of siblings (incl. this element)." },
            elementRect: {
              type: "object",
              properties: {
                x: { type: "number" },
                y: { type: "number" },
                width: { type: "number" },
                height: { type: "number" },
              },
              description: "Expected bounding box (viewport coords) of the element itself — use for pixel-repositioning checks (e.g. after a free-drag nudge).",
            },
            parentRect: {
              type: "object",
              properties: {
                width: { type: "number" },
                height: { type: "number" },
              },
              description: "Expected parent bounding box width/height in px.",
            },
            margin: { type: "string", description: "Expected computed margin (top right bottom left)." },
            rectTolerancePx: { type: "number", description: "Pixel tolerance for numeric comparisons. Default 2." },
          },
        },
      },
      required: ["selector", "expected"] as string[],
    },
  },

  get_page_info: {
    name: "get_page_info",
    description:
      "Get page overview with accessibility tree. Returns URL, title, viewport, document size, and semantic structure (landmarks, headings, forms, links). Start here to understand the page.",
    inputSchema: {
      type: "object" as const,
      properties: {},
    },
  },
} as const;
