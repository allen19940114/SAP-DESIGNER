import React from 'react'
import { ComponentType } from '@/types/component'
import type { SAPComponentDefinition, SAPComponentRenderProps } from '@/types/component'

const SAPDropdownRenderer: React.FC<SAPComponentRenderProps> = ({ element, isEditing, onLabelChange }) => {
  const { label, value, style } = element

  const wrapperStyle: React.CSSProperties = {
    width: '100%', height: '100%', display: 'flex', flexDirection: 'column',
    justifyContent: 'center', gap: 4, boxSizing: 'border-box'
  }

  const labelStyle: React.CSSProperties = {
    fontFamily: 'var(--sap-font-family)', fontSize: 12, color: '#556b82', lineHeight: '16px'
  }

  const selectStyle: React.CSSProperties = {
    width: '100%', height: 'var(--sap-element-height)', fontFamily: 'var(--sap-font-family)',
    fontSize: style.fontSize, color: 'var(--sap-field-text-color)',
    backgroundColor: 'var(--sap-field-background)', border: 'none',
    borderBottom: '2px solid var(--sap-field-border-color)', borderRadius: '4px 4px 0 0',
    padding: '0 28px 0 8px', outline: 'none', boxSizing: 'border-box', cursor: 'default',
    appearance: 'none',
    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath d='M2 4l4 4 4-4' stroke='%23556b82' stroke-width='1.5' fill='none'/%3E%3C/svg%3E")`,
    backgroundRepeat: 'no-repeat', backgroundPosition: 'right 8px center'
  }

  if (isEditing) {
    return (
      <div style={wrapperStyle}>
        <input autoFocus defaultValue={label}
          onBlur={(e) => onLabelChange?.(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter') onLabelChange?.((e.target as HTMLInputElement).value) }}
          style={{ ...labelStyle, background: 'transparent', border: 'none', outline: 'none', padding: 0, width: '100%' }}
        />
        <div style={selectStyle}>{value || 'Select...'}</div>
      </div>
    )
  }

  return (
    <div style={wrapperStyle}>
      <div style={labelStyle}>{label}</div>
      <div style={selectStyle}>
        {value || <span style={{ color: 'var(--sap-field-placeholder-color)' }}>Select...</span>}
      </div>
    </div>
  )
}

export const sapDropdownDefinition: SAPComponentDefinition = {
  type: ComponentType.Dropdown, displayName: 'Dropdown', category: 'input', icon: '▾',
  thumbnail: () => (
    <div style={{ width: '100%' }}>
      <div style={{ fontSize: 9, color: '#556b82', marginBottom: 2 }}>Label</div>
      <div style={{ height: 20, background: '#fff', borderBottom: '2px solid #89919a', borderRadius: '3px 3px 0 0', fontSize: 9, padding: '2px 4px', color: '#788fa6', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span>Select...</span><span>▾</span>
      </div>
    </div>
  ),
  defaultSize: { width: 240, height: 56 },
  defaultProps: { options: 'Option 1, Option 2, Option 3' },
  defaultStyle: { fontSize: 14, fontWeight: 'normal', fontColor: '#1d2d3e', backgroundColor: 'transparent', borderWidth: 0, borderStyle: 'none' },
  renderComponent: SAPDropdownRenderer,
  propertyFields: [{ key: 'options', label: 'Options (comma separated)', type: 'text' }],
  defaultFieldMeta: { fieldType: 'Dropdown', abapType: 'CHAR', length: '20' }
}
