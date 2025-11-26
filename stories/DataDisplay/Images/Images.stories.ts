import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref } from 'vue'

/**
 * Image components for displaying workflow outputs, model previews, and media content.
 *
 * ## Components
 * - **ComfyImage**: Basic image with error fallback placeholder
 * - **LazyImage**: Intersection observer-based lazy loading with skeleton
 * - **Thumbnails**: Specialized preview components for different media types
 *
 * ## Thumbnail Types
 * - **DefaultThumbnail**: Standard image with hover zoom effect
 * - **AudioThumbnail**: Audio player with waveform background
 * - **HoverDissolveThumbnail**: Crossfade between two images on hover
 * - **CompareSliderThumbnail**: Before/after slider comparison
 *
 * ## Usage
 * ```vue
 * <ComfyImage src="/path/to/image.jpg" alt="Description" />
 * <LazyImage src="/path/to/image.jpg" alt="Lazy loaded" />
 * <DefaultThumbnail src="/path/to/image.jpg" :hover-zoom="8" :is-hovered="isHovered" />
 * ```
 */
const meta: Meta = {
  title: 'Data Display/Images',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Image components for displaying workflow outputs, model previews, and media thumbnails with lazy loading and error handling.'
      }
    }
  }
}

export default meta
type Story = StoryObj<typeof meta>

// Sample images
const placeholderImage =
  'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="400" viewBox="0 0 400 400"%3E%3Crect fill="%234a5568" width="400" height="400"/%3E%3Ctext fill="%23a0aec0" font-family="system-ui" font-size="24" x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle"%3EImage%3C/text%3E%3C/svg%3E'

const placeholderImageA =
  'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="400" viewBox="0 0 400 400"%3E%3Crect fill="%233b82f6" width="400" height="400"/%3E%3Ctext fill="%23ffffff" font-family="system-ui" font-size="24" x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle"%3EBefore%3C/text%3E%3C/svg%3E'

const placeholderImageB =
  'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="400" viewBox="0 0 400 400"%3E%3Crect fill="%2322c55e" width="400" height="400"/%3E%3Ctext fill="%23ffffff" font-family="system-ui" font-size="24" x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle"%3EAfter%3C/text%3E%3C/svg%3E'

/**
 * ComfyImage - Basic image with error fallback
 */
export const Default: Story = {
  render: () => ({
    setup() {
      return { placeholderImage }
    },
    template: `
      <div style="width: 300px; height: 300px; border: 1px solid #e5e5e5; border-radius: 8px; overflow: hidden;">
        <img
          :src="placeholderImage"
          alt="Sample workflow output"
          style="width: 100%; height: 100%; object-fit: cover;"
        />
      </div>
    `
  })
}

/**
 * Image with contain vs cover modes
 */
export const ContainMode: Story = {
  render: () => ({
    setup() {
      return { placeholderImage }
    },
    template: `
      <div style="display: flex; gap: 24px;">
        <div style="text-align: center;">
          <div style="width: 200px; height: 200px; border: 1px solid #e5e5e5; border-radius: 8px; overflow: hidden; background: #f5f5f5;">
            <img
              :src="placeholderImage"
              alt="Cover mode"
              style="width: 100%; height: 100%; object-fit: cover;"
            />
          </div>
          <p style="margin-top: 8px; font-size: 12px; color: #666;">cover (default)</p>
        </div>

        <div style="text-align: center;">
          <div style="width: 200px; height: 200px; border: 1px solid #e5e5e5; border-radius: 8px; overflow: hidden; background: #f5f5f5; display: flex; align-items: center; justify-content: center;">
            <img
              :src="placeholderImage"
              alt="Contain mode"
              style="max-width: 100%; max-height: 100%; object-fit: contain;"
            />
          </div>
          <p style="margin-top: 8px; font-size: 12px; color: #666;">contain</p>
        </div>
      </div>
    `
  })
}

/**
 * Error state with broken image fallback
 */
