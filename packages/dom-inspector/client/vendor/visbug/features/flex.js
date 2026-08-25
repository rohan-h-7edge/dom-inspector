import hotkeys from 'hotkeys-js'
import { metaKey, getStyle, describeElement, showApplyViaAiButton, buildStableSelector } from '../utilities/'

const key_events = 'up,down,left,right'
  .split(',')
  .reduce((events, event) =>
    `${events},${event},shift+${event}`
  , '')
  .substring(1)

const command_events = `${metaKey}+up,${metaKey}+down,${metaKey}+left,${metaKey}+right,${metaKey}+shift+up,${metaKey}+shift+down,${metaKey}+shift+left,${metaKey}+shift+right`

export function Flex({selection}) {
  hotkeys(key_events, (e, handler) => {
    if (e.cancelBubble) return

    e.preventDefault()

    let selectedNodes = selection()
      , keys = handler.key.split('+')
      , before = new Map(selectedNodes.map(el => [el, getFlexProps(el)]))

    if (keys.includes('left') || keys.includes('right'))
      keys.includes('shift')
        ? changeHDistribution(selectedNodes, handler.key)
        : changeHAlignment(selectedNodes, handler.key)
    else
      keys.includes('shift')
        ? changeVDistribution(selectedNodes, handler.key)
        : changeVAlignment(selectedNodes, handler.key)

    before.forEach((props, el) => announceFlexChange(el, props))
  })

  hotkeys(command_events, (e, handler) => {
    e.preventDefault()

    let selectedNodes = selection()
      , keys = handler.key.split('+')
      , before = new Map(selectedNodes.map(el => [el, getFlexProps(el)]))

    if (keys.includes('left') || keys.includes('right'))
      keys.includes('shift')
        ? changeOrder(selectedNodes, handler.key)
        : changeDirection(selectedNodes, 'row')
    else
      keys.includes('shift')
        ? changeWrap(selectedNodes, handler.key)
        : changeDirection(selectedNodes, 'column')

    before.forEach((props, el) => announceFlexChange(el, props))
  })

  return () => {
    hotkeys.unbind(key_events)
    hotkeys.unbind(command_events)
    hotkeys.unbind('up,down,left,right')
  }
}

const getFlexProps = el => ({
  display:        getStyle(el, 'display'),
  flexDirection:  getStyle(el, 'flexDirection'),
  justifyContent: getStyle(el, 'justifyContent'),
  alignItems:     getStyle(el, 'alignItems'),
  alignContent:   getStyle(el, 'alignContent'),
  flexWrap:       getStyle(el, 'flexWrap'),
  gap:            getStyle(el, 'gap'),
})

// A short label for a child: its element description plus a trimmed snippet
// of its own text (not descendants'), so the agent can match it to the right
// item in source even when several siblings share the same tag/class (e.g.
// tab labels, list items).
const describeChild = el => {
  const ownText = Array.from(el.childNodes)
    .filter(n => n.nodeType === Node.TEXT_NODE)
    .map(n => n.textContent.trim())
    .join(' ')
    .trim()
    .slice(0, 40)
  return ownText ? `${describeElement(el)} "${ownText}"` : describeElement(el)
}

// After a hotkey-driven flex nudge, offer to carry the same change into the
// element's source (mirrors margin.js's announceMarginChange). Unlike a
// margin/padding/position tweak, a flex edit changes a *container's* layout
// mode, so the prompt also needs to spell out which children are affected —
// otherwise the agent may reproduce the property change on the wrong element,
// or miss that reordering children was the actual visible effect.
const announceFlexChange = (el, before) => {
  const after = getFlexProps(el)
  const changedKeys = Object.keys(after).filter(key => before[key] !== after[key])
  if (!changedKeys.length) return

  const children = Array.from(el.children)
  const selector = buildStableSelector(el)
  const childSelectors = children.map(buildStableSelector)
  const expected = { style: after, childCount: children.length, childSelectors }

  const describeProps = props => changedKeys.map(key => `${key}: ${props[key]}`).join('; ')
  const describeChildren = () => children.length
    ? children.map((child, i) => `  ${i}. ${describeChild(child)}`).join('\n')
    : '  (no direct children)'

  const text = `Update this flex container's layout in the source: ${describeElement(el)}\n\n`
    + `Changed properties — it was: ${describeProps(before)}\n\n`
    + `Changed properties — it is now: ${describeProps(after)}\n\n`
    + `Full current flex properties on this container (for context — not all of these necessarily need to change): ${JSON.stringify(after)}\n\n`
    + `Direct children of this container, in their current order:\n${describeChildren()}\n\n`
    + `Find this container's source in the codebase (use the available inspection/context tools if needed) and change its CSS there to match the changed properties above — `
    + `ONLY change the flex/layout properties listed above. Do not add, remove, or edit any other CSS, className, inline style, or markup on this container or its children as part of this change. `
    + `If the children list above is in a different order than the source (e.g. this change reordered them), update the source order to match — do not just restyle. `
    + `After editing, call the verify_flex_layout tool with the selector and expected spec below — do not consider this change done until it reports pass:true.\n\n`
    + `verify_flex_layout({ selector: ${JSON.stringify(selector)}, expected: ${JSON.stringify(expected)} })`

  showApplyViaAiButton(el, text)
}

