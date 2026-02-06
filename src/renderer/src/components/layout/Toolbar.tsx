import React from 'react'
import { useCanvasStore } from '@/store/canvas-store'

export const Toolbar: React.FC = () => {
  const gridVisible = useCanvasStore((s) => s.gridVisible)
  const snapToGrid = useCanvasStore((s) => s.snapToGrid)
  const zoom = useCanvasStore((s) => s.zoom)
  const canvasBackground = useCanvasStore((s) => s.canvasBackground)
  const setGridVisible = useCanvasStore((s) => s.setGridVisible)
  const setSnapToGrid = useCanvasStore((s) => s.setSnapToGrid)
  const setZoom = useCanvasStore((s) => s.setZoom)
  const setCanvasBackground = useCanvasStore((s) => s.setCanvasBackground)
  const setPanOffset = useCanvasStore((s) => s.setPanOffset)
  const clearCanvas = useCanvasStore((s) => s.clearCanvas)

  const btnStyle: React.CSSProperties = {
    height: 32,
    padding: '0 12px',
    fontSize: 12,
    fontFamily: 'var(--sap-font-family)',
    border: '1px solid var(--sap-button-border-color)',
    borderRadius: 'var(--sap-button-border-radius)',
    backgroundColor: 'var(--sap-button-background)',
    color: 'var(--sap-button-text-color)',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: 4
  }

  const activeBtnStyle: React.CSSProperties = {
    ...btnStyle,
    backgroundColor: '#e8f0fe',
    borderColor: '#0070f2',
    color: '#0070f2'
  }

  const separatorStyle: React.CSSProperties = {
    width: 1,
    height: 20,
    backgroundColor: 'var(--sap-toolbar-separator-color)',
    margin: '0 4px'
  }

  return (
    <div
      className="drag-region"
      style={{
        height: 48,
        backgroundColor: 'var(--sap-toolbar-background)',
        borderBottom: '1px solid #e5e5e5',
        display: 'flex',
        alignItems: 'center',
        padding: '0 80px 0 16px',
        gap: 6,
        flexShrink: 0
      }}
    >
      {/* App name */}
      <div
        className="no-drag-region"
        style={{
          fontSize: 15,
          fontWeight: 700,
          color: '#0070f2',
          marginRight: 16,
          whiteSpace: 'nowrap'
        }}
      >
        SAP Designer
      </div>

      <div style={separatorStyle} />

      {/* Grid toggle */}
      <button
        className="no-drag-region"
        style={gridVisible ? activeBtnStyle : btnStyle}
        onClick={() => setGridVisible(!gridVisible)}
      >
        Grid
      </button>

      {/* Snap toggle */}
      <button
        className="no-drag-region"
        style={snapToGrid ? activeBtnStyle : btnStyle}
        onClick={() => setSnapToGrid(!snapToGrid)}
      >
        Snap
      </button>

      <div style={separatorStyle} />

      {/* Zoom controls */}
      <button className="no-drag-region" style={btnStyle} onClick={() => setZoom(zoom - 0.1)}>
        -
      </button>
      <span className="no-drag-region" style={{ fontSize: 12, color: '#556b82', minWidth: 40, textAlign: 'center' }}>
        {Math.round(zoom * 100)}%
      </span>
      <button className="no-drag-region" style={btnStyle} onClick={() => setZoom(zoom + 0.1)}>
        +
      </button>
      <button className="no-drag-region" style={btnStyle} onClick={() => setZoom(1)}>
        1:1
      </button>

      <div style={separatorStyle} />

      {/* Center view */}
      <button
        className="no-drag-region"
        style={btnStyle}
        onClick={() => setPanOffset({ x: 0, y: 0 })}
      >
        Center
      </button>

      {/* Background selector */}
      <select
        className="no-drag-region"
        style={{
          ...btnStyle,
          appearance: 'auto',
          minWidth: 100
        }}
        value={canvasBackground}
        onChange={(e) => setCanvasBackground(e.target.value as any)}
      >
        <option value="white">White</option>
        <option value="sapLightBlue">SAP Light Blue</option>
        <option value="black">Black</option>
        <option value="lightBlue">Light Blue</option>
        <option value="blueGreenGradient">Blue-Green</option>
      </select>

      <div style={{ flex: 1 }} />

      {/* Clear canvas */}
      <button
        className="no-drag-region"
        style={{ ...btnStyle, color: '#aa0808', borderColor: '#aa0808' }}
        onClick={clearCanvas}
      >
        Clear
      </button>
    </div>
  )
}