export const ErrorState: Story = {
  render: () => ({
    setup() {
      const imageBroken = ref(false)
      const handleError = () => {
        imageBroken.value = true
      }
      return { placeholderImage, imageBroken, handleError }
    },
    template: `
      <div style="display: flex; gap: 24px;">
        <div style="text-align: center;">
          <div style="width: 200px; height: 200px; border: 1px solid #e5e5e5; border-radius: 8px; overflow: hidden;">
            <img
              :src="placeholderImage"
              alt="Valid image"
              style="width: 100%; height: 100%; object-fit: cover;"
            />
          </div>
          <p style="margin-top: 8px; font-size: 12px; color: #666;">Valid image</p>
        </div>

        <div style="text-align: center;">
          <div style="width: 200px; height: 200px; border: 1px solid #e5e5e5; border-radius: 8px; overflow: hidden; background: #f5f5f5;">
            <div v-if="imageBroken" style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100%; color: #999;">
              <i class="pi pi-image" style="font-size: 48px; margin-bottom: 8px;"></i>
              <span style="font-size: 12px;">Image failed to load</span>
            </div>
            <img
              v-else
              src="/broken-image-url.jpg"
              alt="Broken image"
              style="width: 100%; height: 100%; object-fit: cover;"
              @error="handleError"
            />
          </div>
          <p style="margin-top: 8px; font-size: 12px; color: #666;">Broken image (fallback)</p>
        </div>
      </div>
    `
  })
}

/**
 * LazyImage - Intersection observer-based loading
 */
export const LazyLoading: Story = {
  render: () => ({
    setup() {
      return { placeholderImage, placeholderImageA, placeholderImageB }
    },
    template: `
      <div>
        <p style="margin-bottom: 16px; color: #666; font-size: 14px;">
          LazyImage uses IntersectionObserver to load images only when they enter the viewport.
          Scroll down to see lazy loading in action.
        </p>
        <div style="height: 300px; overflow-y: auto; border: 1px solid #e5e5e5; border-radius: 8px; padding: 16px;">
          <div style="display: flex; flex-direction: column; gap: 400px;">
            <div style="width: 250px; height: 250px; border-radius: 8px; overflow: hidden;">
              <img :src="placeholderImage" alt="First image" style="width: 100%; height: 100%; object-fit: cover;" />
            </div>
            <div style="width: 250px; height: 250px; border-radius: 8px; overflow: hidden;">
              <img :src="placeholderImageA" alt="Second image" style="width: 100%; height: 100%; object-fit: cover;" />
            </div>
            <div style="width: 250px; height: 250px; border-radius: 8px; overflow: hidden;">
              <img :src="placeholderImageB" alt="Third image" style="width: 100%; height: 100%; object-fit: cover;" />
            </div>
          </div>
        </div>
      </div>
    `
  })
}

/**
 * DefaultThumbnail - hover zoom effect demo
 */
export const DefaultThumbnailDemo: Story = {
  name: 'Default Thumbnail',
  render: () => ({
    setup() {
      const isHovered = ref(false)
      const scale = ref(1)
      return { isHovered, scale, placeholderImage }
    },
    template: `
      <div style="width: 250px;">
        <div
          style="overflow: hidden; border-radius: 8px; cursor: pointer;"
          @mouseenter="isHovered = true; scale = 1.08"
          @mouseleave="isHovered = false; scale = 1"
        >
          <img
            :src="placeholderImage"
            alt="Workflow preview"
            :style="{
              width: '100%',
              height: '200px',
              objectFit: 'cover',
              transform: 'scale(' + scale + ')',
              transition: 'transform 0.3s ease-out'
            }"
          />
        </div>
        <p style="margin-top: 8px; font-size: 12px; color: #666; text-align: center;">
          Hover to see zoom effect
        </p>
      </div>
    `
  })
}

/**
 * AudioThumbnail - audio player preview
 */
