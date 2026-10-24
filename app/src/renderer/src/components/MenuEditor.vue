<template>
  <div class="panel">
    <h1>Menu</h1>
    <p class="muted">Drag items to reorder them. Labels can be edited in place.</p>

    <draggable v-model="items" item-key="id" handle=".handle" class="menu-list" @end="save">
      <template #item="{ element }">
        <div class="menu-item">
          <span class="handle" title="Drag to move">⋮⋮</span>
          <input v-model="element.label" class="menu-label" placeholder="Label" @change="save">
          <template v-if="element.type === 'page'">
            <select v-model="element.page" @change="save">
              <option v-for="p in pages" :key="p.slug" :value="p.slug">Page: {{ p.title }}</option>
            </select>
          </template>
          <template v-else>
            <input v-model="element.url" class="menu-url" placeholder="https://…" @change="save">
            <label class="checkbox"><input v-model="element.newTab" type="checkbox" @change="save"> New tab</label>
          </template>
          <button class="icon" title="Remove from menu" @click="removeItem(element)">×</button>
        </div>
      </template>
    </draggable>

    <div class="row">
      <button @click="addPage">+ Page</button>
      <button @click="addUrl">+ External link</button>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import draggable from 'vuedraggable'

const props = defineProps({ pages: Array })
const emit = defineEmits(['changed', 'error'])
const items = ref([])

const newId = () => Math.random().toString(36).slice(2, 10)

async function save () {
  try {
    await window.cms.saveMenu(JSON.parse(JSON.stringify(items.value)))
    emit('changed')
  } catch (err) {
    emit('error', err)
  }
}

function addPage () {
  const used = new Set(items.value.filter(i => i.type === 'page').map(i => i.page))
  const page = props.pages.find(p => !used.has(p.slug)) || props.pages[0]
  if (!page) {
    return
  }
  items.value.push({ id: newId(), type: 'page', label: page.title, page: page.slug })
  save()
}

function addUrl () {
  items.value.push({ id: newId(), type: 'url', label: 'Link', url: 'https://', newTab: true })
  save()
}

function removeItem (item) {
  items.value = items.value.filter(i => i !== item)
  save()
}

onMounted(async () => {
  try {
    items.value = (await window.cms.getMenu()).map(item => ({ id: item.id || newId(), ...item }))
  } catch (err) {
    emit('error', err)
  }
})
</script>
