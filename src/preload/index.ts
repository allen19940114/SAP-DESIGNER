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
  exportCSV: (content: string) => ipcRenderer.invoke('export:csv', content)
}

contextBridge.exposeInMainWorld('electronAPI', electronAPI)

export type ElectronAPI = typeof electronAPI
