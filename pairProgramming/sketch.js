let ball;
function setup(){
  createCanvas(100, 100)
  ball = new Ball(width/2, height/2, 20, 0, 0, 0, 1, 0, 0, 0);
}
function draw(){
  background(255);
  ball.move();
  ball.animate();
}
