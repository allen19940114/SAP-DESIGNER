import { ipcMain, dialog, clipboard, nativeImage } from 'electron'
import { FileService } from './file-service'

export function registerIPCHandlers(): void {
  const fileService = new FileService()

  ipcMain.handle('project:save', async (_event, data: string) => {
    return fileService.saveProject(data)
  })

  ipcMain.handle('project:load', async () => {
    return fileService.loadProject()
  })

  ipcMain.handle('project:save-as', async (_event, data: string) => {
    const { filePath } = await dialog.showSaveDialog({
      filters: [{ name: 'SAP Designer Project', extensions: ['sapd'] }]
    })
    if (filePath) return fileService.saveProjectTo(filePath, data)
    return null
  })

  ipcMain.handle('project:open', async () => {
    const { filePaths } = await dialog.showOpenDialog({
      filters: [{ name: 'SAP Designer Project', extensions: ['sapd'] }],
      properties: ['openFile']
    })
    if (filePaths[0]) return fileService.loadProjectFrom(filePaths[0])
    return null
  })

  ipcMain.handle('templates:save-custom', async (_event, data: string) => {
    return fileService.saveCustomTemplates(data)
  })

  ipcMain.handle('templates:load-custom', async () => {
    return fileService.loadCustomTemplates()
  })

  ipcMain.handle('settings:save', async (_event, data: string) => {
    return fileService.saveSettings(data)
  })

  ipcMain.handle('settings:load', async () => {
    return fileService.loadSettings()
  })

  ipcMain.handle('clipboard:write-image', async (_event, dataUrl: string) => {
    const img = nativeImage.createFromDataURL(dataUrl)
    clipboard.writeImage(img)
    return true
  })

  ipcMain.handle('export:csv', async (_event, csvContent: string) => {
    const { filePath } = await dialog.showSaveDialog({
      filters: [{ name: 'CSV', extensions: ['csv'] }]
    })
    if (filePath) {
      await fileService.writeFile(filePath, csvContent)
      return true
    }
    return false
  })
}
