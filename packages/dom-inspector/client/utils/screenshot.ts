import { toCanvas, toPng } from "html-to-image";

// Skip elements that cause issues (like iframes, cross-origin elements)
function captureFilter(node: HTMLElement | Node): boolean {
  if (node instanceof HTMLElement) {
    const tagName = node.tagName.toLowerCase();
    // Skip problematic elements that can cause blank captures or security errors
    if (
      tagName === "iframe" ||
      tagName === "script" ||
      tagName === "link" ||
      tagName === "video" ||
      tagName === "audio" ||
      tagName === "object" ||
      tagName === "embed"
    ) {
      return false;
    }

    // Skip images that might have CORS issues
    if (tagName === "img") {
      const img = node as HTMLImageElement;
      // Skip if image hasn't loaded yet or has error
      if (!img.complete || img.naturalWidth === 0) {
        return false;
      }
    }
  }
  return true;
}

/**
 * Capture screenshot of a DOM element
 * @param element - The DOM element to capture
 * @param options - Screenshot options
 * @returns Promise<string> - Data URL of the screenshot, or empty string on error
 */
export async function captureElementScreenshot(
  element: Element,
  options: {
    quality?: number;
    maxWidth?: number;
    maxHeight?: number;
  } = {},
): Promise<string> {
  const { quality = 0.95, maxWidth = 1200, maxHeight = 800 } = options;

  try {
    const rect = element.getBoundingClientRect();
    const scale = Math.min(1, maxWidth / rect.width, maxHeight / rect.height);

    // Capture with explicit dimensions to avoid margin issues
    const dataUrl = await toPng(element as HTMLElement, {
      quality,
      pixelRatio: scale * (window.devicePixelRatio || 1),
      cacheBust: true,
      // Explicitly set dimensions based on bounding rect to avoid capturing margin as white space
      width: rect.width,
      height: rect.height,
      style: {
        // Reset margins during capture to avoid offset issues
        margin: "0",
        // Ensure element stays in position
        transform: "none",
      },
      filter: captureFilter,
      // Reduce the likelihood of CORS errors from fonts
      fontEmbedCSS: "",
    });

    return dataUrl;
  } catch (error) {
    console.error("[screenshot] Failed to capture element:", error);
    return "";
  }
}

/** Nearest common ancestor of two or more elements. */
function findCommonAncestor(elements: Element[]): Element | null {
  if (elements.length === 0) return null;
  if (elements.length === 1) return elements[0].parentElement || elements[0];

  const ancestorsOf = (el: Element): Element[] => {
    const chain: Element[] = [];
    let current: Element | null = el;
    while (current) {
      chain.push(current);
      current = current.parentElement;
    }
    return chain;
  };

  const [first, ...rest] = elements;
  let candidates = new Set(ancestorsOf(first));

  for (const el of rest) {
    const chain = ancestorsOf(el);
    candidates = new Set(chain.filter((node) => candidates.has(node)));
    if (candidates.size === 0) break;
  }

  // Walk `first`'s ancestor chain (closest-first) to find the nearest shared one.
  for (const node of ancestorsOf(first)) {
    if (candidates.has(node)) return node;
  }

  return document.body;
}

/**
 * Capture a screenshot covering the union of all given elements' bounding
 * boxes, by rendering their nearest common ancestor and cropping the result
 * down to that combined region.
 * @param elements - The DOM elements to capture (e.g. a multi-selection)
 * @param options - Screenshot options
 * @returns Promise<string> - Data URL of the screenshot, or empty string on error
 */
export async function captureElementsScreenshot(
  elements: Element[],
  options: {
    quality?: number;
    maxWidth?: number;
    maxHeight?: number;
  } = {},
): Promise<string> {
  if (elements.length === 0) return "";
  if (elements.length === 1) return captureElementScreenshot(elements[0], options);

  const { quality = 0.95, maxWidth = 1200, maxHeight = 800 } = options;

  try {
    const ancestor = findCommonAncestor(elements);
    if (!ancestor) return "";

    // Union bounding box of all selected elements, in viewport coordinates
    const rects = elements.map((el) => el.getBoundingClientRect());
    const unionRect = {
      left: Math.min(...rects.map((r) => r.left)),
      top: Math.min(...rects.map((r) => r.top)),
      right: Math.max(...rects.map((r) => r.right)),
      bottom: Math.max(...rects.map((r) => r.bottom)),
    };
    const unionWidth = unionRect.right - unionRect.left;
    const unionHeight = unionRect.bottom - unionRect.top;

    const ancestorRect = ancestor.getBoundingClientRect();
    const scale = Math.min(1, maxWidth / unionWidth, maxHeight / unionHeight);
    const pixelRatio = scale * (window.devicePixelRatio || 1);

    const fullCanvas = await toCanvas(ancestor as HTMLElement, {
      quality,
      pixelRatio,
      cacheBust: true,
      width: ancestorRect.width,
      height: ancestorRect.height,
      style: {
        margin: "0",
        transform: "none",
      },
      filter: captureFilter,
      fontEmbedCSS: "",
    });

    // Crop to just the union region (relative to the captured ancestor)
    const cropX = (unionRect.left - ancestorRect.left) * pixelRatio;
    const cropY = (unionRect.top - ancestorRect.top) * pixelRatio;
    const cropWidth = unionWidth * pixelRatio;
    const cropHeight = unionHeight * pixelRatio;

    const cropped = document.createElement("canvas");
    cropped.width = Math.max(1, Math.round(cropWidth));
    cropped.height = Math.max(1, Math.round(cropHeight));
    const ctx = cropped.getContext("2d");
    if (!ctx) return "";

    ctx.drawImage(
      fullCanvas,
      cropX,
      cropY,
      cropWidth,
      cropHeight,
      0,
      0,
      cropped.width,
      cropped.height,
    );

    return cropped.toDataURL("image/png", quality);
  } catch (error) {
    console.error("[screenshot] Failed to capture elements:", error);
    return "";
  }
}
