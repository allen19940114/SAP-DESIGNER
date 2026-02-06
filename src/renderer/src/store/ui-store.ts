import { create } from 'zustand'

interface UIState {
  leftPanelOpen: boolean
  rightPanelOpen: boolean
  leftPanelTab: 'components' | 'templates'
  rightPanelTab: 'properties' | 'fieldTable'
  activeTool: 'select' | 'pan'
  isScreenshotMode: boolean

  toggleLeftPanel: () => void
  toggleRightPanel: () => void
  setLeftPanelTab: (tab: 'components' | 'templates') => void
  setRightPanelTab: (tab: 'properties' | 'fieldTable') => void
  setActiveTool: (tool: 'select' | 'pan') => void
  setScreenshotMode: (on: boolean) => void
}

export const useUIStore = create<UIState>()((set) => ({
  leftPanelOpen: true,
  rightPanelOpen: true,
  leftPanelTab: 'components',
  rightPanelTab: 'properties',
  activeTool: 'select',
  isScreenshotMode: false,

  toggleLeftPanel: () => set((s) => ({ leftPanelOpen: !s.leftPanelOpen })),
  toggleRightPanel: () => set((s) => ({ rightPanelOpen: !s.rightPanelOpen })),
  setLeftPanelTab: (tab) => set({ leftPanelTab: tab }),
  setRightPanelTab: (tab) => set({ rightPanelTab: tab }),
  setActiveTool: (tool) => set({ activeTool: tool }),
  setScreenshotMode: (on) => set({ isScreenshotMode: on })
}))
