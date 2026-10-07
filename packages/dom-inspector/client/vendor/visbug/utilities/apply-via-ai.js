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

import { getSourceInfo } from '../../../sourceDetector'

let activeButton = null
let activeAction = null
let activeSaveButton = null
let activeSaveAction = null
let dismissTimeout = null

document.addEventListener('click', e => {
  if (activeButton && (e.target === activeButton || activeButton.contains(e.target))) {
    e.preventDefault()
    e.stopPropagation()
    activeAction && activeAction()
  }
  else if (activeSaveButton && (e.target === activeSaveButton || activeSaveButton.contains(e.target))) {
    e.preventDefault()
    e.stopPropagation()
    activeSaveAction && activeSaveAction()
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

// Tester role (only set when a collab hub is configured — see inspector.tsx):
// edits must not go to the agent; they're filed as bug reports instead.
export const isTesterMode = () =>
  typeof window !== 'undefined' && window.__DOM_INSPECTOR_COLLAB_ROLE__ === 'tester'

// The report type an edit should be filed as, or null to use the normal
// Apply-via-AI / Save-to-Context flow. An explicit "Submit correction" mode
// wins; otherwise testers' edits are bugs.
export const getEditReportMode = () => {
  const collabMode = typeof window !== 'undefined' ? window.__DOM_INSPECTOR_COLLAB_MODE__ : 'off'
  if (collabMode === 'bug' || collabMode === 'correction') return collabMode
  return isTesterMode() ? 'bug' : null
}

export const editReportLabel = mode =>
  mode === 'correction' ? '✏️ Submit correction' : '🐞 Report bug'

// Hands the edit to inspector.tsx ('collab-report-from-metatip'), which opens
// the feedback bubble so the reporter can describe the bug, then posts it to
// the collab hub, where it shows up as an on-page marker.
export const reportEdit = (el, text, mode) => {
  el.dispatchEvent(new CustomEvent('collab-report-from-metatip', {
    bubbles: true,
    detail: { text, mode },
  }))
}

export const removeApplyViaAiButton = () => {
  if (activeButton) {
    activeButton.remove()
    activeButton = null
  }
  if (activeSaveButton) {
    activeSaveButton.remove()
    activeSaveButton = null
  }
  activeAction = null
  activeSaveAction = null
  clearTimeout(dismissTimeout)
}

const makeFloatingButton = (label, background, rect, right, top) => {
  const btn = document.createElement('button')
  btn.textContent = label
  btn.setAttribute('type', 'button')
  Object.assign(btn.style, {
    position: 'fixed',
    top: `${top}px`,
    left: `${Math.min(window.innerWidth - right, Math.max(8, rect.right - (right - 10)))}px`,
    zIndex: 2147483647,
    background,
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
  return btn
}

// `anchorEl` is used only to position the buttons near the relevant element;
// `text` is the full prompt sent to the agent (or saved to the context queue)
// when clicked.
export const showApplyViaAiButton = (anchorEl, text) => {
  removeApplyViaAiButton()

  const rect = anchorEl.getBoundingClientRect()
  // VisBug draws its own selection tag/label at the top-left of a selected
  // element's bounding box — anchoring bottom-right instead avoids colliding
  // with it. The save button stacks above the play button.
  const playTop = Math.min(window.innerHeight - 40, rect.bottom + 6)
  const saveTop = Math.min(window.innerHeight - 76, rect.bottom + 42)

  // In "Report a bug" / "Submit correction" mode, or for a tester, show a
  // single report button instead of Apply via AI / Save to Context — one
  // click both queues it locally and posts it to the collab hub, where it
  // shows up as an on-page marker for anyone pointed at the same hub.
  const reportMode = getEditReportMode()
  if (reportMode) {
    const saveBtn = makeFloatingButton(editReportLabel(reportMode), '#f43f5e', rect, 300, playTop)

    activeSaveAction = () => {
      reportEdit(anchorEl, text, reportMode)
      removeApplyViaAiButton()
    }

    document.body.appendChild(saveBtn)
    activeSaveButton = saveBtn
    dismissTimeout = setTimeout(removeApplyViaAiButton, 10000)
    return
  }

  const playBtn = makeFloatingButton('▶ Apply via AI', '#22c55e', rect, 140, playTop)
  const saveBtn = makeFloatingButton('💾 Save to Context', '#6366f1', rect, 300, saveTop)

  activeAction = () => {
    anchorEl.dispatchEvent(new CustomEvent('metatip-style-edit', {
      bubbles: true,
      detail: { text },
    }))
    removeApplyViaAiButton()
  }

  activeSaveAction = () => {
    anchorEl.dispatchEvent(new CustomEvent('save-to-context', {
      bubbles: true,
      detail: { sourceInfo: getSourceInfo(anchorEl), description: text },
    }))
    removeApplyViaAiButton()
  }

  document.body.appendChild(playBtn)
  document.body.appendChild(saveBtn)
  activeButton = playBtn
  activeSaveButton = saveBtn
  // Auto-dismiss if the user doesn't act on it.
  dismissTimeout = setTimeout(removeApplyViaAiButton, 10000)
}
