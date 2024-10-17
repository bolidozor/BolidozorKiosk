const { contextBridge, ipcRenderer } = require('electron');

console.log('preload.js loaded');


contextBridge.exposeInMainWorld('electronAPI', {
    onFFTData: (callback) => ipcRenderer.on('fft-data', callback)
  });
  
  console.log('Preload script loaded');