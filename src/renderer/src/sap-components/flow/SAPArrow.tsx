import React from 'react'
import { ComponentType } from '@/types/component'
import type { SAPComponentDefinition, SAPComponentRenderProps } from '@/types/component'

const makeArrowRenderer = (direction: 'right' | 'left' | 'up' | 'down'): React.FC<SAPComponentRenderProps> => {
  return ({ element }) => {
    const { style } = element
    const color = style.fontColor || '#556b82'
    const isHorizontal = direction === 'left' || direction === 'right'

    return (
      <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none" style={{ display: 'block' }}>
        {isHorizontal ? (
          <>
            <line x1={direction === 'right' ? 0 : 100} y1="50" x2={direction === 'right' ? 80 : 20} y2="50" stroke={color} strokeWidth="3" />
            <polygon
              points={direction === 'right' ? '75,30 100,50 75,70' : '25,30 0,50 25,70'}
              fill={color}
            />
          </>
        ) : (
          <>
            <line x1="50" y1={direction === 'down' ? 0 : 100} x2="50" y2={direction === 'down' ? 80 : 20} stroke={color} strokeWidth="3" />
            <polygon
              points={direction === 'down' ? '30,75 50,100 70,75' : '30,25 50,0 70,25'}
              fill={color}
            />
          </>
        )}
      </svg>
    )
  }
}

const makeThumbnail = (direction: string) => () => {
  const arrows: Record<string, string> = { right: '→', left: '←', up: '↑', down: '↓' }
  return <div style={{ fontSize: 18, textAlign: 'center', color: '#556b82' }}>{arrows[direction]}</div>
}

const makeDefinition = (type: ComponentType, direction: 'right' | 'left' | 'up' | 'down', displayName: string): SAPComponentDefinition => ({
  type, displayName, category: 'flow',
  icon: { right: '→', left: '←', up: '↑', down: '↓' }[direction],
  thumbnail: makeThumbnail(direction),
  defaultSize: (direction === 'right' || direction === 'left') ? { width: 120, height: 40 } : { width: 40, height: 120 },
  defaultProps: {},
  defaultStyle: { fontSize: 14, fontWeight: 'normal', fontColor: '#556b82', backgroundColor: 'transparent', borderWidth: 0, borderStyle: 'none' },
  renderComponent: makeArrowRenderer(direction),
  propertyFields: [],
  defaultFieldMeta: { fieldType: 'Arrow', abapType: '', length: '' }
})

export const sapArrowRightDefinition = makeDefinition(ComponentType.ArrowRight, 'right', 'Arrow Right')
export const sapArrowLeftDefinition = makeDefinition(ComponentType.ArrowLeft, 'left', 'Arrow Left')
export const sapArrowUpDefinition = makeDefinition(ComponentType.ArrowUp, 'up', 'Arrow Up')
export const sapArrowDownDefinition = makeDefinition(ComponentType.ArrowDown, 'down', 'Arrow Down')
