const { app, BrowserWindow, ipcMain } = require('electron/main');
const path = require('node:path');
const fs = require("fs");

const createWindow = () => {
  const win = new BrowserWindow({
    titleBarStyle: 'hidden',
    width: 1024,
    height: 768, 
    resizable: false,
    center: true,
    icon: path.join(__dirname, 'assets/icons/win/Lotus.ico'),
    webPreferences:{
      nodeIntegration: true,
      //enableRemoteModule: true,
      //contextIsolation: false,
      preload: path.join(__dirname, 'preload.js'),
    }
    
  })
  //Minimize window passthru
  ipcMain.on("minimizeWindow", (event) => {
  try{
  win.minimize();
  }
  catch(err){
  console.error(err);
  }
  });
  win.loadFile('index.html')
}
app.whenReady().then(() => {
  createWindow() 
});

ipcMain.on("saveText", (event, performanceSetting) => {
try{
  fs.appendFileSync("c:\\sawfiles_two\\FileGeneratedFromElectron.txt", performanceSetting.toString());
}
catch(err){
  console.error(err);
}
});



//--MAC OS DARWIN BEHAVIOUR--//
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
});


