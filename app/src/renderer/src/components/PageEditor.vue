<template>
  <div v-if="page" class="page-editor" @keydown.capture="onKeydown">
    <div class="page-meta">
      <input v-model="page.title" class="title-input" placeholder="Page title" @input="scheduleSave">
      <div class="page-address muted">
        <span>Address: /</span>
        <input
          v-model="slugDraft"
          class="slug-input"
          :size="Math.max(slugDraft.length, 4)"
          @keydown.enter.prevent="$event.target.blur()"
          @blur="rename"
        >
        <span v-if="slug === homePage" class="badge">home page</span>
        <button v-else class="link danger" @click="remove">Delete page</button>
      </div>
    </div>

    <div v-if="editor && editor.isActive('table')" class="table-toolbar">
      <span class="muted">Table</span>
      <button @click="cmd(c => c.addRowAfter())">+ Row</button>
      <button @click="cmd(c => c.addColumnAfter())">+ Column</button>
      <button @click="cmd(c => c.deleteRow())">− Row</button>
      <button @click="cmd(c => c.deleteColumn())">− Column</button>
      <button class="danger" @click="cmd(c => c.deleteTable())">Delete table</button>
    </div>

    <BubbleMenu v-if="editor" :editor="editor" :should-show="showBubble" class="bubble">
      <button :class="{ on: editor.isActive('bold') }" @click="cmd(c => c.toggleBold())"><b>B</b></button>
      <button :class="{ on: editor.isActive('italic') }" @click="cmd(c => c.toggleItalic())"><i>I</i></button>
      <button :class="{ on: editor.isActive('strike') }" @click="cmd(c => c.toggleStrike())"><s>S</s></button>
      <button :class="{ on: editor.isActive('link') }" @click="editLink">Link</button>
      <span class="sep"></span>
      <button :class="{ on: editor.isActive('heading', { level: 2 }) }" @click="cmd(c => c.toggleHeading({ level: 2 }))">H2</button>
      <button :class="{ on: editor.isActive('heading', { level: 3 }) }" @click="cmd(c => c.toggleHeading({ level: 3 }))">H3</button>
    </BubbleMenu>

    <EditorContent :editor="editor" class="editor" />

    <ul v-if="slash.open && slashItems.length" class="slash-menu" :style="{ top: slash.top + 'px', left: slash.left + 'px' }">
      <li
        v-for="(item, i) in slashItems"
        :key="item.label"
        :class="{ active: i === slash.index }"
        @mousedown.prevent="runSlash(item)"
        @mouseenter="slash.index = i"
      >
        <span class="slash-icon">{{ item.icon }}</span>
        <span>{{ item.label }}</span>
      </li>
    </ul>

    <form v-if="linkDialog.open" ref="linkForm" class="link-dialog" :style="{ top: linkDialog.top + 'px', left: linkDialog.left + 'px' }" @submit.prevent="applyLink">
      <input ref="linkInput" v-model="linkDialog.href" placeholder="https://… or /page-address" @keydown.esc="cancelLink">
      <button type="submit" class="primary">Apply</button>
      <button type="button" @click="removeLink">Remove</button>
    </form>

    <input ref="fileInput" type="file" accept="image/*" hidden @change="onFilePicked">
  </div>
</template>

<script setup>
import { computed, nextTick, onBeforeUnmount, onMounted, reactive, ref } from 'vue'
import { Editor, EditorContent } from '@tiptap/vue-3'
import { BubbleMenu } from '@tiptap/vue-3/menus'
import StarterKit from '@tiptap/starter-kit'
import { TableKit } from '@tiptap/extension-table'
import Image from '@tiptap/extension-image'
import Placeholder from '@tiptap/extension-placeholder'
import { Markdown } from 'tiptap-markdown'
import { fromEditor, toEditor, uploadImage } from '../assets.js'

const props = defineProps({ slug: String, homePage: String })
const emit = defineEmits(['changed', 'renamed', 'deleted', 'error'])

