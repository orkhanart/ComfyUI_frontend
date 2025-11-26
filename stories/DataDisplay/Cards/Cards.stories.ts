import type { Meta, StoryObj } from '@storybook/vue3-vite'

import CardBottom from '@/components/card/CardBottom.vue'
import CardContainer from '@/components/card/CardContainer.vue'
import CardDescription from '@/components/card/CardDescription.vue'
import CardTitle from '@/components/card/CardTitle.vue'
import CardTop from '@/components/card/CardTop.vue'

/**
 * Cards are flexible containers used to display content like workflow previews,
 * model thumbnails, and template galleries. The card system consists of composable
 * components that can be combined to create various layouts.
 *
 * ## Components
 * - **CardContainer**: Main wrapper with size, variant, and styling options
 * - **CardTop**: Image area with overlay slots for badges/buttons
 * - **CardBottom**: Content area for title and description
 * - **CardTitle**: Styled title text
 * - **CardDescription**: Muted description text with line clamping
 */
const meta: Meta<typeof CardContainer> = {
  title: 'Data Display/Cards',
  component: CardContainer,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Flexible card containers for displaying workflow previews, model thumbnails, and template galleries.'
      }
    }
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['mini', 'compact', 'regular', 'portrait', 'tall'],
      description: 'Card size preset with predefined aspect ratio'
    },
    variant: {
      control: 'select',
      options: ['default', 'ghost', 'outline'],
      description: 'Visual style variant'
    },
    rounded: {
      control: 'select',
      options: ['none', 'md', 'lg', 'xl'],
      description: 'Border radius'
    },
    hasBorder: {
      control: 'boolean',
      description: 'Show border'
    },
    hasBackground: {
      control: 'boolean',
      description: 'Show background color'
    },
    hasShadow: {
      control: 'boolean',
      description: 'Show shadow'
    },
    hasCursor: {
      control: 'boolean',
      description: 'Show pointer cursor on hover'
    }
  }
}

export default meta
type Story = StoryObj<typeof meta>

// Sample placeholder image
const placeholderImage =
  'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="400" viewBox="0 0 400 400"%3E%3Crect fill="%234a5568" width="400" height="400"/%3E%3Ctext fill="%23a0aec0" font-family="system-ui" font-size="24" x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle"%3EImage%3C/text%3E%3C/svg%3E'

/**
 * Default card with image and content
 */
export const Default: Story = {
  render: () => ({
    components: {
      CardContainer,
      CardTop,
      CardBottom,
      CardTitle,
      CardDescription
    },
    setup() {
      return { placeholderImage }
    },
    template: `
      <CardContainer size="regular" style="width: 256px;">
        <template #top>
          <CardTop>
            <img
              :src="placeholderImage"
              alt="Workflow preview"
              style="width: 100%; height: 100%; object-fit: cover;"
            />
          </CardTop>
        </template>
        <template #bottom>
          <CardBottom>
            <div style="padding: 12px;">
              <CardTitle>Workflow Name</CardTitle>
              <CardDescription>A sample workflow for image generation</CardDescription>
            </div>
          </CardBottom>
        </template>
      </CardContainer>
    `
  })
}

/**
 * All available size presets
 */
