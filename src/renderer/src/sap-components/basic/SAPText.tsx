import React from 'react'
import { ComponentType } from '@/types/component'
import type { SAPComponentDefinition, SAPComponentRenderProps } from '@/types/component'

const SAPTextRenderer: React.FC<SAPComponentRenderProps> = ({
  element,
  isEditing,
  onLabelChange
}) => {
  const { label, style } = element

  const textStyle: React.CSSProperties = {
    width: '100%',
    height: '100%',
    fontFamily: 'var(--sap-font-family)',
    fontSize: style.fontSize,
    fontWeight: style.fontWeight === 'bold' || style.fontWeight === '700' ? 700 : style.fontWeight === '300' ? 300 : 400,
    color: style.fontColor,
    display: 'flex',
    alignItems: style.textAlign === 'center' ? 'center' : 'flex-start',
    justifyContent: style.textAlign === 'right' ? 'flex-end' : style.textAlign === 'center' ? 'center' : 'flex-start',
    padding: style.padding,
    userSelect: 'none',
    wordBreak: 'break-word',
    overflow: 'hidden',
    boxSizing: 'border-box'
  }

  if (isEditing) {
    return (
      <div style={textStyle}>
        <input
          autoFocus
          defaultValue={label}
          onBlur={(e) => onLabelChange?.(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') onLabelChange?.((e.target as HTMLInputElement).value)
          }}
          style={{
            background: 'transparent',
            border: 'none',
            width: '100%',
            outline: 'none',
            color: 'inherit',
            fontSize: 'inherit',
            fontFamily: 'inherit',
            fontWeight: 'inherit'
          }}
        />
      </div>
    )
  }

  return <div style={textStyle}>{label}</div>
}

export const sapTextDefinition: SAPComponentDefinition = {
  type: ComponentType.Text,
  displayName: 'Text',
  category: 'basic',
  icon: 'T',
  thumbnail: () => (
    <div style={{ fontSize: '11px', color: '#1d2d3e', padding: '4px' }}>
      Text Label
    </div>
  ),
  defaultSize: { width: 160, height: 32 },
  defaultProps: {},
  defaultStyle: {
    fontSize: 14,
    fontWeight: 'normal',
    fontColor: '#1d2d3e',
    backgroundColor: 'transparent',
    borderWidth: 0,
    borderStyle: 'none',
    padding: 4
  },
  renderComponent: SAPTextRenderer,
  propertyFields: [],
  defaultFieldMeta: {
    fieldType: 'Text',
    abapType: 'CHAR',
    length: '50'
  }
}
