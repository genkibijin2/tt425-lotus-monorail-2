const { contextBridge } = require('electron')

contextBridge.exposeInMainWorld('versions', {
  node: () => process.versions.node,
  chrome: () => process.versions.chrome,
  electron: () => process.versions.electron
  // we can also expose variables, not just functions
});

const { ipcRenderer } = require("electron");
document.addEventListener('DOMContentLoaded', function () {
  let information = document.getElementById('info');
  let FileAppendButton = document.getElementById('fileAppender');
  let minimizeButton = document.getElementById('minimize');
  minimizeButton.addEventListener("click", () => {
    ipcRenderer.send("minimizeWindow");
  });


  FileAppendButton.addEventListener("click", () => {
    //What happens whe minimize is clicked, sent to main.
    let performanceSetting = "Test example to append to file";
    ipcRenderer.send("saveText", performanceSetting);
  })
});

