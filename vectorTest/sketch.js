
function setup() {
  createCanvas(windowWidth, windowHeight);

}

function draw() {
  //background(255);
  ball = new Ball(100, 100, 20);
  ball.move();
//  ball.render();
}

function Ball(x, y, r) {
  this.pos = createVector(x, y);
  this.vel = createVector(5, 5);
  this.acc = createVector(5, 5);
  this.move = function(){
    this.pos.add(this.vel);
    this.vel.add(this.acc);
    ellipse(this.pos.x, this.pos.y, r);
  }
  // this.render = function(){
  //   ellipse(this.pos.x, this.pos.y, r);
  // }
}
