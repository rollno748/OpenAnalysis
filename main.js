const { app, BrowserWindow, ipcMain, nativeTheme } = require('electron')
const path = require('path')

function createWindow () {
  const win = new BrowserWindow({
    width: 1020,
    height: 800,
    frame: true,
    // show: false,
    webPreferences: {
      preload: path.join(__dirname, 'src/js/preload.js')
    }
  })

  // const splash = new BrowserWindow({
  //   width: 500, 
  //   height: 300, 
  //   transparent: true, 
  //   frame: false, 
  //   alwaysOnTop: true 
  // });

  win.loadFile('index.html')

  // splash.loadFile('splash.html');
  // splash.center();

  // setTimeout(function () {
  //   splash.close();
  //   mainWindow.center();
  //   mainWindow.show();
  // }, 5000);

  ipcMain.handle('dark-mode:toggle', () => {
    if (nativeTheme.shouldUseDarkColors) {
      nativeTheme.themeSource = 'light'
    } else {
      nativeTheme.themeSource = 'dark'
    }
    return nativeTheme.shouldUseDarkColors
  })

  ipcMain.handle('dark-mode:system', () => {
    nativeTheme.themeSource = 'system'
  })
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})