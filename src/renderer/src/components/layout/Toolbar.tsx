import React, { useCallback } from 'react'
import { useCanvasStore } from '@/store/canvas-store'
import { useHistoryStore } from '@/store/history-store'
import { useScreenshot } from '@/hooks/useScreenshot'
import { useTranslation } from 'react-i18next'

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

  const { capture } = useScreenshot()
  const { i18n } = useTranslation()

  const handleUndo = useCallback(() => {
    const store = useCanvasStore.getState()
    const historyStore = useHistoryStore.getState()
    const snapshot = historyStore.undo({ elements: store.elements, elementOrder: store.elementOrder })
    if (snapshot) {
      store.loadFromTemplate(snapshot.elementOrder.map((id) => snapshot.elements[id]).filter(Boolean))
    }
  }, [])

  const handleRedo = useCallback(() => {
    const store = useCanvasStore.getState()
    const historyStore = useHistoryStore.getState()
    const snapshot = historyStore.redo({ elements: store.elements, elementOrder: store.elementOrder })
    if (snapshot) {
      store.loadFromTemplate(snapshot.elementOrder.map((id) => snapshot.elements[id]).filter(Boolean))
    }
  }, [])

  const handleScreenshot = useCallback(() => {
    const canvasEl = document.getElementById('sap-designer-canvas')
    if (canvasEl) capture(canvasEl)
  }, [capture])

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

  const disabledBtnStyle: React.CSSProperties = {
    ...btnStyle,
    opacity: 0.4,
    cursor: 'default'
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

      {/* Undo / Redo */}
      <button
        className="no-drag-region"
        style={useHistoryStore.getState().canUndo() ? btnStyle : disabledBtnStyle}
        onClick={handleUndo}
        title="Undo (Cmd+Z)"
      >
        Undo
      </button>
      <button
        className="no-drag-region"
        style={useHistoryStore.getState().canRedo() ? btnStyle : disabledBtnStyle}
        onClick={handleRedo}
        title="Redo (Cmd+Shift+Z)"
      >
        Redo
      </button>

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

      {/* Screenshot */}
      <button
        className="no-drag-region"
        style={btnStyle}
        onClick={handleScreenshot}
        title="Screenshot (copies to clipboard)"
      >
        Screenshot
      </button>

      <div style={{ flex: 1 }} />

      {/* Language switcher */}
      <select
        className="no-drag-region"
        style={{
          ...btnStyle,
          appearance: 'auto',
          minWidth: 60
        }}
        value={i18n.language}
        onChange={(e) => i18n.changeLanguage(e.target.value)}
      >
        <option value="en">EN</option>
        <option value="zh">ZH</option>
        <option value="fr">FR</option>
      </select>

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
