<template>
  <div v-if="phase === 'loading'" class="center">
    <div class="spinner"></div>
    <p class="muted">{{ progressText || 'Opening…' }}</p>
  </div>

  <div v-else-if="phase === 'error'" class="center">
    <p class="error-text">{{ error }}</p>
    <div class="row">
      <button class="primary" @click="start">Try again</button>
      <button @click="signOut">Change repository</button>
    </div>
  </div>

  <SetupView v-else-if="phase === 'setup'" @done="enter" />

  <div v-else class="shell">
    <aside class="sidebar">
      <div class="drag-region"></div>
      <div class="sidebar-section">
        <div class="sidebar-heading">
          <span>Pages</span>
          <button class="icon" title="New page" @click="newPage">+</button>
        </div>
        <button
          v-for="page in pages"
          :key="page.slug"
          class="nav-item"
          :class="{ active: view.type === 'page' && view.slug === page.slug }"
          @click="open({ type: 'page', slug: page.slug })"
        >
          <span class="nav-label">{{ page.title }}</span>
          <span v-if="changedPages.has(page.slug)" class="dot" title="Not committed"></span>
        </button>
      </div>
      <div class="sidebar-section">
        <div class="sidebar-heading"><span>Website</span></div>
        <button class="nav-item" :class="{ active: view.type === 'menu' }" @click="open({ type: 'menu' })">
          <span class="nav-label">Menu</span>
          <span v-if="changedFiles.has('content/menu.json')" class="dot"></span>
        </button>
        <button class="nav-item" :class="{ active: view.type === 'styles' }" @click="open({ type: 'styles' })">
          <span class="nav-label">Styles</span>
          <span v-if="changedFiles.has('content/style.css')" class="dot"></span>
        </button>
        <button class="nav-item" :class="{ active: view.type === 'settings' }" @click="open({ type: 'settings' })">
          <span class="nav-label">Settings</span>
          <span v-if="changedFiles.has('content/site.json')" class="dot"></span>
        </button>
      </div>
      <div class="sidebar-footer muted">
        {{ info.repo }}
      </div>
    </aside>

    <section class="main">
      <header class="topbar">
        <div class="topbar-status muted">
          <template v-if="busy">{{ progressText }}</template>
          <template v-else-if="info.changes.length">{{ info.changes.length }} uncommitted change{{ info.changes.length === 1 ? '' : 's' }}</template>
          <template v-else>Everything is published</template>
        </div>
        <div class="row">
          <button :disabled="busy" title="Get changes made elsewhere" @click="sync">Sync</button>
          <button :disabled="busy" @click="preview">Preview</button>
          <button class="primary" :disabled="busy || !info.changes.length" @click="commitOpen = true">Commit</button>
        </div>
      </header>

      <div v-if="error" class="banner error" @click="error = ''">{{ error }}</div>
      <div v-if="notice" class="banner notice">
        <span>{{ notice }}</span>
        <a href="#" @click.prevent="openSite">Open website</a>
        <button class="icon" @click="notice = ''">×</button>
      </div>

      <div :key="reloadKey" class="content">
        <PageEditor
          v-if="view.type === 'page'"
          :key="view.slug"
          :slug="view.slug"
          :home-page="site.homePage"
          @changed="refreshState"
          @renamed="onRenamed"
          @deleted="onDeleted"
          @error="showError"
        />
        <MenuEditor v-else-if="view.type === 'menu'" :pages="pages" @changed="refreshState" @error="showError" />
        <CssEditor v-else-if="view.type === 'styles'" :pages="pages" :home-page="site.homePage" @changed="refreshState" @error="showError" />
        <SettingsEditor
          v-else-if="view.type === 'settings'"
          :pages="pages"
          :info="info"
          @changed="refreshState"
          @error="showError"
          @discard="discard"
          @reset="resetLocalCopy"
          @sign-out="signOut"
        />
      </div>
    </section>

    <div v-if="commitOpen" class="modal-backdrop" @click.self="!busy && (commitOpen = false)">
      <form class="modal" @submit.prevent="commit">
        <h2>Publish changes</h2>
        <p class="muted">The website is rebuilt and pushed to GitHub. It is usually live within a minute.</p>
        <ul class="change-list">
          <li v-for="c in info.changes" :key="c.file">
            <span class="badge" :class="c.status">{{ c.status }}</span> {{ c.file.replace(/^content\//, '') }}
          </li>
        </ul>
        <label>
          Description
          <input v-model="commitMessage" placeholder="Update website" :disabled="busy" autofocus>
        </label>
        <p v-if="busy" class="muted">{{ progressText }}</p>
        <div class="row end">
          <button type="button" :disabled="busy" @click="commitOpen = false">Cancel</button>
          <button type="submit" class="primary" :disabled="busy">Commit and publish</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import SetupView from './components/SetupView.vue'
import PageEditor from './components/PageEditor.vue'
import MenuEditor from './components/MenuEditor.vue'
import CssEditor from './components/CssEditor.vue'
import SettingsEditor from './components/SettingsEditor.vue'

const phase = ref('loading')
const error = ref('')
const notice = ref('')
const progressText = ref('')
const busy = ref(false)
const info = ref({ repo: '', pagesUrl: '', changes: [] })
const pages = ref([])
const site = ref({})
const view = ref({ type: 'page', slug: null })
const commitOpen = ref(false)
const commitMessage = ref('')
const reloadKey = ref(0)

window.cms.onProgress(message => { progressText.value = message })

const changedFiles = computed(() => new Set(info.value.changes.map(c => c.file)))
const changedPages = computed(() => new Set(info.value.changes
  .map(c => /^content\/pages\/(.+)\.md$/.exec(c.file)?.[1])
  .filter(Boolean)))

function showError (err) {
  error.value = err?.message || String(err)
}

async function loadLists () {
  ;[pages.value, site.value] = await Promise.all([window.cms.listPages(), window.cms.getSite()])
}

async function enter ({ warning, ...result }) {
  info.value = result
  error.value = warning || ''
  await loadLists()
  if (!view.value.slug || !pages.value.some(p => p.slug === view.value.slug)) {
    const home = pages.value.find(p => p.slug === site.value.homePage) || pages.value[0]
    view.value = { type: 'page', slug: home?.slug }
  }
  phase.value = 'ready'
}

async function start () {
  phase.value = 'loading'
  try {
    const result = await window.cms.init()
    if (!result.configured) {
      phase.value = 'setup'
      return
    }
    await enter(result)
  } catch (err) {
    error.value = err.message
    phase.value = 'error'
  }
}

async function refreshState () {
  try {
    info.value = await window.cms.state()
    await loadLists()
  } catch (err) {
    showError(err)
  }
}

function open (next) {
  view.value = next
}

async function run (task) {
  if (busy.value) {
    return
  }
  busy.value = true
  error.value = ''
  try {
    return await task()
  } catch (err) {
    showError(err)
  } finally {
    busy.value = false
    progressText.value = ''
  }
}

async function newPage () {
  const slug = await run(() => window.cms.createPage('New page'))
  if (slug) {
    await refreshState()
    open({ type: 'page', slug })
  }
}

async function onRenamed (slug) {
  await refreshState()
  open({ type: 'page', slug })
}

async function onDeleted () {
  await refreshState()
  open({ type: 'page', slug: site.value.homePage })
}

const sync = () => run(async () => {
  info.value = await window.cms.sync()
  await loadLists()
  // Remount the current editor so it shows what was fetched.
  reloadKey.value++
})

const preview = () => run(() => window.cms.preview())

const commit = () => run(async () => {
  const res = await window.cms.commit(commitMessage.value.trim())
  info.value = res
  commitOpen.value = false
  commitMessage.value = ''
  notice.value = res.result
    ? `Published ${res.result.files} file${res.result.files === 1 ? '' : 's'}. GitHub Pages updates in about a minute.`
    : 'Nothing to publish.'
})

const discard = () => run(async () => {
  info.value = await window.cms.discard()
  await loadLists()
  reloadKey.value++
  open({ type: 'page', slug: site.value.homePage })
})

const resetLocalCopy = () => run(async () => {
  info.value = await window.cms.resetLocalCopy()
  await loadLists()
  reloadKey.value++
  open({ type: 'page', slug: site.value.homePage })
})

async function signOut () {
  await window.cms.signOut()
  error.value = ''
  phase.value = 'setup'
}

function openSite () {
  window.cms.openExternal(site.value.customDomain ? `https://${site.value.customDomain}/` : (site.value.siteUrl || info.value.pagesUrl))
}

onMounted(start)
</script>
