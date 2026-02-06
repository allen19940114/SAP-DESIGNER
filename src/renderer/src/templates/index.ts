import type { Template } from '@/types/template'
import { createSelectionScreenTemplate } from './selection-screen'
import { createALVReportTemplate } from './alv-report'
import { createInterfaceDiagramTemplate } from './interface-diagram'
import { createScreenEnhancementTemplate } from './screen-enhancement'

export const builtInTemplates: Template[] = [
  {
    id: 'selection-screen',
    name: 'Selection Screen',
    description: 'SAP Report Selection Screen with filters, variants, and execute button',
    category: 'selection-screen',
    thumbnail: '',
    elements: createSelectionScreenTemplate(),
    canvasWidth: 1440,
    canvasHeight: 600
  },
  {
    id: 'alv-report',
    name: 'ALV Report',
    description: 'ALV Grid Report with filter bar, data table, and toolbar',
    category: 'alv-report',
    thumbnail: '',
    elements: createALVReportTemplate(),
    canvasWidth: 1440,
    canvasHeight: 620
  },
  {
    id: 'interface-diagram',
    name: 'Interface Diagram',
    description: 'System interface architecture with source, middleware, and target systems',
    category: 'interface-diagram',
    thumbnail: '',
    elements: createInterfaceDiagramTemplate(),
    canvasWidth: 1040,
    canvasHeight: 520
  },
  {
    id: 'screen-enhancement',
    name: 'Screen Enhancement',
    description: 'SAP transaction screen with standard and custom enhancement fields',
    category: 'screen-enhancement',
    thumbnail: '',
    elements: createScreenEnhancementTemplate(),
    canvasWidth: 1440,
    canvasHeight: 700
  }
]
