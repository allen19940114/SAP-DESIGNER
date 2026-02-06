import { v4 as uuid } from 'uuid'
import { ComponentType } from '@/types/component'
import type { CanvasElement } from '@/types/canvas'
import { defaultElementStyle, defaultFieldMeta } from '@/types/canvas'

export function createInterfaceDiagramTemplate(): CanvasElement[] {
  let fieldIndex = 0
  const el = (type: ComponentType, x: number, y: number, w: number, h: number, label: string, props: Record<string, unknown> = {}, styleOverrides: Record<string, unknown> = {}): CanvasElement => ({
    id: uuid(), type, x, y, width: w, height: h, rotation: 0, label, value: '', visible: true, locked: false,
    style: { ...defaultElementStyle, ...styleOverrides } as CanvasElement['style'],
    props,
    fieldMeta: { ...defaultFieldMeta, fieldId: String(++fieldIndex).padStart(3, '0'), description: label, fieldType: type.replace('sap-', '') }
  })

  return [
    // Title
    el(ComponentType.Text, 500, 20, 440, 40, 'System Interface Architecture', {}, { fontSize: 24, fontWeight: '700', textAlign: 'center' }),

    // Source systems (left)
    el(ComponentType.ProcessBox, 40, 120, 200, 70, 'ERP (SAP S/4)'),
    el(ComponentType.ProcessBox, 40, 230, 200, 70, 'CRM System'),
    el(ComponentType.ProcessBox, 40, 340, 200, 70, 'Legacy System'),

    // Middleware
    el(ComponentType.ProcessBox, 400, 200, 220, 100, 'SAP PI/PO\nMiddleware', {}, { backgroundColor: '#fff3e0', fontColor: '#e76500' }),

    // Target systems (right)
    el(ComponentType.ProcessBox, 780, 120, 200, 70, 'SAP BW/4HANA'),
    el(ComponentType.ProcessBox, 780, 230, 200, 70, 'Third-party API'),
    el(ComponentType.ProcessBox, 780, 340, 200, 70, 'Data Lake'),

    // Arrows: source → middleware
    el(ComponentType.ArrowRight, 240, 145, 160, 30, ''),
    el(ComponentType.ArrowRight, 240, 255, 160, 30, ''),
    el(ComponentType.ArrowRight, 240, 365, 160, 30, ''),

    // Arrows: middleware → target
    el(ComponentType.ArrowRight, 620, 145, 160, 30, ''),
    el(ComponentType.ArrowRight, 620, 255, 160, 30, ''),
    el(ComponentType.ArrowRight, 620, 365, 160, 30, ''),

    // Labels on arrows
    el(ComponentType.Text, 270, 120, 100, 20, 'IDoc', {}, { fontSize: 11, fontColor: '#788fa6', textAlign: 'center' }),
    el(ComponentType.Text, 270, 232, 100, 20, 'RFC', {}, { fontSize: 11, fontColor: '#788fa6', textAlign: 'center' }),
    el(ComponentType.Text, 270, 342, 100, 20, 'File/FTP', {}, { fontSize: 11, fontColor: '#788fa6', textAlign: 'center' }),
    el(ComponentType.Text, 640, 120, 120, 20, 'ODP/SLT', {}, { fontSize: 11, fontColor: '#788fa6', textAlign: 'center' }),
    el(ComponentType.Text, 640, 232, 120, 20, 'REST API', {}, { fontSize: 11, fontColor: '#788fa6', textAlign: 'center' }),
    el(ComponentType.Text, 640, 342, 120, 20, 'JDBC', {}, { fontSize: 11, fontColor: '#788fa6', textAlign: 'center' }),

    // Monitoring
    el(ComponentType.Banner, 400, 430, 220, 40, 'Monitoring & Alerting', { variant: 'information' }),
  ]
}
