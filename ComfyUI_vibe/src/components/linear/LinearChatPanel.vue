<script setup lang="ts">
import { ref, computed } from 'vue'
import Popover from 'primevue/popover'
import ChatPromptBar, { type Workflow, type AgentMode } from './chat/ChatPromptBar.vue'
import ChatParametersPanel from './chat/ChatParametersPanel.vue'
import ChatMessageList, { type ChatMessage } from './chat/ChatMessageList.vue'
import ChatInputArea from './chat/ChatInputArea.vue'

interface ChatSession {
  id: string
  name: string
  lastMessage: string
  timestamp: Date
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
const chatSelectorRef = ref()

// Chat sessions
const chatSessions = ref<ChatSession[]>([
  {
    id: 'chat-1',
    name: 'Landscape Generation',
    lastMessage: 'A serene mountain landscape...',
    timestamp: new Date(Date.now() - 3600000),
  },
  {
    id: 'chat-2',
    name: 'Portrait Style',
    lastMessage: 'Portrait in Renaissance style...',
    timestamp: new Date(Date.now() - 86400000),
  },
])
const currentChatId = ref('chat-1')

const currentChat = computed(() =>
  chatSessions.value.find(c => c.id === currentChatId.value)
)

// Workflows
const workflows = ref<Workflow[]>([
  { id: 'txt2img', name: 'Text to Image', description: 'Generate images from text prompts', icon: 'pi-image', category: 'image' },
  { id: 'img2img', name: 'Image to Image', description: 'Transform images with prompts', icon: 'pi-images', category: 'image' },
  { id: 'inpaint', name: 'Inpainting', description: 'Edit specific parts of images', icon: 'pi-pencil', category: 'image' },
  { id: 'upscale', name: 'Upscale', description: 'Enhance image resolution', icon: 'pi-expand', category: 'image' },
  { id: 'txt2vid', name: 'Text to Video', description: 'Generate videos from prompts', icon: 'pi-video', category: 'video' },
  { id: 'img2vid', name: 'Image to Video', description: 'Animate still images', icon: 'pi-play', category: 'video' },
])
const selectedWorkflowId = ref('txt2img')

// Agent modes
const agentModes = ref<AgentMode[]>([
  { id: 'creative', name: 'Creative', description: 'Free-form creative generation', icon: 'pi-sparkles' },
  { id: 'precise', name: 'Precise', description: 'Follow prompts exactly', icon: 'pi-bullseye' },
  { id: 'iterate', name: 'Iterate', description: 'Refine and improve results', icon: 'pi-refresh' },
  { id: 'agent', name: 'Agent', description: 'Multi-step autonomous workflow', icon: 'pi-bolt' },
])
const selectedModeId = ref('creative')

// Parameters panel
const showParameters = ref(false)

const suggestions = [
  'A serene mountain landscape at sunset',
  'Futuristic cyberpunk city street',
  'Portrait in Renaissance painting style',
  'Abstract art with vibrant colors',
]

function toggleChatSelector(event: Event): void {
  chatSelectorRef.value?.toggle(event)
}

function selectChat(chatId: string): void {
  currentChatId.value = chatId
  chatSelectorRef.value?.hide()
}

function createNewChat(): void {
  const newChat: ChatSession = {
    id: `chat-${Date.now()}`,
    name: 'New Chat',
    lastMessage: '',
    timestamp: new Date(),
  }
  chatSessions.value.unshift(newChat)
  currentChatId.value = newChat.id
  messages.value = [messages.value[0]!]
  chatSelectorRef.value?.hide()
}

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
}

function useSuggestion(suggestion: string): void {
  inputText.value = suggestion
}

function stopGeneration(): void {
  isGenerating.value = false
}
</script>

<template>
  <div class="flex h-full w-96 flex-col border-r border-zinc-800 bg-zinc-950">
    <!-- Header -->
    <div class="flex items-center justify-between border-b border-zinc-800 px-3 py-2">
      <button
        class="flex items-center gap-2 rounded-lg px-2 py-1 text-sm font-medium text-zinc-200 transition-colors hover:bg-zinc-800"
        @click="toggleChatSelector"
      >
        {{ currentChat?.name ?? 'AI Chat' }}
        <i class="pi pi-chevron-down text-[10px] text-zinc-500" />
      </button>
      <div class="flex items-center gap-0.5">
        <button
          v-tooltip.bottom="'New chat'"
          class="flex h-7 w-7 items-center justify-center rounded-lg text-zinc-500 transition-colors hover:bg-zinc-800 hover:text-zinc-300"
          @click="createNewChat"
        >
          <i class="pi pi-plus text-xs" />
        </button>
        <button
          v-tooltip.bottom="'Clear chat'"
          class="flex h-7 w-7 items-center justify-center rounded-lg text-zinc-500 transition-colors hover:bg-zinc-800 hover:text-zinc-300"
          @click="messages = [messages[0]!]"
        >
          <i class="pi pi-trash text-xs" />
        </button>
      </div>
    </div>

    <!-- Chat Selector Popover -->
    <Popover ref="chatSelectorRef" class="w-64">
      <div class="flex flex-col">
        <div class="border-b border-zinc-800 p-2">
          <button
            class="flex w-full items-center gap-2 rounded-lg px-2.5 py-2 text-left text-xs text-zinc-400 transition-colors hover:bg-zinc-800 hover:text-zinc-200"
            @click="createNewChat"
          >
            <i class="pi pi-plus text-[10px]" />
            <span>New Chat</span>
          </button>
        </div>
        <div class="max-h-64 overflow-y-auto p-2">
          <p class="mb-1.5 px-2 text-[10px] font-medium uppercase tracking-wide text-zinc-500">Recent Chats</p>
          <button
            v-for="chat in chatSessions"
            :key="chat.id"
            :class="[
              'flex w-full flex-col rounded-lg px-2.5 py-2 text-left transition-colors',
              chat.id === currentChatId
                ? 'bg-zinc-800 text-zinc-200'
                : 'text-zinc-400 hover:bg-zinc-800/50 hover:text-zinc-300'
            ]"
            @click="selectChat(chat.id)"
          >
            <span class="text-xs font-medium">{{ chat.name }}</span>
            <span class="truncate text-[10px] text-zinc-500">{{ chat.lastMessage || 'No messages' }}</span>
          </button>
        </div>
      </div>
    </Popover>

    <!-- Messages -->
    <ChatMessageList
      :messages="messages"
      :suggestions="suggestions"
      @use-suggestion="useSuggestion"
    />

    <!-- Input Area -->
    <div class="border-t border-zinc-800 p-3">
      <!-- Action Bar Above Input -->
      <ChatPromptBar
        v-model:selected-workflow-id="selectedWorkflowId"
        v-model:selected-mode-id="selectedModeId"
        v-model:show-parameters="showParameters"
        :workflows="workflows"
        :agent-modes="agentModes"
        class="mb-2"
      />

      <!-- Parameters Panel (collapsible) -->
      <ChatParametersPanel v-if="showParameters" class="mb-2" />

      <!-- Main Input Area -->
      <ChatInputArea
        v-model="inputText"
        :is-generating="isGenerating"
        @send="sendMessage"
        @stop="stopGeneration"
      />

      <p class="mt-2 text-center text-[10px] text-zinc-600">
        Press Enter to send, Shift+Enter for new line
      </p>
    </div>
  </div>
</template>
