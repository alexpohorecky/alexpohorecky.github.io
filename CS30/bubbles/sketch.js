let theBalls = [];

function setup(){
  createCanvas(windowWidth, windowHeight);
}

function draw(){
  background(200);
  moveBalls();
  displayBalls();
}

function moveBalls(){
  for (let ball of theBalls){
    ball.x += ball.dx;
    ball.y += ball.dy;
    if (ball.x > width || ball.x < 0){
      ball.dx *= -1;
    }
    if (ball.y > height || ball.y < 0){
      ball.dy *= -1;
    }
  }
}

function displayBalls(){
  for (let ball of theBalls){
    fill(ball.color);
    noStroke();
    ellipse(ball.x, ball.y, ball.ballSize);
  }
}

function mousePressed(){
  let aBall = {
    x: mouseX,
    y: mouseY,
    ballSize: random(5,50),
    color: color(random(255),random(255),random(255),random(255)),
    dx: random(-5,5),
    dy: random(-5,5),
  }
  while(mouseIsPressed){
    theBalls.push(aBall);
  }
}
