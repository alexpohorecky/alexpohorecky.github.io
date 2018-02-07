let x;
let y;
let isMovingUp;
let isMovingDown;
let isMovingLeft;
let isMovingRight;

function setup(){
  createCanvas(800,800);
  x=width/2
  y=height/2
  isMovingUp = false;
  isMovingDown = false;
  isMovingLeft = false;
  isMovingRight = false;

}
function draw(){
  drawStickman(x,y);
  if (keyIsPressed){
    step();
  }

}
function keyPressed(){
  if (key === "w"|| key==="W" ){
    isMovingUp = true;
  }
  if (key === "s"|| key==="S"){
    isMovingDown = true;
  }
  if (key === "a"|| key==="A"){
    isMovingLeft=true;
    }
  if (key === "d"||key==="D"){
    isMovingRight=true;
  }
}
function keyReleased(){
  if (key === "w"|| key==="W" ){
    isMovingUp = false;
  }
  if (key === "s"|| key==="S"){
    isMovingDown = false;
  }
  if (key === "a"|| key==="A"){
    isMovingLeft=false;
    }
  if (key === "d"||key==="D"){
    isMovingRight=false;
  }
}
function step(){
  if (isMovingUp){
    y-=10;
  }
  if (isMovingDown){
    y+=10;
  }
  if(isMovingLeft){
    x-=10;
  }
  if(isMovingRight){
    x+=10;
  }
}

function drawStickman(x,y){
  background(255,255,255);
  fill(255,255,255);
  line(x,y-50,x,y+50);//Torso
  line(x,y+50,x-25,y+100);//Left Leg
  line(x,y+50,x+25,y+100);//Right Leg
  line(x-25,y-25,x+25,y-25);//Arms
  ellipse(x,y-75,50);//Head
}
