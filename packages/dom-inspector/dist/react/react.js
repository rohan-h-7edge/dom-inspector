import { Client } from "@modelcontextprotocol/sdk/client";
import { SSEClientTransport } from "@modelcontextprotocol/sdk/client/sse.js";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { createClientExecClient } from "@mcpc-tech/cmcp";
import { ListPromptsResultSchema, PromptListChangedNotificationSchema } from "@modelcontextprotocol/sdk/types.js";

//#region src/tool-schemas.ts
/**
* Shared tool schemas for MCP inspector tools
* Used by both server and client implementations
*/
const TOOL_SCHEMAS = {
	capture_element_context: {
		name: "capture_element_context",
		description: `Capture single element context.

**Modes**:
1. **Interactive (default)**: User clicks element to select
2. **Automated**: Use \`selector\` param for programmatic capture

Returns: source location, DOM hierarchy, computed styles, dimensions, user notes, screenshot.`,
		inputSchema: {
			type: "object",
			properties: { selector: {
				type: "string",
				description: "CSS selector for automated capture (no user interaction)."
			} }
		}
	},
	capture_area_context: {
		name: "capture_area_context",
		description: `Capture multiple elements in an area.

**Modes**:
1. **Interactive (default)**: User draws rectangle to select area
2. **Automated**: Use \`containerSelector\` or \`bounds\` param

Returns: array of element contexts (max 50).`,
		inputSchema: {
			type: "object",
			properties: {
				containerSelector: {
					type: "string",
					description: "CSS selector for container - captures all meaningful child elements."
				},
				bounds: {
					type: "object",
					properties: {
						x: { type: "number" },
						y: { type: "number" },
						width: { type: "number" },
						height: { type: "number" }
					},
					description: "Page coordinates - captures elements intersecting this area. Use get_page_info for context."
				}
			}
		}
	},
	list_inspections: {
		name: "list_inspections",
		description: "List all captured inspections with ID, element details, source location, notes, and status (pending/in-progress/completed/failed).",
		inputSchema: {
			type: "object",
			properties: {}
		}
	},
	update_inspection_status: {
		name: "update_inspection_status",
		description: "Update inspection status. Parameters: inspectionId (optional, auto-detects), status ('in-progress'|'completed'|'failed'|'deleted'), message (required for completed/failed).",
		inputSchema: {
			type: "object",
			properties: {
				inspectionId: {
					type: "string",
					description: "Optional. If omitted, uses current active inspection."
				},
				status: {
					type: "string",
					enum: [
						"in-progress",
						"completed",
						"failed",
						"deleted"
					],
					description: "New status."
				},
				message: {
					type: "string",
					description: "Summary. Required for 'completed' or 'failed'."
				}
			},
			required: ["status"]
		}
	},
	execute_page_script: {
		name: "execute_page_script",
		description: "Execute JavaScript in browser context. Access: window, document, DOM APIs, React/Vue instances, localStorage. Must return a value.",
		inputSchema: {
			type: "object",
			properties: { code: {
				type: "string",
				description: "JavaScript code to execute. Must return a value."
			} },
			required: ["code"]
		}
	},
	get_network_requests: {
		name: "get_network_requests",
		description: `Get network requests from browser. Returns list with reqid, method, URL, status. Use reqid param to get full request/response details.`,
		inputSchema: {
			type: "object",
			properties: { reqid: {
				type: "number",
				description: "Request ID from list to get full details (headers, body, timing)."
			} }
		}
	},
	get_console_messages: {
		name: "get_console_messages",
		description: `Get console messages from browser. Returns list with msgid, level (log/warn/error), message. Use msgid param to get full message details.`,
		inputSchema: {
			type: "object",
			properties: { msgid: {
				type: "number",
				description: "Message ID from list to get full details."
			} }
		}
	},
	get_stdio_messages: {
		name: "get_stdio_messages",
		description: `Get dev server stdout/stderr. Returns list with stdioid, stream type, content. Use stdioid param to get full message.`,
		inputSchema: {
			type: "object",
			properties: { stdioid: {
				type: "number",
				description: "Stdio ID from list to get full details."
			} }
		}
	},
	verify_dom_position: {
		name: "verify_dom_position",
		description: `Diff a live element's position/box against an expected spec (emitted by the move/position/margin/padding features). Returns { pass, mismatches, actual }. Authoritative check — use instead of eyeballing rects.`,
		inputSchema: {
			type: "object",
			properties: {
				selector: {
					type: "string",
					description: "CSS selector for the element, post-edit."
				},
				expected: {
					type: "object",
					description: "Spec object copied verbatim from the 'Apply via AI' prompt: index, siblingCount, elementRect{x,y,width,height}, parentRect{width,height}, margin, padding, style (map of computed style property -> expected value, e.g. flexDirection/justifyContent/alignItems), rectTolerancePx."
				}
			},
			required: ["selector", "expected"]
		}
	},
	verify_flex_layout: {
		name: "verify_flex_layout",
		description: `Diff a live flex/grid container's layout against an expected spec (emitted by the flex feature). Checks the container's own computed style (display/flexDirection/justifyContent/alignItems/alignContent/flexWrap/gap) and, optionally, its children's count and order. Returns { pass, mismatches, actual }. Use this instead of verify_dom_position when the change was to a container's flex layout rather than an element's own box/position.`,
		inputSchema: {
			type: "object",
			properties: {
				selector: {
					type: "string",
					description: "CSS selector for the flex/grid container, post-edit."
				},
				expected: {
					type: "object",
					description: "Spec object copied verbatim from the 'Apply via AI' prompt: style (map of container computed style property -> expected value), childCount (expected number of direct children), childSelectors (expected stable selectors of direct children, in order)."
				}
			},
			required: ["selector", "expected"]
		}
	},
	get_page_info: {
		name: "get_page_info",
		description: "Get page overview with accessibility tree. Returns URL, title, viewport, document size, and semantic structure (landmarks, headings, forms, links). Start here to understand the page.",
		inputSchema: {
			type: "object",
			properties: {}
		}
	}
};

//#endregion
//#region client/constants/icons/claude-color.svg?raw
var claude_color_default = "<svg height=\"1em\" style=\"flex:none;line-height:1\" viewBox=\"0 0 24 24\" width=\"1em\" xmlns=\"http://www.w3.org/2000/svg\"><title>Claude</title><path d=\"M4.709 15.955l4.72-2.647.08-.23-.08-.128H9.2l-.79-.048-2.698-.073-2.339-.097-2.266-.122-.571-.121L0 11.784l.055-.352.48-.321.686.06 1.52.103 2.278.158 1.652.097 2.449.255h.389l.055-.157-.134-.098-.103-.097-2.358-1.596-2.552-1.688-1.336-.972-.724-.491-.364-.462-.158-1.008.656-.722.881.06.225.061.893.686 1.908 1.476 2.491 1.833.365.304.145-.103.019-.073-.164-.274-1.355-2.446-1.446-2.49-.644-1.032-.17-.619a2.97 2.97 0 01-.104-.729L6.283.134 6.696 0l.996.134.42.364.62 1.414 1.002 2.229 1.555 3.03.456.898.243.832.091.255h.158V9.01l.128-1.706.237-2.095.23-2.695.08-.76.376-.91.747-.492.584.28.48.685-.067.444-.286 1.851-.559 2.903-.364 1.942h.212l.243-.242.985-1.306 1.652-2.064.73-.82.85-.904.547-.431h1.033l.76 1.129-.34 1.166-1.064 1.347-.881 1.142-1.264 1.7-.79 1.36.073.11.188-.02 2.856-.606 1.543-.28 1.841-.315.833.388.091.395-.328.807-1.969.486-2.309.462-3.439.813-.042.03.049.061 1.549.146.662.036h1.622l3.02.225.79.522.474.638-.079.485-1.215.62-1.64-.389-3.829-.91-1.312-.329h-.182v.11l1.093 1.068 2.006 1.81 2.509 2.33.127.578-.322.455-.34-.049-2.205-1.657-.851-.747-1.926-1.62h-.128v.17l.444.649 2.345 3.521.122 1.08-.17.353-.608.213-.668-.122-1.374-1.925-1.415-2.167-1.143-1.943-.14.08-.674 7.254-.316.37-.729.28-.607-.461-.322-.747.322-1.476.389-1.924.315-1.53.286-1.9.17-.632-.012-.042-.14.018-1.434 1.967-2.18 2.945-1.726 1.845-.414.164-.717-.37.067-.662.401-.589 2.388-3.036 1.44-1.882.93-1.086-.006-.158h-.055L4.132 18.56l-1.13.146-.487-.456.061-.746.231-.243 1.908-1.312-.006.006z\" fill=\"#D97757\" fill-rule=\"nonzero\"></path></svg>";

//#endregion
//#region client/constants/icons/openai.svg?raw
var openai_default = "<svg fill=\"currentColor\" fill-rule=\"evenodd\" height=\"1em\" style=\"flex:none;line-height:1\" viewBox=\"0 0 24 24\" width=\"1em\" xmlns=\"http://www.w3.org/2000/svg\"><title>OpenAI</title><path d=\"M21.55 10.004a5.416 5.416 0 00-.478-4.501c-1.217-2.09-3.662-3.166-6.05-2.66A5.59 5.59 0 0010.831 1C8.39.995 6.224 2.546 5.473 4.838A5.553 5.553 0 001.76 7.496a5.487 5.487 0 00.691 6.5 5.416 5.416 0 00.477 4.502c1.217 2.09 3.662 3.165 6.05 2.66A5.586 5.586 0 0013.168 23c2.443.006 4.61-1.546 5.361-3.84a5.553 5.553 0 003.715-2.66 5.488 5.488 0 00-.693-6.497v.001zm-8.381 11.558a4.199 4.199 0 01-2.675-.954c.034-.018.093-.05.132-.074l4.44-2.53a.71.71 0 00.364-.623v-6.176l1.877 1.069c.02.01.033.029.036.05v5.115c-.003 2.274-1.87 4.118-4.174 4.123zM4.192 17.78a4.059 4.059 0 01-.498-2.763c.032.02.09.055.131.078l4.44 2.53c.225.13.504.13.73 0l5.42-3.088v2.138a.068.068 0 01-.027.057L9.9 19.288c-1.999 1.136-4.552.46-5.707-1.51h-.001zM3.023 8.216A4.15 4.15 0 015.198 6.41l-.002.151v5.06a.711.711 0 00.364.624l5.42 3.087-1.876 1.07a.067.067 0 01-.063.005l-4.489-2.559c-1.995-1.14-2.679-3.658-1.53-5.63h.001zm15.417 3.54l-5.42-3.088L14.896 7.6a.067.067 0 01.063-.006l4.489 2.557c1.998 1.14 2.683 3.662 1.529 5.633a4.163 4.163 0 01-2.174 1.807V12.38a.71.71 0 00-.363-.623zm1.867-2.773a6.04 6.04 0 00-.132-.078l-4.44-2.53a.731.731 0 00-.729 0l-5.42 3.088V7.325a.068.068 0 01.027-.057L14.1 4.713c2-1.137 4.555-.46 5.707 1.513.487.833.664 1.809.499 2.757h.001zm-11.741 3.81l-1.877-1.068a.065.065 0 01-.036-.051V6.559c.001-2.277 1.873-4.122 4.181-4.12.976 0 1.92.338 2.671.954-.034.018-.092.05-.131.073l-4.44 2.53a.71.71 0 00-.365.623l-.003 6.173v.002zm1.02-2.168L12 9.25l2.414 1.375v2.75L12 14.75l-2.415-1.375v-2.75z\"></path></svg>";

