<script setup lang="ts">
import { ref } from 'vue'

const darkMode = ref(false)

function save() {
  // placeholder persist
}
</script>

<template>
  <div class="p-6 space-y-4">
    <h1 class="text-2xl font-semibold">
      Settings
    </h1>
    <label class="inline-flex items-center gap-3">
      <input v-model="darkMode" type="checkbox">
      <span>Dark mode</span>
    </label>
    <div>
      <button class="border rounded px-4 py-2" @click="save">
        Save
      </button>
    </div>
  </div>
</template>


