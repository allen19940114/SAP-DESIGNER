import { create } from 'zustand'
import { v4 as uuid } from 'uuid'
import type { Template } from '@/types/template'
import type { CanvasElement } from '@/types/canvas'

interface TemplateState {
  customTemplates: Template[]
  loaded: boolean

  loadCustomTemplates: () => Promise<void>
  saveAsTemplate: (name: string, description: string, elements: CanvasElement[], canvasWidth: number, canvasHeight: number) => Promise<void>
  deleteCustomTemplate: (id: string) => Promise<void>
}

export const useTemplateStore = create<TemplateState>()((set, get) => ({
  customTemplates: [],
  loaded: false,

  loadCustomTemplates: async () => {
    const data = await window.electronAPI?.loadCustomTemplates()
    if (data) {
      try {
        const templates = JSON.parse(data) as Template[]
        set({ customTemplates: templates, loaded: true })
      } catch {
        set({ loaded: true })
      }
    } else {
      set({ loaded: true })
    }
  },

  saveAsTemplate: async (name, description, elements, canvasWidth, canvasHeight) => {
    const template: Template = {
      id: uuid(),
      name,
      description,
      category: 'custom',
      thumbnail: '',
      elements: JSON.parse(JSON.stringify(elements)),
      canvasWidth,
      canvasHeight,
      isCustom: true
    }
    const updated = [...get().customTemplates, template]
    set({ customTemplates: updated })
    await window.electronAPI?.saveCustomTemplates(JSON.stringify(updated))
  },

  deleteCustomTemplate: async (id) => {
    const updated = get().customTemplates.filter((t) => t.id !== id)
    set({ customTemplates: updated })
    await window.electronAPI?.saveCustomTemplates(JSON.stringify(updated))
  }
}))
