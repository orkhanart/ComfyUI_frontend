<script setup lang="ts">
import { ref, nextTick, watch } from 'vue'

export interface ChatMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
  images?: string[]
  isGenerating?: boolean
}

const props = defineProps<{
  messages: ChatMessage[]
  suggestions?: string[]
}>()

const emit = defineEmits<{
  useSuggestion: [suggestion: string]
}>()

const chatContainer = ref<HTMLElement | null>(null)

function scrollToBottom(): void {
  if (chatContainer.value) {
    chatContainer.value.scrollTop = chatContainer.value.scrollHeight
  }
}

watch(
  () => props.messages.length,
  async () => {
    await nextTick()
    scrollToBottom()
  }
)

defineExpose({ scrollToBottom })
</script>

<template>
  <div ref="chatContainer" class="flex-1 space-y-3 overflow-y-auto p-3">
    <div
      v-for="message in messages"
      :key="message.id"
      :class="[
        'flex gap-2.5',
        message.role === 'user' ? 'flex-row-reverse' : ''
      ]"
    >
      <!-- Avatar -->
      <div
        :class="[
          'flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-xs',
          message.role === 'user'
            ? 'bg-zinc-700 text-zinc-300'
            : 'bg-zinc-800 text-zinc-400'
        ]"
      >
        <i :class="message.role === 'user' ? 'pi pi-user' : 'pi pi-sparkles'" />
      </div>

      <!-- Content -->
      <div
        :class="[
          'max-w-[85%] rounded-lg px-3 py-2',
          message.role === 'user'
            ? 'bg-zinc-700 text-zinc-200'
            : 'bg-zinc-800/60 text-zinc-300'
        ]"
      >
        <!-- Generating indicator -->
        <div v-if="message.isGenerating" class="flex items-center gap-2">
          <div class="flex gap-1">
            <span class="h-1.5 w-1.5 animate-bounce rounded-full bg-zinc-500" style="animation-delay: 0ms" />
            <span class="h-1.5 w-1.5 animate-bounce rounded-full bg-zinc-500" style="animation-delay: 150ms" />
            <span class="h-1.5 w-1.5 animate-bounce rounded-full bg-zinc-500" style="animation-delay: 300ms" />
          </div>
          <span class="text-xs text-zinc-500">Generating...</span>
        </div>

        <!-- Message text -->
        <p v-else class="text-xs leading-relaxed">{{ message.content }}</p>

        <!-- Generated images -->
        <div v-if="message.images?.length" class="mt-2 grid gap-2">
          <img
            v-for="(img, idx) in message.images"
            :key="idx"
            :src="img"
            class="rounded-lg"
            alt="Generated image"
          />
        </div>
      </div>
    </div>

    <!-- Suggestions (show only at start) -->
    <div v-if="messages.length <= 1 && suggestions?.length" class="space-y-2 pt-3">
      <p class="text-[10px] font-medium uppercase tracking-wide text-zinc-500">Try these prompts</p>
      <div class="flex flex-wrap gap-1.5">
        <button
          v-for="suggestion in suggestions"
          :key="suggestion"
          class="rounded-lg border border-zinc-800 bg-zinc-900/60 px-2.5 py-1.5 text-[11px] text-zinc-400 transition-colors hover:bg-zinc-800 hover:text-zinc-300"
          @click="emit('useSuggestion', suggestion)"
        >
          {{ suggestion }}
        </button>
      </div>
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
</style>
