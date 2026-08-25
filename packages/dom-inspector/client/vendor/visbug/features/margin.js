import hotkeys from 'hotkeys-js'
import { metaKey, getStyle, getSide, showHideSelected, describeElement, showApplyViaAiButton, buildStableSelector } from '../utilities/'

const key_events = 'up,down,left,right'
  .split(',')
  .reduce((events, event) =>
    `${events},${event},alt+${event},shift+${event},shift+alt+${event}`
  , '')
  .substring(1)

const command_events = `${metaKey}+up,${metaKey}+shift+up,${metaKey}+down,${metaKey}+shift+down`

export function Margin(visbug) {
  hotkeys(key_events, (e, handler) => {
    if (e.cancelBubble) return

    e.preventDefault()
    visbug.selection().forEach(el => {
      const before = getMarginSides(el)
      pushElement([el], handler.key)
      announceMarginChange(el, before)
    })
  })

  hotkeys(command_events, (e, handler) => {
    e.preventDefault()
    const before = new Map(visbug.selection().map(el => [el, getMarginSides(el)]))
    pushAllElementSides(visbug.selection(), handler.key)
    before.forEach((sides, el) => announceMarginChange(el, sides))
  })

  visbug.onSelectedUpdate(paintBackgrounds)

  return () => {
    hotkeys.unbind(key_events)
    hotkeys.unbind(command_events)
    hotkeys.unbind('up,down,left,right') // bug in lib?
    visbug.removeSelectedCallback(paintBackgrounds)
    removeBackgrounds(visbug.selection())
  }
}

export function pushElement(els, direction) {
  els
    .map(el => showHideSelected(el))
    .map(el => ({
      el,
      style:    'margin' + getSide(direction),
      current:  parseInt(getStyle(el, 'margin' + getSide(direction)), 10),
      amount:   direction.split('+').includes('shift') ? 10 : 1,
      negative: direction.split('+').includes('alt'),
    }))
    .map(payload =>
      Object.assign(payload, {
        margin: payload.negative
          ? payload.current - payload.amount
          : payload.current + payload.amount
      }))
    .forEach(({el, style, margin}) =>
      el.style[style] = `${margin < 0 ? 0 : margin}px`)
}

export function pushAllElementSides(els, keycommand) {
  const combo = keycommand.split('+')
  let spoof = ''

  if (combo.includes('shift'))  spoof = 'shift+' + spoof
  if (combo.includes('down'))   spoof = 'alt+' + spoof

  'up,down,left,right'.split(',')
    .forEach(side => pushElement(els, spoof + side))
}

const getMarginSides = el => ({
  top:    getStyle(el, 'marginTop'),
  right:  getStyle(el, 'marginRight'),
  bottom: getStyle(el, 'marginBottom'),
  left:   getStyle(el, 'marginLeft'),
})

// After a hotkey-driven margin nudge, offer to carry the same change into
// the element's source (mirrors move.js's announceMove for reordering).
const announceMarginChange = (el, before) => {
  const after = getMarginSides(el)
  if (before.top === after.top && before.right === after.right
    && before.bottom === after.bottom && before.left === after.left) return

  const selector = buildStableSelector(el)
  const margin = `${after.top} ${after.right} ${after.bottom} ${after.left}`
  const expected = { margin }

  const text = `Update this element's margin in the source: ${describeElement(el)}\n\n`
    + `It was: margin: ${before.top} ${before.right} ${before.bottom} ${before.left}\n\n`
    + `It is now: margin: ${margin}\n\n`
    + `Find this element's source in the codebase (use the available inspection/context tools if needed) and change its margin there to match — `
    + `ONLY change the margin. Do not add, remove, or edit any other CSS, className, inline style, or markup on this element as part of this change. `
    + `After editing, call the verify_dom_position tool with the selector and expected spec below — do not consider this change done until it reports pass:true.\n\n`
    + `verify_dom_position({ selector: ${JSON.stringify(selector)}, expected: ${JSON.stringify(expected)} })`

  showApplyViaAiButton(el, text)
}

function paintBackgrounds(els) {
  els.forEach(el => {
    const label_id = el.getAttribute('data-label-id')

    document
      .querySelector(`visbug-handles[data-label-id="${label_id}"]`)
      .backdrop = {
        element:  createMarginVisual(el),
        update:   createMarginVisual,
      }
  })
}

function removeBackgrounds(els) {
  els.forEach(el => {
    const label_id = el.getAttribute('data-label-id')
    const boxmodel = document.querySelector(`visbug-handles[data-label-id="${label_id}"]`)
      .$shadow.querySelector('visbug-boxmodel')

    if (boxmodel) boxmodel.remove()
  })
}

export function createMarginVisual(el, hover = false) {
  const bounds            = el.getBoundingClientRect()
  const calculatedStyle   = getStyle(el, 'margin')
  const boxdisplay        = document.createElement('visbug-boxmodel')

  if (calculatedStyle !== '0px') {
    const sides = {
      top:    getStyle(el, 'marginTop'),
      right:  getStyle(el, 'marginRight'),
      bottom: getStyle(el, 'marginBottom'),
      left:   getStyle(el, 'marginLeft'),
    }

    Object.entries(sides).forEach(([side, val]) => {
      if (typeof val !== 'number')
        val = parseInt(getStyle(el, 'margin'+'-'+side).slice(0, -2))

      sides[side] = Math.round(val.toFixed(1) * 100) / 100
    })

    boxdisplay.position = { 
      mode: 'margin',
      color: hover ? 'purple' : 'pink',
      bounds, 
      sides,
    }
  }

  return boxdisplay
}
