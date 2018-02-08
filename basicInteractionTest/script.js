let pressedKey;
function setup(){
  createCanvas(windowWidth, windowHeight);
}

function draw(){

}

function keyPressed(){
  noStroke();
  fill(random(255), random(255), random(255), random(255));
  ellipse(random(0, width), random(0, height), random(100), random(100));
}

function mousePressed(){
  noStroke();
  fill(random(255), random(255), random(255), random(255));
  rect(mouseX, mouseY, random(100), random(100));
}

function deviceShaken(){
  fill(0,0,0);
  textFont("Times New Roman");
  textAlign(CENTER);
  text("OOF", random(width), random(height));
}
