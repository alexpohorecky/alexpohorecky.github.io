// Keyboard And Mouse
// February 8, 2018
// Alex Pohorecky

function setup() {
  createCanvas(windowWidth, windowHeight);
  document.addEventListener("contextmenu", event => event.preventDefault());
}

function draw() {

}

function mousePressed() {
  fill(random(255), random(255), random(255));
  noStroke();
  if (mouseButton === LEFT) {
    rect(mouseX, mouseY, random(100), random(100));
  }

  if (mouseButton === RIGHT) {
    ellipse(mouseX, mouseY, random(0, 100));
  }
}


function keyPressed() {
  if (key === "w" || key === "W") {
    background(255, 255, 255);
  }
  if (key === "b" || key === "B") {
    background(0, 0, 0);
  }
}
