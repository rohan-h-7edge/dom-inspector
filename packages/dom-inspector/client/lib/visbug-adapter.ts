// Bridges the fully-vendored VisBug app (client/vendor/visbug) into the
// inspector's own React UI. Unlike the first pass, this mounts VisBug's own
// `<vis-bug>` toolbar element as-is (full fidelity with the real
// extension/site — all tools, icons, hotkeys) rather than driving a trimmed
// engine through custom buttons.
//
// Side-effect import: self-registers `customElements.define('vis-bug', ...)`,
// same pattern as our own `<dom-inspector-mcp>` element and the selection
// custom elements it in turn creates.
import "../vendor/visbug/components/vis-bug/vis-bug.element";

export interface SelectorEngine {
  select: (el: Element) => void;
  selection: () => Element[];
  unselect_all: (opts?: { silent?: boolean }) => void;
  onSelectedUpdate: (cb: (selection: Element[]) => void, immediateCallback?: boolean) => void;
  removeSelectedCallback: (cb: (selection: Element[]) => void) => void;
  disconnect: () => void;
}

/** Public surface of a connected `<vis-bug>` element that we read/drive. */
export interface VisBugElement extends HTMLElement {
  selectorEngine: SelectorEngine;
  readonly activeTool: string;
  toolSelected: (el: string | { dataset?: { tool?: string } }) => void;
}

/**
 * Creates (but does not mount) a `<vis-bug>` element. Its `connectedCallback`
 * — which sets up `selectorEngine`, hotkeys, and the toolbar UI — only runs
 * once appended to the document, so callers must append it before reading
 * `.selectorEngine`.
 */
export function createVisBugElement(): VisBugElement {
  return document.createElement("vis-bug") as unknown as VisBugElement;
}
