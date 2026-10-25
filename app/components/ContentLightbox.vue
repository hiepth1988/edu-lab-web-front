<script setup lang="ts">
// Wraps content: clicking any image inside opens it full-screen with its caption.
// Prev/next (buttons, arrow keys, swipe) moves through the other images in the same wrapper.
type Item = { src: string; alt: string; caption: string }

const root = ref<HTMLElement | null>(null)
const items = ref<Item[]>([])
const index = ref<number | null>(null)
const open = computed(() => (index.value === null ? null : items.value[index.value] ?? null))
const hasMany = computed(() => items.value.length > 1)

function toItem(img: HTMLImageElement): Item {
  return {
    src: img.currentSrc || img.src,
    alt: img.alt,
    caption: img.closest('figure')?.querySelector('figcaption')?.textContent?.trim() ?? '',
  }
}

function onClick(event: MouseEvent) {
  const target = event.target as HTMLElement
  if (!(target instanceof HTMLImageElement)) return
  // Linked images keep their link behaviour.
  if (target.closest('a')) return
  const imgs = Array.from(root.value?.querySelectorAll('img') ?? []).filter(
    (img) => !img.closest('a') && (img.currentSrc || img.src),
  )
  items.value = imgs.map(toItem)
  const i = imgs.indexOf(target)
  index.value = i === -1 ? 0 : i
  if (i === -1) items.value = [toItem(target)]
}

function close() {
  index.value = null
}

function step(delta: number) {
  if (index.value === null || !hasMany.value) return
  const n = items.value.length
  index.value = (index.value + delta + n) % n
}

function onKey(event: KeyboardEvent) {
  if (event.key === 'Escape') close()
  else if (event.key === 'ArrowRight') step(1)
  else if (event.key === 'ArrowLeft') step(-1)
}

let touchX: number | null = null
function onTouchStart(event: TouchEvent) {
  touchX = event.touches[0]?.clientX ?? null
}
function onTouchEnd(event: TouchEvent) {
  if (touchX === null) return
  const dx = (event.changedTouches[0]?.clientX ?? touchX) - touchX
  touchX = null
  if (Math.abs(dx) > 50) step(dx < 0 ? 1 : -1)
}

watch(
  () => index.value !== null,
  (isOpen) => {
    if (!import.meta.client) return
    document.body.style.overflow = isOpen ? 'hidden' : ''
    if (isOpen) window.addEventListener('keydown', onKey)
    else window.removeEventListener('keydown', onKey)
  },
)

onBeforeUnmount(() => {
  if (!import.meta.client) return
  document.body.style.overflow = ''
  window.removeEventListener('keydown', onKey)
})
</script>

<template>
  <div ref="root" class="content-lightbox" @click="onClick">
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
        @touchstart.passive="onTouchStart"
        @touchend="onTouchEnd"
      >
        <button
          type="button"
          class="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
          aria-label="Close"
          @click.stop="close"
        >
          <span class="material-symbols-outlined">close</span>
        </button>

        <template v-if="hasMany">
          <button
            type="button"
            class="absolute left-2 top-1/2 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 sm:left-4"
            aria-label="Previous image"
            @click.stop="step(-1)"
          >
            <span class="material-symbols-outlined">chevron_left</span>
          </button>
          <button
            type="button"
            class="absolute right-2 top-1/2 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 sm:right-4"
            aria-label="Next image"
            @click.stop="step(1)"
          >
            <span class="material-symbols-outlined">chevron_right</span>
          </button>
        </template>

        <img
          :key="open.src"
          :src="open.src"
          :alt="open.alt"
          class="max-h-[80vh] max-w-full rounded-lg object-contain sm:max-w-[calc(100%-7rem)]"
          @click.stop
        />
        <p v-if="open.caption || open.alt" class="mt-3 max-w-3xl text-center text-sm text-white/80" @click.stop>
          {{ open.caption || open.alt }}
        </p>
        <p v-if="hasMany" class="mt-2 text-xs text-white/60" @click.stop>
          {{ (index ?? 0) + 1 }} / {{ items.length }}
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
