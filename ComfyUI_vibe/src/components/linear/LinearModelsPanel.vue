<script setup lang="ts">
import { ref, computed } from 'vue'

type MediaType = 'image' | 'video'
type GenerationType = 'text-to-image' | 'image-to-image' | 'text-to-video' | 'image-to-video'

interface ModelOption {
  id: string
  name: string
  provider: string
  type: MediaType
}

const mediaType = ref<MediaType>('image')
const generationType = ref<GenerationType>('text-to-image')
const prompt = ref('A beautiful sunset over a calm ocean')
const selectedAspectRatio = ref('1:1')
const runMultiplier = ref(1)
const showTypeDropdown = ref(false)

const availableModels: ModelOption[] = [
  { id: 'flux-2', name: 'flux-2', provider: 'fal-ai', type: 'image' },
  { id: 'flux-2-pro', name: 'flux-2-pro', provider: 'fal-ai', type: 'image' },
  { id: 'nano-banana-pro', name: 'nano-banana-pro', provider: 'fal-ai', type: 'image' },
  { id: 'reve-text-to-image', name: 'reve/text-to-image', provider: 'fal-ai', type: 'image' },
  { id: 'sdxl', name: 'sdxl', provider: 'fal-ai', type: 'image' },
  { id: 'sd3-medium', name: 'sd3-medium', provider: 'fal-ai', type: 'image' },
  { id: 'wan-2.1', name: 'wan-2.1', provider: 'fal-ai', type: 'video' },
  { id: 'hunyuan-video', name: 'hunyuan-video', provider: 'fal-ai', type: 'video' },
]

const selectedModelIds = ref<string[]>(['flux-2', 'flux-2-pro', 'nano-banana-pro', 'reve-text-to-image'])

const selectedModels = computed(() =>
  availableModels.filter(m => selectedModelIds.value.includes(m.id))
)

const aspectRatios = [
  { value: '1:1', label: '1:1' },
  { value: '4:3', label: '4:3' },
  { value: '3:4', label: '3:4' },
  { value: '16:9', label: '16:9' },
  { value: '9:16', label: '9:16' },
]

const generationTypes: Array<{ value: GenerationType; label: string; media: MediaType }> = [
  { value: 'text-to-image', label: 'Text To Image', media: 'image' },
  { value: 'image-to-image', label: 'Image To Image', media: 'image' },
  { value: 'text-to-video', label: 'Text To Video', media: 'video' },
  { value: 'image-to-video', label: 'Image To Video', media: 'video' },
]

const currentGenerationTypes = computed(() =>
  generationTypes.filter(t => t.media === mediaType.value)
)

const estimatedCost = computed(() => {
  const costPerModel = 0.08
  return (selectedModels.value.length * runMultiplier.value * costPerModel).toFixed(2)
})

function removeModel(modelId: string): void {
  selectedModelIds.value = selectedModelIds.value.filter(id => id !== modelId)
}

function clearAllModels(): void {
  selectedModelIds.value = []
}

function selectGenerationType(type: GenerationType): void {
  generationType.value = type
  showTypeDropdown.value = false
}

function handleRun(): void {
  console.log('Running sandbox:', {
    mediaType: mediaType.value,
    generationType: generationType.value,
    models: selectedModels.value,
    prompt: prompt.value,
    aspectRatio: selectedAspectRatio.value,
    multiplier: runMultiplier.value,
  })
}
</script>

