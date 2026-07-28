import { useCallback, useEffect, useRef, useState } from "react";
import { getSourceInfo } from "../sourceDetector";
import type { InspectedElement } from "../types";
import { createVisBugElement, type SelectorEngine, type VisBugElement } from "../lib/visbug-adapter";

interface UseVisBugInspectorProps {
  isActive: boolean;
  isWaitingForFeedback: boolean;
  onElementInspected: (info: InspectedElement) => void;
}

/**
 * Mounts VisBug's own `<vis-bug>` toolbar element (full fidelity with the
 * real extension — all its tools, icons, hotkeys) when the inspector is
 * active, and reads its `selectorEngine` to feed the existing
 * capture/FeedbackBubble/MCP pipeline. Replaces the trimmed-engine +
 * custom-buttons approach from the first pass.
 */
export const useVisBugInspector = ({
  isActive,
  isWaitingForFeedback,
  onElementInspected,
}: UseVisBugInspectorProps) => {
  const [selection, setSelection] = useState<Element[]>([]);

  const elementRef = useRef<VisBugElement | null>(null);
  const engineRef = useRef<SelectorEngine | null>(null);

  // Mount/unmount the real <vis-bug> element with inspector on/off.
  useEffect(() => {
    if (!isActive || isWaitingForFeedback) {
      engineRef.current = null;
      if (elementRef.current) {
        elementRef.current.remove(); // triggers its own disconnectedCallback cleanup
        elementRef.current = null;
      }
      setSelection([]);
      return;
    }

    const el = createVisBugElement();
    elementRef.current = el;
    document.body.appendChild(el); // connectedCallback runs synchronously here

    const engine = el.selectorEngine;
    engineRef.current = engine;
    // Copy, don't pass the array reference straight through: selectable.js's
    // `select()` mutates its internal `selected` array in place (`.unshift`)
    // rather than reassigning it, so every callback after the first receives
    // the *same* array reference — React's setState bails out (Object.is
    // sees no change) and the UI (e.g. the Capture button's count) goes
    // stale after the first selection.
    engine.onSelectedUpdate((sel) => setSelection([...sel]));

    return () => {
      engineRef.current = null;
      if (elementRef.current === el) {
        el.remove();
        elementRef.current = null;
      }
    };
  }, [isActive, isWaitingForFeedback]);

  const finalizeSelection = useCallback(() => {
    const current = engineRef.current?.selection() ?? [];
    if (!current.length) return;

    const [primaryEl, ...relatedEls] = current;
    const primary = getSourceInfo(primaryEl);

    const relatedElements = relatedEls.map((el) => {
      const info = getSourceInfo(el);
      return {
        file: info.file,
        component: info.component,
        apis: info.apis,
        line: info.line,
        column: info.column,
        elementInfo: info.elementInfo
          ? {
              tagName: info.elementInfo.tagName,
              textContent: info.elementInfo.textContent,
              className: info.elementInfo.className,
              id: info.elementInfo.id,
              styles: info.elementInfo.styles || {},
            }
          : undefined,
      } as InspectedElement;
    });

    onElementInspected({
      ...primary,
      relatedElements: relatedElements.length > 0 ? relatedElements : undefined,
    });

    engineRef.current?.unselect_all();
  }, [onElementInspected]);

  // Cmd/Ctrl+Enter finalizes the current selection (plain Enter/Shift+Enter
  // are already bound by VisBug itself for keyboard tree traversal —
  // drilling into children/parent — so finalize needs a different combo).
  // Also available as a Capture button in InspectorBar.
  useEffect(() => {
    if (!isActive || isWaitingForFeedback) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Enter" || !(e.metaKey || e.ctrlKey)) return;
      if (!selection.length) return;
      e.preventDefault();
      finalizeSelection();
    };

    document.addEventListener("keydown", handleKeyDown, true);
    return () => document.removeEventListener("keydown", handleKeyDown, true);
  }, [isActive, isWaitingForFeedback, selection, finalizeSelection]);

  return { selection, finalizeSelection };
};
