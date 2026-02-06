import React, { useEffect } from 'react'
import { AppShell } from './components/layout/AppShell'
import { ToastContainer } from './components/shared/Toast'
import { useKeyboardShortcuts } from './hooks/useKeyboardShortcuts'
import { useAutoSave } from './hooks/useAutoSave'
import { useMenuCommands } from './hooks/useMenuCommands'
import { useCanvasStore } from './store/canvas-store'
import { useTemplateStore } from './store/template-store'

// Initialize component registry (side effect import)
import './sap-components/index'

// Initialize i18n
import './i18n/config'

const App: React.FC = () => {
  useKeyboardShortcuts()
  useAutoSave()
  useMenuCommands()

  // Load saved project and custom templates on startup
  useEffect(() => {
    async function loadOnStartup() {
      const saved = await window.electronAPI?.loadProject()
      if (saved) {
        try {
          const data = JSON.parse(saved)
          useCanvasStore.getState().loadProject(data)
        } catch {
          // Ignore invalid saved data
        }
      }
      await useTemplateStore.getState().loadCustomTemplates()
    }
    loadOnStartup()
  }, [])

  return (
    <>
      <AppShell />
      <ToastContainer />
    </>
  )
}

export default App
