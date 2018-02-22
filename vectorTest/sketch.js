// Alex Pohorecky
// Monday, February 26, 2018
// Computer Science 30, Period 5
// Bouncing Balls Simulator
// Extra For Experts:
// I used a random function to generate randomly colored balls.
// I used the class-type to create the ball object, which wasn't taught in class.

let balls = [];
let energyLostOnBounce = 5;
let friction = 0.01;
let horizontalVelocity = 0;
let verticalVelocity = 0;
let ballRadius = 20;
let gravity = 0.98;

function setup() {

  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(200);
  fill(0)
  text("Horizontal Velocity: " + horizontalVelocity, 5, 10);
  text("Vertical Velocity: " + -1 * verticalVelocity, 5, 25);
  text("Ball Radius: " + ballRadius, 5, 40);
  for (let ball of balls) {
    ball.move();
    ball.animate();
  }
}

function mouseClicked() {
  balls.push(new Ball(mouseX, mouseY, ballRadius, horizontalVelocity, verticalVelocity, 0, gravity, random(255), random(255), random(255)));
}
function mouseWheel(event){
  ballRadius -= event.delta;
  return false;
}
function keyPressed(){
  if (keyCode === 32){ // If the Spacebar is pressed
    balls = [];
  }
  if (keyCode === LEFT_ARROW){
    horizontalVelocity -= 1;
  }
  if (keyCode === RIGHT_ARROW){
    horizontalVelocity += 1;
  }
  if (keyCode === UP_ARROW){
    verticalVelocity -= 1;
  }
  if (keyCode === DOWN_ARROW){
    verticalVelocity += 1;
  }
}
