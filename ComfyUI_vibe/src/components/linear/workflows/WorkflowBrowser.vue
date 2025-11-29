<script setup lang="ts">
import { ref, computed } from 'vue'

export type WorkflowSource = 'templates' | 'my-workflows' | 'shared' | 'libraries'

export interface WorkflowItem {
  id: string
  name: string
  description: string
  thumbnail: string
  author: string
  version: string
  category: string
  downloads?: number
  tags: string[]
  updatedAt?: Date
  sharedBy?: string
  isFolder?: boolean
  parentId?: string | null
}

const props = defineProps<{
  workflows: WorkflowItem[]
  source: WorkflowSource
  currentFolderId?: string | null
}>()

const emit = defineEmits<{
  select: [workflow: WorkflowItem]
  import: []
  'navigate-folder': [folderId: string | null]
  'create-folder': []
}>()

const searchQuery = ref('')
const selectedCategory = ref<string | null>(null)
const viewMode = ref<'grid' | 'list'>('grid')
const sortBy = ref<'popular' | 'newest' | 'name'>('popular')

const categories = computed(() => {
  const cats = new Set(props.workflows.filter(w => !w.isFolder).map(w => w.category))
  return Array.from(cats)
})

const filteredWorkflows = computed(() => {
  let result = [...props.workflows]

  // Filter by current folder for my-workflows
  if (props.source === 'my-workflows') {
    result = result.filter(w => w.parentId === props.currentFolderId)
  }

  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    result = result.filter(w =>
      w.name.toLowerCase().includes(query) ||
      w.description.toLowerCase().includes(query) ||
      w.tags.some(t => t.toLowerCase().includes(query))
    )
  }

  if (selectedCategory.value) {
    result = result.filter(w => w.category === selectedCategory.value || w.isFolder)
  }

  // Sort - folders first, then by selected sort
  const folders = result.filter(w => w.isFolder)
  const workflows = result.filter(w => !w.isFolder)

  switch (sortBy.value) {
    case 'popular':
      workflows.sort((a, b) => (b.downloads ?? 0) - (a.downloads ?? 0))
      break
    case 'newest':
      workflows.sort((a, b) => {
        const dateA = a.updatedAt?.getTime() ?? 0
        const dateB = b.updatedAt?.getTime() ?? 0
        return dateB - dateA
      })
      break
    case 'name':
      workflows.sort((a, b) => a.name.localeCompare(b.name))
      break
  }

  folders.sort((a, b) => a.name.localeCompare(b.name))
  return [...folders, ...workflows]
})

function formatDownloads(count?: number): string {
  if (!count) return '0'
  if (count >= 1000) return `${(count / 1000).toFixed(1)}k`
  return count.toString()
}

function handleItemClick(item: WorkflowItem): void {
  if (item.isFolder) {
    emit('navigate-folder', item.id)
  } else {
    emit('select', item)
  }
}
</script>

