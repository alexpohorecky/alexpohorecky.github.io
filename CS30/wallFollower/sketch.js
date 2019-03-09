let posX = 0;
let posY = 0;
let moveX;
let moveY;
let state
function setup(){
  createCanvas(400, 400);
  fill(0);
  state = 1;
}

function draw(){

  background(255);

  if (posX === 0 && posY === 0){
    state = 1;
  }
  if (posX === width - 20){
    state = 2;
  }
  if (posY === height - 20){
    state = 3;
  }
  if (posX === 0 && posY === height - 20){
    state = 4;
  }
  if (state === 1){
    posX += 10;
  }
  if (state === 2){
    posY += 10;
  }
  if (state === 3){
    posX += -10;
  }
  if (state === 4){
    posY += -10;
  }
  rect(posX, posY, 20,20);
}
