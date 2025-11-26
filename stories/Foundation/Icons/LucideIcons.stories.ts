import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { h, ref } from 'vue'

/**
 * Lucide Icons
 *
 * ComfyUI uses Lucide icons via Iconify dynamic selectors.
 * Icons are available using the icon-[lucide--name] CSS class pattern.
 *
 * Full icon set: https://lucide.dev/icons
 */

// Commonly used Lucide icons in ComfyUI, organized by category
const iconCategories = {
  actions: {
    description: 'Common action icons',
    icons: [
      { name: 'play', description: 'Play/execute' },
      { name: 'pause', description: 'Pause' },
      { name: 'stop-circle', description: 'Stop' },
      { name: 'plus', description: 'Add/create' },
      { name: 'minus', description: 'Remove/subtract' },
      { name: 'x', description: 'Close/cancel' },
      { name: 'check', description: 'Confirm/success' },
      { name: 'trash-2', description: 'Delete' },
      { name: 'copy', description: 'Copy' },
      { name: 'clipboard', description: 'Paste' },
      { name: 'download', description: 'Download' },
      { name: 'upload', description: 'Upload' },
      { name: 'refresh-cw', description: 'Refresh' },
      { name: 'undo-2', description: 'Undo' },
      { name: 'redo-2', description: 'Redo' }
    ]
  },
  navigation: {
    description: 'Navigation and direction icons',
    icons: [
      { name: 'chevron-left', description: 'Previous' },
      { name: 'chevron-right', description: 'Next' },
      { name: 'chevron-up', description: 'Up/collapse' },
      { name: 'chevron-down', description: 'Down/expand' },
      { name: 'arrow-left', description: 'Back' },
      { name: 'arrow-right', description: 'Forward' },
      { name: 'arrow-up', description: 'Up arrow' },
      { name: 'arrow-down', description: 'Down arrow' },
      { name: 'external-link', description: 'External link' },
      { name: 'corner-up-left', description: 'Return' },
      { name: 'menu', description: 'Menu/hamburger' },
      { name: 'more-horizontal', description: 'More options' },
      { name: 'more-vertical', description: 'More options vertical' }
    ]
  },
  files: {
    description: 'File and folder icons',
    icons: [
      { name: 'file', description: 'Generic file' },
      { name: 'file-text', description: 'Text file' },
      { name: 'file-image', description: 'Image file' },
      { name: 'file-video', description: 'Video file' },
      { name: 'file-code', description: 'Code file' },
      { name: 'folder', description: 'Folder' },
      { name: 'folder-open', description: 'Open folder' },
      { name: 'folder-plus', description: 'Add folder' },
      { name: 'save', description: 'Save' },
      { name: 'hard-drive', description: 'Storage' }
    ]
  },
  interface: {
    description: 'UI and interface icons',
    icons: [
      { name: 'settings', description: 'Settings' },
      { name: 'settings-2', description: 'Settings alt' },
      { name: 'sliders-horizontal', description: 'Controls' },
      { name: 'search', description: 'Search' },
      { name: 'filter', description: 'Filter' },
      { name: 'eye', description: 'Visible' },
      { name: 'eye-off', description: 'Hidden' },
      { name: 'lock', description: 'Locked' },
      { name: 'unlock', description: 'Unlocked' },
      { name: 'maximize-2', description: 'Maximize' },
      { name: 'minimize-2', description: 'Minimize' },
      { name: 'expand', description: 'Expand' },
      { name: 'shrink', description: 'Shrink' },
      { name: 'grip-vertical', description: 'Drag handle' },
      { name: 'move', description: 'Move' }
    ]
  },
  status: {
    description: 'Status and feedback icons',
    icons: [
      { name: 'check-circle', description: 'Success' },
      { name: 'x-circle', description: 'Error' },
      { name: 'alert-circle', description: 'Warning' },
      { name: 'info', description: 'Information' },
      { name: 'help-circle', description: 'Help' },
      { name: 'loader-2', description: 'Loading' },
      { name: 'clock', description: 'Pending/time' },
      { name: 'zap', description: 'Quick/fast' },
      { name: 'zap-off', description: 'Disabled' }
    ]
  },
  media: {
    description: 'Media and content icons',
    icons: [
      { name: 'image', description: 'Image' },
      { name: 'images', description: 'Gallery' },
      { name: 'video', description: 'Video' },
      { name: 'music', description: 'Audio' },
      { name: 'camera', description: 'Camera' },
      { name: 'box', description: '3D object' },
      { name: 'layers', description: 'Layers' },
      { name: 'git-branch', description: 'Branch/fork' },
      { name: 'git-merge', description: 'Merge' }
    ]
  },
  comfyui: {
    description: 'Icons commonly used in ComfyUI workflows',
    icons: [
      { name: 'cpu', description: 'Processing' },
      { name: 'gpu', description: 'GPU (custom)' },
      { name: 'activity', description: 'Activity/graph' },
      { name: 'terminal', description: 'Console/logs' },
      { name: 'code', description: 'Code/prompt' },
      { name: 'wand-2', description: 'Generate/magic' },
      { name: 'sparkles', description: 'AI/enhance' },
      { name: 'shuffle', description: 'Random/shuffle' },
      { name: 'repeat', description: 'Loop/repeat' },
      { name: 'link', description: 'Connection' },
      { name: 'unlink', description: 'Disconnect' },
      { name: 'package', description: 'Package/model' }
    ]
  }
}

