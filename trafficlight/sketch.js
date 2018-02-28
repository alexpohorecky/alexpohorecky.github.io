//Traffic Light Starter Code
//Dan Schellenberg
//Feb 23, 2018

//GOAL: make a 'traffic light' simulator. For now, just have the light
// changing according to time. You may want to investigate the millis()
// function at processing.org/reference.
let state;
let redLightDuration, yellowLightDuration, greenLightDuration;
let lastTimeLightChanged

function setup() {
  createCanvas(windowWidth, windowHeight);
  state = 1;
  redLightDuration = 1000;
  yellowLightDuration = 1000;
  greenLightDuration = 3000;
  lastTimeLightChanged = millis();
}

function draw() {
  background(220);
  drawOutlineOfLights();
  checkIfLightSwitched();
  displayCorrectLight();
}

function drawOutlineOfLights() {

  //box
  rectMode(CENTER);
  fill(0);
  rect(width / 2, height / 2, 75, 200, 10);

  fill(255);
  ellipse(width / 2, height / 2 - 65, 50, 50); //top
  ellipse(width / 2, height / 2, 50, 50); //middle
  ellipse(width / 2, height / 2 + 65, 50, 50); //bottom

}

function checkIfLightSwitched() {
  if (state === 1){ // Green
      if (millis() > lastTimeLightChanged + greenLightDuration){
        state = 2;
        lastTimeLightChanged = millis();
      }
  }
  else if (state === 2){ // Green
      if (millis() > lastTimeLightChanged + yellowLightDuration){
        state = 3;
        lastTimeLightChanged = millis();
      }
  }
  else if (state === 3){ // Green
      if (millis() > lastTimeLightChanged + redLightDuration){
        state = 1;
        lastTimeLightChanged = millis();
      }
  }

}

function displayCorrectLight() {
  if (state === 1) {
    drawGreenLight();
  }
  else if (state === 2) {
    drawYellowLight();
  }
  else if (state === 3) {
    drawRedLight();
  }
}

function drawGreenLight(){
    fill("green");
    ellipse(width / 2, height / 2 + 65, 50, 50); //bottom
}

function drawYellowLight(){
  fill("yellow");
  ellipse(width / 2, height / 2, 50, 50); //middle
}

function drawRedLight(){
  fill("red");
  ellipse(width / 2, height / 2 - 65, 50, 50); //top
}
