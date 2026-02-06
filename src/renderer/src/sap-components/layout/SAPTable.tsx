import React from 'react'
import { ComponentType } from '@/types/component'
import type { SAPComponentDefinition, SAPComponentRenderProps } from '@/types/component'

const SAPTableRenderer: React.FC<SAPComponentRenderProps> = ({ element, isEditing, onLabelChange }) => {
  const { label, props, style } = element
  const cols = ((props.columns as string) || 'Column 1, Column 2, Column 3').split(',').map(s => s.trim())
  const rowCount = (props.rows as number) || 3

  const tableStyle: React.CSSProperties = {
    width: '100%', height: '100%', display: 'flex', flexDirection: 'column',
    fontFamily: 'var(--sap-font-family)', fontSize: style.fontSize,
    border: '1px solid var(--sap-table-border-color)', borderRadius: 8,
    overflow: 'hidden', boxSizing: 'border-box'
  }

  const headerRowStyle: React.CSSProperties = {
    display: 'flex', backgroundColor: 'var(--sap-table-header-background)',
    borderBottom: '1px solid var(--sap-table-border-color)', flexShrink: 0
  }

  const headerCellStyle: React.CSSProperties = {
    flex: 1, padding: '8px 12px', fontSize: 12, fontWeight: 600,
    color: 'var(--sap-table-header-color)', borderRight: '1px solid var(--sap-table-border-color)'
  }

  const bodyRowStyle = (i: number): React.CSSProperties => ({
    display: 'flex', borderBottom: i < rowCount - 1 ? '1px solid var(--sap-table-border-color)' : 'none'
  })

  const cellStyle: React.CSSProperties = {
    flex: 1, padding: '8px 12px', fontSize: style.fontSize, color: 'var(--sap-text-color)',
    borderRight: '1px solid var(--sap-table-border-color)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'
  }

  if (isEditing) {
    return (
      <div style={tableStyle}>
        <div style={{ padding: '6px 12px', borderBottom: '1px solid #e5e5e5' }}>
          <input autoFocus defaultValue={label}
            onBlur={(e) => onLabelChange?.(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') onLabelChange?.((e.target as HTMLInputElement).value) }}
            style={{ background: 'transparent', border: 'none', outline: 'none', width: '100%', fontWeight: 600, fontSize: 14, fontFamily: 'inherit', color: '#1d2d3e' }}
          />
        </div>
        <div style={headerRowStyle}>{cols.map((c, i) => <div key={i} style={headerCellStyle}>{c}</div>)}</div>
      </div>
    )
  }

  return (
    <div style={tableStyle}>
      {label && (
        <div style={{ padding: '8px 12px', fontWeight: 600, fontSize: 14, color: '#1d2d3e', borderBottom: '1px solid #e5e5e5' }}>
          {label}
        </div>
      )}
      <div style={headerRowStyle}>
        {cols.map((c, i) => <div key={i} style={headerCellStyle}>{c}</div>)}
      </div>
      <div style={{ flex: 1, overflow: 'hidden' }}>
        {Array.from({ length: rowCount }).map((_, ri) => (
          <div key={ri} style={bodyRowStyle(ri)}>
            {cols.map((_, ci) => <div key={ci} style={cellStyle}>—</div>)}
          </div>
        ))}
      </div>
    </div>
  )
}

export const sapTableDefinition: SAPComponentDefinition = {
  type: ComponentType.Table, displayName: 'Table', category: 'layout', icon: '⊞',
  thumbnail: () => (
    <div style={{ border: '1px solid #e5e5e5', borderRadius: 4, overflow: 'hidden', fontSize: 8 }}>
      <div style={{ display: 'flex', background: '#f5f6f7', borderBottom: '1px solid #e5e5e5' }}>
        <div style={{ flex: 1, padding: '2px 4px', fontWeight: 600, color: '#556b82' }}>Col 1</div>
        <div style={{ flex: 1, padding: '2px 4px', fontWeight: 600, color: '#556b82' }}>Col 2</div>
      </div>
      <div style={{ display: 'flex', borderBottom: '1px solid #e5e5e5' }}>
        <div style={{ flex: 1, padding: '2px 4px' }}>—</div><div style={{ flex: 1, padding: '2px 4px' }}>—</div>
      </div>
    </div>
  ),
  defaultSize: { width: 500, height: 240 },
  defaultProps: { columns: 'Column 1, Column 2, Column 3', rows: 5 },
  defaultStyle: { fontSize: 13, fontWeight: 'normal', fontColor: '#1d2d3e', backgroundColor: '#ffffff', borderRadius: 8 },
  renderComponent: SAPTableRenderer,
  propertyFields: [
    { key: 'columns', label: 'Columns (comma separated)', type: 'text' },
    { key: 'rows', label: 'Row count', type: 'number', min: 1, max: 20 }
  ],
  defaultFieldMeta: { fieldType: 'Table', abapType: '', length: '' }
}
