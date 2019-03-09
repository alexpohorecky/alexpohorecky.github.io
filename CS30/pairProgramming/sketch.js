/*
Peggle...not really anymore. Just kinda a demo.
By Alex Pohorecky & Jay Parikh

Jay did all the graphics. Alex did most of the physical coding but Jay contributed a lot of ideas and
provided a second opinion on how to solve problems.

Couldn't get the bouncing working in the end, so there isn't much of a game.

Sorry it's so late.
*/

let backgroundGraphic;
let cannon;
let mouseXPos;
let balls = [];
let ballLaunchPos;
let interupt = false;


let pegs = [];

function preload() {
  backgroundGraphic = loadImage('peggleBaseScreen.png');
  cannon = loadImage('peggleCannon.png');

}

function setup() {
  createCanvas(windowWidth, windowHeight);
  document.documentElement.style.overflow = 'hidden';
  document.body.style.cursor = 'none';
  createPegGrid();
}

function draw() {
  if (pegs.length === 0){
    createPegGrid();
    balls = [];
  }
  translate(width / 2, 0);
  imageMode(CORNER);
  image(backgroundGraphic, -width / 2, 0, width, height);

  for (let peg of pegs) {
    peg.show();
    if (peg.hit) {
      pegs.splice(pegs.indexOf(peg), 1);
    }
  }

  strokeWeight(5);

  ballLaunchPos = createVector(0, height / 15);
  angleMode(DEGREES);
  push();
  rotate(map(constrain(mouseX, width / 16, width / 3), width / 3, width / 16, -90, 90));
  ballLaunchPos.rotate(map(constrain(mouseX, width / 16, width / 3), width / 3, width / 16, -90, 90));
  imageMode(CENTER);
  image(cannon, 0, height / 56, height / 6, height / 10);
  pop();
  for (let ball of balls) {
    ball.move();
    if (ball.pos.y > windowHeight){
      balls.splice(balls.indexOf(ball),1);
    }
    ball.animate();
    ball.checkPegCollision(pegs);
    if (ball.collided) {
      balls.splice(balls.indexOf(ball), 1);
    }

  }
}

function createPegGrid(){
  for (let x = -width/4; x <= width/4; x += 2*height/50){
    for (let y = height/2; y <= height*3/4; y+= 2*height/50){
      pegs.push(new Peg(x, y, height / 50));
    }
  }
}

function mouseClicked() {
  balls.push(new Ball(ballLaunchPos.x, ballLaunchPos.y, height / 50, 0, 8, 0, 0, 0, 0, 0));
  console.log(mouseX);
}

function keyPressed() {
  if (keyCode === 32) {
    interupt = !interupt;
  }
}
