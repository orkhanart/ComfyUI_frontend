import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { h } from 'vue'

/**
 * Shadows
 *
 * This page documents the shadow and elevation system used in ComfyUI.
 * Shadows create depth and visual hierarchy in the interface.
 */

// Tailwind default shadow scale
const shadowScale = [
  {
    name: 'shadow-sm',
    value: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    description: 'Subtle shadow for small elements'
  },
  {
    name: 'shadow',
    value: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
    description: 'Default shadow for cards and buttons'
  },
  {
    name: 'shadow-md',
    value: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
    description: 'Medium shadow for raised elements'
  },
  {
    name: 'shadow-lg',
    value: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
    description: 'Large shadow for floating elements'
  },
  {
    name: 'shadow-xl',
    value:
      '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
    description: 'Extra large shadow for modals'
  },
  {
    name: 'shadow-2xl',
    value: '0 25px 50px -12px rgb(0 0 0 / 0.25)',
    description: 'Maximum elevation for overlays'
  }
]

// Custom ComfyUI shadows
const comfyShadows = [
  {
    name: 'shadow-interface',
    value: 'var(--interface-panel-box-shadow)',
    cssValue: '1px 1px 8px 0 rgb(0 0 0 / 0.4)',
    description: 'Panels and floating interface elements'
  }
]

const meta: Meta = {
  title: 'Foundation/Shadows/Elevation',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Shadow and elevation system for creating depth and visual hierarchy. Includes Tailwind defaults and custom ComfyUI shadows.'
      }
    }
  }
}

export default meta
type Story = StoryObj<typeof meta>

/**
 * Complete shadow scale from sm to 2xl
 */
