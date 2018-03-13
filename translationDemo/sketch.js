function setup(){
  if (windowHeight < windowWidth){
    createCanvas(windowHeight, windowHeight);
  }
  else{
    createCanvas(windowWidth,windowWidth);
  }
}

function draw(){
  background(255);
  translate(width/2,height/2);
  angleMode(DEGREES);
  ellipse(0,0,width);
  for (let i = 0; i < 360; i++){
    if (i % 5 === 0){
      rotate(i);
      rectMode(CENTER)
      rect(0, 0, 5, 20);
    }
  }
}
