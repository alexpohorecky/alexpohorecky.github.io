let backgroundGraphic;
let cannon;
function preload(){
  backgroundGraphic = loadImage('peggleBaseScreen.png');
  cannon = loadImage('peggleCannon.png');

}

function setup(){
  createCanvas(windowWidth, windowHeight);
  document.documentElement.style.overflow = 'hidden';

  image(backgroundGraphic,0,0, width, height);


}

function draw(){
  translate(width/2, 0);
  fill("green");
  strokeWeight(5);
  rectMode(CENTER);
  rect(0,0,20,60);
}
