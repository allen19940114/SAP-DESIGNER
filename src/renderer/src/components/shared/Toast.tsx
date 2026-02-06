import React from 'react'
import { useUIStore } from '@/store/ui-store'

const typeColors = {
  success: { bg: '#e6f4ea', border: '#34a853', color: '#1e7e34' },
  error: { bg: '#fce8e6', border: '#ea4335', color: '#c5221f' },
  info: { bg: '#e8f0fe', border: '#0070f2', color: '#0070f2' }
}

export const ToastContainer: React.FC = () => {
  const toasts = useUIStore((s) => s.toasts)
  const removeToast = useUIStore((s) => s.removeToast)

  if (toasts.length === 0) return null

  return (
    <div style={{ position: 'fixed', bottom: 20, right: 20, zIndex: 9999, display: 'flex', flexDirection: 'column', gap: 8 }}>
      {toasts.map((t) => {
        const colors = typeColors[t.type]
        return (
          <div
            key={t.id}
            style={{
              padding: '10px 20px',
              borderRadius: 8,
              backgroundColor: colors.bg,
              border: `1px solid ${colors.border}`,
              color: colors.color,
              fontSize: 13,
              fontWeight: 500,
              fontFamily: 'var(--sap-font-family)',
              boxShadow: '0 2px 8px rgba(0,0,0,0.12)',
              cursor: 'pointer',
              animation: 'fadeIn 0.2s ease',
              maxWidth: 360
            }}
            onClick={() => removeToast(t.id)}
          >
            {t.message}
          </div>
        )
      })}
    </div>
  )
}
