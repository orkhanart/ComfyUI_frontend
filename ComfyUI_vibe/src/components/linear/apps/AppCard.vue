<script setup lang="ts">
export interface AppItem {
  id: string
  name: string
  icon: string
  description?: string
}

defineProps<{
  app: AppItem
}>()

const emit = defineEmits<{
  select: [app: AppItem]
}>()
</script>

<template>
  <button
    class="flex items-center gap-2 rounded-lg bg-zinc-900/60 px-2 py-1.5 transition-colors hover:bg-zinc-800"
    @click="emit('select', app)"
  >
    <div
      class="flex h-6 w-6 shrink-0 items-center justify-center rounded-md border border-zinc-700/50 bg-zinc-800"
    >
      <i :class="['pi', app.icon, 'text-xs text-zinc-400']" />
    </div>
    <span class="truncate text-[11px] text-zinc-400">{{ app.name }}</span>
  </button>
</template>
