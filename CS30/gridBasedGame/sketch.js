/*
Alex Pohorecky
April 17, 2018

Connect Fourtris

The goal of the game is to create stacks of 4 blocks of the same color.
Use the left and right arrow keys to move the falling block left and right respectively.
Use the down arrow key to skip down a row.
When you stack 4 identical blocks successfully, they disappear and drop down every other block in the column.
Each time a stack is cleared, you gain 1 point and the speed at which the blocks fall increases.
Once the blocks reach the top of the arena, the arena clears, the speed resets, and your points are set to 0.

Sorry for the checkArena function being so bad. I had a lot of trouble with it, and when I found something that worked I kinda just stuck with it.

*/
let startPosition = {
  x: 2,
  y: 0,
}
let player = {
  x: startPosition.x,
  y: startPosition.y,
  value: 1,

}

let arena;
let arenaWidth = 5;
let arenaHeight = 20;

let monimoSize = 25;

let hangTime = 500;
let score = 0;
let highScore = 0;

let time = 0;
let deltaTime;


function setup(){
  createCanvas(displayWidth, displayHeight);
  document.documentElement.style.overflow = 'hidden';

  arena = create2DArray(arenaWidth, arenaHeight);
  spawnPlayer();

}

function draw(){
  background(255)
  fill(0);
  text("High Score: " + highScore, 150, 10);
  text("Score: " + score, 150, 25);
  text("The goal of the game is to create stacks of 4 blocks of the same color.\nUse the left and right arrow keys to move the falling block left and right respectively.\nUse the down arrow key to skip down a row.", 150, 40)
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
  if (arena[player.x][player.y] != 0){
    arena = create2DArray(arenaWidth, arenaHeight);
    if (score > highScore){
      highScore = score;
    }
    score = 0;
    hangTime = 500;
  }
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
  }
  if (arena[player.x][player.y] > 0){
      placePiece(arena, player);
      spawnPlayer();
  }

}

function placePiece(arena, player){
  arena[player.x][player.y-1] = player.value;
  checkArena();

}

function showArena(){
  for (let i = 0; i < arenaWidth; i++){
    for (let j = 0; j < arenaHeight; j++){
      fillMonimo(arena[i][j]);
      rect(i * monimoSize, j * monimoSize, monimoSize, monimoSize);
    }
  }
}

function checkArena(){
  for (let i = 0; i < arenaWidth; i++){
    for (let j = 0; j < arenaHeight; j++){
      let pieceValue = arena[i][j];
      if(pieceValue > 0){
        if(arena[i][j-1] === pieceValue){
          if(arena[i][j-2] === pieceValue){
            if(arena[i][j-3] === pieceValue){
              arena[i].splice(j-3, 4);
              arena[i].unshift(0,0,0,0);
              hangTime *= 0.95;
              score+=1;
            }
          }
        }
      }
    }
  }
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
  colorChoice = [150, "Red", "Green", "Blue", "Yellow", "Orange", "Purple", "Pink"];
  fill(colorChoice[value]);
}
