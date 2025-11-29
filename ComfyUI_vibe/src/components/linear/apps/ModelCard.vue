<script setup lang="ts">
export interface ModelItem {
  id: string
  name: string
  type: 'Image' | 'Video' | 'Video + Audio' | 'Audio' | 'Text' | '3D'
  icon?: string
  provider?: string
}

defineProps<{
  model: ModelItem
}>()

const emit = defineEmits<{
  select: [model: ModelItem]
}>()

const typeIcons: Record<string, string> = {
  'Image': 'pi-image',
  'Video': 'pi-video',
  'Video + Audio': 'pi-video',
  'Audio': 'pi-volume-up',
  'Text': 'pi-align-left',
  '3D': 'pi-box',
}
</script>

<template>
  <button
    class="flex items-center gap-2 rounded-lg bg-zinc-900/60 px-2 py-1.5 transition-colors hover:bg-zinc-800"
    @click="emit('select', model)"
  >
    <div
      class="flex h-6 w-6 shrink-0 items-center justify-center rounded-md border border-zinc-700/50 bg-zinc-800"
    >
      <i
        v-if="model.icon"
        :class="['pi', model.icon, 'text-xs text-zinc-400']"
      />
      <i
        v-else
        :class="['pi', typeIcons[model.type] ?? 'pi-star', 'text-xs text-zinc-400']"
      />
    </div>
    <span class="truncate text-[11px] text-zinc-400">{{ model.name }}</span>
  </button>
</template>
