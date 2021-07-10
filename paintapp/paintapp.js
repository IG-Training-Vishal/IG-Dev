let canvas;
let ctx;
const increaseButton=document.getElementById("increment");
const decreaseButton=document.getElementById("decrease");
const sizeElement=document.getElementById("size");
const colorElement=document.getElementById("color");
const clearElement=document.getElementById("clear");




let savedImageData;
let dragging = false;
// let strokeColor = 'black';  //ink color
// let fillColor = 'black';   //fill color
let size=1;
let line_Width = 4;    // brush size




let currentTool = 'brush';
let canvasWidth = 800;
let canvasHeight = 600;
let color="black";


function msg() {
    alert("Hello world!");
  }


function erase(){
    ctx.clearRect(0,0,canvas.clientWidth,canvas.height);
}

//   clearElement.addEventListener("click",()=>{
//     ctx.clearRect(0,0,canvas.clientWidth,canvas.height);
// });

//  strokeColor=color;
 

let usingBrush = false;
let brushXPoints = new Array();
let brushYPoints = new Array();
let brushDownPos = new Array();
 

class ShapeBoundingBox{
    constructor(left, top, width, height) {
        this.left = left;
        this.top = top;
        this.width = width;
        this.height = height;
    }
}
 
class MouseDownPos{
    constructor(x,y) {
        this.x = x,
        this.y = y;
    }
}
 

class Location{
    constructor(x,y) {
        this.x = x,
        this.y = y;
    }
}


let shapeBoundingBox = new ShapeBoundingBox(0,0,0,0);

let mousedown = new MouseDownPos(0,0);

let loc = new Location(0,0);
 
document.addEventListener('DOMContentLoaded', setupCanvas);


//setup canvas elements
function setupCanvas(){
    
    canvas = document.getElementById('my-canvas');
    
    ctx = canvas.getContext('2d');
    ctx.strokeStyle = color;
    ctx.fillStyle=color
    // ctx.strokeStyle = strokeColor;
    ctx.lineWidth = line_Width;
    
    canvas.addEventListener("mousedown", ReactToMouseDown);
    canvas.addEventListener("mousemove", ReactToMouseMove);
    canvas.addEventListener("mouseup", ReactToMouseUp);
}
 
function ChangeTool(toolClicked){
    document.getElementById("open").className = "";
    document.getElementById("save").className = "";
    document.getElementById("brush").className = "";
    document.getElementById("line").className = "";
    document.getElementById("rectangle").className = "";
    document.getElementById("circle").className = "";
    document.getElementById("ellipse").className = "";
    document.getElementById("polygon").className = "";
    document.getElementById("reset").className = "";
   
   
   
    document.getElementById(toolClicked).className = "selected";
        
    
    currentTool = toolClicked;
}

function GetMousePosition(x,y){
    let canvasSizeData = canvas.getBoundingClientRect();
    return { x: (x - canvasSizeData.left) * (canvas.width  / canvasSizeData.width),
        y: (y - canvasSizeData.top)  * (canvas.height / canvasSizeData.height)
      };
}
 
function SaveCanvasImage(){
    
    savedImageData = ctx.getImageData(0,0,canvas.width,canvas.height);
}
 
function RedrawCanvasImage(){
    
    ctx.putImageData(savedImageData,0,0);
}
 
function UpdateRubberbandSizeData(loc){
    
    shapeBoundingBox.width = Math.abs(loc.x - mousedown.x);
    shapeBoundingBox.height = Math.abs(loc.y - mousedown.y);
 
    
    if(loc.x > mousedown.x){
        shapeBoundingBox.left = mousedown.x;
    } else {
        shapeBoundingBox.left = loc.x;
    }
 
    
    if(loc.y > mousedown.y){
        shapeBoundingBox.top = mousedown.y;
    } else {
        shapeBoundingBox.top = loc.y;
    }
}
 
 



