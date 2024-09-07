// Modules to control application life and create native browser window
const {
  app,
  BrowserWindow,
  Notification,
  BaseWindow,
  WebContentsView,
} = require("electron");

const path = require("node:path");
const fs = require("node:fs");

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      offscreen: true, //to remove the top options
    },
  });

  // and load the index.html of the app.

  mainWindow.loadFile("index.html");
  // mainWindow.loadURL("https://github.com");

  //dont know the meaning of base window
  const win = new BaseWindow({
    width: 800,
    height: 400,
    // titleBarStyle: "hidden",
  });

  const view1 = new WebContentsView();
  win.contentView.addChildView(view1);
  view1.webContents.loadURL("https://www.instagram.com/");
  view1.setBounds({ x: 100, y: 200, width: 800, height: 600 });

  //to take screenshot
  mainWindow.webContents.on("paint", (event, dirty, image) => {
    fs.writeFileSync("example.png", image.toPNG());
  });
  mainWindow.webContents.setFrameRate(60);
  console.log(
    `The screenshot has been successfully saved to ${path.join(
      process.cwd(),
      "ex.png"
    )}`
  );

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()
};

//notification
const NOTIFICATION_TITLE = "Basic Notification";
const NOTIFICATION_BODY = "Notification from the Main process";

function showNotification() {
  new Notification({
    title: NOTIFICATION_TITLE,
    body: NOTIFICATION_BODY,
  }).show();
}
//second notif
const NOTIFICATION_TITLE2 = "Title";
const NOTIFICATION_BODY2 =
  "Notification from the Renderer process. Click to log to console.";
const CLICK_MESSAGE = "Notification clicked";
function shownotif() {
  new Notification({
    NOTIFICATION_TITLE2,
    body: NOTIFICATION_BODY2,
  }).show().onclick = () => console.log(CLICK_MESSAGE);
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app
  .whenReady()
  .then(() => {
    createWindow();

    app.on("activate", () => {
      // On macOS it's common to re-create a window in the app when the
      // dock icon is clicked and there are no other windows open.
      if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
    showNotification();
    shownotif();
  })
  .catch((error) => {
    console.log(error);
  });

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
