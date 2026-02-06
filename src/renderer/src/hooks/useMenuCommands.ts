import { useEffect } from 'react'
import { useCanvasStore } from '@/store/canvas-store'
import { useHistoryStore } from '@/store/history-store'
import { useScreenshot } from './useScreenshot'

export function useMenuCommands(): void {
  const { capture } = useScreenshot()

  useEffect(() => {
    if (!window.electronAPI?.onMenuCommand) return

    const cleanup = window.electronAPI.onMenuCommand((command: string) => {
      const store = useCanvasStore.getState()
      const historyStore = useHistoryStore.getState()

      switch (command) {
        case 'menu:new-project':
          historyStore.pushSnapshot({ elements: store.elements, elementOrder: store.elementOrder })
          store.clearCanvas()
          break

        case 'menu:open':
          handleOpen()
          break

        case 'menu:save':
          handleSave()
          break

        case 'menu:save-as':
          handleSaveAs()
          break

        case 'menu:screenshot': {
          const canvasEl = document.getElementById('sap-designer-canvas')
          if (canvasEl) capture(canvasEl)
          break
        }

        case 'menu:export-csv': {
          const fieldTableTab = document.querySelector('[data-tab="fieldTable"]')
          if (fieldTableTab) (fieldTableTab as HTMLElement).click()
          break
        }

        case 'menu:undo': {
          const snapshot = historyStore.undo({ elements: store.elements, elementOrder: store.elementOrder })
          if (snapshot) {
            store.loadFromTemplate(snapshot.elementOrder.map((id) => snapshot.elements[id]).filter(Boolean))
          }
          break
        }

        case 'menu:redo': {
          const snapshot = historyStore.redo({ elements: store.elements, elementOrder: store.elementOrder })
          if (snapshot) {
            store.loadFromTemplate(snapshot.elementOrder.map((id) => snapshot.elements[id]).filter(Boolean))
          }
          break
        }

        case 'menu:select-all':
          store.selectAll()
          break

        case 'menu:duplicate':
          if (store.selectedElementIds.length > 0) {
            historyStore.pushSnapshot({ elements: store.elements, elementOrder: store.elementOrder })
            store.duplicateElements(store.selectedElementIds)
          }
          break

        case 'menu:delete':
          if (store.selectedElementIds.length > 0 && !store.editingElementId) {
            historyStore.pushSnapshot({ elements: store.elements, elementOrder: store.elementOrder })
            store.removeElements(store.selectedElementIds)
          }
          break

        case 'menu:zoom-in':
          store.setZoom(store.zoom + 0.1)
          break

        case 'menu:zoom-out':
          store.setZoom(store.zoom - 0.1)
          break

        case 'menu:zoom-reset':
          store.setZoom(1)
          break

        case 'menu:center-view':
          store.setPanOffset({ x: 0, y: 0 })
          break

        case 'menu:toggle-grid':
          store.setGridVisible(!store.gridVisible)
          break

        case 'menu:toggle-snap':
          store.setSnapToGrid(!store.snapToGrid)
          break
      }
    })

    return cleanup
  }, [capture])
}

async function handleOpen(): Promise<void> {
  const result = await window.electronAPI?.openProject()
  if (result) {
    const data = JSON.parse(result)
    useCanvasStore.getState().loadProject(data)
    useHistoryStore.getState().clear()
  }
}

async function handleSave(): Promise<void> {
  const data = useCanvasStore.getState().getProjectData()
  await window.electronAPI?.saveProject(JSON.stringify(data))
}

async function handleSaveAs(): Promise<void> {
  const data = useCanvasStore.getState().getProjectData()
  await window.electronAPI?.saveProjectAs(JSON.stringify(data))
}
