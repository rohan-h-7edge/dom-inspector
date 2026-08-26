import $ from 'blingblingjs'
import hotkeys from 'hotkeys-js'
import { TinyColor } from '@ctrl/tinycolor'

import { metaKey, getStyle, showHideSelected, describeElement, showApplyViaAiButton, buildStableSelector } from '../utilities/'

const key_events = 'up,down,left,right'
  .split(',')
  .reduce((events, event) =>
    `${events},${event},shift+${event}`
  , '')
  .substring(1)

const command_events = `${metaKey}+up,${metaKey}+shift+up,${metaKey}+down,${metaKey}+shift+down,${metaKey}+left,${metaKey}+shift+left,${metaKey}+right,${metaKey}+shift+right`

const state = {
  active_color: undefined,
  elements: [],
}

export function HueShift({Color:ColorTool, Visbug}) {
  state.active_color   = ColorTool.getActive()
  state.elements       = []

  Visbug.onSelectedUpdate(elements => {
    state.elements = elements
    ColorTool.setActive(state.active_color)
  })

  hotkeys(key_events, (e, handler) => {
    if (e.cancelBubble) return

    e.preventDefault()

    let selectedNodes = state.elements
      , keys = handler.key.split('+')
      , before = new Map(selectedNodes.map(el => [el, getColorProps(el)]))

    keys.includes('left') || keys.includes('right')
      ? changeHue(selectedNodes, keys, 's', ColorTool)
      : changeHue(selectedNodes, keys, 'l', ColorTool)

    before.forEach((props, el) => announceHueChange(el, props))
  })

  hotkeys(command_events, (e, handler) => {
    e.preventDefault()
    let keys = handler.key.split('+')
      , before = new Map(state.elements.map(el => [el, getColorProps(el)]))

    keys.includes('left') || keys.includes('right')
      ? changeHue(state.elements, keys, 'a', ColorTool)
      : changeHue(state.elements, keys, 'h', ColorTool)

    before.forEach((props, el) => announceHueChange(el, props))
  })

  hotkeys(']', (e, handler) => {
    e.preventDefault()

    if (state.active_color == 'foreground')
      state.active_color = 'background'
    else if (state.active_color == 'background')
      state.active_color = 'border'

    ColorTool.setActive(state.active_color)
  })

  hotkeys('[', (e, handler) => {
    e.preventDefault()

    if (state.active_color == 'background')
      state.active_color = 'foreground'
    else if (state.active_color == 'border')
      state.active_color = 'background'

    ColorTool.setActive(state.active_color)
  })

  return () => {
    hotkeys.unbind(key_events)
    hotkeys.unbind(command_events)
    hotkeys.unbind('up,down,left,right')
  }
}

// Snapshot of every color-bearing style this feature can touch (not just
// the currently-active one), so a before/after diff can tell which of them
// actually changed regardless of which color slot (foreground/background/
// border) was active when the hotkey fired.
const getColorProps = el => el instanceof SVGElement
  ? { stroke: getStyle(el, 'stroke'), fill: getStyle(el, 'fill'), outline: getStyle(el, 'outline') }
  : { color: getStyle(el, 'color'), backgroundColor: getStyle(el, 'backgroundColor'), borderColor: getStyle(el, 'borderColor') }

// After a hotkey-driven hue/saturation/lightness/alpha nudge, offer to
// carry the same change into the element's source (mirrors margin.js's
// announceMarginChange).
const announceHueChange = (el, before) => {
  const after = getColorProps(el)
  const changedKeys = Object.keys(after).filter(key => before[key] !== after[key])
  if (!changedKeys.length) return

  const selector = buildStableSelector(el)
  const style = changedKeys.reduce((acc, key) => Object.assign(acc, {[key]: after[key]}), {})
  const expected = { style }

  const describeProps = props => changedKeys.map(key => `${key}: ${props[key]}`).join('; ')

  const text = `Update this element's color in the source: ${describeElement(el)}\n\n`
    + `It was: ${describeProps(before)}\n\n`
    + `It is now: ${describeProps(after)}\n\n`
    + `Find this element's source in the codebase (use the available inspection/context tools if needed) and change its CSS there to match — `
    + `ONLY change the color properties listed above. Do not add, remove, or edit any other CSS, className, inline style, or markup on this element as part of this change. `
    + `After editing, call the verify_dom_position tool with the selector and expected spec below — do not consider this change done until it reports pass:true.\n\n`
    + `verify_dom_position({ selector: ${JSON.stringify(selector)}, expected: ${JSON.stringify(expected)} })`

  showApplyViaAiButton(el, text)
}

export function changeHue(els, direction, prop, ColorTool) {
  els
    .map(el => showHideSelected(el))
    .map(el => {
      const { foreground, background, border } = extractPalleteColors(el)

      // todo: teach hueshift to do handle color
      switch(ColorTool.getActive()) {
        case 'background':
          return { el, current: background.color.toHsl(), style: background.style }
        case 'foreground':
          return { el, current: foreground.color.toHsl(), style: foreground.style }
        case 'border': {
          if (el.style.border === '') el.style.border = '1px solid black'
          return { el, current: border.color.toHsl(), style: border.style }
        }
      }
    })
    .map(payload =>
      Object.assign(payload, {
        amount:   direction.includes('shift') ? 10 : 1,
        negative: direction.includes('down') || direction.includes('left'),
      }))
    .map(payload => {
      if (prop === 's' || prop === 'l' || prop === 'a')
        payload.amount = payload.amount * 0.01

      payload.current[prop] = payload.negative
        ? payload.current[prop] - payload.amount
        : payload.current[prop] + payload.amount

      if (prop === 's' || prop === 'l' || prop === 'a') {
        if (payload.current[prop] > 1) payload.current[prop] = 1
        if (payload.current[prop] < 0) payload.current[prop] = 0
      }

      return payload
    })
    .forEach(({el, style, current}) => {
      let color = new TinyColor(current).setAlpha(current.a)
      el.style[style] = color.toHslString()

      if (style == 'color') ColorTool.foreground.color(color.toHslString())
      if (style == 'backgroundColor') ColorTool.background.color(color.toHslString())
    })
}

export function extractPalleteColors(el) {
  if (el instanceof SVGElement) {
    const  fg_temp = getStyle(el, 'stroke')

    return {
      foreground: {
        style: 'stroke',
        color: new TinyColor(fg_temp === 'none'
          ? 'rgb(0, 0, 0)'
          : fg_temp),
      },
      background: {
        style: 'fill',
        color: new TinyColor(getStyle(el, 'fill')),
      },
      border: {
        style: 'outline',
        color: new TinyColor(getStyle(el, 'outline')),
      }
    }
  }
  else
    return {
      foreground: {
        style: 'color',
        color: new TinyColor(getStyle(el, 'color')),
      },
      background: {
        style: 'backgroundColor',
        color: new TinyColor(getStyle(el, 'backgroundColor')),
      },
      border: {
        style: 'borderColor',
        color: new TinyColor(getStyle(el, 'borderColor')),
      }
    }
}
