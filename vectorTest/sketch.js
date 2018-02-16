let balls = [];
ballExists = false;
function setup() {
  // document.body.style.overflow = 'visible';
  createCanvas(windowWidth, windowHeight);
  //ball = new Ball(100, 500, 20, 10, 0, 0, 1);
  //ball1 = new Ball(200, 100, 20, 10, 0, -1, 0);

}

function draw() {
  background(255);
  for (let ball of balls){
  //if (ballExists){
  ball.move();
  //print(ball.vel.y)
  //ball1.move();
  ball.animate();
  //ball1.animate();
}
}
function mouseClicked(){
  //ballExists = true;
  //ball = new Ball(mouseX, mouseY, 20, 10, 0, 0, 1);
  balls.push(new Ball(mouseX, mouseY, 20, 10, 0, 0, 1));
}
class Ball {
  constructor(_x, _y, _r, xVelocity, yVelocity, xAcceleration, yAcceleration) {
    this.x = _x;
    this.y = _y;
    this.r = _r;

    this.pos = createVector(this.x, this.y);
    this.vel = createVector(xVelocity, yVelocity);
    this.accel = createVector(xAcceleration, yAcceleration);
  }
  move() {

    if (this.pos.x > width - this.r || this.pos.x < 0 + this.r) {

      if (this.vel.x < 0){
        //this.vel.x += 5 * this.vel.x;
      }
      else{
        //this.vel.x -= 5 * this.vel.x;
      }
      this.vel.x *= -1;

      //this.accel.x *= 0.1;
    }
    if (this.pos.y > height - this.r || this.pos.y < 0 + this.r) {
      if (this.vel.y < 0){
        this.vel.y += 5 * this.accel.y;
      }
      else{
        this.vel.y -= 5 * this.accel.y;
      }
      this.vel.y *= -1

      //this.accel.y *= 0.1;
    }
    if (this.pos.x < 0 + this.r){
      this.pos.x = 0 + this.r;
    }
    if (this.pos.x > width - this.r){
      this.pos.x = width - this.r;
    }
    if (this.pos.y < 0 + this.r){
      this.pos.y = 0 + this.r;
    }
    if (this.pos.y > height - this.r){
      this.pos.y = height - this.r;
    }
    this.pos.add(this.vel);
    this.vel.add(this.accel);
  }
  animate() {
    ellipse(this.pos.x, this.pos.y, this.r);
  }
}
