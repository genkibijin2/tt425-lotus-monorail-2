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
  let USBFolderList = document.getElementById('USBFolderList');
  let sawFilesLocationDropDown = document.getElementById('codes');
  const loadingBox = document.getElementById('loadingBlock');
  const helper = document.getElementById('helper');
  //----------------------------------------------------------------------//

  minimizeButton.addEventListener("click", () => {
    ipcRenderer.send("minimizeWindow");
    });
  //startupFileCheck
  ipcRenderer.send("readSawFilesFolder", "c:\\sawfiles_two\\");
  
  
  
  refreshSawButton.addEventListener("click", () => {
    loadingBox.style.opacity = "100%";
    ipcRenderer.send("listUSBDevices");
    numberOfFilesInFolder = 0;
    leftHandFileList.innerHTML = "";
    var dropdownValue = sawFilesLocationDropDown.value;
    var sawFileFolder = sawFilesLocationDropDown.options[sawFilesLocationDropDown.selectedIndex].text;
    console.log(sawFileFolder);
    ipcRenderer.send("readSawFilesFolder", sawFileFolder);
                            });
  ipcRenderer.on("sawFilesSentBack", (event, nameOfFile) => {
      //console.log(message);
      numberOfFilesInFolder++;
      leftHandFileList.innerHTML += 
      ("<img src='img/FileIndicator.png' style='max-height:10px;'></img> <span>" 
      + numberOfFilesInFolder + ". " + nameOfFile + " <br></span>");
      });

  //Attempt to load in usb devices on first load
  ipcRenderer.send("listUSBDevices");
  ipcRenderer.on("USBdevicesSentBack", (event, USBDrive) => {
    USBFolderList.innerHTML = "";
    
    
    DrivesInfo = USBDrive;
    let DriveIDIndexes = Object.keys(DrivesInfo); 
   // console.log(DriveIDIndexes);
    DriveIDIndexes.forEach(DriveNumber => {
      let currentSelectedDrive = DriveNumber;
      
      let drivePATH = (DrivesInfo[currentSelectedDrive].mountpoint + "\\");
      let nameOfDrive = (DrivesInfo[currentSelectedDrive].name);
      let freespaceInGB = parseFloat(DrivesInfo[currentSelectedDrive].available);
      freespaceInGB = Number(((freespaceInGB/1000000000).toFixed(2)));
      imgNumber = parseInt(currentSelectedDrive);
      if(imgNumber > 8){ imgNumber = 0;}
      if(drivePATH != "C:\\" && drivePATH != "S:\\" &&
        drivePATH != "Y:\\" && drivePATH != "Z:\\"
        && drivePATH != "W:\\"
      ){
        
        USBFolderList.innerHTML += ("<button class='validUSB'>" +
         "<img src='img/disk" + imgNumber + ".png'></img><br/>"
        + "<span><u>Drive " + currentSelectedDrive + ":</u><br/> " + drivePATH +
        "<br/> " + nameOfDrive + "<br/> Free Space: " + freespaceInGB +
        "GB" + "</span></button></span>&nbsp;");
      }
      else{
        USBFolderList.innerHTML +=
        ("<button class='driveBox'>" +
         "<img src='img/mac" + imgNumber + ".png'></img><br/>"
        + "<span><u>Drive " + currentSelectedDrive + ":</u><br/> " + drivePATH +
        "<br/> " + nameOfDrive + "<br/> Free Space: " + freespaceInGB +
        "GB" + "</span></button>&nbsp;");
      }
      
    });
    console.log(USBFolderList.innerHTML);
    //add listeners to all members of USB classes:
    var ValidUsbTaggedBoxes = document.getElementsByClassName("validUSB");
    for (ValidIndex = 0; ValidIndex < ValidUsbTaggedBoxes.length; ValidIndex++){
      ValidUsbTaggedBoxes[ValidIndex].addEventListener("mouseenter", () => {
        helper.innerText = "Select this USB";
      });
    }
    //add listeners to all inaccessible drives
    var simplyDriveBoxes = document.getElementsByClassName("driveBox");
    for (boxIndex = 0; boxIndex < simplyDriveBoxes.length; boxIndex++){
      simplyDriveBoxes[boxIndex].addEventListener("mouseenter", () =>{
        helper.innerText = "Cannot use this drive...";
      })
    }
    
    
   loadingBox.style.opacity = "0%"; 
  });





//FileAppendButton.addEventListener("click", () => {
  //What happens whe minimize is clicked, sent to main.
//  let text2beSaved = "Test example to append to file";
//  ipcRenderer.send("saveText", text2beSaved);
//});

  
});


