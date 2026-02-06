import React, { useMemo, useCallback } from 'react'
import { useCanvasStore } from '@/store/canvas-store'

export const FieldTable: React.FC = () => {
  const elements = useCanvasStore((s) => s.elements)
  const elementOrder = useCanvasStore((s) => s.elementOrder)
  const updateElement = useCanvasStore((s) => s.updateElement)

  const rows = useMemo(() => {
    return elementOrder.map((id) => elements[id]).filter(Boolean)
  }, [elements, elementOrder])

  const columns = [
    { key: 'fieldId', label: 'Field ID', width: 70 },
    { key: 'technicalField', label: 'Technical Field', width: 130 },
    { key: 'description', label: 'Description', width: 150 },
    { key: 'fieldType', label: 'Field Type', width: 100 },
    { key: 'abapType', label: 'ABAP Type', width: 90 },
    { key: 'length', label: 'Length', width: 70 },
    { key: 'sample', label: 'Sample', width: 100 },
    { key: 'logic', label: 'Logic', width: 120 },
    { key: 'remarks', label: 'Remarks', width: 120 }
  ]

  const handleCellChange = useCallback((elementId: string, fieldKey: string, value: string) => {
    const el = elements[elementId]
    if (!el) return
    updateElement(elementId, { fieldMeta: { ...el.fieldMeta, [fieldKey]: value } })
  }, [elements, updateElement])

  const handleCopyAll = useCallback(() => {
    const header = columns.map(c => c.label).join('\t')
    const body = rows.map(el => columns.map(c => (el.fieldMeta as Record<string, string>)[c.key] || '').join('\t')).join('\n')
    navigator.clipboard.writeText(header + '\n' + body)
  }, [rows])

  const handleExportCSV = useCallback(() => {
    const header = columns.map(c => c.label).join(',')
    const body = rows.map(el =>
      columns.map(c => {
        const val = (el.fieldMeta as Record<string, string>)[c.key] || ''
        return val.includes(',') ? `"${val}"` : val
      }).join(',')
    ).join('\n')
    window.electronAPI?.exportCSV(header + '\n' + body)
  }, [rows])

  const thStyle: React.CSSProperties = {
    padding: '6px 8px', fontSize: 11, fontWeight: 600, color: 'var(--sap-table-header-color)',
    backgroundColor: 'var(--sap-table-header-background)', borderBottom: '1px solid var(--sap-table-border-color)',
    borderRight: '1px solid var(--sap-table-border-color)', textAlign: 'left', position: 'sticky', top: 0, zIndex: 1
  }

  const tdStyle: React.CSSProperties = {
    padding: 0, borderBottom: '1px solid var(--sap-table-border-color)', borderRight: '1px solid var(--sap-table-border-color)'
  }

  const inputStyle: React.CSSProperties = {
    width: '100%', height: '100%', padding: '4px 8px', fontSize: 12, border: 'none', outline: 'none',
    backgroundColor: 'transparent', fontFamily: 'var(--sap-font-family)', color: 'var(--sap-text-color)', boxSizing: 'border-box'
  }

  if (rows.length === 0) {
    return <div style={{ padding: 20, color: '#788fa6', fontSize: 13, textAlign: 'center' }}>Add elements to the canvas to generate the field table</div>
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div style={{ display: 'flex', gap: 6, padding: '8px 12px', borderBottom: '1px solid #e5e5e5', flexShrink: 0 }}>
        <button onClick={handleCopyAll} style={{ height: 28, padding: '0 12px', fontSize: 12, borderRadius: 6, border: '1px solid #bcc3ca', background: '#fff', color: '#1d2d3e', cursor: 'pointer', fontFamily: 'var(--sap-font-family)' }}>Copy All</button>
        <button onClick={handleExportCSV} style={{ height: 28, padding: '0 12px', fontSize: 12, borderRadius: 6, border: '1px solid #bcc3ca', background: '#fff', color: '#1d2d3e', cursor: 'pointer', fontFamily: 'var(--sap-font-family)' }}>Export CSV</button>
        <span style={{ fontSize: 12, color: '#788fa6', display: 'flex', alignItems: 'center', marginLeft: 'auto' }}>{rows.length} fields</span>
      </div>
      <div style={{ flex: 1, overflow: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: 'var(--sap-font-family)', tableLayout: 'fixed' }}>
          <thead><tr>{columns.map(c => <th key={c.key} style={{ ...thStyle, width: c.width }}>{c.label}</th>)}</tr></thead>
          <tbody>
            {rows.map(el => (
              <tr key={el.id}>
                {columns.map(c => (
                  <td key={c.key} style={tdStyle}>
                    <input style={inputStyle} value={(el.fieldMeta as Record<string, string>)[c.key] || ''} onChange={(e) => handleCellChange(el.id, c.key, e.target.value)} />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
