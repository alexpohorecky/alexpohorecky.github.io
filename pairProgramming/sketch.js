let backgroundGraphic;
let cannon;
let mouseXPos;
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
  translate(width/2, 0);
  fill("green");
  strokeWeight(5);
  angleMode(DEGREES);
  rotate(map(constrain(mouseX,104,590), 590, 104, -90, 90));
  imageMode(CENTER);
  image(cannon,0,0,80,50);

  // rectMode(CENTER);
  // rect(0,0,20,60);
}

function mouseClicked(){
  mouseXPos = mouseX;
}
