<script setup lang="ts">
import type { AppItem } from './AppCard.vue'

export interface CollectionItem {
  id: string
  name: string
  description: string
  thumbnail: string
  apps: AppItem[]
}

defineProps<{
  collection: CollectionItem
}>()

const emit = defineEmits<{
  select: [collection: CollectionItem]
  'select-app': [app: AppItem]
}>()
</script>

<template>
  <div class="flex flex-col gap-2">
    <!-- Main Card -->
    <button
      class="group relative h-32 overflow-hidden rounded-xl border border-zinc-800/50"
      @click="emit('select', collection)"
    >
      <!-- Background Image -->
      <img
        :src="collection.thumbnail"
        :alt="collection.name"
        class="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
      />

      <!-- Gradient Overlay -->
      <div class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/20" />

      <!-- Content -->
      <div class="absolute bottom-0 left-0 right-0 p-3">
        <h4 class="text-sm font-semibold text-white">
          {{ collection.name }}
        </h4>
        <p class="mt-0.5 line-clamp-2 text-[10px] leading-snug text-zinc-400">
          {{ collection.description }}
        </p>
      </div>
    </button>

    <!-- Apps Row -->
    <div class="grid grid-cols-2 gap-1">
      <button
        v-for="app in collection.apps.slice(0, 4)"
        :key="app.id"
        class="flex items-center gap-2 rounded-lg bg-zinc-900/60 px-2 py-1.5 transition-colors hover:bg-zinc-800"
        @click="emit('select-app', app)"
      >
        <div
          class="flex h-6 w-6 shrink-0 items-center justify-center rounded-md border border-zinc-700/50 bg-zinc-800"
        >
          <i :class="['pi', app.icon, 'text-xs text-zinc-400']" />
        </div>
        <span class="truncate text-[11px] text-zinc-400">{{ app.name }}</span>
      </button>
    </div>
  </div>
</template>
