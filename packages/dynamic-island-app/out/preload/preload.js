"use strict";
const electron = require("electron");
electron.contextBridge.exposeInMainWorld("electronAPI", {
  // Window control
  resizeWindow: (width, height) => {
    electron.ipcRenderer.send("resize-window", width, height);
  },
  // Get server port
  getServerPort: () => {
    return electron.ipcRenderer.invoke("get-server-port");
  }
});
