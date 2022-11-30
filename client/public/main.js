const { app, BrowserWindow, ipcMain, session  } = require('electron')
const path = require('path')
const {
  default: installExtension,
  REDUX_DEVTOOLS,
  REACT_DEVELOPER_TOOLS
} = require("electron-devtools-installer");
const isDev = require('electron-is-dev')
require('@electron/remote/main').initialize()


function createWindow() {
  const win = new BrowserWindow({
    width: 1280,
    height: 720,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true,
      devTools: true,
      contextIsolation: false,
      preload: path.join(__dirname, "/internal/preload.js"),
    },
    darkTheme: true,
    titleBarStyle: 'customButtonsOnHover',
    frame: true,
    minWidth: 1024,
    minHeight: 600,
  })
  win.loadURL(
    isDev
      ? 'http://localhost:3000'
      : `file://${path.join(__dirname, '../build/index.html')}`
  )
  if (isDev) {
    win.webContents.once("dom-ready", async () => {
      await installExtension([REDUX_DEVTOOLS, REACT_DEVELOPER_TOOLS])
          .then((name) => console.log(`Added Extension:  ${name}`))
          .catch((err) => console.log("An error occurred: ", err))
          .finally(() => {
            win.webContents.openDevTools();
          });
    });
  }
  ipcMain.on('topBar_close', (event, title) => {
    try {
    app.quit();
    console.log('[MORGANA]: EXIT!')
  } catch (e) {
  console.log('ex close', e)
  } })
  ipcMain.on('topBar_maximize', (event, isFullScreen) => { isFullScreen ? win.maximize() : win.restore() })
  ipcMain.on('topBar_shrink', (event, title) => { win.minimize() })
  ipcMain.on('topBar_drawer', (event, title) => { console.log('drawer') })
}

app.on('ready', createWindow)
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
app.on('activate', function () {
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
})
