let heights = [];
let numOfRects;
function setup(){
  createCanvas(windowWidth, windowHeight);
  numOfRects = width;
  generateInitialTerrain(numOfRects);
  document.body.style.overflow = 'hidden';

}

function draw(){
  background(255);
  displayTerrain();
  checkMaxHeight(heights);

}

function generateInitialTerrain(rectangles){
  let t = 0;
  let dt = 0.01;

  for (let i = 0; i < rectangles; i++){
    let currentHeight = noise(t)*500;
    heights.push(currentHeight);
    t += dt;
  }
}

function displayTerrain(){
  fill(0);
  stroke(0);
  for (let i = 0; i < numOfRects; i++){
    rect(i, height, 1,-1 * heights[i]);
  }
}
function checkMaxHeight(arr){
  let maxHeight = 0;
  let xPos;
  for (let i = 0; i < arr.length; i++){
    if (heights[i] > maxHeight){
      maxHeight = heights[i];
      xPos = i;
    }
  }
  stroke("red");
  line(0, height - maxHeight, width, height - maxHeight);
  line(xPos, height, xPos, 0);
}