const ensureFlex = el => {
  el.style.display = 'flex'
  return el
}

const accountForOtherJustifyContent = (cur, want) => {
  if (want == 'align' && (cur != 'flex-start' && cur != 'center' && cur != 'flex-end'))
    cur = 'normal'
  else if (want == 'distribute' && (cur != 'space-around' && cur != 'space-between'))
    cur = 'normal'

  return cur
}

// todo: support reversing direction
export function changeDirection(els, value) {
  els
    .map(ensureFlex)
    .map(el => {
      el.style.flexDirection = value
    })
}

const h_alignMap      = {normal: 0,'flex-start': 0,'center': 1,'flex-end': 2,}
const h_alignOptions  = ['flex-start','center','flex-end']

export function changeHAlignment(els, direction) {
  els
    .map(ensureFlex)
    .map(el => ({
      el,
      style:    'justifyContent',
      current:  accountForOtherJustifyContent(getStyle(el, 'justifyContent'), 'align'),
      direction: direction.split('+').includes('left'),
    }))
    .map(payload =>
      Object.assign(payload, {
        value: payload.direction
          ? h_alignMap[payload.current] - 1
          : h_alignMap[payload.current] + 1
      }))
    .forEach(({el, style, value}) =>
      el.style[style] = h_alignOptions[value < 0 ? 0 : value >= 2 ? 2: value])
}

const v_alignMap      = {normal: 0,'flex-start': 0,'center': 1,'flex-end': 2,}
const v_alignOptions  = ['flex-start','center','flex-end']

export function changeVAlignment(els, direction) {
  els
    .map(ensureFlex)
    .map(el => ({
      el,
      style:    'alignItems',
      current:  getStyle(el, 'alignItems'),
      direction: direction.split('+').includes('up'),
    }))
    .map(payload =>
      Object.assign(payload, {
        value: payload.direction
          ? h_alignMap[payload.current] - 1
          : h_alignMap[payload.current] + 1
      }))
    .forEach(({el, style, value}) =>
      el.style[style] = v_alignOptions[value < 0 ? 0 : value >= 2 ? 2: value])
}

const h_distributionMap      = {normal: 1,'space-around': 0,'': 1,'space-between': 2,}
const h_distributionOptions  = ['space-around','','space-between']

export function changeHDistribution(els, direction) {
  els
    .map(ensureFlex)
    .map(el => ({
      el,
      style:    'justifyContent',
      current:  accountForOtherJustifyContent(getStyle(el, 'justifyContent'), 'distribute'),
      direction: direction.split('+').includes('left'),
    }))
    .map(payload =>
      Object.assign(payload, {
        value: payload.direction
          ? h_distributionMap[payload.current] - 1
          : h_distributionMap[payload.current] + 1
      }))
    .forEach(({el, style, value}) =>
      el.style[style] = h_distributionOptions[value < 0 ? 0 : value >= 2 ? 2: value])
}

const v_distributionMap      = {normal: 1,'space-around': 0,'': 1,'space-between': 2,}
const v_distributionOptions  = ['space-around','','space-between']

export function changeVDistribution(els, direction) {
  els
    .map(ensureFlex)
    .map(el => ({
      el,
      style:    'alignContent',
      current:  getStyle(el, 'alignContent'),
      direction: direction.split('+').includes('up'),
    }))
    .map(payload =>
      Object.assign(payload, {
        value: payload.direction
          ? v_distributionMap[payload.current] - 1
          : v_distributionMap[payload.current] + 1
      }))
    .forEach(({el, style, value}) =>
      el.style[style] = v_distributionOptions[value < 0 ? 0 : value >= 2 ? 2: value])
}

const orderMap     = {row: 0, 'row-reverse': 1, column: 2, 'column-reverse': 3,}
const orderOptions = ['row', 'row-reverse', 'column', 'column-reverse']

export function changeOrder(els, direction) {
  els
    .map(ensureFlex)
    .map(el => ({
      el,
      style: 'flexDirection',
      current: getStyle(el, 'flexDirection'),
      direction: direction.split('+').includes('left'),
    }))
    .map(payload =>
      Object.assign(payload, {
        value: payload.direction
          ? orderMap[payload.current] === 1 || orderMap[payload.current] === 3
            ? orderMap[payload.current] : orderMap[payload.current] + 1
          : orderMap[payload.current] === 0 || orderMap[payload.current] === 2
            ? orderMap[payload.current] : orderMap[payload.current] - 1
      }))
      .forEach(({el, style, value}) =>
        el.style[style] = orderOptions[value])
}

const wrapMap     = {nowrap: 0, 'wrap': 1,}
const wrapOptions = ['nowrap', 'wrap']

export function changeWrap(els, direction) {
  els
    .map(ensureFlex)
    .map(el => ({
      el,
      style: 'flexWrap',
      current: getStyle(el, 'flexWrap'),
      direction: direction.split('+').includes('up'),
    }))
    .map(payload =>
      Object.assign(payload, {
        value: payload.direction
          ? wrapMap[payload.current] === 0
            ? wrapMap[payload.current] : wrapMap[payload.current] - 1
          : wrapMap[payload.current] === 1
            ? wrapMap[payload.current] : wrapMap[payload.current] + 1
      }))
      .forEach(({el, style, value}) =>
        el.style[style] = wrapOptions[value])
}
