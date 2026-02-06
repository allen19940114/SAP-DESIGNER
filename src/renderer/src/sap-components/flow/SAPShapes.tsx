import React from 'react'
import { ComponentType } from '@/types/component'
import type { SAPComponentDefinition, SAPComponentRenderProps } from '@/types/component'

// Rectangle
const SAPRectangleRenderer: React.FC<SAPComponentRenderProps> = ({ element, isEditing, onLabelChange }) => {
  const { label, style } = element
  const s: React.CSSProperties = {
    width: '100%', height: '100%', border: `2px solid ${style.fontColor || '#556b82'}`,
    borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontFamily: 'var(--sap-font-family)', fontSize: style.fontSize, color: style.fontColor,
    backgroundColor: style.backgroundColor === 'transparent' ? '#fff' : style.backgroundColor,
    boxSizing: 'border-box', userSelect: 'none', textAlign: 'center', padding: 4
  }
  if (isEditing) {
    return <div style={s}><input autoFocus defaultValue={label} onBlur={(e) => onLabelChange?.(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter') onLabelChange?.((e.target as HTMLInputElement).value) }} style={{ background: 'transparent', border: 'none', outline: 'none', textAlign: 'center', width: '100%', color: 'inherit', fontSize: 'inherit', fontFamily: 'inherit' }} /></div>
  }
  return <div style={s}>{label}</div>
}

// Diamond
const SAPDiamondRenderer: React.FC<SAPComponentRenderProps> = ({ element, isEditing, onLabelChange }) => {
  const { label, style } = element
  const color = style.fontColor || '#556b82'
  return (
    <div style={{ width: '100%', height: '100%', position: 'relative' }}>
      <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none" style={{ position: 'absolute', top: 0, left: 0 }}>
        <polygon points="50,2 98,50 50,98 2,50" fill={style.backgroundColor === 'transparent' ? '#fff' : style.backgroundColor} stroke={color} strokeWidth="2" />
      </svg>
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--sap-font-family)', fontSize: Math.max(10, style.fontSize - 2), color, textAlign: 'center', padding: '20%', boxSizing: 'border-box', userSelect: 'none' }}>
        {isEditing ? (
          <input autoFocus defaultValue={label} onBlur={(e) => onLabelChange?.(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter') onLabelChange?.((e.target as HTMLInputElement).value) }} style={{ background: 'transparent', border: 'none', outline: 'none', textAlign: 'center', width: '100%', color: 'inherit', fontSize: 'inherit', fontFamily: 'inherit' }} />
        ) : label}
      </div>
    </div>
  )
}

// Terminator (rounded pill)
const SAPTerminatorRenderer: React.FC<SAPComponentRenderProps> = ({ element, isEditing, onLabelChange }) => {
  const { label, style } = element
  const s: React.CSSProperties = {
    width: '100%', height: '100%', border: `2px solid ${style.fontColor || '#556b82'}`,
    borderRadius: 999, display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontFamily: 'var(--sap-font-family)', fontSize: style.fontSize, color: style.fontColor,
    backgroundColor: style.backgroundColor === 'transparent' ? '#fff' : style.backgroundColor,
    boxSizing: 'border-box', userSelect: 'none', textAlign: 'center', padding: '4px 12px'
  }
  if (isEditing) {
    return <div style={s}><input autoFocus defaultValue={label} onBlur={(e) => onLabelChange?.(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter') onLabelChange?.((e.target as HTMLInputElement).value) }} style={{ background: 'transparent', border: 'none', outline: 'none', textAlign: 'center', width: '100%', color: 'inherit', fontSize: 'inherit', fontFamily: 'inherit' }} /></div>
  }
  return <div style={s}>{label}</div>
}

export const sapRectangleDefinition: SAPComponentDefinition = {
  type: ComponentType.Rectangle, displayName: 'Rectangle', category: 'flow', icon: '□',
  thumbnail: () => <div style={{ border: '2px solid #556b82', borderRadius: 3, padding: '2px 8px', fontSize: 9, textAlign: 'center' }}>Rect</div>,
  defaultSize: { width: 140, height: 60 }, defaultProps: {},
  defaultStyle: { fontSize: 13, fontWeight: 'normal', fontColor: '#556b82', backgroundColor: '#fff', borderRadius: 4 },
  renderComponent: SAPRectangleRenderer, propertyFields: [],
  defaultFieldMeta: { fieldType: 'Shape', abapType: '', length: '' }
}

export const sapDiamondDefinition: SAPComponentDefinition = {
  type: ComponentType.Diamond, displayName: 'Diamond', category: 'flow', icon: '◇',
  thumbnail: () => <div style={{ fontSize: 18, textAlign: 'center', color: '#556b82' }}>◇</div>,
  defaultSize: { width: 100, height: 100 }, defaultProps: {},
  defaultStyle: { fontSize: 12, fontWeight: 'normal', fontColor: '#556b82', backgroundColor: '#fff' },
  renderComponent: SAPDiamondRenderer, propertyFields: [],
  defaultFieldMeta: { fieldType: 'Decision', abapType: '', length: '' }
}

export const sapTerminatorDefinition: SAPComponentDefinition = {
  type: ComponentType.Terminator, displayName: 'Terminator', category: 'flow', icon: '⬭',
  thumbnail: () => <div style={{ border: '2px solid #556b82', borderRadius: 999, padding: '2px 8px', fontSize: 9, textAlign: 'center' }}>Start/End</div>,
  defaultSize: { width: 120, height: 44 }, defaultProps: {},
  defaultStyle: { fontSize: 13, fontWeight: 'normal', fontColor: '#556b82', backgroundColor: '#fff' },
  renderComponent: SAPTerminatorRenderer, propertyFields: [],
  defaultFieldMeta: { fieldType: 'Terminator', abapType: '', length: '' }
}
