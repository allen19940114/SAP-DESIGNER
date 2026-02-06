import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'
import type { CanvasElement, CanvasBackground, Position, ProjectData, ElementStyle } from '@/types/canvas'
import { defaultElementStyle, defaultFieldMeta } from '@/types/canvas'
import type { ComponentType } from '@/types/component'
import { generateId, generateFieldId } from '@/utils/id-generator'
import { componentRegistry } from '@/sap-components/registry'

interface CanvasState {
  // Canvas settings
  canvasWidth: number
  canvasHeight: number
  canvasBackground: CanvasBackground
  gridVisible: boolean
  gridSize: number
  snapToGrid: boolean
  zoom: number
  panOffset: Position

  // Elements
  elements: Record<string, CanvasElement>
  elementOrder: string[]

  // Selection
  selectedElementIds: string[]
  hoveredElementId: string | null

  // Editing
  editingElementId: string | null

  // Actions
  addElement: (type: ComponentType, position: Position) => string
  updateElement: (id: string, changes: Partial<CanvasElement>) => void
  updateElementStyle: (id: string, styleChanges: Partial<ElementStyle>) => void
  removeElements: (ids: string[]) => void
  setSelection: (ids: string[]) => void
  addToSelection: (id: string) => void
  clearSelection: () => void
  moveElements: (ids: string[], delta: Position) => void
  resizeElement: (id: string, x: number, y: number, width: number, height: number) => void
  bringToFront: (ids: string[]) => void
  sendToBack: (ids: string[]) => void
  duplicateElements: (ids: string[]) => string[]
  selectAll: () => void
  setEditingElement: (id: string | null) => void
  setHoveredElement: (id: string | null) => void

  // Canvas settings actions
  setCanvasSize: (width: number, height: number) => void
  setCanvasBackground: (bg: CanvasBackground) => void
  setGridVisible: (visible: boolean) => void
  setGridSize: (size: number) => void
  setSnapToGrid: (snap: boolean) => void
  setZoom: (zoom: number) => void
  setPanOffset: (offset: Position) => void

  // Bulk operations
  loadFromTemplate: (elements: CanvasElement[]) => void
  loadProject: (data: ProjectData) => void
  getProjectData: () => ProjectData
  clearCanvas: () => void
}

