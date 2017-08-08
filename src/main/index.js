'use strict'

import { app, BrowserWindow, dialog, ipcMain, protocol } from 'electron'

const path = require('path')
const Config = require('electron-config')
const appPort = 9080
const config = new Config()
const fs = require('fs-extra')
const finder = require('find')

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
    width: 1000,
    'web-preferences': {
      'web-security': false
    }
  })

  mainWindow.loadURL(winURL)

  mainWindow.on('closed', () => {
    mainWindow = null
  })
  mainWindow.openDevTools()

  // h5p library makes ajax requests, in production, use a custom protocol
  protocol.registerFileProtocol('h5p', (request, callback) => {
    const url = request.url.substr(7)
    console.log('h5p://', url)
    // eslint-disable-next-line
    callback({ path: path.normalize(`${url}`) })
  }, (error) => {
    if (error) console.error('Failed to register protocol')
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

// var devServer = require('./server.js')

ipcMain.on('hp5-folder', (event, arg) => {
  var filePath = config.get('hp5-folder') || app.getPath('downloads')
  switch (arg) {
    case 'mounted':
      if (fs.existsSync(filePath)) {
        config.set('hp5-folder', filePath)
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
        event.sender.send('hp5-folder-clear')
      }
      break
  }

  filePath = filePath || app.getPath('downloads')
  event.sender.send('hp5-folder', filePath)
  // devServer.rootFolder = filePath
  findH5PFiles(filePath, event)
  findH5PFolders(filePath, event)
})

const findH5PFiles = (folder, event) => {
  finder.eachfile(/\.H5P$/i, folder, (file) => {
    var filename = file.replace(`${folder}/`, '')
    console.log(filename)
    event.sender.send('hp5-folder-file', filename)
  })
}

const findH5PFolders = (folder, event) => {
  finder.eachfile(/H5P\.json/i, folder, (file) => {
    var filePath = file.replace(/\/H5P\.json/ig, '')
    filePath = filePath.replace(`${folder}/`, '')
    console.log(filePath)
    event.sender.send('hp5-folder-path', filePath)
  })
}
