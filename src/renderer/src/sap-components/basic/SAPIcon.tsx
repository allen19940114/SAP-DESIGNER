import React from 'react'
import { ComponentType } from '@/types/component'
import type { SAPComponentDefinition, SAPComponentRenderProps } from '@/types/component'

const SAPIconRenderer: React.FC<SAPComponentRenderProps> = ({ element, isEditing, onLabelChange }) => {
  const { label, style, props } = element
  const iconChar = (props.icon as string) || '⚙'

  const wrapperStyle: React.CSSProperties = {
    width: '100%', height: '100%', display: 'flex', flexDirection: 'column',
    alignItems: 'center', justifyContent: 'center', gap: 4,
    fontFamily: 'var(--sap-font-family)', color: style.fontColor, cursor: 'default', userSelect: 'none'
  }

  if (isEditing) {
    return (
      <div style={wrapperStyle}>
        <span style={{ fontSize: style.fontSize * 1.5 }}>{iconChar}</span>
        <input autoFocus defaultValue={label}
          onBlur={(e) => onLabelChange?.(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter') onLabelChange?.((e.target as HTMLInputElement).value) }}
          style={{ background: 'transparent', border: 'none', outline: 'none', textAlign: 'center', width: '100%', color: 'inherit', fontSize: 11, fontFamily: 'inherit' }}
        />
      </div>
    )
  }

  return (
    <div style={wrapperStyle}>
      <span style={{ fontSize: style.fontSize * 1.5 }}>{iconChar}</span>
      <span style={{ fontSize: 11, color: '#556b82' }}>{label}</span>
    </div>
  )
}

export const sapIconDefinition: SAPComponentDefinition = {
  type: ComponentType.Icon, displayName: 'Icon', category: 'basic', icon: '★',
  thumbnail: () => <div style={{ fontSize: 16, textAlign: 'center' }}>⚙ Icon</div>,
  defaultSize: { width: 60, height: 60 },
  defaultProps: { icon: '⚙' },
  defaultStyle: { fontSize: 20, fontWeight: 'normal', fontColor: '#0070f2', backgroundColor: 'transparent', borderWidth: 0, borderStyle: 'none' },
  renderComponent: SAPIconRenderer,
  propertyFields: [{ key: 'icon', label: 'Icon Character', type: 'text' }],
  defaultFieldMeta: { fieldType: 'Icon', abapType: 'CHAR', length: '4' }
}
