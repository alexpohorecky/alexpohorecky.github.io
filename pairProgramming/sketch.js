let backgroundGraphic;
let cannon;
let mouseXPos;
let balls = [];
let ballLaunchPos;
let interupt = false;


let pegs = [];
function preload(){
  backgroundGraphic = loadImage('peggleBaseScreen.png');
  cannon = loadImage('peggleCannon.png');

}

function setup(){
  createCanvas(windowWidth, windowHeight);
  document.documentElement.style.overflow = 'hidden';
  document.body.style.cursor = 'none';

  pegs.push(new Peg(0,height/2 , height/50));

}

function draw(){
  translate(width/2, 0);
  imageMode(CORNER);
  image(backgroundGraphic,-width/2,0, width, height);

  for (let peg of pegs){
      peg.show();
      if (peg.hit){
        pegs.splice(pegs.indexOf(peg), 1);
      }
  }

  strokeWeight(5);


  ballLaunchPos = createVector(0,height/15);
  angleMode(DEGREES);
  push();
  rotate(map(constrain(mouseX,width/16,width/3), width/3, width/16, -90, 90));
  ballLaunchPos.rotate(map(constrain(mouseX,width/16,width/3), width/3, width/16, -90, 90));
  imageMode(CENTER);
  image(cannon,0,height/56,height/6,height/10);
  pop();
  for (let ball of balls){

    if (!interupt){
    ball.move();
    }
    ball.animate();
    ball.checkPegCollision(pegs);
    if (ball.collided){
      balls.splice(balls.indexOf(ball),1);
    }

  }
}


function mouseClicked(){
    balls.push(new Ball(ballLaunchPos.x,ballLaunchPos.y,height/50,0,8,0,0,0,0,0));
    console.log(mouseX);
}
function keyPressed(){
  if (keyCode === 32){
    interupt = !interupt;
  }
}
