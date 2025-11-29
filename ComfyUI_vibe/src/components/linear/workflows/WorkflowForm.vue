<script setup lang="ts">
import { ref, computed, watch } from 'vue'

export type InputType = 'text' | 'textarea' | 'image' | 'number' | 'slider' | 'select' | 'toggle' | 'color' | 'seed'

export interface ExposedInput {
  id: string
  nodeId: string
  inputName: string
  type: InputType
  label: string
  description?: string
  placeholder?: string
  options?: Array<{ value: string; label: string }>
  min?: number
  max?: number
  step?: number
  default?: string | number | boolean
  required?: boolean
  group?: string
}

export interface WorkflowTemplate {
  id: string
  name: string
  description: string
  thumbnail: string
  author: string
  version: string
  category: string
  exposedInputs: ExposedInput[]
}

const props = defineProps<{
  workflow: WorkflowTemplate
}>()

const emit = defineEmits<{
  back: []
  run: [values: Record<string, unknown>, images: Record<string, string>]
}>()

const formValues = ref<Record<string, string | number | boolean | null>>({})
const uploadedImages = ref<Record<string, string>>({})
const isRunning = ref(false)

// Initialize form values when workflow changes
watch(
  () => props.workflow,
  (workflow) => {
    formValues.value = {}
    uploadedImages.value = {}

    for (const input of workflow.exposedInputs) {
      if (input.default !== undefined) {
        formValues.value[input.id] = input.default
      } else if (input.type === 'seed') {
        formValues.value[input.id] = -1
      } else {
        formValues.value[input.id] = ''
      }
    }
  },
  { immediate: true }
)

const groupedInputs = computed(() => {
  const groups: Record<string, ExposedInput[]> = {}
  for (const input of props.workflow.exposedInputs) {
    const group = input.group ?? 'General'
    if (!groups[group]) groups[group] = []
    groups[group].push(input)
  }
  return groups
})

const canRun = computed(() => {
  for (const input of props.workflow.exposedInputs) {
    if (input.required) {
      if (input.type === 'image') {
        if (!uploadedImages.value[input.id]) return false
      } else {
        const value = formValues.value[input.id]
        if (value === '' || value === null || value === undefined) return false
      }
    }
  }
  return true
})

function handleImageUpload(inputId: string, event: Event): void {
  const input = event.target as HTMLInputElement
  const file = input.files?.[0]
  if (file) {
    const reader = new FileReader()
    reader.onload = (e) => {
      uploadedImages.value[inputId] = e.target?.result as string
    }
    reader.readAsDataURL(file)
  }
}

function removeImage(inputId: string): void {
  delete uploadedImages.value[inputId]
}

function randomizeSeed(inputId: string): void {
  formValues.value[inputId] = Math.floor(Math.random() * 2147483647)
}

async function runWorkflow(): Promise<void> {
  isRunning.value = true
  emit('run', { ...formValues.value }, { ...uploadedImages.value })

  // Simulate run
  await new Promise(resolve => setTimeout(resolve, 2000))
  isRunning.value = false
}
</script>

