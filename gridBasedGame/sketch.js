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
let arenaHeight = 20;

let monimoSize = 25;

let hangTime = 1000;
let time = 0;
let deltaTime;


function setup(){
  createCanvas(arenaWidth * monimoSize, arenaHeight * monimoSize);

  arena = create2DArray(arenaWidth, arenaHeight);
  spawnPlayer();

}

function draw(){
  background(200);
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

  }
  if (keyCode === 39){
    player.x++;
    if (player.x >= arenaWidth){
      player.x = arenaWidth - 1;
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
}

function showPlayer(){
  fill(0);
  rect(player.x * monimoSize, player.y * monimoSize, monimoSize, monimoSize);
}

function dropPlayer(){
  player.y++;
  if (player.y === arenaHeight){
    placePiece(arena, player);
  }
}

function placePiece(arena, player){
  arena[player.x][player.y] = player.value;
}

function showArena(){
  for (let i = 0; i < arenaWidth; i++){
    for (let j = 0; j < arenaHeight; j++){
      if (arena[i][j] === 1){
        fill(0);
        rect(i * monimoSize, j * monimoSize, monimoSize, monimoSize);
      }
    }
  }
}