const page = ref(null)
const slugDraft = ref(props.slug)
const editor = ref(null)
const fileInput = ref(null)
const linkInput = ref(null)
const linkForm = ref(null)
let saveTimer = null

const slash = reactive({ open: false, query: '', from: 0, top: 0, left: 0, index: 0 })
const linkDialog = reactive({ open: false, href: '', top: 0, left: 0 })

const SLASH_ITEMS = [
  { icon: 'H1', label: 'Heading 1', run: c => c.setHeading({ level: 1 }) },
  { icon: 'H2', label: 'Heading 2', run: c => c.setHeading({ level: 2 }) },
  { icon: 'H3', label: 'Heading 3', run: c => c.setHeading({ level: 3 }) },
  { icon: '¶', label: 'Text', run: c => c.setParagraph() },
  { icon: '•', label: 'Bulleted list', run: c => c.toggleBulletList() },
  { icon: '1.', label: 'Numbered list', run: c => c.toggleOrderedList() },
  { icon: '❝', label: 'Quote', run: c => c.toggleBlockquote() },
  { icon: '▦', label: 'Table', run: c => c.insertTable({ rows: 3, cols: 3, withHeaderRow: true }) },
  { icon: '▣', label: 'Image', run: c => { setTimeout(() => fileInput.value.click()); return c } },
  { icon: '—', label: 'Divider', run: c => c.setHorizontalRule() }
]

const slashItems = computed(() => {
  const q = slash.query.toLowerCase()
  return SLASH_ITEMS.filter(item => item.label.toLowerCase().includes(q))
})

function cmd (fn) {
  fn(editor.value.chain().focus()).run()
}

function showBubble ({ editor: e, from, to }) {
  return from !== to && !e.isActive('image') && !linkDialog.open
}

// --- slash menu: typing "/" at the start of an empty block opens it.
function updateSlash () {
  const e = editor.value
  const { $from, empty } = e.state.selection
  const textBefore = $from.parent.textBetween(0, $from.parentOffset, '\n', '\n')
  const match = empty && $from.parent.type.name === 'paragraph' ? /^\/(\w*)$/.exec(textBefore) : null
  if (!match) {
    slash.open = false
    return
  }
  const coords = e.view.coordsAtPos($from.pos)
  const box = e.view.dom.closest('.page-editor').getBoundingClientRect()
  Object.assign(slash, {
    open: true,
    query: match[1],
    from: $from.pos - match[0].length,
    top: coords.bottom - box.top + 6,
    left: coords.left - box.left,
    index: slash.open ? Math.min(slash.index, Math.max(slashItems.value.length - 1, 0)) : 0
  })
}

function runSlash (item) {
  const e = editor.value
  const chain = e.chain().focus().deleteRange({ from: slash.from, to: e.state.selection.from })
  item.run(chain).run()
  slash.open = false
}

function onKeydown (event) {
  if (!slash.open || !slashItems.value.length) {
    return
  }
  const keys = {
    ArrowDown: () => { slash.index = (slash.index + 1) % slashItems.value.length },
    ArrowUp: () => { slash.index = (slash.index - 1 + slashItems.value.length) % slashItems.value.length },
    Enter: () => runSlash(slashItems.value[slash.index]),
    Escape: () => { slash.open = false }
  }
  if (keys[event.key]) {
    event.preventDefault()
    event.stopPropagation()
    keys[event.key]()
  }
}

// --- links
async function editLink () {
  const e = editor.value
  const coords = e.view.coordsAtPos(e.state.selection.to)
  const box = e.view.dom.closest('.page-editor').getBoundingClientRect()
  Object.assign(linkDialog, {
    open: true,
    href: e.getAttributes('link').href || '',
    top: coords.bottom - box.top + 8,
    left: Math.max(coords.left - box.left - 120, 0)
  })
  await nextTick()
  linkInput.value?.focus()
}

