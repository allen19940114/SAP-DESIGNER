import React from 'react'
import { ComponentType } from '@/types/component'
import type { SAPComponentDefinition, SAPComponentRenderProps } from '@/types/component'

const SAPTabRenderer: React.FC<SAPComponentRenderProps> = ({ element, isEditing, onLabelChange }) => {
  const { label, props } = element
  const tabs = ((props.tabs as string) || 'Tab 1, Tab 2, Tab 3').split(',').map(s => s.trim())
  const activeTab = (props.activeTab as number) || 0

  const containerStyle: React.CSSProperties = {
    width: '100%', height: '100%', fontFamily: 'var(--sap-font-family)',
    display: 'flex', flexDirection: 'column', backgroundColor: '#fff',
    borderRadius: 12, border: '1px solid #e5e5e5', overflow: 'hidden', boxSizing: 'border-box'
  }

  const tabBarStyle: React.CSSProperties = {
    display: 'flex', borderBottom: '1px solid #e5e5e5', flexShrink: 0
  }

  const tabStyle = (i: number): React.CSSProperties => ({
    padding: '10px 20px', fontSize: 13, cursor: 'default', userSelect: 'none',
    color: i === activeTab ? '#0070f2' : '#556b82',
    fontWeight: i === activeTab ? 600 : 400,
    borderBottom: i === activeTab ? '2px solid #0070f2' : '2px solid transparent'
  })

  if (isEditing) {
    return (
      <div style={containerStyle}>
        <div style={tabBarStyle}>
          <input autoFocus defaultValue={label}
            onBlur={(e) => onLabelChange?.(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') onLabelChange?.((e.target as HTMLInputElement).value) }}
            style={{ background: 'transparent', border: 'none', outline: 'none', padding: '10px 20px', fontSize: 13, fontWeight: 600, fontFamily: 'inherit', color: '#0070f2' }}
          />
        </div>
        <div style={{ flex: 1, padding: 16, color: '#788fa6', fontSize: 13 }}>Tab content</div>
      </div>
    )
  }

  return (
    <div style={containerStyle}>
      <div style={tabBarStyle}>
        {tabs.map((t, i) => <div key={i} style={tabStyle(i)}>{t}</div>)}
      </div>
      <div style={{ flex: 1, padding: 16, color: '#788fa6', fontSize: 13 }}>Tab content area</div>
    </div>
  )
}

export const sapTabDefinition: SAPComponentDefinition = {
  type: ComponentType.Tab, displayName: 'Tab', category: 'layout', icon: '⊟',
  thumbnail: () => (
    <div style={{ border: '1px solid #e5e5e5', borderRadius: 4, overflow: 'hidden' }}>
      <div style={{ display: 'flex', borderBottom: '1px solid #e5e5e5', fontSize: 8 }}>
        <div style={{ padding: '2px 6px', color: '#0070f2', fontWeight: 600, borderBottom: '2px solid #0070f2' }}>Tab 1</div>
        <div style={{ padding: '2px 6px', color: '#556b82' }}>Tab 2</div>
      </div>
      <div style={{ padding: 4, fontSize: 7, color: '#788fa6' }}>Content</div>
    </div>
  ),
  defaultSize: { width: 500, height: 300 },
  defaultProps: { tabs: 'Tab 1, Tab 2, Tab 3', activeTab: 0 },
  defaultStyle: { fontSize: 14, fontWeight: 'normal', fontColor: '#1d2d3e', backgroundColor: '#ffffff', borderRadius: 12 },
  renderComponent: SAPTabRenderer,
  propertyFields: [
    { key: 'tabs', label: 'Tabs (comma separated)', type: 'text' },
    { key: 'activeTab', label: 'Active Tab Index', type: 'number', min: 0 }
  ],
  defaultFieldMeta: { fieldType: 'Tab', abapType: '', length: '' }
}
