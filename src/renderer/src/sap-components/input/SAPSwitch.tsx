import React from 'react'
import { ComponentType } from '@/types/component'
import type { SAPComponentDefinition, SAPComponentRenderProps } from '@/types/component'

const SAPSwitchRenderer: React.FC<SAPComponentRenderProps> = ({ element, isEditing, onLabelChange }) => {
  const { label, props } = element
  const on = props.on as boolean

  const wrapperStyle: React.CSSProperties = {
    width: '100%', height: '100%', display: 'flex', alignItems: 'center', gap: 10,
    fontFamily: 'var(--sap-font-family)', fontSize: element.style.fontSize,
    color: 'var(--sap-text-color)', cursor: 'default', userSelect: 'none', padding: '0 4px', boxSizing: 'border-box'
  }

  const trackStyle: React.CSSProperties = {
    width: 42, height: 22, borderRadius: 11, flexShrink: 0, position: 'relative',
    backgroundColor: on ? '#0070f2' : '#bcc3ca', transition: 'background 0.2s'
  }

  const thumbStyle: React.CSSProperties = {
    width: 18, height: 18, borderRadius: '50%', backgroundColor: '#fff',
    position: 'absolute', top: 2, left: on ? 22 : 2, transition: 'left 0.2s',
    boxShadow: '0 1px 3px rgba(0,0,0,0.2)'
  }

  if (isEditing) {
    return (
      <div style={wrapperStyle}>
        <div style={trackStyle}><div style={thumbStyle} /></div>
        <input autoFocus defaultValue={label}
          onBlur={(e) => onLabelChange?.(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter') onLabelChange?.((e.target as HTMLInputElement).value) }}
          style={{ background: 'transparent', border: 'none', outline: 'none', flex: 1, color: 'inherit', fontSize: 'inherit', fontFamily: 'inherit' }}
        />
      </div>
    )
  }

  return (
    <div style={wrapperStyle}>
      <div style={trackStyle}><div style={thumbStyle} /></div>
      <span>{label}</span>
    </div>
  )
}

export const sapSwitchDefinition: SAPComponentDefinition = {
  type: ComponentType.Switch, displayName: 'Switch', category: 'input', icon: '⊙',
  thumbnail: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 10 }}>
      <div style={{ width: 24, height: 13, borderRadius: 7, background: '#0070f2', position: 'relative' }}>
        <div style={{ width: 9, height: 9, borderRadius: '50%', background: '#fff', position: 'absolute', top: 2, left: 13 }} />
      </div>
      <span>Switch</span>
    </div>
  ),
  defaultSize: { width: 160, height: 36 },
  defaultProps: { on: true },
  defaultStyle: { fontSize: 14, fontWeight: 'normal', fontColor: '#1d2d3e', backgroundColor: 'transparent', borderWidth: 0, borderStyle: 'none' },
  renderComponent: SAPSwitchRenderer,
  propertyFields: [{ key: 'on', label: 'On', type: 'boolean' }],
  defaultFieldMeta: { fieldType: 'Switch', abapType: 'CHAR', length: '1' }
}
