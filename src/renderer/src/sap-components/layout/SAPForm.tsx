import React from 'react'
import { ComponentType } from '@/types/component'
import type { SAPComponentDefinition, SAPComponentRenderProps } from '@/types/component'

const SAPFormRenderer: React.FC<SAPComponentRenderProps> = ({ element, isEditing, onLabelChange }) => {
  const { label, props } = element
  const fields = ((props.fields as string) || 'Field 1, Field 2, Field 3').split(',').map(s => s.trim())

  const formStyle: React.CSSProperties = {
    width: '100%', height: '100%', fontFamily: 'var(--sap-font-family)',
    display: 'flex', flexDirection: 'column', boxSizing: 'border-box'
  }

  const titleStyle: React.CSSProperties = {
    fontSize: 16, fontWeight: 600, color: '#1d2d3e', padding: '8px 0', marginBottom: 8, borderBottom: '1px solid #e5e5e5'
  }

  const fieldRowStyle: React.CSSProperties = {
    display: 'flex', alignItems: 'center', marginBottom: 8, gap: 12
  }

  const fieldLabelStyle: React.CSSProperties = {
    width: 100, fontSize: 13, color: '#556b82', textAlign: 'right', flexShrink: 0
  }

  const fieldInputStyle: React.CSSProperties = {
    flex: 1, height: 32, backgroundColor: '#fff', borderBottom: '2px solid #89919a',
    borderRadius: '4px 4px 0 0', border: 'none', padding: '0 8px', fontSize: 13
  }

  if (isEditing) {
    return (
      <div style={formStyle}>
        <input autoFocus defaultValue={label}
          onBlur={(e) => onLabelChange?.(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter') onLabelChange?.((e.target as HTMLInputElement).value) }}
          style={{ ...titleStyle, background: 'transparent', border: 'none', outline: 'none', padding: '8px 0' }}
        />
      </div>
    )
  }

  return (
    <div style={formStyle}>
      <div style={titleStyle}>{label}</div>
      {fields.map((f, i) => (
        <div key={i} style={fieldRowStyle}>
          <div style={fieldLabelStyle}>{f}</div>
          <div style={fieldInputStyle} />
        </div>
      ))}
    </div>
  )
}

export const sapFormDefinition: SAPComponentDefinition = {
  type: ComponentType.Form, displayName: 'Form', category: 'layout', icon: '☰',
  thumbnail: () => (
    <div style={{ fontSize: 8 }}>
      <div style={{ fontWeight: 600, marginBottom: 2 }}>Form</div>
      <div style={{ display: 'flex', gap: 4, marginBottom: 2 }}>
        <span style={{ color: '#556b82' }}>Field:</span>
        <div style={{ flex: 1, height: 10, borderBottom: '1px solid #89919a', borderRadius: '2px 2px 0 0' }} />
      </div>
    </div>
  ),
  defaultSize: { width: 400, height: 200 },
  defaultProps: { fields: 'Field 1, Field 2, Field 3' },
  defaultStyle: { fontSize: 14, fontWeight: 'normal', fontColor: '#1d2d3e', backgroundColor: 'transparent', borderWidth: 0, borderStyle: 'none', padding: 12 },
  renderComponent: SAPFormRenderer,
  propertyFields: [{ key: 'fields', label: 'Fields (comma separated)', type: 'text' }],
  defaultFieldMeta: { fieldType: 'Form', abapType: '', length: '' }
}
