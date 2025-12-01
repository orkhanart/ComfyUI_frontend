<script setup lang="ts">
import type { StatusGroup } from '@/types/linearCanvas'
import { STATUS_GROUP_LABELS, CANVAS_LAYOUT } from '@/types/linearCanvas'

interface Props {
  id: string
  data: {
    status: StatusGroup
    count: number
  }
}

const props = defineProps<Props>()

const statusColors: Record<StatusGroup, { bg: string; text: string; dot: string }> = {
  generating: {
    bg: 'bg-blue-500/10',
    text: 'text-blue-400',
    dot: 'bg-blue-400',
  },
  queued: {
    bg: 'bg-amber-500/10',
    text: 'text-amber-400',
    dot: 'bg-amber-400',
  },
  completed: {
    bg: 'bg-emerald-500/10',
    text: 'text-emerald-400',
    dot: 'bg-emerald-400',
  },
}

// Calculate width to span the grid
const headerWidth = CANVAS_LAYOUT.COLUMNS * CANVAS_LAYOUT.FRAME_WIDTH +
  (CANVAS_LAYOUT.COLUMNS - 1) * CANVAS_LAYOUT.GAP
</script>

<template>
  <div
    class="group-header pointer-events-none flex items-center gap-2 rounded-lg px-3 py-2"
    :class="statusColors[props.data.status].bg"
    :style="{ width: `${headerWidth}px` }"
  >
    <span
      :class="[
        'h-2 w-2 rounded-full',
        statusColors[props.data.status].dot,
        props.data.status === 'generating' && 'animate-pulse',
      ]"
    />
    <span
      class="text-sm font-semibold uppercase tracking-wider"
      :class="statusColors[props.data.status].text"
    >
      {{ STATUS_GROUP_LABELS[props.data.status] }}
    </span>
    <span class="text-xs text-zinc-500">
      ({{ props.data.count }})
    </span>
  </div>
</template>

<style scoped>
.group-header {
  background: transparent;
}
</style>
