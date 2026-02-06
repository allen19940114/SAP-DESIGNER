import React from 'react'
import { ComponentType } from '@/types/component'
import type { SAPComponentDefinition, SAPComponentRenderProps } from '@/types/component'

const SAPSearchBoxRenderer: React.FC<SAPComponentRenderProps> = ({ element, isEditing, onLabelChange }) => {
  const { label, style } = element

  const boxStyle: React.CSSProperties = {
    width: '100%', height: '100%', fontFamily: 'var(--sap-font-family)',
    fontSize: style.fontSize, color: 'var(--sap-field-text-color)',
    backgroundColor: 'var(--sap-field-background)', border: '1px solid var(--sap-field-border-color)',
    borderRadius: 'var(--sap-button-border-radius)', padding: '0 36px 0 12px',
    display: 'flex', alignItems: 'center', boxSizing: 'border-box', cursor: 'default',
    position: 'relative'
  }

  const iconStyle: React.CSSProperties = {
    position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)',
    color: '#556b82', fontSize: 14, pointerEvents: 'none'
  }

  if (isEditing) {
    return (
      <div style={boxStyle}>
        <input autoFocus defaultValue={label}
          onBlur={(e) => onLabelChange?.(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter') onLabelChange?.((e.target as HTMLInputElement).value) }}
          style={{ background: 'transparent', border: 'none', outline: 'none', width: '100%', color: 'inherit', fontSize: 'inherit', fontFamily: 'inherit' }}
        />
        <span style={iconStyle}>⌕</span>
      </div>
    )
  }

  return (
    <div style={boxStyle}>
      <span style={{ color: 'var(--sap-field-placeholder-color)' }}>{label}</span>
      <span style={iconStyle}>⌕</span>
    </div>
  )
}

export const sapSearchBoxDefinition: SAPComponentDefinition = {
  type: ComponentType.SearchBox, displayName: 'Search', category: 'input', icon: '⌕',
  thumbnail: () => (
    <div style={{ height: 22, background: '#fff', border: '1px solid #89919a', borderRadius: 6, fontSize: 9, padding: '2px 6px', color: '#788fa6', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <span>Search...</span><span>⌕</span>
    </div>
  ),
  defaultSize: { width: 260, height: 36 },
  defaultProps: {},
  defaultStyle: { fontSize: 14, fontWeight: 'normal', fontColor: '#1d2d3e', backgroundColor: '#ffffff', borderRadius: 8 },
  renderComponent: SAPSearchBoxRenderer,
  propertyFields: [],
  defaultFieldMeta: { fieldType: 'Search', abapType: 'CHAR', length: '40' }
}
