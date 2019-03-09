let ball;
let gravity;
let drag;
function setup(){
  createCanvas(windowWidth, windowHeight);
  ball = new Ball(5,1,width/2,height/2);
  gravity = createVector(0, (ball.mass * (6.67408e-11) * (5.972e24))/sq(((height - ball.position.y) +6.371e6)));
  drag = createVector(dragC * fluidDensity * )
}

function draw(){
  background(255)
  ball.applyForce(gravity);
  ball.move();
  ball.animate();
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
  applyForce(force){
    this.netForce.add(force);
    this.netForce.div(this.mass);


  }
  move(){
    this.acceleration.add(this.netForce);
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    this.netForce.mult(0);
  }
  animate(){

    ellipse(this.position.x, this.position.y, 20);
  }
}
