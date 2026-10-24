<template>
  <div class="center">
    <div class="drag-region wide"></div>
    <form class="setup" @submit.prevent="submit">
      <h1>Connect your website</h1>
      <p class="muted">
        The app keeps a copy of the website's GitHub repository on this Mac and publishes
        your edits to it. Both values are stored in the macOS Keychain.
      </p>
      <label>
        Repository URL
        <input v-model="repoUrl" placeholder="https://github.com/owner/repository" required :disabled="busy">
      </label>
      <label>
        GitHub token
        <input v-model="token" type="password" placeholder="github_pat_…" required :disabled="busy">
        <span class="hint">
          A <a href="#" @click.prevent="openTokenPage">fine-grained personal access token</a>
          with access to this repository only and the permission <b>Contents: Read and write</b>.
        </span>
      </label>
      <p v-if="error" class="error-text">{{ error }}</p>
      <p v-if="busy" class="muted">{{ progress || 'Connecting…' }}</p>
      <button class="primary" type="submit" :disabled="busy">Connect</button>
    </form>
  </div>
</template>

<script setup>
import { onUnmounted, ref } from 'vue'

const emit = defineEmits(['done'])
const repoUrl = ref('')
const token = ref('')
const busy = ref(false)
const error = ref('')
const progress = ref('')
const stop = window.cms.onProgress(m => { progress.value = m })
onUnmounted(stop)

function openTokenPage () {
  window.cms.openExternal('https://github.com/settings/personal-access-tokens/new')
}

async function submit () {
  busy.value = true
  error.value = ''
  try {
    emit('done', await window.cms.setup({ repoUrl: repoUrl.value, token: token.value }))
  } catch (err) {
    error.value = err.message
  } finally {
    busy.value = false
  }
}
</script>
