import React, { useState, useCallback } from 'react'
import { builtInTemplates } from '@/templates/index'
import { useCanvasStore } from '@/store/canvas-store'
import { useTemplateStore } from '@/store/template-store'
import { useUIStore } from '@/store/ui-store'
import type { Template } from '@/types/template'

const cardStyle: React.CSSProperties = {
  padding: 12, marginBottom: 8, borderRadius: 8,
  border: '1px solid #e5e5e5', cursor: 'pointer',
  transition: 'border-color 0.15s, box-shadow 0.15s',
  position: 'relative'
}

const TemplateCard: React.FC<{ template: Template; onApply: () => void; onDelete?: () => void }> = ({ template, onApply, onDelete }) => (
  <div
    style={cardStyle}
    onClick={onApply}
    onMouseEnter={(e) => {
      e.currentTarget.style.borderColor = '#0070f2'
      e.currentTarget.style.boxShadow = '0 1px 4px rgba(0,112,242,0.15)'
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.borderColor = '#e5e5e5'
      e.currentTarget.style.boxShadow = 'none'
    }}
  >
    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
      <div style={{ fontSize: 14, fontWeight: 600, color: '#1d2d3e', flex: 1 }}>
        {template.name}
      </div>
      {template.isCustom && (
        <span style={{ fontSize: 10, padding: '2px 6px', borderRadius: 4, backgroundColor: '#e8f0fe', color: '#0070f2', fontWeight: 500 }}>
          Custom
        </span>
      )}
    </div>
    <div style={{ fontSize: 12, color: '#788fa6', lineHeight: '1.4', marginTop: 4 }}>
      {template.description}
    </div>
    <div style={{ display: 'flex', alignItems: 'center', marginTop: 8 }}>
      <span style={{ fontSize: 11, color: '#0070f2', fontWeight: 500 }}>
        {template.elements.length} elements
      </span>
      {onDelete && (
        <button
          onClick={(e) => { e.stopPropagation(); onDelete() }}
          style={{
            marginLeft: 'auto', fontSize: 11, color: '#aa0808', background: 'none',
            border: 'none', cursor: 'pointer', padding: '2px 8px', borderRadius: 4,
            fontFamily: 'var(--sap-font-family)'
          }}
          onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#fce8e6' }}
          onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent' }}
        >
          Delete
        </button>
      )}
    </div>
  </div>
)

