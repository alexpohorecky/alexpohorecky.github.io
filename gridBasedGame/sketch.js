let startPosition = {
  x: 4,
  y: 0,
}
let player = {
  x: startPosition.x,
  y: startPosition.y,
  value: 1,

}

let arena;
let arenaWidth = 10;
let arenaHeight = 10;

let monimoSize = 25;

let hangTime = 500;
let time = 0;
let deltaTime;


function setup(){
  createCanvas(arenaWidth * monimoSize, arenaHeight * monimoSize);

  arena = create2DArray(arenaWidth, arenaHeight);
  spawnPlayer();

}

function draw(){
  showArena();
  showPlayer();
  deltaTime = millis();
  if (deltaTime - time >= hangTime){
    dropPlayer();
    time = deltaTime;
  }

}

function keyPressed(){
  if (keyCode === 37){
    player.x--;
    if (player.x < 0){
      player.x = 0;
    }
    if (arena[player.x][player.y] > 0){
      player.x++;
    }

  }
  if (keyCode === 39){
    player.x++;
    if (player.x >= arenaWidth){
      player.x = arenaWidth - 1;
    }
    if (arena[player.x][player.y] > 0){
      player.x--;
    }
  }
  if (keyCode === 40){
    dropPlayer();
  }
}

function create2DArray(gridWidth, gridHeight){
  let grid = Array(gridWidth);
  for (let i = 0; i < gridWidth; i++){
    grid[i] = Array(gridHeight);
    grid[i].fill(0);
  }

  return grid;
}

function spawnPlayer(){
  player.x = startPosition.x;
  player.y = startPosition.y;
  player.value = ceil(random(0,7));
}

function showPlayer(){
  fillMonimo(player.value);
  rect(player.x * monimoSize, player.y * monimoSize, monimoSize, monimoSize);
}

function dropPlayer(){
  player.y++;
  if (player.y === arenaHeight){
    placePiece(arena, player);
    spawnPlayer();
    hangTime *= 0.99;
  }
  if (arena[player.x][player.y] > 0){
      placePiece(arena, player);
      spawnPlayer();
      hangTime *= 0.99;
  }
  checkArena();
}

function placePiece(arena, player){
  arena[player.x][player.y-1] = player.value;
}

function showArena(){
  for (let i = 0; i < arenaWidth; i++){
    for (let j = 0; j < arenaHeight; j++){
      fillMonimo(arena[i][j]);
      rect(i * monimoSize, j * monimoSize, monimoSize, monimoSize);
    }
  }
}

// function checkArena(){
//   for (let i = 0; i < arenaWidth; i++){
//     for (let j = 0; j < arenaHeight; j++){
//       let pieceValue = arena[i][j];
//       let pieceStack =[[i,j]];
//       let lastPiece = pieceStack[pieceStack.length - 1];
//       for(let x = -1; x <= 1; x++){
//         let currentPieceCoord = [i+x, j];
//         if (!existInArray(currentPieceCoord, pieceStack) && arena[i+x,j] === pieceValue){
//           pieceStack.push(currentPieceCoord);
//         }
//       }
//       for(let y = -1; y <= 1; y++){
//         let currentPieceCoord = [i, j + y];
//         if (!existInArray(currentPieceCoord, pieceStack) && arena[i,j+y] === pieceValue){
//           pieceStack.push(currentPieceCoord);
//         }
//       }
//       if (pieceStack.length >= 4){
//         for(let coord of pieceStack){
//           arena[coord[0]].splice(coord[1], 1);
//           arena[coord[0]].unshift(0);
//         }
//       }
//     }
//   }
// }

function checkArena(){
  for (let i = 0; i < arenaWidth; i++){
    for (let j = 0; j < arenaHeight; j++){
      checkNeighbours(i, j, arena[i][j]);

    }
  }
}

function checkNeighbours(currentX, currentY, currentValue){
  let neighbourCoords = []
  for (let x = -1; x <= 1; x++){
    currentNeighbourCoord = [currentX + x,currentY];
    if ( currentNeighbourCoord === currentValue){
      if (!existInArray(currentNeighbourCoord, neighbours)){
        neighbourCoords.push(currentNeighbourCoord);
      }
    }
  }
  for (let y = -1; y <= 1; y++){
    currentNeighbourCoord = [currentX,currentY + y];
    if ( currentNeighbourCoord === currentValue){
      if (!existInArray(currentNeighbourCoord, neighbours)){
        neighbourCoords.push(currentNeighbourCoord);
      }
    }
  }
  for (let coord of neighbourCoords){
    removeCoords(coord);
  }
}

function removeCoords(coord){
  arena[coord[0]].splice(coord[1], 1);
  arena[coord[0]].unshift(0);
}

function existInArray(item, array){
  for(let i = 0; i < array.length; i++){
    if (array[i] === item){
      return true;
    }
  }
  return false;
}


function fillMonimo(value){
  colorChoice = [200, "Red", "Green", "Blue", "Yellow", "Orange", "Purple", "Pink"];
  fill(colorChoice[value]);
}
