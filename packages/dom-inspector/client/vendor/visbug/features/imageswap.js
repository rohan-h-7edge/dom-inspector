import $ from 'blingblingjs'
import { getStyle } from '../utilities/'
import { getDevServerBaseUrl } from '../../../utils/config-loader'
import { getSourceInfo } from '../../../sourceDetector'

let imgs      = []
  , overlays  = []
  , dragItem

// == "Apply via AI" play button, shown after a drag-and-drop image swap ==

let activePlayButton = null
let activePlayButtonAction = null
let activeSaveButton = null
let activeSaveButtonAction = null
let playButtonTimeout = null

// VisBug's own click-to-select handler intercepts (preventDefault +
// stopPropagation) every plain click on the page at document.body's CAPTURE
// phase (see selectable.js's on_click) — and every whitelisted exemption it
// checks (`isOffBounds`: vis-bug, visbug-metatip, etc.) is itself a real
// registered custom element with its own closed shadow root and no <slot>,
// so mounting our plain button *inside* one of them would exempt it from
// interception but also make it invisible (shadow roots don't render light-
// DOM children without a slot). Instead: intercept the click ourselves on
// `document` (one level higher, so we run first) and run our own action
// directly, before VisBug's document.body listener ever sees the event.
document.addEventListener('click', e => {
  if (activePlayButton && (e.target === activePlayButton || activePlayButton.contains(e.target))) {
    e.preventDefault()
    e.stopPropagation()
    activePlayButtonAction && activePlayButtonAction()
  }
  else if (activeSaveButton && (e.target === activeSaveButton || activeSaveButton.contains(e.target))) {
    e.preventDefault()
    e.stopPropagation()
    activeSaveButtonAction && activeSaveButtonAction()
  }
}, true)

const describeElement = (el) => {
  const id = el.id ? `#${el.id}` : ''
  const classes = el.className && typeof el.className === 'string'
    ? '.' + el.className.trim().split(/\s+/).join('.')
    : ''
  return `<${el.nodeName.toLowerCase()}${id}${classes}>`
}

const removePlayButton = () => {
  if (activePlayButton) {
    activePlayButton.remove()
    activePlayButton = null
  }
  if (activeSaveButton) {
    activeSaveButton.remove()
    activeSaveButton = null
  }
  activePlayButtonAction = null
  activeSaveButtonAction = null
  clearTimeout(playButtonTimeout)
}

// Browsers only expose a File object for a locally picked/dropped image,
// never a real filesystem path — so a data URL is all we have client-side.
// Rather than pasting that (potentially huge) base64 blob into the chat
// prompt, save it to disk via the dev server and hand the agent a real path.
const savePickedImage = async (dataUrl, filename) => {
  const res = await fetch(`${getDevServerBaseUrl()}/__inspector__/save-picked-image`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ dataUrl, filename }),
  })
  if (!res.ok) throw new Error(`Failed to save image (${res.status})`)
  const { path } = await res.json()
  return path
}

// Shared by both the "Apply via AI" and "Save to Context" actions — saves the
// picked image to disk if needed and returns the same descriptive text either
// action sends onward (to the agent immediately, or into the queue for later).
const buildImageSwapDescription = async (target, cssProp, oldSrc, newSrc, filename) => {
  const isDataUrl = newSrc.startsWith('data:')
  const propLabel = cssProp === 'background-image' ? 'CSS `background-image`' : '`<img>` `src`'

  if (isDataUrl) {
    const savedPath = await savePickedImage(newSrc, filename)

    return `Update this element's image: ${describeElement(target)}\n\n`
      + `The user picked a new local image to replace the one currently referenced at \`${oldSrc}\`. `
      + `It has already been saved to the project at \`${savedPath}\` (relative to the project root) — use that file directly, do not ask the user for it.\n\n`
      + `Move/rename it into the appropriate assets location (following the same convention as the asset currently at \`${oldSrc}\`) if needed, `
      + `then find this element's source in the codebase (use the available inspection/context tools if needed) and update the ${propLabel} to reference the new file.`
  }

  return `Update this element's image: ${describeElement(target)}\n\n`
    + `Change the ${propLabel} from \`${oldSrc}\` to \`${newSrc}\`\n\n`
    + `Find this element's source in the codebase (use the available inspection/context tools if needed) and apply this change there.`
}

