class Ship{
  constructor(size){
    // this.lives = _lives;
    // this.shots = _shots;
    this.pos = createVector(100, 100);
    this.velocity = createVector(0, 0);
    this.acceleration = createVector(1, 0);
    this.rotation = 0;
    this.rotationalVelocity = 0;
    this.rotationalAcceleration = 0;

    }
  move(){
    this.pos.add(this.velocity);
    this.velocity.add(this.acceleration);
    this.acceleration.rotate(-2*PI/180);
  }

  animate(){
    fill(0);
    rectMode(CENTER);
    push();
    translate(width/2, height/2);
    rotate(-2*PI/180)
    rect(this.pos.x, this.pos.y, 10, 40);
    pop();
  }

  shoot(){}

  die(){}
}
