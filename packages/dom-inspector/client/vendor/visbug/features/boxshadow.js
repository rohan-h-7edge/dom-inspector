import hotkeys from 'hotkeys-js'
import { metaKey, getStyle, showHideSelected, describeElement, showApplyViaAiButton, buildStableSelector } from '../utilities/'

const key_events = 'up,down,left,right'
  .split(',')
  .reduce((events, event) =>
    `${events},${event},shift+${event},alt+${event},alt+shift+${event}`
  , '')
  .substring(1)

const command_events = `${metaKey}+up,${metaKey}+shift+up,${metaKey}+down,${metaKey}+shift+down,${metaKey}+left,${metaKey}+shift+left,${metaKey}+right,${metaKey}+shift+right`

export function BoxShadow({selection}) {
  hotkeys(key_events, (e, handler) => {
    if (e.cancelBubble) return

    e.preventDefault()

    let selectedNodes = selection()
      , keys = handler.key.split('+')
      , before = new Map(selectedNodes.map(el => [el, getStyle(el, 'boxShadow')]))

    if (keys.includes('left') || keys.includes('right'))
      keys.includes('alt')
        ? changeBoxShadow(selectedNodes, keys, 'size')
        : changeBoxShadow(selectedNodes, keys, 'x')
    else
      keys.includes('alt')
        ? changeBoxShadow(selectedNodes, keys, 'blur')
        : changeBoxShadow(selectedNodes, keys, 'y')

    before.forEach((shadow, el) => announceBoxShadowChange(el, shadow))
  })

  hotkeys(command_events, (e, handler) => {
    e.preventDefault()
    let selectedNodes = selection()
      , keys = handler.key.split('+')
      , before = new Map(selectedNodes.map(el => [el, getStyle(el, 'boxShadow')]))

    keys.includes('left') || keys.includes('right')
      ? changeBoxShadow(selectedNodes, keys, 'opacity')
      : changeBoxShadow(selectedNodes, keys, 'inset')

    before.forEach((shadow, el) => announceBoxShadowChange(el, shadow))
  })

  return () => {
    hotkeys.unbind(key_events)
    hotkeys.unbind(command_events)
    hotkeys.unbind('up,down,left,right')
  }
}

// After a hotkey-driven box-shadow nudge, offer to carry the same change
// into the element's source (mirrors margin.js's announceMarginChange).
const announceBoxShadowChange = (el, before) => {
  const after = getStyle(el, 'boxShadow')
  if (before === after) return

  const selector = buildStableSelector(el)
  const expected = { style: { boxShadow: after } }

  const text = `Update this element's box-shadow in the source: ${describeElement(el)}\n\n`
    + `It was: box-shadow: ${before}\n\n`
    + `It is now: box-shadow: ${after}\n\n`
    + `Find this element's source in the codebase (use the available inspection/context tools if needed) and change its box-shadow there to match — `
    + `ONLY change the box-shadow. Do not add, remove, or edit any other CSS, className, inline style, or markup on this element as part of this change. `
    + `After editing, call the verify_dom_position tool with the selector and expected spec below — do not consider this change done until it reports pass:true.\n\n`
    + `verify_dom_position({ selector: ${JSON.stringify(selector)}, expected: ${JSON.stringify(expected)} })`

  showApplyViaAiButton(el, text)
}

const ensureHasShadow = el => {
  if (el.style.boxShadow == '' || el.style.boxShadow == 'none')
    el.style.boxShadow = 'hsla(0,0%,0%,30%) 0 0 0 0'
  return el
}

// todo: work around this propMap with a better split
const propMap = {
  'opacity':  3,
  'x':        4,
  'y':        5,
  'blur':     6,
  'size':     7,
  'inset':    8,
}

const parseCurrentShadow = el => getStyle(el, 'boxShadow').split(' ')

export function changeBoxShadow(els, direction, prop) {
  els
    .map(ensureHasShadow)
    .map(el => showHideSelected(el, 1500))
    .map(el => ({
      el,
      style:     'boxShadow',
      current:   parseCurrentShadow(el), // ["rgb(255,", "0,", "0)", "0px", "0px", "1px", "0px"]
      propIndex: parseCurrentShadow(el)[0].includes('rgba') ? propMap[prop] : propMap[prop] - 1
    }))
    .map(payload => {
      let updated = [...payload.current]
      let cur     = prop === 'opacity'
        ? payload.current[payload.propIndex]
        : parseInt(payload.current[payload.propIndex])

      switch(prop) {
        case 'blur': 
        case 'size':
          var amount = direction.includes('shift') ? 10 : 1
          updated[payload.propIndex] = direction.includes('down') || direction.includes('left')
            ? `${cur - amount}px`
            : `${cur + amount}px`
          break
        case 'inset':
          updated[payload.propIndex] = direction.includes('down')
            ? 'inset'
            : ''
          break
        case 'opacity':
          let cur_opacity = parseFloat(cur.slice(0, cur.indexOf(')')))
          var amount = direction.includes('shift') ? 0.10 : 0.01
          updated[payload.propIndex] = direction.includes('left')
            ? cur_opacity - amount + ')'
            : cur_opacity + amount + ')'
          break
        default:
          var amount = direction.includes('shift') ? 10 : 1
          updated[payload.propIndex] = direction.includes('left') || direction.includes('up')
            ? `${cur - amount}px`
            : `${cur + amount}px`
          break
      }

      payload.value = updated
      return payload
    })
    .forEach(({el, style, value}) =>
      el.style[style] = value.join(' '))
}