const meta: Meta = {
  title: 'Foundation/Icons/Lucide Icons',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Lucide icons available via Iconify CSS classes. Use icon-[lucide--name] pattern. Full set at lucide.dev/icons'
      }
    }
  }
}

export default meta
type Story = StoryObj<typeof meta>

/**
 * All commonly used Lucide icons organized by category
 */
export const AllCategories: Story = {
  render: () => ({
    setup() {
      return () =>
        h(
          'div',
          {
            style: {
              padding: '2rem',
              maxWidth: '1200px',
              fontFamily: 'system-ui, -apple-system, sans-serif'
            }
          },
          [
            h(
              'h1',
              {
                style: {
                  fontSize: '2rem',
                  fontWeight: '700',
                  marginBottom: '0.5rem',
                  color: '#1a1a1a'
                }
              },
              'Lucide Icons'
            ),
            h(
              'p',
              {
                style: {
                  fontSize: '1rem',
                  color: '#666',
                  marginBottom: '0.5rem'
                }
              },
              'Icons from the Lucide icon set, commonly used in ComfyUI.'
            ),
            h(
              'p',
              {
                style: {
                  fontSize: '0.875rem',
                  color: '#999',
                  marginBottom: '2rem'
                }
              },
              [
                'Full icon set: ',
                h(
                  'a',
                  {
                    href: 'https://lucide.dev/icons',
                    target: '_blank',
                    style: { color: '#0b8ce9' }
                  },
                  'lucide.dev/icons'
                )
              ]
            ),

            ...Object.entries(iconCategories).map(([categoryName, category]) =>
              h(
                'div',
                {
                  key: categoryName,
                  style: {
                    marginBottom: '2.5rem'
                  }
                },
                [
                  h(
                    'h2',
                    {
                      style: {
                        fontSize: '1.25rem',
                        fontWeight: '600',
                        marginBottom: '0.25rem',
                        textTransform: 'capitalize',
                        color: '#1a1a1a'
                      }
                    },
                    categoryName
                  ),
                  h(
                    'p',
                    {
                      style: {
                        fontSize: '0.875rem',
                        color: '#666',
                        marginBottom: '1rem'
                      }
                    },
                    category.description
                  ),
                  h(
                    'div',
                    {
                      style: {
                        display: 'grid',
                        gridTemplateColumns:
                          'repeat(auto-fill, minmax(120px, 1fr))',
                        gap: '0.75rem'
                      }
                    },
                    category.icons.map((icon) =>
                      h(
                        'div',
                        {
                          key: icon.name,
                          style: {
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            padding: '1rem 0.5rem',
                            backgroundColor: '#f9f9f9',
                            borderRadius: '0.5rem',
                            gap: '0.5rem'
                          }
                        },
                        [
                          h('span', {
                            class: `icon-[lucide--${icon.name}]`,
                            style: {
                              fontSize: '1.5rem',
                              color: '#1a1a1a'
                            }
                          }),
                          h(
                            'span',
                            {
                              style: {
                                fontSize: '0.625rem',
                                fontFamily: 'monospace',
                                color: '#666',
                                textAlign: 'center'
                              }
                            },
                            icon.name
                          )
                        ]
                      )
                    )
                  )
                ]
              )
            )
          ]
        )
    }
  })
}