export const ShadowScale: Story = {
  render: () => ({
    setup() {
      return () =>
        h(
          'div',
          {
            style: {
              padding: '2rem',
              maxWidth: '1000px',
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
              'Shadow Scale'
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
              'Tailwind CSS shadow utilities for creating elevation and depth.'
            ),

            h(
              'div',
              {
                style: {
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                  gap: '2rem'
                }
              },
              shadowScale.map((shadow) =>
                h(
                  'div',
                  {
                    key: shadow.name,
                    style: {
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '1rem'
                    }
                  },
                  [
                    // Shadow preview
                    h(
                      'div',
                      {
                        style: {
                          padding: '2rem',
                          backgroundColor: '#fff',
                          borderRadius: '0.75rem',
                          boxShadow: shadow.value
                        }
                      },
                      [
                        h(
                          'div',
                          {
                            style: {
                              height: '4rem',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              color: '#999',
                              fontSize: '0.875rem'
                            }
                          },
                          'Preview Area'
                        )
                      ]
                    ),
                    // Info
                    h('div', {}, [
                      h(
                        'code',
                        {
                          style: {
                            fontSize: '0.875rem',
                            fontWeight: '600',
                            color: '#0b8ce9',
                            backgroundColor: '#e8f4fc',
                            padding: '0.25rem 0.5rem',
                            borderRadius: '0.25rem'
                          }
                        },
                        shadow.name
                      ),
                      h(
                        'p',
                        {
                          style: {
                            fontSize: '0.8125rem',
                            color: '#666',
                            margin: '0.5rem 0 0'
                          }
                        },
                        shadow.description
                      )
                    ])
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
 * Custom ComfyUI shadow tokens
 */
export const ComfyShadows: Story = {
  render: () => ({
    setup() {
      return () =>
        h(
          'div',
          {
            style: {
              padding: '2rem',
              maxWidth: '1000px',
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
              'ComfyUI Shadows'
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
              'Custom shadow tokens defined in the design system.'
            ),

            h(
              'div',
              {
                style: {
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '2rem'
                }
              },
              comfyShadows.map((shadow) =>
                h(
                  'div',
                  {
                    key: shadow.name,
                    style: {
                      padding: '1.5rem',
                      backgroundColor: '#f9f9f9',
                      borderRadius: '0.75rem'
                    }
                  },
                  [
                    h(
                      'div',
                      {
                        style: {
                          display: 'flex',
                          alignItems: 'center',
                          gap: '1rem',
                          marginBottom: '1rem'
                        }
                      },
                      [
                        h(
                          'code',
                          {
                            style: {
                              fontSize: '0.875rem',
                              fontWeight: '600',
                              color: '#0b8ce9',
                              backgroundColor: '#e8f4fc',
                              padding: '0.25rem 0.5rem',
                              borderRadius: '0.25rem'
                            }
                          },
                          shadow.name
                        ),
                        h(
                          'span',
                          {
                            style: {
                              fontSize: '0.75rem',
                              color: '#999'
                            }
                          },
                          shadow.description
                        )
                      ]
                    ),
                    // Preview on light background
                    h(
                      'div',
                      {
                        style: {
                          display: 'grid',
                          gridTemplateColumns: '1fr 1fr',
                          gap: '1.5rem',
                          marginBottom: '1rem'
                        }
                      },
                      [
                        h(
                          'div',
                          {
                            style: {
                              padding: '1rem',
                              backgroundColor: '#fff',
                              borderRadius: '0.5rem'
                            }
                          },
                          [
                            h(
                              'p',
                              {
                                style: {
                                  fontSize: '0.6875rem',
                                  color: '#999',
                                  marginBottom: '0.75rem'
                                }
                              },
                              'Light Background'
                            ),
                            h(
                              'div',
                              {
                                style: {
                                  padding: '1.5rem',
                                  backgroundColor: '#fff',
                                  borderRadius: '0.5rem',
                                  boxShadow: shadow.cssValue
                                }
                              },
                              [
                                h(
                                  'span',
                                  {
                                    style: {
                                      color: '#666',
                                      fontSize: '0.875rem'
                                    }
                                  },
                                  'Panel Content'
                                )
                              ]
                            )
                          ]
                        ),
                        h(
                          'div',
                          {
                            style: {
                              padding: '1rem',
                              backgroundColor: '#1a1a1a',
                              borderRadius: '0.5rem'
                            }
                          },
                          [
                            h(
                              'p',
                              {
                                style: {
                                  fontSize: '0.6875rem',
                                  color: '#666',
                                  marginBottom: '0.75rem'
                                }
                              },
                              'Dark Background'
                            ),
                            h(
                              'div',
                              {
                                style: {
                                  padding: '1.5rem',
                                  backgroundColor: '#262729',
                                  borderRadius: '0.5rem',
                                  boxShadow: shadow.cssValue
                                }
                              },
                              [
                                h(
                                  'span',
                                  {
                                    style: {
                                      color: '#999',
                                      fontSize: '0.875rem'
                                    }
                                  },
                                  'Panel Content'
                                )
                              ]
                            )
                          ]
                        )
                      ]
                    ),
                    // CSS value
                    h(
                      'div',
                      {
                        style: {
                          padding: '0.75rem',
                          backgroundColor: '#1a1a1a',
                          borderRadius: '0.375rem'
                        }
                      },
                      [
                        h(
                          'code',
                          {
                            style: {
                              fontSize: '0.75rem',
                              color: '#aaa',
                              fontFamily: 'monospace'
                            }
                          },
                          shadow.cssValue
                        )
                      ]
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
 * Focus ring styles for accessibility
 */
export const FocusRings: Story = {
  render: () => ({
    setup() {
      return () =>
        h(
          'div',
          {
            style: {
              padding: '2rem',
              maxWidth: '1000px',
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
              'Focus Rings'
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
              'Focus indicator styles for keyboard navigation and accessibility.'
            ),

            h(
              'div',
              {
                style: {
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '2rem'
                }
              },
              [
                // Default ring
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
                      'div',
                      {
                        style: {
                          display: 'flex',
                          alignItems: 'center',
                          gap: '1rem',
                          marginBottom: '1rem'
                        }
                      },
                      [
                        h(
                          'code',
                          {
                            style: {
                              fontSize: '0.875rem',
                              fontWeight: '600',
                              backgroundColor: '#e5e5e5',
                              padding: '0.25rem 0.5rem',
                              borderRadius: '0.25rem'
                            }
                          },
                          'focus:ring'
                        ),
                        h(
                          'span',
                          {
                            style: { fontSize: '0.875rem', color: '#666' }
                          },
                          'Default focus ring'
                        )
                      ]
                    ),
                    h(
                      'div',
                      {
                        style: {
                          display: 'flex',
                          gap: '1.5rem',
                          flexWrap: 'wrap'
                        }
                      },
                      [
                        h(
                          'button',
                          {
                            style: {
                              padding: '0.5rem 1rem',
                              backgroundColor: '#fff',
                              border: '1px solid #e5e5e5',
                              borderRadius: '0.375rem',
                              fontSize: '0.875rem',
                              cursor: 'pointer',
                              boxShadow: '0 0 0 3px rgb(59 130 246 / 0.5)'
                            }
                          },
                          'Focused Button'
                        ),
                        h('input', {
                          type: 'text',
                          placeholder: 'Focused input',
                          style: {
                            padding: '0.5rem 1rem',
                            border: '1px solid #e5e5e5',
                            borderRadius: '0.375rem',
                            fontSize: '0.875rem',
                            outline: 'none',
                            boxShadow: '0 0 0 3px rgb(59 130 246 / 0.5)'
                          }
                        })
                      ]
                    )
                  ]
                ),

                // Ring with offset
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
                      'div',
                      {
                        style: {
                          display: 'flex',
                          alignItems: 'center',
                          gap: '1rem',
                          marginBottom: '1rem'
                        }
                      },
                      [
                        h(
                          'code',
                          {
                            style: {
                              fontSize: '0.875rem',
                              fontWeight: '600',
                              backgroundColor: '#e5e5e5',
                              padding: '0.25rem 0.5rem',
                              borderRadius: '0.25rem'
                            }
                          },
                          'focus:ring-2 ring-offset-2'
                        ),
                        h(
                          'span',
                          {
                            style: { fontSize: '0.875rem', color: '#666' }
                          },
                          'Focus ring with offset'
                        )
                      ]
                    ),
                    h(
                      'div',
                      {
                        style: {
                          display: 'flex',
                          gap: '1.5rem',
                          flexWrap: 'wrap'
                        }
                      },
                      [
                        h(
                          'button',
                          {
                            style: {
                              padding: '0.5rem 1rem',
                              backgroundColor: '#0b8ce9',
                              color: '#fff',
                              border: 'none',
                              borderRadius: '0.375rem',
                              fontSize: '0.875rem',
                              cursor: 'pointer',
                              boxShadow:
                                '0 0 0 2px #f9f9f9, 0 0 0 4px rgb(59 130 246 / 0.5)'
                            }
                          },
                          'Primary Button'
                        ),
                        h(
                          'button',
                          {
                            style: {
                              padding: '0.5rem 1rem',
                              backgroundColor: '#f75951',
                              color: '#fff',
                              border: 'none',
                              borderRadius: '0.375rem',
                              fontSize: '0.875rem',
                              cursor: 'pointer',
                              boxShadow:
                                '0 0 0 2px #f9f9f9, 0 0 0 4px rgb(239 68 68 / 0.5)'
                            }
                          },
                          'Danger Button'
                        )
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

/**
 * Elevation levels for UI components
 */
export const ElevationLevels: Story = {
  render: () => ({
    setup() {
      const elevations = [
        {
          level: 0,
          name: 'Base',
          shadow: 'none',
          usage: 'Default level, no elevation'
        },
        {
          level: 1,
          name: 'Raised',
          shadow:
            '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
          usage: 'Cards, buttons, inputs'
        },
        {
          level: 2,
          name: 'Floating',
          shadow:
            '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
          usage: 'Dropdowns, popovers'
        },
        {
          level: 3,
          name: 'Overlay',
          shadow:
            '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
          usage: 'Side panels, drawers'
        },
        {
          level: 4,
          name: 'Modal',
          shadow:
            '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
          usage: 'Dialogs, modals'
        }
      ]

      return () =>
        h(
          'div',
          {
            style: {
              padding: '2rem',
              maxWidth: '1000px',
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
              'Elevation Levels'
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
              'Conceptual elevation levels for UI hierarchy. Higher levels appear closer to the user.'
            ),

            h(
              'div',
              {
                style: {
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1.5rem'
                }
              },
              elevations.map((elevation) =>
                h(
                  'div',
                  {
                    key: elevation.level,
                    style: {
                      display: 'grid',
                      gridTemplateColumns: '60px 100px 1fr 200px',
                      alignItems: 'center',
                      gap: '1.5rem',
                      padding: '1rem',
                      backgroundColor: '#f9f9f9',
                      borderRadius: '0.5rem'
                    }
                  },
                  [
                    h(
                      'span',
                      {
                        style: {
                          fontSize: '1.5rem',
                          fontWeight: '700',
                          color: '#0b8ce9'
                        }
                      },
                      elevation.level
                    ),
                    h(
                      'span',
                      {
                        style: {
                          fontSize: '0.875rem',
                          fontWeight: '600',
                          color: '#1a1a1a'
                        }
                      },
                      elevation.name
                    ),
                    h(
                      'span',
                      {
                        style: {
                          fontSize: '0.8125rem',
                          color: '#666'
                        }
                      },
                      elevation.usage
                    ),
                    h(
                      'div',
                      {
                        style: {
                          padding: '1rem',
                          backgroundColor: '#fff',
                          borderRadius: '0.375rem',
                          boxShadow: elevation.shadow,
                          textAlign: 'center',
                          fontSize: '0.75rem',
                          color: '#999'
                        }
                      },
                      'Preview'
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