//#endregion
//#region client/constants/icons/gemini-color.svg?raw
var gemini_color_default = "<svg height=\"1em\" style=\"flex:none;line-height:1\" viewBox=\"0 0 24 24\" width=\"1em\" xmlns=\"http://www.w3.org/2000/svg\"><title>Gemini</title><path d=\"M20.616 10.835a14.147 14.147 0 01-4.45-3.001 14.111 14.111 0 01-3.678-6.452.503.503 0 00-.975 0 14.134 14.134 0 01-3.679 6.452 14.155 14.155 0 01-4.45 3.001c-.65.28-1.318.505-2.002.678a.502.502 0 000 .975c.684.172 1.35.397 2.002.677a14.147 14.147 0 014.45 3.001 14.112 14.112 0 013.679 6.453.502.502 0 00.975 0c.172-.685.397-1.351.677-2.003a14.145 14.145 0 013.001-4.45 14.113 14.113 0 016.453-3.678.503.503 0 000-.975 13.245 13.245 0 01-2.003-.678z\" fill=\"#3186FF\"></path><path d=\"M20.616 10.835a14.147 14.147 0 01-4.45-3.001 14.111 14.111 0 01-3.678-6.452.503.503 0 00-.975 0 14.134 14.134 0 01-3.679 6.452 14.155 14.155 0 01-4.45 3.001c-.65.28-1.318.505-2.002.678a.502.502 0 000 .975c.684.172 1.35.397 2.002.677a14.147 14.147 0 014.45 3.001 14.112 14.112 0 013.679 6.453.502.502 0 00.975 0c.172-.685.397-1.351.677-2.003a14.145 14.145 0 013.001-4.45 14.113 14.113 0 016.453-3.678.503.503 0 000-.975 13.245 13.245 0 01-2.003-.678z\" fill=\"url(#lobe-icons-gemini-fill-0)\"></path><path d=\"M20.616 10.835a14.147 14.147 0 01-4.45-3.001 14.111 14.111 0 01-3.678-6.452.503.503 0 00-.975 0 14.134 14.134 0 01-3.679 6.452 14.155 14.155 0 01-4.45 3.001c-.65.28-1.318.505-2.002.678a.502.502 0 000 .975c.684.172 1.35.397 2.002.677a14.147 14.147 0 014.45 3.001 14.112 14.112 0 013.679 6.453.502.502 0 00.975 0c.172-.685.397-1.351.677-2.003a14.145 14.145 0 013.001-4.45 14.113 14.113 0 016.453-3.678.503.503 0 000-.975 13.245 13.245 0 01-2.003-.678z\" fill=\"url(#lobe-icons-gemini-fill-1)\"></path><path d=\"M20.616 10.835a14.147 14.147 0 01-4.45-3.001 14.111 14.111 0 01-3.678-6.452.503.503 0 00-.975 0 14.134 14.134 0 01-3.679 6.452 14.155 14.155 0 01-4.45 3.001c-.65.28-1.318.505-2.002.678a.502.502 0 000 .975c.684.172 1.35.397 2.002.677a14.147 14.147 0 014.45 3.001 14.112 14.112 0 013.679 6.453.502.502 0 00.975 0c.172-.685.397-1.351.677-2.003a14.145 14.145 0 013.001-4.45 14.113 14.113 0 016.453-3.678.503.503 0 000-.975 13.245 13.245 0 01-2.003-.678z\" fill=\"url(#lobe-icons-gemini-fill-2)\"></path><defs><linearGradient gradientUnits=\"userSpaceOnUse\" id=\"lobe-icons-gemini-fill-0\" x1=\"7\" x2=\"11\" y1=\"15.5\" y2=\"12\"><stop stop-color=\"#08B962\"></stop><stop offset=\"1\" stop-color=\"#08B962\" stop-opacity=\"0\"></stop></linearGradient><linearGradient gradientUnits=\"userSpaceOnUse\" id=\"lobe-icons-gemini-fill-1\" x1=\"8\" x2=\"11.5\" y1=\"5.5\" y2=\"11\"><stop stop-color=\"#F94543\"></stop><stop offset=\"1\" stop-color=\"#F94543\" stop-opacity=\"0\"></stop></linearGradient><linearGradient gradientUnits=\"userSpaceOnUse\" id=\"lobe-icons-gemini-fill-2\" x1=\"3.5\" x2=\"17.5\" y1=\"13.5\" y2=\"12\"><stop stop-color=\"#FABC12\"></stop><stop offset=\".46\" stop-color=\"#FABC12\" stop-opacity=\"0\"></stop></linearGradient></defs></svg>";

//#endregion
//#region client/constants/icons/moonshot.svg?raw
var moonshot_default = "<svg fill=\"currentColor\" fill-rule=\"evenodd\" height=\"1em\" style=\"flex:none;line-height:1\" viewBox=\"0 0 24 24\" width=\"1em\" xmlns=\"http://www.w3.org/2000/svg\"><title>MoonshotAI</title><path d=\"M1.052 16.916l9.539 2.552a21.007 21.007 0 00.06 2.033l5.956 1.593a11.997 11.997 0 01-5.586.865l-.18-.016-.044-.004-.084-.009-.094-.01a11.605 11.605 0 01-.157-.02l-.107-.014-.11-.016a11.962 11.962 0 01-.32-.051l-.042-.008-.075-.013-.107-.02-.07-.015-.093-.019-.075-.016-.095-.02-.097-.023-.094-.022-.068-.017-.088-.022-.09-.024-.095-.025-.082-.023-.109-.03-.062-.02-.084-.025-.093-.028-.105-.034-.058-.019-.08-.026-.09-.031-.066-.024a6.293 6.293 0 01-.044-.015l-.068-.025-.101-.037-.057-.022-.08-.03-.087-.035-.088-.035-.079-.032-.095-.04-.063-.028-.063-.027a5.655 5.655 0 01-.041-.018l-.066-.03-.103-.047-.052-.024-.096-.046-.062-.03-.084-.04-.086-.044-.093-.047-.052-.027-.103-.055-.057-.03-.058-.032a6.49 6.49 0 01-.046-.026l-.094-.053-.06-.034-.051-.03-.072-.041-.082-.05-.093-.056-.052-.032-.084-.053-.061-.039-.079-.05-.07-.047-.053-.035a7.785 7.785 0 01-.054-.036l-.044-.03-.044-.03a6.066 6.066 0 01-.04-.028l-.057-.04-.076-.054-.069-.05-.074-.054-.056-.042-.076-.057-.076-.059-.086-.067-.045-.035-.064-.052-.074-.06-.089-.073-.046-.039-.046-.039a7.516 7.516 0 01-.043-.037l-.045-.04-.061-.053-.07-.062-.068-.06-.062-.058-.067-.062-.053-.05-.088-.084a13.28 13.28 0 01-.099-.097l-.029-.028-.041-.042-.069-.07-.05-.051-.05-.053a6.457 6.457 0 01-.168-.179l-.08-.088-.062-.07-.071-.08-.042-.049-.053-.062-.058-.068-.046-.056a7.175 7.175 0 01-.027-.033l-.045-.055-.066-.082-.041-.052-.05-.064-.02-.025a11.99 11.99 0 01-1.44-2.402zm-1.02-5.794l11.353 3.037a20.468 20.468 0 00-.469 2.011l10.817 2.894a12.076 12.076 0 01-1.845 2.005L.657 15.923l-.016-.046-.035-.104a11.965 11.965 0 01-.05-.153l-.007-.023a11.896 11.896 0 01-.207-.741l-.03-.126-.018-.08-.021-.097-.018-.081-.018-.09-.017-.084-.018-.094c-.026-.141-.05-.283-.071-.426l-.017-.118-.011-.083-.013-.102a12.01 12.01 0 01-.019-.161l-.005-.047a12.12 12.12 0 01-.034-2.145zm1.593-5.15l11.948 3.196c-.368.605-.705 1.231-1.01 1.875l11.295 3.022c-.142.82-.368 1.612-.668 2.365l-11.55-3.09L.124 10.26l.015-.1.008-.049.01-.067.015-.087.018-.098c.026-.148.056-.295.088-.442l.028-.124.02-.085.024-.097c.022-.09.045-.18.07-.268l.028-.102.023-.083.03-.1.025-.082.03-.096.026-.082.031-.095a11.896 11.896 0 011.01-2.232zm4.442-4.4L17.352 4.59a20.77 20.77 0 00-1.688 1.721l7.823 2.093c.267.852.442 1.744.513 2.665L2.106 5.213l.045-.065.027-.04.04-.055.046-.065.055-.076.054-.072.064-.086.05-.065.057-.073.055-.07.06-.074.055-.069.065-.077.054-.066.066-.077.053-.06.072-.082.053-.06.067-.074.054-.058.073-.078.058-.06.063-.067.168-.17.1-.098.059-.056.076-.071a12.084 12.084 0 012.272-1.677zM12.017 0h.097l.082.001.069.001.054.002.068.002.046.001.076.003.047.002.06.003.054.002.087.005.105.007.144.011.088.007.044.004.077.008.082.008.047.005.102.012.05.006.108.014.081.01.042.006.065.01.207.032.07.012.065.011.14.026.092.018.11.022.046.01.075.016.041.01L14.7.3l.042.01.065.015.049.012.071.017.096.024.112.03.113.03.113.032.05.015.07.02.078.024.073.023.05.016.05.016.076.025.099.033.102.036.048.017.064.023.093.034.11.041.116.045.1.04.047.02.06.024.041.018.063.026.04.018.057.025.11.048.1.046.074.035.075.036.06.028.092.046.091.045.102.052.053.028.049.026.046.024.06.033.041.022.052.029.088.05.106.06.087.051.057.034.053.032.096.059.088.055.098.062.036.024.064.041.084.056.04.027.062.042.062.043.023.017c.054.037.108.075.161.114l.083.06.065.048.056.043.086.065.082.064.04.03.05.041.086.069.079.065.085.071c.712.6 1.353 1.283 1.909 2.031L7.222.994l.062-.027.065-.028.081-.034.086-.035c.113-.045.227-.09.341-.131l.096-.035.093-.033.084-.03.096-.031c.087-.03.176-.058.264-.085l.091-.027.086-.025.102-.03.085-.023.1-.026L9.04.37l.09-.023.091-.022.095-.022.09-.02.098-.021.091-.02.095-.018.092-.018.1-.018.091-.016.098-.017.092-.014.097-.015.092-.013.102-.013.091-.012.105-.012.09-.01.105-.01c.093-.01.186-.018.28-.024l.106-.008.09-.005.11-.006.093-.004.1-.004.097-.002.099-.002.197-.002z\"></path></svg>";

//#endregion
//#region client/constants/icons/goose.svg?raw
var goose_default = "<svg fill=\"currentColor\" fill-rule=\"evenodd\" height=\"1em\" style=\"flex:none;line-height:1\" viewBox=\"0 0 24 24\" width=\"1em\" xmlns=\"http://www.w3.org/2000/svg\"><title>Goose</title><path d=\"M21.595 23.61c1.167-.254 2.405-.944 2.405-.944l-2.167-1.784a12.124 12.124 0 01-2.695-3.131 12.127 12.127 0 00-3.97-4.049l-.794-.462a1.115 1.115 0 01-.488-.815.844.844 0 01.154-.575c.413-.582 2.548-3.115 2.94-3.44.503-.416 1.065-.762 1.586-1.159.074-.056.148-.112.221-.17.003-.002.007-.004.009-.007.167-.131.325-.272.45-.438.453-.524.563-.988.59-1.193-.061-.197-.244-.639-.753-1.148.319.02.705.272 1.056.569.235-.376.481-.773.727-1.171.165-.266-.08-.465-.086-.471h-.001V3.22c-.007-.007-.206-.25-.471-.086-.567.35-1.134.702-1.639 1.021 0 0-.597-.012-1.305.599a2.464 2.464 0 00-.438.45l-.007.009c-.058.072-.114.147-.17.221-.397.521-.743 1.083-1.16 1.587-.323.391-2.857 2.526-3.44 2.94a.842.842 0 01-.574.153 1.115 1.115 0 01-.815-.488l-.462-.794a12.123 12.123 0 00-4.049-3.97 12.133 12.133 0 01-3.13-2.695L1.332 0S.643 1.238.39 2.405c.352.428 1.27 1.49 2.34 2.302C1.58 4.167.73 3.75.06 3.4c-.103.765-.063 1.92.043 2.816.726.317 1.961.806 3.219 1.066-1.006.236-2.11.278-2.961.262.15.554.358 1.119.64 1.688.119.263.25.52.39.77.452.125 2.222.383 3.164.171l-2.51.897a27.776 27.776 0 002.544 2.726c2.031-1.092 2.494-1.241 4.018-2.238-2.467 2.008-3.108 2.828-3.8 3.67l-.483.678c-.25.351-.469.725-.65 1.117-.61 1.31-1.47 4.1-1.47 4.1-.154.486.202.842.674.674 0 0 2.79-.861 4.1-1.47.392-.182.766-.4 1.118-.65l.677-.483c.227-.187.453-.37.701-.586 0 0 1.705 2.02 3.458 3.349l.896-2.511c-.211.942.046 2.712.17 3.163.252.142.509.272.772.392.569.28 1.134.49 1.688.64-.016-.853.026-1.956.261-2.962.26 1.258.75 2.493 1.067 3.219.895.106 2.051.146 2.816.043a73.87 73.87 0 01-1.308-2.67c.811 1.07 1.874 1.988 2.302 2.34h-.001z\"></path></svg>";

//#endregion
//#region client/constants/icons/cursor.svg?raw
var cursor_default = "<svg fill=\"currentColor\" fill-rule=\"evenodd\" height=\"1em\" style=\"flex:none;line-height:1\" viewBox=\"0 0 24 24\" width=\"1em\" xmlns=\"http://www.w3.org/2000/svg\"><title>Cursor</title><path d=\"M22.106 5.68L12.5.135a.998.998 0 00-.998 0L1.893 5.68a.84.84 0 00-.419.726v11.186c0 .3.16.577.42.727l9.607 5.547a.999.999 0 00.998 0l9.608-5.547a.84.84 0 00.42-.727V6.407a.84.84 0 00-.42-.726zm-.603 1.176L12.228 22.92c-.063.108-.228.064-.228-.061V12.34a.59.59 0 00-.295-.51l-9.11-5.26c-.107-.062-.063-.228.062-.228h18.55c.264 0 .428.286.296.514z\"></path></svg>";