function drawRubberbandShape(loc){
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
    // ctx.strokeStyle = strokeColor;
    // ctx.fillStyle = fillColor;
    if(currentTool === "brush"){
        // Create paint brush
        DrawBrush();
    } else if(currentTool === "line"){
        
        ctx.beginPath();
        ctx.moveTo(mousedown.x, mousedown.y);
        ctx.lineTo(loc.x, loc.y);
        ctx.stroke();
    } else if(currentTool === "rectangle"){
        
        ctx.strokeRect(shapeBoundingBox.left, shapeBoundingBox.top, shapeBoundingBox.width, shapeBoundingBox.height);
    } else if(currentTool === "circle"){
        
        let radius = shapeBoundingBox.width;
        ctx.beginPath();
        ctx.arc(mousedown.x, mousedown.y, radius, 0, Math.PI * 2);
        ctx.stroke();
    } else if(currentTool === ""){
        
     
    } else if(currentTool === "polygon"){
        
        
        ctx.stroke();
    }else if(currentTool === "reset"){
        
        erase();    
    }
    else if(currentTool === "increment"){
        
        erase();    
    }else if(currentTool === "decrement"){
        
        erase();    
    }else if(currentTool === "palette"){
        
        erase();    
    }
}
 
function UpdateRubberbandOnMove(loc){
     
    
    UpdateRubberbandSizeData(loc);
 
    
    drawRubberbandShape(loc);
}
 


function AddBrushPoint(x, y, mouseDown){
    brushXPoints.push(x);
    brushYPoints.push(y);
    brushDownPos.push(mouseDown);
}
 

function DrawBrush(){
    for(let i = 1; i < brushXPoints.length; i++){
        ctx.beginPath();
 
       
        if(brushDownPos[i]){
            ctx.moveTo(brushXPoints[i-1], brushYPoints[i-1]);
        } else {
            ctx.moveTo(brushXPoints[i]-1, brushYPoints[i]);
        }
        ctx.lineTo(brushXPoints[i], brushYPoints[i]);
        ctx.closePath();
        ctx.stroke();
    }
}
 
function ReactToMouseDown(e){
    
    canvas.style.cursor = "crosshair";
     
    loc = GetMousePosition(e.clientX, e.clientY);
    
    SaveCanvasImage();
    
    mousedown.x = loc.x;
    mousedown.y = loc.y;
    
    dragging = true;
 
    
    if(currentTool === 'brush'){
        usingBrush = true;
        AddBrushPoint(loc.x, loc.y);
    }
};
 
function ReactToMouseMove(e){
    canvas.style.cursor = "crosshair";
    loc = GetMousePosition(e.clientX, e.clientY);
 
    
    if(currentTool === 'brush' && dragging && usingBrush){
    
        if(loc.x > 0 && loc.x < canvasWidth && loc.y > 0 && loc.y < canvasHeight){
            AddBrushPoint(loc.x, loc.y, true);
        }
        RedrawCanvasImage();
        DrawBrush();
    } else {
        if(dragging){
            RedrawCanvasImage();
            UpdateRubberbandOnMove(loc);
        }
    }
};
 
function ReactToMouseUp(e){
    canvas.style.cursor = "default";
    loc = GetMousePosition(e.clientX, e.clientY);
    RedrawCanvasImage();
    UpdateRubberbandOnMove(loc);
    dragging = false;
    usingBrush = false;
}
 

function SaveImage(){
    
    var imageFile = document.getElementById("img-file");  
    imageFile.setAttribute('download', 'bloom.png');  
    imageFile.setAttribute('href', canvas.toDataURL()); 
}
 
function OpenImage(){
    let img = new Image();  
        img.onload = function(){
        ctx.clearRect(0,0,canvas.width, canvas.height);
        ctx.drawImage(img,0,0);
    }
    img.src = 'bloom.png';
    
}


// function updateNumber(){
//     sizeElement.innerText=size;
// }
// increaseButton.addEventListener("click",()=>{
//     size+=1;
//     if(size>100){
//         size=100;
//     }
//     updateNumber();
// });
// decreaseButton.addEventListener("click",()=>{
//     size-=1;
//     if(size<1){
//         size=1;
//     }
//     updateNumber();
// });
// clearElement.addEventListener("click",()=>{
//     ctx.clearRect(0,0,canvas.clientWidth,canvas.height);
// });
// colorElement.addEventListener("change",(e)=>{
//     color=e.target.value;
//     // strokeColor=color
//     ctx.strokeStyle=color;
// })

