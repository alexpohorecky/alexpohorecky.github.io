function setup(){
  createCanvas(windowWidth, windowHeight);
}

function draw(){
  Ball(100, 100, 20);
}

function Ball(x, y, r){
  this.pos = createVector(x,y);
  this.vel = createVector(1,0);
  this.acc = createVector(1,0);
  this.pos.add(this.vel);
  this.vel.add(this.acc);
  ellipse(x, y, r);

}