<template>
  <div class="flex h-full flex-col">
    <!-- Search + Actions -->
    <div class="border-b border-zinc-800 p-3">
      <div class="flex items-center gap-2">
        <div class="flex h-8 flex-1 items-center gap-2 rounded-lg bg-zinc-800 px-3">
          <i class="pi pi-search text-xs text-zinc-500" />
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search workflows..."
            class="flex-1 bg-transparent text-xs text-zinc-200 outline-none placeholder:text-zinc-500"
          />
          <button
            v-if="searchQuery"
            class="text-zinc-500 hover:text-zinc-300"
            @click="searchQuery = ''"
          >
            <i class="pi pi-times text-[10px]" />
          </button>
        </div>
        <button
          v-tooltip.bottom="'Import JSON'"
          class="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-zinc-800 text-zinc-400 transition-colors hover:bg-zinc-700 hover:text-zinc-200"
          @click="emit('import')"
        >
          <i class="pi pi-plus text-sm" />
        </button>
      </div>
    </div>

    <!-- Breadcrumb for My Workflows -->
    <div
      v-if="source === 'my-workflows' && currentFolderId"
      class="flex items-center gap-1 border-b border-zinc-800 px-3 py-2"
    >
      <button
        class="flex items-center gap-1 text-[10px] text-zinc-400 hover:text-zinc-200"
        @click="emit('navigate-folder', null)"
      >
        <i class="pi pi-home text-[10px]" />
        <span>My Workflows</span>
      </button>
      <i class="pi pi-chevron-right text-[8px] text-zinc-600" />
      <span class="text-[10px] text-zinc-300">Current Folder</span>
    </div>

    <!-- Filter Bar -->
    <div class="flex items-center justify-between border-b border-zinc-800 px-3 py-2">
      <select
        v-model="selectedCategory"
        class="h-6 rounded bg-zinc-800 px-2 text-[10px] text-zinc-300 outline-none"
      >
        <option :value="null">All Categories</option>
        <option v-for="cat in categories" :key="cat" :value="cat">{{ cat }}</option>
      </select>

      <div class="flex items-center gap-1">
        <select
          v-model="sortBy"
          class="h-6 rounded bg-zinc-800 px-2 text-[10px] text-zinc-300 outline-none"
        >
          <option value="popular">Popular</option>
          <option value="newest">Newest</option>
          <option value="name">Name</option>
        </select>

        <div class="flex rounded bg-zinc-800">
          <button
            v-tooltip.bottom="'Grid'"
            :class="[
              'flex h-6 w-6 items-center justify-center rounded-l transition-colors',
              viewMode === 'grid' ? 'bg-zinc-700 text-zinc-200' : 'text-zinc-500 hover:text-zinc-300'
            ]"
            @click="viewMode = 'grid'"
          >
            <i class="pi pi-th-large text-[10px]" />
          </button>
          <button
            v-tooltip.bottom="'List'"
            :class="[
              'flex h-6 w-6 items-center justify-center rounded-r transition-colors',
              viewMode === 'list' ? 'bg-zinc-700 text-zinc-200' : 'text-zinc-500 hover:text-zinc-300'
            ]"
            @click="viewMode = 'list'"
          >
            <i class="pi pi-list text-[10px]" />
          </button>
        </div>
      </div>
    </div>

    <!-- Create Folder Button for My Workflows -->
    <button
      v-if="source === 'my-workflows'"
      class="mx-3 mt-3 flex items-center gap-2 rounded-lg border border-dashed border-zinc-700 px-3 py-2 text-xs text-zinc-500 transition-colors hover:border-zinc-600 hover:text-zinc-400"
      @click="emit('create-folder')"
    >
      <i class="pi pi-folder-plus text-sm" />
      <span>New Folder</span>
    </button>

    <!-- Workflow List -->
    <div class="flex-1 overflow-y-auto p-3">
      <!-- Grid View -->
      <div v-if="viewMode === 'grid'" class="flex flex-col gap-2">
        <button
          v-for="wf in filteredWorkflows"
          :key="wf.id"
          class="group overflow-hidden rounded-lg border border-zinc-800 bg-zinc-900/50 text-left transition-colors hover:border-zinc-700"
          @click="handleItemClick(wf)"
        >
          <!-- Folder -->
          <template v-if="wf.isFolder">
            <div class="flex aspect-square w-full items-center justify-center bg-zinc-800/50">
              <i class="pi pi-folder text-4xl text-zinc-500" />
            </div>
            <div class="p-2">
              <p class="text-xs font-medium text-zinc-200">{{ wf.name }}</p>
            </div>
          </template>

          <!-- Workflow -->
          <template v-else>
            <div class="aspect-square w-full overflow-hidden bg-zinc-800">
              <img
                :src="wf.thumbnail"
                :alt="wf.name"
                class="h-full w-full object-cover transition-transform group-hover:scale-105"
              />
            </div>
            <div class="p-2">
              <p class="text-xs font-medium text-zinc-200">{{ wf.name }}</p>
              <p class="mt-0.5 line-clamp-1 text-[10px] text-zinc-500">{{ wf.description }}</p>
              <div class="mt-1 flex items-center justify-between">
                <span class="text-[9px] text-zinc-600">
                  {{ wf.sharedBy ? `Shared by ${wf.sharedBy}` : wf.author }}
                </span>
                <span v-if="wf.downloads" class="text-[9px] text-zinc-600">
                  <i class="pi pi-download mr-0.5 text-[8px]" />
                  {{ formatDownloads(wf.downloads) }}
                </span>
              </div>
            </div>
          </template>
        </button>
      </div>

      <!-- List View -->
      <div v-else class="flex flex-col gap-2">
        <button
          v-for="wf in filteredWorkflows"
          :key="wf.id"
          class="group flex gap-3 rounded-lg border border-zinc-800 bg-zinc-900/50 p-2 text-left transition-colors hover:border-zinc-700 hover:bg-zinc-900"
          @click="handleItemClick(wf)"
        >
          <!-- Folder Icon -->
          <div
            v-if="wf.isFolder"
            class="flex h-12 w-12 shrink-0 items-center justify-center rounded bg-zinc-800"
          >
            <i class="pi pi-folder text-xl text-zinc-500" />
          </div>
          <!-- Workflow Thumbnail -->
          <div v-else class="h-12 w-12 shrink-0 overflow-hidden rounded bg-zinc-800">
            <img :src="wf.thumbnail" :alt="wf.name" class="h-full w-full object-cover" />
          </div>
          <div class="flex flex-1 flex-col justify-center">
            <p class="text-xs font-medium text-zinc-200">{{ wf.name }}</p>
            <div class="flex items-center gap-2">
              <span class="text-[9px] text-zinc-600">
                {{ wf.sharedBy ? `Shared by ${wf.sharedBy}` : wf.author }}
              </span>
              <template v-if="wf.downloads">
                <span class="text-zinc-700">•</span>
                <span class="text-[9px] text-zinc-600">
                  <i class="pi pi-download mr-0.5 text-[8px]" />
                  {{ formatDownloads(wf.downloads) }}
                </span>
              </template>
            </div>
          </div>
          <i class="pi pi-chevron-right self-center text-[10px] text-zinc-600 opacity-0 transition-opacity group-hover:opacity-100" />
        </button>
      </div>

      <!-- Empty State -->
      <div v-if="filteredWorkflows.length === 0" class="flex flex-col items-center py-8 text-zinc-500">
        <i class="pi pi-search mb-2 text-2xl" />
        <span class="text-xs">No workflows found</span>
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
