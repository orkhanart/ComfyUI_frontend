import type { Meta, StoryObj } from '@storybook/vue3-vite'

const meta = {
  title: 'Data Display/VirtualGrid',
  parameters: { layout: 'fullscreen' },
  render: () => ({
    template: `<div style="padding: 3rem; max-width: 900px; margin: 0 auto; font-family: system-ui, -apple-system, sans-serif; line-height: 1.6;">
      <h1 style="font-size: 2.5rem; font-weight: 700; margin-bottom: 1rem; color: #1a1a1a;">VirtualGrid</h1>
      <p style="font-size: 1.125rem; color: #4a4a4a;">Virtualized grid view.</p>
    </div>`
  })
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>
export const Page: Story = {}