export const AllSizes: Story = {
  render: () => ({
    components: {
      CardContainer,
      CardTop,
      CardBottom,
      CardTitle,
      CardDescription
    },
    setup() {
      return { placeholderImage }
    },
    template: `
      <div style="display: flex; gap: 24px; align-items: flex-start; flex-wrap: wrap;">
        <div style="text-align: center;">
          <CardContainer size="mini" style="width: 100px;">
            <template #top>
              <CardTop>
                <img :src="placeholderImage" alt="Mini" style="width: 100%; height: 100%; object-fit: cover;" />
              </CardTop>
            </template>
            <template #bottom>
              <CardBottom>
                <div style="padding: 8px;">
                  <CardTitle>Mini</CardTitle>
                </div>
              </CardBottom>
            </template>
          </CardContainer>
          <p style="margin-top: 8px; font-size: 12px; color: #666;">mini (100×120)</p>
        </div>

        <div style="text-align: center;">
          <CardContainer size="compact" style="width: 180px;">
            <template #top>
              <CardTop>
                <img :src="placeholderImage" alt="Compact" style="width: 100%; height: 100%; object-fit: cover;" />
              </CardTop>
            </template>
            <template #bottom>
              <CardBottom>
                <div style="padding: 10px;">
                  <CardTitle>Compact</CardTitle>
                </div>
              </CardBottom>
            </template>
          </CardContainer>
          <p style="margin-top: 8px; font-size: 12px; color: #666;">compact (240×311)</p>
        </div>

        <div style="text-align: center;">
          <CardContainer size="regular" style="width: 200px;">
            <template #top>
              <CardTop>
                <img :src="placeholderImage" alt="Regular" style="width: 100%; height: 100%; object-fit: cover;" />
              </CardTop>
            </template>
            <template #bottom>
              <CardBottom>
                <div style="padding: 12px;">
                  <CardTitle>Regular</CardTitle>
                </div>
              </CardBottom>
            </template>
          </CardContainer>
          <p style="margin-top: 8px; font-size: 12px; color: #666;">regular (256×308)</p>
        </div>

        <div style="text-align: center;">
          <CardContainer size="portrait" style="width: 200px;">
            <template #top>
              <CardTop>
                <img :src="placeholderImage" alt="Portrait" style="width: 100%; height: 100%; object-fit: cover;" />
              </CardTop>
            </template>
            <template #bottom>
              <CardBottom>
                <div style="padding: 12px;">
                  <CardTitle>Portrait</CardTitle>
                </div>
              </CardBottom>
            </template>
          </CardContainer>
          <p style="margin-top: 8px; font-size: 12px; color: #666;">portrait (256×325)</p>
        </div>

        <div style="text-align: center;">
          <CardContainer size="tall" style="width: 200px;">
            <template #top>
              <CardTop>
                <img :src="placeholderImage" alt="Tall" style="width: 100%; height: 100%; object-fit: cover;" />
              </CardTop>
            </template>
            <template #bottom>
              <CardBottom>
                <div style="padding: 12px;">
                  <CardTitle>Tall</CardTitle>
                </div>
              </CardBottom>
            </template>
          </CardContainer>
          <p style="margin-top: 8px; font-size: 12px; color: #666;">tall (256×353)</p>
        </div>
      </div>
    `
  })
}

/**
 * Visual style variants
 */
export const AllVariants: Story = {
  render: () => ({
    components: {
      CardContainer,
      CardTop,
      CardBottom,
      CardTitle,
      CardDescription
    },
    setup() {
      return { placeholderImage }
    },
    template: `
      <div style="display: flex; gap: 24px; align-items: flex-start;">
        <div style="text-align: center;">
          <CardContainer variant="default" size="compact" style="width: 180px;">
            <template #top>
              <CardTop>
                <img :src="placeholderImage" alt="Default" style="width: 100%; height: 100%; object-fit: cover;" />
              </CardTop>
            </template>
            <template #bottom>
              <CardBottom>
                <div style="padding: 12px;">
                  <CardTitle>Default</CardTitle>
                  <CardDescription>Background, border, shadow</CardDescription>
                </div>
              </CardBottom>
            </template>
          </CardContainer>
        </div>

        <div style="text-align: center;">
          <CardContainer variant="ghost" size="compact" style="width: 180px;">
            <template #top>
              <CardTop>
                <img :src="placeholderImage" alt="Ghost" style="width: 100%; height: 100%; object-fit: cover;" />
              </CardTop>
            </template>
            <template #bottom>
              <CardBottom>
                <div style="padding: 12px;">
                  <CardTitle>Ghost</CardTitle>
                  <CardDescription>Minimal, no background</CardDescription>
                </div>
              </CardBottom>
            </template>
          </CardContainer>
        </div>

        <div style="text-align: center;">
          <CardContainer variant="outline" size="compact" style="width: 180px;">
            <template #top>
              <CardTop>
                <img :src="placeholderImage" alt="Outline" style="width: 100%; height: 100%; object-fit: cover;" />
              </CardTop>
            </template>
            <template #bottom>
              <CardBottom>
                <div style="padding: 12px;">
                  <CardTitle>Outline</CardTitle>
                  <CardDescription>Border only, hover effect</CardDescription>
                </div>
              </CardBottom>
            </template>
          </CardContainer>
        </div>
      </div>
    `
  })
}

/**
 * Border radius options
 */
