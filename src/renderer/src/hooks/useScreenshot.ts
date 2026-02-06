import { useCallback } from 'react'
import { toPng } from 'html-to-image'

export function useScreenshot() {
  const capture = useCallback(async (canvasElement: HTMLElement | null) => {
    if (!canvasElement) return

    try {
      await document.fonts.ready

      const dataUrl = await toPng(canvasElement, {
        pixelRatio: 2,
        backgroundColor: '#ffffff'
      })

      // Try clipboard first via Electron
      if (window.electronAPI?.writeImageToClipboard) {
        const success = await window.electronAPI.writeImageToClipboard(dataUrl)
        if (success) return
      }

      // Fallback: download as PNG
      const link = document.createElement('a')
      link.download = `sap-designer-${Date.now()}.png`
      link.href = dataUrl
      link.click()
    } catch (err) {
      console.error('Screenshot failed:', err)
    }
  }, [])

  return { capture }
}