/**
 * Interactive icon search
 */
export const IconSearch: Story = {
  render: () => ({
    setup() {
      const searchQuery = ref('')

      const allIcons = Object.values(iconCategories).flatMap((cat) =>
        cat.icons.map((icon) => ({
          ...icon,
          class: `icon-[lucide--${icon.name}]`
        }))
      )

      const filteredIcons = () => {
        if (!searchQuery.value) return allIcons
        const query = searchQuery.value.toLowerCase()
        return allIcons.filter(
          (icon) =>
            icon.name.toLowerCase().includes(query) ||
            icon.description.toLowerCase().includes(query)
        )
      }

      return () =>
        h(
          'div',
          {
            style: {
              padding: '2rem',
              maxWidth: '1200px',
              fontFamily: 'system-ui, -apple-system, sans-serif'
            }
          },
          [
            h(
              'h1',
              {
                style: {
                  fontSize: '2rem',
                  fontWeight: '700',
                  marginBottom: '1rem',
                  color: '#1a1a1a'
                }
              },
              'Icon Search'
            ),

            // Search input
            h(
              'div',
              {
                style: {
                  marginBottom: '2rem'
                }
              },
              [
                h('input', {
                  type: 'text',
                  placeholder: 'Search icons...',
                  value: searchQuery.value,
                  onInput: (e: Event) => {
                    searchQuery.value = (e.target as HTMLInputElement).value
                  },
                  style: {
                    width: '100%',
                    maxWidth: '400px',
                    padding: '0.75rem 1rem',
                    fontSize: '1rem',
                    border: '1px solid #e5e5e5',
                    borderRadius: '0.5rem',
                    outline: 'none'
                  }
                })
              ]
            ),

            // Results count
            h(
              'p',
              {
                style: {
                  fontSize: '0.875rem',
                  color: '#666',
                  marginBottom: '1rem'
                }
              },
              `${filteredIcons().length} icons found`
            ),

            // Icon grid
            h(
              'div',
              {
                style: {
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
                  gap: '0.75rem'
                }
              },
              filteredIcons().map((icon) =>
                h(
                  'div',
                  {
                    key: icon.name,
                    style: {
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      padding: '1rem',
                      backgroundColor: '#f9f9f9',
                      borderRadius: '0.5rem',
                      gap: '0.5rem',
                      cursor: 'pointer',
                      transition: 'background-color 0.15s'
                    },
                    onMouseenter: (e: MouseEvent) => {
                      ;(e.currentTarget as HTMLElement).style.backgroundColor =
                        '#e8f4fc'
                    },
                    onMouseleave: (e: MouseEvent) => {
                      ;(e.currentTarget as HTMLElement).style.backgroundColor =
                        '#f9f9f9'
                    }
                  },
                  [
                    h('span', {
                      class: icon.class,
                      style: {
                        fontSize: '1.5rem',
                        color: '#1a1a1a'
                      }
                    }),
                    h(
                      'span',
                      {
                        style: {
                          fontSize: '0.6875rem',
                          fontFamily: 'monospace',
                          color: '#666',
                          textAlign: 'center'
                        }
                      },
                      icon.name
                    ),
                    h(
                      'span',
                      {
                        style: {
                          fontSize: '0.625rem',
                          color: '#999',
                          textAlign: 'center'
                        }
                      },
                      icon.description
                    )
                  ]
                )
              )
            )
          ]
        )
    }
  })
}

/**
 * Icon sizes demonstration
 */
