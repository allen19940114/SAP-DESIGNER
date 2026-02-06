import { v4 as uuid } from 'uuid'
import { ComponentType } from '@/types/component'
import type { CanvasElement } from '@/types/canvas'
import { defaultElementStyle, defaultFieldMeta } from '@/types/canvas'

export function createALVReportTemplate(): CanvasElement[] {
  let fieldIndex = 0
  const el = (type: ComponentType, x: number, y: number, w: number, h: number, label: string, props: Record<string, unknown> = {}, styleOverrides: Record<string, unknown> = {}): CanvasElement => ({
    id: uuid(), type, x, y, width: w, height: h, rotation: 0, label, value: '', visible: true, locked: false,
    style: { ...defaultElementStyle, ...styleOverrides } as CanvasElement['style'],
    props,
    fieldMeta: { ...defaultFieldMeta, fieldId: String(++fieldIndex).padStart(3, '0'), description: label, fieldType: type.replace('sap-', '') }
  })

  return [
    // Page header
    el(ComponentType.Toolbar, 0, 0, 1440, 48, 'ALV Report: Sales Order List', { buttons: 'Filter, Sort, Export, Print' }),
    // Filter bar
    el(ComponentType.GroupBox, 20, 68, 1400, 80, 'Filters'),
    el(ComponentType.SearchBox, 40, 96, 240, 36, 'Search...'),
    el(ComponentType.Dropdown, 300, 88, 200, 56, 'Status', { options: 'All, Open, Completed, Cancelled' }),
    el(ComponentType.RangeInput, 520, 88, 360, 56, 'Date Range'),
    el(ComponentType.Button, 910, 96, 100, 36, 'Go', { variant: 'emphasized' }),
    // ALV Table
    el(ComponentType.Table, 20, 168, 1400, 380, 'Sales Orders', {
      columns: 'Order No., Customer, Material, Qty, UoM, Net Value, Currency, Status, Created Date',
      rows: 10
    }),
    // Footer info
    el(ComponentType.Text, 20, 560, 300, 24, 'Showing 1-10 of 245 entries', {}, { fontSize: 12, fontColor: '#788fa6' }),
    el(ComponentType.Text, 1200, 560, 220, 24, 'Total: 1,234,567.00 USD', {}, { fontSize: 12, fontWeight: '700', fontColor: '#1d2d3e', textAlign: 'right' }),
  ]
}
