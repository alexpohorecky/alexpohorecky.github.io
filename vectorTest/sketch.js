let x = 100;
let y = 100;
let pos;
let vel;
let acc;
let velVal;
let accVal;
function setup(){
  createCanvas(windowWidth, windowHeight);
  velVal = createVector(5,0);
  accVal = createVector(5,10);
}

function draw(){
  //background(255);
  makeBall();
}

function makeBall(){
  pos = createVector(x,y);
  vel = velVal;
  acc = accVal;
  vel.add(acc);
  pos.add(vel);
  ellipse(pos.x, pos.y, 20);
}
