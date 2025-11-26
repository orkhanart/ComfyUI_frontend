import type { Meta, StoryObj } from '@storybook/vue3-vite'

import Avatar from 'primevue/avatar'
import Skeleton from 'primevue/skeleton'
import Tag from 'primevue/tag'

import UserAvatar from '@/components/common/UserAvatar.vue'

/**
 * User-related components display user information, authentication status,
 * and account details in ComfyUI. These components are used throughout
 * the UI for personalization and account management.
 *
 * - **UserAvatar**: Displays user profile picture or fallback icon
 * - **UserCredit**: Shows user's account balance (requires auth store)
 */
const meta = {
  title: 'Utilities/User Components',
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Components for displaying user information, avatars, and account details.'
      }
    }
  }
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

/**
 * UserAvatar displays a circular user profile image.
 * Falls back to a user icon when no image is available.
 */
export const UserAvatarWithImage: Story = {
  render: () => ({
    components: { UserAvatar },
    template: `
      <div style="padding: 24px; background: var(--p-surface-0); border-radius: 8px;">
        <UserAvatar photoUrl="https://i.pravatar.cc/150?img=1" ariaLabel="John Doe's avatar" />
      </div>
    `
  }),
  parameters: {
    docs: {
      description: {
        story: 'UserAvatar with a profile image from URL.'
      }
    }
  }
}

/**
 * UserAvatar without image shows a fallback user icon.
 */
export const UserAvatarFallback: Story = {
  render: () => ({
    components: { UserAvatar },
    template: `
      <div style="padding: 24px; background: var(--p-surface-0); border-radius: 8px;">
        <UserAvatar :photoUrl="null" ariaLabel="Guest user avatar" />
      </div>
    `
  }),
  parameters: {
    docs: {
      description: {
        story:
          'UserAvatar displays a user icon when no profile image is provided.'
      }
    }
  }
}

/**
 * Multiple avatar sizes using PrimeVue Avatar directly.
 */
export const AvatarSizes: Story = {
  render: () => ({
    components: { Avatar },
    template: `
      <div style="display: flex; align-items: center; gap: 16px; padding: 24px; background: var(--p-surface-0); border-radius: 8px;">
        <div style="text-align: center;">
          <Avatar image="https://i.pravatar.cc/150?img=1" shape="circle" size="small" />
          <p style="margin: 8px 0 0 0; font-size: 11px; color: var(--p-text-muted-color);">Small</p>
        </div>
        <div style="text-align: center;">
          <Avatar image="https://i.pravatar.cc/150?img=2" shape="circle" />
          <p style="margin: 8px 0 0 0; font-size: 11px; color: var(--p-text-muted-color);">Normal</p>
        </div>
        <div style="text-align: center;">
          <Avatar image="https://i.pravatar.cc/150?img=3" shape="circle" size="large" />
          <p style="margin: 8px 0 0 0; font-size: 11px; color: var(--p-text-muted-color);">Large</p>
        </div>
        <div style="text-align: center;">
          <Avatar image="https://i.pravatar.cc/150?img=4" shape="circle" size="xlarge" />
          <p style="margin: 8px 0 0 0; font-size: 11px; color: var(--p-text-muted-color);">XLarge</p>
        </div>
      </div>
    `
  }),
  parameters: {
    docs: {
      description: {
        story: 'Different avatar sizes available through PrimeVue Avatar.'
      }
    }
  }
}

/**
 * Avatar with initials as fallback.
 */
export const AvatarWithInitials: Story = {
  render: () => ({
    components: { Avatar },
    template: `
      <div style="display: flex; align-items: center; gap: 16px; padding: 24px; background: var(--p-surface-0); border-radius: 8px;">
        <Avatar label="JD" shape="circle" style="background: var(--p-primary-color); color: white;" />
        <Avatar label="AS" shape="circle" style="background: #22c55e; color: white;" />
        <Avatar label="MK" shape="circle" style="background: #f59e0b; color: white;" />
        <Avatar label="RB" shape="circle" style="background: #ef4444; color: white;" />
      </div>
    `
  }),
  parameters: {
    docs: {
      description: {
        story: 'Avatars with user initials and custom background colors.'
      }
    }
  }
}

