import React from 'react'
import { ComponentType } from '@/types/component'
import type { SAPComponentDefinition, SAPComponentRenderProps } from '@/types/component'

const SAPToolbarRenderer: React.FC<SAPComponentRenderProps> = ({ element, isEditing, onLabelChange }) => {
  const { label, props } = element
  const buttons = ((props.buttons as string) || 'Action 1, Action 2').split(',').map(s => s.trim())

  const barStyle: React.CSSProperties = {
    width: '100%', height: '100%', fontFamily: 'var(--sap-font-family)',
    backgroundColor: 'var(--sap-toolbar-background)', display: 'flex', alignItems: 'center',
    padding: '0 12px', gap: 8, borderBottom: '1px solid #e5e5e5', boxSizing: 'border-box'
  }

  const titleStyle: React.CSSProperties = {
    fontSize: 16, fontWeight: 600, color: '#1d2d3e', marginRight: 'auto'
  }

  const btnStyle: React.CSSProperties = {
    height: 28, padding: '0 12px', fontSize: 12, borderRadius: 6,
    border: '1px solid #bcc3ca', backgroundColor: '#fff', color: '#1d2d3e',
    cursor: 'default', display: 'flex', alignItems: 'center'
  }

  if (isEditing) {
    return (
      <div style={barStyle}>
        <input autoFocus defaultValue={label}
          onBlur={(e) => onLabelChange?.(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter') onLabelChange?.((e.target as HTMLInputElement).value) }}
          style={{ ...titleStyle, background: 'transparent', border: 'none', outline: 'none', flex: 1 }}
        />
      </div>
    )
  }

  return (
    <div style={barStyle}>
      <div style={titleStyle}>{label}</div>
      {buttons.map((b, i) => <div key={i} style={btnStyle}>{b}</div>)}
    </div>
  )
}

export const sapToolbarDefinition: SAPComponentDefinition = {
  type: ComponentType.Toolbar, displayName: 'Toolbar', category: 'layout', icon: '═',
  thumbnail: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 4, padding: '2px 4px', background: '#fff', borderBottom: '1px solid #e5e5e5', fontSize: 8 }}>
      <span style={{ fontWeight: 600, marginRight: 'auto' }}>Title</span>
      <div style={{ padding: '1px 6px', border: '1px solid #bcc3ca', borderRadius: 3 }}>Action</div>
    </div>
  ),
  defaultSize: { width: 500, height: 44 },
  defaultProps: { buttons: 'Create, Edit, Delete' },
  defaultStyle: { fontSize: 14, fontWeight: 'normal', fontColor: '#1d2d3e', backgroundColor: '#ffffff' },
  renderComponent: SAPToolbarRenderer,
  propertyFields: [{ key: 'buttons', label: 'Buttons (comma separated)', type: 'text' }],
  defaultFieldMeta: { fieldType: 'Toolbar', abapType: '', length: '' }
}