const showImageSwapPlayButton = (target, cssProp, oldSrc, newSrc, filename) => {
  if (!oldSrc || oldSrc === newSrc) return
  removePlayButton()

  const rect = target.getBoundingClientRect()

  const makeButton = (label, background, right) => {
    const btn = document.createElement('button')
    btn.textContent = label
    btn.setAttribute('type', 'button')
    Object.assign(btn.style, {
      // VisBug draws its own selection tag/label at the top-left of a
      // selected element's bounding box — anchoring bottom-right instead
      // avoids colliding with it.
      position: 'fixed',
      top: `${Math.min(window.innerHeight - 40, rect.bottom + 6)}px`,
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

  const playBtn = makeButton('▶ Apply via AI', '#22c55e', 140)
  const saveBtn = makeButton('💾 Save to Context', '#6366f1', 300)
  // Stack save button above play button so neither overlaps.
  saveBtn.style.top = `${Math.min(window.innerHeight - 76, rect.bottom + 42)}px`

  activePlayButtonAction = async () => {
    let text
    try {
      text = await buildImageSwapDescription(target, cssProp, oldSrc, newSrc, filename)
    } catch (err) {
      console.error('[dom-inspector] Failed to save picked image:', err)
      return // leave the buttons up so the user can retry
    }

    target.dispatchEvent(new CustomEvent('metatip-style-edit', {
      bubbles: true,
      detail: { text },
    }))

    removePlayButton()
  }

  activeSaveButtonAction = async () => {
    let description
    try {
      description = await buildImageSwapDescription(target, cssProp, oldSrc, newSrc, filename)
    } catch (err) {
      console.error('[dom-inspector] Failed to save picked image:', err)
      return // leave the buttons up so the user can retry
    }

    target.dispatchEvent(new CustomEvent('save-to-context', {
      bubbles: true,
      detail: { sourceInfo: getSourceInfo(target), description },
    }))

    removePlayButton()
  }

  document.body.appendChild(playBtn)
  document.body.appendChild(saveBtn)
  activePlayButton = playBtn
  activeSaveButton = saveBtn
  // Auto-dismiss if the user doesn't act on it.
  playButtonTimeout = setTimeout(removePlayButton, 10000)
}

const state = {
  watching: true,
}

export function watchImagesForUpload() {
  imgs = $([
    ...document.images,
    ...$('picture'),
    ...findBackgroundImages(document),
  ])

  clearWatchers(imgs)
  initWatchers(imgs)
}

export function toggleWatching({watch}) {
  state.watching = watch
}

const initWatchers = imgs => {
  imgs.on('dragover', onDragOver)
  imgs.on('dragleave', onDragLeave)
  imgs.on('drop', onDrop)
  imgs.on('click', onImageClick)
  $(document.body).on('dragover', onDragOver)
  $(document.body).on('dragleave', onDragLeave)
  $(document.body).on('drop', onDrop)
  $(document.body).on('dragstart', onDragStart)
  $(document.body).on('dragend', onDragEnd)
}

const clearWatchers = imgs => {
  imgs.off('dragover', onDragOver)
  imgs.off('dragleave', onDragLeave)
  imgs.off('drop', onDrop)
  imgs.off('click', onImageClick)
  $(document.body).off('dragover', onDragOver)
  $(document.body).off('dragleave', onDragLeave)
  $(document.body).off('drop', onDrop)
  $(document.body).off('dragstart', onDragStart)
  $(document.body).off('dragend', onDragEnd)
  imgs = []
}

// == Click-to-pick — an alternative to drag-and-drop for choosing an image ==

let filePickerInput = null
let filePickerTarget = null

const getFilePickerInput = () => {
  if (filePickerInput) return filePickerInput

  filePickerInput = document.createElement('input')
  filePickerInput.type = 'file'
  filePickerInput.accept = 'image/*'
  filePickerInput.style.cssText = 'position:fixed;top:-9999px;left:-9999px;'
  filePickerInput.addEventListener('change', onFilePicked)
  document.body.appendChild(filePickerInput)
  return filePickerInput
}

// VisBug's own selection tool captures plain clicks at document.body (capture
// phase) to select/deselect elements — except when Alt is held, which it
// explicitly leaves alone (see selectable.js's on_click). So Alt+Click is the
// one interaction guaranteed to actually reach the image instead of being
// swallowed by element selection.
const onImageClick = e => {
  if (!state.watching || !e.altKey) return
  e.preventDefault()
  e.stopPropagation()

  filePickerTarget = e.currentTarget
  const input = getFilePickerInput()
  input.value = ''
  input.click()
}

const onFilePicked = async e => {
  const file = e.target.files && e.target.files[0]
  const target = filePickerTarget
  filePickerTarget = null
  if (!file || !target) return

  const src = await previewFile(file)

  if (target.nodeName === 'IMG') {
    const oldSrc = target.currentSrc || target.src
    updateContentImage(target, src)
    showImageSwapPlayButton(target, 'src', oldSrc, src, file.name)
  }
  else if (window.getComputedStyle(target).backgroundImage !== 'none') {
    const oldBg = window.getComputedStyle(target).backgroundImage
    target.style.backgroundImage = `url(${src})`
    showImageSwapPlayButton(target, 'background-image', oldBg, `url(${src})`, file.name)
  }
}

const previewFile = file => {
  return new Promise((resolve, reject) => {
    let reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onloadend = () => resolve(reader.result)
  })
}

// only fired for in-page drag events, track what the user picked up
const onDragStart = ({target}) =>
  dragItem = target

const onDragEnd = e =>
  dragItem = undefined

const onDragOver = async e => {
  e.preventDefault()
  e.stopPropagation()

  const pre_selected = $('img[data-selected=true], [data-selected=true] > img')

  if (imgs.some(img => img === e.target)) {
    if (!pre_selected.length) {
      if (!isFileEvent(e))
        previewDrop(e.target)

      showOverlay(e.currentTarget, 0)
    }
    else {
      if (pre_selected.some(node => node == e.target) && !isFileEvent(e))
        pre_selected.forEach(node =>
          previewDrop(node))

      pre_selected.forEach((img, i) =>
        showOverlay(img, i))
    }
  }
}

const onDragLeave = e => {
  e.stopPropagation()
  const pre_selected = $('img[data-selected=true], [data-selected=true] > img')

  if (!pre_selected.some(node => node === e.target))
    resetPreviewed(e.target)
  else
    pre_selected.forEach(node => resetPreviewed(node))

  hideOverlays()
}

const onDrop = async e => {
  e.stopPropagation()
  e.preventDefault()

  const { srcs, filenames } = await getTransferData(dragItem, e)

  if (srcs.length) {
    const selectedImages = $('img[data-selected=true], [data-selected=true] > img')
    const targetImages   = getTargetContentImages(selectedImages, e)

    if (targetImages.length) {
      // `lastSrc` was cached (before any preview swap) by cacheImageState()
      // during dragover — the true original, if this image was previewed.
      const oldSrcs = targetImages.map(img => img.lastSrc || img.currentSrc || img.src)
      updateContentImages(targetImages, srcs)
      targetImages.forEach((img, i) =>
        showImageSwapPlayButton(img, 'src', oldSrcs[i], srcs[i % srcs.length], filenames[i % Math.max(filenames.length, 1)]))
    }
    else {
      const bgImages = getTargetBackgroundImages(imgs, e)
      const oldBgs = bgImages.map(img => img.lastBackgroundImage || window.getComputedStyle(img).backgroundImage)
      updateBackgroundImages(bgImages, srcs[0])
      bgImages.forEach((img, i) => {
        if (window.getComputedStyle(img).backgroundImage !== 'none') {
          showImageSwapPlayButton(img, 'background-image', oldBgs[i], `url(${srcs[0]})`, filenames[0])
        }
      })
    }
  }

  hideOverlays()
}

// Returns { srcs, filenames } — filenames is `[]` for in-page image drags
// (already a real URL, nothing to upload) and has one entry per dropped
// file otherwise, used later to name the saved asset.
const getTransferData = async (dragItem, e) => {
  if (dragItem)
    return { srcs: [dragItem.currentSrc], filenames: [] }

  if (!e.dataTransfer.files.length) return { srcs: [], filenames: [] }

  const files = [...e.dataTransfer.files].filter(file => file.type.includes('image'))
  const srcs = await Promise.all(files.map(previewFile))
  return { srcs, filenames: files.map(f => f.name) }
}

const getTargetContentImages = (selected, e) =>
  selected.length ? selected
    : e.target.nodeName === 'IMG' && !selected.length ? [e.target]
    : []

const updateContentImages = (images, srcs) => {
  let i = 0
  images.forEach(img => {
    clearDragHistory(img)
    updateContentImage(img, srcs[i])
    i = ++i % srcs.length
  })
}

const updateContentImage = (img, src) => {
  img.src = src
  if (img.srcset !== '')
    img.srcset = src

  const sources = getPictureSourcesToUpdate(img)

  if (sources.length)
    sources.forEach(source =>
      source.srcset = src)
}

const getTargetBackgroundImages = (images, e) =>
  images.filter(img =>
    img.contains(e.target))

const updateBackgroundImages = (images, src) =>
  images.forEach(img => {
    clearDragHistory(img)
    if (window.getComputedStyle(img).backgroundImage != 'none')
      img.style.backgroundImage = `url(${src})`
  })

const getPictureSourcesToUpdate = img =>
  Array.from(img.parentElement.children)
    .filter(sibling =>
      sibling.nodeName === 'SOURCE')
    .filter(source =>
      !source.media || window.matchMedia(source.media).matches)

const showOverlay = (node, i) => {
  if (!state.watching) return

  const rect    = node.getBoundingClientRect()
  const overlay = overlays[i]

  if (overlay) {
    overlay.update = rect
  }
  else {
    overlays[i] = document.createElement('visbug-overlay')
    overlays[i].position = rect
    document.body.appendChild(overlays[i])
  }
}

const hideOverlays = () => {
  overlays.forEach(overlay =>
    overlay.remove())
  overlays = []
}

const findBackgroundImages = el => {
  const src_regex = /url\(\s*?['"]?\s*?(\S+?)\s*?["']?\s*?\)/i

  return $('*').reduce((collection, node) => {
    const prop = getStyle(node, 'background-image')
    const match = src_regex.exec(prop)

    // if (match) collection.push(match[1])
    if (match) collection.push(node)

    return collection
  }, [])
}

const previewDrop = async (node) => {
  if (!['lastSrc','lastSrcset','lastSiblings','lastBackgroundImage'].some(prop => node[prop])){
    const setSrc = dragItem.currentSrc
    if (window.getComputedStyle(node).backgroundImage !== 'none'){
      node.lastBackgroundImage = window.getComputedStyle(node).backgroundImage
      node.style.backgroundImage = `url(${setSrc})`
    }else{
      cacheImageState(node)
      updateContentImage(node, setSrc)
    }
  }
}

const cacheImageState = image => {
  image.lastSrc    = image.src
  image.lastSrcset = image.srcset

  const sibSource  = getPictureSourcesToUpdate(image)

  if (sibSource.length) {
    sibSource.forEach(sib => {
      sib.lastSrcset = sib.srcset
      sib.lastSrc = sib.src
    })
  }
}

const resetPreviewed = node => {
  if (node.lastSrc)
    node.src = node.lastSrc

  if (node.lastSrcset)
    node.srcset = node.lastSrcset

  const sources = getPictureSourcesToUpdate(node)
  if (sources.length)
    sources.forEach(source => {
      if (source.lastSrcset)
        source.srcset = source.lastSrcset
      if (source.lastSrc)
        source.src = source.lastSrc
    })

  if (node.lastBackgroundImage)
    node.style.backgroundImage = node.lastBackgroundImage

  clearDragHistory(node)
}

const clearDragHistory = node => {
  ['lastSrc','lastSrcset','lastBackgroundImage'].forEach(prop =>
    node[prop] = null)

  const sources = getPictureSourcesToUpdate(node)

  if (sources){
    sources.forEach(source => {
      source.lastSrcset = null
      source.lastSrc = null
    })
  }
}

const isFileEvent = e =>
  e.dataTransfer.types.some(type => type === 'Files')
