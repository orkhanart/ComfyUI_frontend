import {
  createRouter,
  createWebHashHistory,
  createWebHistory
} from 'vue-router'

import { isElectron } from '@desktop/utils/envUtil'
import LayoutDefault from '@desktop/views/layouts/LayoutDefault.vue'

const isFileProtocol = window.location.protocol === 'file:'
const basePath = isElectron() ? '/' : window.location.pathname

const router = createRouter({
  history: isFileProtocol ? createWebHashHistory() : createWebHistory(basePath),
  routes: [
    {
      path: '/',
      component: LayoutDefault,
      children: [
        {
          path: '',
          name: 'WelcomeView',
          component: () => import('@desktop/views/WelcomeView.vue')
        },
        {
          path: 'welcome',
          name: 'WelcomeViewAlias',
          component: () => import('@desktop/views/WelcomeView.vue')
        },
        {
          path: 'install',
          name: 'InstallView',
          component: () => import('@desktop/views/InstallView.vue')
        },
        {
          path: 'download-git',
          name: 'DownloadGitView',
          component: () => import('@desktop/views/DownloadGitView.vue')
        },
        {
          path: 'desktop-start',
          name: 'DesktopStartView',
          component: () => import('@desktop/views/DesktopStartView.vue')
        },
        {
          path: 'desktop-update',
          name: 'DesktopUpdateView',
          component: () => import('@desktop/views/DesktopUpdateView.vue')
        },
        {
          path: 'server-start',
          name: 'ServerStartView',
          component: () => import('@desktop/views/ServerStartView.vue')
        },
        {
          path: 'manual-configuration',
          name: 'ManualConfigurationView',
          component: () => import('@desktop/views/ManualConfigurationView.vue')
        },
        {
          path: 'metrics-consent',
          name: 'MetricsConsentView',
          component: () => import('@desktop/views/MetricsConsentView.vue')
        },
        {
          path: 'maintenance',
          name: 'MaintenanceView',
          component: () => import('@desktop/views/MaintenanceView.vue')
        },
        {
          path: 'not-supported',
          name: 'NotSupportedView',
          component: () => import('@desktop/views/NotSupportedView.vue')
        },
        {
          path: 'desktop-dialog/:dialogId',
          name: 'DesktopDialogView',
          component: () => import('@desktop/views/DesktopDialogView.vue')
        }
      ]
    }
  ],
  scrollBehavior(_to, _from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }

    return { top: 0 }
  }
})

export default router
