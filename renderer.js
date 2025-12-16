
//Helper Info Box
//Add mouseover events to everything that change the innerText to a description of
//the moused over element...
const helper = document.getElementById('helper');

//Performance Mode Box
const information = document.getElementById('info');

//default mode--//
information.innerText = "Standard Mode";
document.getElementById('shaderCanvas').setAttribute("width","854");
document.getElementById('shaderCanvas').setAttribute("height","480");

//quit button
var quitButton = document.getElementById('quit');
quitButton.addEventListener("click", () => {
    window.close();
});
quitButton.addEventListener("mouseenter", () => {
    helper.innerText = "Quit the program";
});

//Change Quality Of Shader (performance reasons)
var qualityToggle = document.getElementById('maximize');
var performanceMode = 0;
qualityToggle.addEventListener("mouseenter", () => {
    helper.innerText = "Adjust Quality/Performance Modes";
});
qualityToggle.addEventListener("click", () => {
    if(performanceMode == 0){
    document.getElementById('shaderCanvas').style.imageRendering = "pixelated";
    //first level of pixelation
    performanceMode++;
    information.innerText = "Performance Mode I";
    helper.innerText = "Mode set to \"Performance Mode I\"";
    information.style.color = '#240B0B';
    information.style.background = 'linear-gradient(0deg,rgba(102, 255, 204, 1) 0%, rgba(145, 255, 204, 1) 11%, rgba(204, 255, 204, 1) 24%, rgba(255, 255, 255, 1) 44%)';
    document.getElementById('shaderCanvas').setAttribute("width","427");
    document.getElementById('shaderCanvas').setAttribute("height","240");
    }
    else if(performanceMode == 1){
    performanceMode++;
    information.innerText = "Performance Mode II";
    helper.innerText = "Mode set to \"Performance Mode II\"";
    information.style.color =  '#5C1C1C';
    information.style.background = 'linear-gradient(0deg,rgba(102, 255, 204, 1) 0%, rgba(145, 255, 204, 1) 24%, rgba(204, 255, 204, 1) 42%, rgba(255, 255, 255, 1) 68%)';
    document.getElementById('shaderCanvas').setAttribute("width","213.5");
    document.getElementById('shaderCanvas').setAttribute("height","120");
    }
    else if(performanceMode == 2){
    performanceMode++;
    information.innerText = "Performance Mode III";
    helper.innerText = "Mode set to \"Performance Mode III\"";
    information.style.color =  '#942E2E';
    information.style.background = 'linear-gradient(0deg,rgba(102, 255, 204, 1) 0%, rgba(145, 255, 204, 1) 27%, rgba(204, 255, 204, 1) 59%, rgba(255, 255, 255, 1) 94%)';
    document.getElementById('shaderCanvas').setAttribute("width","106.75");
    document.getElementById('shaderCanvas').setAttribute("height","60");
    }
    else if(performanceMode == 3){
    //most low-res, turn blurring back on as it looks good.
    document.getElementById('shaderCanvas').style.imageRendering = "auto";
    
    performanceMode++;
    information.innerText = "Performance Mode IV";
    helper.innerText = "Mode set to \"Performance Mode IV\"";
    information.style.color =  '#DE4747';
    information.style.background = 'linear-gradient(0deg,rgba(102, 255, 204, 1) 0%, rgba(145, 255, 204, 1) 72%, rgba(204, 255, 204, 1) 90%, rgba(255, 255, 255, 1) 100%)';
    document.getElementById('shaderCanvas').setAttribute("width","3");
    document.getElementById('shaderCanvas').setAttribute("height","3");
    
    }
    else if(performanceMode == 4){
    //MAX PERFORMANCE
    //smooth off with single pixel of colour, make title bar white;
    document.getElementById('shaderCanvas').style.imageRendering = "pixelated";
    performanceMode++;
    information.innerText = "Performance Mode V Extreme";
    helper.innerText = "Mode set to \"Performance Mode V Extreme\"";
    information.style.color = 'black';
    information.style.background = 'rgba(102, 255, 204, 1)';
    document.getElementById('shaderCanvas').setAttribute("width","1");
    document.getElementById('shaderCanvas').setAttribute("height","1");
    document.getElementById('shaderCanvas').style.opacity = '0';
    document.getElementById('programTitle').style.backdropFilter = 'invert(0%)';
    document.getElementById('programTitle').style.backdropFilter = 'blur(0px)';
    document.getElementById('programTitle').style.backgroundColor = 'black';
    }
    else if(performanceMode == 5){
    document.getElementById('shaderCanvas').style.opacity = '1';
    //essentially a return to default
    
    performanceMode = 0;
    information.innerText = "Standard Mode";
    helper.innerText = "Mode set to \"Standard Mode\"";
    information.style.color = 'black';
    information.style.background = 'linear-gradient(0deg,rgba(102, 255, 204, 1) 0%, rgba(145, 255, 204, 1) 7%, rgba(204, 255, 204, 1) 22%, rgba(255, 255, 255, 1) 30%)';
    document.getElementById('shaderCanvas').setAttribute("width","854");
    document.getElementById('shaderCanvas').setAttribute("height","480");
    document.getElementById('programTitle').style.background = 'none';
    document.getElementById('programTitle').style.backdropFilter = 'blur(6px) invert(100%) hue-rotate(260deg)';
    document.getElementById('shaderCanvas').style.imageRendering = "auto";
    }
});
//--End of performance controls-----------------------------------------//

//--------------------------HELPER DESCRIPTIONS------------------------------//
//title bar methods
const programTitleBlock = document.getElementById('programTitle');
programTitleBlock.addEventListener("mouseenter", () => {
    helper.innerText = "TT425 Lotus Monorail, running on electron";
});

//performance info helper section
information.addEventListener("mouseenter", () => {
    var myCurrentPerformanceMode = information.innerText;
    helper.innerText = "Current performance mode: " + myCurrentPerformanceMode;
});

//Left List Helper Section
let leftHandList = document.getElementById('userFolderList');
leftHandList.addEventListener("mouseenter", () => {
    helper.innerText = "List of files on your system";
});

//Right List Helper Section
let RightHandList = document.getElementById('USBFolderList');
RightHandList.addEventListener("mouseenter", () => {
    helper.innerText = "List of files on USB/Network Target";
});

//Minimize button helper section
let minimizeButton = document.getElementById('minimize');
minimizeButton.addEventListener("mouseenter", () => {
    helper.innerText = "Minimize the window";
});

//Path Selection
let sawFolderPicker = document.getElementById('codes');
sawFolderPicker.addEventListener("mouseenter", () => {
    helper.innerText = "Choose your .prt file location";
});
//--------------------------HELPER DESCRIPTIONS------------------------------//