export const Sizes: Story = {
  render: () => ({
    setup() {
      const sizes = [
        { class: 'text-xs', label: 'text-xs (12px)' },
        { class: 'text-sm', label: 'text-sm (14px)' },
        { class: 'text-base', label: 'text-base (16px)' },
        { class: 'text-lg', label: 'text-lg (18px)' },
        { class: 'text-xl', label: 'text-xl (20px)' },
        { class: 'text-2xl', label: 'text-2xl (24px)' },
        { class: 'text-3xl', label: 'text-3xl (30px)' },
        { class: 'text-4xl', label: 'text-4xl (36px)' }
      ]

      return () =>
        h(
          'div',
          {
            style: {
              padding: '2rem',
              maxWidth: '800px',
              fontFamily: 'system-ui, -apple-system, sans-serif'
            }
          },
          [
            h(
              'h1',
              {
                style: {
                  fontSize: '2rem',
                  fontWeight: '700',
                  marginBottom: '0.5rem',
                  color: '#1a1a1a'
                }
              },
              'Icon Sizes'
            ),
            h(
              'p',
              {
                style: {
                  fontSize: '1rem',
                  color: '#666',
                  marginBottom: '2rem'
                }
              },
              'Icons scale with font-size. Use Tailwind text utilities to control size.'
            ),

            h(
              'div',
              {
                style: {
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1rem'
                }
              },
              sizes.map((size) =>
                h(
                  'div',
                  {
                    key: size.class,
                    style: {
                      display: 'flex',
                      alignItems: 'center',
                      gap: '1.5rem',
                      padding: '1rem',
                      backgroundColor: '#f9f9f9',
                      borderRadius: '0.5rem'
                    }
                  },
                  [
                    h(
                      'code',
                      {
                        style: {
                          fontSize: '0.75rem',
                          backgroundColor: '#e5e5e5',
                          padding: '0.25rem 0.5rem',
                          borderRadius: '0.25rem',
                          minWidth: '140px'
                        }
                      },
                      size.label
                    ),
                    h('span', {
                      class: `icon-[lucide--settings] ${size.class}`,
                      style: { color: '#1a1a1a' }
                    }),
                    h('span', {
                      class: `icon-[lucide--image] ${size.class}`,
                      style: { color: '#1a1a1a' }
                    }),
                    h('span', {
                      class: `icon-[lucide--play] ${size.class}`,
                      style: { color: '#1a1a1a' }
                    }),
                    h('span', {
                      class: `icon-[lucide--check-circle] ${size.class}`,
                      style: { color: '#1a1a1a' }
                    })
                  ]
                )
              )
            )
          ]
        )
    }
  })
}

/**
 * Usage examples for Lucide icons
 */
