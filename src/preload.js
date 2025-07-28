const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  navigateToTasks: () => ipcRenderer.send('navigate-to-tasks')
});