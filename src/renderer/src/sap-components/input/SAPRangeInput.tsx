import React from 'react'
import { ComponentType } from '@/types/component'
import type { SAPComponentDefinition, SAPComponentRenderProps } from '@/types/component'

const SAPRangeInputRenderer: React.FC<SAPComponentRenderProps> = ({ element, isEditing, onLabelChange }) => {
  const { label, style } = element

  const wrapperStyle: React.CSSProperties = {
    width: '100%', height: '100%', display: 'flex', flexDirection: 'column',
    justifyContent: 'center', gap: 4, boxSizing: 'border-box'
  }

  const labelStyle: React.CSSProperties = {
    fontFamily: 'var(--sap-font-family)', fontSize: 12, color: '#556b82', lineHeight: '16px'
  }

  const rowStyle: React.CSSProperties = {
    display: 'flex', alignItems: 'center', gap: 8
  }

  const inputStyle: React.CSSProperties = {
    flex: 1, height: 'var(--sap-element-height)', fontFamily: 'var(--sap-font-family)',
    fontSize: style.fontSize, color: 'var(--sap-field-text-color)',
    backgroundColor: 'var(--sap-field-background)', border: 'none',
    borderBottom: '2px solid var(--sap-field-border-color)', borderRadius: '4px 4px 0 0',
    padding: '0 8px', outline: 'none', boxSizing: 'border-box', cursor: 'default'
  }

  const separatorStyle: React.CSSProperties = {
    color: '#556b82', fontSize: 14, fontWeight: 500, flexShrink: 0
  }

  if (isEditing) {
    return (
      <div style={wrapperStyle}>
        <input autoFocus defaultValue={label}
          onBlur={(e) => onLabelChange?.(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter') onLabelChange?.((e.target as HTMLInputElement).value) }}
          style={{ ...labelStyle, background: 'transparent', border: 'none', outline: 'none', padding: 0, width: '100%' }}
        />
        <div style={rowStyle}>
          <div style={inputStyle} /><span style={separatorStyle}>—</span><div style={inputStyle} />
        </div>
      </div>
    )
  }

  return (
    <div style={wrapperStyle}>
      <div style={labelStyle}>{label}</div>
      <div style={rowStyle}>
        <div style={inputStyle}><span style={{ color: 'var(--sap-field-placeholder-color)' }}>From</span></div>
        <span style={separatorStyle}>—</span>
        <div style={inputStyle}><span style={{ color: 'var(--sap-field-placeholder-color)' }}>To</span></div>
      </div>
    </div>
  )
}

export const sapRangeInputDefinition: SAPComponentDefinition = {
  type: ComponentType.RangeInput, displayName: 'Range Input', category: 'input', icon: '⇔',
  thumbnail: () => (
    <div style={{ width: '100%' }}>
      <div style={{ fontSize: 9, color: '#556b82', marginBottom: 2 }}>Range</div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
        <div style={{ flex: 1, height: 16, background: '#fff', borderBottom: '2px solid #89919a', borderRadius: '3px 3px 0 0', fontSize: 8, padding: '1px 3px', color: '#788fa6' }}>From</div>
        <span style={{ fontSize: 8, color: '#556b82' }}>—</span>
        <div style={{ flex: 1, height: 16, background: '#fff', borderBottom: '2px solid #89919a', borderRadius: '3px 3px 0 0', fontSize: 8, padding: '1px 3px', color: '#788fa6' }}>To</div>
      </div>
    </div>
  ),
  defaultSize: { width: 360, height: 56 },
  defaultProps: {},
  defaultStyle: { fontSize: 14, fontWeight: 'normal', fontColor: '#1d2d3e', backgroundColor: 'transparent', borderWidth: 0, borderStyle: 'none' },
  renderComponent: SAPRangeInputRenderer,
  propertyFields: [],
  defaultFieldMeta: { fieldType: 'RangeInput', abapType: 'CHAR', length: '40' }
}
