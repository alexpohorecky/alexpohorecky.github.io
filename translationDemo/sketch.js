let clockSize;
function setup(){
  createCanvas(windowWidth, windowHeight);
  if (windowHeight < windowWidth){
    clockSize = windowHeight * 0.9;
  }
  else{
    clockSize = windowWidth * 0.9;
  }
}

function draw(){
  background(255);
  push();
  translate(width/2,height/2);
  angleMode(DEGREES);
  strokeWeight(8);
  fill(255);
  ellipse(0,0,clockSize);
  fill(0);
  ellipse(0,0,4);

  for (let i = 0; i < 12; i++){
  rotate(360/12);
  fill(0);
  strokeWeight(10);
  strokeCap(SQUARE);
  line(0, clockSize/2 * 0.95, 0, clockSize/2 * 0.75)
  }

  for (let i = 0; i < 60; i++){
  rotate(360/60);
  fill(0);
  strokeWeight(4);
  strokeCap(SQUARE);
  line(0, clockSize/2 * 0.95, 0, clockSize/2 * 0.8)
  }
  pop();
}
