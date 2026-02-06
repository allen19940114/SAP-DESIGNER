import { useEffect, useRef } from 'react'
import { useCanvasStore } from '@/store/canvas-store'

export function useAutoSave(): void {
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    const unsubscribe = useCanvasStore.subscribe(() => {
      if (timerRef.current) clearTimeout(timerRef.current)
      timerRef.current = setTimeout(() => {
        const data = useCanvasStore.getState().getProjectData()
        window.electronAPI?.saveProject(JSON.stringify(data))
      }, 1000)
    })

    return () => {
      unsubscribe()
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [])
}
