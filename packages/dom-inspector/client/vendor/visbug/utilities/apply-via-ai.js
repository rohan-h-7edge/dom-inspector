// Shared "send this change to the AI agent" affordance — a small floating
// play button that dispatches the same `metatip-style-edit` event the
// metatip's style/color/class editor and the image-swap feature already use
// (InspectorBar.tsx listens for it globally and forwards it into the chat).
//
// VisBug's own click-to-select handler intercepts (preventDefault +
// stopPropagation) every plain click on the page at document.body's CAPTURE
// phase (see selectable.js's on_click), and the elements it exempts from
// that (`isOffBounds`: vis-bug, visbug-metatip, etc.) are themselves real
// custom elements with closed shadow roots and no <slot> — mounting inside
// one hides the button entirely rather than fixing the click. So instead we
// intercept the click ourselves on `document` (one level higher, so we run
// first) and invoke our own action directly, before VisBug's document.body
// listener ever sees the event.

let activeButton = null
let activeAction = null
let dismissTimeout = null

document.addEventListener('click', e => {
  if (activeButton && (e.target === activeButton || activeButton.contains(e.target))) {
    e.preventDefault()
    e.stopPropagation()
    activeAction && activeAction()
  }
}, true)

export const describeElement = (el) => {
  if (!el) return 'this element'
  const id = el.id ? `#${el.id}` : ''
  const classes = el.className && typeof el.className === 'string'
    ? '.' + el.className.trim().split(/\s+/).join('.')
    : ''
  return `<${el.nodeName.toLowerCase()}${id}${classes}>`
}

// Builds a CSS selector that still resolves to `el` after a page reload
// (post source-edit), so the AI can pass it to the verify_dom_position tool.
// Prefers an id/data-testid; otherwise walks up building an nth-of-type path.
export const buildStableSelector = el => {
  if (!el || el.nodeType !== 1) return null
  if (el.id) return `#${CSS.escape(el.id)}`
  const testId = el.getAttribute('data-testid')
  if (testId) return `[data-testid="${CSS.escape(testId)}"]`

  const segments = []
  let node = el
  while (node && node.nodeType === 1 && node !== document.documentElement) {
    if (node.id) {
      segments.unshift(`#${CSS.escape(node.id)}`)
      break
    }
    const parent = node.parentElement
    if (!parent) {
      segments.unshift(node.nodeName.toLowerCase())
      break
    }
    const sameTagSiblings = Array.from(parent.children).filter(c => c.nodeName === node.nodeName)
    const nthOfType = sameTagSiblings.indexOf(node) + 1
    segments.unshift(`${node.nodeName.toLowerCase()}:nth-of-type(${nthOfType})`)
    node = parent
  }
  return segments.join(' > ')
}

export const removeApplyViaAiButton = () => {
  if (activeButton) {
    activeButton.remove()
    activeButton = null
  }
  activeAction = null
  clearTimeout(dismissTimeout)
}

// `anchorEl` is used only to position the button near the relevant element;
// `text` is the full prompt sent to the agent when clicked.
export const showApplyViaAiButton = (anchorEl, text) => {
  removeApplyViaAiButton()

  const rect = anchorEl.getBoundingClientRect()
  const btn = document.createElement('button')
  btn.textContent = '▶ Apply via AI'
  btn.setAttribute('type', 'button')
  Object.assign(btn.style, {
    // VisBug draws its own selection tag/label at the top-left of a
    // selected element's bounding box — anchoring bottom-right instead
    // avoids colliding with it.
    position: 'fixed',
    top: `${Math.min(window.innerHeight - 40, rect.bottom + 6)}px`,
    left: `${Math.min(window.innerWidth - 140, Math.max(8, rect.right - 130))}px`,
    zIndex: 2147483647,
    background: '#22c55e',
    color: '#fff',
    border: 'none',
    borderRadius: '9999px',
    padding: '6px 12px',
    fontSize: '12px',
    fontFamily: 'system-ui, -apple-system, sans-serif',
    fontWeight: '600',
    cursor: 'pointer',
    boxShadow: '0 2px 10px rgba(0,0,0,.3)',
  })

  activeAction = () => {
    anchorEl.dispatchEvent(new CustomEvent('metatip-style-edit', {
      bubbles: true,
      detail: { text },
    }))
    removeApplyViaAiButton()
  }

  document.body.appendChild(btn)
  activeButton = btn
  // Auto-dismiss if the user doesn't act on it.
  dismissTimeout = setTimeout(removeApplyViaAiButton, 10000)
}
