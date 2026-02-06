import React from 'react'
import { ComponentType } from '@/types/component'
import type { SAPComponentDefinition, SAPComponentRenderProps } from '@/types/component'

const SAPRadioButtonRenderer: React.FC<SAPComponentRenderProps> = ({ element, isEditing, onLabelChange }) => {
  const { label, props } = element
  const selected = props.selected as boolean

  const wrapperStyle: React.CSSProperties = {
    width: '100%', height: '100%', display: 'flex', alignItems: 'center', gap: 8,
    fontFamily: 'var(--sap-font-family)', fontSize: element.style.fontSize,
    color: 'var(--sap-text-color)', cursor: 'default', userSelect: 'none', padding: '0 4px', boxSizing: 'border-box'
  }

  const radioStyle: React.CSSProperties = {
    width: 18, height: 18, borderRadius: '50%', flexShrink: 0,
    border: selected ? '2px solid #0070f2' : '2px solid #89919a',
    backgroundColor: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center'
  }

  const dotStyle: React.CSSProperties = {
    width: 8, height: 8, borderRadius: '50%', backgroundColor: '#0070f2'
  }

  if (isEditing) {
    return (
      <div style={wrapperStyle}>
        <div style={radioStyle}>{selected && <div style={dotStyle} />}</div>
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
      <div style={radioStyle}>{selected && <div style={dotStyle} />}</div>
      <span>{label}</span>
    </div>
  )
}

export const sapRadioButtonDefinition: SAPComponentDefinition = {
  type: ComponentType.RadioButton, displayName: 'Radio Button', category: 'input', icon: '◉',
  thumbnail: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 10 }}>
      <div style={{ width: 12, height: 12, borderRadius: '50%', border: '2px solid #0070f2', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#0070f2' }} />
      </div>
      <span>Radio</span>
    </div>
  ),
  defaultSize: { width: 160, height: 32 },
  defaultProps: { selected: true },
  defaultStyle: { fontSize: 14, fontWeight: 'normal', fontColor: '#1d2d3e', backgroundColor: 'transparent', borderWidth: 0, borderStyle: 'none' },
  renderComponent: SAPRadioButtonRenderer,
  propertyFields: [{ key: 'selected', label: 'Selected', type: 'boolean' }],
  defaultFieldMeta: { fieldType: 'RadioButton', abapType: 'CHAR', length: '1' }
}
