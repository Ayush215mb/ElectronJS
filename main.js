//to open terminal using electron

const { app, BrowserWindow, Menu } = require("electron");
const { exec } = require("child_process");
const path = require("node:path");
let mainWindow;

app.on("ready", () => {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  const menuTemplate = [
    {
      label: "File",
      submenu: [
        {
          label: "Open Terminal",
          click() {
            // Open the terminal
            exec("start cmd.exe"); // Change this command based on the OS
          },
        },
      ],
    },
  ];

  const menu = Menu.buildFromTemplate(menuTemplate);
  Menu.setApplicationMenu(menu);

  mainWindow.loadFile("index.html");
});
