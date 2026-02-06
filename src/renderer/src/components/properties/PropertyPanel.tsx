import React from 'react'
import { useCanvasStore } from '@/store/canvas-store'
import { componentRegistry } from '@/sap-components/index'

export const PropertyPanel: React.FC = () => {
  const selectedIds = useCanvasStore((s) => s.selectedElementIds)
  const elements = useCanvasStore((s) => s.elements)
  const updateElement = useCanvasStore((s) => s.updateElement)
  const updateElementStyle = useCanvasStore((s) => s.updateElementStyle)

  if (selectedIds.length === 0) {
    return (
      <div style={{ padding: 20, color: '#788fa6', fontSize: 13, textAlign: 'center' }}>
        Select an element to edit its properties
      </div>
    )
  }

  if (selectedIds.length > 1) {
    return (
      <div style={{ padding: 20, color: '#788fa6', fontSize: 13, textAlign: 'center' }}>
        {selectedIds.length} elements selected
      </div>
    )
  }

  const element = elements[selectedIds[0]]
  if (!element) return null

  const definition = componentRegistry.get(element.type)

  const inputStyle: React.CSSProperties = {
    width: '100%',
    height: 32,
    padding: '0 8px',
    fontSize: 13,
    border: 'none',
    borderBottom: '2px solid var(--sap-field-border-color)',
    borderRadius: '4px 4px 0 0',
    backgroundColor: 'var(--sap-field-background)',
    color: 'var(--sap-field-text-color)',
    fontFamily: 'var(--sap-font-family)',
    outline: 'none',
    boxSizing: 'border-box'
  }

  const labelStyle: React.CSSProperties = {
    fontSize: 11,
    color: '#556b82',
    marginBottom: 4,
    fontWeight: 500
  }

  const rowStyle: React.CSSProperties = {
    display: 'flex',
    gap: 8,
    marginBottom: 12
  }

  const fieldStyle: React.CSSProperties = {
    flex: 1
  }

  return (
    <div style={{ padding: 16 }}>
      {/* Component type header */}
      <div
        style={{
          fontSize: 14,
          fontWeight: 700,
          color: '#1d2d3e',
          marginBottom: 16,
          paddingBottom: 8,
          borderBottom: '1px solid #e5e5e5'
        }}
      >
        {definition.displayName}
      </div>

      {/* Label */}
      <div style={{ marginBottom: 12 }}>
        <div style={labelStyle}>Label</div>
        <input
          style={inputStyle}
          value={element.label}
          onChange={(e) => updateElement(element.id, { label: e.target.value })}
        />
      </div>

      {/* Value */}
      <div style={{ marginBottom: 12 }}>
        <div style={labelStyle}>Value</div>
        <input
          style={inputStyle}
          value={element.value}
          onChange={(e) => updateElement(element.id, { value: e.target.value })}
        />
      </div>

      {/* Position & Size */}
      <div style={rowStyle}>
        <div style={fieldStyle}>
          <div style={labelStyle}>X</div>
          <input
            type="number"
            style={inputStyle}
            value={Math.round(element.x)}
            onChange={(e) => updateElement(element.id, { x: Number(e.target.value) })}
          />
        </div>
        <div style={fieldStyle}>
          <div style={labelStyle}>Y</div>
          <input
            type="number"
            style={inputStyle}
            value={Math.round(element.y)}
            onChange={(e) => updateElement(element.id, { y: Number(e.target.value) })}
          />
        </div>
      </div>

      <div style={rowStyle}>
        <div style={fieldStyle}>
          <div style={labelStyle}>Width</div>
          <input
            type="number"
            style={inputStyle}
            value={Math.round(element.width)}
            onChange={(e) => updateElement(element.id, { width: Number(e.target.value) })}
          />
        </div>
        <div style={fieldStyle}>
          <div style={labelStyle}>Height</div>
          <input
            type="number"
            style={inputStyle}
            value={Math.round(element.height)}
            onChange={(e) => updateElement(element.id, { height: Number(e.target.value) })}
          />
        </div>
      </div>

      {/* Style section */}
      <div
        style={{
          fontSize: 12,
          fontWeight: 700,
          color: '#1d2d3e',
          margin: '16px 0 8px',
          paddingBottom: 4,
          borderBottom: '1px solid #e5e5e5'
        }}
      >
        Style
      </div>

      <div style={rowStyle}>
        <div style={fieldStyle}>
          <div style={labelStyle}>Font Size</div>
          <input
            type="number"
            style={inputStyle}
            value={element.style.fontSize}
            onChange={(e) => updateElementStyle(element.id, { fontSize: Number(e.target.value) })}
          />
        </div>
        <div style={fieldStyle}>
          <div style={labelStyle}>Font Weight</div>
          <select
            style={{ ...inputStyle, appearance: 'auto' }}
            value={element.style.fontWeight}
            onChange={(e) => updateElementStyle(element.id, { fontWeight: e.target.value as ElementStyle['fontWeight'] })}
          >
            <option value="300">Light</option>
            <option value="normal">Normal</option>
            <option value="500">Medium</option>
            <option value="bold">Bold</option>
            <option value="700">Bold 700</option>
          </select>
        </div>
      </div>

      <div style={rowStyle}>
        <div style={fieldStyle}>
          <div style={labelStyle}>Font Color</div>
          <input
            type="color"
            style={{ ...inputStyle, padding: 2, height: 32, cursor: 'pointer' }}
            value={element.style.fontColor}
            onChange={(e) => updateElementStyle(element.id, { fontColor: e.target.value })}
          />
        </div>
        <div style={fieldStyle}>
          <div style={labelStyle}>Background</div>
          <input
            type="color"
            style={{ ...inputStyle, padding: 2, height: 32, cursor: 'pointer' }}
            value={element.style.backgroundColor === 'transparent' ? '#ffffff' : element.style.backgroundColor}
            onChange={(e) => updateElementStyle(element.id, { backgroundColor: e.target.value })}
          />
        </div>
      </div>

      <div style={rowStyle}>
        <div style={fieldStyle}>
          <div style={labelStyle}>Text Align</div>
          <select
            style={{ ...inputStyle, appearance: 'auto' }}
            value={element.style.textAlign}
            onChange={(e) => updateElementStyle(element.id, { textAlign: e.target.value as 'left' | 'center' | 'right' })}
          >
            <option value="left">Left</option>
            <option value="center">Center</option>
            <option value="right">Right</option>
          </select>
        </div>
        <div style={fieldStyle}>
          <div style={labelStyle}>Opacity</div>
          <input
            type="number"
            step="0.1"
            min="0"
            max="1"
            style={inputStyle}
            value={element.style.opacity}
            onChange={(e) => updateElementStyle(element.id, { opacity: Number(e.target.value) })}
          />
        </div>
      </div>

      {/* Component-specific properties */}
      {definition.propertyFields.length > 0 && (
        <>
          <div
            style={{
              fontSize: 12,
              fontWeight: 700,
              color: '#1d2d3e',
              margin: '16px 0 8px',
              paddingBottom: 4,
              borderBottom: '1px solid #e5e5e5'
            }}
          >
            Component Properties
          </div>
          {definition.propertyFields.map((field) => (
            <div key={field.key} style={{ marginBottom: 12 }}>
              <div style={labelStyle}>{field.label}</div>
              {field.type === 'select' && field.options ? (
                <select
                  style={{ ...inputStyle, appearance: 'auto' }}
                  value={(element.props[field.key] as string) || ''}
                  onChange={(e) =>
                    updateElement(element.id, {
                      props: { ...element.props, [field.key]: e.target.value }
                    })
                  }
                >
                  {field.options.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              ) : field.type === 'boolean' ? (
                <input
                  type="checkbox"
                  checked={!!element.props[field.key]}
                  onChange={(e) =>
                    updateElement(element.id, {
                      props: { ...element.props, [field.key]: e.target.checked }
                    })
                  }
                />
              ) : (
                <input
                  type={field.type === 'number' ? 'number' : 'text'}
                  style={inputStyle}
                  value={(element.props[field.key] as string) || ''}
                  onChange={(e) =>
                    updateElement(element.id, {
                      props: { ...element.props, [field.key]: e.target.value }
                    })
                  }
                />
              )}
            </div>
          ))}
        </>
      )}
    </div>
  )
}

// Import for type
import type { ElementStyle } from '@/types/canvas'