export const RoundedVariants: Story = {
  render: () => ({
    components: { CardContainer, CardTop },
    setup() {
      return { placeholderImage }
    },
    template: `
      <div style="display: flex; gap: 24px; align-items: flex-start;">
        <div style="text-align: center;">
          <CardContainer rounded="none" size="mini" style="width: 100px;">
            <template #top>
              <CardTop>
                <img :src="placeholderImage" alt="None" style="width: 100%; height: 100%; object-fit: cover;" />
              </CardTop>
            </template>
          </CardContainer>
          <p style="margin-top: 8px; font-size: 12px; color: #666;">none</p>
        </div>

        <div style="text-align: center;">
          <CardContainer rounded="md" size="mini" style="width: 100px;">
            <template #top>
              <CardTop>
                <img :src="placeholderImage" alt="Medium" style="width: 100%; height: 100%; object-fit: cover;" />
              </CardTop>
            </template>
          </CardContainer>
          <p style="margin-top: 8px; font-size: 12px; color: #666;">md (default)</p>
        </div>

        <div style="text-align: center;">
          <CardContainer rounded="lg" size="mini" style="width: 100px;">
            <template #top>
              <CardTop>
                <img :src="placeholderImage" alt="Large" style="width: 100%; height: 100%; object-fit: cover;" />
              </CardTop>
            </template>
          </CardContainer>
          <p style="margin-top: 8px; font-size: 12px; color: #666;">lg</p>
        </div>

        <div style="text-align: center;">
          <CardContainer rounded="xl" size="mini" style="width: 100px;">
            <template #top>
              <CardTop>
                <img :src="placeholderImage" alt="Extra Large" style="width: 100%; height: 100%; object-fit: cover;" />
              </CardTop>
            </template>
          </CardContainer>
          <p style="margin-top: 8px; font-size: 12px; color: #666;">xl</p>
        </div>
      </div>
    `
  })
}

/**
 * CardTop with overlay slots for badges, buttons, and indicators
 */
export const WithOverlays: Story = {
  render: () => ({
    components: { CardContainer, CardTop, CardBottom, CardTitle },
    setup() {
      return { placeholderImage }
    },
    template: `
      <div style="display: flex; gap: 24px;">
        <CardContainer size="regular" style="width: 220px;">
          <template #top>
            <CardTop>
              <img :src="placeholderImage" alt="With overlays" style="width: 100%; height: 100%; object-fit: cover;" />
              <template #top-left>
                <span style="background: #3b82f6; color: white; padding: 4px 8px; border-radius: 4px; font-size: 12px;">New</span>
              </template>
              <template #top-right>
                <button style="background: rgba(0,0,0,0.5); color: white; border: none; padding: 6px; border-radius: 4px; cursor: pointer;">
                  <i class="pi pi-heart" style="font-size: 16px;"></i>
                </button>
              </template>
              <template #bottom-left>
                <span style="background: rgba(0,0,0,0.7); color: white; padding: 4px 8px; border-radius: 4px; font-size: 11px;">SD 1.5</span>
              </template>
              <template #bottom-right>
                <span style="background: rgba(0,0,0,0.7); color: white; padding: 4px 8px; border-radius: 4px; font-size: 11px;">512×512</span>
              </template>
            </CardTop>
          </template>
          <template #bottom>
            <CardBottom>
              <div style="padding: 12px;">
                <CardTitle>With Overlay Slots</CardTitle>
              </div>
            </CardBottom>
          </template>
        </CardContainer>

        <CardContainer size="regular" style="width: 220px;">
          <template #top>
            <CardTop>
              <img :src="placeholderImage" alt="Center overlays" style="width: 100%; height: 100%; object-fit: cover;" />
              <template #center-left>
                <button style="background: rgba(0,0,0,0.6); color: white; border: none; padding: 8px; border-radius: 50%; cursor: pointer;">
                  <i class="pi pi-chevron-left" style="font-size: 20px;"></i>
                </button>
              </template>
              <template #center-right>
                <button style="background: rgba(0,0,0,0.6); color: white; border: none; padding: 8px; border-radius: 50%; cursor: pointer;">
                  <i class="pi pi-chevron-right" style="font-size: 20px;"></i>
                </button>
              </template>
            </CardTop>
          </template>
          <template #bottom>
            <CardBottom>
              <div style="padding: 12px;">
                <CardTitle>Center Navigation</CardTitle>
              </div>
            </CardBottom>
          </template>
        </CardContainer>
      </div>
    `
  })
}

/**
 * CardTop aspect ratio options
 */
