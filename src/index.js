const { app, BrowserWindow, Menu } = require('electron');
const path = require('path');

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    resizable: true,
    fullscreenable: true,
    backgroundColor: '#b4d4ee',
    autoHideMenuBar: true, // ✅ hide the menu bar
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    }
  });

  win.setMenu(null); // ✅ completely disables the menu
  win.loadFile(path.join(__dirname, '..', 'index.html'));

  win.webContents.on('did-finish-load', () => {
    console.log("✅ HTML loaded");
  });

  win.webContents.on('did-fail-load', () => {
    console.log("❌ Failed to load HTML");
  });
}

app.whenReady().then(() => {
  createWindow();
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
