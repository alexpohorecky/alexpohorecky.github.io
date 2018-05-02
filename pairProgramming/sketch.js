let backgroundGraphic;
let cannon;
let mouseXPos;
let balls = [];
let ballLaunchPos;
function preload(){
  backgroundGraphic = loadImage('peggleBaseScreen.png');
  cannon = loadImage('peggleCannon.png');

}

function setup(){
  createCanvas(windowWidth, windowHeight);
  document.documentElement.style.overflow = 'hidden';
  document.body.style.cursor = 'none';

  image(backgroundGraphic,0,0, width, height);



}

function draw(){
  imageMode(CORNER);
  image(backgroundGraphic,0,0, width, height);

  fill("green");
  strokeWeight(5);

  translate(width/2, 0);
  ballLaunchPos = createVector(0,height/15);
  angleMode(DEGREES);
  push();
  rotate(map(constrain(mouseX,width/16,width/3), width/3, width/16, -90, 90));
  ballLaunchPos.rotate(map(constrain(mouseX,width/16,width/3), width/3, width/16, -90, 90));
  imageMode(CENTER);
  image(cannon,0,height/56,height/6,height/10);


  pop();
  for (let ball of balls){
    ball.move();
    ball.animate();
  }
  // rectMode(CENTER);
  // rect(0,0,20,60);
}

function mouseClicked(){
    balls.push(new Ball(ballLaunchPos.x,ballLaunchPos.y,height/50,0,5,0,0,0,0,0));
}
