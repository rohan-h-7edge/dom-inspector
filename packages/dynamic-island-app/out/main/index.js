"use strict";
const electron = require("electron");
const path = require("path");
const child_process = require("child_process");
let mainWindow = null;
let serverProcess = null;
let serverPort = 8888;
function getCliPath() {
  const monorepoRoot = path.resolve(__dirname, "../../../../");
  return path.join(monorepoRoot, "packages/dom-inspector/dist/cli.js");
}
function startServer() {
  return new Promise((resolve2, reject) => {
    const cliPath = getCliPath();
    console.log("[DynamicIsland] CLI path:", cliPath);
    serverProcess = child_process.spawn("node", [
      cliPath,
      "server",
      "--port",
      String(serverPort)
    ], {
      cwd: process.cwd(),
      env: { ...process.env },
      stdio: ["pipe", "pipe", "pipe"]
    });
    serverProcess.stdout?.on("data", (data) => {
      const output = data.toString();
      console.log("[dom-inspector-server]", output);
      if (output.includes("MCP (Standalone)")) {
        resolve2(serverPort);
      }
    });
    serverProcess.stderr?.on("data", (data) => {
      console.error("[dom-inspector-server error]", data.toString());
    });
    serverProcess.on("error", (error) => {
      console.error("[dom-inspector-server] Failed to start:", error);
      reject(error);
    });
    serverProcess.on("exit", (code) => {
      console.log("[dom-inspector-server] Process exited with code:", code);
      serverProcess = null;
    });
    setTimeout(() => {
      reject(new Error("Server start timeout"));
    }, 3e4);
  });
}
function createWindow() {
  const { width: screenWidth } = electron.screen.getPrimaryDisplay().workAreaSize;
  const windowWidth = 500;
  const windowHeight = 100;
  const x = Math.round((screenWidth - windowWidth) / 2);
  const y = 50;
  mainWindow = new electron.BrowserWindow({
    width: windowWidth,
    height: windowHeight,
    x,
    y,
    frame: false,
    transparent: true,
    alwaysOnTop: true,
    skipTaskbar: true,
    resizable: false,
    hasShadow: false,
    backgroundColor: "#00000000",
    titleBarStyle: "hidden",
    trafficLightPosition: { x: -100, y: -100 },
    roundedCorners: true,
    webPreferences: {
      preload: path.join(__dirname, "../preload/preload.js"),
      contextIsolation: true,
      nodeIntegration: false
    }
  });
  electron.ipcMain.on("resize-window", (_event, width, height) => {
    if (mainWindow) {
      const { width: screenWidth2 } = electron.screen.getPrimaryDisplay().workAreaSize;
      const newX = Math.round((screenWidth2 - width) / 2);
      mainWindow.setBounds({ x: newX, y: 12, width, height });
    }
  });
  electron.ipcMain.handle("get-server-port", () => serverPort);
  if (process.env.ELECTRON_RENDERER_URL) {
    mainWindow.loadURL(process.env.ELECTRON_RENDERER_URL);
    mainWindow.webContents.openDevTools({ mode: "detach" });
  } else {
    mainWindow.loadFile(path.join(__dirname, "../dist/index.html"));
  }
  mainWindow.on("closed", () => {
    mainWindow = null;
  });
}
function cleanup() {
  if (serverProcess) {
    console.log("[dom-inspector-server] Stopping server...");
    serverProcess.kill("SIGTERM");
    serverProcess = null;
  }
}
electron.app.whenReady().then(async () => {
  try {
    console.log("[DynamicIsland] Starting dom-inspector server...");
    await startServer();
    console.log(`[DynamicIsland] Server running on port ${serverPort}`);
  } catch (error) {
    console.error("[DynamicIsland] Failed to start server, proceeding anyway:", error);
  }
  createWindow();
});
electron.app.on("window-all-closed", () => {
  cleanup();
  if (process.platform !== "darwin") {
    electron.app.quit();
  }
});
electron.app.on("before-quit", () => {
  cleanup();
});
electron.app.on("activate", () => {
  if (mainWindow === null) {
    createWindow();
  }
});
