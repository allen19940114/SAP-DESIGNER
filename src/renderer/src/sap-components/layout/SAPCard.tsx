import React from 'react'
import { ComponentType } from '@/types/component'
import type { SAPComponentDefinition, SAPComponentRenderProps } from '@/types/component'

const SAPCardRenderer: React.FC<SAPComponentRenderProps> = ({ element, isEditing, onLabelChange }) => {
  const { label, style } = element

  const cardStyle: React.CSSProperties = {
    width: '100%', height: '100%', backgroundColor: 'var(--sap-card-background)',
    borderRadius: 'var(--sap-card-border-radius)', boxShadow: 'var(--sap-card-shadow)',
    border: '1px solid var(--sap-card-border-color)', display: 'flex', flexDirection: 'column',
    overflow: 'hidden', boxSizing: 'border-box'
  }

  const headerStyle: React.CSSProperties = {
    padding: '12px 16px', fontFamily: 'var(--sap-font-family)', fontSize: 16, fontWeight: 600,
    color: '#1d2d3e', borderBottom: '1px solid #e5e5e5', flexShrink: 0
  }

  const bodyStyle: React.CSSProperties = {
    flex: 1, padding: 16, fontFamily: 'var(--sap-font-family)', fontSize: style.fontSize,
    color: '#556b82'
  }

  if (isEditing) {
    return (
      <div style={cardStyle}>
        <div style={headerStyle}>
          <input autoFocus defaultValue={label}
            onBlur={(e) => onLabelChange?.(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') onLabelChange?.((e.target as HTMLInputElement).value) }}
            style={{ background: 'transparent', border: 'none', outline: 'none', width: '100%', color: 'inherit', fontSize: 'inherit', fontWeight: 'inherit', fontFamily: 'inherit' }}
          />
        </div>
        <div style={bodyStyle}>Card content area</div>
      </div>
    )
  }

  return (
    <div style={cardStyle}>
      <div style={headerStyle}>{label}</div>
      <div style={bodyStyle}>Card content area</div>
    </div>
  )
}

export const sapCardDefinition: SAPComponentDefinition = {
  type: ComponentType.Card, displayName: 'Card', category: 'layout', icon: '☐',
  thumbnail: () => (
    <div style={{ background: '#fff', borderRadius: 6, boxShadow: '0 1px 3px rgba(0,0,0,0.1)', border: '1px solid #e5e5e5', overflow: 'hidden' }}>
      <div style={{ padding: '3px 6px', fontSize: 9, fontWeight: 600, borderBottom: '1px solid #e5e5e5' }}>Card Title</div>
      <div style={{ padding: '4px 6px', fontSize: 8, color: '#556b82' }}>Content</div>
    </div>
  ),
  defaultSize: { width: 320, height: 200 },
  defaultProps: {},
  defaultStyle: { fontSize: 14, fontWeight: 'normal', fontColor: '#1d2d3e', backgroundColor: '#ffffff', borderRadius: 12 },
  renderComponent: SAPCardRenderer,
  propertyFields: [],
  defaultFieldMeta: { fieldType: 'Card', abapType: '', length: '' }
}
