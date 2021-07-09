const btn = document.getElementById("btn");
const prompt_box = document.getElementById("prompt_box");
const promt_txt = document.getElementById("promt_txt");
const txt = document.getElementById("txt");
const num = document.getElementById("num");
let randomNumber ;

let number;
//console.log(randomNumber);

btn.addEventListener("click", (e) => {
  e.preventDefault();
  randomNumber = Math.floor(Math.random() * 100) + 1;
  console.log(`number=${num.value} random number=${randomNumber}`);
  number = num.value;
  checkNum(number);
  num.value = "";
});

function checkNum(number) {
  if(number===null){
    alert("enter a value");
  }

  else if (number>100) {
    alert("Enter no less than or equal to 100");
  }else if (number <0) {
    alert("Enter no greater than or equal to 0");
  }
  if (number == randomNumber) {
    activateBox("Win");
  } else if (number > randomNumber) {
    txt.innerHTML = "Your guess is High";
  } else {
    txt.innerHTML = "Your guess is Low";
  }
}

function activateBox(e) {
  prompt_box.classList.add("active");
  promt_txt.innerHTML = e ;
  randomNumber = Math.floor(Math.random() * 100) + 1;
}
function play(e) {
  prompt_box.classList.remove("active");
}