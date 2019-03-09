let sqrSize;
let black = false;

function setup(){
  if (windowWidth < windowHeight){
  createCanvas(windowWidth, windowWidth);
}
else{
  createCanvas(windowHeight,windowHeight);
}
  sqrSize = width / 8;

}

function draw(){
  background(255);
  drawBoard();
}

function drawBoard(){
  for (let i = 0; i < width; i+= sqrSize){
    for (let j = 0; j < height; j += sqrSize){
      fill(int(black)*255);
      rect(i,j,sqrSize,sqrSize);
      black = !black
    }
    black = !black
  }
}
