const { contextBridge } = require('electron');
const { ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld('versions', {
  node: () => process.versions.node,
  chrome: () => process.versions.chrome,
  electron: () => process.versions.electron
  // we can also expose variables, not just functions
});

//contextBridge.exposeInMainWorld('ipcRenderer', ipcRenderer);


document.addEventListener('DOMContentLoaded', function () {
  //--Load Contents of Sawfiles//
  console.log('Page fully loaded!');
  //----------------------------Definitions of elements-----------------//
  let information = document.getElementById('info');
  let leftHandFileList = document.getElementById('userFolderList');
  let minimizeButton = document.getElementById('minimize');
  let refreshSawButton = document.getElementById('loadSawFiles');
  var numberOfFilesInFolder = 0;
  //----------------------------------------------------------------------//

  minimizeButton.addEventListener("click", () => {
    ipcRenderer.send("minimizeWindow");
    });
  //startupFileCheck
  ipcRenderer.send("readSawFilesFolder", "c:\\sawfiles_two\\");
  ipcRenderer.send("listUSBDevices");
  
  
  refreshSawButton.addEventListener("click", () => {
    ipcRenderer.send("listUSBDevices");
    numberOfFilesInFolder = 0;
    leftHandFileList.innerHTML = "";
    ipcRenderer.send("readSawFilesFolder", "c:\\sawfiles_two\\");
                            });
  ipcRenderer.on("sawFilesSentBack", (event, nameOfFile) => {
      //console.log(message);
      numberOfFilesInFolder++;
      leftHandFileList.innerHTML += 
      ("<img src='img/FileIndicator.png' style='max-height:10px;'></img> <span>" 
      + numberOfFilesInFolder + ". " + nameOfFile + " <br></span>");
      
  });


//FileAppendButton.addEventListener("click", () => {
  //What happens whe minimize is clicked, sent to main.
//  let text2beSaved = "Test example to append to file";
//  ipcRenderer.send("saveText", text2beSaved);
//});

  
});


