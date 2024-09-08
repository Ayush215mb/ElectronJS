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
            if (process.platform === "win32") {
              exec('start cmd.exe /K "node -v"'); // Run node -v in Command Prompt
            } else if (process.platform === "darwin") {
              exec('open -a Terminal "`node -v`"'); // Run node -v in macOS Terminal
            } else if (process.platform === "linux") {
              exec('gnome-terminal -- bash -c "node -v; exec bash"'); // Run node -v in Linux terminal
            }
          },
        },
      ],
    },
    {
      label: "ayush",
      submenu: [
        {
          label: "name",
          click() {
            console.log("clicked Name");
          },
        },
        {
          label: "city",
          click() {
            console.log("KOlkata");
          },
        },
      ],
    },
  ];

  const menu = Menu.buildFromTemplate(menuTemplate);
  Menu.setApplicationMenu(menu);

  mainWindow.loadFile("index.html");
  exec('start cmd.exe /K "node -v && npm -v"');
});