<template>
  <div class="flex h-full w-96 flex-col border-r border-zinc-800 bg-zinc-950">
    <!-- Header -->
    <div class="flex items-center justify-between border-b border-zinc-800 px-3 py-2">
      <span class="text-sm font-medium text-zinc-200">Models</span>
    </div>

    <!-- Content -->
    <div class="flex-1 overflow-y-auto">
      <!-- Media Type Toggle -->
      <div class="border-b border-zinc-800 p-3">
        <div class="flex rounded-lg border border-zinc-800 p-0.5">
          <button
            :class="[
              'flex flex-1 items-center justify-center gap-2 rounded-md py-2 text-xs font-medium transition-colors',
              mediaType === 'image' ? 'bg-zinc-800 text-zinc-200' : 'text-zinc-500 hover:text-zinc-300'
            ]"
            @click="mediaType = 'image'; generationType = 'text-to-image'"
          >
            <i class="pi pi-image text-xs" />
            Image
          </button>
          <button
            :class="[
              'flex flex-1 items-center justify-center gap-2 rounded-md py-2 text-xs font-medium transition-colors',
              mediaType === 'video' ? 'bg-zinc-800 text-zinc-200' : 'text-zinc-500 hover:text-zinc-300'
            ]"
            @click="mediaType = 'video'; generationType = 'text-to-video'"
          >
            <i class="pi pi-video text-xs" />
            Video
          </button>
        </div>
      </div>

      <!-- Type Selector -->
      <div class="border-b border-zinc-800 p-3">
        <label class="mb-1.5 block text-[10px] font-medium uppercase tracking-wide text-zinc-500">Type</label>
        <div class="relative flex items-center gap-2">
          <button class="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-800 text-zinc-500 hover:text-zinc-300">
            <i class="pi pi-cog text-xs" />
          </button>
          <button
            class="flex h-8 flex-1 items-center justify-between rounded-lg bg-zinc-800 px-3 text-xs text-zinc-300 hover:bg-zinc-700"
            @click="showTypeDropdown = !showTypeDropdown"
          >
            <div class="flex items-center gap-2">
              <i class="pi pi-image text-xs text-zinc-500" />
              {{ generationTypes.find(t => t.value === generationType)?.label }}
            </div>
            <i class="pi pi-chevron-down text-[10px] text-zinc-500" />
          </button>
          <!-- Dropdown -->
          <div
            v-if="showTypeDropdown"
            class="absolute left-10 right-0 top-full z-10 mt-1 rounded-lg border border-zinc-800 bg-zinc-900 py-1 shadow-lg"
          >
            <button
              v-for="type in currentGenerationTypes"
              :key="type.value"
              class="flex w-full items-center gap-2 px-3 py-2 text-xs text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200"
              @click="selectGenerationType(type.value)"
            >
              <i class="pi pi-image text-xs text-zinc-500" />
              {{ type.label }}
            </button>
          </div>
        </div>
      </div>

      <!-- Model Selection -->
      <div class="border-b border-zinc-800 p-3">
        <div class="mb-1.5 flex items-center justify-between">
          <label class="text-[10px] font-medium uppercase tracking-wide text-zinc-500">Model Selection</label>
          <div class="flex items-center gap-1">
            <button class="flex h-6 w-6 items-center justify-center rounded text-zinc-500 hover:bg-zinc-800 hover:text-zinc-300">
              <i class="pi pi-th-large text-[10px]" />
            </button>
            <button class="relative flex items-center gap-1 rounded-md bg-zinc-800 px-2 py-1 text-[10px] text-zinc-400 hover:text-zinc-200">
              <i class="pi pi-th-large text-[10px]" />
              Explore Sets
              <span class="absolute -right-0.5 -top-0.5 h-1.5 w-1.5 rounded-full bg-orange-500" />
            </button>
          </div>
        </div>

        <!-- Selected Models Count -->
        <div class="mb-2 flex items-center justify-between">
          <span class="text-xs text-zinc-300">{{ selectedModels.length }} models selected</span>
          <button
            class="text-[10px] text-zinc-500 hover:text-zinc-300"
            @click="clearAllModels"
          >
            Clear
          </button>
        </div>

        <!-- Selected Models List -->
        <div class="mb-2 flex flex-col gap-1">
          <div
            v-for="model in selectedModels"
            :key="model.id"
            class="flex items-center justify-between rounded-lg bg-zinc-900/60 px-2 py-1.5"
          >
            <div class="flex items-center gap-2">
              <div class="flex h-6 w-6 shrink-0 items-center justify-center rounded-md border border-zinc-700/50 bg-zinc-800">
                <i class="pi pi-image text-xs text-zinc-400" />
              </div>
              <span class="text-[11px] text-zinc-500">
                {{ model.provider }}/<span class="text-zinc-300">{{ model.name }}</span>
              </span>
            </div>
            <button
              class="text-zinc-600 hover:text-zinc-400"
              @click="removeModel(model.id)"
            >
              <i class="pi pi-times text-[10px]" />
            </button>
          </div>
        </div>

        <!-- Add Model Search -->
        <div class="flex h-8 items-center gap-2 rounded-lg bg-zinc-800 px-3">
          <i class="pi pi-search text-xs text-zinc-500" />
          <input
            type="text"
            placeholder="Add another model"
            class="flex-1 bg-transparent text-xs text-zinc-200 outline-none placeholder:text-zinc-500"
          />
        </div>
      </div>

      <!-- Prompt -->
      <div class="border-b border-zinc-800 p-3">
        <div class="mb-1.5 flex items-center justify-between">
          <label class="text-[10px] font-medium uppercase tracking-wide text-zinc-500">
            Prompt<span class="text-zinc-400">*</span>
          </label>
          <button class="flex items-center gap-1 text-[10px] text-zinc-500 hover:text-zinc-300">
            <i class="pi pi-sparkles text-[10px]" />
            Enhance Prompt
          </button>
        </div>
        <textarea
          v-model="prompt"
          rows="4"
          class="w-full resize-y rounded-lg border border-zinc-800 bg-zinc-900/60 px-3 py-2 text-xs text-zinc-300 placeholder:text-zinc-600 focus:border-zinc-700 focus:outline-none"
          placeholder="Describe what you want to generate..."
        />
      </div>

      <!-- Aspect Ratio -->
      <div class="p-3">
        <label class="mb-1.5 block text-[10px] font-medium uppercase tracking-wide text-zinc-500">Aspect Ratio</label>
        <div class="flex flex-wrap gap-1.5">
          <button
            v-for="ratio in aspectRatios"
            :key="ratio.value"
            :class="[
              'flex items-center gap-1.5 rounded-lg border px-2.5 py-1.5 text-xs transition-colors',
              selectedAspectRatio === ratio.value
                ? 'border-zinc-600 bg-zinc-800 text-zinc-200'
                : 'border-zinc-800 text-zinc-500 hover:border-zinc-700 hover:text-zinc-300'
            ]"
            @click="selectedAspectRatio = ratio.value"
          >
            <div
              :class="[
                'flex h-3.5 w-3.5 items-center justify-center rounded-sm border',
                selectedAspectRatio === ratio.value ? 'border-zinc-500' : 'border-zinc-600'
              ]"
            >
              <div
                :class="[
                  'rounded-[1px]',
                  ratio.value === '1:1' ? 'h-2 w-2' :
                  ratio.value === '4:3' ? 'h-1.5 w-2' :
                  ratio.value === '3:4' ? 'h-2 w-1.5' :
                  ratio.value === '16:9' ? 'h-1 w-2.5' : 'h-2.5 w-1',
                  selectedAspectRatio === ratio.value ? 'bg-zinc-400' : 'bg-zinc-600'
                ]"
              />
            </div>
            {{ ratio.label }}
          </button>
        </div>
      </div>
    </div>

    <!-- Footer -->
    <div class="border-t border-zinc-800 p-3">
      <div class="mb-2 flex items-center justify-between">
        <span class="text-xs text-zinc-500">
          Will run <span class="text-zinc-300">{{ runMultiplier }}x</span> on <span class="text-zinc-300">{{ selectedModels.length }} models</span>
        </span>
        <span class="rounded bg-zinc-800 px-1.5 py-0.5 text-[10px] font-medium text-zinc-400">
          Est. ${{ estimatedCost }}
        </span>
      </div>
      <div class="flex items-center gap-2">
        <div class="relative">
          <select
            v-model="runMultiplier"
            class="h-8 appearance-none rounded-lg border border-zinc-800 bg-zinc-900 pl-2.5 pr-6 text-xs text-zinc-300 focus:border-zinc-700 focus:outline-none"
          >
            <option :value="1">1x</option>
            <option :value="2">2x</option>
            <option :value="4">4x</option>
            <option :value="8">8x</option>
          </select>
          <i class="pi pi-chevron-down pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-[10px] text-zinc-500" />
        </div>
        <button
          class="flex h-8 flex-1 items-center justify-center gap-2 rounded-lg bg-zinc-200 text-xs font-medium text-zinc-900 transition-colors hover:bg-white"
          @click="handleRun"
        >
          Run
        </button>
        <button class="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-800 text-zinc-500 hover:text-zinc-300">
          <i class="pi pi-cog text-xs" />
        </button>
        <button class="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-800 text-zinc-500 hover:text-zinc-300">
          <i class="pi pi-arrows-h text-xs" />
        </button>
      </div>
    </div>
  </div>
</template>
