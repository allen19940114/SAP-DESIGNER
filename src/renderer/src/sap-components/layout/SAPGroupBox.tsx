import React from 'react'
import { ComponentType } from '@/types/component'
import type { SAPComponentDefinition, SAPComponentRenderProps } from '@/types/component'

const SAPGroupBoxRenderer: React.FC<SAPComponentRenderProps> = ({ element, isEditing, onLabelChange }) => {
  const { label } = element

  const containerStyle: React.CSSProperties = {
    width: '100%', height: '100%', fontFamily: 'var(--sap-font-family)',
    border: '1px solid #d9d9d9', borderRadius: 8, display: 'flex', flexDirection: 'column',
    overflow: 'hidden', boxSizing: 'border-box'
  }

  const headerStyle: React.CSSProperties = {
    padding: '8px 12px', fontSize: 14, fontWeight: 600, color: '#1d2d3e',
    backgroundColor: '#f5f6f7', borderBottom: '1px solid #d9d9d9', flexShrink: 0
  }

  if (isEditing) {
    return (
      <div style={containerStyle}>
        <div style={headerStyle}>
          <input autoFocus defaultValue={label}
            onBlur={(e) => onLabelChange?.(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') onLabelChange?.((e.target as HTMLInputElement).value) }}
            style={{ background: 'transparent', border: 'none', outline: 'none', width: '100%', color: 'inherit', fontSize: 'inherit', fontWeight: 'inherit', fontFamily: 'inherit' }}
          />
        </div>
        <div style={{ flex: 1, padding: 12 }} />
      </div>
    )
  }

  return (
    <div style={containerStyle}>
      <div style={headerStyle}>{label}</div>
      <div style={{ flex: 1, padding: 12, color: '#788fa6', fontSize: 13 }}>GroupBox content area</div>
    </div>
  )
}

export const sapGroupBoxDefinition: SAPComponentDefinition = {
  type: ComponentType.GroupBox, displayName: 'GroupBox', category: 'layout', icon: '▣',
  thumbnail: () => (
    <div style={{ border: '1px solid #d9d9d9', borderRadius: 4, overflow: 'hidden' }}>
      <div style={{ padding: '2px 4px', fontSize: 8, fontWeight: 600, background: '#f5f6f7', borderBottom: '1px solid #d9d9d9' }}>GroupBox</div>
      <div style={{ padding: 4, fontSize: 7, color: '#788fa6' }}>Content</div>
    </div>
  ),
  defaultSize: { width: 360, height: 200 },
  defaultProps: {},
  defaultStyle: { fontSize: 14, fontWeight: 'normal', fontColor: '#1d2d3e', backgroundColor: '#ffffff', borderRadius: 8 },
  renderComponent: SAPGroupBoxRenderer,
  propertyFields: [],
  defaultFieldMeta: { fieldType: 'GroupBox', abapType: '', length: '' }
}
