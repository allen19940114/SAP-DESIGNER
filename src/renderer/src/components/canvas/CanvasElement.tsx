import React, { useCallback, useRef, useState } from 'react'
import { useCanvasStore } from '@/store/canvas-store'
import { componentRegistry } from '@/sap-components/index'
import type { CanvasElement as CanvasElementType } from '@/types/canvas'
import clsx from 'clsx'

interface Props {
  element: CanvasElementType
  zIndex: number
}

export const CanvasElement: React.FC<Props> = React.memo(({ element, zIndex }) => {
  const selectedIds = useCanvasStore((s) => s.selectedElementIds)
  const editingId = useCanvasStore((s) => s.editingElementId)
  const zoom = useCanvasStore((s) => s.zoom)
  const snapToGrid = useCanvasStore((s) => s.snapToGrid)
  const gridSize = useCanvasStore((s) => s.gridSize)
  const setSelection = useCanvasStore((s) => s.setSelection)
  const addToSelection = useCanvasStore((s) => s.addToSelection)
  const moveElements = useCanvasStore((s) => s.moveElements)
  const setEditingElement = useCanvasStore((s) => s.setEditingElement)
  const updateElement = useCanvasStore((s) => s.updateElement)
  const resizeElement = useCanvasStore((s) => s.resizeElement)

  const isSelected = selectedIds.includes(element.id)
  const isEditing = editingId === element.id

  const [isDragging, setIsDragging] = useState(false)
  const [resizeHandle, setResizeHandle] = useState<string | null>(null)
  const startPosRef = useRef<{ x: number; y: number } | null>(null)
  const startElementRef = useRef<{ x: number; y: number; w: number; h: number } | null>(null)

  const definition = componentRegistry.get(element.type)
  const Component = definition.renderComponent

  const snap = useCallback(
    (val: number) => (snapToGrid ? Math.round(val / gridSize) * gridSize : val),
    [snapToGrid, gridSize]
  )

  // Element drag
  const handlePointerDown = useCallback(
    (e: React.PointerEvent) => {
      if (e.button !== 0 || isEditing) return
      e.stopPropagation()
      ;(e.target as HTMLElement).setPointerCapture(e.pointerId)

      if (e.shiftKey || e.metaKey) {
        addToSelection(element.id)
      } else if (!isSelected) {
        setSelection([element.id])
      }

      startPosRef.current = { x: e.clientX, y: e.clientY }
      startElementRef.current = { x: element.x, y: element.y, w: element.width, h: element.height }
      setIsDragging(true)
    },
    [element.id, element.x, element.y, element.width, element.height, isSelected, isEditing, addToSelection, setSelection]
  )

  const handlePointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!startPosRef.current || !startElementRef.current) return

      const dx = (e.clientX - startPosRef.current.x) / zoom
      const dy = (e.clientY - startPosRef.current.y) / zoom

      if (resizeHandle) {
        // Resize
        let { x, y, w, h } = startElementRef.current
        const newX = x, newY = y, newW = w, newH = h

        if (resizeHandle.includes('e')) { w = snap(startElementRef.current.w + dx) }
        if (resizeHandle.includes('w')) { x = snap(startElementRef.current.x + dx); w = startElementRef.current.w - (x - startElementRef.current.x) }
        if (resizeHandle.includes('s')) { h = snap(startElementRef.current.h + dy) }
        if (resizeHandle.includes('n')) { y = snap(startElementRef.current.y + dy); h = startElementRef.current.h - (y - startElementRef.current.y) }

        resizeElement(element.id, x, y, w, h)
      } else if (isDragging) {
        // Move
        const ids = selectedIds.includes(element.id) ? selectedIds : [element.id]
        const snappedDx = snap(startElementRef.current.x + dx) - startElementRef.current.x
        const snappedDy = snap(startElementRef.current.y + dy) - startElementRef.current.y

        // Reset to original positions first then apply delta
        moveElements(ids, {
          x: snappedDx - (element.x - startElementRef.current.x),
          y: snappedDy - (element.y - startElementRef.current.y)
        })
      }
    },
    [isDragging, resizeHandle, zoom, selectedIds, element.id, element.x, element.y, snap, moveElements, resizeElement]
  )

  const handlePointerUp = useCallback(() => {
    setIsDragging(false)
    setResizeHandle(null)
    startPosRef.current = null
    startElementRef.current = null
  }, [])

  const handleDoubleClick = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation()
      setEditingElement(element.id)
    },
    [element.id, setEditingElement]
  )

  const handleLabelChange = useCallback(
    (newLabel: string) => {
      updateElement(element.id, { label: newLabel })
      setEditingElement(null)
    },
    [element.id, updateElement, setEditingElement]
  )

  // Resize handle pointer down
  const handleResizePointerDown = useCallback(
    (handle: string, e: React.PointerEvent) => {
      e.stopPropagation()
      ;(e.target as HTMLElement).setPointerCapture(e.pointerId)
      startPosRef.current = { x: e.clientX, y: e.clientY }
      startElementRef.current = { x: element.x, y: element.y, w: element.width, h: element.height }
      setResizeHandle(handle)
    },
    [element.x, element.y, element.width, element.height]
  )

  const handles = ['nw', 'n', 'ne', 'e', 'se', 's', 'sw', 'w']
  const handlePositions: Record<string, React.CSSProperties> = {
    nw: { top: -4, left: -4, cursor: 'nwse-resize' },
    n: { top: -4, left: '50%', transform: 'translateX(-50%)', cursor: 'ns-resize' },
    ne: { top: -4, right: -4, cursor: 'nesw-resize' },
    e: { top: '50%', right: -4, transform: 'translateY(-50%)', cursor: 'ew-resize' },
    se: { bottom: -4, right: -4, cursor: 'nwse-resize' },
    s: { bottom: -4, left: '50%', transform: 'translateX(-50%)', cursor: 'ns-resize' },
    sw: { bottom: -4, left: -4, cursor: 'nesw-resize' },
    w: { top: '50%', left: -4, transform: 'translateY(-50%)', cursor: 'ew-resize' }
  }

  return (
    <div
      className={clsx('canvas-element-wrapper')}
      style={{
        position: 'absolute',
        left: element.x,
        top: element.y,
        width: element.width,
        height: element.height,
        zIndex,
        opacity: element.style.opacity,
        outline: isSelected ? '2px solid #0070f2' : 'none',
        outlineOffset: '1px',
        cursor: isDragging ? 'grabbing' : 'grab'
      }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onDoubleClick={handleDoubleClick}
    >
      <Component
        element={element}
        isSelected={isSelected}
        isEditing={isEditing}
        onLabelChange={handleLabelChange}
      />

      {/* Resize handles */}
      {isSelected && !isEditing && handles.map((handle) => (
        <div
          key={handle}
          onPointerDown={(e) => handleResizePointerDown(handle, e)}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          style={{
            position: 'absolute',
            width: 8,
            height: 8,
            backgroundColor: '#fff',
            border: '2px solid #0070f2',
            borderRadius: '50%',
            ...handlePositions[handle]
          }}
        />
      ))}
    </div>
  )
})

CanvasElement.displayName = 'CanvasElement'