/**
 * UserCredit displays the user's account balance.
 * Shows loading skeleton while fetching balance.
 */
export const UserCreditDisplay: Story = {
  render: () => ({
    components: { Tag, Skeleton },
    template: `
      <div style="display: flex; flex-direction: column; gap: 24px; padding: 24px; background: var(--p-surface-0); border-radius: 8px;">
        <!-- Loaded State -->
        <div>
          <p style="margin: 0 0 8px 0; font-size: 12px; color: var(--p-text-muted-color);">Loaded</p>
          <div style="display: flex; align-items: center; gap: 8px;">
            <Tag severity="secondary" icon="pi pi-dollar" rounded style="padding: 4px; color: #fbbf24;" />
            <div style="font-size: 14px; font-weight: 500;">$25.50</div>
          </div>
        </div>

        <!-- Loading State -->
        <div>
          <p style="margin: 0 0 8px 0; font-size: 12px; color: var(--p-text-muted-color);">Loading</p>
          <div style="display: flex; align-items: center; gap: 8px;">
            <Skeleton shape="circle" width="1.5rem" height="1.5rem" />
            <Skeleton width="5rem" height="1.5rem" />
          </div>
        </div>

        <!-- Zero Balance -->
        <div>
          <p style="margin: 0 0 8px 0; font-size: 12px; color: var(--p-text-muted-color);">Zero Balance</p>
          <div style="display: flex; align-items: center; gap: 8px;">
            <Tag severity="secondary" icon="pi pi-dollar" rounded style="padding: 4px; color: #fbbf24;" />
            <div style="font-size: 14px; font-weight: 500; color: var(--p-text-muted-color);">$0.00</div>
          </div>
        </div>
      </div>
    `
  }),
  parameters: {
    docs: {
      description: {
        story:
          'UserCredit component showing different states: loaded, loading, and zero balance.'
      }
    }
  }
}

/**
 * User menu dropdown pattern showing avatar with user info.
 */
export const UserMenuDropdown: Story = {
  render: () => ({
    components: { Avatar, Tag },
    template: `
      <div style="padding: 24px; background: var(--p-surface-100);">
        <!-- Trigger Button -->
        <div style="display: inline-flex; align-items: center; gap: 8px; padding: 8px 12px; background: var(--p-surface-0); border-radius: 8px; cursor: pointer;">
          <Avatar image="https://i.pravatar.cc/150?img=5" shape="circle" size="small" />
          <span style="font-size: 13px; font-weight: 500;">John Doe</span>
          <i class="pi pi-chevron-down" style="font-size: 12px; color: var(--p-text-muted-color);"></i>
        </div>

        <!-- Dropdown Menu (shown below for demo) -->
        <div style="width: 280px; margin-top: 8px; background: var(--p-surface-0); border-radius: 8px; box-shadow: 0 4px 16px rgba(0,0,0,0.1); overflow: hidden;">
          <!-- User Info -->
          <div style="padding: 16px; border-bottom: 1px solid var(--p-surface-border);">
            <div style="display: flex; align-items: center; gap: 12px;">
              <Avatar image="https://i.pravatar.cc/150?img=5" shape="circle" size="large" />
              <div>
                <p style="margin: 0; font-size: 14px; font-weight: 600;">John Doe</p>
                <p style="margin: 4px 0 0 0; font-size: 12px; color: var(--p-text-muted-color);">john.doe@example.com</p>
              </div>
            </div>
            <!-- Credit Balance -->
            <div style="display: flex; align-items: center; gap: 8px; margin-top: 12px; padding: 8px; background: var(--p-surface-50); border-radius: 6px;">
              <Tag severity="secondary" icon="pi pi-dollar" rounded style="padding: 4px; color: #fbbf24;" />
              <span style="font-size: 13px;">Balance:</span>
              <span style="font-size: 13px; font-weight: 600;">$25.50</span>
            </div>
          </div>
          <!-- Menu Items -->
          <div style="padding: 8px 0;">
            <div style="padding: 10px 16px; cursor: pointer; display: flex; align-items: center; gap: 12px;">
              <i class="pi pi-user" style="font-size: 14px; color: var(--p-text-muted-color);"></i>
              <span style="font-size: 13px;">Profile</span>
            </div>
            <div style="padding: 10px 16px; cursor: pointer; display: flex; align-items: center; gap: 12px;">
              <i class="pi pi-cog" style="font-size: 14px; color: var(--p-text-muted-color);"></i>
              <span style="font-size: 13px;">Settings</span>
            </div>
            <div style="padding: 10px 16px; cursor: pointer; display: flex; align-items: center; gap: 12px;">
              <i class="pi pi-credit-card" style="font-size: 14px; color: var(--p-text-muted-color);"></i>
              <span style="font-size: 13px;">Billing</span>
            </div>
            <div style="border-top: 1px solid var(--p-surface-border); margin: 8px 0;"></div>
            <div style="padding: 10px 16px; cursor: pointer; display: flex; align-items: center; gap: 12px; color: #ef4444;">
              <i class="pi pi-sign-out" style="font-size: 14px;"></i>
              <span style="font-size: 13px;">Sign Out</span>
            </div>
          </div>
        </div>
      </div>
    `
  }),
  parameters: {
    docs: {
      description: {
        story:
          'User menu dropdown pattern combining avatar, user info, and credit balance.'
      }
    }
  }
}

