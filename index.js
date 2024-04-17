const { app, BrowserWindow, ipcMain } = require('electron')

var secondwindow
var thirdwindow

function createwindow() {
  const mainwindow = new BrowserWindow({
    show: false,
    width: 500,
    height: 500,
    minHeight: 100,
    minWidth: 100,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  })
  mainwindow.on('ready-to-show', () => {
    mainwindow.show()
  })
  mainwindow.loadFile('index.html')
  mainwindow.on('close', () => {
    console.log('closed')
  })
}

app.on('ready', createwindow)

ipcMain.on('open-new-window', () => {
  secondwindow = new BrowserWindow(
    {
      width: 800,
      height: 800,
      webPreferences: {
        nodeIntegration: true,
        contextIsolation: false
      }
    })
  secondwindow.loadFile('change.html')
})

ipcMain.on('close-change-window', () => {
  if (secondwindow) {
    secondwindow.close()
    secondwindow = null
  }
})

ipcMain.on('open-write-window', () => {
  thirdwindow = new BrowserWindow(
    {
      width: 800,
      height: 600
    })
  thirdwindow.loadFile('write.html')

})