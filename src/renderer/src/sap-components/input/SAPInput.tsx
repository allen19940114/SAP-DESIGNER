import React from 'react'
import { ComponentType } from '@/types/component'
import type { SAPComponentDefinition, SAPComponentRenderProps } from '@/types/component'

const SAPInputRenderer: React.FC<SAPComponentRenderProps> = ({
  element,
  isEditing,
  onLabelChange
}) => {
  const { label, value, style } = element

  const wrapperStyle: React.CSSProperties = {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    gap: '4px',
    boxSizing: 'border-box'
  }

  const labelStyle: React.CSSProperties = {
    fontFamily: 'var(--sap-font-family)',
    fontSize: 12,
    color: '#556b82',
    lineHeight: '16px'
  }

  const inputStyle: React.CSSProperties = {
    width: '100%',
    height: 'var(--sap-element-height)',
    fontFamily: 'var(--sap-font-family)',
    fontSize: style.fontSize,
    color: 'var(--sap-field-text-color)',
    backgroundColor: 'var(--sap-field-background)',
    border: 'none',
    borderBottom: '2px solid var(--sap-field-border-color)',
    borderRadius: '4px 4px 0 0',
    padding: '0 8px',
    outline: 'none',
    boxSizing: 'border-box',
    cursor: 'default'
  }

  if (isEditing) {
    return (
      <div style={wrapperStyle}>
        <input
          autoFocus
          defaultValue={label}
          onBlur={(e) => onLabelChange?.(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') onLabelChange?.((e.target as HTMLInputElement).value)
          }}
          style={{
            ...labelStyle,
            background: 'transparent',
            border: 'none',
            outline: 'none',
            padding: 0,
            width: '100%'
          }}
        />
        <div style={inputStyle}>{value || ''}</div>
      </div>
    )
  }

  return (
    <div style={wrapperStyle}>
      <div style={labelStyle}>{label}</div>
      <div style={inputStyle}>
        {value || <span style={{ color: 'var(--sap-field-placeholder-color)' }}>Enter value...</span>}
      </div>
    </div>
  )
}

export const sapInputDefinition: SAPComponentDefinition = {
  type: ComponentType.Input,
  displayName: 'Input',
  category: 'input',
  icon: 'I',
  thumbnail: () => (
    <div style={{ width: '100%' }}>
      <div style={{ fontSize: '9px', color: '#556b82', marginBottom: '2px' }}>Label</div>
      <div
        style={{
          height: '20px',
          background: '#fff',
          borderBottom: '2px solid #89919a',
          borderRadius: '3px 3px 0 0',
          fontSize: '9px',
          padding: '2px 4px',
          color: '#788fa6'
        }}
      >
        Value
      </div>
    </div>
  ),
  defaultSize: { width: 240, height: 56 },
  defaultProps: { placeholder: 'Enter value...' },
  defaultStyle: {
    fontSize: 14,
    fontWeight: 'normal',
    fontColor: '#1d2d3e',
    backgroundColor: 'transparent',
    borderWidth: 0,
    borderStyle: 'none'
  },
  renderComponent: SAPInputRenderer,
  propertyFields: [
    {
      key: 'placeholder',
      label: 'Placeholder',
      type: 'text'
    }
  ],
  defaultFieldMeta: {
    fieldType: 'Input',
    abapType: 'CHAR',
    length: '40'
  }
}
