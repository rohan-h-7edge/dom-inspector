import $ from 'blingblingjs'
import { schemeRule } from '../../utilities/'
import { draggable } from '../../features/'
import { MetatipStyles, MetatipLightStyles, MetatipDarkStyles } from '../styles.store'
import { getSourceInfo } from '../../../../sourceDetector'

const escapeAttr = (str) => String(str).replace(/"/g, '&quot;')

const describeElement = (el) => {
  if (!el) return 'this element'
  const id = el.id ? `#${el.id}` : ''
  const classes = el.className && typeof el.className === 'string'
    ? '.' + el.className.trim().split(/\s+/).join('.')
    : ''
  return `<${el.nodeName.toLowerCase()}${id}${classes}>`
}

export class Metatip extends HTMLElement {

  constructor() {
    super()
    this.$shadow = this.attachShadow({mode: 'closed'})
    this.applyScheme = schemeRule(
      this.$shadow,
      MetatipStyles, MetatipLightStyles, MetatipDarkStyles
    )

    this.editedValues = new Map()

    this.observe = this.observe.bind(this)
    this.dispatchQuery = this.dispatchQuery.bind(this)
    this.dispatchUnQuery = this.dispatchUnQuery.bind(this)
    this.handleValueInput = this.handleValueInput.bind(this)
    this.handleSwatchClick = this.handleSwatchClick.bind(this)
    this.handlePlayClick = this.handlePlayClick.bind(this)
    this.handleSaveClick = this.handleSaveClick.bind(this)
    this.stopEditKeyPropagation = this.stopEditKeyPropagation.bind(this)

    this.$shadow.addEventListener('input', this.handleValueInput)
    this.$shadow.addEventListener('click', this.handleSwatchClick)
    this.$shadow.addEventListener('click', this.handlePlayClick)
    this.$shadow.addEventListener('click', this.handleSaveClick)

    // VisBug's own hotkeys (arrow-key nudging for margin/padding, single-key
    // tool switches, etc.) are bound on `document` via hotkeys-js. Because
    // this is a closed shadow root, `event.target` seen by those document
    // listeners is retargeted to this host element (not our inner
    // contenteditable span), so hotkeys-js's own "ignore contenteditable"
    // filter never kicks in and every keystroke while editing a value gets
    // hijacked as a tool shortcut instead of being typed. Stopping
    // propagation here (before the event leaves the shadow tree) fixes it —
    // vendor hotkey handlers already check `e.cancelBubble` and bail out.
    this.$shadow.addEventListener('keydown', this.stopEditKeyPropagation)
    this.$shadow.addEventListener('keypress', this.stopEditKeyPropagation)
    this.$shadow.addEventListener('keyup', this.stopEditKeyPropagation)
  }

  stopEditKeyPropagation(e) {
    if (e.target.closest && e.target.closest('[data-prop]')) {
      e.stopPropagation()
    }
  }

  // Clicking a color swatch opens VisBug's own color-picking mechanism —
  // the browser's native `<input type="color">` — instead of only allowing
  // text edits.
  handleSwatchClick(e) {
    const swatch = e.target.closest && e.target.closest('[data-color-swatch]')
    if (!swatch) return

    const prop = swatch.getAttribute('data-prop')
    const input = this.$shadow.querySelector(`[data-color-input][data-prop="${CSS.escape(prop)}"]`)
    input && input.click()
  }

  handleValueInput(e) {
    const isColorInput = e.target.matches && e.target.matches('[data-color-input]')
    const target = isColorInput
      ? e.target
      : (e.target.closest && e.target.closest('[data-prop]'))
    if (!target) return

    const prop = target.getAttribute('data-prop')
    const original = target.getAttribute('data-original')
    const current = isColorInput ? target.value : target.textContent.trim()

    if (current !== original) {
      this.editedValues.set(prop, { oldValue: original, newValue: current })
    } else {
      this.editedValues.delete(prop)
    }

    // Live-preview the change on the actual page element as the user picks
    // /types, so they see the effect before deciding to send it to the agent.
    if (this._lastEl) {
      if (prop === 'class') {
        this._lastEl.className = current
      } else if (prop === 'width' || prop === 'height') {
        const size = current || original
        this._lastEl.style.setProperty(prop, /^\d+(\.\d+)?$/.test(size) ? `${size}px` : size)
      } else {
        this._lastEl.style.setProperty(prop, current || original)
      }
    }

    // Keep the swatch dot and the text value in sync with a picker change.
    if (isColorInput) {
      const swatch = this.$shadow.querySelector(`[data-color-swatch][data-prop="${CSS.escape(prop)}"]`)
      if (swatch) swatch.style.backgroundColor = current
      const textValue = this.$shadow.querySelector(`[color-value][data-prop="${CSS.escape(prop)}"]`)
      if (textValue) textValue.textContent = current
    }

    this.updatePlayButtonVisibility()
  }

  updatePlayButtonVisibility() {
    const display = this.editedValues.size > 0 ? '' : 'none'
    const playBtn = this.$shadow.querySelector('[data-play]')
    if (playBtn) playBtn.style.display = display
    const saveBtn = this.$shadow.querySelector('[data-save]')
    if (saveBtn) saveBtn.style.display = display
  }

  buildStyleEditText() {
    const edits = Array.from(this.editedValues.entries())
      .map(([prop, { oldValue, newValue }]) => ({ prop, oldValue, newValue }))

    const lines = edits
      .map(({ prop, oldValue, newValue }) => `- \`${prop}\`: \`${oldValue}\` → \`${newValue}\``)
      .join('\n')

    const text = `Update the style of this element: ${describeElement(this._lastEl)}\n\nStyle changes requested:\n${lines}\n\nFind this element's source in the codebase (use the available inspection/context tools if needed to locate it) and apply these style changes there.`

    return { text, edits }
  }

  handlePlayClick(e) {
    const btn = e.target.closest && e.target.closest('[data-play]')
    if (!btn || this.editedValues.size === 0) return

    const { text, edits } = this.buildStyleEditText()

    this.dispatchEvent(new CustomEvent('metatip-style-edit', {
      bubbles: true,
      detail: { text, edits, el: this._lastEl },
    }))

    this.editedValues.clear()
    this.updatePlayButtonVisibility()
  }

  handleSaveClick(e) {
    const btn = e.target.closest && e.target.closest('[data-save]')
    if (!btn || this.editedValues.size === 0) return

    const { text } = this.buildStyleEditText()

    this.dispatchEvent(new CustomEvent('save-to-context', {
      bubbles: true,
      detail: { sourceInfo: getSourceInfo(this._lastEl), description: text },
    }))

    this.editedValues.clear()
    this.updatePlayButtonVisibility()
  }

  connectedCallback() {
    this.setAttribute('popover', 'manual')
    this.showPopover && this.showPopover()
    this.applyScheme(document.querySelector("vis-bug").getAttribute("color-scheme"))
    $(this.$shadow.host).on('mouseenter', this.observe)
  }

  disconnectedCallback() {
    this.unobserve()
    this.hidePopover && this.hidePopover()
  }

  dispatchQuery(e) {
    this.$shadow.host.dispatchEvent(new CustomEvent('query', {
      bubbles: true,
      detail:   {
        text:       e.target.textContent,
        activator:  e.type,
      }
    }))
  }

  observe() {
    $('h5 > a', this.$shadow).on('click mouseenter', this.dispatchQuery)
    $('h5 > a', this.$shadow).on('mouseleave', this.dispatchUnQuery)

    draggable({
      el: this,
      surface: this.$shadow.querySelector('header'),
      cursor: 'grab',
    })
  }

  unobserve() {
    $('h5 > a', this.$shadow).off('click mouseenter', this.dispatchQuery)
    $('h5 > a', this.$shadow).off('mouseleave', this.dispatchUnQuery)
  }

  dispatchUnQuery(e) {
    this.$shadow.host.dispatchEvent(new CustomEvent('unquery', {
      bubbles: true
    }))
    this.unobserve()
    this.teardown()
  }

  set meta(data) {
    this._lastEl = data.el
    this.editedValues.clear()
    this.$shadow.innerHTML = this.render(data)
  }

  renderValue(item) {
    // The swatch (color dot / gradient preview) is a non-editable island;
    // the actual value text is always editable, including color and font.
    // For solid colors, the swatch also opens the native color picker
    // (VisBug's own color-picking mechanism) as an alternative to typing.
    const prop = escapeAttr(item.prop)
    // The picker anchors itself to the trigger element's own layout
    // position — a 0×0-sized/detached input made it open at the viewport's
    // top-left. Instead, the (still invisible) input is stacked directly on
    // top of the visible swatch dot, same size and position, so the browser
    // anchors the picker right next to the swatch.
    const swatch = item.colorHex
      ? `<span data-color-wrap style="position:relative;display:inline-block;">
          <span color data-color-swatch data-prop="${prop}" style="background-color:${item.value};" title="Click to pick a color"></span>
          <input type="color" data-color-input data-prop="${prop}" value="${item.colorHex}" data-original="${escapeAttr(item.value)}" style="position:absolute;inset:0;width:100%;height:100%;padding:0;margin:0;border:0;opacity:0;cursor:pointer;">
        </span>`
      : (item.swatch || "")
    return `<span value ${item.isLocalChange ? "local-change" : ""}>${swatch}<span color-value contenteditable="true" data-prop="${prop}" data-original="${escapeAttr(item.value)}">${item.value}</span></span>`
  }

  render({el, width, height, localModifications, notLocalModifications}) {
    const classText = el.className && typeof el.className === 'string' ? el.className.trim() : ''
    const roundedWidth = Math.round(width)
    const roundedHeight = Math.round(height)

    return `
      <figure>
        <header>
          <h5>
            <a node>${el.nodeName.toLowerCase()}</a>
            <a>${el.id && '#' + el.id}</a>
            <span class-value contenteditable="true" data-prop="class" data-original="${escapeAttr(classText)}">${classText}</span>
          </h5>
          <small>
            <span dimension contenteditable="true" data-prop="width" data-original="${roundedWidth}">${roundedWidth}</span><span brand>px</span>
            <span divider>×</span>
            <span dimension contenteditable="true" data-prop="height" data-original="${roundedHeight}">${roundedHeight}</span><span brand>px</span>
          </small>
          <button data-save type="button" style="display:none;" title="Save these style changes to context (without sending to the AI agent yet)">💾</button>
          <button data-play type="button" style="display:none;" title="Send these style changes to the AI agent">▶</button>
        </header>

        <code>${notLocalModifications.reduce((items, item) => `
          ${items}
          <span><span prop>${item.prop}</span>:</span>
          ${this.renderValue(item)}
        `, '')}
        </code>
        ${localModifications.length ? `
          <details open>
            <summary>Local Modifications / Inline Styles</summary>
            <code>${localModifications.reduce((items, item) => `
              ${items}
              <span><span prop>${item.prop}</span>:</span>
              ${this.renderValue(item)}
            `, '')}
            </code>
          </details>
        ` : ''}
      </figure>
    `
  }
}

customElements.define('visbug-metatip', Metatip)
