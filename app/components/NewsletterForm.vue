<script setup lang="ts">
const { t } = useI18n()
const { request } = useApi()

const email = ref('')
const status = ref<'idle' | 'submitting' | 'success' | 'error'>('idle')

async function onSubmit() {
  status.value = 'submitting'
  try {
    await request('/newsletter/subscribe', { method: 'POST', body: { email: email.value } })
    status.value = 'success'
    email.value = ''
  } catch {
    status.value = 'error'
  }
}
</script>

<template>
  <form class="flex flex-col sm:flex-row gap-2" @submit.prevent="onSubmit">
    <input
      v-model="email"
      type="email"
      required
      placeholder="you@example.com"
      class="flex-1 rounded-lg border border-outline-variant/50 px-4 py-2 text-sm text-on-surface bg-white focus:outline-none focus:ring-4 focus:ring-secondary/10 focus:border-secondary"
    />
    <button
      type="submit"
      :disabled="status === 'submitting'"
      class="rounded-lg bg-secondary text-white text-sm font-medium px-4 py-2 hover:opacity-90 disabled:opacity-60"
    >
      {{ status === 'submitting' ? t('contactForm.submitting') : t('footer.newsletterSubmit') }}
    </button>
    <p v-if="status === 'success'" class="text-xs text-secondary sm:ml-2 sm:self-center">
      {{ t('contactForm.success') }}
    </p>
  </form>
</template>
