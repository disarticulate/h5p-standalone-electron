'use strict'

import { app, BrowserWindow, dialog, ipcMain } from 'electron'

const Config = require('electron-config')
const appPort = 9080
const config = new Config()
const fs = require('fs-extra')

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}

let mainWindow
const winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:${appPort}`
  : `file://${__dirname}/index.html`

function createWindow () {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    height: 563,
    useContentSize: true,
    width: 1000
  })

  mainWindow.loadURL(winURL)

  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})

ipcMain.on('hp5-folder', (event, arg) => {
  var filePath = config.get('hp5-folder') || app.getPath('downloads')
  switch (arg) {
    case 'mounted':
      if (fs.existsSync(filePath)) {
        config.set('hp5-folder', filePath)
        filePath = arg
      }
      break
    case 'select':
      filePath = dialog.showOpenDialog(mainWindow, {
        properties: ['openDirectory'],
        multiSelections: false
      })
      if (filePath && fs.existsSync(filePath[0])) {
        config.set('hp5-folder', filePath[0])
        filePath = filePath[0]
      }
      break
  }
  filePath = filePath || app.getPath('downloads')
  event.sender.send('hp5-folder', filePath)
})

require('./server.js')
