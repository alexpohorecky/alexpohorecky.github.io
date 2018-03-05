let pointSpacing;
function setup(){
  createCanvas(windowWidth, windowHeight);
  pointSpacing = 50;
  noCursor();
}

function draw(){
  background(0);
  for (let i = pointSpacing; i < width; i+= pointSpacing){
    for (let j = pointSpacing; j < height; j += pointSpacing){
      stroke(255, 20);
      //fill(255);
      //ellipse(i,j,3);
      line(mouseX, mouseY, i, j);
    }
  }
}