export const TemplateGallery: React.FC = () => {
  const customTemplates = useTemplateStore((s) => s.customTemplates)
  const saveAsTemplate = useTemplateStore((s) => s.saveAsTemplate)
  const deleteCustomTemplate = useTemplateStore((s) => s.deleteCustomTemplate)
  const showToast = useUIStore((s) => s.showToast)

  const [showSaveDialog, setShowSaveDialog] = useState(false)
  const [saveName, setSaveName] = useState('')
  const [saveDesc, setSaveDesc] = useState('')

  const handleApply = useCallback((template: Template) => {
    const store = useCanvasStore.getState()
    if (template.canvasWidth && template.canvasHeight) {
      store.setCanvasSize(template.canvasWidth, template.canvasHeight)
    }
    // Deep clone elements to avoid mutating the template's stored data
    const cloned = JSON.parse(JSON.stringify(template.elements))
    store.loadFromTemplate(cloned)
    showToast(`Template "${template.name}" applied`)
  }, [showToast])

  const handleSave = useCallback(async () => {
    if (!saveName.trim()) return
    // Read directly from store to guarantee latest positions
    const store = useCanvasStore.getState()
    const els = store.elementOrder.map((id) => store.elements[id]).filter(Boolean)
    if (els.length === 0) {
      showToast('Canvas is empty, add elements first', 'error')
      return
    }
    await saveAsTemplate(saveName.trim(), saveDesc.trim(), els, store.canvasWidth, store.canvasHeight)
    showToast(`Template "${saveName.trim()}" saved`)
    setSaveName('')
    setSaveDesc('')
    setShowSaveDialog(false)
  }, [saveName, saveDesc, saveAsTemplate, showToast])

  const handleDelete = useCallback(async (id: string, name: string) => {
    await deleteCustomTemplate(id)
    showToast(`Template "${name}" deleted`)
  }, [deleteCustomTemplate, showToast])

  const inputStyle: React.CSSProperties = {
    width: '100%', height: 32, padding: '0 8px', fontSize: 13,
    border: 'none', borderBottom: '2px solid #bcc3ca', borderRadius: '4px 4px 0 0',
    backgroundColor: '#f5f6f7', color: '#1d2d3e', fontFamily: 'var(--sap-font-family)',
    outline: 'none', boxSizing: 'border-box'
  }

  const btnPrimary: React.CSSProperties = {
    height: 32, padding: '0 16px', fontSize: 12, fontWeight: 600,
    border: 'none', borderRadius: 8, backgroundColor: '#0070f2', color: '#fff',
    cursor: 'pointer', fontFamily: 'var(--sap-font-family)'
  }

  const btnSecondary: React.CSSProperties = {
    ...btnPrimary, backgroundColor: 'transparent', color: '#556b82', border: '1px solid #bcc3ca'
  }

  return (
    <div style={{ padding: 8 }}>
      {/* Save as template button */}
      <button
        style={{
          width: '100%', height: 36, marginBottom: 12, borderRadius: 8,
          border: '1px dashed #0070f2', backgroundColor: '#f0f7ff', color: '#0070f2',
          fontSize: 13, fontWeight: 500, cursor: 'pointer', fontFamily: 'var(--sap-font-family)'
        }}
        onClick={() => setShowSaveDialog(true)}
      >
        + Save Current as Template
      </button>

      {/* Save dialog */}
      {showSaveDialog && (
        <div style={{
          marginBottom: 12, padding: 12, borderRadius: 8, border: '1px solid #0070f2',
          backgroundColor: '#fafbfc'
        }}>
          <div style={{ fontSize: 12, fontWeight: 600, color: '#1d2d3e', marginBottom: 8 }}>
            Save as Template
          </div>
          <div style={{ marginBottom: 8 }}>
            <input
              style={inputStyle}
              placeholder="Template name"
              value={saveName}
              onChange={(e) => setSaveName(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter') handleSave() }}
              autoFocus
            />
          </div>
          <div style={{ marginBottom: 10 }}>
            <input
              style={inputStyle}
              placeholder="Description (optional)"
              value={saveDesc}
              onChange={(e) => setSaveDesc(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter') handleSave() }}
            />
          </div>
          <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
            <button style={btnSecondary} onClick={() => setShowSaveDialog(false)}>Cancel</button>
            <button style={btnPrimary} onClick={handleSave} disabled={!saveName.trim()}>Save</button>
          </div>
        </div>
      )}

      {/* Custom templates */}
      {customTemplates.length > 0 && (
        <>
          <div style={{ fontSize: 11, fontWeight: 700, color: '#788fa6', textTransform: 'uppercase', letterSpacing: '0.5px', padding: '4px 4px 6px', marginTop: 4 }}>
            My Templates
          </div>
          {customTemplates.map((t) => (
            <TemplateCard
              key={t.id}
              template={t}
              onApply={() => handleApply(t)}
              onDelete={() => handleDelete(t.id, t.name)}
            />
          ))}
        </>
      )}

      {/* Built-in templates */}
      <div style={{ fontSize: 11, fontWeight: 700, color: '#788fa6', textTransform: 'uppercase', letterSpacing: '0.5px', padding: '4px 4px 6px', marginTop: customTemplates.length > 0 ? 8 : 0 }}>
        Built-in Templates
      </div>
      {builtInTemplates.map((t) => (
        <TemplateCard key={t.id} template={t} onApply={() => handleApply(t)} />
      ))}
    </div>
  )
}
