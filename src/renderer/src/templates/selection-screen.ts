import { v4 as uuid } from 'uuid'
import { ComponentType } from '@/types/component'
import type { CanvasElement } from '@/types/canvas'
import { defaultElementStyle, defaultFieldMeta } from '@/types/canvas'

export function createSelectionScreenTemplate(): CanvasElement[] {
  let fieldIndex = 0
  const el = (type: ComponentType, x: number, y: number, w: number, h: number, label: string, props: Record<string, unknown> = {}, styleOverrides: Record<string, unknown> = {}): CanvasElement => ({
    id: uuid(), type, x, y, width: w, height: h, rotation: 0, label, value: '', visible: true, locked: false,
    style: { ...defaultElementStyle, ...styleOverrides } as CanvasElement['style'],
    props,
    fieldMeta: { ...defaultFieldMeta, fieldId: String(++fieldIndex).padStart(3, '0'), description: label, fieldType: type.replace('sap-', '') }
  })

  return [
    el(ComponentType.Toolbar, 0, 0, 1440, 48, 'Report Selection', { buttons: 'Execute, Save Variant' }),
    el(ComponentType.Section, 20, 68, 1400, 50, 'Selection Criteria', {}, { fontSize: 16, fontWeight: '700' }),
    // Row 1
    el(ComponentType.Input, 40, 130, 320, 56, 'Company Code', {}, {}),
    el(ComponentType.Input, 380, 130, 320, 56, 'Fiscal Year', {}, {}),
    el(ComponentType.RangeInput, 720, 130, 400, 56, 'Posting Date', {}, {}),
    // Row 2
    el(ComponentType.Input, 40, 200, 320, 56, 'Document Number', {}, {}),
    el(ComponentType.Dropdown, 380, 200, 320, 56, 'Document Type', { options: 'All, SA, RE, KR, KZ' }),
    el(ComponentType.Input, 720, 200, 400, 56, 'Reference', {}, {}),
    // Row 3
    el(ComponentType.Input, 40, 270, 320, 56, 'Vendor', {}, {}),
    el(ComponentType.Input, 380, 270, 320, 56, 'Customer', {}, {}),
    el(ComponentType.Dropdown, 720, 270, 400, 56, 'Currency', { options: 'All, USD, EUR, CNY, JPY' }),
    // Checkboxes
    el(ComponentType.Section, 20, 350, 1400, 40, 'Output Options', {}, { fontSize: 16, fontWeight: '700' }),
    el(ComponentType.Checkbox, 40, 400, 200, 32, 'Show Line Items', { checked: true }),
    el(ComponentType.Checkbox, 260, 400, 200, 32, 'Show Totals', { checked: true }),
    el(ComponentType.Checkbox, 480, 400, 200, 32, 'ALV Display', { checked: false }),
    // Execute button
    el(ComponentType.Button, 40, 460, 140, 40, 'Execute', { variant: 'emphasized' }, { fontSize: 14, fontWeight: 'bold' }),
    el(ComponentType.Button, 200, 460, 140, 40, 'Save Variant', { variant: 'default' }),
  ]
}