/**
 * Login button states for unauthenticated users.
 */
export const LoginButtonStates: Story = {
  render: () => ({
    components: { Avatar },
    template: `
      <div style="display: flex; gap: 16px; padding: 24px; background: var(--p-surface-0); border-radius: 8px;">
        <!-- Not Logged In -->
        <div style="text-align: center;">
          <button style="display: flex; align-items: center; gap: 8px; padding: 8px 16px; background: var(--p-primary-color); color: white; border: none; border-radius: 6px; cursor: pointer; font-size: 13px;">
            <i class="pi pi-sign-in"></i>
            Sign In
          </button>
          <p style="margin: 8px 0 0 0; font-size: 11px; color: var(--p-text-muted-color);">Not logged in</p>
        </div>

        <!-- Logging In -->
        <div style="text-align: center;">
          <button style="display: flex; align-items: center; gap: 8px; padding: 8px 16px; background: var(--p-primary-color); color: white; border: none; border-radius: 6px; cursor: not-allowed; font-size: 13px; opacity: 0.7;">
            <i class="pi pi-spinner pi-spin"></i>
            Signing In...
          </button>
          <p style="margin: 8px 0 0 0; font-size: 11px; color: var(--p-text-muted-color);">Loading</p>
        </div>

        <!-- Logged In -->
        <div style="text-align: center;">
          <div style="display: flex; align-items: center; gap: 8px; padding: 8px 12px; background: var(--p-surface-100); border-radius: 6px; cursor: pointer;">
            <Avatar image="https://i.pravatar.cc/150?img=5" shape="circle" size="small" />
            <span style="font-size: 13px;">John</span>
          </div>
          <p style="margin: 8px 0 0 0; font-size: 11px; color: var(--p-text-muted-color);">Logged in</p>
        </div>
      </div>
    `
  }),
  parameters: {
    docs: {
      description: {
        story:
          'Login button states: not authenticated, authenticating, and authenticated.'
      }
    }
  }
}

/**
 * Avatar group for showing multiple users.
 */
export const AvatarGroup: Story = {
  render: () => ({
    components: { Avatar },
    template: `
      <div style="padding: 24px; background: var(--p-surface-0); border-radius: 8px;">
        <p style="margin: 0 0 16px 0; font-size: 13px; color: var(--p-text-muted-color);">Contributors</p>
        <div style="display: flex; align-items: center;">
          <Avatar image="https://i.pravatar.cc/150?img=1" shape="circle" style="border: 2px solid var(--p-surface-0);" />
          <Avatar image="https://i.pravatar.cc/150?img=2" shape="circle" style="margin-left: -12px; border: 2px solid var(--p-surface-0);" />
          <Avatar image="https://i.pravatar.cc/150?img=3" shape="circle" style="margin-left: -12px; border: 2px solid var(--p-surface-0);" />
          <Avatar image="https://i.pravatar.cc/150?img=4" shape="circle" style="margin-left: -12px; border: 2px solid var(--p-surface-0);" />
          <Avatar label="+5" shape="circle" style="margin-left: -12px; border: 2px solid var(--p-surface-0); background: var(--p-surface-200); font-size: 11px;" />
        </div>
      </div>
    `
  }),
  parameters: {
    docs: {
      description: {
        story:
          'Stacked avatar group showing multiple users with overflow indicator.'
      }
    }
  }
}

