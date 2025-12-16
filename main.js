const { app, BrowserWindow, ipcMain } = require('electron/main');
const path = require('node:path');
const fs = require("fs");
//const drivelist = require('drivelist');
const { getDriveList} = require('node-drivelist');

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
      contextIsolation: true,
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
  win.loadFile('index.html');




  
}




app.whenReady().then(() => {
  createWindow() 
});

//Method to save text to a file.
ipcMain.on("saveText", (event, text2beSaved) => {
try{
  fs.appendFileSync("c:\\sawfiles_two\\FileGeneratedFromElectron.txt", text2beSaved.toString());
}
catch(err){
  console.error(err);
}
});

//Method to read contents of directory
ipcMain.on("readSawFilesFolder", (event, sawFilesDirectory) => {
try{
  fs.readdir(sawFilesDirectory, (err, files) => {
  files.forEach(file => {
    console.log("Found File: " + file);
    event.reply("sawFilesSentBack", file);
    console.log(file + " sent to preload.js");
    
    //SENDS FILES BACK TO PRELOAD, USE PRELOAD TO CHANGE TEXT//
  });
});
}
catch(err){
  console.error(err);
}
});


//Method to list out USB devices (console)
ipcMain.on("listUSBDevices", async (event) => {
const drives = await getDriveList(); 
event.reply("USBdevicesSentBack", drives);
console.log("Drive data sent to preload.js => ", drives);
});


//--MAC OS DARWIN BEHAVIOUR--//
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
});


