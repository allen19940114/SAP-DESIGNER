import { Menu, BrowserWindow, app } from 'electron'

export function createApplicationMenu(): void {
  const isMac = process.platform === 'darwin'

  const template: Electron.MenuItemConstructorOptions[] = [
    ...(isMac
      ? [
          {
            label: app.name,
            submenu: [
              { role: 'about' as const },
              { type: 'separator' as const },
              { role: 'services' as const },
              { type: 'separator' as const },
              { role: 'hide' as const },
              { role: 'hideOthers' as const },
              { role: 'unhide' as const },
              { type: 'separator' as const },
              { role: 'quit' as const }
            ]
          }
        ]
      : []),
    {
      label: 'File',
      submenu: [
        {
          label: 'New Project',
          accelerator: 'CmdOrCtrl+N',
          click: () => sendToRenderer('menu:new-project')
        },
        {
          label: 'Open...',
          accelerator: 'CmdOrCtrl+O',
          click: () => sendToRenderer('menu:open')
        },
        { type: 'separator' },
        {
          label: 'Save',
          accelerator: 'CmdOrCtrl+S',
          click: () => sendToRenderer('menu:save')
        },
        {
          label: 'Save As...',
          accelerator: 'CmdOrCtrl+Shift+S',
          click: () => sendToRenderer('menu:save-as')
        },
        { type: 'separator' },
        {
          label: 'Export Screenshot',
          accelerator: 'CmdOrCtrl+Shift+E',
          click: () => sendToRenderer('menu:screenshot')
        },
        {
          label: 'Export CSV',
          click: () => sendToRenderer('menu:export-csv')
        },
        ...(isMac ? [] : [{ type: 'separator' as const }, { role: 'quit' as const }])
      ]
    },
    {
      label: 'Edit',
      submenu: [
        {
          label: 'Undo',
          accelerator: 'CmdOrCtrl+Z',
          click: () => sendToRenderer('menu:undo')
        },
        {
          label: 'Redo',
          accelerator: 'CmdOrCtrl+Shift+Z',
          click: () => sendToRenderer('menu:redo')
        },
        { type: 'separator' },
        {
          label: 'Select All',
          accelerator: 'CmdOrCtrl+A',
          click: () => sendToRenderer('menu:select-all')
        },
        {
          label: 'Duplicate',
          accelerator: 'CmdOrCtrl+D',
          click: () => sendToRenderer('menu:duplicate')
        },
        {
          label: 'Delete',
          accelerator: 'Backspace',
          click: () => sendToRenderer('menu:delete')
        }
      ]
    },
    {
      label: 'View',
      submenu: [
        {
          label: 'Zoom In',
          accelerator: 'CmdOrCtrl+=',
          click: () => sendToRenderer('menu:zoom-in')
        },
        {
          label: 'Zoom Out',
          accelerator: 'CmdOrCtrl+-',
          click: () => sendToRenderer('menu:zoom-out')
        },
        {
          label: 'Zoom to 100%',
          accelerator: 'CmdOrCtrl+0',
          click: () => sendToRenderer('menu:zoom-reset')
        },
        { type: 'separator' },
        {
          label: 'Center View',
          click: () => sendToRenderer('menu:center-view')
        },
        {
          label: 'Toggle Grid',
          click: () => sendToRenderer('menu:toggle-grid')
        },
        {
          label: 'Toggle Snap',
          click: () => sendToRenderer('menu:toggle-snap')
        },
        { type: 'separator' },
        { role: 'toggleDevTools' },
        { role: 'togglefullscreen' }
      ]
    },
    {
      label: 'Help',
      submenu: [
        {
          label: 'About SAP Designer',
          click: () => sendToRenderer('menu:about')
        }
      ]
    }
  ]

  const menu = Menu.buildFromTemplate(template)
  Menu.setApplicationMenu(menu)
}

function sendToRenderer(channel: string): void {
  const win = BrowserWindow.getFocusedWindow()
  if (win) {
    win.webContents.send(channel)
  }
}
