let dropSpeed;
let level;
let grid;
let pieceSize = 25;
function setup(){
  createCanvas(windowWidth, windowHeight);
  grid = new Grid(10, 20);
  grid.drawGrid();

}

function draw(){

}

function create2DArray(arrayWidth, arrayHeight){
  let array2D = new Array(arrayWidth);
  for (let i = 0; i < array2D.length; i++){
    array2D[i] = new Array(arrayHeight);
  }
  return array2D;
}

function drawGrid(){

}

class Grid {
  constructor(_w, _h){
    this.w = _w;
    this.h = _h;
    this.cellSize = pieceSize;
    this.gridArray = create2DArray(this.w, this.h);

  }
  drawGrid(){
    for (let i = 0; i < this.w; i++){
      for (let j = 0; j < this.h; j++){
        rect(i * this.cellSize, j * this.cellSize, this.cellSize, this.cellSize);
      }
    }
  }

}
class Monimo {
  constructor(startingX, startingY){
    this.x = startingX;
    this.y = startingY;

  }
  dropDown(){
    this.y++;
  }

}