export const TopRatios: Story = {
  render: () => ({
    components: { CardContainer, CardTop, CardBottom, CardTitle },
    setup() {
      return { placeholderImage }
    },
    template: `
      <div style="display: flex; gap: 24px; align-items: flex-start;">
        <div style="text-align: center;">
          <CardContainer size="regular" style="width: 200px;">
            <template #top>
              <CardTop ratio="square">
                <img :src="placeholderImage" alt="Square" style="width: 100%; height: 100%; object-fit: cover;" />
              </CardTop>
            </template>
            <template #bottom>
              <CardBottom>
                <div style="padding: 12px;">
                  <CardTitle>Square (1:1)</CardTitle>
                </div>
              </CardBottom>
            </template>
          </CardContainer>
        </div>

        <div style="text-align: center;">
          <CardContainer size="regular" style="width: 280px;">
            <template #top>
              <CardTop ratio="landscape">
                <img :src="placeholderImage" alt="Landscape" style="width: 100%; height: 100%; object-fit: cover;" />
              </CardTop>
            </template>
            <template #bottom>
              <CardBottom>
                <div style="padding: 12px;">
                  <CardTitle>Landscape (16:9)</CardTitle>
                </div>
              </CardBottom>
            </template>
          </CardContainer>
        </div>
      </div>
    `
  })
}

/**
 * Card grid layout example
 */
export const CardGrid: Story = {
  render: () => ({
    components: {
      CardContainer,
      CardTop,
      CardBottom,
      CardTitle,
      CardDescription
    },
    setup() {
      const cards = [
        { id: 1, runs: 12 },
        { id: 2, runs: 24 },
        { id: 3, runs: 36 },
        { id: 4, runs: 48 },
        { id: 5, runs: 60 },
        { id: 6, runs: 72 }
      ]
      return { cards, placeholderImage }
    },
    template: `
      <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; max-width: 700px;">
        <CardContainer v-for="card in cards" :key="card.id" size="compact" style="width: 100%;">
          <template #top>
            <CardTop>
              <img :src="placeholderImage" :alt="'Card ' + card.id" style="width: 100%; height: 100%; object-fit: cover;" />
              <template #top-right>
                <span style="background: rgba(0,0,0,0.7); color: white; padding: 2px 6px; border-radius: 4px; font-size: 10px;">{{ card.runs }} runs</span>
              </template>
            </CardTop>
          </template>
          <template #bottom>
            <CardBottom>
              <div style="padding: 10px;">
                <CardTitle>Workflow {{ card.id }}</CardTitle>
                <CardDescription>Sample workflow description text</CardDescription>
              </div>
            </CardBottom>
          </template>
        </CardContainer>
      </div>
    `
  })
}

/**
 * ComfyUI use cases: workflow browser, model gallery
 */
