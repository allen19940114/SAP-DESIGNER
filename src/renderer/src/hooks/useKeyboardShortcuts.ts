import { useEffect } from 'react'
import { useCanvasStore } from '@/store/canvas-store'

export function useKeyboardShortcuts(): void {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const isMod = e.metaKey || e.ctrlKey
      const store = useCanvasStore.getState()

      // Delete
      if (e.key === 'Delete' || e.key === 'Backspace') {
        if (store.editingElementId) return // Don't delete while editing text
        if (store.selectedElementIds.length > 0) {
          e.preventDefault()
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
          // Duplicate / Delete
          if (store.selectedElementIds.length > 0) {
            e.preventDefault()
            store.duplicateElements(store.selectedElementIds)
          }
          break

        case 'z':
          // Undo / Redo
          e.preventDefault()
          // TODO: implement with history store
          break
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])
}
