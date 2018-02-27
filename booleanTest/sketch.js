
let x;
let y;
function setup(){
  createCanvas(windowWidth, windowHeight);
}

function draw(){
  x = random(width);
  y = random(height);


  if (keyIsDown(84) && mouseIsPressed){
    triangle(x,y,x+20,y,x+10,y+20);
  }
  if (keyIsDown(88) || keyIsDown(90)){
    ellipse(x,y,20,40);
  }


}
