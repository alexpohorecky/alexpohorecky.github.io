/*
Alex Pohorecky
Game of Life
March 19, 2018

Based on John Horton Conway's Game of Life (1970)

Basic Rules:

    1. Any live cell with less than two live neighbours dies on the next generation.
    2. Any live cell with two or three live neighbours lives on the next generation.
    3. Any live cell with greater than three live neighbours dies on the next generation.
    4. Any dead cell with exactly three neighbours becomes live on the next generation.

All of the rules work except for rule 4, which for some reason (I haven't been able 
to figure out why) doesn't grow a new cell with 3 neighbours, but still grows cells.

*/

let stopped = false;

let currentGeneration;
let nextGeneration;


let worldColumns = 60;
let worldRows = 50;
let resolution = 15;

function setup() {
  createCanvas(windowWidth, windowHeight);
  document.body.style.overflow = 'hidden';
  currentGeneration = create2DArray(worldColumns, worldRows);
  nextGeneration = create2DArray(worldColumns, worldRows);
  for (let i = 0; i < worldColumns; i++) {
    for (let j = 0; j < worldRows; j++) {
      currentGeneration[i][j] = floor(random(2));
    }
  }
  console.table(currentGeneration);
  stopped = true;
}

function draw() {

  animateCells(currentGeneration, worldColumns, worldRows, resolution);
  //computeCells(currentGeneration, nextGeneration, worldColumns, worldRows);
  for (let x = 0; x < worldColumns; x++){
    for (let y = 0; y < worldRows; y++){
      let state = currentGeneration[x][y];
      let currentCellNeighbours = countNeighbours(currentGeneration, x, y);
        if (state === 1) {
          if (currentCellNeighbours > 3 || currentCellNeighbours < 2) {
            nextGeneration[x][y] = 0;
          } else {
            nextGeneration[x][y] = 1;
          }
        } else if (state === 0){
          if (currentCellNeighbours === 3) {
            nextGeneration[x][y] = 1;
          } else {
            nextGeneration[x][y] = 0;
          }
        }

      }
    }
    currentGeneration = nextGeneration;

  }

function create2DArray(arrayWidth, arrayHeight) {
  empty2DArray = new Array(arrayWidth);
  for (let i = 0; i < arrayWidth; i++) {
    empty2DArray[i] = new Array(arrayHeight);
  }
  return empty2DArray;
}

function countNeighbours(grid, cellX, cellY){
  let neighbours = 0;
  for (let i = -1; i < 2; i++) {
    for (let j = -1; j < 2; j++) {
      if (grid[cellX + i] != undefined && grid[cellX + i][cellY + j] != undefined) {
        neighbours += grid[cellX + i][cellY + j];
      }
    }
  }
  return neighbours - 1;
}

function animateCells(seeded2DArray, numOfColumns, numOfRows, cellSize){
  for (let x = 0; x < numOfColumns; x++) {
    for (let y = 0; y < numOfRows; y++) {
      if (seeded2DArray[x][y] === 0) {
        fill(255);
      } else if (seeded2DArray[x][y] === 1) {
        fill("green");
      }
      rect(x * cellSize, y * cellSize, cellSize, cellSize);
    }
  }
}
function computeCells(seeded2DArray, nextGenArray, numOfColumns, numOfRows){
  for (let x = 0; x < numOfColumns; x++){
    for (let y = 0; y < worldRows; y++){
        let currentCellNeighbours = countNeighbours(seeded2DArray, x, y);
        if (seeded2DArray[x][y] === 1) {
          if (currentCellNeighbours > 3 || currentCellNeighbours < 2) {
            nextGenArray[x][y] = 0;
          } else {
            nextGenArray[x][y] = 1;
          }
        } else {
          if (currentCellNeighbours === 3) {
            nextGenArray[x][y] = 1;
          } else {
            nextGenArray[x][y] = 0;
          }
        }

      }
    }
    seeded2DArray = nextGenArray;
}