<template>
  <div class="flex h-full flex-col">
    <!-- Header -->
    <div class="flex items-center gap-2 border-b border-zinc-800 px-3 py-2">
      <button
        class="flex h-6 w-6 items-center justify-center rounded text-zinc-500 transition-colors hover:bg-zinc-800 hover:text-zinc-300"
        @click="emit('back')"
      >
        <i class="pi pi-arrow-left text-xs" />
      </button>
      <div class="flex-1">
        <p class="text-sm font-medium text-zinc-200">{{ workflow.name }}</p>
      </div>
      <span class="rounded bg-zinc-800 px-1.5 py-0.5 text-[9px] text-zinc-500">v{{ workflow.version }}</span>
    </div>

    <!-- Dynamic Form -->
    <div class="flex-1 overflow-y-auto p-3">
      <div v-for="(inputs, groupName) in groupedInputs" :key="groupName" class="mb-4">
        <p class="mb-2 text-[10px] font-medium uppercase tracking-wider text-zinc-500">{{ groupName }}</p>

        <div class="flex flex-col gap-3">
          <div v-for="input in inputs" :key="input.id">
            <label class="mb-1 flex items-center gap-1 text-xs font-medium text-zinc-300">
              {{ input.label }}
              <span v-if="input.required" class="text-red-400">*</span>
            </label>
            <p v-if="input.description" class="mb-1 text-[10px] text-zinc-500">{{ input.description }}</p>

            <!-- Image Upload -->
            <div v-if="input.type === 'image'">
              <div v-if="!uploadedImages[input.id]" class="relative">
                <input
                  type="file"
                  accept="image/*"
                  class="absolute inset-0 cursor-pointer opacity-0"
                  @change="handleImageUpload(input.id, $event)"
                />
                <div class="flex aspect-video items-center justify-center rounded-lg border-2 border-dashed border-zinc-700 bg-zinc-900 text-zinc-500 transition-colors hover:border-zinc-600 hover:text-zinc-400">
                  <div class="flex flex-col items-center">
                    <i class="pi pi-image text-2xl" />
                    <span class="mt-1 text-[10px]">Click or drop image</span>
                  </div>
                </div>
              </div>
              <div v-else class="relative">
                <img :src="uploadedImages[input.id]" class="aspect-video w-full rounded-lg object-cover" />
                <button
                  class="absolute right-2 top-2 flex h-6 w-6 items-center justify-center rounded-full bg-black/60 text-white transition-colors hover:bg-red-600"
                  @click="removeImage(input.id)"
                >
                  <i class="pi pi-times text-[10px]" />
                </button>
              </div>
            </div>

            <!-- Textarea -->
            <textarea
              v-else-if="input.type === 'textarea'"
              v-model="formValues[input.id]"
              :placeholder="input.placeholder"
              rows="3"
              class="w-full resize-none rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 text-xs text-zinc-200 outline-none placeholder:text-zinc-500 focus:border-blue-500"
            />

            <!-- Text Input -->
            <input
              v-else-if="input.type === 'text'"
              v-model="formValues[input.id]"
              type="text"
              :placeholder="input.placeholder"
              class="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 text-xs text-zinc-200 outline-none placeholder:text-zinc-500 focus:border-blue-500"
            />

            <!-- Number Input -->
            <input
              v-else-if="input.type === 'number'"
              v-model.number="formValues[input.id]"
              type="number"
              :min="input.min"
              :max="input.max"
              :step="input.step"
              class="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 text-xs text-zinc-200 outline-none focus:border-blue-500"
            />

            <!-- Seed Input -->
            <div v-else-if="input.type === 'seed'" class="flex gap-2">
              <input
                v-model.number="formValues[input.id]"
                type="number"
                placeholder="-1 for random"
                class="flex-1 rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 text-xs text-zinc-200 outline-none focus:border-blue-500"
              />
              <button
                v-tooltip.top="'Random'"
                class="flex h-9 w-9 items-center justify-center rounded-lg border border-zinc-700 bg-zinc-800 text-zinc-400 transition-colors hover:bg-zinc-700 hover:text-zinc-200"
                @click="randomizeSeed(input.id)"
              >
                <i class="pi pi-refresh text-xs" />
              </button>
            </div>

            <!-- Select -->
            <select
              v-else-if="input.type === 'select'"
              v-model="formValues[input.id]"
              class="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 text-xs text-zinc-200 outline-none focus:border-blue-500"
            >
              <option v-for="opt in input.options" :key="opt.value" :value="opt.value">
                {{ opt.label }}
              </option>
            </select>

            <!-- Slider -->
            <div v-else-if="input.type === 'slider'" class="flex items-center gap-3">
              <input
                v-model.number="formValues[input.id]"
                type="range"
                :min="input.min"
                :max="input.max"
                :step="input.step"
                class="flex-1"
              />
              <span class="w-12 text-right text-xs tabular-nums text-zinc-400">
                {{ typeof formValues[input.id] === 'number' ? formValues[input.id].toFixed(2) : formValues[input.id] }}
              </span>
            </div>

            <!-- Toggle -->
            <button
              v-else-if="input.type === 'toggle'"
              :class="[
                'relative h-6 w-11 rounded-full transition-colors',
                formValues[input.id] ? 'bg-blue-600' : 'bg-zinc-700'
              ]"
              @click="formValues[input.id] = !formValues[input.id]"
            >
              <span
                :class="[
                  'absolute top-1 h-4 w-4 rounded-full bg-white transition-transform',
                  formValues[input.id] ? 'left-6' : 'left-1'
                ]"
              />
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Run Button -->
    <div class="border-t border-zinc-800 p-3">
      <button
        :disabled="!canRun || isRunning"
        :class="[
          'flex w-full items-center justify-center gap-2 rounded-lg px-4 py-3 text-sm font-medium transition-colors',
          canRun && !isRunning
            ? 'bg-blue-600 text-white hover:bg-blue-500'
            : 'bg-zinc-800 text-zinc-500'
        ]"
        @click="runWorkflow"
      >
        <i v-if="isRunning" class="pi pi-spin pi-spinner text-sm" />
        <i v-else class="pi pi-play text-sm" />
        <span>{{ isRunning ? 'Running...' : 'Run Workflow' }}</span>
      </button>
    </div>
  </div>
</template>

<style scoped>
div::-webkit-scrollbar {
  width: 4px;
}

div::-webkit-scrollbar-track {
  background: transparent;
}

div::-webkit-scrollbar-thumb {
  background: #3f3f46;
  border-radius: 2px;
}

input[type='range'] {
  -webkit-appearance: none;
  appearance: none;
  height: 4px;
  background: #3f3f46;
  border-radius: 2px;
}

input[type='range']::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 14px;
  height: 14px;
  background: #3b82f6;
  border-radius: 50%;
  cursor: pointer;
}
</style>
