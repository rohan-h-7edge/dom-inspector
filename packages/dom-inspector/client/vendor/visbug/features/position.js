import $ from 'blingblingjs'
import hotkeys from 'hotkeys-js'
import { metaKey, getStyle, getSide, showHideSelected, describeElement, showApplyViaAiButton, buildStableSelector } from '../utilities/'

const key_events = 'up,down,left,right'
  .split(',')
  .reduce((events, event) =>
    `${events},${event},alt+${event},shift+${event},shift+alt+${event}`
  , '')
  .substring(1)

const command_events = `${metaKey}+up,${metaKey}+shift+up,${metaKey}+down,${metaKey}+shift+down`

const roundRect = r => ({
  x: Math.round(r.x),
  y: Math.round(r.y),
  width: Math.round(r.width),
  height: Math.round(r.height),
})

const fmtRect = r => `x:${r.x} y:${r.y} width:${r.width} height:${r.height}`

// Free-drag via mouse just nudges the element with an ad-hoc `left`/`top`
// (or SVG transform) offset — a live prototyping aid, not a real fix. Rather
// than reporting only the pixel delta and leaving the agent to guess which
// property/unit to change, send the actual computed style (before the drag
// touched anything) and the exact before/after bounding boxes — real,
// concrete values the agent can match against instead of estimating.
const announcePositionMove = (el, before, after) => {
  const dx = after.rect.x - before.rect.x
  const dy = after.rect.y - before.rect.y
  if (!dx && !dy) return

  const parent = el.parentElement
  const parentStyle = parent ? getComputedStyle(parent) : null
  const selector = buildStableSelector(el)
  const expected = {
    elementRect: after.rect,
    rectTolerancePx: 2,
  }

  const text = `Reposition this element in the source: ${describeElement(el)}\n\n`
    + `It was dragged by mouse (a live visual nudge, done via a temporary \`${el instanceof SVGElement ? 'transform: translate(...)' : 'position: relative; left/top'}\` `
    + `inline override — not meant to be the real fix).\n\n`
    + `Bounding box before: ${fmtRect(before.rect)}\n`
    + `Bounding box after:  ${fmtRect(after.rect)}\n`
    + `Net shift: ${dx >= 0 ? '+' : ''}${dx}px horizontally, ${dy >= 0 ? '+' : ''}${dy}px vertically\n\n`
    + `Its computed style *before* the drag (for reference — this is the actual current styling, not the temporary override):\n`
    + `  position: ${before.position}\n`
    + `  margin: ${before.margin}\n`
    + `  top: ${before.top}, left: ${before.left}\n`
    + (parentStyle
        ? `Its parent's layout: display: ${parentStyle.display}${parentStyle.display.includes('flex') || parentStyle.display.includes('grid') ? `, gap: ${parentStyle.gap}, flex-direction: ${parentStyle.flexDirection}` : ''}\n\n`
        : '\n')
    + `Find this element's source in the codebase (use the available inspection/context tools if needed). Using the computed style and parent layout above, `
    + `apply an equivalent shift through the layout's existing mechanism (adjust an existing margin/gap/flex value to a specific new value — don't just add an arbitrary offset) `
    + `so the bounding box matches "Bounding box after" above, then remove the temporary inline override.\n\n`
    + `IMPORTANT: match the exact "Bounding box after" numbers above — including any overlap with neighboring elements this shift introduces. `
    + `Do not substitute a conventional/common layout pattern for this element (e.g. a centered logo above a heading, restoring default spacing, or otherwise "cleaning up" the placement) even if the requested position looks unusual — the drag is the actual spec, reproduce it as-is, overlap and all.\n\n`
    + `A mismatch means your change didn't reproduce the requested position. Don't just keep nudging the same margin/gap/offset value in a loop — if that mechanism can't reach the exact target `
    + `(e.g. the target requires overlapping a neighbor, which plain margin/gap can't express), switch approach (negative margin, absolute/relative positioning, grid placement, z-index, etc.) `
    + `and use whichever layout technique actually reproduces "Bounding box after" above, then verify again.\n\n`
    + `verify_dom_position({ selector: ${JSON.stringify(selector)}, expected: ${JSON.stringify(expected)} })`

  showApplyViaAiButton(el, text)
}

export function Position() {
  const state = {
    elements: []
  }

  hotkeys(key_events, (e, handler) => {
    if (e.cancelBubble) return

    e.preventDefault()
    positionElement(state.elements, handler.key)
  })

  const onNodesSelected = els => {
    state.elements.forEach(el =>
      el.teardown())

    state.elements = els.map(el =>
      draggable({el}))
  }

  const disconnect = () => {
    state.elements.forEach(el => el.teardown())
    hotkeys.unbind(key_events)
    hotkeys.unbind('up,down,left,right')
  }

  return {
    onNodesSelected,
    disconnect,
  }
}