export const useCanvasStore = create<CanvasState>()(
  immer((set, get) => ({
    // Canvas settings defaults
    canvasWidth: 1440,
    canvasHeight: 900,
    canvasBackground: 'white',
    gridVisible: true,
    gridSize: 10,
    snapToGrid: true,
    zoom: 1,
    panOffset: { x: 0, y: 0 },

    // Elements
    elements: {},
    elementOrder: [],

    // Selection
    selectedElementIds: [],
    hoveredElementId: null,
    editingElementId: null,

    // Actions
    addElement: (type, position) => {
      const id = generateId()
      const definition = componentRegistry.get(type)
      const elementCount = Object.keys(get().elements).length

      const element: CanvasElement = {
        id,
        type,
        x: position.x,
        y: position.y,
        width: definition.defaultSize.width,
        height: definition.defaultSize.height,
        rotation: 0,
        label: definition.displayName,
        value: '',
        visible: true,
        locked: false,
        style: { ...defaultElementStyle, ...definition.defaultStyle },
        props: { ...definition.defaultProps },
        fieldMeta: {
          ...defaultFieldMeta,
          fieldId: generateFieldId(elementCount),
          description: definition.displayName,
          ...definition.defaultFieldMeta
        }
      }

      set((state) => {
        state.elements[id] = element
        state.elementOrder.push(id)
        state.selectedElementIds = [id]
      })

      return id
    },

    updateElement: (id, changes) => {
      set((state) => {
        if (state.elements[id]) {
          Object.assign(state.elements[id], changes)
        }
      })
    },

    updateElementStyle: (id, styleChanges) => {
      set((state) => {
        if (state.elements[id]) {
          Object.assign(state.elements[id].style, styleChanges)
        }
      })
    },

    removeElements: (ids) => {
      set((state) => {
        for (const id of ids) {
          delete state.elements[id]
        }
        state.elementOrder = state.elementOrder.filter((id) => !ids.includes(id))
        state.selectedElementIds = state.selectedElementIds.filter((id) => !ids.includes(id))
        if (state.editingElementId && ids.includes(state.editingElementId)) {
          state.editingElementId = null
        }
      })
    },

    setSelection: (ids) => {
      set((state) => {
        state.selectedElementIds = ids
        state.editingElementId = null
      })
    },

    addToSelection: (id) => {
      set((state) => {
        if (!state.selectedElementIds.includes(id)) {
          state.selectedElementIds.push(id)
        }
      })
    },

    clearSelection: () => {
      set((state) => {
        state.selectedElementIds = []
        state.editingElementId = null
      })
    },

    moveElements: (ids, delta) => {
      set((state) => {
        for (const id of ids) {
          const el = state.elements[id]
          if (el && !el.locked) {
            el.x += delta.x
            el.y += delta.y
          }
        }
      })
    },

    resizeElement: (id, x, y, width, height) => {
      set((state) => {
        const el = state.elements[id]
        if (el && !el.locked) {
          el.x = x
          el.y = y
          el.width = Math.max(20, width)
          el.height = Math.max(20, height)
        }
      })
    },

    bringToFront: (ids) => {
      set((state) => {
        const rest = state.elementOrder.filter((id) => !ids.includes(id))
        state.elementOrder = [...rest, ...ids]
      })
    },

    sendToBack: (ids) => {
      set((state) => {
        const rest = state.elementOrder.filter((id) => !ids.includes(id))
        state.elementOrder = [...ids, ...rest]
      })
    },

    duplicateElements: (ids) => {
      const newIds: string[] = []
      set((state) => {
        for (const id of ids) {
          const original = state.elements[id]
          if (original) {
            const newId = generateId()
            const elementCount = Object.keys(state.elements).length
            state.elements[newId] = {
              ...JSON.parse(JSON.stringify(original)),
              id: newId,
              x: original.x + 20,
              y: original.y + 20,
              fieldMeta: {
                ...original.fieldMeta,
                fieldId: generateFieldId(elementCount)
              }
            }
            state.elementOrder.push(newId)
            newIds.push(newId)
          }
        }
        state.selectedElementIds = newIds
      })
      return newIds
    },

    selectAll: () => {
      set((state) => {
        state.selectedElementIds = [...state.elementOrder]
      })
    },

    setEditingElement: (id) => {
      set((state) => {
        state.editingElementId = id
      })
    },

    setHoveredElement: (id) => {
      set((state) => {
        state.hoveredElementId = id
      })
    },

    // Canvas settings
    setCanvasSize: (width, height) => {
      set((state) => {
        state.canvasWidth = width
        state.canvasHeight = height
      })
    },

    setCanvasBackground: (bg) => {
      set((state) => {
        state.canvasBackground = bg
      })
    },

    setGridVisible: (visible) => {
      set((state) => {
        state.gridVisible = visible
      })
    },

    setGridSize: (size) => {
      set((state) => {
        state.gridSize = size
      })
    },

    setSnapToGrid: (snap) => {
      set((state) => {
        state.snapToGrid = snap
      })
    },

    setZoom: (zoom) => {
      set((state) => {
        state.zoom = Math.max(0.25, Math.min(4, zoom))
      })
    },

    setPanOffset: (offset) => {
      set((state) => {
        state.panOffset = offset
      })
    },

    // Bulk operations
    loadFromTemplate: (elements) => {
      set((state) => {
        state.elements = {}
        state.elementOrder = []
        state.selectedElementIds = []
        state.editingElementId = null
        for (const el of elements) {
          state.elements[el.id] = el
          state.elementOrder.push(el.id)
        }
      })
    },

    loadProject: (data) => {
      set((state) => {
        state.canvasWidth = data.canvasWidth
        state.canvasHeight = data.canvasHeight
        state.canvasBackground = data.canvasBackground
        state.gridVisible = data.gridVisible
        state.gridSize = data.gridSize
        state.snapToGrid = data.snapToGrid
        state.elements = data.elements
        state.elementOrder = data.elementOrder
        state.selectedElementIds = []
        state.editingElementId = null
      })
    },

    getProjectData: () => {
      const state = get()
      return {
        version: '1.0.0',
        canvasWidth: state.canvasWidth,
        canvasHeight: state.canvasHeight,
        canvasBackground: state.canvasBackground,
        gridVisible: state.gridVisible,
        gridSize: state.gridSize,
        snapToGrid: state.snapToGrid,
        elements: state.elements,
        elementOrder: state.elementOrder
      }
    },

    clearCanvas: () => {
      set((state) => {
        state.elements = {}
        state.elementOrder = []
        state.selectedElementIds = []
        state.editingElementId = null
      })
    }
  }))
)
