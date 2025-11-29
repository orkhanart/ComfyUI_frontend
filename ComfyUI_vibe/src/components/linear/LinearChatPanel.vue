<script setup lang="ts">
import { ref, nextTick } from 'vue'
import Button from 'primevue/button'

interface ChatMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
  images?: string[]
  isGenerating?: boolean
}

const messages = ref<ChatMessage[]>([
  {
    id: '1',
    role: 'assistant',
    content: 'Hi! I\'m your AI creative assistant. Describe what you\'d like to create and I\'ll help bring it to life.',
    timestamp: new Date(),
  }
])

const inputText = ref('')
const isGenerating = ref(false)
const chatContainer = ref<HTMLElement | null>(null)

const suggestions = [
  'A serene mountain landscape at sunset',
  'Futuristic cyberpunk city street',
  'Portrait in Renaissance painting style',
  'Abstract art with vibrant colors',
]

async function sendMessage(): Promise<void> {
  if (!inputText.value.trim() || isGenerating.value) return

  const userMessage: ChatMessage = {
    id: `msg-${Date.now()}`,
    role: 'user',
    content: inputText.value,
    timestamp: new Date(),
  }
  messages.value.push(userMessage)

  const prompt = inputText.value
  inputText.value = ''
  isGenerating.value = true

  await nextTick()
  scrollToBottom()

  // Add generating message
  const assistantMessage: ChatMessage = {
    id: `msg-${Date.now() + 1}`,
    role: 'assistant',
    content: '',
    timestamp: new Date(),
    isGenerating: true,
  }
  messages.value.push(assistantMessage)

  // Simulate generation
  await new Promise(resolve => setTimeout(resolve, 2000))

  // Update with response
  const lastMsg = messages.value[messages.value.length - 1]
  if (lastMsg) {
    lastMsg.isGenerating = false
    lastMsg.content = `I'm creating "${prompt}" for you. The image is being generated and will appear on the right panel.`
    lastMsg.images = ['/assets/card_images/workflow_01.webp']
  }

  isGenerating.value = false
  await nextTick()
  scrollToBottom()
}

function useSuggestion(suggestion: string): void {
  inputText.value = suggestion
}

function scrollToBottom(): void {
  if (chatContainer.value) {
    chatContainer.value.scrollTop = chatContainer.value.scrollHeight
  }
}

function handleKeydown(e: KeyboardEvent): void {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault()
    sendMessage()
  }
}
</script>

<template>
  <div class="flex h-full w-96 flex-col border-r border-zinc-800 bg-zinc-950">
    <!-- Header -->
    <div class="flex items-center justify-between border-b border-zinc-800 px-4 py-3">
      <div class="flex items-center gap-2">
        <i class="pi pi-sparkles text-blue-400" />
        <span class="text-sm font-medium text-zinc-200">AI Chat</span>
      </div>
      <Button
        icon="pi pi-trash"
        text
        severity="secondary"
        size="small"
        class="!h-7 !w-7"
        v-tooltip.left="'Clear chat'"
        @click="messages = [messages[0]!]"
      />
    </div>

    <!-- Messages -->
    <div ref="chatContainer" class="flex-1 overflow-y-auto p-4 space-y-4">
      <div
        v-for="message in messages"
        :key="message.id"
        :class="[
          'flex gap-3',
          message.role === 'user' ? 'flex-row-reverse' : ''
        ]"
      >
        <!-- Avatar -->
        <div
          :class="[
            'flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm',
            message.role === 'user'
              ? 'bg-blue-600 text-white'
              : 'bg-zinc-800 text-zinc-400'
          ]"
        >
          <i :class="message.role === 'user' ? 'pi pi-user' : 'pi pi-sparkles'" />
        </div>

        <!-- Content -->
        <div
          :class="[
            'max-w-[85%] rounded-2xl px-4 py-2.5',
            message.role === 'user'
              ? 'bg-blue-600 text-white'
              : 'bg-zinc-800 text-zinc-200'
          ]"
        >
          <!-- Generating indicator -->
          <div v-if="message.isGenerating" class="flex items-center gap-2">
            <div class="flex gap-1">
              <span class="h-2 w-2 animate-bounce rounded-full bg-zinc-500" style="animation-delay: 0ms" />
              <span class="h-2 w-2 animate-bounce rounded-full bg-zinc-500" style="animation-delay: 150ms" />
              <span class="h-2 w-2 animate-bounce rounded-full bg-zinc-500" style="animation-delay: 300ms" />
            </div>
            <span class="text-sm text-zinc-400">Generating...</span>
          </div>

          <!-- Message text -->
          <p v-else class="text-sm leading-relaxed">{{ message.content }}</p>

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
      <div v-if="messages.length <= 1" class="space-y-2 pt-4">
        <p class="text-xs text-zinc-500">Try these prompts:</p>
        <div class="flex flex-wrap gap-2">
          <button
            v-for="suggestion in suggestions"
            :key="suggestion"
            class="rounded-full border border-zinc-700 bg-zinc-800/50 px-3 py-1.5 text-xs text-zinc-300 transition-colors hover:bg-zinc-800 hover:text-zinc-100"
            @click="useSuggestion(suggestion)"
          >
            {{ suggestion }}
          </button>
        </div>
      </div>
    </div>

    <!-- Input -->
    <div class="border-t border-zinc-800 p-3">
      <div class="flex items-end gap-2 rounded-xl bg-zinc-800 p-2">
        <button class="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-zinc-500 transition-colors hover:bg-zinc-700 hover:text-zinc-300">
          <i class="pi pi-image text-sm" />
        </button>
        <textarea
          v-model="inputText"
          placeholder="Describe what you want to create..."
          class="max-h-32 min-h-[36px] flex-1 resize-none bg-transparent text-sm text-zinc-200 outline-none placeholder:text-zinc-500"
          rows="1"
          @keydown="handleKeydown"
        />
        <button
          :disabled="!inputText.trim() || isGenerating"
          :class="[
            'flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition-colors',
            inputText.trim() && !isGenerating
              ? 'bg-blue-600 text-white hover:bg-blue-500'
              : 'bg-zinc-700 text-zinc-500'
          ]"
          @click="sendMessage"
        >
          <i class="pi pi-send text-sm" />
        </button>
      </div>
      <p class="mt-2 text-center text-[10px] text-zinc-600">
        Press Enter to send, Shift+Enter for new line
      </p>
    </div>
  </div>
</template>

<style scoped>
textarea::-webkit-scrollbar {
  width: 4px;
}

textarea::-webkit-scrollbar-thumb {
  background: #3f3f46;
  border-radius: 2px;
}

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
