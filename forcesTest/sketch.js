let ball;
let gravity
function setup(){
  createCanvas(windowWidth, windowHeight);
  ball = new Ball(1,1,width/2,height/2);
  gravity = createVector(0, 0.98);
}

function draw(){
  background(255)


  ball.move();
  ball.animate();
}
function mouseClicked(){
  ball.applyForce(gravity);

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


  }
  move(){
    this.acceleration.add(this.netForce/this.mass);
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    this.netForce.mult(0);
  }
  animate(){

    ellipse(this.position.x, this.position.y, 20);
  }
}