export const Usage: Story = {
  render: () => ({
    setup() {
      return () =>
        h(
          'div',
          {
            style: {
              padding: '2rem',
              maxWidth: '800px',
              fontFamily: 'system-ui, -apple-system, sans-serif'
            }
          },
          [
            h(
              'h1',
              {
                style: {
                  fontSize: '2rem',
                  fontWeight: '700',
                  marginBottom: '0.5rem',
                  color: '#1a1a1a'
                }
              },
              'Usage'
            ),
            h(
              'p',
              {
                style: {
                  fontSize: '1rem',
                  color: '#666',
                  marginBottom: '2rem'
                }
              },
              'How to use Lucide icons in your components.'
            ),

            // Basic usage
            h(
              'div',
              {
                style: {
                  marginBottom: '2rem',
                  padding: '1.5rem',
                  backgroundColor: '#1a1a1a',
                  borderRadius: '0.75rem',
                  color: '#fff'
                }
              },
              [
                h(
                  'h3',
                  {
                    style: {
                      fontSize: '1rem',
                      fontWeight: '600',
                      marginBottom: '1rem'
                    }
                  },
                  'Basic Usage'
                ),
                h(
                  'pre',
                  {
                    style: {
                      fontFamily: 'monospace',
                      fontSize: '0.875rem',
                      margin: 0,
                      overflow: 'auto'
                    }
                  },
                  `<!-- Basic icon -->
<span class="icon-[lucide--settings]" />

<!-- With size -->
<span class="icon-[lucide--settings] text-xl" />

<!-- With color -->
<span class="icon-[lucide--check-circle] text-jade-600" />

<!-- Combined -->
<span class="icon-[lucide--alert-circle] text-2xl text-gold-500" />`
                )
              ]
            ),

            // In buttons
            h(
              'div',
              {
                style: {
                  marginBottom: '2rem',
                  padding: '1.5rem',
                  backgroundColor: '#1a1a1a',
                  borderRadius: '0.75rem',
                  color: '#fff'
                }
              },
              [
                h(
                  'h3',
                  {
                    style: {
                      fontSize: '1rem',
                      fontWeight: '600',
                      marginBottom: '1rem'
                    }
                  },
                  'In Buttons'
                ),
                h(
                  'pre',
                  {
                    style: {
                      fontFamily: 'monospace',
                      fontSize: '0.875rem',
                      margin: 0,
                      overflow: 'auto'
                    }
                  },
                  `<button class="flex items-center gap-2">
  <span class="icon-[lucide--plus]" />
  Add Node
</button>

<button class="flex items-center gap-2">
  <span class="icon-[lucide--download]" />
  Download
</button>`
                )
              ]
            ),

            // Live examples
            h(
              'div',
              {
                style: {
                  padding: '1.5rem',
                  backgroundColor: '#f9f9f9',
                  borderRadius: '0.75rem'
                }
              },
              [
                h(
                  'h3',
                  {
                    style: {
                      fontSize: '1rem',
                      fontWeight: '600',
                      marginBottom: '1rem',
                      color: '#1a1a1a'
                    }
                  },
                  'Live Examples'
                ),
                h(
                  'div',
                  {
                    style: {
                      display: 'flex',
                      gap: '1rem',
                      flexWrap: 'wrap'
                    }
                  },
                  [
                    h(
                      'button',
                      {
                        style: {
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.5rem',
                          padding: '0.5rem 1rem',
                          backgroundColor: '#0b8ce9',
                          color: '#fff',
                          border: 'none',
                          borderRadius: '0.375rem',
                          fontSize: '0.875rem',
                          cursor: 'pointer'
                        }
                      },
                      [h('span', { class: 'icon-[lucide--plus]' }), 'Add Node']
                    ),
                    h(
                      'button',
                      {
                        style: {
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.5rem',
                          padding: '0.5rem 1rem',
                          backgroundColor: '#fff',
                          color: '#1a1a1a',
                          border: '1px solid #e5e5e5',
                          borderRadius: '0.375rem',
                          fontSize: '0.875rem',
                          cursor: 'pointer'
                        }
                      },
                      [
                        h('span', { class: 'icon-[lucide--download]' }),
                        'Download'
                      ]
                    ),
                    h(
                      'button',
                      {
                        style: {
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.5rem',
                          padding: '0.5rem 1rem',
                          backgroundColor: '#f75951',
                          color: '#fff',
                          border: 'none',
                          borderRadius: '0.375rem',
                          fontSize: '0.875rem',
                          cursor: 'pointer'
                        }
                      },
                      [h('span', { class: 'icon-[lucide--trash-2]' }), 'Delete']
                    ),
                    h(
                      'button',
                      {
                        style: {
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          width: '2.5rem',
                          height: '2.5rem',
                          backgroundColor: '#fff',
                          color: '#666',
                          border: '1px solid #e5e5e5',
                          borderRadius: '0.375rem',
                          cursor: 'pointer'
                        }
                      },
                      [h('span', { class: 'icon-[lucide--settings] text-lg' })]
                    ),
                    h(
                      'button',
                      {
                        style: {
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          width: '2.5rem',
                          height: '2.5rem',
                          backgroundColor: '#fff',
                          color: '#666',
                          border: '1px solid #e5e5e5',
                          borderRadius: '0.375rem',
                          cursor: 'pointer'
                        }
                      },
                      [
                        h('span', {
                          class: 'icon-[lucide--more-horizontal] text-lg'
                        })
                      ]
                    )
                  ]
                )
              ]
            )
          ]
        )
    }
  })
}
