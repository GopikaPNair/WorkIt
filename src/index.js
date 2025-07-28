const { app, BrowserWindow, ipcMain } = require('electron');  // Added ipcMain
const path = require('path');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    resizable: true,
    fullscreenable: true,
    backgroundColor: '#b4d4ee',
    autoHideMenuBar: true,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js'),  // Make sure this exists
      enableRemoteModule: false
    }
  });

  mainWindow.setMenu(null);
  
  // Load the main page
  mainWindow.loadFile(path.join(__dirname, '..', 'index.html'));

  // Debugging handlers
  mainWindow.webContents.on('did-finish-load', () => {
    console.log('Main window loaded successfully');
  });

  mainWindow.webContents.on('did-fail-load', (event, errorCode, errorDesc) => {
    console.error('Failed to load main window:', errorDesc);
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

// Add IPC communication for navigation
ipcMain.on('navigate-to-tasks', () => {
  if (mainWindow) {
    mainWindow.loadFile(path.join(__dirname, '..', 'tasks.html'))
      .catch(err => console.error('Failed to load tasks page:', err));
  }
});

app.whenReady().then(() => {
  createWindow();
  
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// Error handling
process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});