//#endregion
//#region client/constants/icons/codebuddy.svg?raw
var codebuddy_default = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"32\" height=\"32\" viewBox=\"0 0 32 32\" fill=\"none\"><g clip-path=\"url(#clip0_830_6638)\"><rect width=\"32\" height=\"32\" rx=\"6.90526\" fill=\"url(#paint0_linear_830_6638)\"></rect><g filter=\"url(#filter0_f_830_6638)\"><circle cx=\"10.0861\" cy=\"27.9835\" r=\"11.2648\" fill=\"#28B894\" fill-opacity=\"0.4\"></circle></g><g filter=\"url(#filter1_f_830_6638)\"><circle cx=\"26.6723\" cy=\"34.895\" r=\"10.2963\" fill=\"#28B894\"></circle></g><path d=\"M24.4736 2.50224C24.7872 2.22094 24.8063 2.20926 25.0362 2.19546C25.4089 2.16822 25.7503 2.34741 26.3314 2.87637C27.6892 4.11019 29.5803 6.64682 30.7558 8.81306L31.2096 9.65385L31.8518 9.9732C32.4712 10.2862 33.4867 10.9279 33.9109 11.272C34.1027 11.4306 34.13 11.4338 34.3294 11.3562C35.2298 11.0056 36.5196 11.4703 37.6573 12.5618C38.6815 13.5434 39.6628 15.2201 40.0386 16.6199C40.0935 16.8452 40.1656 17.3298 40.1921 17.6905C40.2778 18.9568 39.8722 19.9685 39.0902 20.4264C38.9304 20.5186 38.9197 20.5434 38.9242 20.9417C38.9603 22.8383 38.4489 24.7316 37.4219 26.5778C36.2625 28.6509 34.1977 30.7958 31.4037 32.8162C29.9032 33.9081 26.3539 35.9762 24.7491 36.7022C20.9046 38.4331 17.8221 39.0965 15.145 38.7685C13.5483 38.5749 11.7415 37.9516 10.6721 37.2282C10.3906 37.0336 10.3455 37.0216 10.1305 37.0831C8.98558 37.412 7.48603 36.7359 6.21222 35.3219C5.70416 34.7565 4.88467 33.3691 4.61888 32.6266C4.00401 30.8887 4.1254 29.3203 4.94436 28.3837C5.15595 28.1425 5.16291 28.1326 5.11671 27.7272C5.04038 27.0631 5.00615 26.0799 5.04102 25.4457L5.06891 24.8533L4.17863 23.2801C2.80144 20.8296 1.92687 18.7717 1.58932 17.1996C1.41119 16.3377 1.42249 15.9551 1.64114 15.6721C1.77434 15.5012 2.21128 15.3234 2.73792 15.2261C4.06379 14.9934 6.95525 15.2039 10.1717 15.7718L10.5056 15.8305L11.2401 15.1809C12.459 14.1012 13.2686 13.4957 14.7613 12.5649C16.3172 11.5914 18.0733 10.7902 20.0507 10.1561L20.6856 9.95303L21.034 9.03695C22.2826 5.74089 23.5617 3.31103 24.4736 2.50224ZM14.0131 19.394C12.6022 20.2085 11.897 20.6164 11.3785 21.0729C9.27869 22.922 8.49391 25.8508 9.38789 28.502C9.60867 29.1567 10.0158 29.8629 10.8305 31.2742C11.6451 32.6851 12.053 33.3903 12.5095 33.9087C14.3585 36.0086 17.2873 36.7933 19.9386 35.8994C20.5931 35.6786 21.299 35.2718 22.7099 34.4572L30.8289 29.7697C32.2401 28.955 32.9458 28.5468 33.4643 28.0903C35.5641 26.2412 36.3489 23.3124 35.4549 20.6612C35.2342 20.0066 34.8273 19.3008 34.0128 17.8899C33.198 16.4787 32.7899 15.773 32.3333 15.2545C30.4843 13.1546 27.5555 12.3699 24.9042 13.2638C24.2496 13.4846 23.5433 13.8917 22.1321 14.7065L14.0131 19.394Z\" fill=\"url(#paint1_linear_830_6638)\"></path><rect x=\"14.7959\" y=\"25.0674\" width=\"3.20723\" height=\"6.66117\" rx=\"1.60361\" transform=\"rotate(-30 14.7959 25.0674)\" fill=\"white\"></rect><rect x=\"23.4492\" y=\"20.0713\" width=\"3.20723\" height=\"6.66117\" rx=\"1.60361\" transform=\"rotate(-30 23.4492 20.0713)\" fill=\"white\"></rect></g><defs><filter id=\"filter0_f_830_6638\" x=\"-11.9327\" y=\"5.96479\" width=\"44.0372\" height=\"44.0372\" filterUnits=\"userSpaceOnUse\" color-interpolation-filters=\"sRGB\"><feFlood flood-opacity=\"0\" result=\"BackgroundImageFix\"></feFlood><feBlend mode=\"normal\" in=\"SourceGraphic\" in2=\"BackgroundImageFix\" result=\"shape\"></feBlend><feGaussianBlur stdDeviation=\"5.37698\" result=\"effect1_foregroundBlur_830_6638\"></feGaussianBlur></filter><filter id=\"filter1_f_830_6638\" x=\"7.57568\" y=\"15.7983\" width=\"38.1934\" height=\"38.1934\" filterUnits=\"userSpaceOnUse\" color-interpolation-filters=\"sRGB\"><feFlood flood-opacity=\"0\" result=\"BackgroundImageFix\"></feFlood><feBlend mode=\"normal\" in=\"SourceGraphic\" in2=\"BackgroundImageFix\" result=\"shape\"></feBlend><feGaussianBlur stdDeviation=\"4.40015\" result=\"effect1_foregroundBlur_830_6638\"></feGaussianBlur></filter><linearGradient id=\"paint0_linear_830_6638\" x1=\"16\" y1=\"0\" x2=\"16\" y2=\"32\" gradientUnits=\"userSpaceOnUse\"><stop stop-color=\"#6C4DFF\"></stop><stop offset=\"1\" stop-color=\"#583ED3\"></stop></linearGradient><linearGradient id=\"paint1_linear_830_6638\" x1=\"13.3307\" y1=\"8.86225\" x2=\"28.3004\" y2=\"34.7904\" gradientUnits=\"userSpaceOnUse\"><stop stop-color=\"white\" stop-opacity=\"0.8\"></stop><stop offset=\"0.437689\" stop-color=\"white\"></stop></linearGradient><clipPath id=\"clip0_830_6638\"><rect width=\"32\" height=\"32\" rx=\"6.90526\" fill=\"white\"></rect></clipPath></defs></svg>";

//#endregion
//#region client/constants/icons/droid.svg?raw
var droid_default = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 20 20\" fill=\"currentColor\" width=\"1em\" height=\"1em\" style=\"flex:none;line-height:1\">\n  <path d=\"M13.9062 3.20484C13.8706 3.19623 13.8373 3.18019 13.8086 3.15788C13.7799 3.13552 13.7565 3.10743 13.74 3.07546C13.7234 3.04349 13.7142 3.00841 13.7128 2.97263C13.7115 2.93682 13.7181 2.90121 13.7322 2.86815C14.2188 1.71337 14.4334 0.789376 14.087 0.402562C13.1693 -0.623688 9.48933 1.41705 8.31598 2.10822C8.28457 2.12665 8.24942 2.13825 8.21299 2.14222C8.17656 2.14618 8.13967 2.14242 8.10486 2.13122C8.07004 2.12003 8.03809 2.10163 8.01123 2.0773C7.98437 2.05297 7.96323 2.02326 7.94918 1.99024C7.45597 0.83788 6.93748 0.036362 6.41194 0.00160127C5.01894 -0.0913635 3.89616 3.88951 3.56749 5.18697C3.5587 5.22173 3.54233 5.25423 3.5195 5.2822C3.49662 5.31021 3.46781 5.33305 3.43507 5.34918C3.40233 5.3653 3.36639 5.37432 3.32971 5.37561C3.29307 5.37694 3.25656 5.37052 3.22266 5.35677C2.03854 4.88225 1.09066 4.67288 0.694439 5.01078C-0.35788 5.90567 1.73432 9.49452 2.44305 10.6388C2.462 10.6694 2.47393 10.7037 2.47804 10.7392C2.48214 10.7748 2.47833 10.8108 2.46684 10.8447C2.45536 10.8787 2.43646 10.9099 2.41147 10.9361C2.38648 10.9623 2.35598 10.9828 2.32203 10.9965C1.14081 11.4775 0.318936 11.9831 0.282878 12.4956C0.187966 13.8541 4.26959 14.9491 5.60043 15.2696C5.63599 15.2783 5.66919 15.2943 5.69783 15.3167C5.72642 15.339 5.7498 15.3671 5.76625 15.399C5.78275 15.4309 5.79199 15.4659 5.79332 15.5016C5.79469 15.5373 5.78814 15.5729 5.77409 15.6059C5.28751 16.7607 5.07282 17.6851 5.41931 18.0715C6.33693 19.0977 10.0173 17.0574 11.1907 16.3662C11.2221 16.3477 11.2573 16.3361 11.2937 16.3321C11.3302 16.3281 11.3671 16.3318 11.4019 16.343C11.4368 16.3542 11.4687 16.3727 11.4955 16.397C11.5224 16.4214 11.5435 16.4511 11.5575 16.4842C12.0507 17.6362 12.5688 18.4377 13.0947 18.4729C14.4877 18.5654 15.6105 14.5849 15.9388 13.2871C15.9476 13.2524 15.9641 13.2199 15.987 13.192C16.0099 13.164 16.0388 13.1412 16.0716 13.1251C16.1043 13.1091 16.1403 13.1001 16.177 13.0988C16.2136 13.0975 16.2502 13.1039 16.284 13.1177C17.4681 13.5922 18.4156 13.8012 18.8122 13.4637C19.8646 12.5688 17.7719 8.97953 17.0632 7.83525C17.0444 7.80462 17.0326 7.77034 17.0286 7.73485C17.0245 7.69932 17.0284 7.66335 17.0399 7.62944C17.0514 7.59549 17.0702 7.56436 17.0951 7.53817C17.12 7.51198 17.1504 7.49129 17.1842 7.47758C18.3659 6.99659 19.1877 6.4909 19.2234 5.97838C19.3187 4.61989 15.2367 3.52497 13.9062 3.20484ZM12.3081 1.90249C12.5758 2.37055 11.1961 5.48935 10.1699 7.67079C10.1527 7.70725 10.1245 7.73772 10.0891 7.75809C10.0536 7.77847 10.0126 7.78776 9.97155 7.78473C9.93052 7.7817 9.8914 7.76646 9.85952 7.74112C9.82761 7.71573 9.80444 7.68146 9.79313 7.64286C9.37866 6.22454 8.90493 4.55809 8.39805 3.14341C8.37815 3.08787 8.37915 3.02724 8.40087 2.97239C8.42258 2.9175 8.46361 2.87195 8.51658 2.84386C9.78235 2.16966 11.9483 1.27437 12.3081 1.90249ZM6.24201 2.28849C6.77045 2.43481 8.05612 5.59161 8.91198 7.84176C8.92628 7.87935 8.92839 7.9203 8.91811 7.95914C8.90779 7.99794 8.88558 8.03274 8.85441 8.0589C8.8232 8.08505 8.78457 8.10126 8.74367 8.10534C8.70276 8.10946 8.66156 8.10126 8.62559 8.08185C7.30304 7.36603 5.76082 6.51318 4.37652 5.86242C4.32231 5.83676 4.27921 5.79322 4.25483 5.73947C4.23046 5.68575 4.22644 5.62532 4.24348 5.56898C4.65089 4.22058 5.53204 2.09246 6.24201 2.28849ZM2.23251 6.74474C2.71204 6.48363 5.91044 7.82923 8.14688 8.83002C8.18431 8.84675 8.21556 8.87424 8.23645 8.90884C8.25734 8.94339 8.26687 8.98341 8.26376 9.02343C8.26061 9.06344 8.24503 9.10156 8.219 9.13268C8.19301 9.16376 8.15787 9.1864 8.11828 9.19743C6.66435 9.60162 4.95511 10.0636 3.50449 10.558C3.44763 10.5772 3.38554 10.5762 3.32938 10.555C3.27322 10.5339 3.22655 10.4939 3.19779 10.4423C2.50771 9.2079 1.58802 7.09558 2.23251 6.74474ZM2.62832 12.6606C2.77794 12.1452 6.0153 10.8914 8.32261 10.0567C8.36116 10.0428 8.40319 10.0407 8.44297 10.0508C8.4828 10.0608 8.51849 10.0825 8.5453 10.1129C8.57208 10.1433 8.58874 10.181 8.59293 10.2209C8.59711 10.2607 8.5887 10.3009 8.56881 10.336C7.83438 11.6258 6.95986 13.1298 6.29258 14.4794C6.26651 14.5325 6.22187 14.5747 6.16671 14.5986C6.11158 14.6224 6.04954 14.6263 5.99168 14.6096C4.60903 14.2147 2.42689 13.353 2.62832 12.6606ZM7.19776 16.5707C6.92961 16.1031 8.30977 12.9839 9.33597 10.8029C9.35313 10.7664 9.38136 10.7359 9.41679 10.7155C9.45227 10.6952 9.49326 10.6859 9.53429 10.6889C9.57537 10.6919 9.61445 10.7072 9.64632 10.7325C9.67824 10.7579 9.7014 10.7922 9.71272 10.8308C10.1272 12.2487 10.6009 13.9156 11.1078 15.3303C11.1276 15.3858 11.1265 15.4463 11.1047 15.5011C11.0829 15.5559 11.0418 15.6014 10.9888 15.6294C9.7235 16.3023 7.5571 17.1993 7.19901 16.5707H7.19776ZM13.2638 16.1847C12.735 16.0388 11.4493 12.8817 10.5935 10.6315C10.5791 10.5938 10.5769 10.5528 10.5872 10.5139C10.5975 10.475 10.6198 10.4401 10.6511 10.414C10.6823 10.3878 10.7211 10.3716 10.762 10.3676C10.803 10.3635 10.8443 10.3719 10.8803 10.3914C12.2024 11.1072 13.745 11.9605 15.1289 12.6113C15.1832 12.6368 15.2264 12.6803 15.2508 12.7341C15.2752 12.7878 15.2792 12.8483 15.262 12.9047C14.855 14.2551 13.9738 16.3811 13.2638 16.1847ZM17.2733 11.7285C16.7934 11.99 13.5954 10.644 11.3586 9.64322C11.3211 9.62648 11.2899 9.599 11.269 9.5644C11.2481 9.52984 11.2386 9.48983 11.2417 9.44981C11.2448 9.40979 11.2604 9.37168 11.2864 9.34056C11.3124 9.30947 11.3476 9.28688 11.3871 9.27584C12.8415 8.87165 14.5503 8.40962 16.0009 7.91529C16.0579 7.89601 16.1201 7.89706 16.1763 7.91832C16.2326 7.93958 16.2793 7.97963 16.3081 8.03133C16.9977 9.26534 17.9174 11.378 17.2733 11.7285ZM16.8775 5.81266C16.7275 6.32842 13.4905 7.58227 11.1832 8.41693C11.1446 8.43092 11.1025 8.43302 11.0627 8.42299C11.0228 8.41293 10.987 8.39122 10.9602 8.36075C10.9334 8.33027 10.9168 8.29248 10.9126 8.2525C10.9085 8.21257 10.917 8.17231 10.937 8.13719C11.6711 6.84781 12.5456 5.3434 13.2129 3.99379C13.2391 3.94088 13.2837 3.8988 13.3389 3.87504C13.394 3.85127 13.456 3.84735 13.5138 3.86404C14.8964 4.26096 17.0785 5.12028 16.8775 5.81266Z\" fill=\"currentColor\" style=\"translate: none; rotate: none; scale: none; transform-origin: 0px 0px 0px; filter: drop-shadow(rgb(255, 255, 255) 0px 0px 0px); opacity: 1;\" data-svg-origin=\"9.75314524769783 9.237242697738111\" transform=\"matrix(1,0,0,1,0,0)\"></path>\n</svg>\n";

