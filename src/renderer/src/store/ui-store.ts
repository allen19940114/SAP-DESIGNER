import { create } from 'zustand'

interface Toast {
  id: number
  message: string
  type: 'success' | 'error' | 'info'
}

interface UIState {
  leftPanelOpen: boolean
  rightPanelOpen: boolean
  leftPanelTab: 'components' | 'templates'
  rightPanelTab: 'properties' | 'fieldTable'
  activeTool: 'select' | 'pan'
  isScreenshotMode: boolean
  toasts: Toast[]

  toggleLeftPanel: () => void
  toggleRightPanel: () => void
  setLeftPanelTab: (tab: 'components' | 'templates') => void
  setRightPanelTab: (tab: 'properties' | 'fieldTable') => void
  setActiveTool: (tool: 'select' | 'pan') => void
  setScreenshotMode: (on: boolean) => void
  showToast: (message: string, type?: 'success' | 'error' | 'info') => void
  removeToast: (id: number) => void
}

let toastId = 0

export const useUIStore = create<UIState>()((set) => ({
  leftPanelOpen: true,
  rightPanelOpen: true,
  leftPanelTab: 'components',
  rightPanelTab: 'properties',
  activeTool: 'select',
  isScreenshotMode: false,
  toasts: [],

  toggleLeftPanel: () => set((s) => ({ leftPanelOpen: !s.leftPanelOpen })),
  toggleRightPanel: () => set((s) => ({ rightPanelOpen: !s.rightPanelOpen })),
  setLeftPanelTab: (tab) => set({ leftPanelTab: tab }),
  setRightPanelTab: (tab) => set({ rightPanelTab: tab }),
  setActiveTool: (tool) => set({ activeTool: tool }),
  setScreenshotMode: (on) => set({ isScreenshotMode: on }),
  showToast: (message, type = 'success') => {
    const id = ++toastId
    set((s) => ({ toasts: [...s.toasts, { id, message, type }] }))
    setTimeout(() => {
      set((s) => ({ toasts: s.toasts.filter((t) => t.id !== id) }))
    }, 2500)
  },
  removeToast: (id) => set((s) => ({ toasts: s.toasts.filter((t) => t.id !== id) }))
}))
