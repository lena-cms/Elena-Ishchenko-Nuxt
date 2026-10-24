<template>
  <div class="css-editor">
    <div class="css-pane">
      <div class="pane-header">
        <h1>Styles</h1>
        <span class="muted">{{ status }}</span>
      </div>
      <div ref="host" class="codemirror-host"></div>
    </div>
    <div class="preview-pane">
      <div class="pane-header">
        <select v-model="previewSlug" @change="refreshPreview">
          <option v-for="p in pages" :key="p.slug" :value="p.slug">{{ p.title }}</option>
        </select>
      </div>
      <iframe v-if="previewSrc" :src="previewSrc" class="preview-frame" title="Preview"></iframe>
    </div>
  </div>
</template>

<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { EditorView, basicSetup } from 'codemirror'
import { css } from '@codemirror/lang-css'

const props = defineProps({ pages: Array, homePage: String })
const emit = defineEmits(['changed', 'error'])
const host = ref(null)
const status = ref('')
const previewSlug = ref(props.homePage)
const previewSrc = ref('')
let view = null
let timer = null

async function refreshPreview () {
  try {
    previewSrc.value = await window.cms.previewUrl(previewSlug.value)
  } catch (err) {
    emit('error', err)
  }
}

async function save () {
  clearTimeout(timer)
  timer = null
  try {
    await window.cms.saveStyle(view.state.doc.toString())
    status.value = 'Saved'
    emit('changed')
    await refreshPreview()
  } catch (err) {
    emit('error', err)
  }
}

onMounted(async () => {
  let doc = ''
  try {
    doc = await window.cms.getStyle()
  } catch (err) {
    emit('error', err)
  }
  view = new EditorView({
    doc,
    parent: host.value,
    extensions: [
      basicSetup,
      css(),
      EditorView.updateListener.of(update => {
        if (update.docChanged) {
          status.value = 'Editing…'
          clearTimeout(timer)
          timer = setTimeout(save, 800)
        }
      })
    ]
  })
  refreshPreview()
})

onBeforeUnmount(() => {
  if (timer) {
    save()
  }
  view?.destroy()
})
</script>
