import { v4 as uuid } from 'uuid'
import { ComponentType } from '@/types/component'
import type { CanvasElement } from '@/types/canvas'
import { defaultElementStyle, defaultFieldMeta } from '@/types/canvas'

export function createScreenEnhancementTemplate(): CanvasElement[] {
  let fieldIndex = 0
  const el = (type: ComponentType, x: number, y: number, w: number, h: number, label: string, props: Record<string, unknown> = {}, styleOverrides: Record<string, unknown> = {}): CanvasElement => ({
    id: uuid(), type, x, y, width: w, height: h, rotation: 0, label, value: '', visible: true, locked: false,
    style: { ...defaultElementStyle, ...styleOverrides } as CanvasElement['style'],
    props,
    fieldMeta: { ...defaultFieldMeta, fieldId: String(++fieldIndex).padStart(3, '0'), description: label, fieldType: type.replace('sap-', '') }
  })

  return [
    // Screen title
    el(ComponentType.Toolbar, 0, 0, 1440, 48, 'Transaction VA01 - Create Sales Order (Enhanced)', { buttons: 'Save, Check, Back' }),

    // Standard fields section
    el(ComponentType.Section, 20, 68, 680, 40, 'Standard Fields', {}, { fontSize: 16, fontWeight: '700' }),
    el(ComponentType.Input, 40, 120, 300, 56, 'Order Type'),
    el(ComponentType.Input, 360, 120, 300, 56, 'Sales Org.'),
    el(ComponentType.Input, 40, 190, 300, 56, 'Sold-to Party'),
    el(ComponentType.Input, 360, 190, 300, 56, 'Ship-to Party'),
    el(ComponentType.Input, 40, 260, 300, 56, 'PO Number'),
    el(ComponentType.Input, 360, 260, 300, 56, 'PO Date'),

    // Enhancement section (highlighted)
    el(ComponentType.Section, 720, 68, 700, 40, 'Enhancement Fields (Custom)', {}, { fontSize: 16, fontWeight: '700', fontColor: '#e76500' }),
    el(ComponentType.Banner, 740, 120, 660, 36, 'These fields are added via BADI/User Exit', { variant: 'warning' }),
    el(ComponentType.Input, 740, 170, 320, 56, 'Custom Field 1 (ZZ_FIELD1)'),
    el(ComponentType.Input, 1080, 170, 320, 56, 'Custom Field 2 (ZZ_FIELD2)'),
    el(ComponentType.Dropdown, 740, 240, 320, 56, 'Custom Category', { options: 'Category A, Category B, Category C' }),
    el(ComponentType.Checkbox, 1080, 256, 250, 32, 'Custom Flag (ZZ_FLAG)', { checked: false }),

    // Tab section
    el(ComponentType.Tab, 20, 340, 1400, 260, 'Sales Order', { tabs: 'Item Overview, Item Detail, Conditions, Account Assignment, Schedule Lines', activeTab: 0 }),

    // Notes
    el(ComponentType.Banner, 20, 620, 1400, 36, 'Enhancement: BADI - BADI_SD_SALES_DOC / User Exit - USEREXIT_SAVE_DOCUMENT_PREPARE', { variant: 'information' }),
  ]
}
