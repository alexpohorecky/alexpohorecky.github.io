let ball;
let ball1;

function setup() {
  createCanvas(windowWidth, windowHeight);
  ball = new Ball(100, 100, 20, 0, 0, 0, 0.98);
  //ball1 = new Ball(200, 100, 20, 10, 0, -1, 0);

}

function draw() {
  background(255);
  ball.move();
  //ball1.move();
  ball.animate();
  //ball1.animate();
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

    if (this.pos.x >= width || this.pos.x <= 0) {
      this.vel.x *= -1;

      //this.accel.x *= 0.1;
    }
    if (this.pos.y >= height || this.pos.y <= 0) {
      this.vel.y *= -1
      print(this.vel.y);

      //this.accel.y *= 0.1;
    }
    this.pos.add(this.vel);
    this.vel.add(this.accel);
  }
  animate() {
    ellipse(this.pos.x, this.pos.y, this.r);
  }
}