/**
 * ComfyUI use cases for user components.
 */
export const ComfyUIUseCases: Story = {
  render: () => ({
    components: { Avatar, Tag, UserAvatar, Skeleton },
    template: `
      <div style="display: flex; flex-direction: column; gap: 32px; padding: 24px; background: var(--p-surface-100);">
        <!-- Topbar User Section -->
        <div>
          <h4 style="margin: 0 0 16px 0; font-size: 14px; font-weight: 600;">Topbar User Section</h4>
          <div style="display: flex; align-items: center; justify-content: flex-end; gap: 12px; padding: 12px 16px; background: var(--p-surface-0); border-radius: 8px;">
            <div style="display: flex; align-items: center; gap: 6px;">
              <Tag severity="secondary" icon="pi pi-dollar" rounded style="padding: 4px; color: #fbbf24;" />
              <span style="font-size: 13px;">$25.50</span>
            </div>
            <div style="width: 1px; height: 24px; background: var(--p-surface-border);"></div>
            <div style="display: flex; align-items: center; gap: 8px; cursor: pointer;">
              <UserAvatar photoUrl="https://i.pravatar.cc/150?img=5" />
              <i class="pi pi-chevron-down" style="font-size: 10px; color: var(--p-text-muted-color);"></i>
            </div>
          </div>
        </div>

        <!-- Workflow Author Card -->
        <div style="width: 300px;">
          <h4 style="margin: 0 0 16px 0; font-size: 14px; font-weight: 600;">Workflow Author</h4>
          <div style="background: var(--p-surface-0); padding: 16px; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
            <div style="display: flex; align-items: center; gap: 12px;">
              <Avatar image="https://i.pravatar.cc/150?img=8" shape="circle" size="large" />
              <div style="flex: 1;">
                <p style="margin: 0; font-size: 14px; font-weight: 600;">Creative AI</p>
                <p style="margin: 4px 0 0 0; font-size: 12px; color: var(--p-text-muted-color);">@creative_ai</p>
              </div>
              <button style="padding: 6px 12px; background: var(--p-primary-color); color: white; border: none; border-radius: 4px; font-size: 12px; cursor: pointer;">
                Follow
              </button>
            </div>
            <div style="display: flex; gap: 16px; margin-top: 12px; padding-top: 12px; border-top: 1px solid var(--p-surface-border);">
              <div>
                <p style="margin: 0; font-size: 14px; font-weight: 600;">152</p>
                <p style="margin: 2px 0 0 0; font-size: 11px; color: var(--p-text-muted-color);">Workflows</p>
              </div>
              <div>
                <p style="margin: 0; font-size: 14px; font-weight: 600;">12.4k</p>
                <p style="margin: 2px 0 0 0; font-size: 11px; color: var(--p-text-muted-color);">Followers</p>
              </div>
              <div>
                <p style="margin: 0; font-size: 14px; font-weight: 600;">98%</p>
                <p style="margin: 2px 0 0 0; font-size: 11px; color: var(--p-text-muted-color);">Rating</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Comment Section -->
        <div style="width: 400px;">
          <h4 style="margin: 0 0 16px 0; font-size: 14px; font-weight: 600;">Comments</h4>
          <div style="background: var(--p-surface-0); padding: 16px; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
            <div style="display: flex; gap: 12px; margin-bottom: 16px;">
              <Avatar image="https://i.pravatar.cc/150?img=10" shape="circle" />
              <div style="flex: 1;">
                <div style="display: flex; align-items: center; gap: 8px;">
                  <span style="font-size: 13px; font-weight: 600;">Alex Smith</span>
                  <span style="font-size: 11px; color: var(--p-text-muted-color);">2 hours ago</span>
                </div>
                <p style="margin: 4px 0 0 0; font-size: 13px; line-height: 1.5;">
                  This workflow is amazing! Got great results with the SDXL model.
                </p>
              </div>
            </div>
            <div style="display: flex; gap: 12px;">
              <Avatar image="https://i.pravatar.cc/150?img=11" shape="circle" />
              <div style="flex: 1;">
                <div style="display: flex; align-items: center; gap: 8px;">
                  <span style="font-size: 13px; font-weight: 600;">Maria Garcia</span>
                  <span style="font-size: 11px; color: var(--p-text-muted-color);">5 hours ago</span>
                </div>
                <p style="margin: 4px 0 0 0; font-size: 13px; line-height: 1.5;">
                  Thanks for sharing! Quick question - what CFG scale do you recommend?
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Account Settings -->
        <div style="width: 350px;">
          <h4 style="margin: 0 0 16px 0; font-size: 14px; font-weight: 600;">Account Settings</h4>
          <div style="background: var(--p-surface-0); padding: 20px; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
            <div style="display: flex; flex-direction: column; align-items: center; gap: 12px; margin-bottom: 20px;">
              <div style="position: relative;">
                <Avatar image="https://i.pravatar.cc/150?img=5" shape="circle" size="xlarge" />
                <button style="position: absolute; bottom: 0; right: 0; width: 28px; height: 28px; background: var(--p-primary-color); color: white; border: 2px solid var(--p-surface-0); border-radius: 50%; cursor: pointer; display: flex; align-items: center; justify-content: center;">
                  <i class="pi pi-camera" style="font-size: 12px;"></i>
                </button>
              </div>
              <div style="text-align: center;">
                <p style="margin: 0; font-size: 16px; font-weight: 600;">John Doe</p>
                <p style="margin: 4px 0 0 0; font-size: 13px; color: var(--p-text-muted-color);">john.doe@example.com</p>
              </div>
            </div>
            <button style="width: 100%; padding: 10px; background: transparent; border: 1px solid var(--p-surface-border); border-radius: 6px; cursor: pointer; font-size: 13px;">
              Edit Profile
            </button>
          </div>
        </div>
      </div>
    `
  }),
  parameters: {
    docs: {
      description: {
        story:
          'Real-world usage: topbar user section, workflow author cards, comments, and account settings.'
      }
    }
  }
}

