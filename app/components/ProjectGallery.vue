<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps<{
  images: string[]
}>()

const track = ref<HTMLElement>()
const active = ref(0)

function scrollToIndex(i: number) {
  const el = track.value
  if (!el) return
  const slide = el.children[i] as HTMLElement | undefined
  slide?.scrollIntoView({ behavior: 'smooth', inline: 'start', block: 'nearest' })
  active.value = i
}

function prev() {
  scrollToIndex(Math.max(active.value - 1, 0))
}

function next() {
  scrollToIndex(Math.min(active.value + 1, props.images.length - 1))
}

function onScroll() {
  const el = track.value
  if (!el) return
  active.value = Math.round(el.scrollLeft / el.clientWidth)
}
</script>

<template>
  <div v-if="images.length" class="relative mt-6">
    <div
      ref="track"
      class="flex gap-4 overflow-x-auto snap-x snap-mandatory scroll-smooth rounded-xl [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      @scroll.passive="onScroll"
    >
      <div
        v-for="(src, i) in images"
        :key="i"
        class="shrink-0 w-full snap-start"
      >
        <img :src="src" alt="" class="h-64 sm:h-80 w-full rounded-xl object-cover" />
      </div>
    </div>

    <template v-if="images.length > 1">
      <button
        type="button"
        aria-label="Previous image"
        class="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-white/90 border border-slate-200 h-9 w-9 flex items-center justify-center text-slate-700 hover:bg-white shadow-sm"
        @click="prev"
      >
        ‹
      </button>
      <button
        type="button"
        aria-label="Next image"
        class="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white/90 border border-slate-200 h-9 w-9 flex items-center justify-center text-slate-700 hover:bg-white shadow-sm"
        @click="next"
      >
        ›
      </button>

      <div class="mt-3 flex justify-center gap-1.5">
        <button
          v-for="(_, i) in images"
          :key="i"
          type="button"
          :aria-label="`Go to image ${i + 1}`"
          class="h-1.5 rounded-full transition-all"
          :class="active === i ? 'w-5 bg-slate-900' : 'w-1.5 bg-slate-300'"
          @click="scrollToIndex(i)"
        />
      </div>
    </template>
  </div>
</template>
