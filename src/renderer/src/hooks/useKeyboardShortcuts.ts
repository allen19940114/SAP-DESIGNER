import { useEffect } from 'react'
import { useCanvasStore } from '@/store/canvas-store'
import { useHistoryStore } from '@/store/history-store'

export function useKeyboardShortcuts(): void {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const isMod = e.metaKey || e.ctrlKey
      const store = useCanvasStore.getState()
      const historyStore = useHistoryStore.getState()

      // Delete
      if (e.key === 'Delete' || e.key === 'Backspace') {
        if (store.editingElementId) return // Don't delete while editing text
        if (store.selectedElementIds.length > 0) {
          e.preventDefault()
          historyStore.pushSnapshot({ elements: store.elements, elementOrder: store.elementOrder })
          store.removeElements(store.selectedElementIds)
        }
        return
      }

      if (!isMod) return

      switch (e.key.toLowerCase()) {
        case 'a':
          // Select all
          e.preventDefault()
          store.selectAll()
          break

        case 'c':
          // Copy - store element data in session
          if (store.selectedElementIds.length > 0) {
            e.preventDefault()
            const elements = store.selectedElementIds
              .map((id) => store.elements[id])
              .filter(Boolean)
            sessionStorage.setItem('sap-designer-clipboard', JSON.stringify(elements))
          }
          break

        case 'v': {
          // Paste
          e.preventDefault()
          const clipData = sessionStorage.getItem('sap-designer-clipboard')
          if (clipData) {
            historyStore.pushSnapshot({ elements: store.elements, elementOrder: store.elementOrder })
            const elements = JSON.parse(clipData)
            const newIds = store.duplicateElements(
              elements.map((el: { id: string }) => el.id)
            )
            // If duplicate didn't find elements (they were deleted), re-add them
            if (newIds.length === 0) {
              for (const el of elements) {
                store.addElement(el.type, { x: el.x + 20, y: el.y + 20 })
              }
            }
          }
          break
        }

        case 'd':
          // Duplicate
          if (store.selectedElementIds.length > 0) {
            e.preventDefault()
            historyStore.pushSnapshot({ elements: store.elements, elementOrder: store.elementOrder })
            store.duplicateElements(store.selectedElementIds)
          }
          break

        case 's':
          // Save / Save As
          e.preventDefault()
          if (e.shiftKey) {
            const dataAs = store.getProjectData()
            window.electronAPI?.saveProjectAs(JSON.stringify(dataAs))
          } else {
            const dataSave = store.getProjectData()
            window.electronAPI?.saveProject(JSON.stringify(dataSave))
          }
          break

        case 'o':
          // Open
          e.preventDefault()
          window.electronAPI?.openProject().then((result: string | null) => {
            if (result) {
              const data = JSON.parse(result)
              useCanvasStore.getState().loadProject(data)
              useHistoryStore.getState().clear()
            }
          })
          break

        case 'z':
          // Undo / Redo
          e.preventDefault()
          if (e.shiftKey) {
            // Redo
            const snapshot = historyStore.redo({ elements: store.elements, elementOrder: store.elementOrder })
            if (snapshot) {
              store.loadFromTemplate(snapshot.elementOrder.map((id) => snapshot.elements[id]).filter(Boolean))
            }
          } else {
            // Undo
            const snapshot = historyStore.undo({ elements: store.elements, elementOrder: store.elementOrder })
            if (snapshot) {
              store.loadFromTemplate(snapshot.elementOrder.map((id) => snapshot.elements[id]).filter(Boolean))
            }
          }
          break
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])
}