export function draggable({el, surface = el, cursor = 'move', clickEvent}) {
   const state = {
    target: el,
    surface,
    mouse: {
      down: false,
      x: 0,
      y: 0,
    },
    element: {
      x: 0,
      y: 0,
    },
    travelDistance: 0
  }

  const setup = () => {
    el.style.transition   = 'none'
    surface.style.cursor  = cursor

    surface.addEventListener('mousedown', onMouseDown, true)
    surface.addEventListener('mouseup', onMouseUp, true)
    document.addEventListener('mousemove', onMouseMove, true)
  }

  const teardown = () => {
    el.style.transition   = null
    surface.style.cursor  = null

    surface.removeEventListener('mousedown', onMouseDown, true)
    surface.removeEventListener('mouseup', onMouseUp, true)
    document.removeEventListener('mousemove', onMouseMove, true)
  }

  const onMouseDown = e => {
    if(e.target !== state.surface) return
    e.preventDefault()

    // Snapshot the *real* computed style and bounding box before we mutate
    // anything — this is what gets reported to the agent as ground truth.
    const computedBefore = getComputedStyle(el)
    state.snapshotBefore = {
      position: computedBefore.position,
      margin: computedBefore.margin,
      top: computedBefore.top,
      left: computedBefore.left,
      rect: roundRect(el.getBoundingClientRect()),
    }

    if(getComputedStyle(el).position == 'static')
      el.style.position = 'relative'
    el.style.willChange = 'top,left'

    if (el instanceof SVGElement) {
      const translate = el.getAttribute('transform')

      const [ x, y ] = translate
        ? extractSVGTranslate(translate)
        : [0,0]

      state.element.x  = x
      state.element.y  = y
    }
    else {
      state.element.x  = parseInt(getStyle(el, 'left'))
      state.element.y  = parseInt(getStyle(el, 'top'))
    }

    state.mouse.x        = e.clientX
    state.mouse.y        = e.clientY
    state.mouse.down     = true
    state.travelDistance = 0
  }

  const onMouseUp = e => {
    if(e.target !== state.surface) return

    e.preventDefault()
    e.stopPropagation()

    state.mouse.down = false
    el.style.willChange = null

    if (el instanceof SVGElement) {
      const translate = el.getAttribute('transform')

      const [ x, y ] = translate
        ? extractSVGTranslate(translate)
        : [0,0]

      state.element.x    = x
      state.element.y    = y
    }
    else {
      state.element.x    = parseInt(el.style.left) || 0
      state.element.y    = parseInt(el.style.top) || 0
    }

    const treatAsClick = !state.travelDistance || state.travelDistance < 5
    if (clickEvent && treatAsClick) clickEvent(e);

    if (!treatAsClick && state.snapshotBefore) {
      announcePositionMove(el, state.snapshotBefore, {
        rect: roundRect(el.getBoundingClientRect()),
      })
    }

    state.travelDistance = 0 // reset after
  }

  const onMouseMove = e => {
    if (!state.mouse.down) return

    e.preventDefault()
    e.stopPropagation()


    if (el instanceof SVGElement) {
      el.setAttribute('transform', `translate(
        ${state.element.x + e.clientX - state.mouse.x},
        ${state.element.y + e.clientY - state.mouse.y}
      )`)
    }
    else {
      el.style.left = state.element.x + e.clientX - state.mouse.x + 'px'
      el.style.top  = state.element.y + e.clientY - state.mouse.y + 'px'
    }

    state.travelDistance += 1
  }

  setup()
  el.teardown = teardown

  return el
}

export function positionElement(els, direction) {
  els
    .map(el => ensurePositionable(el))
    .map(el => showHideSelected(el))
    .map(el => ({
        el,
        ...extractCurrentValueAndSide(el, direction),
        amount:   direction.split('+').includes('shift') ? 10 : 1,
        negative: determineNegativity(el, direction),
    }))
    .map(payload =>
      Object.assign(payload, {
        position: payload.negative
          ? payload.current + payload.amount
          : payload.current - payload.amount
      }))
    .forEach(({el, style, position}) =>
      el instanceof SVGElement
        ? setTranslateOnSVG(el, direction, position)
        : el.style[style] = position + 'px')
}

const extractCurrentValueAndSide = (el, direction) => {
  let style, current

  if (el instanceof SVGElement) {
    const translate = el.attr('transform')

    const [ x, y ] = translate
      ? extractSVGTranslate(translate)
      : [0,0]

    style   = 'transform'
    current = direction.includes('down') || direction.includes('up')
      ? y
      : x
  }
  else {
    const side = getSide(direction).toLowerCase()
    style = (side === 'top' || side === 'bottom') ? 'top' : 'left'
    current = getStyle(el, style)

    current === 'auto'
      ? current = 0
      : current = parseInt(current, 10)
  }

  return { style, current }
}

const extractSVGTranslate = translate =>
  translate.substring(
    translate.indexOf('(') + 1,
    translate.indexOf(')')
  ).split(',')
  .map(val => parseFloat(val))

const setTranslateOnSVG = (el, direction, position) => {
  const transform = el.attr('transform')
  const [ x, y ] = transform
    ? extractSVGTranslate(transform)
    : [0,0]

  const pos = direction.includes('down') || direction.includes('up')
    ? `${x},${position}`
    : `${position},${y}`

  el.attr('transform', `translate(${pos})`)
}

const determineNegativity = (el, direction) =>
  direction.includes('right') || direction.includes('down')

const ensurePositionable = el => {
  if (el instanceof HTMLElement)
    el.style.position = 'relative'
  return el
}
