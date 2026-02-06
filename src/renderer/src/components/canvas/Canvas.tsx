import React, { useCallback, useRef, useState } from 'react'
import { useCanvasStore } from '@/store/canvas-store'
import { componentRegistry } from '@/sap-components/index'
import { CanvasElement } from './CanvasElement'
import { canvasBackgrounds } from '@/theme/tokens'
import type { ComponentType } from '@/types/component'

export const Canvas: React.FC = () => {
  const canvasWidth = useCanvasStore((s) => s.canvasWidth)
  const canvasHeight = useCanvasStore((s) => s.canvasHeight)
  const canvasBackground = useCanvasStore((s) => s.canvasBackground)
  const gridVisible = useCanvasStore((s) => s.gridVisible)
  const gridSize = useCanvasStore((s) => s.gridSize)
  const zoom = useCanvasStore((s) => s.zoom)
  const panOffset = useCanvasStore((s) => s.panOffset)
  const elements = useCanvasStore((s) => s.elements)
  const elementOrder = useCanvasStore((s) => s.elementOrder)
  const clearSelection = useCanvasStore((s) => s.clearSelection)
  const addElement = useCanvasStore((s) => s.addElement)
  const setZoom = useCanvasStore((s) => s.setZoom)
  const setPanOffset = useCanvasStore((s) => s.setPanOffset)
  const setSelection = useCanvasStore((s) => s.setSelection)

  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLDivElement>(null)
  const [isPanning, setIsPanning] = useState(false)
  const panStartRef = useRef<{ x: number; y: number; ox: number; oy: number } | null>(null)

  // Selection box state
  const [selectionBox, setSelectionBox] = useState<{ x: number; y: number; w: number; h: number } | null>(null)
  const selectionStartRef = useRef<{ x: number; y: number } | null>(null)

  const bgStyle = canvasBackground.includes('Gradient')
    ? { background: canvasBackgrounds[canvasBackground] }
    : { backgroundColor: canvasBackgrounds[canvasBackground] }

  const gridBg = gridVisible
    ? {
        backgroundImage: `
          linear-gradient(rgba(0,0,0,0.05) 1px, transparent 1px),
          linear-gradient(90deg, rgba(0,0,0,0.05) 1px, transparent 1px)
        `,
        backgroundSize: `${gridSize}px ${gridSize}px`
      }
    : {}

  // Drop handler for adding components from library
  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      const data = e.dataTransfer.getData('application/sap-component')
      if (!data) return

      const { type } = JSON.parse(data) as { type: ComponentType }
      const rect = canvasRef.current?.getBoundingClientRect()
      if (!rect) return

      const x = (e.clientX - rect.left) / zoom
      const y = (e.clientY - rect.top) / zoom

      addElement(type, { x, y })
    },
    [zoom, addElement]
  )

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'copy'
  }, [])

  // Canvas background click - clear selection or start rubber band
  const handleCanvasPointerDown = useCallback(
    (e: React.PointerEvent) => {
      if (e.button === 1 || (e.button === 0 && e.altKey)) {
        // Middle click or Alt+click for panning
        e.preventDefault()
        setIsPanning(true)
        panStartRef.current = { x: e.clientX, y: e.clientY, ox: panOffset.x, oy: panOffset.y }
        ;(e.target as HTMLElement).setPointerCapture(e.pointerId)
        return
      }

      if (e.button === 0 && e.target === canvasRef.current) {
        // Start rubber band selection
        const rect = canvasRef.current?.getBoundingClientRect()
        if (!rect) return
        const x = (e.clientX - rect.left) / zoom
        const y = (e.clientY - rect.top) / zoom
        selectionStartRef.current = { x, y }
        setSelectionBox({ x, y, w: 0, h: 0 })
        clearSelection()
      }
    },
    [panOffset, zoom, clearSelection]
  )

  const handleCanvasPointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (isPanning && panStartRef.current) {
        const dx = e.clientX - panStartRef.current.x
        const dy = e.clientY - panStartRef.current.y
        setPanOffset({
          x: panStartRef.current.ox + dx,
          y: panStartRef.current.oy + dy
        })
        return
      }

      if (selectionStartRef.current) {
        const rect = canvasRef.current?.getBoundingClientRect()
        if (!rect) return
        const x = (e.clientX - rect.left) / zoom
        const y = (e.clientY - rect.top) / zoom
        const sx = selectionStartRef.current.x
        const sy = selectionStartRef.current.y
        setSelectionBox({
          x: Math.min(sx, x),
          y: Math.min(sy, y),
          w: Math.abs(x - sx),
          h: Math.abs(y - sy)
        })
      }
    },
    [isPanning, zoom, setPanOffset]
  )

  const handleCanvasPointerUp = useCallback(() => {
    if (isPanning) {
      setIsPanning(false)
      panStartRef.current = null
    }

    if (selectionBox && selectionStartRef.current) {
      // Find elements intersecting the selection box
      const selected = elementOrder.filter((id) => {
        const el = elements[id]
        if (!el) return false
        return (
          el.x < selectionBox.x + selectionBox.w &&
          el.x + el.width > selectionBox.x &&
          el.y < selectionBox.y + selectionBox.h &&
          el.y + el.height > selectionBox.y
        )
      })
      if (selected.length > 0) {
        setSelection(selected)
      }
      selectionStartRef.current = null
      setSelectionBox(null)
    }
  }, [isPanning, selectionBox, elements, elementOrder, setSelection])

  // Zoom via wheel
  const handleWheel = useCallback(
    (e: React.WheelEvent) => {
      if (e.ctrlKey || e.metaKey) {
        e.preventDefault()
        const delta = e.deltaY > 0 ? -0.1 : 0.1
        setZoom(zoom + delta)
      } else {
        // Pan via scroll
        setPanOffset({
          x: panOffset.x - e.deltaX,
          y: panOffset.y - e.deltaY
        })
      }
    },
    [zoom, panOffset, setZoom, setPanOffset]
  )

  return (
    <div
      ref={containerRef}
      style={{
        flex: 1,
        overflow: 'hidden',
        position: 'relative',
        backgroundColor: '#e8e8e8',
        cursor: isPanning ? 'grabbing' : 'default'
      }}
      onWheel={handleWheel}
      onPointerDown={handleCanvasPointerDown}
      onPointerMove={handleCanvasPointerMove}
      onPointerUp={handleCanvasPointerUp}
    >
      {/* Canvas surface */}
      <div
        ref={canvasRef}
        style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          width: canvasWidth,
          height: canvasHeight,
          transform: `translate(${-canvasWidth / 2 + panOffset.x}px, ${-canvasHeight / 2 + panOffset.y}px) scale(${zoom})`,
          transformOrigin: '0 0',
          ...bgStyle,
          ...gridBg,
          boxShadow: '0 2px 12px rgba(0,0,0,0.15)'
        }}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        {elementOrder.map((id, index) => {
          const el = elements[id]
          if (!el) return null
          return <CanvasElement key={id} element={el} zIndex={index} />
        })}

        {/* Selection rubber band */}
        {selectionBox && selectionBox.w > 2 && selectionBox.h > 2 && (
          <div
            style={{
              position: 'absolute',
              left: selectionBox.x,
              top: selectionBox.y,
              width: selectionBox.w,
              height: selectionBox.h,
              border: '1px solid #0070f2',
              backgroundColor: 'rgba(0, 112, 242, 0.08)',
              pointerEvents: 'none'
            }}
          />
        )}
      </div>

      {/* Zoom indicator */}
      <div
        style={{
          position: 'absolute',
          bottom: 12,
          right: 12,
          background: 'rgba(255,255,255,0.9)',
          padding: '4px 10px',
          borderRadius: 6,
          fontSize: 12,
          color: '#556b82',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
        }}
      >
        {Math.round(zoom * 100)}%
      </div>
    </div>
  )
}
