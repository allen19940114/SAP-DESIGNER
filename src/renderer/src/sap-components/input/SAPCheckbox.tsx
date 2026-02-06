import React from 'react'
import { ComponentType } from '@/types/component'
import type { SAPComponentDefinition, SAPComponentRenderProps } from '@/types/component'

const SAPCheckboxRenderer: React.FC<SAPComponentRenderProps> = ({ element, isEditing, onLabelChange }) => {
  const { label, props } = element
  const checked = props.checked as boolean

  const wrapperStyle: React.CSSProperties = {
    width: '100%', height: '100%', display: 'flex', alignItems: 'center', gap: 8,
    fontFamily: 'var(--sap-font-family)', fontSize: element.style.fontSize,
    color: 'var(--sap-text-color)', cursor: 'default', userSelect: 'none', padding: '0 4px', boxSizing: 'border-box'
  }

  const boxStyle: React.CSSProperties = {
    width: 18, height: 18, borderRadius: 4, flexShrink: 0,
    border: checked ? '2px solid #0070f2' : '2px solid #89919a',
    backgroundColor: checked ? '#0070f2' : '#fff',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    color: '#fff', fontSize: 12, fontWeight: 700
  }

  if (isEditing) {
    return (
      <div style={wrapperStyle}>
        <div style={boxStyle}>{checked ? '✓' : ''}</div>
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
      <div style={boxStyle}>{checked ? '✓' : ''}</div>
      <span>{label}</span>
    </div>
  )
}

export const sapCheckboxDefinition: SAPComponentDefinition = {
  type: ComponentType.Checkbox, displayName: 'Checkbox', category: 'input', icon: '☑',
  thumbnail: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 10 }}>
      <div style={{ width: 12, height: 12, borderRadius: 2, border: '2px solid #0070f2', background: '#0070f2', color: '#fff', fontSize: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>✓</div>
      <span>Checkbox</span>
    </div>
  ),
  defaultSize: { width: 160, height: 32 },
  defaultProps: { checked: true },
  defaultStyle: { fontSize: 14, fontWeight: 'normal', fontColor: '#1d2d3e', backgroundColor: 'transparent', borderWidth: 0, borderStyle: 'none' },
  renderComponent: SAPCheckboxRenderer,
  propertyFields: [{ key: 'checked', label: 'Checked', type: 'boolean' }],
  defaultFieldMeta: { fieldType: 'Checkbox', abapType: 'CHAR', length: '1' }
}