//#endregion
//#region client/constants/icons/githubcopilot.svg?raw
var githubcopilot_default = "<svg fill=\"currentColor\" fill-rule=\"evenodd\" height=\"1em\" style=\"flex:none;line-height:1\" viewBox=\"0 0 24 24\" width=\"1em\" xmlns=\"http://www.w3.org/2000/svg\"><title>GithubCopilot</title><path d=\"M19.245 5.364c1.322 1.36 1.877 3.216 2.11 5.817.622 0 1.2.135 1.592.654l.73.964c.21.278.323.61.323.955v2.62c0 .339-.173.669-.453.868C20.239 19.602 16.157 21.5 12 21.5c-4.6 0-9.205-2.583-11.547-4.258-.28-.2-.452-.53-.453-.868v-2.62c0-.345.113-.679.321-.956l.73-.963c.392-.517.974-.654 1.593-.654l.029-.297c.25-2.446.81-4.213 2.082-5.52 2.461-2.54 5.71-2.851 7.146-2.864h.198c1.436.013 4.685.323 7.146 2.864zm-7.244 4.328c-.284 0-.613.016-.962.05-.123.447-.305.85-.57 1.108-1.05 1.023-2.316 1.18-2.994 1.18-.638 0-1.306-.13-1.851-.464-.516.165-1.012.403-1.044.996a65.882 65.882 0 00-.063 2.884l-.002.48c-.002.563-.005 1.126-.013 1.69.002.326.204.63.51.765 2.482 1.102 4.83 1.657 6.99 1.657 2.156 0 4.504-.555 6.985-1.657a.854.854 0 00.51-.766c.03-1.682.006-3.372-.076-5.053-.031-.596-.528-.83-1.046-.996-.546.333-1.212.464-1.85.464-.677 0-1.942-.157-2.993-1.18-.266-.258-.447-.661-.57-1.108-.32-.032-.64-.049-.96-.05zm-2.525 4.013c.539 0 .976.426.976.95v1.753c0 .525-.437.95-.976.95a.964.964 0 01-.976-.95v-1.752c0-.525.437-.951.976-.951zm5 0c.539 0 .976.426.976.95v1.753c0 .525-.437.95-.976.95a.964.964 0 01-.976-.95v-1.752c0-.525.437-.951.976-.951zM7.635 5.087c-1.05.102-1.935.438-2.385.906-.975 1.037-.765 3.668-.21 4.224.405.394 1.17.657 1.995.657h.09c.649-.013 1.785-.176 2.73-1.11.435-.41.705-1.433.675-2.47-.03-.834-.27-1.52-.63-1.813-.39-.336-1.275-.482-2.265-.394zm6.465.394c-.36.292-.6.98-.63 1.813-.03 1.037.24 2.06.675 2.47.968.957 2.136 1.104 2.776 1.11h.044c.825 0 1.59-.263 1.995-.657.555-.556.765-3.187-.21-4.224-.45-.468-1.335-.804-2.385-.906-.99-.088-1.875.058-2.265.394zM12 7.615c-.24 0-.525.015-.84.044.03.16.045.336.06.526l-.001.159a2.94 2.94 0 01-.014.25c.225-.022.425-.027.612-.028h.366c.187 0 .387.006.612.028-.015-.146-.015-.277-.015-.409.015-.19.03-.365.06-.526a9.29 9.29 0 00-.84-.044z\"></path></svg>";

//#endregion
//#region client/constants/icons/opencode.png?png
var opencode_default = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAIAAADYYG7QAAADWklEQVR4nGKRktJjGEyAaaAdgA5GHUQIjDqIEBh1ECEw6iBCYNRBhMCgcxALkeoc7C3zchK5ubnIsOP48bMNzf1EKmYkprYXEhI4enA9Hx/PxUvXDh859f//f+JdE+jvwcvLraXnTKR6okKoqCCVj4/n/v1HAUEpv37/Jt41/Hy8oSE+fRNmE6+FcBpSU1WKjQ5mYGC4fPUmSa5hYGCoqy188eLV/IWriNdCOIQa6gpZWJhJcgcE2NmaBwW4e/jE/f37j2oOcnW2tbezwCrFz8+XEB8qyM+HS6+Pj8uPHz8jw/0YYEnu379/O3YdOHX6IvkOqq7MxSU1a3q7srLC2nXbfvz4iVXB0mXr0UT0dDWXLJxkYOLx7dt3chzEwcGuqqqIVSrA393czNDVI+r2nQd4TEADQoL8ly/sERTgx+MgfImakZERqzg3N2dNVd6yFRtJcg0DAwMxiYmEklpIkB/CyMtJ4uPlmTBxDkmuIRIQW1IzMDBYWZqkpURdvnIjLSX6zNmLIiJCIiJCBHX9Z2C4d+/hz5+/iLQFX0nNyclx58ZhZJF/IPD/P8P////+MzD8hwEoC5chp05fCA5Lh5ST1y7vM7P0ffrsBS5LiQ2hHz9+5hfVb9+xn6RChYGBYeWyaSRVNfgchJyoG5r6tmzdS5JTGBgYHB0sLcwN3b1iiNdCVKJet3774qXrSHUNGxtrU33xvAUrb9y8CxFhZmYCpyp8AYYvhP7+/csADu2qmk40KStLYxNj/M0ERhtrUyUlee0Xr/NyEiFChgY6//79//zpC5kO+vnz17adB7w8HPfsXP7l61dkKSVFudNnLl2/cRuP9us3bkMUCAsLMjAw8HBzu7nYXrl26/OXr/j8gb89xMjIaKCvxcrKiizY1lz29dv3oNBUkhK4sLDg2ZPbCoobNmzciUcZgVz2////8xeuIosE+LvLykq5ekaTmt0a6grPX7iC3zWkFYwMDAwiwoItjSWNzRMePXpKkkZrKxN/P3dv3ziCKklzUFFh2rdvP46fPKugIEu8LilJ8e6O6tWrt1y+cpPKDrp+/ba7q926VbNI0vXnz9+jx07XNfYSo5ioRj49waDrl406iBAYdRAhMOogQmDUQYTAqIMIgUHnIEAAAAD//xjiMCmHkZcfAAAAAElFTkSuQmCC";

//#endregion
//#region client/constants/icons.ts
const AGENT_ICONS = {
	claude: claude_color_default,
	openai: openai_default,
	gemini: gemini_color_default,
	moonshot: moonshot_default,
	goose: goose_default,
	cursor: cursor_default,
	droid: droid_default,
	githubcopilot: githubcopilot_default,
	opencode: opencode_default,
	codebuddy: codebuddy_default
};
function svgToDataUri(svg) {
	return `data:image/svg+xml,${encodeURIComponent(svg)}`;
}

//#endregion
//#region client/constants/agents.ts
const AVAILABLE_AGENTS = [
	{
		name: "Claude Code",
		command: "npx",
		args: ["-y", "@zed-industries/claude-code-acp"],
		env: [{
			key: "ANTHROPIC_API_KEY",
			required: false
		}, {
			key: "ANTHROPIC_BASE_URL",
			required: false
		}],
		configHint: "Anthropic's official CLI agent via Zed adapter",
		configLink: "https://github.com/zed-industries/claude-code-acp",
		npmPackage: "@zed-industries/claude-code-acp",
		npmArgs: [],
		meta: { icon: svgToDataUri(AGENT_ICONS.claude) }
	},
	{
		name: "Codex CLI",
		command: "npx",
		args: ["-y", "@zed-industries/codex-acp"],
		env: [{
			key: "OPENAI_API_KEY",
			required: false
		}],
		configHint: "OpenAI Codex CLI via Zed adapter",
		configLink: "https://github.com/zed-industries/codex-acp",
		npmPackage: "@zed-industries/codex-acp",
		npmArgs: [],
		meta: { icon: svgToDataUri(AGENT_ICONS.openai) }
	},
	{
		name: "GitHub Copilot",
		command: "copilot",
		args: ["--acp"],
		env: [],
		configHint: "GitHub's AI coding assistant with ACP support",
		configLink: "https://github.com/github/copilot",
		installCommand: "npm install -g @github/copilot@0.0.392",
		meta: { icon: svgToDataUri(AGENT_ICONS.githubcopilot) }
	},
	{
		name: "Gemini CLI",
		command: "gemini",
		args: ["--experimental-acp"],
		env: [{
			key: "GEMINI_API_KEY",
			required: false
		}],
		authMethodId: "gemini-api-key",
		configHint: "Official Google Gemini CLI with ACP support",
		configLink: "https://github.com/google-gemini/gemini-cli",
		meta: { icon: svgToDataUri(AGENT_ICONS.gemini) }
	},
	{
		name: "Kimi CLI",
		command: "kimi",
		args: ["--acp"],
		env: [],
		configHint: "Moonshot AI's CLI with built-in ACP support",
		configLink: "https://github.com/MoonshotAI/kimi-cli",
		installCommand: "uv tool install --python 3.13 kimi-cli",
		meta: { icon: svgToDataUri(AGENT_ICONS.moonshot) }
	},
	{
		name: "Goose",
		command: "goose",
		args: ["acp"],
		env: [],
		configHint: "Block's open-source agent with ACP support",
		configLink: "https://block.github.io/goose/docs/guides/acp-clients",
		installCommand: "pipx install goose-ai",
		meta: { icon: svgToDataUri(AGENT_ICONS.goose) }
	},
	{
		name: "Opencode",
		command: "opencode",
		args: ["acp"],
		env: [],
		configHint: "SST's open source agent with ACP support",
		configLink: "https://github.com/sst/opencode",
		meta: { icon: AGENT_ICONS.opencode }
	},
	{
		name: "Cursor Agent",
		command: "cursor",
		args: ["agent", "acp"],
		env: [],
		configHint: "Cursor's AI agent with native ACP support",
		configLink: "https://cursor.com/docs/cli/acp",
		meta: { icon: svgToDataUri(AGENT_ICONS.cursor) }
	},
	{
		name: "Droid",
		command: "droid",
		args: [
			"exec",
			"--output-format",
			"acp"
		],
		env: [{
			key: "FACTORY_API_KEY",
			required: false
		}],
		configHint: "Factory's AI coding agent with native ACP support",
		configLink: "https://docs.factory.ai/droid/overview",
		meta: { icon: svgToDataUri(AGENT_ICONS.droid) }
	},
	{
		name: "CodeBuddy Code",
		command: "npx",
		args: [
			"-y",
			"@tencent-ai/codebuddy-code",
			"--acp"
		],
		env: [
			{
				key: "CODEBUDDY_API_KEY",
				required: false
			},
			{
				key: "CODEBUDDY_INTERNET_ENVIRONMENT",
				required: false
			},
			{
				key: "CODEBUDDY_DEFER_TOOL_LOADING",
				required: true,
				default: "false"
			}
		],
		configHint: "Tencent Cloud's coding assistant",
		configLink: "https://copilot.tencent.com/docs/cli/acp",
		npmPackage: "@tencent-ai/codebuddy-code",
		npmArgs: [],
		meta: { icon: svgToDataUri(AGENT_ICONS.codebuddy) }
	}
];
const DEFAULT_AGENT = "Claude Code";

