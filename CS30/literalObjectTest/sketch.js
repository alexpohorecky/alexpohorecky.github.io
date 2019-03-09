let ball = {
  x: 200,
  y: 300,
  r: 20,
};

function setup(){
  createCanvas(windowWidth, windowHeight);
}

function draw(){
  background(255);
  fill(0);
  ball.x = mouseX;
  ball.y = mouseY;
  ellipse(ball.x, ball.y, ball.r);
}
