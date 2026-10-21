<script setup lang="ts">
// Wraps rich-text content: clicking any image inside opens it full-screen with its caption.
const open = ref<{ src: string; alt: string; caption: string } | null>(null)

function onClick(event: MouseEvent) {
  const target = event.target as HTMLElement
  if (!(target instanceof HTMLImageElement)) return
  // Linked images keep their link behaviour.
  if (target.closest('a')) return
  open.value = {
    src: target.currentSrc || target.src,
    alt: target.alt,
    caption: target.closest('figure')?.querySelector('figcaption')?.textContent?.trim() ?? '',
  }
}

function close() {
  open.value = null
}

function onKey(event: KeyboardEvent) {
  if (event.key === 'Escape') close()
}

watch(open, (value) => {
  if (!import.meta.client) return
  document.body.style.overflow = value ? 'hidden' : ''
  if (value) window.addEventListener('keydown', onKey)
  else window.removeEventListener('keydown', onKey)
})

onBeforeUnmount(() => {
  if (!import.meta.client) return
  document.body.style.overflow = ''
  window.removeEventListener('keydown', onKey)
})
</script>

<template>
  <div class="content-lightbox" @click="onClick">
    <slot />
  </div>
  <Teleport to="body">
    <Transition
      enter-active-class="transition-opacity duration-200"
      leave-active-class="transition-opacity duration-150"
      enter-from-class="opacity-0"
      leave-to-class="opacity-0"
    >
      <div
        v-if="open"
        class="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black/90 p-4 sm:p-8"
        role="dialog"
        aria-modal="true"
        @click="close"
      >
        <button
          type="button"
          class="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
          aria-label="Close"
          @click.stop="close"
        >
          <span class="material-symbols-outlined">close</span>
        </button>
        <img :src="open.src" :alt="open.alt" class="max-h-[85vh] max-w-full rounded-lg object-contain" @click.stop />
        <p v-if="open.caption || open.alt" class="mt-3 max-w-3xl text-center text-sm text-white/80" @click.stop>
          {{ open.caption || open.alt }}
        </p>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.content-lightbox :deep(img) {
  cursor: zoom-in;
}
.content-lightbox :deep(a img) {
  cursor: pointer;
}
</style>
