import type { CanvasElement } from './canvas'

export interface Template {
  id: string
  name: string
  description: string
  category: TemplateCategory
  thumbnail: string
  elements: CanvasElement[]
  canvasWidth?: number
  canvasHeight?: number
  isCustom?: boolean
}

export type TemplateCategory = 'selection-screen' | 'alv-report' | 'interface-diagram' | 'screen-enhancement' | 'custom'
