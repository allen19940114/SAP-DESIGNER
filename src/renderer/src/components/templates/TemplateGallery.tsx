import React from 'react'
import { builtInTemplates } from '@/templates/index'
import { useCanvasStore } from '@/store/canvas-store'

export const TemplateGallery: React.FC = () => {
  const loadFromTemplate = useCanvasStore((s) => s.loadFromTemplate)
  const setCanvasSize = useCanvasStore((s) => s.setCanvasSize)

  const handleApply = (templateId: string) => {
    const template = builtInTemplates.find((t) => t.id === templateId)
    if (!template) return
    if (template.canvasWidth && template.canvasHeight) {
      setCanvasSize(template.canvasWidth, template.canvasHeight)
    }
    loadFromTemplate(template.elements)
  }

  return (
    <div style={{ padding: 8 }}>
      {builtInTemplates.map((t) => (
        <div
          key={t.id}
          style={{
            padding: 12, marginBottom: 8, borderRadius: 8,
            border: '1px solid #e5e5e5', cursor: 'pointer',
            transition: 'border-color 0.15s, box-shadow 0.15s'
          }}
          onClick={() => handleApply(t.id)}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = '#0070f2'
            e.currentTarget.style.boxShadow = '0 1px 4px rgba(0,112,242,0.15)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = '#e5e5e5'
            e.currentTarget.style.boxShadow = 'none'
          }}
        >
          <div style={{ fontSize: 14, fontWeight: 600, color: '#1d2d3e', marginBottom: 4 }}>
            {t.name}
          </div>
          <div style={{ fontSize: 12, color: '#788fa6', lineHeight: '1.4' }}>
            {t.description}
          </div>
          <div style={{ marginTop: 8, fontSize: 11, color: '#0070f2', fontWeight: 500 }}>
            {t.elements.length} elements
          </div>
        </div>
      ))}
    </div>
  )
}
