<template>
  <div v-if="site" class="panel">
    <h1>Settings</h1>
    <form class="form" @change="save" @submit.prevent>
      <label>
        Site title
        <input v-model="site.title">
        <span class="hint">Shown in the header and in the browser tab.</span>
      </label>
      <label>
        Description
        <input v-model="site.description">
        <span class="hint">Used by search engines when a page has none of its own.</span>
      </label>
      <label>
        Home page
        <select v-model="site.homePage">
          <option v-for="p in pages" :key="p.slug" :value="p.slug">{{ p.title }}</option>
        </select>
      </label>
      <label>
        Footer
        <textarea v-model="site.footer" rows="3"></textarea>
        <span class="hint">Markdown, e.g. <code>[Instagram](https://instagram.com/…) / [Telegram](https://t.me/…)</code></span>
      </label>
      <label>
        Website address
        <input v-model="site.siteUrl" :placeholder="info.pagesUrl">
        <span class="hint">Where GitHub Pages serves the site. Used for the sitemap and the “Page not found” page.</span>
      </label>
      <label>
        Custom domain
        <input v-model="site.customDomain" placeholder="example.com">
        <span class="hint">Optional. Also configure it in the repository's GitHub Pages settings and at your domain provider.</span>
      </label>
      <label>
        Language
        <input v-model="site.lang" placeholder="en">
      </label>
    </form>

    <h2>Repository</h2>
    <p class="muted">{{ info.repo }} ({{ info.branch }})</p>
    <div class="row">
      <button :disabled="!info.changes.length" @click="confirmDiscard">Discard uncommitted changes</button>
      <button @click="confirmReset">Reset local copy</button>
      <button class="danger" @click="confirmSignOut">Disconnect</button>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'

defineProps({ pages: Array, info: Object })
const emit = defineEmits(['changed', 'error', 'discard', 'reset', 'sign-out'])
const site = ref(null)

async function save () {
  try {
    await window.cms.saveSite(JSON.parse(JSON.stringify(site.value)))
    emit('changed')
  } catch (err) {
    emit('error', err)
  }
}

function confirmDiscard () {
  if (confirm('Throw away all changes that have not been committed?')) {
    emit('discard')
  }
}

function confirmReset () {
  if (confirm('Download a fresh copy of the website from GitHub? Uncommitted changes are lost.')) {
    emit('reset')
  }
}

function confirmSignOut () {
  if (confirm('Disconnect from this repository? The token is removed from the Keychain and uncommitted changes are lost.')) {
    emit('sign-out')
  }
}

onMounted(async () => {
  try {
    site.value = await window.cms.getSite()
  } catch (err) {
    emit('error', err)
  }
})
</script>