/**
 * Dark theme visualization of user components.
 */
export const DarkTheme: Story = {
  render: () => ({
    components: { Avatar, Tag, UserAvatar },
    template: `
      <div class="dark" style="padding: 24px; background: #1a1a1a; border-radius: 8px;">
        <div style="display: flex; gap: 24px; flex-wrap: wrap;">
          <!-- User Card -->
          <div style="width: 280px; padding: 16px; background: #2a2a2a; border-radius: 8px;">
            <div style="display: flex; align-items: center; gap: 12px;">
              <UserAvatar photoUrl="https://i.pravatar.cc/150?img=5" />
              <div>
                <p style="margin: 0; font-size: 14px; font-weight: 500; color: #e5e5e5;">John Doe</p>
                <p style="margin: 4px 0 0 0; font-size: 12px; color: #888;">john@example.com</p>
              </div>
            </div>
          </div>

          <!-- Credit Display -->
          <div style="padding: 16px; background: #2a2a2a; border-radius: 8px;">
            <div style="display: flex; align-items: center; gap: 8px;">
              <Tag severity="secondary" icon="pi pi-dollar" rounded style="padding: 4px; color: #fbbf24;" />
              <span style="font-size: 14px; font-weight: 500; color: #e5e5e5;">$25.50</span>
            </div>
          </div>

          <!-- Avatar Group -->
          <div style="padding: 16px; background: #2a2a2a; border-radius: 8px;">
            <p style="margin: 0 0 12px 0; font-size: 12px; color: #888;">Team</p>
            <div style="display: flex; align-items: center;">
              <Avatar image="https://i.pravatar.cc/150?img=1" shape="circle" style="border: 2px solid #2a2a2a;" />
              <Avatar image="https://i.pravatar.cc/150?img=2" shape="circle" style="margin-left: -10px; border: 2px solid #2a2a2a;" />
              <Avatar image="https://i.pravatar.cc/150?img=3" shape="circle" style="margin-left: -10px; border: 2px solid #2a2a2a;" />
            </div>
          </div>
        </div>
      </div>
    `
  }),
  parameters: {
    docs: {
      description: {
        story: 'User components rendered in dark theme context.'
      }
    }
  }
}