export const AudioThumbnailDemo: Story = {
  name: 'Audio Thumbnail',
  render: () => ({
    template: `
      <div style="width: 300px;">
        <div style="background: repeating-linear-gradient(45deg, #f0f0f0, #f0f0f0 10px, #e0e0e0 10px, #e0e0e0 20px); border-radius: 8px; padding: 24px; display: flex; align-items: center; justify-content: center;">
          <div style="width: 100%; background: white; border-radius: 4px; padding: 8px;">
            <div style="display: flex; align-items: center; gap: 8px;">
              <button style="width: 32px; height: 32px; border-radius: 50%; border: none; background: #3b82f6; color: white; cursor: pointer; display: flex; align-items: center; justify-content: center;">
                <i class="pi pi-play" style="font-size: 12px;"></i>
              </button>
              <div style="flex: 1; height: 4px; background: #e5e5e5; border-radius: 2px;">
                <div style="width: 30%; height: 100%; background: #3b82f6; border-radius: 2px;"></div>
              </div>
              <span style="font-size: 11px; color: #666;">0:45</span>
            </div>
          </div>
        </div>
        <p style="margin-top: 8px; font-size: 12px; color: #666; text-align: center;">
          Audio player with background pattern
        </p>
      </div>
    `
  })
}

/**
 * HoverDissolveThumbnail - crossfade effect demo
 */
export const HoverDissolveDemo: Story = {
  name: 'Hover Dissolve Thumbnail',
  render: () => ({
    setup() {
      const opacity = ref(0)
      return { opacity, placeholderImageA, placeholderImageB }
    },
    template: `
      <div style="width: 250px;">
        <div
          style="position: relative; border-radius: 8px; overflow: hidden; cursor: pointer;"
          @mouseenter="opacity = 1"
          @mouseleave="opacity = 0"
        >
          <img
            :src="placeholderImageA"
            alt="Base image"
            style="width: 100%; height: 200px; object-fit: cover; display: block;"
          />
          <img
            :src="placeholderImageB"
            alt="Overlay image"
            :style="{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '200px',
              objectFit: 'cover',
              opacity: opacity,
              transition: 'opacity 0.3s ease-out'
            }"
          />
        </div>
        <p style="margin-top: 8px; font-size: 12px; color: #666; text-align: center;">
          Hover to dissolve to overlay image
        </p>
      </div>
    `
  })
}

/**
 * CompareSliderThumbnail - before/after slider demo
 */
export const CompareSliderDemo: Story = {
  name: 'Compare Slider Thumbnail',
  render: () => ({
    setup() {
      const sliderPosition = ref(50)
      const handleMouseMove = (e: MouseEvent) => {
        const rect = (e.currentTarget as HTMLElement).getBoundingClientRect()
        const x = e.clientX - rect.left
        sliderPosition.value = Math.max(
          0,
          Math.min(100, (x / rect.width) * 100)
        )
      }
      return {
        sliderPosition,
        handleMouseMove,
        placeholderImageA,
        placeholderImageB
      }
    },
    template: `
      <div style="width: 300px;">
        <div
          style="position: relative; border-radius: 8px; overflow: hidden; cursor: ew-resize; user-select: none;"
          @mousemove="handleMouseMove"
        >
          <img
            :src="placeholderImageB"
            alt="After"
            style="width: 100%; height: 200px; object-fit: cover; display: block;"
          />
          <div
            :style="{
              position: 'absolute',
              top: 0,
              left: 0,
              width: sliderPosition + '%',
              height: '100%',
              overflow: 'hidden'
            }"
          >
            <img
              :src="placeholderImageA"
              alt="Before"
              style="width: 300px; height: 200px; object-fit: cover;"
            />
          </div>
          <div
            :style="{
              position: 'absolute',
              top: 0,
              left: sliderPosition + '%',
              width: '2px',
              height: '100%',
              background: 'white',
              boxShadow: '0 0 4px rgba(0,0,0,0.5)'
            }"
          >
            <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 24px; height: 24px; background: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; box-shadow: 0 2px 4px rgba(0,0,0,0.2);">
              <span style="font-size: 10px; color: #666;">⟷</span>
            </div>
          </div>
        </div>
        <p style="margin-top: 8px; font-size: 12px; color: #666; text-align: center;">
          Move mouse to compare images
        </p>
      </div>
    `
  })
}

/**
 * All thumbnail types
 */