//#endregion
//#region client/utils/config-loader.ts
let configCache = null;
let configPromise = null;
/**
* Get the dev server base URL from injected config.
* Uses __DOM_INSPECTOR_CONFIG__ set by the plugin at build time.
* Falls back to window.location.origin for sidebar pages.
*/
function getDevServerBaseUrl() {
	const injectedConfig = window.__DOM_INSPECTOR_CONFIG__;
	const base = injectedConfig?.base || "/";
	if (injectedConfig?.baseUrl && typeof injectedConfig.baseUrl === "string") return injectedConfig.baseUrl.replace(/\/$/, "");
	if (injectedConfig?.host && injectedConfig?.port) return `http://${injectedConfig.host}:${injectedConfig.port}${base}`.replace(/\/$/, "");
	if (typeof window !== "undefined" && window.location?.origin) return window.location.origin;
	return `http://localhost:6137`;
}
/**
* Merge custom agent with default agent properties
* If a custom agent has the same name as a default agent, fill in missing properties
*/
function mergeAgentWithDefaults(customAgent) {
	const defaultAgent = AVAILABLE_AGENTS.find((a) => a.name === customAgent.name);
	if (!defaultAgent) return customAgent;
	return {
		...defaultAgent,
		...customAgent,
		meta: customAgent.meta || defaultAgent.meta,
		env: customAgent.env || defaultAgent.env
	};
}
/**
* Load configuration from the server
*/
async function loadConfig() {
	if (configCache) return configCache;
	if (configPromise) return configPromise;
	const baseUrl = getDevServerBaseUrl();
	configPromise = fetch(`${baseUrl}/__inspector__/config.json`).then((res) => res.json()).then((config) => {
		configCache = config;
		return config;
	}).catch((err) => {
		console.warn("[Inspector] Failed to load config:", err);
		configCache = {};
		return {};
	}).finally(() => {
		configPromise = null;
	});
	return configPromise;
}
/**
* Get available agents (merged with custom configuration and filtered by visibleAgents)
*/
async function getAvailableAgents() {
	const config = await loadConfig();
	let agents;
	if (config.agents && config.agents.length > 0) agents = config.agents.map(mergeAgentWithDefaults);
	else agents = AVAILABLE_AGENTS;
	if (config.visibleAgents && config.visibleAgents.length > 0) agents = agents.filter((agent) => config.visibleAgents.includes(agent.name));
	return agents;
}
/**
* Get the default agent name
* Falls back to DEFAULT_AGENT_NAME if configured agent doesn't exist
*/
async function getDefaultAgent() {
	const name = (await loadConfig()).defaultAgent;
	if (name && AVAILABLE_AGENTS.some((a) => a.name === name)) return name;
	return DEFAULT_AGENT;
}

//#endregion
//#region client/utils/format.ts
/**
* Format DOM element info only (for Code tab)
*/
function formatDomElement(elementInfo) {
	if (!elementInfo) return "";
	const { tagName, textContent, className, id: elemId, domPath, boundingBox } = elementInfo;
	let output = `### DOM Element
\`\`\`
Tag: <${tagName}${elemId ? ` id="${elemId}"` : ""}${className ? ` class="${className}"` : ""}>
Text: ${textContent || "(empty)"}
Path: ${domPath || "N/A"}
\`\`\`
`;
	if (boundingBox) output += `
### Position & Size
- **Position**: (${Math.round(boundingBox.x)}, ${Math.round(boundingBox.y)})
- **Size**: ${Math.round(boundingBox.width)}px × ${Math.round(boundingBox.height)}px
`;
	return output;
}
/**
* Format computed styles only (for Styles tab)
*/
function formatComputedStyles(elementInfo) {
	if (!elementInfo) return "";
	const { computedStyles, styles } = elementInfo;
	if (computedStyles) return `### Computed Styles

**Layout**:
- display: ${computedStyles.layout.display}
- position: ${computedStyles.layout.position}
- z-index: ${computedStyles.layout.zIndex}

**Typography**:
- font: ${computedStyles.typography.fontSize} ${computedStyles.typography.fontFamily}
- color: ${computedStyles.typography.color}
- text-align: ${computedStyles.typography.textAlign}

**Spacing**:
- padding: ${computedStyles.spacing.padding}
- margin: ${computedStyles.spacing.margin}

**Background & Border**:
- background: ${computedStyles.background.backgroundColor}
- border: ${computedStyles.border.border}
- border-radius: ${computedStyles.border.borderRadius}
`;
	else if (styles) return `### Key Styles
- display: ${styles.display}
- color: ${styles.color}
- background: ${styles.backgroundColor}
- font-size: ${styles.fontSize}
`;
	return "";
}
/**
* Format source location
*/
function formatSourceInfo(sourceInfo) {
	return `## Source Code
- **File**: ${sourceInfo.file}
- **Line**: ${sourceInfo.line}:${sourceInfo.column}
- **Component**: ${sourceInfo.component}
`;
}
/**
* Format console messages
*/
function formatConsoleMessages(messages) {
	if (messages.length === 0) return "";
	const formatted = messages.map((msg) => {
		return `- ${msg.level === "error" ? "❌" : msg.level === "warn" ? "⚠️" : "📝"} [${msg.level}] ${msg.text}`;
	}).join("\n");
	return `## Console Messages (${messages.length})
${formatted}
`;
}
/**
* Format network requests
*/
function formatNetworkRequests(requests) {
	if (requests.length === 0) return "";
	const formatted = requests.map((req) => {
		let entry = `### ${req.method} ${req.url}
- **Status**: ${req.status}
`;
		if (req.details && req.details !== "(expand request to load details)") entry += `
#### Details
\`\`\`
${req.details}
\`\`\`
`;
		return entry;
	}).join("\n");
	return `## Network Requests (${requests.length})
${formatted}
`;
}
/**
* Format stdio messages
*/
function formatStdioMessages(messages) {
	if (messages.length === 0) return "";
	const formatted = messages.map((msg) => {
		return `- [${msg.stream}] ${msg.data}`;
	}).join("\n");
	return `## Terminal Logs (${messages.length})
${formatted}
`;
}
/**
* Format page information
*/
function formatPageInfo(pageInfo) {
	return `## Page Information
- **URL**: ${pageInfo.url}
- **Title**: ${pageInfo.title}
- **Viewport**: ${pageInfo.viewport.width} × ${pageInfo.viewport.height}
- **Language**: ${pageInfo.language}
`;
}
/**
* Format element annotations (notes) from primary and related elements
*/
function formatElementAnnotations(options) {
	const { primaryNote, primaryTag, relatedElements, elementNotes } = options;
	const notes = [];
	const isMultiSelection = !!relatedElements && relatedElements.length > 0;
	if (primaryNote) {
		const tag = primaryTag || "element";
		const label = isMultiSelection ? "Selected element 1" : "Primary element";
		notes.push(`- **${label}** (${tag}): ${primaryNote}`);
	}
	if (relatedElements && relatedElements.length > 0) relatedElements.forEach((el, idx) => {
		const note = el.note || elementNotes?.[idx];
		if (note) {
			const tag = el.elementInfo?.tagName?.toLowerCase() || el.component;
			const location = el.file && el.line ? ` at ${el.file}:${el.line}` : "";
			notes.push(`- **Selected element ${idx + 2}** (${tag}${location}): ${note}`);
		}
	});
	return notes.length > 0 ? `\n**Element Annotations**:\n${notes.join("\n")}\n` : "";
}
/**
* Format complete context for Copy & Go (matches ContextPicker tab structure)
*/
function formatCopyContext(options) {
	const { sourceInfo, includeElement, includeStyles, includePageInfo, pageInfo, feedback, consoleMessages, networkRequests, stdioMessages, relatedElements, relatedElementIds, elementNotes } = options;
	let output = "# Element Context\n\n";
	const hasRelatedElements = relatedElements && relatedElements.length > 0 && relatedElementIds && relatedElementIds.length > 0;
	if (hasRelatedElements) {
		const selectedCount = (relatedElementIds?.length ?? 0) + (includeElement ? 1 : 0);
		output += `## Multi-Element Selection\n\n`;
		output += `**The user manually selected ${selectedCount} elements together** — treat them as one linked group, not independent/alternative matches. Any request below applies to all of them jointly unless a note says otherwise.\n\n`;
		output += `If the request mentions spacing/gap without specifying which elements, assume it means the gap *between* these ${selectedCount} selected elements (their shared container's \`gap\`/margin-between-siblings) — NOT the internal padding/margin inside any one of the individual selected elements.\n\n`;
		output += `To make that change: open the source file(s) shown below for these elements, find the parent/container that renders them together (search other files for where that component is used/rendered if the container isn't in the same file), and adjust the gap/margin on that shared container rather than on the individual element(s).\n\n`;
	}
	if (sourceInfo && includeElement) {
		output += "## Code\n\n";
		if (hasRelatedElements) output += "### Selected Element 1 (of the group above)\n";
		output += formatSourceInfo(sourceInfo);
		output += "\n";
		output += formatDomElement(sourceInfo.elementInfo);
		output += "\n";
	}
	if (relatedElements && relatedElements.length > 0 && relatedElementIds && relatedElementIds.length > 0) {
		const selectedElements = relatedElements.filter((_, idx) => relatedElementIds.includes(idx));
		if (selectedElements.length > 0) {
			output += includeElement ? "## Remaining Selected Elements (same group)\n\n" : "## Selected Elements (multi-selection group)\n\n";
			const grouped = selectedElements.reduce((acc, el) => {
				const file = el.file || "unknown";
				if (!acc[file]) acc[file] = [];
				acc[file].push(el);
				return acc;
			}, {});
			Object.entries(grouped).forEach(([file, elements]) => {
				output += `### ${file}\n`;
				elements.forEach((el) => {
					const originalIndex = relatedElements.indexOf(el);
					const note = elementNotes ? elementNotes[originalIndex] : null;
					output += `- **${el.component}** (${el.line}:${el.column})`;
					if (el.elementInfo?.tagName) {
						output += ` - \`<${el.elementInfo.tagName}`;
						if (el.elementInfo.className) output += ` class="${el.elementInfo.className}"`;
						if (el.elementInfo.id) output += ` id="${el.elementInfo.id}"`;
						output += `>`;
						if (el.elementInfo.textContent) {
							const preview = el.elementInfo.textContent.trim().slice(0, 30);
							if (preview) output += ` "${preview}${el.elementInfo.textContent.length > 30 ? "..." : ""}"`;
						}
						output += "`";
					}
					if (note) output += `\n  - **USER NOTE**: "${note}"`;
					output += "\n";
					if (includeStyles && el.elementInfo) {
						const elStyles = formatComputedStyles(el.elementInfo);
						if (elStyles) output += `\n${elStyles}\n`;
					}
				});
				output += "\n";
			});
		}
	}
	if (sourceInfo?.elementInfo && includeStyles) {
		output += hasRelatedElements ? "## Styles (Primary Element)\n\n" : "## Styles\n\n";
		output += formatComputedStyles(sourceInfo.elementInfo);
		output += "\n";
	}
	if (pageInfo && includePageInfo) {
		output += formatPageInfo(pageInfo);
		output += "\n";
	}
	if (feedback) output += `## User Request\n\n${feedback}\n\n`;
	if (consoleMessages && consoleMessages.length > 0) {
		output += formatConsoleMessages(consoleMessages);
		output += "\n";
	}
	if (networkRequests && networkRequests.length > 0) {
		output += formatNetworkRequests(networkRequests);
		output += "\n";
	}
	if (stdioMessages && stdioMessages.length > 0) output += formatStdioMessages(stdioMessages);
	return output.trim();
}

