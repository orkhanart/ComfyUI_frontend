import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { h } from 'vue'

/**
 * Spacing
 *
 * This page documents the spacing system used in ComfyUI.
 * Based on Tailwind CSS spacing scale with 4px base unit.
 */

// Tailwind spacing scale
const spacingScale = [
  { name: '0', value: '0px', rem: '0rem' },
  { name: 'px', value: '1px', rem: '1px' },
  { name: '0.5', value: '2px', rem: '0.125rem' },
  { name: '1', value: '4px', rem: '0.25rem' },
  { name: '1.5', value: '6px', rem: '0.375rem' },
  { name: '2', value: '8px', rem: '0.5rem' },
  { name: '2.5', value: '10px', rem: '0.625rem' },
  { name: '3', value: '12px', rem: '0.75rem' },
  { name: '3.5', value: '14px', rem: '0.875rem' },
  { name: '4', value: '16px', rem: '1rem' },
  { name: '5', value: '20px', rem: '1.25rem' },
  { name: '6', value: '24px', rem: '1.5rem' },
  { name: '7', value: '28px', rem: '1.75rem' },
  { name: '8', value: '32px', rem: '2rem' },
  { name: '9', value: '36px', rem: '2.25rem' },
  { name: '10', value: '40px', rem: '2.5rem' },
  { name: '11', value: '44px', rem: '2.75rem' },
  { name: '12', value: '48px', rem: '3rem' },
  { name: '14', value: '56px', rem: '3.5rem' },
  { name: '16', value: '64px', rem: '4rem' },
  { name: '20', value: '80px', rem: '5rem' },
  { name: '24', value: '96px', rem: '6rem' },
  { name: '28', value: '112px', rem: '7rem' },
  { name: '32', value: '128px', rem: '8rem' }
]

// Common spacing patterns in ComfyUI
const spacingPatterns = {
  'Compact UI': {
    description: 'For dense information display (node widgets, menus)',
    examples: [
      { class: 'p-1', usage: 'Minimal padding for buttons' },
      { class: 'p-2', usage: 'Standard widget padding' },
      { class: 'gap-1', usage: 'Tight element spacing' },
      { class: 'gap-2', usage: 'Standard element spacing' }
    ]
  },
  'Content Areas': {
    description: 'For panels, dialogs, and content sections',
    examples: [
      { class: 'p-4', usage: 'Panel content padding' },
      { class: 'p-6', usage: 'Dialog content padding' },
      { class: 'gap-4', usage: 'Section spacing' },
      { class: 'gap-6', usage: 'Large section gaps' }
    ]
  },
  Layout: {
    description: 'For major layout structures',
    examples: [
      { class: 'p-8', usage: 'Page padding' },
      { class: 'gap-8', usage: 'Major section spacing' },
      { class: 'my-6', usage: 'Vertical section margins' },
      { class: 'mx-4', usage: 'Horizontal content margins' }
    ]
  }
}

const meta: Meta = {
  title: 'Foundation/Spacing/Scale',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Spacing scale based on Tailwind CSS with 4px base unit. Use for margin, padding, gap, and positioning.'
      }
    }
  }
}

export default meta
type Story = StoryObj<typeof meta>

/**
 * Complete spacing scale visualization
 */
export const SpacingScale: Story = {
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
              'Spacing Scale'
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
              'Tailwind CSS spacing scale with 4px (0.25rem) base unit. Values apply to padding (p-), margin (m-), gap, width (w-), height (h-), etc.'
            ),

            h(
              'div',
              {
                style: {
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.5rem'
                }
              },
              [
                // Header
                h(
                  'div',
                  {
                    style: {
                      display: 'grid',
                      gridTemplateColumns: '80px 80px 100px 1fr',
                      padding: '0.75rem 1rem',
                      borderBottom: '2px solid #e5e5e5',
                      gap: '1rem'
                    }
                  },
                  [
                    h(
                      'span',
                      {
                        style: {
                          fontSize: '0.75rem',
                          fontWeight: '600',
                          color: '#666'
                        }
                      },
                      'Name'
                    ),
                    h(
                      'span',
                      {
                        style: {
                          fontSize: '0.75rem',
                          fontWeight: '600',
                          color: '#666'
                        }
                      },
                      'Pixels'
                    ),
                    h(
                      'span',
                      {
                        style: {
                          fontSize: '0.75rem',
                          fontWeight: '600',
                          color: '#666'
                        }
                      },
                      'REM'
                    ),
                    h(
                      'span',
                      {
                        style: {
                          fontSize: '0.75rem',
                          fontWeight: '600',
                          color: '#666'
                        }
                      },
                      'Visual'
                    )
                  ]
                ),
                // Rows
                ...spacingScale.map((spacing) =>
                  h(
                    'div',
                    {
                      key: spacing.name,
                      style: {
                        display: 'grid',
                        gridTemplateColumns: '80px 80px 100px 1fr',
                        padding: '0.5rem 1rem',
                        borderBottom: '1px solid #f0f0f0',
                        gap: '1rem',
                        alignItems: 'center'
                      }
                    },
                    [
                      h(
                        'code',
                        {
                          style: {
                            fontSize: '0.75rem',
                            fontWeight: '600',
                            color: '#1a1a1a',
                            backgroundColor: '#f5f5f5',
                            padding: '0.25rem 0.5rem',
                            borderRadius: '0.25rem'
                          }
                        },
                        spacing.name
                      ),
                      h(
                        'span',
                        {
                          style: {
                            fontSize: '0.75rem',
                            fontFamily: 'monospace',
                            color: '#666'
                          }
                        },
                        spacing.value
                      ),
                      h(
                        'span',
                        {
                          style: {
                            fontSize: '0.75rem',
                            fontFamily: 'monospace',
                            color: '#999'
                          }
                        },
                        spacing.rem
                      ),
                      h(
                        'div',
                        {
                          style: {
                            display: 'flex',
                            alignItems: 'center'
                          }
                        },
                        [
                          h('div', {
                            style: {
                              height: '1rem',
                              width: spacing.value,
                              backgroundColor: '#0b8ce9',
                              borderRadius: '2px',
                              minWidth: spacing.name === '0' ? '2px' : undefined
                            }
                          })
                        ]
                      )
                    ]
                  )
                )
              ]
            )
          ]
        )
    }
  })
}