export const AllThumbnailTypes: Story = {
  render: () => ({
    setup() {
      const hoveredIndex = ref<number | null>(null)
      const scales = ref([1, 1, 1, 1])
      const dissolveOpacity = ref(0)
      const sliderPos = ref(50)

      const handleSliderMove = (e: MouseEvent) => {
        if (hoveredIndex.value !== 3) return
        const rect = (e.currentTarget as HTMLElement).getBoundingClientRect()
        const x = e.clientX - rect.left
        sliderPos.value = Math.max(0, Math.min(100, (x / rect.width) * 100))
      }

      return {
        hoveredIndex,
        scales,
        dissolveOpacity,
        sliderPos,
        handleSliderMove,
        placeholderImage,
        placeholderImageA,
        placeholderImageB
      }
    },
    template: `
      <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 24px; max-width: 600px;">
        <div style="text-align: center;">
          <div
            style="overflow: hidden; border-radius: 8px; cursor: pointer;"
            @mouseenter="hoveredIndex = 0; scales[0] = 1.08"
            @mouseleave="hoveredIndex = null; scales[0] = 1"
          >
            <img
              :src="placeholderImage"
              alt="Default"
              :style="{ width: '100%', height: '150px', objectFit: 'cover', transform: 'scale(' + scales[0] + ')', transition: 'transform 0.3s' }"
            />
          </div>
          <p style="margin-top: 8px; font-weight: 600; color: #1a1a1a;">Default</p>
          <p style="font-size: 12px; color: #666;">Zoom on hover</p>
        </div>

        <div style="text-align: center;">
          <div style="background: repeating-linear-gradient(45deg, #f0f0f0, #f0f0f0 10px, #e0e0e0 10px, #e0e0e0 20px); border-radius: 8px; height: 150px; display: flex; align-items: center; justify-content: center; padding: 16px;">
            <div style="width: 100%; background: white; border-radius: 4px; padding: 8px;">
              <div style="display: flex; align-items: center; gap: 8px;">
                <button style="width: 28px; height: 28px; border-radius: 50%; border: none; background: #3b82f6; color: white; cursor: pointer;">▶</button>
                <div style="flex: 1; height: 4px; background: #e5e5e5; border-radius: 2px;"></div>
              </div>
            </div>
          </div>
          <p style="margin-top: 8px; font-weight: 600; color: #1a1a1a;">Audio</p>
          <p style="font-size: 12px; color: #666;">Audio player</p>
        </div>

        <div style="text-align: center;">
          <div
            style="position: relative; border-radius: 8px; overflow: hidden; cursor: pointer;"
            @mouseenter="hoveredIndex = 2; dissolveOpacity = 1"
            @mouseleave="hoveredIndex = null; dissolveOpacity = 0"
          >
            <img :src="placeholderImageA" alt="Base" style="width: 100%; height: 150px; object-fit: cover;" />
            <img
              :src="placeholderImageB"
              alt="Overlay"
              :style="{ position: 'absolute', top: 0, left: 0, width: '100%', height: '150px', objectFit: 'cover', opacity: dissolveOpacity, transition: 'opacity 0.3s' }"
            />
          </div>
          <p style="margin-top: 8px; font-weight: 600; color: #1a1a1a;">Hover Dissolve</p>
          <p style="font-size: 12px; color: #666;">Crossfade on hover</p>
        </div>

        <div style="text-align: center;">
          <div
            style="position: relative; border-radius: 8px; overflow: hidden; cursor: ew-resize;"
            @mouseenter="hoveredIndex = 3"
            @mouseleave="hoveredIndex = null; sliderPos = 50"
            @mousemove="handleSliderMove"
          >
            <img :src="placeholderImageB" alt="After" style="width: 100%; height: 150px; object-fit: cover;" />
            <div :style="{ position: 'absolute', top: 0, left: 0, width: sliderPos + '%', height: '100%', overflow: 'hidden' }">
              <img :src="placeholderImageA" alt="Before" style="width: 250px; height: 150px; object-fit: cover;" />
            </div>
            <div :style="{ position: 'absolute', top: 0, left: sliderPos + '%', width: '2px', height: '100%', background: 'white' }"></div>
          </div>
          <p style="margin-top: 8px; font-weight: 600; color: #1a1a1a;">Compare Slider</p>
          <p style="font-size: 12px; color: #666;">Interactive slider</p>
        </div>
      </div>
    `
  })
}

