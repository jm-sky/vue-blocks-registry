<script setup lang="ts">
import { ArrowUp } from 'lucide-vue-next'
import { onMounted, onUnmounted, ref } from 'vue'

const isVisible = ref(false)

const handleScroll = () => {
  isVisible.value = window.pageYOffset > 300
}

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  })
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <button
    v-show="isVisible"
    type="button"
    aria-label="Scroll to top"
    class="fixed bottom-8 right-8 bg-primary  cursor-pointer hover:bg-primary/90 text-primary-foreground rounded-full p-3 shadow-lg transition-colors duration-300"
    @click="scrollToTop"
  >
    <ArrowUp class="size-6" />
  </button>
</template>
