<script setup lang="ts">
const { t } = useI18n()
const { request } = useApi()

const form = reactive({
  name: '',
  email: '',
  phone: '',
  company: '',
  need: '',
  message: '',
})

const status = ref<'idle' | 'submitting' | 'success' | 'error'>('idle')

const needOptions = [
  { value: 'lms', label: t('contactForm.needOptions.lms') },
  { value: 'exam', label: t('contactForm.needOptions.exam') },
  { value: 'ai', label: t('contactForm.needOptions.ai') },
  { value: 'analytics', label: t('contactForm.needOptions.analytics') },
  { value: 'consulting', label: t('contactForm.needOptions.consulting') },
  { value: 'other', label: t('contactForm.needOptions.other') },
]

async function onSubmit() {
  status.value = 'submitting'
  try {
    await request('/leads', {
      method: 'POST',
      body: {
        ...form,
        source_url: useRequestURL().toString(),
      },
    })
    status.value = 'success'
    Object.assign(form, { name: '', email: '', phone: '', company: '', need: '', message: '' })
  } catch {
    status.value = 'error'
  }
}
</script>

<template>
  <form class="space-y-5" @submit.prevent="onSubmit">
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
      <div>
        <label class="text-sm font-medium text-on-surface-variant">{{ t('contactForm.name') }}</label>
        <input
          v-model="form.name"
          type="text"
          required
          class="mt-1 w-full rounded-lg border border-outline-variant/50 px-3 py-2 text-sm focus:outline-none focus:ring-4 focus:ring-secondary/10 focus:border-secondary"
        />
      </div>
      <div>
        <label class="text-sm font-medium text-on-surface-variant">{{ t('contactForm.email') }}</label>
        <input
          v-model="form.email"
          type="email"
          required
          class="mt-1 w-full rounded-lg border border-outline-variant/50 px-3 py-2 text-sm focus:outline-none focus:ring-4 focus:ring-secondary/10 focus:border-secondary"
        />
      </div>
      <div>
        <label class="text-sm font-medium text-on-surface-variant">{{ t('contactForm.phone') }}</label>
        <input
          v-model="form.phone"
          type="text"
          class="mt-1 w-full rounded-lg border border-outline-variant/50 px-3 py-2 text-sm focus:outline-none focus:ring-4 focus:ring-secondary/10 focus:border-secondary"
        />
      </div>
      <div>
        <label class="text-sm font-medium text-on-surface-variant">{{ t('contactForm.company') }}</label>
        <input
          v-model="form.company"
          type="text"
          class="mt-1 w-full rounded-lg border border-outline-variant/50 px-3 py-2 text-sm focus:outline-none focus:ring-4 focus:ring-secondary/10 focus:border-secondary"
        />
      </div>
    </div>

    <div>
      <label class="text-sm font-medium text-on-surface-variant">{{ t('contactForm.need') }}</label>
      <select
        v-model="form.need"
        class="mt-1 w-full rounded-lg border border-outline-variant/50 px-3 py-2 text-sm focus:outline-none focus:ring-4 focus:ring-secondary/10 focus:border-secondary"
      >
        <option value="" disabled>—</option>
        <option v-for="opt in needOptions" :key="opt.value" :value="opt.value">
          {{ opt.label }}
        </option>
      </select>
    </div>

    <div>
      <label class="text-sm font-medium text-on-surface-variant">{{ t('contactForm.message') }}</label>
      <textarea
        v-model="form.message"
        rows="4"
        class="mt-1 w-full rounded-lg border border-outline-variant/50 px-3 py-2 text-sm focus:outline-none focus:ring-4 focus:ring-secondary/10 focus:border-secondary"
      />
    </div>

    <button
      type="submit"
      :disabled="status === 'submitting'"
      class="rounded-xl bg-secondary text-white text-sm font-medium px-6 py-3 hover:opacity-90 disabled:opacity-60"
    >
      {{ status === 'submitting' ? t('contactForm.submitting') : t('contactForm.submit') }}
    </button>

    <p v-if="status === 'success'" class="text-sm text-secondary">
      {{ t('contactForm.success') }}
    </p>
    <p v-if="status === 'error'" class="text-sm text-error">
      {{ t('contactForm.error') }}
    </p>
  </form>
</template>
