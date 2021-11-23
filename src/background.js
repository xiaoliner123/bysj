'use strict'
import {
  app,
  protocol,
  BrowserWindow
} from 'electron'
import {
  createProtocol
} from 'vue-cli-plugin-electron-builder/lib'
import registerWindowStateChangeActions from './nodeFn/ipcMain'
import electronstoreMethods from './nodeFn/electronStore'
const isDevelopment = process.env.NODE_ENV !=='production'
const gotTheLock = app.requestSingleInstanceLock()

protocol.registerSchemesAsPrivileged([{
  scheme: 'app',
  privileges: {
    secure: true,
    standard: true
  }
}])

var win
var dgram
var server
if (!gotTheLock) {
  app.quit()
} else {
  app.on('second-instance', (event, commandLine, workingDirectory) => {
    // 当运行第二个实例时,将会聚焦到myWindow这个窗口
    if (win) {
      if (win.isMinimized()) win.restore()
      win.focus()
    }
  })
  // This method will be called when Electron has finished
  // initialization and is ready to create browser windows.
  // Some APIs can only be used after this event occurs.
  app.on('ready', async () => {
    createWindow()
    dgram = require('dgram')
    server = dgram.createSocket('udp4')
    server.bind(11203)
    server.on('message', function (msg, rinfo) {
      win.webContents.send('startTask', {
        msg,
        rinfo
      })
    })
    registerWindowStateChangeActions(win, server)
    electronstoreMethods()
  })
}
async function createWindow(){
  win = new BrowserWindow({
    width: 650,
    height: 450,
    frame: false,
    webPreferences: {
  
      // Use pluginOptions.nodeIntegration, leave this alone
      // See nklayman.github.io/vue-cli-plugin-electron-builder/guide/security.html#node-integration for more info
      nodeIntegration: process.env.ELECTRON_NODE_INTEGRATION,
      webviewTag: true,
      nodeIntegration: true,
      enableRemoteModule: true
    }
  });
  win.show()
  //win.webContents.openDevTools();  //开启调试工具
  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    win.loadURL(process.env.WEBPACK_DEV_SERVER_URL)
    if (!process.env.IS_TEST) win.webContents.openDevTools()
  } else {
    createProtocol('app')
    // Load the index.html when not in development
    win.loadURL('app://./index.html')
  }
}

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
})

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (process.platform === 'win32') {
    process.on('message', (data) => {
      if (data === 'graceful-exit') {
        app.quit()
      }
    })
  } else {
    process.on('SIGTERM', () => {
      app.quit()
    })
  }
}