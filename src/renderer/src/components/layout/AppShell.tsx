import React from 'react'
import { useUIStore } from '@/store/ui-store'
import { Toolbar } from './Toolbar'
import { Canvas } from '../canvas/Canvas'
import { ComponentLibrary } from '../library/ComponentLibrary'
import { PropertyPanel } from '../properties/PropertyPanel'
import { TemplateGallery } from '../templates/TemplateGallery'
import { FieldTable } from '../field-table/FieldTable'

export const AppShell: React.FC = () => {
  const leftPanelOpen = useUIStore((s) => s.leftPanelOpen)
  const rightPanelOpen = useUIStore((s) => s.rightPanelOpen)
  const leftPanelTab = useUIStore((s) => s.leftPanelTab)
  const rightPanelTab = useUIStore((s) => s.rightPanelTab)
  const setLeftPanelTab = useUIStore((s) => s.setLeftPanelTab)
  const setRightPanelTab = useUIStore((s) => s.setRightPanelTab)
  const toggleLeftPanel = useUIStore((s) => s.toggleLeftPanel)
  const toggleRightPanel = useUIStore((s) => s.toggleRightPanel)

  const panelHeaderStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    height: 40,
    padding: '0 12px',
    borderBottom: '1px solid #e5e5e5',
    fontSize: 13,
    fontWeight: 600,
    color: '#1d2d3e',
    gap: 0
  }

  const tabStyle = (active: boolean): React.CSSProperties => ({
    flex: 1,
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 12,
    fontWeight: active ? 600 : 400,
    color: active ? '#0070f2' : '#788fa6',
    borderBottom: active ? '2px solid #0070f2' : '2px solid transparent',
    cursor: 'pointer',
    transition: 'color 0.15s, border-color 0.15s',
    userSelect: 'none'
  })

  const collapseBtn: React.CSSProperties = {
    width: 24,
    height: 24,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: 'none',
    background: 'none',
    cursor: 'pointer',
    color: '#788fa6',
    fontSize: 14,
    borderRadius: 4
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100%' }}>
      <Toolbar />
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        {/* Left Panel */}
        {leftPanelOpen && (
          <div
            style={{
              width: 260,
              backgroundColor: '#ffffff',
              borderRight: '1px solid #e5e5e5',
              display: 'flex',
              flexDirection: 'column',
              flexShrink: 0
            }}
          >
            <div style={panelHeaderStyle}>
              <div
                style={tabStyle(leftPanelTab === 'components')}
                onClick={() => setLeftPanelTab('components')}
              >
                Components
              </div>
              <div
                style={tabStyle(leftPanelTab === 'templates')}
                onClick={() => setLeftPanelTab('templates')}
              >
                Templates
              </div>
            </div>
            <div style={{ flex: 1, overflowY: 'auto' }}>
              {leftPanelTab === 'components' ? (
                <ComponentLibrary />
              ) : (
                <TemplateGallery />
              )}
            </div>
          </div>
        )}

        {/* Left panel toggle */}
        <button
          style={{
            ...collapseBtn,
            position: 'absolute',
            left: leftPanelOpen ? 260 : 0,
            top: 56,
            zIndex: 10,
            backgroundColor: '#fff',
            border: '1px solid #e5e5e5',
            borderLeft: 'none',
            borderRadius: '0 4px 4px 0',
            width: 16,
            height: 32
          }}
          onClick={toggleLeftPanel}
        >
          {leftPanelOpen ? '\u2039' : '\u203A'}
        </button>

        {/* Canvas */}
        <Canvas />

        {/* Right panel toggle */}
        <button
          style={{
            ...collapseBtn,
            position: 'absolute',
            right: rightPanelOpen ? 280 : 0,
            top: 56,
            zIndex: 10,
            backgroundColor: '#fff',
            border: '1px solid #e5e5e5',
            borderRight: 'none',
            borderRadius: '4px 0 0 4px',
            width: 16,
            height: 32
          }}
          onClick={toggleRightPanel}
        >
          {rightPanelOpen ? '\u203A' : '\u2039'}
        </button>

        {/* Right Panel */}
        {rightPanelOpen && (
          <div
            style={{
              width: rightPanelTab === 'fieldTable' ? 600 : 280,
              backgroundColor: '#ffffff',
              borderLeft: '1px solid #e5e5e5',
              display: 'flex',
              flexDirection: 'column',
              flexShrink: 0,
              transition: 'width 0.2s ease'
            }}
          >
            <div style={panelHeaderStyle}>
              <div
                style={tabStyle(rightPanelTab === 'properties')}
                onClick={() => setRightPanelTab('properties')}
              >
                Properties
              </div>
              <div
                style={tabStyle(rightPanelTab === 'fieldTable')}
                onClick={() => setRightPanelTab('fieldTable')}
              >
                Field Table
              </div>
            </div>
            <div style={{ flex: 1, overflowY: 'auto' }}>
              {rightPanelTab === 'properties' ? <PropertyPanel /> : <FieldTable />}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
