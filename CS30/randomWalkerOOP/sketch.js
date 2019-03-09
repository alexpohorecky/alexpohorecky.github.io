
let walkers = [];
function setup(){
  createCanvas(windowWidth, windowHeight);


}

function draw(){
  for (let walker of walkers){
    walker.move();
    walker.drawWalker();
  }
}

function mouseClicked(){
  walkers.push(new Walker(mouseX, mouseY, [random(255),random(255),random(255)]));
}
function keyPressed(){
  if (keyCode === 32){
    walkers.shift();
  }
}
class Walker{
  constructor(initX,initY,rgb = [0,0,0]){
    this.x = initX;
    this.y = initY;
    this.r = 1;
    this.stepSize = 1;
    this.direction;
    this.color = rgb;
  }
  move(){
    this.direction = floor(random(0,4));
    if (this.direction === 0){
      this.x -= 1;
    }
    if (this.direction === 1){
      this.x += 1;
    }
    if (this.direction === 2){
      this.y -= 1;
    }
    if (this.direction === 3){
      this.y += 1;
    }
  }
  drawWalker(){
    noStroke();
    fill(this.color[0],this.color[1],this.color[2])
    ellipse(this.x, this.y, this.r);
  }
}
