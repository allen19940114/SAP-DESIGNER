import React from 'react'
import { ComponentType } from '@/types/component'
import type { SAPComponentDefinition, SAPComponentRenderProps } from '@/types/component'

const SAPTextAreaRenderer: React.FC<SAPComponentRenderProps> = ({ element, isEditing, onLabelChange }) => {
  const { label, value, style } = element

  const wrapperStyle: React.CSSProperties = {
    width: '100%', height: '100%', display: 'flex', flexDirection: 'column', gap: 4, boxSizing: 'border-box'
  }

  const labelStyle: React.CSSProperties = {
    fontFamily: 'var(--sap-font-family)', fontSize: 12, color: '#556b82', lineHeight: '16px', flexShrink: 0
  }

  const areaStyle: React.CSSProperties = {
    flex: 1, width: '100%', fontFamily: 'var(--sap-font-family)', fontSize: style.fontSize,
    color: 'var(--sap-field-text-color)', backgroundColor: 'var(--sap-field-background)',
    border: '1px solid var(--sap-field-border-color)', borderRadius: 'var(--sap-field-border-radius)',
    padding: 8, boxSizing: 'border-box', resize: 'none', cursor: 'default',
    overflow: 'hidden', lineHeight: '1.4'
  }

  if (isEditing) {
    return (
      <div style={wrapperStyle}>
        <input autoFocus defaultValue={label}
          onBlur={(e) => onLabelChange?.(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter') onLabelChange?.((e.target as HTMLInputElement).value) }}
          style={{ ...labelStyle, background: 'transparent', border: 'none', outline: 'none', padding: 0, width: '100%' }}
        />
        <div style={areaStyle}>{value || ''}</div>
      </div>
    )
  }

  return (
    <div style={wrapperStyle}>
      <div style={labelStyle}>{label}</div>
      <div style={areaStyle}>
        {value || <span style={{ color: 'var(--sap-field-placeholder-color)' }}>Enter text...</span>}
      </div>
    </div>
  )
}

export const sapTextAreaDefinition: SAPComponentDefinition = {
  type: ComponentType.TextArea, displayName: 'Text Area', category: 'input', icon: '≡',
  thumbnail: () => (
    <div style={{ width: '100%' }}>
      <div style={{ fontSize: 9, color: '#556b82', marginBottom: 2 }}>Label</div>
      <div style={{ height: 32, background: '#fff', border: '1px solid #89919a', borderRadius: 3, fontSize: 8, padding: 3, color: '#788fa6' }}>Enter text...</div>
    </div>
  ),
  defaultSize: { width: 300, height: 120 },
  defaultProps: {},
  defaultStyle: { fontSize: 14, fontWeight: 'normal', fontColor: '#1d2d3e', backgroundColor: 'transparent', borderWidth: 0, borderStyle: 'none' },
  renderComponent: SAPTextAreaRenderer,
  propertyFields: [],
  defaultFieldMeta: { fieldType: 'TextArea', abapType: 'STRING', length: '255' }
}
