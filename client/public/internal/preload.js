// const { contextBridge, ipcRenderer } = require('electron')
//
// contextBridge.exposeInMainWorld('electronAPI', {
//     close: (data) => ipcRenderer.send('topBar_close', data),
//     maximize: (data) => ipcRenderer.send('topBar_maximize', data),
//     shrink: (data) => ipcRenderer.send('topBar_shrink', data),
//     drawer: (data) => ipcRenderer.send('topBar_drawer', data)
// })