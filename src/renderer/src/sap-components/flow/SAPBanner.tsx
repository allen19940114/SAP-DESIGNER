import React from 'react'
import { ComponentType } from '@/types/component'
import type { SAPComponentDefinition, SAPComponentRenderProps } from '@/types/component'

const SAPBannerRenderer: React.FC<SAPComponentRenderProps> = ({ element, isEditing, onLabelChange }) => {
  const { label, style, props } = element
  const variant = (props.variant as string) || 'information'

  const colorMap: Record<string, { bg: string; border: string; color: string }> = {
    information: { bg: '#e8f0fe', border: '#0070f2', color: '#0070f2' },
    success: { bg: '#e6f4ea', border: '#256f3a', color: '#256f3a' },
    warning: { bg: '#fff3e0', border: '#e76500', color: '#e76500' },
    error: { bg: '#fce4e4', border: '#aa0808', color: '#aa0808' }
  }

  const c = colorMap[variant] || colorMap.information

  const bannerStyle: React.CSSProperties = {
    width: '100%', height: '100%', fontFamily: 'var(--sap-font-family)',
    backgroundColor: c.bg, borderLeft: `4px solid ${c.border}`, borderRadius: '0 8px 8px 0',
    display: 'flex', alignItems: 'center', padding: '8px 16px',
    fontSize: style.fontSize, color: c.color, fontWeight: 500,
    boxSizing: 'border-box', userSelect: 'none'
  }

  if (isEditing) {
    return (
      <div style={bannerStyle}>
        <input autoFocus defaultValue={label}
          onBlur={(e) => onLabelChange?.(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter') onLabelChange?.((e.target as HTMLInputElement).value) }}
          style={{ background: 'transparent', border: 'none', outline: 'none', width: '100%', color: 'inherit', fontSize: 'inherit', fontFamily: 'inherit' }}
        />
      </div>
    )
  }

  return <div style={bannerStyle}>{label}</div>
}

export const sapBannerDefinition: SAPComponentDefinition = {
  type: ComponentType.Banner, displayName: 'Banner', category: 'flow', icon: 'ℹ',
  thumbnail: () => <div style={{ padding: '3px 6px', background: '#e8f0fe', borderLeft: '3px solid #0070f2', borderRadius: '0 4px 4px 0', fontSize: 9, color: '#0070f2' }}>Information</div>,
  defaultSize: { width: 300, height: 44 },
  defaultProps: { variant: 'information' },
  defaultStyle: { fontSize: 14, fontWeight: '500', fontColor: '#0070f2', backgroundColor: '#e8f0fe' },
  renderComponent: SAPBannerRenderer,
  propertyFields: [
    { key: 'variant', label: 'Variant', type: 'select', options: [
      { value: 'information', label: 'Information' }, { value: 'success', label: 'Success' },
      { value: 'warning', label: 'Warning' }, { value: 'error', label: 'Error' }
    ]}
  ],
  defaultFieldMeta: { fieldType: 'Banner', abapType: '', length: '' }
}
