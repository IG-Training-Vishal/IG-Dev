let size=1;
let isPressed=false;
let color="black"
let x=undefined;
let y=undefined;
const canvas=document.getElementById("canvas");
const increaseButton=document.getElementById("increase");
const decreaseButton=document.getElementById("decrease");
const sizeElement=document.getElementById("size");
const colorElement=document.getElementById("color");
const clearElement=document.getElementById("clear");
const ctx=canvas.getContext("2d");

canvas.addEventListener("mousedown",()=>{
    isPressed=true;
    x=offsetX;
    y=offsetX;

});
canvas.addEventListener("mouseup",(e)=>{
    isPressed=false;
    x=e.undefined;
    y=e.undefined;

});
canvas.addEventListener("mousemove",(e)=>{
    if(isPressed){
        const x2=e.offsetX;
        const y2=e.offsetY;
        circle(x2,y2);
        lines(x,y,x2,y2);
        x=x2;
        y=y2;
    }

});
function circle(x,y){
    ctx.beginPath();
    ctx.arc(x,y,size,0,Math.PI*2);
    ctx.fillstyle=color;
    ctx.fill();
}
function lines(x1,y1,x2,y2){
    ctx.beginPath(x1,y1);
    ctx.moveTo(x1,y1);
    ctx.lineTo(x2,y2);
    //ctx.strokeStyle=color;
    ctx.linewidth=size*2;
    ctx.stroke();
}
function updateNumber(){
    sizeElement.innerText=size;
}
increaseButton.addEventListener("click",()=>{
    size+=1;
    if(size>100){
        size=100;
    }
    updateNumber();
});
decreaseButton.addEventListener("click",()=>{
    size-=1;
    if(size<1){
        size=1;
    }
    updateNumber();
});
clearElement.addEventListener("click",()=>{
    ctx.clearRect(0,0,canvas.clientWidth,canvas.height);
});
colorElement.addEventListener("change",(e)=>{
    color=e.target.value;
    ctx.strokeStyle=color;
    ctx.fillstyle=color;
})