import React from 'react'
import { AppShell } from './components/layout/AppShell'
import { useKeyboardShortcuts } from './hooks/useKeyboardShortcuts'

// Initialize component registry (side effect import)
import './sap-components/index'

const App: React.FC = () => {
  useKeyboardShortcuts()

  return <AppShell />
}

export default App
