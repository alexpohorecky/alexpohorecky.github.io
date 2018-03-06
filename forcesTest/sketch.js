let ball;
function setup(){
  createCanvas(windowWidth, windowHeight);
  ball = new Ball;
}

function draw(){
  ball.move();
  ball.show();
}

class Ball{
  constructor(_mass, _density, _x, _y){
    this.mass = _mass;
    this.density = _density;
    this.radius = sqrt(this.mass / (this.density * PI));
    this.xPos = _x;
    this.yPos = _y;
    this.position = createVector(this.xPos, this.yPos);
    this.velocity = createVector(0,0);
    this.acceleration = createVector(0,0);
    this.netForce = createVector(0,0);
  }
  this.applyForce = function(force){
    this.netForce.add(force);


  }
  this.move = function(){
    this.acceleration.add(this.netForce);
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    this.netForce.mult(0);
  }
  this.show = function(){
    ellipse(this.position.x, this.position.y, this.radius);
  }
}
