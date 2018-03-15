let scream;
let goodMusic;
let time;
function preload(){
  scream = loadSound("sounds/t1scream.mp3");
  goodMusic = loadSound("sounds/legendsNeverDie.mp3");
}
function setup(){
  createCanvas(windowWidth, windowHeight);
  goodMusic.setVolume(1);
  goodMusic.play();
  time = millis();

}

function draw(){
  button();
}

function button(){
  rectMode(CENTER);
  rect(width/2, height/2, 100,50);
  textAlign(CENTER);
  text("KAPPA",width/2,height/2);
}

function mouseClicked(){
  if (mouseX > width/2 - 50 && mouseX < width/2 + 50 && mouseY > height/2 - 25 && mouseY < height/2 + 25){
    scream.play()
  }
}
