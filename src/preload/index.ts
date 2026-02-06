import { contextBridge, ipcRenderer } from 'electron'

const electronAPI = {
  saveProject: (data: string) => ipcRenderer.invoke('project:save', data),
  loadProject: () => ipcRenderer.invoke('project:load'),
  saveProjectAs: (data: string) => ipcRenderer.invoke('project:save-as', data),
  openProject: () => ipcRenderer.invoke('project:open'),
  saveCustomTemplates: (data: string) => ipcRenderer.invoke('templates:save-custom', data),
  loadCustomTemplates: () => ipcRenderer.invoke('templates:load-custom'),
  saveSettings: (data: string) => ipcRenderer.invoke('settings:save', data),
  loadSettings: () => ipcRenderer.invoke('settings:load'),
  writeImageToClipboard: (dataUrl: string) => ipcRenderer.invoke('clipboard:write-image', dataUrl),
  exportCSV: (content: string) => ipcRenderer.invoke('export:csv', content),
  onMenuCommand: (callback: (command: string) => void) => {
    const channels = [
      'menu:new-project', 'menu:open', 'menu:save', 'menu:save-as',
      'menu:screenshot', 'menu:export-csv',
      'menu:undo', 'menu:redo', 'menu:select-all', 'menu:duplicate', 'menu:delete',
      'menu:zoom-in', 'menu:zoom-out', 'menu:zoom-reset',
      'menu:center-view', 'menu:toggle-grid', 'menu:toggle-snap', 'menu:about'
    ]
    const handlers = channels.map((ch) => {
      const handler = () => callback(ch)
      ipcRenderer.on(ch, handler)
      return { ch, handler }
    })
    return () => {
      handlers.forEach(({ ch, handler }) => ipcRenderer.removeListener(ch, handler))
    }
  }
}

contextBridge.exposeInMainWorld('electronAPI', electronAPI)

export type ElectronAPI = typeof electronAPI
