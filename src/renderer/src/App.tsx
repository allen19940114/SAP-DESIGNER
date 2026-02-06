import React, { useEffect } from 'react'
import { AppShell } from './components/layout/AppShell'
import { useKeyboardShortcuts } from './hooks/useKeyboardShortcuts'
import { useAutoSave } from './hooks/useAutoSave'
import { useMenuCommands } from './hooks/useMenuCommands'
import { useCanvasStore } from './store/canvas-store'

// Initialize component registry (side effect import)
import './sap-components/index'

// Initialize i18n
import './i18n/config'

const App: React.FC = () => {
  useKeyboardShortcuts()
  useAutoSave()
  useMenuCommands()

  // Load saved project on startup
  useEffect(() => {
    async function loadSavedProject() {
      const saved = await window.electronAPI?.loadProject()
      if (saved) {
        try {
          const data = JSON.parse(saved)
          useCanvasStore.getState().loadProject(data)
        } catch {
          // Ignore invalid saved data
        }
      }
    }
    loadSavedProject()
  }, [])

  return <AppShell />
}

export default App