/**
 * Common spacing patterns used in ComfyUI
 */
export const Patterns: Story = {
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
              'Spacing Patterns'
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
              'Common spacing combinations used in ComfyUI components.'
            ),

            ...Object.entries(spacingPatterns).map(([name, pattern]) =>
              h(
                'div',
                {
                  key: name,
                  style: {
                    marginBottom: '2rem',
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
                        fontSize: '1.125rem',
                        fontWeight: '600',
                        marginBottom: '0.25rem',
                        color: '#1a1a1a'
                      }
                    },
                    name
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
                    pattern.description
                  ),
                  h(
                    'div',
                    {
                      style: {
                        display: 'grid',
                        gridTemplateColumns:
                          'repeat(auto-fill, minmax(200px, 1fr))',
                        gap: '0.75rem'
                      }
                    },
                    pattern.examples.map((example) =>
                      h(
                        'div',
                        {
                          key: example.class,
                          style: {
                            padding: '0.75rem',
                            backgroundColor: '#fff',
                            borderRadius: '0.5rem',
                            border: '1px solid #e5e5e5'
                          }
                        },
                        [
                          h(
                            'code',
                            {
                              style: {
                                fontSize: '0.8125rem',
                                fontWeight: '600',
                                color: '#0b8ce9',
                                backgroundColor: '#e8f4fc',
                                padding: '0.125rem 0.375rem',
                                borderRadius: '0.25rem'
                              }
                            },
                            example.class
                          ),
                          h(
                            'p',
                            {
                              style: {
                                fontSize: '0.75rem',
                                color: '#666',
                                margin: '0.5rem 0 0'
                              }
                            },
                            example.usage
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
 * Interactive spacing demonstration with padding
 */
export const PaddingDemo: Story = {
  render: () => ({
    setup() {
      const paddingSizes = ['1', '2', '3', '4', '6', '8']

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
              'Padding Examples'
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
              'Visual comparison of padding values. The blue area shows content, gray shows padding.'
            ),

            h(
              'div',
              {
                style: {
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
                  gap: '1.5rem'
                }
              },
              paddingSizes.map((size) => {
                const pxValue = parseInt(size) * 4
                return h(
                  'div',
                  {
                    key: size,
                    style: {
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '0.75rem'
                    }
                  },
                  [
                    h(
                      'div',
                      {
                        style: {
                          backgroundColor: '#e5e5e5',
                          borderRadius: '0.5rem',
                          padding: `${pxValue}px`
                        }
                      },
                      [
                        h(
                          'div',
                          {
                            style: {
                              width: '60px',
                              height: '60px',
                              backgroundColor: '#0b8ce9',
                              borderRadius: '0.25rem',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              color: '#fff',
                              fontSize: '0.75rem',
                              fontWeight: '600'
                            }
                          },
                          'Content'
                        )
                      ]
                    ),
                    h(
                      'code',
                      {
                        style: {
                          fontSize: '0.8125rem',
                          fontWeight: '600',
                          backgroundColor: '#f5f5f5',
                          padding: '0.25rem 0.5rem',
                          borderRadius: '0.25rem'
                        }
                      },
                      `p-${size}`
                    ),
                    h(
                      'span',
                      {
                        style: {
                          fontSize: '0.6875rem',
                          color: '#999'
                        }
                      },
                      `${pxValue}px`
                    )
                  ]
                )
              })
            )
          ]
        )
    }
  })
}

/**
 * Gap utilities for flex and grid layouts
 */
export const GapDemo: Story = {
  render: () => ({
    setup() {
      const gapSizes = ['1', '2', '3', '4', '6', '8']

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
              'Gap Examples'
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
              'Gap utilities for flex and grid layouts.'
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
              gapSizes.map((size) => {
                const pxValue = parseInt(size) * 4
                return h(
                  'div',
                  {
                    key: size,
                    style: {
                      padding: '1rem',
                      backgroundColor: '#f9f9f9',
                      borderRadius: '0.5rem'
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
                          marginBottom: '0.75rem'
                        }
                      },
                      [
                        h(
                          'code',
                          {
                            style: {
                              fontSize: '0.875rem',
                              fontWeight: '600',
                              backgroundColor: '#e8f4fc',
                              color: '#0b8ce9',
                              padding: '0.25rem 0.5rem',
                              borderRadius: '0.25rem'
                            }
                          },
                          `gap-${size}`
                        ),
                        h(
                          'span',
                          {
                            style: {
                              fontSize: '0.75rem',
                              color: '#999'
                            }
                          },
                          `${pxValue}px`
                        )
                      ]
                    ),
                    h(
                      'div',
                      {
                        style: {
                          display: 'flex',
                          gap: `${pxValue}px`
                        }
                      },
                      [1, 2, 3, 4, 5].map((i) =>
                        h(
                          'div',
                          {
                            key: i,
                            style: {
                              width: '3rem',
                              height: '3rem',
                              backgroundColor: '#0b8ce9',
                              borderRadius: '0.25rem',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              color: '#fff',
                              fontSize: '0.75rem',
                              fontWeight: '600'
                            }
                          },
                          i
                        )
                      )
                    )
                  ]
                )
              })
            )
          ]
        )
    }
  })
}
