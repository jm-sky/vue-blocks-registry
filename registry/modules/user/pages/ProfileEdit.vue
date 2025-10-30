<script setup lang="ts">
// Minimal placeholder profile edit form
// Validation and API integration can be added via services in this module
import { ref } from 'vue'

const displayName = ref('')
const email = ref('')

function save() {
  // placeholder
}
</script>

<template>
  <div class="p-6 space-y-4">
    <h1 class="text-2xl font-semibold">
      Edit Profile
    </h1>
    <div class="space-y-2">
      <label class="block text-sm">Display name</label>
      <input v-model="displayName" class="border rounded px-3 py-2 w-full">
    </div>
    <div class="space-y-2">
      <label class="block text-sm">Email</label>
      <input v-model="email" type="email" class="border rounded px-3 py-2 w-full">
    </div>
    <button class="border rounded px-4 py-2" @click="save">
      Save
    </button>
  </div>
</template>


