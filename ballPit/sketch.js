

let balls = [];
let elasticity = 3;
let friction = 0.01;
let horizontalVelocity = 0;
let verticalVelocity = 0;
let gravity = 0.98;
let menuState = true;

function setup() {

  createCanvas(windowWidth, windowHeight);
}

function draw() {
  if (menuState){
    menu();
    if ( mouseX > width/3  && mouseX < 2*width/3 &&  mouseY > height/3 && mouseY < 2*height/3 && mouseIsPressed){
      menuState = false;
    }
  }
  else{
  background(200);
  fill(0)


  // For every ball in the list balls...
  for (let ball of balls) {
    ball.move();
    ball.animate();
  }
  if (keyIsPressed && keyCode === 27){
    menuState = true;
  }

}
}

function mouseClicked() {
  if (!menuState){
    // Every time the mouse is clicked, create a new ball and append it to the list balls
    balls.push(new Ball(mouseX, mouseY, 20, horizontalVelocity, verticalVelocity, 0, gravity, random(255), random(255), random(255)));
  }
}

function keyPressed(){
  // If the Spacebar is pressed...
  if (keyCode === 32){
    // Clear all balls
    balls = [];
  }
  // If the left arrow key is pressed...
  if (keyCode === LEFT_ARROW){
    // Increase horizontal velocity left
    horizontalVelocity -= 1;
  }
  // If the right arrow key is pressed...
  if (keyCode === RIGHT_ARROW){
    // Increase horizontal velocity right
    horizontalVelocity += 1;
  }
  // If the up arrow key is pressed...
  if (keyCode === UP_ARROW){
    // Increase vertical velocity up
    verticalVelocity -= 1;
  }
  // If the down arrow key is pressed...
  if (keyCode === DOWN_ARROW){
    // Increase vertical velocity down
    verticalVelocity += 1;
  }
   // If the r key is pressed...
  if (keyCode === 82){
    // Reset all modifiers to their default values
    verticalVelocity = 0;
    horizontalVelocity = 0;
  }
}
