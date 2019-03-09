function setup(){
  createCanvas(windowWidth, windowHeight);
  noStroke();

}

function draw(){

  if (mouseX < width/2){
    fill(random(255));
    rect(random(0, width/2), random(height), random(50, 200), random(50, 200));
  }
  else {
    fill(random(255), random(255), random(255));
    ellipse(random(width/2, width), random(height), random(50,200));
  }
}

function mousePressed(){
  background(255);
}
