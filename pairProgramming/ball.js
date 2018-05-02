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
    this.accel = createVector(xAcceleration, yAcceleration);
    //this.vel.rotate(map(constrain(mouseX,width/16,width/3), width/3, width/16, -90, 90));
  }
  move() {
    // Velocity affects position
    this.pos.add(this.vel);
    // Acceleration affects velocity
    this.vel.add(this.accel);
  }
  bounce(collidedPeg){
    this.normalVector = createVector(this.x - collidedPeg.x, this.y - collidedPeg.y);
    this.unitNormalVector = this.normalVector.normalize();
    this.unitTangentVector = createVector(-1*this.unitNormalVector.y, -1*this.unitNormalVector.x);
    this.normalVelocityScalar = dot(this.velocity, this.unitNormalVector);
    this.tangentVelocityScalar = dot(this.velocity, this.unitTangentVector);
    this.normalVelocityScalar.mult(0);
    this.normalVelocityScalarVector = this.normalVelocityScalar.mult(this.unitNormalVector);
    this.tangentVelocityScalarVector = this.tangentVelocityScalar.mult(this.unitTangentVector);

    this.velocity = this.normalVelocityScalarVector.add(this.tangentVelocityScalarVector);
    collidedPeg.hit = true;

  }
  checkPegCollision(pegArray){
    for (let peg of pegArray){
      if (dist(this.x, this.y, peg.x, peg.y-height/2) < (this.r + peg.r)){
        // bounce(peg);
        peg.hit = true;
      }
    }
  }

  animate() {
    fill(this.clrR, this.clrG, this.clrB);
    ellipse(this.pos.x, this.pos.y, this.r);
  }
}
