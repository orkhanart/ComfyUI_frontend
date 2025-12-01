/**
 * Linear Canvas Type Definitions
 *
 * Types for the Canvas View in Linear Mode - displays generation frames
 * on an infinite canvas (Figma-like experience).
 */

/**
 * Generation parameters for canvas display
 */
export interface GenerationParameters {
  steps: number
  cfg: number
  width: number
  height: number
  seed: number
  sampler?: string
  model?: string
}

/**
 * Generation item for canvas - matches LinearHistoryPanel structure
 */
export interface GenerationItem {
  id: string
  prompt: string
  workflow: string
  mode: string
  status: 'completed' | 'generating' | 'queued'
  progress?: number
  createdAt: Date
  images: string[]
  batchSize: number
  parameters: GenerationParameters
  sectionId?: string // Optional section assignment
}

/**
 * Data structure for generation frame VueFlow node
 */
export interface GenerationFrameData extends GenerationItem {
  // Additional canvas-specific properties can be added here
}

/**
 * Data structure for standalone asset node
 */
export interface AssetNodeData {
  id: string
  imageUrl: string
  sourceGenerationId: string
  sourceIndex: number
  prompt?: string
  seed?: number
  width: number
  height: number
  createdAt: Date
  sectionId?: string
}

/**
 * Canvas section - user-defined grouping for media
 */
export interface CanvasSection {
  id: string
  name: string
  color: string
  position: { x: number; y: number }
  width: number
  height: number
  collapsed?: boolean
}

/**
 * Section header node data
 */
export interface SectionHeaderData {
  id: string
  name: string
  color: string
  width: number
  height: number
  itemCount: number
  collapsed?: boolean
}

/**
 * Canvas viewport state
 */
export interface CanvasViewport {
  x: number
  y: number
  zoom: number
}

/**
 * View mode for the history panel
 */
export type HistoryViewMode = 'timeline' | 'canvas'

/**
 * Section color presets
 */
export const SECTION_COLORS = [
  { name: 'Blue', value: '#3b82f6' },
  { name: 'Purple', value: '#8b5cf6' },
  { name: 'Pink', value: '#ec4899' },
  { name: 'Red', value: '#ef4444' },
  { name: 'Orange', value: '#f97316' },
  { name: 'Yellow', value: '#eab308' },
  { name: 'Green', value: '#22c55e' },
  { name: 'Teal', value: '#14b8a6' },
  { name: 'Cyan', value: '#06b6d4' },
  { name: 'Gray', value: '#6b7280' },
] as const

/**
 * Layout constants for canvas
 */
export const CANVAS_LAYOUT = {
  FRAME_WIDTH: 320,
  FRAME_HEIGHT: 280,
  GAP: 24,
  COLUMNS: 3,
  START_X: 50,
  START_Y: 50,
  // Section settings
  SECTION_MIN_WIDTH: 400,
  SECTION_MIN_HEIGHT: 200,
  SECTION_DEFAULT_WIDTH: 800,
  SECTION_DEFAULT_HEIGHT: 400,
  SECTION_HEADER_HEIGHT: 48,
  SECTION_PADDING: 16,
  SECTION_GAP: 40,
  // Random placement bounds
  RANDOM_AREA_WIDTH: 1200,
  RANDOM_AREA_HEIGHT: 800,
  MIN_SPACING: 100,
} as const

/**
 * Calculate position for an item within a section
 */
export function calculatePositionInSection(
  index: number,
  sectionWidth: number
): { x: number; y: number } {
  const itemWidth = CANVAS_LAYOUT.FRAME_WIDTH + CANVAS_LAYOUT.GAP
  const cols = Math.max(1, Math.floor((sectionWidth - CANVAS_LAYOUT.SECTION_PADDING * 2) / itemWidth))
  const col = index % cols
  const row = Math.floor(index / cols)

  return {
    x: CANVAS_LAYOUT.SECTION_PADDING + col * itemWidth,
    y: CANVAS_LAYOUT.SECTION_HEADER_HEIGHT + CANVAS_LAYOUT.SECTION_PADDING + row * (CANVAS_LAYOUT.FRAME_HEIGHT + CANVAS_LAYOUT.GAP),
  }
}

/**
 * Calculate the required height for a section based on item count
 */
export function calculateSectionHeight(
  itemCount: number,
  sectionWidth: number
): number {
  if (itemCount === 0) {
    return CANVAS_LAYOUT.SECTION_MIN_HEIGHT
  }

  const itemWidth = CANVAS_LAYOUT.FRAME_WIDTH + CANVAS_LAYOUT.GAP
  const cols = Math.max(1, Math.floor((sectionWidth - CANVAS_LAYOUT.SECTION_PADDING * 2) / itemWidth))
  const rows = Math.ceil(itemCount / cols)

  return Math.max(
    CANVAS_LAYOUT.SECTION_MIN_HEIGHT,
    CANVAS_LAYOUT.SECTION_HEADER_HEIGHT +
      CANVAS_LAYOUT.SECTION_PADDING * 2 +
      rows * CANVAS_LAYOUT.FRAME_HEIGHT +
      (rows - 1) * CANVAS_LAYOUT.GAP
  )
}

/**
 * Create a new section with default values
 */
export function createSection(
  name: string,
  position: { x: number; y: number },
  colorIndex = 0
): CanvasSection {
  return {
    id: `section-${Date.now()}`,
    name,
    color: SECTION_COLORS[colorIndex % SECTION_COLORS.length].value,
    position,
    width: CANVAS_LAYOUT.SECTION_DEFAULT_WIDTH,
    height: CANVAS_LAYOUT.SECTION_DEFAULT_HEIGHT,
    collapsed: false,
  }
}

/**
 * Calculate grid position for loose items (not in a section)
 */
export function calculateGridPosition(index: number): { x: number; y: number } {
  const col = index % CANVAS_LAYOUT.COLUMNS
  const row = Math.floor(index / CANVAS_LAYOUT.COLUMNS)

  return {
    x: CANVAS_LAYOUT.START_X + col * (CANVAS_LAYOUT.FRAME_WIDTH + CANVAS_LAYOUT.GAP),
    y: CANVAS_LAYOUT.START_Y + row * (CANVAS_LAYOUT.FRAME_HEIGHT + CANVAS_LAYOUT.GAP),
  }
}
