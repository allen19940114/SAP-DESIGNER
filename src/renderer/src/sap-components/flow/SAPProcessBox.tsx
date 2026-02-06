import React from 'react'
import { ComponentType } from '@/types/component'
import type { SAPComponentDefinition, SAPComponentRenderProps } from '@/types/component'

const SAPProcessBoxRenderer: React.FC<SAPComponentRenderProps> = ({ element, isEditing, onLabelChange }) => {
  const { label, style } = element

  const boxStyle: React.CSSProperties = {
    width: '100%', height: '100%', fontFamily: 'var(--sap-font-family)',
    backgroundColor: style.backgroundColor === 'transparent' ? '#e8f0fe' : style.backgroundColor,
    border: '2px solid #0070f2', borderRadius: 8,
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontSize: style.fontSize, fontWeight: 600, color: '#1d2d3e',
    textAlign: 'center', padding: 8, boxSizing: 'border-box', userSelect: 'none'
  }

  if (isEditing) {
    return (
      <div style={boxStyle}>
        <input autoFocus defaultValue={label}
          onBlur={(e) => onLabelChange?.(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter') onLabelChange?.((e.target as HTMLInputElement).value) }}
          style={{ background: 'transparent', border: 'none', outline: 'none', textAlign: 'center', width: '100%', color: 'inherit', fontSize: 'inherit', fontWeight: 'inherit', fontFamily: 'inherit' }}
        />
      </div>
    )
  }

  return <div style={boxStyle}>{label}</div>
}

export const sapProcessBoxDefinition: SAPComponentDefinition = {
  type: ComponentType.ProcessBox, displayName: 'Process Box', category: 'flow', icon: '▢',
  thumbnail: () => <div style={{ padding: '3px 8px', border: '2px solid #0070f2', borderRadius: 4, fontSize: 9, fontWeight: 600, color: '#1d2d3e', background: '#e8f0fe', textAlign: 'center' }}>Process</div>,
  defaultSize: { width: 160, height: 60 },
  defaultProps: {},
  defaultStyle: { fontSize: 14, fontWeight: 'bold', fontColor: '#1d2d3e', backgroundColor: '#e8f0fe', borderRadius: 8 },
  renderComponent: SAPProcessBoxRenderer,
  propertyFields: [],
  defaultFieldMeta: { fieldType: 'Process', abapType: '', length: '' }
}
