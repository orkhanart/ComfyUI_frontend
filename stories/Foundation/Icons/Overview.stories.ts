import type { Meta, StoryObj } from '@storybook/vue3-vite'

const meta = {
  title: 'Foundation/Icons/Overview',
  parameters: {
    layout: 'fullscreen'
  },
  render: () => ({
    template: `
      <div style="padding: 3rem; max-width: 900px; margin: 0 auto; font-family: system-ui, -apple-system, sans-serif; line-height: 1.6;">
        <h1 style="font-size: 2.5rem; font-weight: 700; margin-bottom: 1rem; color: #1a1a1a;">
          Icons
        </h1>

        <p style="font-size: 1.125rem; color: #4a4a4a; margin-bottom: 2rem;">
          ComfyUI uses two icon systems: custom ComfyUI icons and the Lucide icon set.
        </p>

        <h2 style="font-size: 1.5rem; font-weight: 600; margin-bottom: 1rem; color: #1a1a1a;">
          Icon Systems
        </h2>

        <div style="margin-bottom: 2rem;">
          <h3 style="font-size: 1.125rem; font-weight: 600; margin-bottom: 0.5rem; color: #1a1a1a;">
            ComfyUI Icons
          </h3>
          <p style="color: #4a4a4a; margin-bottom: 0.5rem;">
            Custom SVG icons specific to ComfyUI (logo, workflow, node icons).
          </p>
          <ul style="color: #4a4a4a; padding-left: 1.5rem; margin-bottom: 1rem;">
            <li>Vue components: <code style="background: #f5f5f5; padding: 0.125rem 0.375rem; border-radius: 0.25rem;">@/components/icons/*.vue</code></li>
            <li>CSS classes: <code style="background: #f5f5f5; padding: 0.125rem 0.375rem; border-radius: 0.25rem;">icon-[comfy--name]</code></li>
          </ul>

          <h3 style="font-size: 1.125rem; font-weight: 600; margin-bottom: 0.5rem; color: #1a1a1a;">
            Lucide Icons
          </h3>
          <p style="color: #4a4a4a; margin-bottom: 0.5rem;">
            General purpose icons from the Lucide icon set (1000+ icons).
          </p>
          <ul style="color: #4a4a4a; padding-left: 1.5rem; margin-bottom: 1rem;">
            <li>CSS classes: <code style="background: #f5f5f5; padding: 0.125rem 0.375rem; border-radius: 0.25rem;">icon-[lucide--name]</code></li>
            <li>Full set: <a href="https://lucide.dev/icons" target="_blank" style="color: #0b8ce9;">lucide.dev/icons</a></li>
          </ul>
        </div>

        <h2 style="font-size: 1.5rem; font-weight: 600; margin-bottom: 1rem; color: #1a1a1a;">
          Usage
        </h2>

        <div style="background: #1a1a1a; color: #fff; padding: 1.5rem; border-radius: 0.75rem; margin-bottom: 2rem;">
          <pre style="margin: 0; font-family: monospace; font-size: 0.875rem; overflow: auto;">&lt;!-- Lucide icon with size and color --&gt;
&lt;span class="icon-[lucide--settings] text-xl text-muted-foreground" /&gt;

&lt;!-- Comfy custom icon --&gt;
&lt;span class="icon-[comfy--workflow] text-2xl" /&gt;

&lt;!-- Vue component icon --&gt;
&lt;ComfyLogo :size="24" color="currentColor" mode="fill" /&gt;</pre>
        </div>

        <h2 style="font-size: 1.5rem; font-weight: 600; margin-bottom: 1rem; color: #1a1a1a;">
          Pages
        </h2>

        <table style="width: 100%; border-collapse: collapse;">
          <thead>
            <tr style="border-bottom: 2px solid #e5e5e5;">
              <th style="text-align: left; padding: 0.75rem 1rem; font-weight: 600; color: #1a1a1a;">Page</th>
              <th style="text-align: left; padding: 0.75rem 1rem; font-weight: 600; color: #1a1a1a;">Description</th>
            </tr>
          </thead>
          <tbody>
            <tr style="border-bottom: 1px solid #f0f0f0;">
              <td style="padding: 0.75rem 1rem;"><strong>ComfyUI Icons</strong></td>
              <td style="padding: 0.75rem 1rem; color: #4a4a4a;">Custom Vue components and CSS class icons</td>
            </tr>
            <tr>
              <td style="padding: 0.75rem 1rem;"><strong>Lucide Icons</strong></td>
              <td style="padding: 0.75rem 1rem; color: #4a4a4a;">Searchable gallery of Lucide icons</td>
            </tr>
          </tbody>
        </table>
      </div>
    `
  })
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

export const Page: Story = {}