/**
 * ComfyUI use cases
 */
export const ComfyUIUseCases: Story = {
  render: () => ({
    setup() {
      const hoveredIndex = ref<number | null>(null)
      const sliderPos = ref(50)
      const handleSliderMove = (e: MouseEvent) => {
        const rect = (e.currentTarget as HTMLElement).getBoundingClientRect()
        sliderPos.value = Math.max(
          0,
          Math.min(100, ((e.clientX - rect.left) / rect.width) * 100)
        )
      }
      return {
        hoveredIndex,
        sliderPos,
        handleSliderMove,
        placeholderImage,
        placeholderImageA,
        placeholderImageB
      }
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 32px;">
        <div>
          <h3 style="margin-bottom: 16px; font-weight: 600; color: #1a1a1a;">Workflow Output Gallery</h3>
          <div style="display: flex; gap: 12px;">
            <div
              v-for="i in 4"
              :key="i"
              style="width: 120px; overflow: hidden; border-radius: 8px; cursor: pointer;"
              @mouseenter="hoveredIndex = i"
              @mouseleave="hoveredIndex = null"
            >
              <img
                :src="placeholderImage"
                :alt="'Output ' + i"
                :style="{
                  width: '100%',
                  height: '120px',
                  objectFit: 'cover',
                  transform: hoveredIndex === i ? 'scale(1.06)' : 'scale(1)',
                  transition: 'transform 0.3s'
                }"
              />
            </div>
          </div>
        </div>

        <div>
          <h3 style="margin-bottom: 16px; font-weight: 600; color: #1a1a1a;">Before/After Comparison</h3>
          <div
            style="width: 300px; position: relative; border-radius: 8px; overflow: hidden; cursor: ew-resize;"
            @mousemove="handleSliderMove"
          >
            <img :src="placeholderImageB" alt="After" style="width: 100%; height: 200px; object-fit: cover;" />
            <div :style="{ position: 'absolute', top: 0, left: 0, width: sliderPos + '%', height: '100%', overflow: 'hidden' }">
              <img :src="placeholderImageA" alt="Before" style="width: 300px; height: 200px; object-fit: cover;" />
            </div>
            <div :style="{ position: 'absolute', top: 0, left: sliderPos + '%', width: '2px', height: '100%', background: 'white', boxShadow: '0 0 4px rgba(0,0,0,0.5)' }"></div>
          </div>
          <p style="margin-top: 8px; font-size: 12px; color: #666;">Input (left) vs Generated (right)</p>
        </div>
      </div>
    `
  })
}

/**
 * Dark theme preview
 */
export const DarkTheme: Story = {
  render: () => ({
    setup() {
      const isHovered = ref(false)
      return { isHovered, placeholderImage }
    },
    template: `
      <div class="dark-theme" style="background: #0a0a0a; padding: 24px; border-radius: 8px;">
        <div style="display: flex; gap: 24px;">
          <div style="text-align: center;">
            <div style="width: 180px; height: 180px; border: 1px solid #333; border-radius: 8px; overflow: hidden;">
              <img :src="placeholderImage" alt="Dark theme image" style="width: 100%; height: 100%; object-fit: cover;" />
            </div>
            <p style="margin-top: 8px; font-size: 12px; color: #888;">ComfyImage</p>
          </div>

          <div style="text-align: center;">
            <div
              style="width: 180px; overflow: hidden; border-radius: 8px; border: 1px solid #333; cursor: pointer;"
              @mouseenter="isHovered = true"
              @mouseleave="isHovered = false"
            >
              <img
                :src="placeholderImage"
                alt="Thumbnail"
                :style="{
                  width: '100%',
                  height: '180px',
                  objectFit: 'cover',
                  transform: isHovered ? 'scale(1.08)' : 'scale(1)',
                  transition: 'transform 0.3s'
                }"
              />
            </div>
            <p style="margin-top: 8px; font-size: 12px; color: #888;">DefaultThumbnail</p>
          </div>
        </div>
      </div>
    `
  })
}
