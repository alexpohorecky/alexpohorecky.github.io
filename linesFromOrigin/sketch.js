let pointSpacing;
function setup(){
  createCanvas(800, 800);
  pointSpacing = 50;
}

function draw(){
  background(0);
  for (let i = pointSpacing; i < width; i+= pointSpacing){
    for (let j = pointSpacing; j < height; j += pointSpacing){
      stroke(255);
      point(i,j);
      line(width/2, height/2, i, j);
    }
  }
}
