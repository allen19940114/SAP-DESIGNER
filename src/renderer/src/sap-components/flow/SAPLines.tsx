import React from 'react'
import { ComponentType } from '@/types/component'
import type { SAPComponentDefinition, SAPComponentRenderProps } from '@/types/component'

const makeLineRenderer = (dashed: boolean, arrow: boolean): React.FC<SAPComponentRenderProps> => {
  return ({ element }) => {
    const color = element.style.fontColor || '#556b82'
    return (
      <svg width="100%" height="100%" style={{ display: 'block' }}>
        <line
          x1="0" y1="50%" x2={arrow ? 'calc(100% - 10px)' : '100%'} y2="50%"
          stroke={color} strokeWidth="2"
          strokeDasharray={dashed ? '8,4' : 'none'}
        />
        {arrow && (
          <polygon
            points={`${100}%,50% calc(100% - 12px),calc(50% - 6px) calc(100% - 12px),calc(50% + 6px)`}
            fill={color}
          />
        )}
      </svg>
    )
  }
}

// SVG-based line renderers with proper viewBox
const SolidLineRenderer: React.FC<SAPComponentRenderProps> = ({ element }) => {
  const color = element.style.fontColor || '#556b82'
  return (
    <svg width="100%" height="100%" viewBox="0 0 200 20" preserveAspectRatio="none" style={{ display: 'block' }}>
      <line x1="0" y1="10" x2="200" y2="10" stroke={color} strokeWidth="2" />
    </svg>
  )
}

const DashedLineRenderer: React.FC<SAPComponentRenderProps> = ({ element }) => {
  const color = element.style.fontColor || '#556b82'
  return (
    <svg width="100%" height="100%" viewBox="0 0 200 20" preserveAspectRatio="none" style={{ display: 'block' }}>
      <line x1="0" y1="10" x2="200" y2="10" stroke={color} strokeWidth="2" strokeDasharray="8,4" />
    </svg>
  )
}

const PolylineRenderer: React.FC<SAPComponentRenderProps> = ({ element }) => {
  const color = element.style.fontColor || '#556b82'
  return (
    <svg width="100%" height="100%" viewBox="0 0 200 100" preserveAspectRatio="none" style={{ display: 'block' }}>
      <polyline points="0,50 60,50 60,10 140,10 140,50 200,50" fill="none" stroke={color} strokeWidth="2" />
    </svg>
  )
}

const PolylineArrowRenderer: React.FC<SAPComponentRenderProps> = ({ element }) => {
  const color = element.style.fontColor || '#556b82'
  return (
    <svg width="100%" height="100%" viewBox="0 0 200 100" preserveAspectRatio="none" style={{ display: 'block' }}>
      <polyline points="0,50 60,50 60,10 140,10 140,50 185,50" fill="none" stroke={color} strokeWidth="2" />
      <polygon points="185,42 200,50 185,58" fill={color} />
    </svg>
  )
}

const DashedArrowRenderer: React.FC<SAPComponentRenderProps> = ({ element }) => {
  const color = element.style.fontColor || '#556b82'
  return (
    <svg width="100%" height="100%" viewBox="0 0 200 20" preserveAspectRatio="none" style={{ display: 'block' }}>
      <line x1="0" y1="10" x2="185" y2="10" stroke={color} strokeWidth="2" strokeDasharray="8,4" />
      <polygon points="185,4 200,10 185,16" fill={color} />
    </svg>
  )
}

const lineThumbnail = (label: string, dashed: boolean, arrow: boolean) => () => (
  <svg width="100%" height="16" viewBox="0 0 80 16">
    <line x1="2" y1="8" x2={arrow ? 68 : 78} y2="8" stroke="#556b82" strokeWidth="2" strokeDasharray={dashed ? '6,3' : 'none'} />
    {arrow && <polygon points="68,4 78,8 68,12" fill="#556b82" />}
  </svg>
)

const baseDef = {
  defaultProps: {},
  defaultStyle: { fontSize: 14, fontWeight: 'normal' as const, fontColor: '#556b82', backgroundColor: 'transparent', borderWidth: 0, borderStyle: 'none' as const },
  propertyFields: [],
  defaultFieldMeta: { fieldType: 'Connector', abapType: '', length: '' }
}

export const sapLineDefinition: SAPComponentDefinition = {
  ...baseDef, type: ComponentType.Line, displayName: 'Line', category: 'flow', icon: '—',
  thumbnail: lineThumbnail('Line', false, false),
  defaultSize: { width: 200, height: 8 },
  renderComponent: SolidLineRenderer
}

export const sapDashedLineDefinition: SAPComponentDefinition = {
  ...baseDef, type: ComponentType.DashedLine, displayName: 'Dashed Line', category: 'flow', icon: '┄',
  thumbnail: lineThumbnail('Dashed', true, false),
  defaultSize: { width: 200, height: 8 },
  renderComponent: DashedLineRenderer
}

export const sapPolylineDefinition: SAPComponentDefinition = {
  ...baseDef, type: ComponentType.Polyline, displayName: 'Polyline', category: 'flow', icon: '⌐',
  thumbnail: () => <svg width="100%" height="16" viewBox="0 0 80 16"><polyline points="2,12 25,12 25,4 55,4 55,12 78,12" fill="none" stroke="#556b82" strokeWidth="1.5" /></svg>,
  defaultSize: { width: 200, height: 60 },
  renderComponent: PolylineRenderer
}

export const sapPolylineArrowDefinition: SAPComponentDefinition = {
  ...baseDef, type: ComponentType.PolylineArrow, displayName: 'Polyline Arrow', category: 'flow', icon: '⌐→',
  thumbnail: () => <svg width="100%" height="16" viewBox="0 0 80 16"><polyline points="2,12 25,12 25,4 55,4 55,12 70,12" fill="none" stroke="#556b82" strokeWidth="1.5" /><polygon points="70,9 78,12 70,15" fill="#556b82" /></svg>,
  defaultSize: { width: 200, height: 60 },
  renderComponent: PolylineArrowRenderer
}

export const sapDashedArrowDefinition: SAPComponentDefinition = {
  ...baseDef, type: ComponentType.DashedArrow, displayName: 'Dashed Arrow', category: 'flow', icon: '⇢',
  thumbnail: lineThumbnail('Dashed Arrow', true, true),
  defaultSize: { width: 200, height: 8 },
  renderComponent: DashedArrowRenderer
}
