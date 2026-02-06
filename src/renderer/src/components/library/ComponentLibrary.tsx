import React from 'react'
import { componentRegistry } from '@/sap-components/index'
import { useCanvasStore } from '@/store/canvas-store'
import type { ComponentCategory, SAPComponentDefinition } from '@/types/component'

const categories: { key: ComponentCategory; label: string }[] = [
  { key: 'basic', label: 'Basic' },
  { key: 'input', label: 'Input' },
  { key: 'layout', label: 'Layout' },
  { key: 'flow', label: 'Flow / Process' }
]

const ComponentCard: React.FC<{ definition: SAPComponentDefinition }> = ({ definition }) => {
  const addElement = useCanvasStore((s) => s.addElement)
  const canvasWidth = useCanvasStore((s) => s.canvasWidth)
  const canvasHeight = useCanvasStore((s) => s.canvasHeight)

  const handleDragStart = (e: React.DragEvent) => {
    e.dataTransfer.setData(
      'application/sap-component',
      JSON.stringify({ type: definition.type })
    )
    e.dataTransfer.effectAllowed = 'copy'
  }

  const handleClick = () => {
    // Quick add to center of canvas
    addElement(definition.type, {
      x: canvasWidth / 2 - definition.defaultSize.width / 2,
      y: canvasHeight / 2 - definition.defaultSize.height / 2
    })
  }

  return (
    <div
      draggable
      onDragStart={handleDragStart}
      onClick={handleClick}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        padding: '8px 12px',
        borderRadius: 8,
        cursor: 'grab',
        transition: 'background 0.15s',
        userSelect: 'none'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = 'var(--sap-list-hover-background)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = 'transparent'
      }}
    >
      {/* Icon */}
      <div
        style={{
          width: 32,
          height: 32,
          borderRadius: 6,
          backgroundColor: '#f0f4f8',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 14,
          fontWeight: 700,
          color: '#0070f2',
          flexShrink: 0
        }}
      >
        {definition.icon}
      </div>

      {/* Name and thumbnail */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 13, fontWeight: 500, color: '#1d2d3e' }}>
          {definition.displayName}
        </div>
        <div style={{ marginTop: 2, transform: 'scale(0.85)', transformOrigin: 'left top' }}>
          {definition.thumbnail()}
        </div>
      </div>
    </div>
  )
}

export const ComponentLibrary: React.FC = () => {
  return (
    <div style={{ padding: '8px 0' }}>
      {categories.map((cat) => {
        const components = componentRegistry.getByCategory(cat.key)
        if (components.length === 0) return null

        return (
          <div key={cat.key} style={{ marginBottom: 8 }}>
            <div
              style={{
                padding: '6px 16px',
                fontSize: 11,
                fontWeight: 700,
                color: '#788fa6',
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }}
            >
              {cat.label}
            </div>
            {components.map((def) => (
              <ComponentCard key={def.type} definition={def} />
            ))}
          </div>
        )
      })}
    </div>
  )
}