function applyLink () {
  const href = linkDialog.href.trim()
  linkDialog.open = false
  if (!href) {
    return removeLink()
  }
  cmd(c => c.extendMarkRange('link').setLink({ href }))
}

function cancelLink () {
  linkDialog.open = false
  editor.value.commands.focus()
}

// Clicking anywhere outside the dialog (including selecting other text) dismisses it.
function onDocumentMousedown (event) {
  if (linkDialog.open && !linkForm.value?.contains(event.target)) {
    linkDialog.open = false
  }
}

function removeLink () {
  linkDialog.open = false
  cmd(c => c.extendMarkRange('link').unsetLink())
}

// --- images
async function insertImages (files, pos) {
  for (const file of files) {
    try {
      const src = await uploadImage(file)
      const chain = editor.value.chain().focus()
      ;(pos == null ? chain : chain.setTextSelection(pos)).setImage({ src, alt: '' }).run()
    } catch (err) {
      emit('error', err)
    }
  }
}

function onFilePicked (event) {
  insertImages([...event.target.files])
  event.target.value = ''
}

function imageFiles (dataTransfer) {
  return [...(dataTransfer?.files || [])].filter(f => f.type.startsWith('image/'))
}

// --- saving
function markdown () {
  return fromEditor(editor.value.storage.markdown.getMarkdown())
}

async function save () {
  clearTimeout(saveTimer)
  saveTimer = null
  if (!page.value || !editor.value) {
    return
  }
  try {
    await window.cms.savePage({ ...page.value, slug: props.slug, body: markdown() })
    emit('changed')
  } catch (err) {
    emit('error', err)
  }
}

function scheduleSave () {
  clearTimeout(saveTimer)
  saveTimer = setTimeout(save, 600)
}

async function rename () {
  const next = slugDraft.value.trim().toLowerCase()
  if (next === props.slug) {
    return
  }
  try {
    await save()
    await window.cms.renamePage(props.slug, next)
    emit('renamed', next)
  } catch (err) {
    slugDraft.value = props.slug
    emit('error', err)
  }
}

async function remove () {
  if (!confirm(`Delete the page "${page.value.title}"? It is also removed from the menu.`)) {
    return
  }
  try {
    clearTimeout(saveTimer)
    page.value = null
    await window.cms.deletePage(props.slug)
    emit('deleted')
  } catch (err) {
    emit('error', err)
  }
}

onMounted(async () => {
  document.addEventListener('mousedown', onDocumentMousedown, true)
  try {
    page.value = await window.cms.getPage(props.slug)
  } catch (err) {
    emit('error', err)
    return
  }
  editor.value = new Editor({
    content: toEditor(page.value.body),
    extensions: [
      StarterKit.configure({
        heading: { levels: [1, 2, 3] },
        link: { openOnClick: false, autolink: true },
        underline: false,
        code: false,
        codeBlock: false
      }),
      TableKit.configure({ table: { resizable: false } }),
      Image,
      Placeholder.configure({ placeholder: 'Type “/” for headings, tables, images…' }),
      Markdown.configure({ html: true, tightLists: true, linkify: false, breaks: false, transformPastedText: true })
    ],
    editorProps: {
      handleDrop (view, event) {
        const files = imageFiles(event.dataTransfer)
        if (!files.length) {
          return false
        }
        event.preventDefault()
        const pos = view.posAtCoords({ left: event.clientX, top: event.clientY })?.pos
        insertImages(files, pos)
        return true
      },
      handlePaste (view, event) {
        const files = imageFiles(event.clipboardData)
        if (!files.length) {
          return false
        }
        insertImages(files)
        return true
      }
    },
    onUpdate: () => {
      scheduleSave()
      updateSlash()
    },
    onSelectionUpdate: updateSlash,
    onBlur: () => { slash.open = false }
  })
})

onBeforeUnmount(() => {
  document.removeEventListener('mousedown', onDocumentMousedown, true)
  if (saveTimer) {
    save()
  }
  editor.value?.destroy()
})
</script>
