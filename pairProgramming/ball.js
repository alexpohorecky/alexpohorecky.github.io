class Ball {
  constructor(_x, _y, _r, xVelocity, yVelocity, xAcceleration, yAcceleration, _clrR, _clrG, _clrB) {
    this.x = _x;
    this.y = _y;
    this.r = _r;
    this.clrR = _clrR;
    this.clrG = _clrG;
    this.clrB = _clrB;

    this.pos = createVector(this.x, this.y);
    this.vel = createVector(xVelocity, yVelocity);
    this.unitNormalVel;
    this.unitTangentVel;
    this.accel = createVector(xAcceleration, yAcceleration);
  }
  move() {
    // If a ball hits the wall...
    if (this.pos.x > width - this.r || this.pos.x < 0 + this.r) {
      // Ball bounces
      this.vel.x *= -1;

    }
    // If a ball hits the floor or ceiling...
    if (this.pos.y > height - this.r || this.pos.y < 0 + this.r) {
      // Lose vertical speed due to not perfectly ellastic collision
      if (this.vel.y < 0) {
        this.vel.y += elasticity * this.accel.y;
      }
      else {
        this.vel.y -= elasticity * this.accel.y;
      }
      // Lose horizontal speed due to friction
      if (this.vel.x < 0) {
        this.vel.x += -1 * friction * this.vel.x;
      }
      else {
        this.vel.x -= friction * this.vel.x;
      }
      // Ball bounces
      this.vel.y *= -1
    }
    // Ball bounces on its edge
    if (this.pos.x < 0 + this.r) {
      this.pos.x = 0 + this.r;
    }
    if (this.pos.x > width - this.r) {
      this.pos.x = width - this.r;
    }
    if (this.pos.y < 0 + this.r) {
      this.pos.y = 0 + this.r;
    }
    if (this.pos.y > height - this.r) {
      this.pos.y = height - this.r;
    }
    // Velocity affects position
    this.pos.add(this.vel);
    // Acceleration affects velocity
    this.vel.add(this.accel);

    this.unitNormalVel = 
  }
  animate() {
    fill(this.clrR, this.clrG, this.clrB);
    ellipse(this.pos.x, this.pos.y, this.r);
  }
}
