import React from 'react'
import { ComponentType } from '@/types/component'
import type { SAPComponentDefinition, SAPComponentRenderProps } from '@/types/component'

const SAPSectionRenderer: React.FC<SAPComponentRenderProps> = ({ element, isEditing, onLabelChange }) => {
  const { label } = element

  const sectionStyle: React.CSSProperties = {
    width: '100%', height: '100%', fontFamily: 'var(--sap-font-family)',
    display: 'flex', flexDirection: 'column', boxSizing: 'border-box'
  }

  const titleStyle: React.CSSProperties = {
    fontSize: 16, fontWeight: 700, color: '#1d2d3e', padding: '8px 0',
    borderBottom: '2px solid #0070f2', marginBottom: 12, flexShrink: 0
  }

  const bodyStyle: React.CSSProperties = {
    flex: 1, padding: 8, color: '#788fa6', fontSize: 13
  }

  if (isEditing) {
    return (
      <div style={sectionStyle}>
        <input autoFocus defaultValue={label}
          onBlur={(e) => onLabelChange?.(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter') onLabelChange?.((e.target as HTMLInputElement).value) }}
          style={{ ...titleStyle, background: 'transparent', border: 'none', outline: 'none', borderBottom: '2px solid #0070f2' }}
        />
        <div style={bodyStyle}>Section content</div>
      </div>
    )
  }

  return (
    <div style={sectionStyle}>
      <div style={titleStyle}>{label}</div>
      <div style={bodyStyle}>Section content area</div>
    </div>
  )
}

export const sapSectionDefinition: SAPComponentDefinition = {
  type: ComponentType.Section, displayName: 'Section', category: 'layout', icon: '§',
  thumbnail: () => (
    <div>
      <div style={{ fontSize: 9, fontWeight: 700, borderBottom: '2px solid #0070f2', paddingBottom: 2, marginBottom: 3 }}>Section</div>
      <div style={{ fontSize: 8, color: '#788fa6' }}>Content</div>
    </div>
  ),
  defaultSize: { width: 400, height: 160 },
  defaultProps: {},
  defaultStyle: { fontSize: 14, fontWeight: 'normal', fontColor: '#1d2d3e', backgroundColor: 'transparent', borderWidth: 0, borderStyle: 'none' },
  renderComponent: SAPSectionRenderer,
  propertyFields: [],
  defaultFieldMeta: { fieldType: 'Section', abapType: '', length: '' }
}
