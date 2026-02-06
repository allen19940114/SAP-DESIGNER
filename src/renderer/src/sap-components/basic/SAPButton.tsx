import React from 'react'
import { ComponentType } from '@/types/component'
import type { SAPComponentDefinition, SAPComponentRenderProps } from '@/types/component'

const SAPButtonRenderer: React.FC<SAPComponentRenderProps> = ({
  element,
  isEditing,
  onLabelChange
}) => {
  const { label, props } = element
  const variant = (props.variant as string) || 'default'

  const isEmphasized = variant === 'emphasized'
  const isGhost = variant === 'ghost'
  const isTransparent = variant === 'transparent'

  const buttonStyle: React.CSSProperties = {
    width: '100%',
    height: '100%',
    fontFamily: 'var(--sap-font-family)',
    fontSize: element.style.fontSize,
    fontWeight: element.style.fontWeight === 'bold' || element.style.fontWeight === '700' ? 700 : 400,
    borderRadius: 'var(--sap-button-border-radius)',
    border: isEmphasized || isTransparent ? 'none' : '1px solid var(--sap-button-border-color)',
    backgroundColor: isEmphasized
      ? 'var(--sap-button-emphasized-background)'
      : isTransparent
        ? 'transparent'
        : 'var(--sap-button-background)',
    color: isEmphasized
      ? 'var(--sap-button-emphasized-text-color)'
      : isGhost || isTransparent
        ? 'var(--sap-brand-color)'
        : 'var(--sap-button-text-color)',
    cursor: 'default',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '0 12px',
    userSelect: 'none',
    boxSizing: 'border-box'
  }

  if (isEditing) {
    return (
      <div style={buttonStyle}>
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
            textAlign: 'center',
            width: '100%',
            outline: 'none',
            color: 'inherit',
            fontSize: 'inherit',
            fontFamily: 'inherit'
          }}
        />
      </div>
    )
  }

  return <div style={buttonStyle}>{label}</div>
}

export const sapButtonDefinition: SAPComponentDefinition = {
  type: ComponentType.Button,
  displayName: 'Button',
  category: 'basic',
  icon: 'B',
  thumbnail: () => (
    <div
      style={{
        padding: '4px 14px',
        background: '#0070f2',
        color: '#fff',
        borderRadius: '8px',
        fontSize: '11px',
        textAlign: 'center'
      }}
    >
      Button
    </div>
  ),
  defaultSize: { width: 120, height: 36 },
  defaultProps: { variant: 'default' },
  defaultStyle: {
    fontSize: 14,
    fontWeight: 'normal',
    fontColor: '#1d2d3e',
    backgroundColor: '#ffffff',
    borderRadius: 8
  },
  renderComponent: SAPButtonRenderer,
  propertyFields: [
    {
      key: 'variant',
      label: 'Variant',
      type: 'select',
      options: [
        { value: 'default', label: 'Default' },
        { value: 'emphasized', label: 'Emphasized' },
        { value: 'ghost', label: 'Ghost' },
        { value: 'transparent', label: 'Transparent' }
      ]
    }
  ],
  defaultFieldMeta: {
    fieldType: 'Button',
    abapType: 'CHAR',
    length: '20'
  }
}
