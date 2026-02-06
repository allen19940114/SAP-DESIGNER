import type { ReactNode } from 'react'
import type { CanvasElement, ElementStyle, FieldMeta, Size } from './canvas'

export enum ComponentType {
  // Basic
  Button = 'sap-button',
  Text = 'sap-text',
  Icon = 'sap-icon',
  // Input
  Input = 'sap-input',
  RangeInput = 'sap-range-input',
  Dropdown = 'sap-dropdown',
  SearchBox = 'sap-search-box',
  TextArea = 'sap-text-area',
  Checkbox = 'sap-checkbox',
  RadioButton = 'sap-radio-button',
  Switch = 'sap-switch',
  // Layout
  Card = 'sap-card',
  Table = 'sap-table',
  Form = 'sap-form',
  Section = 'sap-section',
  Tab = 'sap-tab',
  GroupBox = 'sap-group-box',
  Toolbar = 'sap-toolbar',
  // Flow
  ProcessBox = 'sap-process-box',
  Banner = 'sap-banner',
  ArrowRight = 'sap-arrow-right',
  ArrowLeft = 'sap-arrow-left',
  ArrowUp = 'sap-arrow-up',
  ArrowDown = 'sap-arrow-down',
  Rectangle = 'sap-rectangle',
  Diamond = 'sap-diamond',
  Terminator = 'sap-terminator',
  Line = 'sap-line',
  DashedLine = 'sap-dashed-line',
  Polyline = 'sap-polyline',
  PolylineArrow = 'sap-polyline-arrow',
  DashedArrow = 'sap-dashed-arrow'
}

export type ComponentCategory = 'basic' | 'input' | 'layout' | 'flow'

export interface SAPComponentRenderProps {
  element: CanvasElement
  isSelected: boolean
  isEditing: boolean
  onLabelChange?: (newLabel: string) => void
}

export interface PropertyFieldDefinition {
  key: string
  label: string
  type: 'text' | 'number' | 'select' | 'color' | 'boolean'
  options?: { value: string; label: string }[]
  min?: number
  max?: number
}

export interface SAPComponentDefinition {
  type: ComponentType
  displayName: string
  category: ComponentCategory
  icon: string
  thumbnail: () => ReactNode
  defaultSize: Size
  defaultProps: Record<string, unknown>
  defaultStyle: Partial<ElementStyle>
  renderComponent: React.FC<SAPComponentRenderProps>
  propertyFields: PropertyFieldDefinition[]
  defaultFieldMeta: Partial<FieldMeta>
}
