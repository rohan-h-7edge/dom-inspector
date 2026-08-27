import $ from 'blingblingjs'
import hotkeys from 'hotkeys-js'
import { showHideNodeLabel, showApplyViaAiButton, describeElement, buildStableSelector } from '../utilities/'

const originalText = new WeakMap()

const announceTextEdit = (el, before) => {
  const after = el.textContent
  if (before === after) return // no actual change

  const selector = buildStableSelector(el)
  const text = `Edit this element's text in the source: ${describeElement(el)}\n\n`
    + `It was: ${JSON.stringify(before)}\n\n`
    + `It is now: ${JSON.stringify(after)}\n\n`
    + `Find this element's source in the codebase (use the available inspection/context tools if needed) and update its text content there to match — `
    + `ONLY change the text. Do not add, remove, or edit any CSS, className, inline style, or wrapper markup on this element as part of this change.`
    + (selector ? `\n\nselector: ${JSON.stringify(selector)}` : '')

  showApplyViaAiButton(el, text)
}

const removeEditability = ({target}) => {
  target.removeAttribute('contenteditable')
  target.removeAttribute('spellcheck')
  target.removeEventListener('blur', removeEditability)
  target.removeEventListener('keydown', stopBubbling)
  hotkeys.unbind('escape,esc')

  announceTextEdit(target, originalText.get(target))
  originalText.delete(target)
}

const stopBubbling = e => e.key != 'Escape' && e.stopPropagation()

const cleanup = (e, handler) => {
  $('[spellcheck="true"]').forEach(target => removeEditability({target}))
  window.getSelection().empty()
}

export function EditText(elements) {
  if (!elements.length) return

  elements.map(el => {
    let $el = $(el)

    originalText.set(el, el.textContent)

    $el.attr({
      contenteditable: true,
      spellcheck: true,
    })
    el.focus()
    showHideNodeLabel(el, true)

    $el.on('keydown', stopBubbling)
    $el.on('blur', removeEditability)
  })

  hotkeys('escape,esc', cleanup)
}