//#endregion
//#region client/hooks/useMcp.ts
const STORAGE_KEY = "inspector-inspection-items";
const INSPECTION_ID_KEY = "inspector-current-inspection-id";
const TIMEOUT_MS = 6e5;
let pendingResolve = null;
let pendingReject = null;
function clearPendingRequest() {
	pendingResolve = null;
	pendingReject = null;
}
function cancelPendingRequest(reason) {
	if (pendingReject) {
		pendingReject(new Error(reason));
		clearPendingRequest();
	}
}
function activateInspector() {
	window.dispatchEvent(new CustomEvent("activate-inspector"));
	return { success: true };
}
function createTextContent(text) {
	return { content: [{
		type: "text",
		text
	}] };
}
function wrapToolImplementation(toolName, implementation) {
	return async (args) => {
		try {
			const result = await implementation(args);
			if (result === void 0 || result === null) return createTextContent("(no result)");
			if (typeof result === "object") {
				if ("content" in result && Array.isArray(result.content)) return result;
				return createTextContent(JSON.stringify(result, null, 2));
			}
			return createTextContent(String(result));
		} catch (error) {
			const errorMessage = error instanceof Error ? error.message : String(error);
			const errorStack = error instanceof Error ? error.stack : "";
			return createTextContent(`# Error executing ${toolName}\n\n\`\`\`\n${errorMessage}\n\`\`\`\n\n${errorStack ? `## Stack Trace\n\`\`\`\n${errorStack}\n\`\`\`\n` : ""}`);
		}
	};
}
function createImageContent(dataUrl) {
	return {
		type: "image",
		data: dataUrl.replace(/^data:image\/\w+;base64,/, ""),
		mimeType: "image/png"
	};
}
function formatElementInfoSimple(elementInfo) {
	if (!elementInfo) return "";
	const { tagName, textContent, className, id: elemId } = elementInfo;
	return `\n**DOM Element**: \`<${tagName}${elemId ? ` id="${elemId}"` : ""}${className ? ` class="${className}"` : ""}>\` - ${textContent || "(empty)"}\n`;
}
function getAllFeedbacks() {
	try {
		const saved = localStorage.getItem(STORAGE_KEY);
		const items = saved ? JSON.parse(saved) : [];
		if (items.length === 0) return createTextContent("# No Inspection Items\n\nThe queue is empty. Use 'capture_element_context' to capture elements for investigation.");
		const feedbackList = items.map((item, index) => {
			const { id, sourceInfo, description, status, progress, result, selectedContext } = item;
			const statusText = status === "loading" && progress ? `LOADING (${progress.completed}/${progress.total} steps)` : status.toUpperCase();
			const notesSection = formatElementAnnotations({
				primaryNote: sourceInfo.note,
				primaryTag: sourceInfo.elementInfo?.tagName?.toLowerCase() || sourceInfo.component,
				relatedElements: sourceInfo.relatedElements
			});
			let contextSection = "";
			if (selectedContext) {
				const parts = [];
				if (selectedContext.consoleMessages?.length > 0) parts.push(formatConsoleMessages(selectedContext.consoleMessages).trim());
				if (selectedContext.networkRequests?.length > 0) parts.push(formatNetworkRequests(selectedContext.networkRequests).trim());
				if (selectedContext.stdioMessages?.length > 0) parts.push(formatStdioMessages(selectedContext.stdioMessages).trim());
				if (parts.length > 0) contextSection = `\n${parts.join("\n\n")}\n`;
			}
			return `## ${index + 1}. Feedback ID: \`${id}\`

**Status**: ${statusText}
**File**: ${sourceInfo.file}
**Line**: ${sourceInfo.line}
**Component**: ${sourceInfo.component}
${formatElementInfoSimple(sourceInfo.elementInfo)}
**User Request**:
${description}
${notesSection}${contextSection}
${result ? `**Result**: ${result}\n` : ""}---`;
		}).join("\n\n");
		const content = [{
			type: "text",
			text: `# Inspection Queue (${items.length} items)\n\n${feedbackList}

## How to Update

Use \`update_inspection_status\` tool to update any inspection:

\`\`\`
update_inspection_status({
  inspectionId: "feedback-xxx",  // Copy from above
  status: "completed",
  message: "Your findings here"
})
\`\`\``
		}];
		items.forEach((item) => {
			if (item.selectedContext?.screenshot) content.push(createImageContent(item.selectedContext.screenshot));
		});
		return { content };
	} catch {
		return createTextContent("# Error\n\nFailed to load inspection items.");
	}
}
function formatResult(sourceInfo, description, selectedContext) {
	let output = formatCopyContext({
		sourceInfo,
		includeElement: selectedContext?.includeElement !== false,
		includeStyles: selectedContext?.includeStyles !== false,
		includePageInfo: false,
		feedback: description,
		consoleMessages: selectedContext?.consoleMessages,
		networkRequests: selectedContext?.networkRequests,
		stdioMessages: selectedContext?.stdioMessages,
		relatedElements: sourceInfo.relatedElements,
		relatedElementIds: selectedContext?.relatedElementIds ?? sourceInfo.relatedElements?.map((_, i) => i),
		elementNotes: selectedContext?.elementNotes
	});
	output += `

## Your Task
Tools you may need (resolve them together, not one at a time): 'chrome_devtools' (preferred for browser diagnostics), 'get_console_messages', 'get_network_requests', 'get_stdio_messages', 'execute_page_script', 'update_inspection_status'.

1. Investigate the issue using browser diagnostics: prefer 'chrome_devtools' when available; otherwise 'get_console_messages' / 'get_network_requests' (and 'get_stdio_messages' if relevant)
2. Use 'execute_page_script' to query element state if needed
3. Update status with 'update_inspection_status':
   - "in-progress" with progress details while investigating
   - "completed" with findings when done
   - "failed" if unresolvable`;
	const content = [{
		type: "text",
		text: output
	}];
	if (selectedContext?.screenshot) content.push(createImageContent(selectedContext.screenshot));
	return { content };
}
function patchContext(args) {
	const { code } = args;
	if (!code || typeof code !== "string") return createTextContent("Error: Missing or invalid \"code\" parameter. Please provide JavaScript code to execute.");
	try {
		const result = new Function(code)();
		let formattedResult;
		if (result === void 0) formattedResult = "(undefined)";
		else if (result === null) formattedResult = "(null)";
		else if (typeof result === "object") try {
			formattedResult = JSON.stringify(result, null, 2);
		} catch {
			formattedResult = `[Object: ${Object.prototype.toString.call(result)}]`;
		}
		else formattedResult = String(result);
		return createTextContent(`${formattedResult}`);
	} catch (error) {
		const errorMessage = error instanceof Error ? error.message : String(error);
		const errorStack = error instanceof Error ? error.stack : "";
		return createTextContent(`## Error\n\`\`\`\n${errorMessage}\n\`\`\`\n\n${errorStack ? `## Stack Trace\n\`\`\`\n${errorStack}\n\`\`\`\n` : ""}\n## Suggestions\n- Check syntax errors\n- Verify element selectors exist\n- Ensure code returns a value\n- Check browser console for additional errors`);
	}
}
function updateInspectionStatus(args) {
	const { inspectionId: providedId, status, progress, message } = args;
	let inspectionId = providedId || sessionStorage.getItem(INSPECTION_ID_KEY) || "";
	if (!inspectionId) try {
		const saved = localStorage.getItem(STORAGE_KEY);
		const loadingItem = (saved ? JSON.parse(saved) : []).find((item) => item.status === "in-progress");
		if (loadingItem) {
			inspectionId = loadingItem.id;
			sessionStorage.setItem(INSPECTION_ID_KEY, inspectionId);
		} else return createTextContent("Error: No active inspection item found. Please use 'list_inspections' to see the queue, then provide the inspectionId parameter.");
	} catch {
		return createTextContent("Error: No active inspection item");
	}
	if (status === "deleted") try {
		const saved = localStorage.getItem(STORAGE_KEY);
		const filteredItems = (saved ? JSON.parse(saved) : []).filter((item) => item.id !== inspectionId);
		localStorage.setItem(STORAGE_KEY, JSON.stringify(filteredItems));
		sessionStorage.removeItem(INSPECTION_ID_KEY);
		window.dispatchEvent(new CustomEvent("inspection-deleted", { detail: { inspectionId } }));
		return createTextContent(`Inspection ${inspectionId} deleted successfully.`);
	} catch {
		return createTextContent("Error: Failed to delete inspection");
	}
	if (progress) window.dispatchEvent(new CustomEvent("plan-progress-reported", { detail: {
		plan: { steps: progress.steps },
		inspectionId,
		timestamp: (/* @__PURE__ */ new Date()).toISOString()
	} }));
	if (status === "completed" || status === "failed") {
		sessionStorage.removeItem(INSPECTION_ID_KEY);
		const resultMessage = message || (status === "completed" ? "Task completed" : "Task failed");
		window.dispatchEvent(new CustomEvent("inspection-result-received", { detail: {
			status,
			result: { message: resultMessage },
			inspectionId
		} }));
		return createTextContent(`Inspection marked as ${status}.`);
	} else if (status === "in-progress" && message && !progress) window.dispatchEvent(new CustomEvent("inspection-status-updated", { detail: {
		status: "in-progress",
		message,
		inspectionId
	} }));
	return createTextContent("Status updated");
}
function useMcp() {
	const clientRef = useRef(null);
	const [isClientReady, setIsClientReady] = useState(false);
	const isAutomated = navigator.webdriver;
	useEffect(() => {
		if (clientRef.current) return;
		const client = createClientExecClient(new Client({
			name: "inspector",
			version: "0.1.0"
		}, { capabilities: { tools: {} } }), "inspector");
		async function captureElementContext(args = {}) {
			const { selector } = args;
			if (selector) return new Promise((resolve, reject) => {
				cancelPendingRequest("New automated capture started");
				pendingResolve = resolve;
				pendingReject = reject;
				window.dispatchEvent(new CustomEvent("automated-capture", { detail: { selector } }));
				setTimeout(() => {
					if (pendingReject === reject) {
						clearPendingRequest();
						reject(/* @__PURE__ */ new Error("Timeout: Automated capture failed"));
					}
				}, TIMEOUT_MS);
			});
			cancelPendingRequest("New capture request started");
			activateInspector();
			return new Promise((resolve, reject) => {
				pendingResolve = resolve;
				pendingReject = reject;
				setTimeout(() => {
					if (pendingReject === reject) {
						clearPendingRequest();
						reject(/* @__PURE__ */ new Error("Timeout: No element selected"));
					}
				}, TIMEOUT_MS);
			});
		}
		async function captureAreaContext(args = {}) {
			const { containerSelector, bounds } = args;
			if (containerSelector || bounds) return new Promise((resolve, reject) => {
				cancelPendingRequest("New automated capture started");
				pendingResolve = resolve;
				pendingReject = reject;
				window.dispatchEvent(new CustomEvent("automated-capture", { detail: {
					containerSelector,
					bounds
				} }));
				setTimeout(() => {
					if (pendingReject === reject) {
						clearPendingRequest();
						reject(/* @__PURE__ */ new Error("Timeout: Automated capture failed"));
					}
				}, TIMEOUT_MS);
			});
			cancelPendingRequest("New capture request started");
			window.dispatchEvent(new CustomEvent("activate-area-select"));
			return new Promise((resolve, reject) => {
				pendingResolve = resolve;
				pendingReject = reject;
				setTimeout(() => {
					if (pendingReject === reject) {
						clearPendingRequest();
						reject(/* @__PURE__ */ new Error("Timeout: No area selected"));
					}
				}, TIMEOUT_MS);
			});
		}
		function handleElementInspected(event) {
			if (!pendingResolve) return;
			const { inspections } = event.detail;
			if (!inspections || !Array.isArray(inspections) || inspections.length === 0) {
				pendingReject?.(/* @__PURE__ */ new Error("No inspections received"));
				clearPendingRequest();
				return;
			}
			const lastInspection = inspections[inspections.length - 1];
			sessionStorage.setItem(INSPECTION_ID_KEY, lastInspection.id);
			const results = inspections.map((item) => formatResult(item.sourceInfo, item.description, item.selectedContext));
			if (results.length === 1) pendingResolve(results[0]);
			else {
				const combinedText = inspections.map((item, index) => {
					const { sourceInfo, description } = item;
					return `## Inspection ${index + 1}\n\n**File**: ${sourceInfo.file}:${sourceInfo.line}:${sourceInfo.column}\n**Component**: ${sourceInfo.component}\n\n**User Request**:\n${description}\n\n${formatElementInfoSimple(sourceInfo.elementInfo)}`;
				}).join("\n\n---\n\n");
				pendingResolve(createTextContent(`# ${inspections.length} Elements Inspected\n\n${combinedText}`));
			}
			clearPendingRequest();
		}
		function handleInspectorCancelled() {
			sessionStorage.removeItem(INSPECTION_ID_KEY);
			cancelPendingRequest("Inspector cancelled by user");
		}
		const eventHandlers = [{
			event: "element-inspected",
			handler: handleElementInspected
		}, {
			event: "inspector-cancelled",
			handler: handleInspectorCancelled
		}];
		const IMPLICIT_ROLES = {
			HEADER: "banner",
			NAV: "navigation",
			MAIN: "main",
			ASIDE: "complementary",
			FOOTER: "contentinfo",
			SECTION: "region",
			ARTICLE: "article",
			FORM: "form",
			BUTTON: "button",
			A: (el) => el.hasAttribute("href") ? "link" : "",
			IMG: "img",
			UL: "list",
			OL: "list",
			LI: "listitem",
			TABLE: "table",
			H1: "heading",
			H2: "heading",
			H3: "heading",
			H4: "heading",
			H5: "heading",
			H6: "heading",
			INPUT: (el) => {
				const type = el.getAttribute("type");
				if (type === "submit" || type === "button") return "button";
				if (type === "checkbox") return "checkbox";
				if (type === "radio") return "radio";
				return "textbox";
			},
			TEXTAREA: "textbox",
			SELECT: "combobox",
			DIALOG: "dialog"
		};
		const SKIP_TAGS = new Set([
			"DIV",
			"SPAN",
			"SCRIPT",
			"STYLE",
			"NOSCRIPT",
			"BR",
			"HR"
		]);
		function getImplicitRole(el) {
			const mapping = IMPLICIT_ROLES[el.tagName];
			if (!mapping) return null;
			return typeof mapping === "function" ? mapping(el) : mapping;
		}
		function getDirectTextContent(el) {
			let text = "";
			for (let i = 0; i < el.childNodes.length; i++) {
				const node = el.childNodes[i];
				if (node.nodeType === Node.TEXT_NODE) text += node.textContent?.trim() || "";
			}
			return text.slice(0, 50);
		}
		function getA11yTree(element, depth = 0, maxDepth = 4, lines = []) {
			if (depth > maxDepth || lines.length >= 100) return lines;
			const role = element.getAttribute("role") || getImplicitRole(element);
			const ariaLabel = element.getAttribute("aria-label");
			const hasSemanticMeaning = role || !SKIP_TAGS.has(element.tagName) || element.id || ariaLabel;
			if (hasSemanticMeaning && role !== "none" && role !== "presentation") {
				const ariaLabelledBy = element.getAttribute("aria-labelledby");
				let name = ariaLabel || (ariaLabelledBy ? document.getElementById(ariaLabelledBy)?.textContent?.trim() : null) || element.getAttribute("alt") || element.getAttribute("title") || element.getAttribute("placeholder") || (element.tagName !== "INPUT" && element.tagName !== "TEXTAREA" ? getDirectTextContent(element) : "");
				if (name && name.length > 50) name = name.slice(0, 47) + "...";
				const tag = element.tagName.toLowerCase();
				const id = element.id ? `#${element.id}` : "";
				const roleStr = role && role !== tag ? ` [${role}]` : "";
				const nameStr = name ? `: "${name}"` : "";
				lines.push(`${"  ".repeat(depth)}<${tag}${id}${roleStr}${nameStr}>`);
			}
			for (let i = 0; i < element.children.length && lines.length < 100; i++) getA11yTree(element.children[i], hasSemanticMeaning ? depth + 1 : depth, maxDepth, lines);
			return lines;
		}
		function getPageInfo() {
			const a11yTree = getA11yTree(document.body);
			return createTextContent(`## Page Information
- **URL**: ${window.location.href}
- **Title**: ${document.title}
- **Viewport**: ${window.innerWidth} × ${window.innerHeight}
- **Document Size**: ${document.documentElement.scrollWidth} × ${document.documentElement.scrollHeight}
- **Scroll**: (${window.scrollX}, ${window.scrollY})

## Accessibility Tree
\`\`\`
${a11yTree.length > 0 ? a11yTree.join("\n") : "(empty or no semantic structure)"}
\`\`\`

## Next Steps
- \`capture_element_context({ selector })\` - inspect specific element
- \`capture_area_context({ containerSelector })\` - inspect container's children
- \`capture_area_context({ bounds: {x,y,width,height} })\` - inspect screen region`);
		}
		function verifyDomPosition(args = {}) {
			const { selector, expected = {} } = args;
			if (!selector) return {
				pass: false,
				mismatches: ["No selector provided"],
				actual: null
			};
			const el = document.querySelector(selector);
			if (!el) return {
				pass: false,
				mismatches: [`No element found for selector: ${selector}`],
				actual: null
			};
			if (!el.parentElement) return {
				pass: false,
				mismatches: ["Element has no parent"],
				actual: null
			};
			const parent = el.parentElement;
			const siblings = Array.from(parent.children);
			const index = siblings.indexOf(el);
			const rect = el.getBoundingClientRect();
			const parentRect = parent.getBoundingClientRect();
			const style = getComputedStyle(el);
			const margin = `${style.marginTop} ${style.marginRight} ${style.marginBottom} ${style.marginLeft}`;
			const padding = `${style.paddingTop} ${style.paddingRight} ${style.paddingBottom} ${style.paddingLeft}`;
			const round = (r) => ({
				x: Math.round(r.x),
				y: Math.round(r.y),
				width: Math.round(r.width),
				height: Math.round(r.height)
			});
			const tolerance = expected.rectTolerancePx ?? 2;
			const mismatches = [];
			if (expected.index !== void 0 && index !== expected.index) mismatches.push(`index: expected ${expected.index}, got ${index}`);
			if (expected.siblingCount !== void 0 && siblings.length !== expected.siblingCount) mismatches.push(`sibling count: expected ${expected.siblingCount}, got ${siblings.length}`);
			if (expected.elementRect) for (const key of [
				"x",
				"y",
				"width",
				"height"
			]) {
				if (expected.elementRect[key] === void 0) continue;
				const diff = Math.abs(rect[key] - expected.elementRect[key]);
				if (diff > tolerance) mismatches.push(`element ${key}: expected ${Math.round(expected.elementRect[key])}px, got ${Math.round(rect[key])}px (diff ${Math.round(diff)}px)`);
			}
			if (expected.parentRect) for (const key of ["width", "height"]) {
				if (expected.parentRect[key] === void 0) continue;
				const diff = Math.abs(parentRect[key] - expected.parentRect[key]);
				if (diff > tolerance) mismatches.push(`parent ${key}: expected ${Math.round(expected.parentRect[key])}px, got ${Math.round(parentRect[key])}px (diff ${Math.round(diff)}px)`);
			}
			if (expected.margin !== void 0 && expected.margin !== margin) mismatches.push(`margin: expected "${expected.margin}", got "${margin}"`);
			if (expected.padding !== void 0 && expected.padding !== padding) mismatches.push(`padding: expected "${expected.padding}", got "${padding}"`);
			const styleSnapshot = {};
			if (expected.style) for (const prop of Object.keys(expected.style)) {
				const actualValue = style[prop];
				styleSnapshot[prop] = actualValue;
				if (actualValue !== expected.style[prop]) mismatches.push(`style.${prop}: expected "${expected.style[prop]}", got "${actualValue}"`);
			}
			return {
				pass: mismatches.length === 0,
				mismatches,
				actual: {
					index,
					siblingCount: siblings.length,
					rect: round(rect),
					parentRect: round(parentRect),
					margin,
					padding,
					...expected.style ? { style: styleSnapshot } : {}
				}
			};
		}
		function buildSelectorFor(el) {
			if (!el || el.nodeType !== 1) return null;
			if (el.id) return `#${CSS.escape(el.id)}`;
			const testId = el.getAttribute("data-testid");
			if (testId) return `[data-testid="${CSS.escape(testId)}"]`;
			const segments = [];
			let node = el;
			while (node && node.nodeType === 1 && node !== document.documentElement) {
				if (node.id) {
					segments.unshift(`#${CSS.escape(node.id)}`);
					break;
				}
				const parent = node.parentElement;
				if (!parent) {
					segments.unshift(node.nodeName.toLowerCase());
					break;
				}
				const nthOfType = Array.from(parent.children).filter((c) => c.nodeName === node.nodeName).indexOf(node) + 1;
				segments.unshift(`${node.nodeName.toLowerCase()}:nth-of-type(${nthOfType})`);
				node = parent;
			}
			return segments.join(" > ");
		}
		function verifyFlexLayout(args = {}) {
			const { selector, expected = {} } = args;
			if (!selector) return {
				pass: false,
				mismatches: ["No selector provided"],
				actual: null
			};
			const el = document.querySelector(selector);
			if (!el) return {
				pass: false,
				mismatches: [`No element found for selector: ${selector}`],
				actual: null
			};
			const style = getComputedStyle(el);
			const children = Array.from(el.children);
			const mismatches = [];
			const styleSnapshot = {};
			if (expected.style) for (const prop of Object.keys(expected.style)) {
				const actualValue = style[prop];
				styleSnapshot[prop] = actualValue;
				if (actualValue !== expected.style[prop]) mismatches.push(`style.${prop}: expected "${expected.style[prop]}", got "${actualValue}"`);
			}
			if (expected.childCount !== void 0 && children.length !== expected.childCount) mismatches.push(`childCount: expected ${expected.childCount}, got ${children.length}`);
			const childSelectors = children.map((child) => buildSelectorFor(child));
			if (expected.childSelectors) {
				const expectedList = expected.childSelectors;
				if (expectedList.length !== childSelectors.length) mismatches.push(`childSelectors count: expected ${expectedList.length}, got ${childSelectors.length}`);
				else expectedList.forEach((expectedSel, i) => {
					if (expectedSel !== childSelectors[i]) mismatches.push(`child #${i}: expected "${expectedSel}", got "${childSelectors[i]}"`);
				});
			}
			return {
				pass: mismatches.length === 0,
				mismatches,
				actual: {
					childCount: children.length,
					childSelectors,
					...expected.style ? { style: styleSnapshot } : {}
				}
			};
		}
		eventHandlers.forEach(({ event, handler }) => {
			window.addEventListener(event, handler);
		});
		const builtInTools = [
			{
				...TOOL_SCHEMAS.capture_element_context,
				implementation: wrapToolImplementation(TOOL_SCHEMAS.capture_element_context.name, captureElementContext)
			},
			{
				...TOOL_SCHEMAS.capture_area_context,
				implementation: wrapToolImplementation(TOOL_SCHEMAS.capture_area_context.name, captureAreaContext)
			},
			{
				...TOOL_SCHEMAS.list_inspections,
				implementation: wrapToolImplementation(TOOL_SCHEMAS.list_inspections.name, getAllFeedbacks)
			},
			{
				...TOOL_SCHEMAS.update_inspection_status,
				implementation: wrapToolImplementation(TOOL_SCHEMAS.update_inspection_status.name, updateInspectionStatus)
			},
			{
				...TOOL_SCHEMAS.execute_page_script,
				implementation: wrapToolImplementation(TOOL_SCHEMAS.execute_page_script.name, patchContext)
			},
			{
				...TOOL_SCHEMAS.get_page_info,
				implementation: wrapToolImplementation(TOOL_SCHEMAS.get_page_info.name, getPageInfo)
			},
			{
				...TOOL_SCHEMAS.verify_dom_position,
				implementation: wrapToolImplementation(TOOL_SCHEMAS.verify_dom_position.name, verifyDomPosition)
			},
			{
				...TOOL_SCHEMAS.verify_flex_layout,
				implementation: wrapToolImplementation(TOOL_SCHEMAS.verify_flex_layout.name, verifyFlexLayout)
			}
		];
		const getCustomTools = () => {
			const getTools = window.__getInspectorTools;
			if (!getTools) return [];
			return getTools().map((tool) => ({
				name: tool.name,
				description: tool.description,
				inputSchema: tool.inputSchema,
				implementation: async (args) => {
					try {
						const result = await tool.implementation(args);
						if (result === void 0 || result === null) return createTextContent("(no result)");
						if (typeof result === "object") {
							if ("content" in result && Array.isArray(result.content)) return result;
							return createTextContent(JSON.stringify(result, null, 2));
						}
						return createTextContent(String(result));
					} catch (error) {
						const errorMessage = error instanceof Error ? error.message : String(error);
						const errorStack = error instanceof Error ? error.stack : "";
						return createTextContent(`# Error executing ${tool.name}\n\n\`\`\`\n${errorMessage}\n\`\`\`\n\n${errorStack ? `## Stack Trace\n\`\`\`\n${errorStack}\n\`\`\`\n` : ""}`);
					}
				}
			}));
		};
		const customTools = getCustomTools();
		const allTools = [...builtInTools, ...customTools];
		client.registerTools(allTools);
		if (customTools.length > 0) console.log(`[dom-inspector] Registered ${customTools.length} custom tool(s):`, customTools.map((t) => t.name).join(", "));
		const transport = new SSEClientTransport(new URL(`/__mcp__/sse?clientId=inspector&isAutomated=${isAutomated}`, getDevServerBaseUrl()));
		client.connect(transport).then(() => {
			clientRef.current = client;
			setIsClientReady(true);
		}).catch((err) => {
			console.error("MCP connection error:", err);
		});
		return () => {
			eventHandlers.forEach(({ event, handler }) => {
				window.removeEventListener(event, handler);
			});
			transport.close?.();
		};
	}, []);
	return {
		client: clientRef.current,
		isClientReady
	};
}

//#endregion
//#region client/hooks/useAgent.ts
const AGENT_STORAGE_KEY = "AI_SELECTED_AGENT";
const useAgent = (defaultAgent) => {
	const [agent, setAgentState] = useState(() => {
		if (typeof window !== "undefined") {
			const saved = localStorage.getItem(AGENT_STORAGE_KEY);
			if (saved) return saved;
		}
		return defaultAgent;
	});
	const [isReady, setIsReady] = useState(false);
	useEffect(() => {
		if (typeof window !== "undefined") getDefaultAgent().then((configDefault) => {
			if (configDefault && configDefault !== DEFAULT_AGENT) setAgentState(configDefault);
		}).finally(() => {
			setIsReady(true);
		});
		else setIsReady(true);
	}, []);
	const setAgent = (newAgent) => {
		setAgentState(newAgent);
		if (typeof window === "undefined") return;
		if (newAgent?.trim()) localStorage.setItem(AGENT_STORAGE_KEY, newAgent);
		else localStorage.removeItem(AGENT_STORAGE_KEY);
	};
	return {
		agent,
		setAgent,
		isReady
	};
};

//#endregion
//#region client/hooks/usePrompts.ts
function usePrompts(mcpClient) {
	const [prompts, setPrompts] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	useEffect(() => {
		let mounted = true;
		const fetchPrompts = async () => {
			if (!mcpClient) {
				if (mounted) setPrompts([]);
				return;
			}
			setIsLoading(true);
			try {
				const result = await mcpClient.request({ method: "prompts/list" }, ListPromptsResultSchema);
				if (mounted && result.prompts) setPrompts(result.prompts);
			} catch (err) {
				console.error("[usePrompts] Error loading prompts:", err);
			} finally {
				if (mounted) setIsLoading(false);
			}
		};
		fetchPrompts();
		if (mcpClient) mcpClient.setNotificationHandler(PromptListChangedNotificationSchema, async () => {
			console.log("[usePrompts] Received prompts/list_changed notification");
			await fetchPrompts();
		});
		return () => {
			mounted = false;
			try {
				if (mcpClient) mcpClient.removeNotificationHandler("notifications/prompts/list_changed");
			} catch (e) {}
		};
	}, [mcpClient]);
	return {
		prompts,
		isLoading
	};
}

//#endregion
//#region client/hooks/useContextData.ts
/**
* Hook to fetch and manage context data from chrome_devtools MCP tool
* @param client - MCP client instance (passed from useMcp hook in parent component)
* @param isClientReady - whether the client is ready
* @param isEnabled - whether to enable data fetching (default: true)
*/
function useContextData(client, isClientReady, isEnabled = true) {
	const [data, setData] = useState({
		consoleMessages: [],
		networkRequests: [],
		stdioMessages: [],
		loading: false,
		error: null
	});
	const fetchContextData = useCallback(async () => {
		if (!isEnabled) return;
		if (!client || !isClientReady) {
			setData((prev) => ({
				...prev,
				error: "MCP client not ready"
			}));
			return;
		}
		setData((prev) => ({
			...prev,
			loading: true,
			error: null
		}));
		try {
			let consoleText = "";
			let networkText = "";
			let stdioMessagesOrEmpty = [];
			try {
				const consoleResult = await client.callTool({
					name: "chrome_devtools",
					arguments: {
						useTool: "chrome_list_console_messages",
						hasDefinitions: ["chrome_list_console_messages"],
						chrome_list_console_messages: {}
					}
				});
				const networkResult = await client.callTool({
					name: "chrome_devtools",
					arguments: {
						useTool: "chrome_list_network_requests",
						hasDefinitions: ["chrome_list_network_requests"],
						chrome_list_network_requests: {}
					}
				});
				consoleText = (consoleResult?.content)?.map((item) => item.text).join("\n") || "";
				networkText = (networkResult?.content)?.map((item) => item.text).join("\n") || "";
			} catch (e) {
				try {
					const consolePrompt = await client.getPrompt({ name: "get_console_messages" });
					const networkPrompt = await client.getPrompt({ name: "get_network_requests" });
					const consoleMsg = consolePrompt.messages[0]?.content;
					const networkMsg = networkPrompt.messages[0]?.content;
					const fullText = (consoleMsg?.type === "text" ? consoleMsg.text : "") + "\n" + (networkMsg?.type === "text" ? networkMsg.text : "");
					consoleText = fullText;
					networkText = fullText;
				} catch (promptError) {
					console.error("[useContextData] Prompts fallback failed:", promptError);
					throw e;
				}
			}
			try {
				const config = typeof window !== "undefined" ? window.__DOM_INSPECTOR_CONFIG__ : null;
				let baseUrl = "";
				if (config) {
					baseUrl = config.baseUrl || `http://${config.host}:${config.port}${config.base || "/"}`;
					if (baseUrl.endsWith("/")) baseUrl = baseUrl.slice(0, -1);
				}
				const res = await fetch(`${baseUrl}/__inspector__/stdio`);
				if (res.ok) stdioMessagesOrEmpty = (await res.json()).map((log) => ({
					stdioid: log.id,
					stream: log.stream,
					data: log.data
				})).reverse();
			} catch (e) {
				console.warn("[useContextData] Failed to fetch stdio messages:", e);
			}
			setData({
				consoleMessages: parseConsoleMessages(consoleText),
				networkRequests: parseNetworkRequests(networkText),
				stdioMessages: stdioMessagesOrEmpty,
				loading: false,
				error: null
			});
		} catch (error) {
			console.error("[useContextData] Failed to fetch context data:", error);
			setData((prev) => ({
				...prev,
				loading: false,
				error: error instanceof Error ? error.message : String(error)
			}));
		}
	}, [client, isClientReady]);
	return {
		...data,
		refresh: fetchContextData
	};
}
/**
* Parse console messages from MCP response text
* Format: msgid=123 [level] message text
*/
function parseConsoleMessages(text) {
	if (!text) return [];
	const messages = [];
	const lines = text.split("\n");
	for (const line of lines) {
		const match = line.match(/msgid=(\d+)\s+\[([^\]]+)\]\s+(.+)/);
		if (match) {
			const [, msgid, level, messageText] = match;
			messages.push({
				msgid: parseInt(msgid),
				level,
				text: messageText
			});
		}
	}
	return messages;
}
/**
* Parse network requests from MCP response text
* Format: reqid=123 METHOD url [status]
*/
function parseNetworkRequests(text) {
	if (!text) return [];
	const requests = [];
	const lines = text.split("\n");
	for (const line of lines) {
		const match = line.match(/reqid=(\d+)\s+(GET|POST|PUT|DELETE|PATCH)\s+([^\s]+)\s+\[([^\]]+)\]/);
		if (match) {
			const [, reqid, method, url, status] = match;
			requests.push({
				reqid: parseInt(reqid),
				method,
				url,
				status: normalizeStatus(status)
			});
		}
	}
	return requests;
}
/**
* Normalize status text for display - extract only the status code
* KISS: Show "304" instead of "failed - 304"
*/
function normalizeStatus(status) {
	const codeMatch = status.match(/\b(\d{3})\b/);
	return codeMatch ? codeMatch[1] : status;
}

//#endregion
//#region client/utils/messageProcessor.ts
/**
* Extract display text from a message
*/
function extractDisplayText(message) {
	let text = "";
	if ("parts" in message && Array.isArray(message.parts)) {
		for (const messagePart of message.parts) if (messagePart.type === "text" && "text" in messagePart && typeof messagePart.text === "string") text += messagePart.text;
	} else if ("content" in message && typeof message.content === "string") text = message.content;
	else if ("text" in message && typeof message.text === "string") text = message.text;
	return text;
}
/**
* Extract tool output/result from a message
* Only returns tool output if it's the most recent content (no text after it)
*/
function extractToolOutput(message) {
	if (!("parts" in message) || !Array.isArray(message.parts)) return null;
	let toolOutput = null;
	let hasTextAfterTool = false;
	for (const part of message.parts) {
		if (toolOutput && part.type === "text" && "text" in part && typeof part.text === "string" && part.text.trim()) {
			hasTextAfterTool = true;
			toolOutput = null;
			break;
		}
		if (part.type === "tool-result" && "result" in part) {
			const result = part.result;
			if (typeof result === "string") {
				toolOutput = result;
				continue;
			}
			if (result && typeof result === "object") {
				if ("text" in result && typeof result.text === "string") {
					toolOutput = result.text;
					continue;
				}
				if (Array.isArray(result) && result.length > 0) {
					const firstItem = result[0];
					if (firstItem && typeof firstItem === "object" && "content" in firstItem) {
						const content = firstItem.content;
						if (content && typeof content === "object" && "text" in content && typeof content.text === "string") {
							toolOutput = content.text;
							continue;
						}
					}
				}
			}
		}
		if (part.type === "tool-acp.acp_provider_agent_dynamic_tool" && "output" in part && Array.isArray(part.output)) {
			const output = part.output;
			if (output.length > 0) {
				const firstItem = output[0];
				if (firstItem && typeof firstItem === "object" && "content" in firstItem) {
					const content = firstItem.content;
					if (content && typeof content === "object" && "text" in content && typeof content.text === "string") {
						toolOutput = content.text;
						continue;
					}
				}
			}
		}
	}
	return hasTextAfterTool ? null : toolOutput;
}
/**
* Extract tool call name from a message
* Returns the LAST active tool (input-available state) found in the message parts
* Returns null if there's text content after the tool (indicating tool is done)
*/
function extractToolCall(message, currentTool) {
	if ("parts" in message && Array.isArray(message.parts)) {
		let foundActiveToolCall = null;
		let lastToolIndex = -1;
		for (let i = message.parts.length - 1; i >= 0; i--) {
			const part = message.parts[i];
			if (part.type === "tool-acp.acp_provider_agent_dynamic_tool") {
				if (("state" in part ? part.state : null) === "input-available") {
					if ("input" in part && typeof part.input === "object" && part.input !== null && "toolName" in part.input) {
						foundActiveToolCall = part.input.toolName;
						lastToolIndex = i;
					}
				}
				break;
			}
			if (part.type === "tool-call" && "toolName" in part && typeof part.toolName === "string") {
				foundActiveToolCall = part.toolName;
				lastToolIndex = i;
				break;
			}
		}
		if (foundActiveToolCall && lastToolIndex !== -1) {
			for (let i = lastToolIndex + 1; i < message.parts.length; i++) {
				const part = message.parts[i];
				if (part.type === "text" && "text" in part && typeof part.text === "string" && part.text.trim()) return null;
				if (part.type === "tool-result") return null;
			}
			return foundActiveToolCall;
		}
		return null;
	}
	if (currentTool) return currentTool;
	if ("toolInvocations" in message && Array.isArray(message.toolInvocations) && message.toolInvocations.length > 0) {
		const lastTool = message.toolInvocations[message.toolInvocations.length - 1];
		if (typeof lastTool === "object" && lastTool !== null && "toolName" in lastTool && typeof lastTool.toolName === "string") return lastTool.toolName;
	}
	return null;
}
/**
* Extract the LATEST tool name from the message components.
* Returns null if the latest component is non-empty text (indicating the tool is done or text is more recent).
*/
function extractLatestToolName(message) {
	if (!("parts" in message) || !Array.isArray(message.parts)) return null;
	for (let i = message.parts.length - 1; i >= 0; i--) {
		const part = message.parts[i];
		if (part.type === "tool-call" && "toolName" in part && typeof part.toolName === "string") return part.toolName;
		if (typeof part.type === "string" && part.type.startsWith("tool-")) {
			if ("input" in part && typeof part.input === "object" && part.input !== null && "toolName" in part.input && typeof part.input.toolName === "string") return part.input.toolName;
			if ("toolName" in part && typeof part.toolName === "string") return part.toolName;
		}
		if (part.type === "text" && "text" in part && typeof part.text === "string") {
			if (part.text.trim().length > 0) return null;
			continue;
		}
		if (part.type === "tool-result") return null;
	}
	return null;
}
/**
* Process a message and extract all relevant information
*/
function processMessage(message, currentTool) {
	return {
		displayText: extractDisplayText(message),
		toolOutput: extractToolOutput(message),
		toolCall: extractToolCall(message, currentTool)
	};
}

//#endregion
//#region client/hooks/useIslandState.ts
/**
* Derives the Dynamic Island state from AI SDK messages and status
*/
function useIslandState(messages, status, isExpanded) {
	return useMemo(() => {
		const lastMessage = messages[messages.length - 1];
		const isStreaming = status === "streaming";
		let toolName = null;
		let displayText = "";
		if (lastMessage && lastMessage.role === "assistant") {
			displayText = processMessage(lastMessage).displayText;
			toolName = extractLatestToolName(lastMessage);
		}
		return {
			uiState: isExpanded ? "expanded" : "collapsed",
			chatStatus: status,
			toolName,
			displayText,
			isStreaming,
			lastMessage
		};
	}, [
		messages,
		status,
		isExpanded
	]);
}

//#endregion
//#region client/hooks/usePageInfo.ts
/**
* Hook to capture current page information
* KISS: Captures only essential page context (URL, title, viewport, language)
*/
function usePageInfo() {
	const [pageInfo, setPageInfo] = useState(null);
	useEffect(() => {
		const capturePageInfo = () => ({
			url: window.location.href,
			title: document.title,
			viewport: {
				width: window.innerWidth,
				height: window.innerHeight
			},
			language: document.documentElement.lang || navigator.language
		});
		setPageInfo(capturePageInfo());
		const handleResize = () => setPageInfo(capturePageInfo());
		window.addEventListener("resize", handleResize);
		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, []);
	return pageInfo;
}

//#endregion
export { getAvailableAgents, getDevServerBaseUrl, useAgent, useContextData, useIslandState, useMcp, usePageInfo, usePrompts };