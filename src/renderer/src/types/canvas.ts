import type { ComponentType } from './component'

export interface Position {
  x: number
  y: number
}

export interface Size {
  width: number
  height: number
}

export interface Rect extends Position, Size {}

export interface ElementStyle {
  fontSize: number
  fontWeight: 'normal' | 'bold' | '300' | '500' | '700'
  fontColor: string
  backgroundColor: string
  borderColor: string
  borderWidth: number
  borderRadius: number
  borderStyle: 'solid' | 'dashed' | 'none'
  opacity: number
  textAlign: 'left' | 'center' | 'right'
  padding: number
}

export interface FieldMeta {
  fieldId: string
  technicalField: string
  description: string
  fieldType: string
  abapType: string
  length: string
  sample: string
  logic: string
  remarks: string
}

export interface CanvasElement {
  id: string
  type: ComponentType
  x: number
  y: number
  width: number
  height: number
  rotation: number
  label: string
  value: string
  visible: boolean
  locked: boolean
  style: ElementStyle
  props: Record<string, unknown>
  fieldMeta: FieldMeta
}

export type CanvasBackground = 'white' | 'sapLightBlue' | 'black' | 'lightBlue' | 'blueGreenGradient'

export interface CanvasSnapshot {
  elements: Record<string, CanvasElement>
  elementOrder: string[]
}

export interface ProjectData {
  version: string
  canvasWidth: number
  canvasHeight: number
  canvasBackground: CanvasBackground
  gridVisible: boolean
  gridSize: number
  snapToGrid: boolean
  elements: Record<string, CanvasElement>
  elementOrder: string[]
}

export const defaultElementStyle: ElementStyle = {
  fontSize: 14,
  fontWeight: 'normal',
  fontColor: '#1d2d3e',
  backgroundColor: '#ffffff',
  borderColor: '#bcc3ca',
  borderWidth: 1,
  borderRadius: 8,
  borderStyle: 'solid',
  opacity: 1,
  textAlign: 'left',
  padding: 8
}

export const defaultFieldMeta: FieldMeta = {
  fieldId: '',
  technicalField: '',
  description: '',
  fieldType: '',
  abapType: '',
  length: '',
  sample: '',
  logic: '',
  remarks: ''
}