export const ComfyUIUseCases: Story = {
  render: () => ({
    components: {
      CardContainer,
      CardTop,
      CardBottom,
      CardTitle,
      CardDescription
    },
    setup() {
      return { placeholderImage }
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 32px;">
        <div>
          <h3 style="margin-bottom: 16px; font-weight: 600; color: #1a1a1a;">Workflow Browser</h3>
          <div style="display: flex; gap: 16px;">
            <CardContainer size="regular" style="width: 200px;">
              <template #top>
                <CardTop>
                  <img :src="placeholderImage" alt="Workflow" style="width: 100%; height: 100%; object-fit: cover;" />
                  <template #top-left>
                    <span style="background: #22c55e; color: white; padding: 2px 6px; border-radius: 4px; font-size: 10px;">Verified</span>
                  </template>
                </CardTop>
              </template>
              <template #bottom>
                <CardBottom>
                  <div style="padding: 12px;">
                    <CardTitle>SDXL Portrait</CardTitle>
                    <CardDescription>High quality portrait generation workflow</CardDescription>
                  </div>
                </CardBottom>
              </template>
            </CardContainer>

            <CardContainer size="regular" style="width: 200px;">
              <template #top>
                <CardTop>
                  <img :src="placeholderImage" alt="Workflow" style="width: 100%; height: 100%; object-fit: cover;" />
                  <template #bottom-right>
                    <span style="background: rgba(0,0,0,0.7); color: white; padding: 2px 6px; border-radius: 4px; font-size: 10px;">SDXL</span>
                  </template>
                </CardTop>
              </template>
              <template #bottom>
                <CardBottom>
                  <div style="padding: 12px;">
                    <CardTitle>ControlNet Canny</CardTitle>
                    <CardDescription>Edge detection guided generation</CardDescription>
                  </div>
                </CardBottom>
              </template>
            </CardContainer>
          </div>
        </div>

        <div>
          <h3 style="margin-bottom: 16px; font-weight: 600; color: #1a1a1a;">Model Gallery</h3>
          <div style="display: flex; gap: 12px;">
            <CardContainer size="mini" variant="ghost" style="width: 100px;">
              <template #top>
                <CardTop>
                  <img :src="placeholderImage" alt="Model" style="width: 100%; height: 100%; object-fit: cover;" />
                </CardTop>
              </template>
              <template #bottom>
                <CardBottom>
                  <div style="padding: 6px; text-align: center;">
                    <CardTitle>SD 1.5</CardTitle>
                  </div>
                </CardBottom>
              </template>
            </CardContainer>

            <CardContainer size="mini" variant="ghost" style="width: 100px;">
              <template #top>
                <CardTop>
                  <img :src="placeholderImage" alt="Model" style="width: 100%; height: 100%; object-fit: cover;" />
                </CardTop>
              </template>
              <template #bottom>
                <CardBottom>
                  <div style="padding: 6px; text-align: center;">
                    <CardTitle>SDXL</CardTitle>
                  </div>
                </CardBottom>
              </template>
            </CardContainer>

            <CardContainer size="mini" variant="ghost" style="width: 100px;">
              <template #top>
                <CardTop>
                  <img :src="placeholderImage" alt="Model" style="width: 100%; height: 100%; object-fit: cover;" />
                </CardTop>
              </template>
              <template #bottom>
                <CardBottom>
                  <div style="padding: 6px; text-align: center;">
                    <CardTitle>Flux</CardTitle>
                  </div>
                </CardBottom>
              </template>
            </CardContainer>
          </div>
        </div>
      </div>
    `
  })
}

/**
 * Interactive card with hover effects and click handling
 */
export const Interactive: Story = {
  render: () => ({
    components: {
      CardContainer,
      CardTop,
      CardBottom,
      CardTitle,
      CardDescription
    },
    setup() {
      const handleClick = (name: string) => {
        console.log(`Card clicked: ${name}`)
        alert(`Selected: ${name}`)
      }
      return { handleClick, placeholderImage }
    },
    template: `
      <div style="display: flex; gap: 16px;">
        <CardContainer
          size="regular"
          style="width: 200px; transition: transform 0.2s, box-shadow 0.2s;"
          @click="handleClick('Workflow A')"
          @mouseenter="$event.currentTarget.style.transform = 'translateY(-4px)'; $event.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.15)'"
          @mouseleave="$event.currentTarget.style.transform = ''; $event.currentTarget.style.boxShadow = ''"
        >
          <template #top>
            <CardTop>
              <img :src="placeholderImage" alt="Interactive" style="width: 100%; height: 100%; object-fit: cover;" />
            </CardTop>
          </template>
          <template #bottom>
            <CardBottom>
              <div style="padding: 12px;">
                <CardTitle>Hover & Click Me</CardTitle>
                <CardDescription>Interactive card with hover lift effect</CardDescription>
              </div>
            </CardBottom>
          </template>
        </CardContainer>
      </div>
    `
  })
}

/**
 * Dark theme preview
 */
export const DarkTheme: Story = {
  render: () => ({
    components: {
      CardContainer,
      CardTop,
      CardBottom,
      CardTitle,
      CardDescription
    },
    setup() {
      return { placeholderImage }
    },
    template: `
      <div class="dark-theme" style="background: #0a0a0a; padding: 24px; border-radius: 8px;">
        <div style="display: flex; gap: 16px;">
          <CardContainer size="regular" style="width: 200px;">
            <template #top>
              <CardTop>
                <img :src="placeholderImage" alt="Dark" style="width: 100%; height: 100%; object-fit: cover;" />
                <template #top-left>
                  <span style="background: #3b82f6; color: white; padding: 2px 6px; border-radius: 4px; font-size: 10px;">Featured</span>
                </template>
              </CardTop>
            </template>
            <template #bottom>
              <CardBottom>
                <div style="padding: 12px;">
                  <CardTitle>Dark Theme Card</CardTitle>
                  <CardDescription>Cards adapt to dark theme automatically</CardDescription>
                </div>
              </CardBottom>
            </template>
          </CardContainer>

          <CardContainer size="regular" variant="outline" style="width: 200px;">
            <template #top>
              <CardTop>
                <img :src="placeholderImage" alt="Outline Dark" style="width: 100%; height: 100%; object-fit: cover;" />
              </CardTop>
            </template>
            <template #bottom>
              <CardBottom>
                <div style="padding: 12px;">
                  <CardTitle>Outline Variant</CardTitle>
                  <CardDescription>Border style in dark mode</CardDescription>
                </div>
              </CardBottom>
            </template>
          </CardContainer>
        </div>
      </div>
    `
  })
}
