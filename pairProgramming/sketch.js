let backgroundGraphic;
let cannon;
let mouseXPos;
let balls = [];
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
    imageMode(CENTER);
  image(cannon,width/2,5,80,50);
  translate(width/2, 0);
  angleMode(DEGREES);
  push();
  rotate(map(constrain(mouseX,104,590), 590, 104, -90, 90));


  pop();
  for (let ball of balls){
    ball.move();
    ball.animate();
  }
  // rectMode(CENTER);
  // rect(0,0,20,60);
}

function mouseClicked(){
    balls.push(new Ball(0,0,10,0,5,0,0,0,0,0));
}
