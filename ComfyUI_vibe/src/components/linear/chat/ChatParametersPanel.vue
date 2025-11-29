<script setup lang="ts">
import { ref } from 'vue'

const steps = ref(30)
const cfgScale = ref(7.5)
const width = ref(1024)
const height = ref(1024)
const seed = ref(-1)

function randomizeSeed(): void {
  seed.value = Math.floor(Math.random() * 2147483647)
}
</script>

<template>
  <div class="rounded-lg border border-zinc-800 bg-zinc-900/60 p-3">
    <div class="grid grid-cols-2 gap-2.5">
      <div>
        <label class="mb-1 block text-[10px] font-medium uppercase tracking-wide text-zinc-500">Steps</label>
        <input
          v-model.number="steps"
          type="number"
          class="h-8 w-full rounded-lg border border-zinc-800 bg-zinc-800 px-2.5 text-xs text-zinc-300 outline-none focus:border-zinc-700"
        />
      </div>
      <div>
        <label class="mb-1 block text-[10px] font-medium uppercase tracking-wide text-zinc-500">CFG Scale</label>
        <input
          v-model.number="cfgScale"
          type="number"
          step="0.5"
          class="h-8 w-full rounded-lg border border-zinc-800 bg-zinc-800 px-2.5 text-xs text-zinc-300 outline-none focus:border-zinc-700"
        />
      </div>
      <div>
        <label class="mb-1 block text-[10px] font-medium uppercase tracking-wide text-zinc-500">Width</label>
        <input
          v-model.number="width"
          type="number"
          step="64"
          class="h-8 w-full rounded-lg border border-zinc-800 bg-zinc-800 px-2.5 text-xs text-zinc-300 outline-none focus:border-zinc-700"
        />
      </div>
      <div>
        <label class="mb-1 block text-[10px] font-medium uppercase tracking-wide text-zinc-500">Height</label>
        <input
          v-model.number="height"
          type="number"
          step="64"
          class="h-8 w-full rounded-lg border border-zinc-800 bg-zinc-800 px-2.5 text-xs text-zinc-300 outline-none focus:border-zinc-700"
        />
      </div>
    </div>
    <div class="mt-2.5">
      <label class="mb-1 block text-[10px] font-medium uppercase tracking-wide text-zinc-500">Seed</label>
      <div class="flex gap-1.5">
        <input
          v-model.number="seed"
          type="number"
          class="h-8 flex-1 rounded-lg border border-zinc-800 bg-zinc-800 px-2.5 text-xs text-zinc-300 outline-none focus:border-zinc-700"
        />
        <button
          v-tooltip.top="'Random seed'"
          class="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-800 text-xs text-zinc-500 transition-colors hover:bg-zinc-700 hover:text-zinc-300"
          @click="randomizeSeed"
        >
          <i class="pi pi-refresh text-xs" />
        </button>
      </div>
    </div>
  </div>
</template>
